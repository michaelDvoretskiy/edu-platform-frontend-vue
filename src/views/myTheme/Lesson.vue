<script setup>
import {onMounted, ref} from "vue";
import CourseShort from "/src/components/myTheme/CourseShort.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import {CoursesDataGetter} from "/src/services/api/CoursesDataGetter";
import {useRoute} from "vue-router";

const lesson = ref({})

const route = useRoute()

function getLangIconClass(lng)
{
  if (lng == "uk") {
    return "fi fi-ua fis";
  }
  if (lng == "pl") {
    return "fi fi-pl fis";
  }
  return "fi fi-gb fis";
}

onMounted(() => {
  CoursesDataGetter.getLesson(route.params.lesson).then( res => {
    lesson.value = res
  })

  new WOW().init();
});

function getPdfSrc(id) {
  return `http://localhost:8000/api/pdf/show/${id}`;
}

</script>

<template>
  <PageHeader :title="lesson.title"/>

  <div class="container-xxl py-5" v-if="lesson.title">
    <div class="container">
      <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ lesson.title }}</div>
        <h4 class="mb-5 text-black-50">{{ lesson.description }}</h4>
      </div>
<!--      <div v-for="material in lesson.materials" class="row">-->
<!--        <div class="bg-white border-start border-5 border-primary rounded-start mb-3 col-4 p-0">-->
<!--          <div class="p-4 ps-0">-->
<!--            <div class="align-middle bg-primary text-white rounded-end fs-5 p-1 px-3 d-inline-block">-->
<!--              read <i class="fas fa-file-pdf ms-2"></i>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-8">-->
<!--          {{ material.title }}-->
<!--        </div>-->
<!--      </div>-->
      <div v-for="material in lesson.materials">
        <div class="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">
          <div class="text-center p-4 pt-0 pb-0">
            <div class="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-2">
              <small>{{ material.title }} <i class="fas fa-file-pdf ms-2"></i></small>
            </div>
          </div>
        </div>
        <iframe :src="getPdfSrc(material.file)" width="100%" height="500px">
        </iframe>
      </div>
    </div>
  </div>
</template>