<script setup>
import {onMounted, ref} from "vue";
import {CoursesDataGetter} from "/src/services/api/CoursesDataGetter.js";
import {PageDataGetter} from "/src/services/api/PageDataGetter";

const pageData = ref({})
const categoriesList = ref({})
const emit = defineEmits(['pageTitle'])

onMounted(() => {
  CoursesDataGetter.getCategoriesList().then( res => {
    categoriesList.value = res
  })
  PageDataGetter.getPageData('categories').then( res => {
    pageData.value = res
    if (res.title) {
      emit('pageTitle', res.title)
    }
  })
})
</script>

<template>
    <!-- Service Start -->
    <div class="container-xxl py-5 bg-light">
        <div class="container" v-if="categoriesList && categoriesList[0] && pageData && pageData.title">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
                <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ pageData.title }}</div>
                <h3 class="display-7 mb-5">{{ pageData.dataParts.headerText }}</h3>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" v-for="category in categoriesList">
                    <div class="service-item bg-white text-center h-100 p-0 p-xl-5">
                      <div style="background-color: black;" class="wow fadeInUp" data-wow-delay="0.1s">
                        <img class="img-fluid" :src="category.img_path" alt="" style="opacity: 0.5; filter: alpha(Opacity=50);">
                      </div>
                      <div class="p-4">
                        <h4 class="mb-3">{{ category.title }}</h4>
                        <a class="btn btn-outline-primary px-3" href="">
                          {{ category.link_title }}
                          <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                            <i class="fa fa-arrow-right"></i>
                          </div>
                        </a>
                        <p class="mt-4 mb-0" style="font-size: 0.9em;">{{ category.content_text }}</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Service End -->
</template>
