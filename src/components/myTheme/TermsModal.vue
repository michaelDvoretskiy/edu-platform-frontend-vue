<script setup>
import {onMounted} from "vue";

defineProps({
  terms: Object
})

</script>
<template>
  <!-- terms modal -->
  <div v-if="terms" class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="termsModalLabel">{{ terms.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            {{ terms.text1 }}
          </p>
          <p>
            {{ terms.text2 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
