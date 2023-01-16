<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";

import {inject, onMounted, ref} from "vue";
import {PageDataGetter} from "/src/services/api/PageDataGetter.js";
import {getLocale} from "../../locales";
import {InfoGetter} from "/src/services/api/InfoGetter.js";

const data = ref({dataParts:{}})
const step = ref(1)
const alert = ref({
  title: '',
  description: '',
  show: false
})
const spinnerShow = inject('spinnerShow')

onMounted(() => {
  PageDataGetter.getPageData('feedback').then( res => {
    data.value = res
  })
})

function sendFeedback(submitEvent) {
  let subject = submitEvent.target.elements.subject.value;
  let message = submitEvent.target.elements.message.value;

  spinnerShow.value.push('feedback')
  InfoGetter.feedback({
    "subject": subject,
    "message": message
  }).then(
      res => {
        if (res.success) {
          step.value = 2
        } else if(res.message) {
          alert.value = {
            title: 'Error',
            description: res.message,
            class: "alert-danger",
            show: true
          }
        }
        spinnerShow.value = spinnerShow.value.filter(e => e !== 'feedback')
      }
  )
}
</script>

<template>
  <PageHeader :title="data.title"/>
  <div class="container-xxl py-4 pt-1" v-if="data.title">
    <div class="container wow fadeInUp" data-wow-delay="0.1s">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div v-if="alert.show && step==1" class="alert alert-dismissible fade show" :class="alert.class" role="alert">
          <strong>{{ alert.title }}</strong> {{ alert.description }}
          <button type="button" class="btn-close" @click="alert.show=false"></button>
        </div>
        <div class="col col-xl-10">
          <div class="text-center">
            <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
              {{ data.title }}
            </div>
          </div>

          <div v-if="step==1" class="row g-0">
            <div class="col align-items-center">
              <div class="text-black">
                <form name="feedback" @submit.prevent="sendFeedback">
                  <div class="form-outline mb-2">
                    <input required type="text" id="subject" name="subject" class="form-control form-control-lg" />
                    <label class="form-label small" for="subject">{{ data.dataParts.Subject }}</label>
                  </div>

                  <div class="form-outline mb-2">
                    <textarea required rows="7" id="message" name="message" class="form-control form-control-lg" />
                    <label class="form-label small" for="message">{{ data.dataParts.Message }}</label>
                  </div>

                  <div class="pt-1 mb-2">
                    <button class="btn btn-primary btn-lg btn-block" type="submit">
                      {{ data.dataParts.SubmitBtn }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step==2" class="row d-flex justify-content-center align-items-center h-100">
        <div class="text-center m-5">
          <h4>{{ data.dataParts.SuccessText }}</h4>
        </div>
        <div class="text-center m-5">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>