<script setup>
import {onMounted} from "vue";

const props = defineProps({
  course: Object
})

onMounted(() => {
    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
});
</script>
<template>
  <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
    <div class="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">
      <div class="text-center p-4 pt-0">
        <div class="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-4">
          <small>{{ course.progLanguages }}</small>
        </div>
        <div class="position-relative mt-auto">
          <img class="img-fluid" :src="course.img_path" alt="">
          <div class="causes-overlay">
            <div class="mb-3 text-white">{{ course.title }}</div>
            <div>
              <a class="btn btn-outline-primary" href="">
                Read More
                <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                  <i class="fa fa-arrow-right"></i>
                </div>
              </a>
            </div>

          </div>
        </div>
        <h5 class="mt-3">{{ course.title }}</h5>
<!--        <p>{{ course.description }}</p>-->
<!--        <div class="causes-progress bg-light p-3 pt-2">-->
<!--          <div class="d-flex justify-content-between">-->
<!--            <p class="text-dark">$10,000 <small class="text-body">Goal</small></p>-->
<!--            <p class="text-dark">$9,542 <small class="text-body">Raised</small></p>-->
<!--          </div>-->
<!--          <div class="progress">-->
<!--            <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">-->
<!--              <span>90%</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
