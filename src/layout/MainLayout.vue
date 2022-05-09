<template>
  <the-navbar/>
  <div class="container with-nav">
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar/TheNavbar.vue"
export default {
components: {TheNavbar}
}
</script>

<style>

</style>