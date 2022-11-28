<script setup>
import {onMounted} from "vue";
import Spinner from "/src/components/myTheme/Spinner.vue";
import HeadMenu from "/src/components/myTheme/HeadMenu.vue";
import HeadCarousel from "/src/components/myTheme/HeadCarousel.vue";
import About from "/src/components/myTheme/About.vue";
import BackToTop from "/src/components/myTheme/BackToTop.vue";
import Causes from "/src/components/myTheme/Causes.vue";
import Doings from "/src/components/myTheme/Doings.vue";
import Donates from "/src/components/myTheme/Donates.vue";
import Team from "/src/components/myTheme/Team.vue";
import Testimonial from "/src/components/myTheme/Testimonial.vue";
import Footer from "/src/components/myTheme/Footer.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";

defineProps({
    headerInfo: Object,
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
})

onMounted(() => {
    new WOW().init();
});
</script>

<template>
  <PageHeader/>
  <About/>
</template>
