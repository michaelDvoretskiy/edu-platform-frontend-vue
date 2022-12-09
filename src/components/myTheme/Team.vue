<script setup>
import {onMounted, ref} from "vue";
import {PageDataGetter} from "/src/services/api/PageDataGetter";
import {TeamDataGetter} from "/src/services/api/TeamDataGetter";

const pageData = ref({})
const teamMember = ref({})

onMounted(() => {
  PageDataGetter.getPageData('team').then( res => {
    pageData.value = res
  })
  TeamDataGetter.getTeamMemberData('mykhailo_dvoretskyi').then( res => {
    teamMember.value = res
  })
})
</script>
<template>
    <!-- Team Start -->
    <div class="container-xxl py-5">
        <div class="container" v-if="teamMember && pageData && pageData.title">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
                <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ pageData.title }}</div>
                <h1 class="display-6 mb-5">{{ pageData.dataParts.headerText }}</h1>
            </div>
            <div class="row g-4">
              <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div class="team-item position-relative rounded overflow-hidden">
                  <div class="overflow-hidden">
                    <img class="img-fluid" :src="teamMember.img_path" alt="">
                  </div>
                  <div class="team-text bg-light text-center p-4">
                    <h5>{{ teamMember.title }}</h5>
                    <p class="text-primary">{{ teamMember.profession }}</p>
                    <div class="team-social text-center">
                      <a v-for="memberLink in teamMember.links" class="btn btn-square" :href="memberLink.link" target="_blank">
                        <i :class="memberLink.icon_class" v-if="memberLink.icon_exists"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-6 wow fadeInUp d-flex" data-wow-delay="0.1s">
                  <div class="bg-light text-center p-4 h-100 w-100">
                    <h5>{{ teamMember.title_full }}</h5>
                    <p class="text-primary">{{ teamMember.profession_full }}</p>
                    <div class="team-social text-center">
                      <p style="margin-left: 20px; text-align: justify;" v-for="descr in teamMember.descriptions">
                        <i :class="descr.icon_class" v-if="descr.icon_exists"></i>
                        {{ descr.title }}
                      </p>
                    </div>
                  </div>
              </div>
<!--                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">-->
<!--                    <div class="team-item position-relative rounded overflow-hidden">-->
<!--                        <div class="overflow-hidden">-->
<!--                            <img class="img-fluid" src="/img/team-2.jpg" alt="">-->
<!--                        </div>-->
<!--                        <div class="team-text bg-light text-center p-4">-->
<!--                            <h5>Full Name</h5>-->
<!--                            <p class="text-primary">Designation</p>-->
<!--                            <div class="team-social text-center">-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">-->
<!--                    <div class="team-item position-relative rounded overflow-hidden">-->
<!--                        <div class="overflow-hidden">-->
<!--                            <img class="img-fluid" src="/img/team-3.jpg" alt="">-->
<!--                        </div>-->
<!--                        <div class="team-text bg-light text-center p-4">-->
<!--                            <h5>Full Name</h5>-->
<!--                            <p class="text-primary">Designation</p>-->
<!--                            <div class="team-social text-center">-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">-->
<!--                    <div class="team-item position-relative rounded overflow-hidden">-->
<!--                        <div class="overflow-hidden">-->
<!--                            <img class="img-fluid" src="/img/team-4.jpg" alt="">-->
<!--                        </div>-->
<!--                        <div class="team-text bg-light text-center p-4">-->
<!--                            <h5>Full Name</h5>-->
<!--                            <p class="text-primary">Designation</p>-->
<!--                            <div class="team-social text-center">-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>-->
<!--                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>
    </div>
    <!-- Team End -->
</template>
