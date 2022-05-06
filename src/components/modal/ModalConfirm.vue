<template>
  <q-dialog ref="modal" persistent>
    <q-card style="width: 340px">
      <q-card-section class="column text-center">
        <div class="text-weight-medium q-pb-md" style="font-size: 15px">{{ props.title }}</div>
        <div style="font-size: 13px">{{ props.message }}</div>
        <div style="font-size: 13px">{{ props.messageConfirm }}</div>
      </q-card-section>

      <q-card-actions v-if="props.alert" class="row justify-center q-pt-none">
        <q-btn size="13px" label="Entendi" color="grey-9" text-color="yellow-12" @click="confirm" />
      </q-card-actions>

      <q-card-actions v-else-if="props.erro" class="row justify-center q-pt-none">
        <q-btn flat size="13px" label="Entendi" color="red" @click="confirm" />
      </q-card-actions>

      <q-card-actions v-else align="between" class="q-px-lg q-pt-none">
        <q-btn flat size="13px" label="Cancelar" color="grey-7" v-close-popup />
        <q-btn flat size="13px" label="Confirmar" color="red" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      resolve: null,
      props: {
        title: null,
        message: null,
        messageConfirm: null,
        alert: false,
        erro: false
      }
    }
  },

  methods: {
    show (props) {
      if (this.$refs.modal.$data.showing) return

      this.props = props
      this.$refs.modal.show()

      return new Promise(resolve => {
        this.resolve = resolve
      })
    },

    hide () {
      this.$refs.modal.hide()
    },

    confirm () {
      this.hide()
      this.resolve()
    }
  }
}
</script>
