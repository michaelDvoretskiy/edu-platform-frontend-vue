<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Spinner from "/src/components/myTheme/Spinner.vue";
import HeadMenu from "/src/components/myTheme/HeadMenu.vue";
import Footer from "/src/components/myTheme/Footer.vue";
import BackToTop from "/src/components/myTheme/BackToTop.vue";
import {ref} from "vue";


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
  <Spinner/>
  <HeadMenu :headerInfo="headerInfo"/>

  <RouterView />

  <Footer :footerInfo="footerInfo"/>
  <BackToTop/>
</template>

<style scoped>
</style>