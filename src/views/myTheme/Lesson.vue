<script setup>
// https://stackoverflow.com/questions/13432821/is-it-possible-to-add-request-headers-to-an-iframe-src-request

import {onMounted, ref} from "vue";
import CourseShort from "/src/components/myTheme/CourseShort.vue";
import PageHeader from "/src/components/myTheme/PageHeader.vue";
import {CoursesDataGetter} from "/src/services/api/CoursesDataGetter";
import {useRoute} from "vue-router";
import {PdfFrameContent} from "/src/services/api/PdfFrameContent.js";
import {BaseMethods} from "/src/services/api/BaseMethods.js";

const lesson = ref({})
const hideTasks = ref({
  'material': {},
  'task': {}
})

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

async function getFrameHtml(file, frame) {
  return CoursesDataGetter.getPdf(file).then( res => {
    if (res.success) {
      const html = PdfFrameContent.getHtml(res.data.content)
      frame.srcdoc = html
    }
  })

}

function getIconClassByType(type) {
  if (type == 'pdf') {
    return 'fas fa-file-pdf';
  }
  if (type == 'video') {
    return 'fas fa-video';
  }
  if (type == 'task') {
    return 'fas fa-tasks';
  }
  return '';
}

function changeVisability(type, index, obj) {
  if (obj.type == 'pdf') {
    var iframe = document.getElementById(`frame-${obj.file}`)
    if (iframe != undefined && !iframe.srcdoc) {
      getFrameHtml(obj.file, iframe)
    }
  }
  var task = document.getElementById(`${type}-${index}`);
  task.style.display = (task.style.display == 'none') ? 'block' : 'none';
  hideTasks.value[type][index] = !hideTasks.value[type][index];
}

function getPdf(pdfId) {
  CoursesDataGetter.getPdf(pdfId).then(res => {
    console.log(res)
    // var data_url = URL.createObjectURL(res)

    var iframe = document.getElementById(`file-${pdfId}`)
    iframe = iframe.contentWindow || ( iframe.contentDocument.document || iframe.contentDocument)
    console.log(iframe)

    iframe.document.open()
    iframe.document.write(res.data.html)
    iframe.document.close()

    // console.log(data_url)
    // document.querySelector(`#${frameId}`).src = data_url;
  })
}

</script>

<template>
  <PageHeader :title="lesson.title" :menu="lesson.headerLink"/>

  <div class="container-xxl py-5" v-if="lesson.title">
    <div class="container">
      <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">{{ lesson.title }}</div>
        <h4 class="mb-5 text-black-50">{{ lesson.description }}</h4>
      </div>
      <div v-for="(material, index) in lesson.materials" class="mb-5">
        <div class="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">
          <div class="text-center p-4 pt-0 pb-0" @click="changeVisability('material', index, material)">
            <div class="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-2">
              <small>
                <i :class="getIconClassByType(material.type)" class="ms-2"></i>
                {{ material.title }}
                <i v-if="!hideTasks['material'][index]" class="fas fa-chevron-circle-down ms-4"></i>
                <i v-if="hideTasks['material'][index]" class="fas fa-chevron-circle-up ms-4"></i>
              </small>
            </div>
          </div>
        </div>
        <div style="display: none;" :id="'material-'+index">
          <div v-if="material.type=='pdf'">
            <iframe :id="'frame-'+material.file" width="100%" height="500px"></iframe>
          </div>
          <div v-if="material.type=='video'" class="video-container">
            <iframe class="responsive-iframe" :src="material.link"></iframe>
          </div>
        </div>
      </div>

      <div v-for="(task, index) in lesson.tasks" class="mb-5">
        <div class="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">
          <div class="text-center p-4 pt-0 pb-0" @click="changeVisability('task', index, task)">
            <div class="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-2">
              <small>
                <i :class="getIconClassByType('task')" class="ms-2"></i>
                {{ task.title }}
                <i v-if="!hideTasks['task'][index]" class="fas fa-chevron-circle-down ms-4"></i>
                <i v-if="hideTasks['task'][index]" class="fas fa-chevron-circle-up ms-4"></i>
              </small>
            </div>
          </div>
        </div>
        <div style="display: none;" :id="'task-'+index">
          <div>
<!--            <iframe :src="getPdfSrc(task.file)" width="100%" height="500px">-->
<!--            </iframe>-->
<!--            <iframe id="frame-{{task.file}}" width="100%" height="500px">-->
<!--            </iframe>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-height: 500px;
}

</style>