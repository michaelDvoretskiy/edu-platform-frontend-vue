<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";

import {onMounted, ref} from "vue";
import {PageDataGetter} from "/src/services/api/PageDataGetter.js";

const data = ref({dataParts:{}})

onMounted(() => {
  PageDataGetter.getPageData('haveToLogin').then( res => {
    data.value = res
  })
})
</script>

<template>
  <PageHeader :title="data.title"/>
  <div class="container-xxl py-4 pt-1 pb-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="text-center">
            <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
              {{ data.title }}
            </div>
            <h4>{{ data.dataParts.text }}</h4>
            <h3 class="mb-3">
              <RouterLink :to="{ name: 'Login'}">
                <i class="fas fa-sign-in-alt"></i> {{ data.dataParts.linkText }}
              </RouterLink>
            </h3>
            <h4>{{ data.dataParts.text2 }}</h4>
            <h3 class="mb-3">
              <RouterLink :to="{ name: 'Register'}">
                {{ data.dataParts.linkText2 }}
              </RouterLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>