<script setup>
import {onMounted, ref} from "vue";
import CourseShort from "/src/components/myTheme/CourseShort.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import {CoursesDataGetter} from "/src/services/api/CoursesDataGetter";
import {useRoute} from "vue-router";

const course = ref({})

const route = useRoute()

function getLangIconClass(lng)
{
  if (lng == "uk") {
    return "fi fi-ua fis";
  }
  if (lng == "pl") {
    return "fi fi-pl fis";
  }
  return "fi fi-gb fis";
}

onMounted(() => {
  CoursesDataGetter.getCourse(route.params.course).then( res => {
    course.value = res
  })

  new WOW().init();
});

</script>

<template>
  <PageHeader :title="course.title" :menu="course.headerLink"/>

  <!-- Cause Start -->
  <div class="container-xxl py-5" v-if="course.title">
    <div class="container">
      <div class="row text-center mx-auto mb-2 wow fadeInUp" data-wow-delay="0.1s">
        <div class="col-lg-4 col-md-5 align-items-center d-flex mb-5 mb-md-0">
          <img class="w-100" :src="course.img_path" alt="">
        </div>
        <div class="col-lg-8 col-md-7">
          <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ course.title }}</div>
          <h3 class="text-black-50">{{ course.description }}</h3>
        </div>
      </div>
      <div class="row m-3 p-3 text-center border lesson position-relative wow fadeInUp" data-wow-delay="0.2s" v-for="lesson in course.lessons">
        <div class="col-md-4 col-lg-3 align-items-center d-flex" style="justify-content: space-around;">
          <h5 class="title">{{ lesson.title }}</h5>
        </div>
        <div class="col-md-6 col-lg-7" style="font-size: 0.8em;">{{ lesson.description }}</div>
        <div class="lng col-md-1 align-items-center d-flex mt-3 mb-3" style="justify-content: space-around;">
          <div>
            <span v-for="lng in lesson.languages" :class="getLangIconClass(lng)" class="m-1 lng"></span>
          </div>
        </div>
        <div class="info col-md-1 align-items-center d-flex" style="justify-content: space-around;">
          <div>
            <i v-if="lesson.hasPdf" class="fas fa-file-pdf m-1"></i>
            <i v-if="lesson.hasVideo" class="fas fa-video m-1"></i>
            <i v-if="lesson.hasTasks" class="fas fa-tasks m-1"></i>
          </div>
        </div>
        <div v-if="!lesson.allowed" class="locked-lesson-overlay">
          <div class="info-locked">
            <i class="fas fa-lock"></i>
          </div>
<!--          <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">-->
<!--            <i class="fas fa-lock"></i>-->
<!--          </div>-->
        </div>
        <div v-if="lesson.allowed" class="lesson-overlay">
          <div class="mb-3 text-white">{{ lesson.title }}</div>
          <div>
<!--            <a class="btn btn-outline-primary" href="">-->
            <RouterLink class="btn btn-outline-primary" :to="{ name: 'Lesson', params: {'lesson': lesson.name}}">
              {{ lesson.link_title }}
              <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                <i class="fa fa-arrow-right"></i>
              </div>
            </RouterLink>
<!--            </a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Cause End -->
</template>
<style scoped>
  .lesson .lesson-overlay, .lesson .locked-lesson-overlay {
    position: absolute;
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .7);
    overflow: hidden;
    opacity: 0;
    transition: .5s;
  }

  .lesson .locked-lesson-overlay {
    background: rgba(0, 0, 0, .5);
  }

  .lesson:hover .lesson-overlay, .lesson .locked-lesson-overlay {
    height: 100%;
    opacity: 1;
  }
  .lesson:nth-child(even) {
    background-color: #FFF0E6;
  }
  .lesson:nth-child(odd) {
    background-color: #fdf8f4;
  }
  .lesson .title {
    color: var(--primary);;
  }
  .info i {
    font-size: 1.5em;
    color: var(--primary);
  }
  .info-locked i {
    font-size: 2.5em;
    color: var(--primary);;
  }
  span.lng {
    font-size: 1.5em;
    border-radius: 5px;
  }
</style>