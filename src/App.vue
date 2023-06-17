<script setup>
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import Spinner from "/src/components/myTheme/Spinner.vue";
import HeadMenu from "/src/components/myTheme/HeadMenu.vue";
import Footer from "/src/components/myTheme/Footer.vue";
import BackToTop from "/src/components/myTheme/BackToTop.vue";
import {onMounted, ref, inject, computed} from "vue";
import {InfoGetter} from "/src/services/api/InfoGetter.js";
import {checkLocale, setLocale} from "/src/locales/index.js";
import {Auth} from "/src/services/api/Auth";
import {BaseMethods} from "/src/services/api/BaseMethods.js";
import {useMaterialFullScreen} from "./services/api/materialFullScrean";

const infoData = ref({})
// const spinnerShow = ref(true)
const route = useRoute()
const spinnerShow = inject('spinnerShow')
const showApp = ref(false)

const {showElements} = useMaterialFullScreen()

onMounted(() => {
  showApp.value = false
  checkUserCacheStatus().then(() => {
    const locale =  checkLocale(route.params.locale)
    setLocale(locale)
    spinnerShow.value.push('getInfo')
    InfoGetter.getInfo().then( data => {
      infoData.value = data
      spinnerShow.value = spinnerShow.value.filter(e => e !== 'getInfo')
    })
  })
})

async function checkUserCacheStatus() {
  let token = localStorage.getItem('token')
  if (token) {
    await Auth.checkCacheClearNeed(token).then(res => {
      if (res.success && res.data.length > 0) {
        BaseMethods.cacheClear(res.data)
        Auth.updateCacheClearDate(token)
      }
    })
  } else {
    BaseMethods.cacheClear()
  }
  showApp.value = true
}

// const calcSometh = computed({
//   get() {
//     console.log(spinnerShow)
//     return spinnerShow.value.length
//   }
// })

function showHideSpinner(event) {
  spinnerShow.value = event
}

</script>

<template>
  <div v-if="showApp">
    <Spinner :show="(spinnerShow.length!=0)" />
    <HeadMenu v-if="showElements" :infoData="infoData"/>

    <RouterView />

    <Footer v-if="showElements" :infoData="infoData"/>
    <BackToTop v-if="showElements" />
  </div>
</template>

<style scoped>
</style>