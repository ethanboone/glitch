<template>
  <div class="row card bg-dark my-2" v-if="state.notes">
    <div class="col-7 text-light my-2">
      {{ note.creator.name }}
      <img :src="note.creator.picture" height="35" alt="user image">
    </div>
    <div class="col-3 text-light">
      {{ note.body }}
    </div>
    <div class="col-2">
      <button class="btn text-danger">
        X
      </button>
    </div>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      notes: computed(() => AppState.notes)
    })
    return {
      state,
      async getAll() {
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

<style scoped>
tr > td{
  border:2px solid #00ff00;
}

.text{
    color: #00ff00;
}

a:hover{
    text-decoration: none;
}

</style>
