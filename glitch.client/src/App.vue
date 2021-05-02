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
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
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

</style>
