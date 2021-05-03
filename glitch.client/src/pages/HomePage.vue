<template>
  <div>
    <h2>Bugs</h2>
    <button class="btn btn-outline-green text" data-toggle="modal" data-target="#bug-modal">
      +
    </button>
    <div class="modal" id="bug-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light">
              New Note
            </h5>
          </div>
          <div class="modal-body bg-dark">
            <form class="form-group" @submit.prevent="create">
              <label>Note Message</label>
              <input type="text" class="form-control" required>
              <button type="button" class="btn btn-outline-danger text-danger" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-outline-primary text-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
