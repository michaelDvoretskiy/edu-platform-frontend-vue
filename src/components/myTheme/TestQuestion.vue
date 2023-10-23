<script setup>

import {onMounted, ref, reactive} from "vue";
import {useTests} from "../../services/api/tests";

const props = defineProps({
  question: Object
})

let userAnswer = []
let radioAnswer;
const checkboxAnswer = ref([])

function makeRadioAnswer() {
  userAnswer = [radioAnswer];
  makeAnswer();
}

function makeCheckAnswer() {
  userAnswer = Object.values(checkboxAnswer.value);
  makeAnswer();
}

function makeAnswer() {
  console.log(userAnswer)
}

onMounted(() => {
})
</script>

<template>
  <h4 class="mt-4 text-start" style="white-space: pre-wrap;" v-html="question.title">
  </h4>

  <div class="form-check answer text-start mt-3" v-for="(answer, key) in question.answers">
    <template v-if="question.multi==1">
      <input class="form-check-input" type="radio" name="answer" :id="'answer-'+key" :value="answer.id"
             v-model="radioAnswer" @change="makeRadioAnswer" >
    </template>
    <template v-if="question.multi!=1">
      <input class="form-check-input" type="checkbox" :id="'answer-'+key" :value="answer.id"
             v-model="checkboxAnswer" @change="makeCheckAnswer" >
    </template>
    <label class="form-check-label" :for="'answer-'+key" v-html="answer.title">
    </label>

  </div>
  <div>
    {{checkboxAnswer}}
  </div>
</template>

<style scoped>
</style>