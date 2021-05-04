<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid bg-black py-4">
      <router-view />
    </div>
  </main>
  <footer>
    <div class="bg-dark text-center p-4 text">
      glitch
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'

export default {
  name: 'App',
  setup() {
    onMounted(() => {
    })
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bg-black {
  background-color: $black;
}

.text{
    color: #00ff00;
}

</style>
