<template>
  <div class="fit column bg-white shadow-4 q-py-lg">
    <div class="row no-wrap justify-between items-center q-pb-md q-px-lg">
      <span class="text-weight-medium text-grey-9 text-h6">Usuários</span>

      <div class="row no-wrap q-gutter-sm">
        <!-- <q-input rounded outlined v-model="search" dense debounce="500" placeholder="Pesquisar" class="input-pesquisar" color="deep-purple-4" label-color="grey-6" bg-color="grey-1">
          <template v-slot:append>
            <q-icon v-if="!search" name="search" color="grey-6"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="$emit('limparPesquisa')"/>
          </template>
        </q-input> -->
      </div>
    </div>

    <div class="col relative-position" style="min-height: 200px">
      <q-table
        :data="data"
        :columns="columns"
        :visible-columns="visibleColumns"
        v-if="data.length"
        row-key="id"
        flat
        virtual-scroll
        class="fit absolute users-list q-px-lg"
        :class="$q.screen.lt.md ? 'q-pb-xl' : ''"
        :rows-per-page-options="[ 5, 10, 20 ]"
        :pagination.sync="pagination"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <span>{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body-cell="props">
          <q-td :props="props">
            <template v-if="props.col.name === 'acoes'">
              <div class="q-gutter-md">
                <q-btn
                  icon="edit"
                  outline
                  round
                  dense
                  size="11px"
                  color="amber-13"
                  @click="openModalFormUser(props.row)"
                >
                  <q-tooltip :offset="[7, 7]">Editar</q-tooltip>
                </q-btn>

                <q-btn
                  outline
                  round
                  dense
                  size="11px"
                  color="red"
                  icon="delete"
                  @click="deleteUser(props.row)"
                >
                  <q-tooltip :offset="[7, 7]">Excluir</q-tooltip>
                </q-btn>
              </div>
            </template>

            <template v-else>
              {{ props.value }}
            </template>
          </q-td>
        </template>
      </q-table>

      <div class="q-pt-xl text-h6 text-center text-grey text-italic" v-if="!data.length" style="font-size: 1rem">
        Sem usuários para exibir
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: [],

  data () {
    return {
      data: [],
      search: null,
      pagination: { rowsPerPage: 20 }
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      axios.get('/api/users').then(response => {
        this.data = response.data
      })
    },

    openModalFormUser (user) {
      this.$root.modal.usersForm.show(user).then(() => {
        this.loadData()
      })
    },

    deleteUser (user) {
      const props = {
        titulo: 'Atenção',
        message: `Você tem certeza que deseja excluir o usuário (${user.name})?`,
        messageConfirm: 'Essa ação não podera ser desfeita!'
      }

      this.$root.modal.confirm.show(props).then(() => {
        axios.delete(`/api/users/${user.id}`).then(() => {
          this.$q.notify({ message: 'Usuário excluído com sucesso!', color: 'positive' })
          this.loadData()
        }).catch(e => {
          this.$root.modal.confirm.show({ titulo: 'Atenção', message: e.response.data, erro: true })
          this.$q.loading.hide()
        })
      })
    }
  },

  computed: {
    columns () {
      return [
        {
          name: 'name',
          label: 'Nome',
          align: 'left',
          field: 'name',
          style: 'height: 40px',
          visible: true
        },
        {
          name: 'email',
          label: 'E-mail',
          align: 'left',
          field: 'email',
          style: 'height: 40px',
          visible: true
        },
        {
          name: 'tel',
          label: 'Telefone',
          align: 'left',
          field: 'tel',
          style: 'height: 40px',
          visible: true
        },
        {
          name: 'status',
          label: 'Status',
          align: 'left',
          field: 'status',
          format: val => val ? 'Ativo' : 'Inativo',
          style: 'height: 40px',
          visible: true
        },
        {
          name: 'acoes',
          label: 'Ações',
          align: 'center',
          field: 'acoes',
          style: 'height: 40px',
          visible: true
        }
      ]
    },

    visibleColumns () {
      return this.columns.flatMap(column => {
        return column.visible ? column.name : null
      })
    }
  }
}
</script>

<style>
.input-pesquisar .q-field__control:before {
  border-color: #ECECEC;
}

.input-pesquisar .q-field__control:hover:before {
  border-color: #c9c0c0;
}

.users-list .scroll::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  background: transparent;
  overflow: visible;
}

.users-list .scroll::-webkit-scrollbar-thumb {
  background-color: #D2CFCF;
  border-radius: 10px;
}

.users-list .scroll::-webkit-scrollbar-track {
  margin-top: 48px;
}
</style>

<style lang="sass">
.users-list

  max-width: 100%

  td:last-child
    background-color: white !important

  tr th
    position: sticky
    z-index: 2
    background: #fff

  thead tr:first-child th
    top: 48px
    z-index: 3

  thead tr:last-child th
    top: 0
    z-index: 1

  tr:last-child th:last-child
    z-index: 3

  td:last-child
    z-index: 1

  td:last-child, th:last-child
    position: sticky
    right: 0
</style>
