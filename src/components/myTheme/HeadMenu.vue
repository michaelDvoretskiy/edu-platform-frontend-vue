<script setup>
import {onMounted, computed, onUpdated, ref} from "vue";
import Locales from "@/components/myTheme/Locales.vue";
import {Auth} from "/src/services/api/Auth";
import {useRouter} from "vue-router";
import {getLocale} from "../../locales";

const isLoggedIn = ref(false)
const router = useRouter()
const visible = ref(false)
const userName = ref('')
//const isLoggedIn = computed(() => Auth.isUserLoggedIn())

defineProps({
  infoData: Object
})

onUpdated(() => {
  isLoggedIn.value = Auth.isUserLoggedIn()
  if (isLoggedIn.value) {
    userName.value = Auth.getUserName()
  }
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

function logout() {
  Auth.logout(router);
}

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
              <RouterLink class="navbar-brand ms-4 ms-lg-0" :to="{ name: 'Home'}">
                <h1 class="fw-bold text-primary m-0">{{ infoData.info.titleFirst }}<span class="text-white">{{ infoData.info.titleSecond }}</span></h1>
              </RouterLink>
            <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    @click="visible=!visible">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse" id="navbarCollapse" :class="!visible?'collapse':''">
                <div class="navbar-nav ms-auto p-4 p-lg-0">
                  <RouterLink v-for="link in infoData.menu" class="nav-item nav-link" :to="{ name: link.link}"
                              @click="visible=!visible">
                    {{ link.title }}
                  </RouterLink>
                  <RouterLink v-if="!isLoggedIn" class="nav-item nav-link" :to="{ name: 'Login'}"
                              @click="visible=!visible">
                    <i class="fas fa-sign-in-alt"></i> Login
                  </RouterLink>
                  <div v-if="isLoggedIn" class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">{{ userName }}</a>
                    <div class="dropdown-menu m-0">
                      <RouterLink v-for="link in infoData.userMenu" class="dropdown-item" :to="{ name: link.link}"
                                  @click="visible=!visible">
                        {{ link.title }}
                      </RouterLink>
                      <a class="dropdown-item" href="" @click.prevent="logout">
                        Logout <i class="fas fa-sign-out-alt"></i>
                      </a>
                    </div>
                  </div>
                  <div class="nav-item nav-link">
                      <Locales/>
                  </div>
                </div>
            </div>
        </nav>
    </div>
    <!-- Navbar End -->
</template>
