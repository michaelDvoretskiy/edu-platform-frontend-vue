<script setup>

import {inject, onMounted, ref} from "vue";
import {PageDataGetter} from "/src/services/api/PageDataGetter.js";
import {InfoGetter} from "../../services/api/InfoGetter";
import TermsModal from "/src/components/myTheme/TermsModal.vue";
import {BaseMethods} from "/src/services/api/BaseMethods.js";

const data = ref({})
const emit = defineEmits(['pageTitle'])
const text = ref({})
const spinnerShow = inject('spinnerShow')

onMounted(() => {
  spinnerShow.value.push('getAboutText')
  PageDataGetter.getPageData('about').then( res => {
    data.value = res
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getAboutText')
    if (res.title) {
      emit('pageTitle', res.title)
    }
  })
  spinnerShow.value.push('getregisterText')
  InfoGetter.getFormText('register').then( res => {
    text.value = res
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getregisterText')
  })
})
</script>

<template>
    <!-- About Start -->
    <div class="container-xxl py-5">
        <div class="container">
            <div class="row g-5" v-if="data && data.dataParts">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="position-relative overflow-hidden h-100" style="min-height: 400px;">
                      <img class="position-absolute w-100 h-100 pt-5 pe-5" :src="data.dataParts.img2Path" alt="" style="object-fit: cover;">
                      <div>
                        <img class="position-absolute top-0 end-0 bg-white ps-2 pb-2" :src="data.dataParts.img1Path" alt="" style="width: 200px; height: 200px;">
                      </div>
                    </div>
                </div>
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="h-100">
                        <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
                          {{ data.title }}
                        </div>
                        <h1 class="display-6 mb-5">{{ data.dataParts.headerText }}</h1>
                        <p class="mb-2">{{ data.dataParts.text1 }}</p>

                        <p class="mb-2 mt-4">{{ data.dataParts.text3 }}</p>
                        <RouterLink class="btn btn-primary py-2 px-3 me-3" :to="{ name: 'Feedback'}">

                          {{ data.dataParts.btn1Text }}
                          <div class="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                            <i class="fa fa-arrow-right"></i>
                          </div>
                        </RouterLink>

                        <p class="mb-2 mt-4">{{ data.dataParts.text2 }}
                          <a style="font-size: 0.7em;" :href="BaseMethods.getUrl('/get-details')">{{ data.dataParts.detailsLink }}</a>
                        </p>

                        <p class="mb-2 mt-4">{{ data.dataParts.text2_2 }}</p>
                        <p class="mb-2 mt-4" style="font-size: 0.7em;">{{ data.dataParts.text4 }}</p>

                        <p class="mb-2 mt-4">
                          <span>
                            {{ data.dataParts.terms1 }}
                          </span>
                          <a class="ms-2" href="#termsModal" data-bs-toggle="modal" data-bs-target="#termsModal">
                            {{ data.dataParts.terms2 }}
                          </a>
                        </p>
                        <terms-modal :terms="text.terms" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->
</template>

<style scoped>
</style>