<script setup>
import {onMounted} from "vue";

import About from "/src/components/myTheme/About.vue";
import Causes from "/src/components/myTheme/Causes.vue";
import Doings from "/src/components/myTheme/Doings.vue";
import Donates from "/src/components/myTheme/Donates.vue";
import Team from "/src/components/myTheme/Team.vue";
import Testimonial from "/src/components/myTheme/Testimonial.vue";
import HeadCarousel from "/src/components/myTheme/HeadCarousel.vue";

onMounted(() => {
    new WOW().init();
});
</script>

<template>
  <HeadCarousel/>
  <About/>
  <Causes/>
  <Doings/>
  <Donates/>
  <Team/>
  <Testimonial/>
</template>
