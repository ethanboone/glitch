<template>
  <div>
    <!-- <BugsComponent v-for="bug in state.bugs" :key="bug.id" :bugs="bug" /> -->
    <table class="table table-bordered border-success">
      <thead>
        <tr class="text">
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Created By
          </th>
          <th scope="col">
            Closed
          </th>
          <th scope="col">
            Last Updated
          </th>
        </tr>
      </thead>
      <tbody>
        <Bugs v-for="bug in state.bugs" :bug="bug" :key="bug.id" />
      </tbody>
    </table>
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
      state,
      draw() {
      }
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

table.table-bordered > thead > tr > th{
  border:3px solid #00ff00;
}

.text{
    color: #00ff00;
}
</style>
