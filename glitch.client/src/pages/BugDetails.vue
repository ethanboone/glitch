<template>
  <div class="row justify-content-center" v-if="state.bug">
    <!-- if modal doesn't work, could do if/else toggled with a button to edit title and description with form inputs
      text decoration line through for closed bugs -->
    <div class="col-12">
      <p class="text">
        Title
      </p>
      <h2 class="text">
        {{ state.bug.title }}
      </h2>
      <p class="text">
        Reported By
      </p>
      <h3 class="text">
        {{ state.bug.creator.name }}
      </h3>
      <p class="text">
        Status
      </p><h3 class="text">
        {{ state.bug.closed }}
      </h3>
    </div>
    <div class="col-10 d-flex text-center card bg-dark my-4" v-if="state.bug.description">
      <p class="text-light">
        {{ state.bug.description }}
      </p>
    </div>
    <div class="col-6 text-center my-2" @click="close">
      <button class="btn btn-outline-green text" v-if="state.bug.closed === false">
        Close Bug
      </button>
    </div>
    <div class="col-10">
      <div class="d-flex">
        <h2 class="text mx-3">
          Notes
        </h2>
        <button class="btn btn-outline-green text" data-toggle="modal" data-target="#note-modal" @click="state.toggle = !state.toggle">
          +
        </button>
      </div>
      <form class="form-group" @submit.prevent="create" v-if="state.toggle">
        <label class="text">Note Message</label>
        <input type="text" class="form-control" v-model="state.newNote.body" required>
        <button type="submit" class="btn btn-outline-green text">
          Create
        </button>
      </form>
    </div>
    <div class="col-12" v-if="state.notes[0]">
      <Note v-for="note in state.notes" :key="note.id" :note="note" :bug="bug"></note>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bugDetails),
      notes: computed(() => AppState.notes),
      newNote: { bug: route.params.id },
      toggle: false
    })
    onMounted(async() => {
      try {
        await bugsService.getOne(route.params.id)
        await notesService.getAll(route.params.id)
        logger.log(state.notes)
      } catch (error) {

      }
    })
    return {
      state,
      async getBugs() {
        try {
          await bugsService.getAll()
        } catch (error) {
          logger.error(error)
        }
      },
      async create() {
        try {
          await notesService.create(state.newNote)
          state.toggle = false
        } catch (error) {
          logger.error(error)
        }
      },
      async close() {
        try {
          if (window.confirm('Are you sure you want to close this bug? This cannot be undone and the bug cannot be edited after it is closed.')) {
            await bugsService.close(route.params.id)
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
.text{
    color: #00ff00;
}

.btn-outline-green{
    border-color: #00ff00;
}
</style>
