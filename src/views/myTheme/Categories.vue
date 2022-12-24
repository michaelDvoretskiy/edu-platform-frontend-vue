<script setup>
import {onMounted, ref} from "vue";
import About from "/src/components/myTheme/About.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import CourseCategories from "/src/components/myTheme/CourseCategories.vue";

const title = ref('')

onMounted(() => {
    new WOW().init();
});

function processPageTitle(pageTitle) {
  title.value = pageTitle
}
</script>

<template>
  <PageHeader :title="title"/>
  <CourseCategories @pageTitle="processPageTitle"/>
</template>
