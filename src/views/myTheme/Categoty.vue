<script setup>
import {onMounted, ref} from "vue";
import CourseShort from "/src/components/myTheme/CourseShort.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import {CoursesDataGetter} from "/src/services/api/CoursesDataGetter";
import {useRoute} from "vue-router";

const category = ref({})

const route = useRoute()

onMounted(() => {
  CoursesDataGetter.getCategory(route.params.category).then( res => {
    category.value = res
  })

  new WOW().init();
});

</script>

<template>
  <PageHeader :title="category.title" :menu="category.headerLink"/>

  <!-- Causes Start -->
  <div class="container-xxl py-5" v-if="category.title">
    <div class="container">
      <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ category.title }}</div>
        <h3 class="mb-5">{{ category.description }}</h3>
      </div>
      <div class="row g-4 justify-content-center">
        <CourseShort v-for="course in category.courses" :course="course" />
      </div>
    </div>
  </div>
  <!-- Causes End -->
</template>
