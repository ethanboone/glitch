<template>
  <div class="row card justify-content-center align-items-center bg-dark my-2 flex-row" v-if="state.notes">
    <div class="col-6 text-light my-2">
      <img :src="note.creator.picture" height="35" alt="user icon">
      {{ note.creator.name }}
    </div>
    <div class="col-3 text-light">
      {{ note.body }}
    </div>
    <div class="col-2">
      <button class="btn text-danger" @click="deleteNote" v-if="state.user.isAuthenticated && state.note.creator.id === state.account.id">
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
import { notesService } from '../services/NotesService'

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
      },
      async deleteNote() {
        try {
          if (window.confirm('Are you sure you want to remove this note?')) {
            await notesService.deleteNote(props.note)
          }
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
