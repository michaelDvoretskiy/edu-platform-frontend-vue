<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";

import {inject, onMounted, ref} from "vue";
import {PageDataGetter} from "/src/services/api/PageDataGetter.js";
import {InfoGetter} from "/src/services/api/InfoGetter.js";

const data = ref({dataParts:{}})
const myCourses = ref([])
const myPoints = ref([])
const myPointsRemains = ref(0)
const spinnerShow = inject('spinnerShow')

onMounted(() => {
  spinnerShow.value.push('getCabinetText')
  PageDataGetter.getPageData('cabinet').then( res => {
    data.value = res
    console.log
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getCabinetText')
  })

  spinnerShow.value.push('getMyCourses')
  InfoGetter.getMyCourses().then( res => {
    myCourses.value = res
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getMyCourses')
  })

  spinnerShow.value.push('getMyPoints')
  InfoGetter.getMyPoints().then( res => {
    myPoints.value = res.all
    myPointsRemains.value = res.remain
    spinnerShow.value = spinnerShow.value.filter(e => e !== 'getMyPoints')
  })
})
</script>

<template>
  <PageHeader :title="data.title"/>
  <div class="container-xxl py-4 pt-1 pb-5">
    <div class="container">
      <div class="text-center mx-auto mb-2 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
        <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ data.title }}</div>
        <h3 class="display-7 mb-3">{{ data.dataParts.accTitle }}</h3>
      </div>

      <div class="row g-4 justify-content-center">
        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" v-if="myCourses.courses">
          <div class="service-item bg-white text-center h-100 p-0 p-xl-2">
            <div class="p-3">
              <div class="d-inline-block rounded-pill bg-secondary text-dark py-1 px-3 mb-3">{{ data.dataParts.courseTitle }}</div>
              <div class="row mb-3 position-relative" v-for="course in myCourses.courses" :class="{ light: course.isEnabled != 1 }">
                <div class="col-8 align-items-center d-flex" style="justify-content: space-around;">
                  <RouterLink v-if="course.isEnabled==1" :to="{ name: 'Lessons', params: {'course': course.name}}">
                    {{ course.title }}
                  </RouterLink>
                  <div v-if="!(course.isEnabled==1)">
                    {{ course.title }}
                  </div>
                </div>
                <div class="col-4 align-items-center d-flex small">{{ course.expired }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" v-if="myCourses.lessons">
          <div class="service-item bg-white text-center h-100 p-0 p-xl-2">
            <div class="p-3">
              <div class="d-inline-block rounded-pill bg-secondary text-dark py-1 px-3 mb-3">{{ data.dataParts.lessonTitle }}</div>
              <div class="row mb-3 position-relative" v-for="course in myCourses.lessons" :class="{ light: course.isEnabled != 1 }">
                <div class="col-8 align-items-center d-flex" style="justify-content: space-around;">
                  <RouterLink v-if="course.isEnabled==1" :to="{ name: 'Lesson', params: {'lesson': course.name}}">
                    {{ course.title }}
                  </RouterLink>
                  <div v-if="!(course.isEnabled==1)">
                    {{ course.title }}
                  </div>
                </div>
                <div class="col-4 align-items-center d-flex small">{{ course.expired }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" v-if="myCourses.categories">
          <div class="service-item bg-white text-center h-100 p-0 p-xl-2">
            <div class="p-3">
              <div class="d-inline-block rounded-pill bg-secondary text-dark py-1 px-3 mb-3">{{ data.dataParts.catTitle }}</div>
              <div class="row mb-3 position-relative" v-for="course in myCourses.categories" :class="{ light: course.isEnabled != 1 }">
                <div class="col-8 align-items-center d-flex" style="justify-content: space-around;">
                  <RouterLink v-if="course.isEnabled==1" :to="{ name: 'Courses', params: {'category': course.name}}">
                    {{ course.title }}
                  </RouterLink>
                  <div v-if="!(course.isEnabled==1)">
                    {{ course.title }}
                  </div>
                </div>
                <div class="col-4 align-items-center d-flex small">{{ course.expired }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mx-auto mb-3 mt-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
        <h3 class="display-7 mb-3">{{ data.dataParts.pointTitle }}</h3>
      </div>
      <div class="row g-4 justify-content-center">
        <div class="col-lg-8 wow fadeInUp" data-wow-delay="0.1s" v-if="myPoints">
          <div class="service-item bg-white text-center h-100 p-0 p-xl-2">
            <div class="p-3">
              <div class="d-inline-block rounded-pill bg-secondary text-dark py-1 px-3 mb-3">&sum; {{ myPointsRemains }}</div>
              <div class="row mb-2 position-relative" v-for="point in myPoints" style="font-size: 0.7em;">
                <div class="col-4 align-items-center d-flex" style="justify-content: space-around;">
                  {{ point.operation_date }}
                </div>
                <div class="col-2 align-items-center d-flex" style="justify-content: space-around;">
                  {{ point.points }}
                </div>
                <div class="col-6 align-items-center d-flex" style="justify-content: space-around;">
                  {{ point.description }}
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
.light {
  color: #c4c4c4;
  font-size: 0.9em;
}
</style>