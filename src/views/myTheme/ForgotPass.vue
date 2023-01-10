<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";

import {inject, onMounted, ref} from "vue";
import {Auth} from "../../services/api/Auth";
import {getLocale} from "../../locales";
import {useRouter} from "vue-router";
import {InfoGetter} from "../../services/api/InfoGetter";

const router = useRouter()
const spinnerShow = inject('spinnerShow')

const userRequest = ref({
  email: '',
  password: '',
  c_password: '',
  verif_code: '',
  appname: 'edu-client'
})
const step = ref(1)
const alert = ref({
  title: '',
  description: '',
  show: false
})
const text = ref({})

onMounted(() => {
  spinnerShow.value.push('getLoginText')
  InfoGetter.getFormText('forgot-pass').then( res => {
    text.value = res
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getLoginText')
  })
});

function getVerificationCode() {
  spinnerShow.value.push('sendVerifCode')
  Auth.getVarificationCode(userRequest.value.email, 'restore-passwd').then(
      res => {
          if (res.success) {
            alert.value = {
              title: text.value.msgConfCodeTitle,
              description: text.value.msgConfCode,
              class: "alert-info",
              show: true
            }
            step.value = 2
          } else if(res.message) {
            alert.value = {
              title: 'Error.',
              description: res.message,
              class: "alert-danger",
              show: true
            }
          } else if(res.message) {
            alert.value = {
              title: 'Error',
              description: res.message,
              class: "alert-danger",
              show: true
            }
          }
          spinnerShow.value = spinnerShow.value.filter(e => e !== 'sendVerifCode')
      }
  )
}

function sendChangePassRequest() {
  if (userRequest.value.password != userRequest.value.c_password) {
    alert.value = {
      title: text.value.msgInvalidConfTitle,
      description: text.value.msgInvalidConf,
      class: "alert-warning",
      show: true
    }
  } else {
    spinnerShow.value.push('changePassword')
    Auth.changePassword(userRequest.value).then(
      res => {
        if (res.success) {
          const data = res.data
          let href = router.resolve({ name: 'Home', params: {locale: getLocale()}}).href
          Auth.storeUser({
            name: data.name,
            token: data.token,
            email: userRequest.value.email
          })

          userRequest.value = {
            email: '',
            password: '',
            c_password: '',
            verif_code: '',
            appname: 'edu-client'
          }

          spinnerShow.value = spinnerShow.value.filter(e => e !== 'changePassword')

          window.location.href = href
        } else if(res.message) {
          alert.value = {
            title: 'Error',
            description: res.message,
            class: "alert-danger",
            show: true
          }
          spinnerShow.value = spinnerShow.value.filter(e => e !== 'changePassword')
        }
      }
    )
  }
}

</script>
<template>
  <PageHeader/>
  <div class="container-xxl py-4 pt-1">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div v-if="alert.show" class="alert alert-dismissible fade show" :class="alert.class" role="alert">
            <strong>{{ alert.title }}</strong> {{ alert.description }}
            <button type="button" class="btn-close" @click="alert.show=false"></button>
          </div>
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0 border-bottom">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="/img/login/login2.jpg"
                     alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body text-black">
                    <div v-if="step == 1">
                      <form name="restore-pass-1" @submit.prevent="getVerificationCode">
                        <h5 class="fw-normal mb-4" style="letter-spacing: 1px;">{{ text.title }}</h5>
                        <div class="form-outline mb-4">
                          <input required type="email" id="email" name="email" class="form-control form-control-lg"
                            v-model="userRequest.email"/>
                          <label class="form-label small" for="email">{{ text.email }}</label>
                        </div>
                        <div class="pt-1 mb-2">
                          <button class="btn btn-primary btn-lg btn-block" type="submit">
                            {{ text.getVerifBtn }}
                          </button>
                        </div>
                      </form>
                    </div>

                    <div v-if="step == 2">
                      <form name="restore-pass-2" @submit.prevent="sendChangePassRequest">
                        <div class="form-outline mb-4">
                          <input required id="verif_code" name="verif_code" class="form-control form-control-lg"
                                 v-model="userRequest.verif_code"/>
                          <label class="form-label small" for="verif_code">{{ text.verifCode }}</label>
                        </div>

                        <div class="form-outline mb-2">
                          <input required type="password" id="password" name="password" class="form-control form-control-lg"
                                 v-model="userRequest.password"/>
                          <label class="form-label small" for="password">{{ text.password }}</label>
                        </div>

                        <div class="form-outline mb-2">
                          <input required type="password" id="c_password" class="form-control form-control-lg"
                                 v-model="userRequest.c_password"/>
                          <label class="form-label small" for="c_password">{{ text.cPassword }}</label>
                        </div>
                        <div class="pt-1 mb-2">
                          <button class="btn btn-primary btn-lg btn-block" type="submit">{{ text.changePass }}</button>
                        </div>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  a:hover {
    color: var(--primary) !important;
  }
</style>