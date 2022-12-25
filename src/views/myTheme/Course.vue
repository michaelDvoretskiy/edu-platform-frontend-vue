<script setup>
import {onMounted, ref} from "vue";
import CourseShort from "/src/components/myTheme/CourseShort.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import {CoursesDataGetter} from "/src/services/api/CoursesDataGetter";
import {useRoute} from "vue-router";

const course = ref({})

const route = useRoute()

onMounted(() => {
  CoursesDataGetter.getCourse(route.params.course).then( res => {
    course.value = res
  })

  new WOW().init();
});

</script>

<template>
  <PageHeader :title="course.title"/>

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
      <div class="row card m-2" v-for="lesson in course.lessons">
        <h5 class="card-title col-md-4 col-lg-3 m-2">{{ lesson.title }}</h5>
        <p class="card-text col-md-6 col-lg-7">{{ lesson.description }}</p>
      </div>
    </div>
  </div>
  <!-- Cause End -->
</template>
