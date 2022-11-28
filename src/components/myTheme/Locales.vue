<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

function refreshWithLocale(locale) {
  window.location.href = router.resolve({ name: route.name, params: { locale: locale} }).href
}

</script>

<style scoped>
a {
    margin-right: 10px;
    font-size: 1.2em;
}
</style>

<template>
  <a class="fi fi-ua" @click="refreshWithLocale('uk')"></a>
  <a class="fi fi-gb" @click="refreshWithLocale('en')"></a>
  <a class="fi fi-pl" @click="refreshWithLocale('pl')"></a>
</template>
