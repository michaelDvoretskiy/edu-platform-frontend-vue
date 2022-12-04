<script setup>
import {onMounted} from "vue";

import About from "/src/components/myTheme/About.vue";
import Team from "/src/components/myTheme/Team.vue";
import HeadCarousel from "/src/components/myTheme/HeadCarousel.vue";
import CourseCategories from "/src/components/myTheme/CourseCategories.vue";

onMounted(() => {
    new WOW().init();
});
</script>

<template>
  <HeadCarousel/>
  <About/>
<!--  <Causes/>-->
  <CourseCategories/>
<!--  <Donates/>-->
  <Team/>
<!--  <Testimonial/>-->
</template>
