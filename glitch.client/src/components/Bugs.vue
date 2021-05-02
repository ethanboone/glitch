<template>
  <router-link :to="{name: 'BugDetails', params: {id: bug.id}}">
    <tr class="text">
      <td>{{ bug.title }}</td>
      <td>{{ bug.creator.name }}</td>
      <td>{{ bug.closed }}</td>
      <td>{{ bug.updatedAt }}</td>
    </tr>
  </router-link>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Bugs',
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
  border:2px solid #008F11;
}

.text{
    color: #008F11;
}

a:hover{
    text-decoration: none;
}

</style>
