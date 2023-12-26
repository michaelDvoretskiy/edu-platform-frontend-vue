<script setup>
import {computed, onMounted, ref} from "vue";
import {useMaterialFullScreen} from "../../services/api/materialFullScrean";
import {getLocale} from "../../locales";
import {useRouter} from "vue-router";
import {useTests} from "../../services/api/tests";
import TestQuestion from "/src/components/myTheme/TestQuestion.vue";

const title = ref('')
const {materialName} = useMaterialFullScreen()
const router = useRouter()
const {getTest} = useTests()
const testData = ref(false)
const currentQuestionNumber = ref(0)

const duration = computed(() => {
  //console.log(testData.value.head.zones);
  return 10;
})

const questionsCount = computed(() => {
  return Object.values(testData.value?.questions).length;
})

onMounted(() => {
  new WOW().init();
  materialName.value = 'tests';
  getTest(1).then(res => {
    testData.value = res.data;
    console.log(res.data);
  });
});

function processPageTitle(pageTitle) {
  title.value = pageTitle
}

function gotoMain() {
  materialName.value = "";
  let href = router.resolve({ name: 'Home', params: {locale: getLocale()}}).href
  window.location.href = href
}

function changeCurrent(step) {
  currentQuestionNumber.value += step

  if (currentQuestionNumber.value >= questionsCount.value) {
    currentQuestionNumber.value = 0;
  }
  if (currentQuestionNumber.value < 0) {
    currentQuestionNumber.value = questionsCount.value - 1;
  }
}

function finishTest() {

}

function annulTest() {

}
</script>

<template>
  <div class="container" v-if="testData">
    <div class="row">
      <div class="float-start mt-1">
        <a class="btn btn-outline-secondary btn-sm">
          Повернутись до списку тестів
        </a>
      </div>
      <div class="col col-lg-8 offset-lg-2 text-center">
        <h1>{{ testData.head.title }}</h1>
<!--        <h5> testHeader.description </h5>-->
        <h4>Номер спроби:  {{ testData.head.tryNumber }} </h4>
        <div>
          <div class="float-start">
            Часові обмеження
            <button type="button" class="btn btn-outline-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#zonesModal">
              {{ testData.head.zones.name }}
            </button>
          </div>
          <div class="float-end">
            Залишилось  testTimeLeft
          </div>
        </div>
<!--        <div *ngIf="testHeader.res_status == 2">-->
<!--          <div class="float-start"-->
<!--               [class]="getStatusStyle(this.testHeader.finish_status)">-->
<!--            {{ getFinishStatus() }}-->
<!--          </div>-->
<!--          <div class="float-end">-->
<!--            Результат {{ this.testHeader.result }} балів-->
<!--          </div>-->
<!--        </div>-->
        <div class="clearfix"></div>
        <div class="mt-3">
<!--          <ng-container *ngFor="let q of testPills, let i=index">-->
<!--                <span class="badge rounded-pill q-number-pill ms-3 me-3"-->
<!--                      [class]="getPillClass(q.answer != 0, i == currentQuestionIndex, testAnswersRightFlags[q.number] == 1)" (click)="currentQuestionIndex=i">-->
<!--                    {{q.number}}-->
<!--                </span>-->
<!--          </ng-container>-->
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col col-lg-6 offset-lg-3 text-center">
        <div class="float-start">
          <button type="button" class="btn btn-outline-primary" @click="changeCurrent(-1)">&lt;&lt;</button>
        </div>
        <div class="float-end">
          <button type="button" class="btn btn-outline-primary" @click="changeCurrent(1)">&gt;&gt;</button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col col-lg-6 offset-lg-3 text-sm-center">
        <TestQuestion
            :question="testData.questions[currentQuestionNumber]"
            :answers="testData.answers[currentQuestionNumber]"/>
<!--        <app-question-->
<!--            [question]="testContent[testPills[currentQuestionIndex].number]"-->
<!--            [answers]="testPills[currentQuestionIndex].answer"-->
<!--            [editable]="this.testHeader.res_status == 1"-->
<!--            (makeAnswer)="acceptAnswer($event)"></app-question>-->
      </div>
    </div>
    <div class="row mt-5">
      <div class="col col-lg-6 offset-lg-3 text-center">
        <button type="button" class="btn btn-primary" @click="finishTest()">
          Завершити тест
        </button>
      </div>
    </div>
<!--    <div class="row mt-5" *ngIf="this.testHeader.res_status == 2">-->
<!--      <div class="col col-lg-6 offset-lg-3 text-center">-->
<!--        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#againModal">-->
<!--          Пройти заново-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
  </div>


  <div class="modal fade" id="againModal" tabindex="-1" aria-labelledby="againModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="againModalLabel">Ви впевнені ?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          При повторному проходженні поточні результати буде анульовано
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ні</button>
          <button type="button" class="btn btn-danger" @click="annulTest()">Так</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="zonesModal" tabindex="-1" aria-labelledby="againModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content" v-if="testData">
        <div class="modal-header">
          <h5 class="modal-title">Часові зони</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-for="zone in testData.head.zones.times">Від {{ zone.minutes }} хвилин - коефіцієнт {{ zone.koef }}</p>
        </div>
      </div>
    </div>
  </div>

  <button @click="gotoMain">finish</button>
</template>
