<script setup>
  defineProps({
    title: String,
    menu: Object
  })
</script>

<template>
    <!-- Page Header Start -->
    <div class="container-fluid page-header mb-3 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center">
            <h1 class="display-4 text-white animated slideInDown mb-4">{{ title }}</h1>
            <nav v-if="menu" aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item" v-for="menuItem in menu">
                      <RouterLink v-if="menuItem.type=='route'" class="text-white font-weight-bold" :to="{ name: menuItem.link, params: menuItem.link_params}">
                        {{ menuItem.title }}
                      </RouterLink>
                      <a v-if="menuItem.type=='href'" class="text-white" :href="menuItem.link">
                        {{ menuItem.title }}
                      </a>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- Page Header End -->
</template>

<style scoped>
  .breadcrumb-item a:hover {
    color: var(--primary) !important;
  }
</style>
