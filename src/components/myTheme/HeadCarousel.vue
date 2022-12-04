<script setup>
import {onMounted, ref} from "vue";
import {InfoGetter} from "/src/services/api/InfoGetter.js";

const data = ref({})

onMounted(() => {
  InfoGetter.getHomeCarousel().then( res => {
    data.value = res
  })
})

</script>
<template>
    <!-- Carousel Start -->
    <div class="container-fluid p-0 mb-5">
        <div id="header-carousel" class="carousel slide" data-bs-ride="carousel" v-if="data && data[0]">
            <div class="carousel-inner">
                <div class="carousel-item" v-for="(item, index) in data" :class="{'active' : index == 0}" >
                    <img class="w-100" :src="item.img_path" alt="Image">
                    <div class="carousel-caption">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-7 pt-5">
                                    <h1 class="display-4 text-white mb-3 animated slideInDown">
                                      {{ item.title }}
                                    </h1>
                                    <p class="fs-5 text-white-80 mb-5 animated slideInDown">
                                      {{ item.content_text }}
                                    </p>
<!--                                    <a class="btn btn-primary py-2 px-3 animated slideInDown" v-if="item.btn_flag == 1" href="">-->
                                    <RouterLink class="btn btn-primary py-2 px-3 animated slideInDown" v-if="item.btn_flag == 1"
                                       :to="{ name: item.link}">
                                      {{ item.link_title }}
                                      <div class="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                                        <i class="fa fa-arrow-right"></i>
                                      </div>
                                    </RouterLink>

<!--                                    </a>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <!-- Carousel End -->
</template>
