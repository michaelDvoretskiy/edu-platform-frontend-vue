<script setup>
defineProps({
  infoData: Object
})
</script>

<template>
    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-white-50 footer wow fadeIn" data-wow-delay="0.1s" v-if="infoData && infoData.info">
        <div class="container pt-4">
            <div class="row g-5">
                <div class="col-md-4 mt-5">
                  <h1 class="fw-bold text-primary mb-2">{{ infoData.info.titleFirst }}<span class="text-white">{{ infoData.info.titleSecond }}</span></h1>
                  <div class="d-flex pt-1">
                    <a v-for="social in infoData.socialLinks" class="btn btn-square me-1" :href="social.link" target="_blank">
                      <i :class="social.icon_class"></i>
                    </a>
                  </div>
                </div>
                <div class="col-md-5 mt-3 mt-md-5">
                    <h5 class="text-light mb-2">{{ infoData.info.addressTitle }}</h5>
                    <p v-if="infoData.info.address">
                      <i class="fa fa-map-marker-alt me-3"></i>{{ infoData.info.address }}
                    </p>
                    <p v-if="infoData.info.email">
                      <i class="fa fa-envelope me-3"></i>{{ infoData.info.email }}
                    </p>
                </div>
                <div class="col-md-3 mt-1 mt-md-5">
                    <h5 class="text-light mb-2">{{ infoData.info.quickLinksTitle }}</h5>
                    <a v-for="link in infoData.menu" class="btn btn-link"
                       :href="$router.resolve({name: link.link}).href">
                      {{ link.title }}
                    </a>
                </div>
            </div>
        </div>
        <div class="container-fluid copyright">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center text-md-start mb-3 mb-md-0">
                        &copy; {{ infoData.info.rightsReserved }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->
</template>
