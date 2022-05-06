<template>
  <q-page class="bg-grey-2">
    <div class="row" style="height: calc(100vh - 50px)">
      <div class="col bg-grey-2" :style="$q.screen.lt.md ? '' : 'padding: 0 18vw'">
        <UsersList ref="usersList"/>
      </div>
    </div>

    <q-page-sticky position="bottom-right" style="z-index: 5" :offset="$q.screen.gt.sm ? [35, 30] : [27, 22]">
      <q-btn fab icon="add" class="shadow-4" color="primary" @click="openModalFormUser()">
        <q-tooltip anchor="center left" self="center right">Novo usuário</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import UsersList from '@/components/users/UsersList'

export default {
  components: { UsersList },

  data () {
    return {}
  },

  methods: {
    openModalFormUser () {
      this.$root.modal.usersForm.show().then(() => {
        this.$refs.usersList.loadData()
      })
    }
  }
}
</script>
