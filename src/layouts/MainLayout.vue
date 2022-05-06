<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          CRUD Vue Quasar
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <ModalConfirm ref="confirm" />
    <ModalUsersForm ref="usersForm" />
  </q-layout>
</template>

<script>
import ModalConfirm from '@/components/modal/ModalConfirm'
import ModalUsersForm from '@/components/modal/ModalUsersForm'

export default {
  components: { ModalConfirm, ModalUsersForm },

  data () {
    return {}
  },

  mounted () {
    this.registrarNotify()
    this.registerModals()
  },

  methods: {
    registerModals () {
      this.$root.modal = {}
      this.$root.modal.confirm = this.$refs.confirm
      this.$root.modal.usersForm = this.$refs.usersForm
    },

    registrarNotify () {
      this.$root.notify = (message, color) => {
        this.$q.notify({
          message: message,
          color: color,
          timeout: 0,
          actions: [
            { label: 'X', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      }
    }
  }
}
</script>
