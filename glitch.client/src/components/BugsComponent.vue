<template>
  <button class="btn btn-primary">
    Bugs
  </button>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'

export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    return {
      state,
      async getBugs() {
        try {
          await bugsService.getAll()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
