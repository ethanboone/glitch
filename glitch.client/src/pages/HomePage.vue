<template>
  <div>
    <!-- <BugsComponent v-for="bug in state.bugs" :key="id" :bugs="bugs" /> -->
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      bugsService.getAll()
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
