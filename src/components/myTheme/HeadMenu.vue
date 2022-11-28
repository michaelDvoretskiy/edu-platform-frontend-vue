<script setup>
import {onMounted} from "vue";
import Locales from "@/components/myTheme/Locales.vue";

defineProps({
  infoData: Object
})

onMounted(() => {
    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
});

</script>
<template>
    <!-- Navbar Start -->
    <div class="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s" v-if="infoData && infoData.info">
        <div class="top-bar text-white-50 row gx-0 align-items-center d-none d-md-flex">
            <div class="col-md-8 px-5 text-start">
                <small v-if="infoData.info.address">
                    <i class="fa fa-map-marker-alt me-2"></i>{{ infoData.info.address }}
                </small>
                <small class="ms-4" v-if="infoData.info.email">
                    <i class="fa fa-envelope me-2"></i>{{ infoData.info.email }}
                </small>
            </div>
            <div class="col-md-4 px-5 text-end">
                <a v-for="social in infoData.socialLinks" class="text-white-50 ms-3" :href="social.link" target="_blank">
                    <i :class="social.icon_class"></i>
                </a>
            </div>
        </div>

        <nav class="navbar navbar-expand-lg navbar-dark py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
            <a href="/" class="navbar-brand ms-4 ms-lg-0">
                <h1 class="fw-bold text-primary m-0">{{ infoData.info.titleFirst }}<span class="text-white">{{ infoData.info.titleSecond }}</span></h1>
            </a>
            <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto p-4 p-lg-0">
<!--                  <RouterLink v-for="link in headerInfo.menu" class="nav-item nav-link"-->
<!--                              :to="{ name: link.link}">-->
<!--                    {{ link.title }}-->
<!--                  </RouterLink>-->
                  <a v-for="link in infoData.menu" class="nav-item nav-link"
                              :href="$router.resolve({name: link.link}).href">
                    {{ link.title }}
                  </a>
                  <div class="nav-item nav-link">
                      <Locales/>
                  </div>
                </div>
            </div>
        </nav>
    </div>
    <!-- Navbar End -->
</template>
