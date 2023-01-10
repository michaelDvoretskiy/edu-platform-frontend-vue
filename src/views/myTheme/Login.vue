<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import {Auth} from "/src/services/api/Auth";
import {useRouter} from "vue-router";
import {getLocale} from "../../locales";
import {inject, onMounted, ref} from "vue";
import {InfoGetter} from "/src/services/api/InfoGetter";

const router = useRouter()
const text = ref({})
const spinnerShow = inject('spinnerShow')
const alert = ref({
  title: '',
  description: '',
  show: false
})

onMounted(() => {
  spinnerShow.value.push('getLoginText')
  InfoGetter.getFormText('login').then( res => {
    text.value = res
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getLoginText')
  })
});

function authenticate(submitEvent) {
  let userEmail = submitEvent.target.elements.email.value;
  let userPass = submitEvent.target.elements.passwd.value;

  Auth.login({
    "email": userEmail,
    "password": userPass,
    "appname": "edu-client"
  }).then(
      res => {
        if (res.success) {
          const data = res.data
          let href = router.resolve({ name: 'Home', params: {locale: getLocale()}}).href
          Auth.storeUser({
            name: data.name,
            token: data.token,
            email: userEmail
          })
          // router.push({name: 'Home'})
          window.location.href = href
        } else if(res.message) {
          alert.value = {
            title: 'Error',
            description: res.message,
            class: "alert-danger",
            show: true
          }
        }
      }
  )
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
                  <form name="login"  @submit.prevent="authenticate">
                    <h5 class="fw-normal mb-2" style="letter-spacing: 1px;">{{ text.title }}</h5>

                    <div class="form-outline mb-2">
                      <input required type="email" id="email" name="email" class="form-control form-control-lg" />
                      <label class="form-label small" for="email">{{ text.email }}</label>
                    </div>

                    <div class="form-outline mb-2">
                      <input required type="password" id="passwd" name="passwd" class="form-control form-control-lg" />
                      <label class="form-label small" for="passwd">{{ text.password }}</label>
                    </div>

                    <div class="pt-1 mb-2">
                      <button class="btn btn-primary btn-lg btn-block" type="submit">
                        {{ text.loginBtn }}
                      </button>
                    </div>
                  </form>
                  <div class="text-end">
                    <RouterLink class="small text-muted" :to="{ name: 'ForgotPass'}">
                      {{ text.forgotPass }}
                    </RouterLink>
                    <p style="color: #393f81;" class="mt-2 mb-0">
                      {{ text.registerQ }}
                      <RouterLink class="small text-muted" :to="{ name: 'Register'}">
                        {{ text.registerLink }}
                      </RouterLink>
                    </p>
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