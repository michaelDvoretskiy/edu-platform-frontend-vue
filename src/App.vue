<script setup>
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import Spinner from "/src/components/myTheme/Spinner.vue";
import HeadMenu from "/src/components/myTheme/HeadMenu.vue";
import Footer from "/src/components/myTheme/Footer.vue";
import BackToTop from "/src/components/myTheme/BackToTop.vue";
import {onMounted, ref} from "vue";
import {InfoGetter} from "/src/services/api/InfoGetter.js";
import {checkLocale, setLocale} from "/src/locales/index.js";

const infoData = ref({})
const spinnerShow = ref(true)
const route = useRoute()

onMounted(() => {
  const locale =  checkLocale(route.params.locale)
  setLocale(locale)

  InfoGetter.getInfo().then( data => {
    infoData.value = data
    spinnerShow.value = false
  })
})

const headerInfo = ref({
  titleFirst: "Lern",
  titleSecond: 'IT',
  address: {show: false, content: 'this is address'},
  email: {show: true, content: 'm.dvoretskiy@gmail.com'},
  menu: [
    {link: 'Home', title: 'Home'},
    {link: 'About', title: 'About'},
  ],
  socialLinks: [
    {link: 'https://www.youtube.com/channel/UCko41DfmAsV91LzLIkd9Qaw', icon_class: 'fab fa-youtube'},
    {link: 'https://t.me/m_dvoretskiy', icon_class: 'fab fa-telegram'},
  ]
});

const footerInfo = ref({
  titleFirst: "Lern",
  titleSecond: 'IT',
  address: {show: true, content: 'this is address'},
  email: {show: true, content: 'm.dvoretskiy@gmail.com'},
  menu: [
    {link: 'Home', title: 'Home'},
    {link: 'About', title: 'About'},
  ],
  socialLinks: [
    {link: 'https://www.youtube.com/channel/UCko41DfmAsV91LzLIkd9Qaw', icon_class: 'fab fa-youtube'},
    {link: 'https://t.me/m_dvoretskiy', icon_class: 'fab fa-telegram'},
  ]
});

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