<script setup>
import {onMounted} from "vue";

defineProps({
  show: Boolean
})

</script>
<template>
    <!-- Spinner Start -->
    <div id="spinner" :class="{'show': show}" class="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-grow text-primary" role="status"></div>
    </div>
    <!-- Spinner End -->
</template>
