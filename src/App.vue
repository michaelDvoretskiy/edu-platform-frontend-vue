<script setup>
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import Spinner from "/src/components/myTheme/Spinner.vue";
import HeadMenu from "/src/components/myTheme/HeadMenu.vue";
import Footer from "/src/components/myTheme/Footer.vue";
import BackToTop from "/src/components/myTheme/BackToTop.vue";
import {onMounted, ref, inject} from "vue";
import {InfoGetter} from "/src/services/api/InfoGetter.js";
import {checkLocale, setLocale} from "/src/locales/index.js";

const infoData = ref({})
// const spinnerShow = ref(true)
const route = useRoute()
const spinnerShow = inject('spinnerShow')

onMounted(() => {
  const locale =  checkLocale(route.params.locale)
  setLocale(locale)

  InfoGetter.getInfo().then( data => {
    infoData.value = data
    spinnerShow.value = false
  })
})

function showHideSpinner(event) {
  spinnerShow.value = event
}

</script>

<template>
  <Spinner :show="spinnerShow" />
  <HeadMenu :infoData="infoData"/>

  <RouterView />

  <Footer :infoData="infoData"/>
  <BackToTop/>
</template>

<style scoped>
</style>