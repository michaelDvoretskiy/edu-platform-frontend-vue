<script setup>
import {onMounted, ref} from "vue";
import About from "/src/components/myTheme/About.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";

// defineProps({
//     headerInfo: Object,
//     canLogin: Boolean,
//     canRegister: Boolean,
//     laravelVersion: String,
//     phpVersion: String,
// })

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
  <About @pageTitle="processPageTitle"/>
</template>
