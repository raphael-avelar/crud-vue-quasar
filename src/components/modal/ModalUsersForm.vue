<template>
  <q-dialog ref="modal" persistent>
    <q-card style="width: 450px">
      <q-card-section class="column text-center">
        <div class="text-weight-medium" style="font-size: 15px">{{ user ? 'Editar usuário' : 'Novo usuário' }}</div>
      </q-card-section>

      <q-form ref="form" greedy no-error-focus class="q-px-lg">
        <q-input v-model="form.name" label="Nome *" dense :rules="[ val => val !== null && val !== '' ]" maxlength="50" color="deep-purple-4" />

        <q-input
          v-model="form.email"
          label="E-mail *"
          dense
          maxlength="50"
          :rules="[ val => val !== null && val !== '', val => validateEmail(val) || 'E-mail inválido' ]"
        />

        <q-input
          v-model="form.tel"
          label="Telefone *"
          dense
          mask="(##) #####-####"
          :rules="[ val => val !== null && val !== '' && val.length === 15 ]"
        />

        <q-select
          v-model="form.status"
          label="Status *"
          dense
          options-dense
          :options="optionsStatus"
          :rules="[ val => val !== null && val !== '' ]"
        />
      </q-form>

      <q-card-actions align="between" class="q-px-lg q-pt-none">
        <q-btn flat size="13px" label="Cancelar" color="grey-7" v-close-popup />
        <q-btn flat size="13px" label="Confirmar" color="red" @click="validateForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      resolve: null,
      user: null,
      optionsStatus: [
        { value: true, label: 'Ativo' },
        { value: false, label: 'Inativo' }
      ],
      form: {
        name: null,
        email: null,
        tel: null,
        status: null
      }
    }
  },

  methods: {
    show (user) {
      this.clearFields()
      this.user = user

      if (this.user) this.loadDataForEdit()
      this.$refs.modal.show()

      return new Promise(resolve => {
        this.resolve = resolve
      })
    },

    conclude () {
      this.hide()
      this.resolve()
    },

    hide () {
      this.$refs.modal.hide()
    },

    validateForm () {
      this.$refs.form.validate().then(valido => {
        if (valido) {
          this.user ? this.edit() : this.create()
        } else {
          this.$q.notify({ message: 'Campos obrigatórios não preenchidos ou inválidos', color: 'negative' })
        }
      })
    },

    create () {
      const payload = this.getPayload()

      axios.post('/api/users', payload).then(() => {
        this.$q.notify({ message: 'Usuário criado com sucesso!', color: 'positive' })
        this.conclude()
      }).catch(e => {
        this.$root.modal.confirm.show({ titulo: 'Atenção', message: e.response.data, erro: true })
        this.$q.loading.hide()
      })
    },

    edit () {
      const payload = this.getPayload()

      axios.put(`/api/users/${payload.id}`, payload).then(() => {
        this.$q.notify({ message: 'Usuário editado com sucesso!', color: 'positive' })
        this.conclude()
      }).catch(e => {
        this.$root.modal.confirm.show({ titulo: 'Atenção', message: e.response.data, erro: true })
        this.$q.loading.hide()
      })
    },

    getPayload () {
      return {
        id: this.user ? this.user.id : new Date().getTime(),
        name: this.form.name,
        email: this.form.email,
        tel: this.form.tel,
        status: this.form.status.value
      }
    },

    loadDataForEdit () {
      this.form = {
        name: this.user.name,
        email: this.user.email,
        tel: this.user.tel,
        status: this.optionsStatus.find(status => status.value === this.user.status)
      }
    },

    clearFields () {
      this.form = {
        name: null,
        email: null,
        tel: null,
        status: null
      }
    },

    validateEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val)
    }
  }
}
</script>
