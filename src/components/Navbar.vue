<template>
  <nav class="blue-grey lighten-2">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Index' }" class="brand-logo center">Smoothies</router-link>
      <a href="" class="btn-floating btn-large halfway-fab light-green lighten-3">
        <router-link :to="{ name: 'AddSmoothie' }">
          <i class="material-icons">add</i>
        </router-link>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
