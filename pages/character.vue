<template>
  <content-card title="Danh sách nhân vật">
    <template #toolbar>
      <b-button variant="primary" @click="show()">
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/characters"
        @editRow="editCharacter"
        @deleteRow="deleteCharacter"
      />
      <character-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { CHARACTER } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên nhân vật',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'key',
    key: 'b',
    title: 'Key',
    align: 'left',
  },
  {
    field: 'description',
    key: 'c',
    title: 'Mô tả',
    align: 'left',
  },
  {
    field: 'status',
    key: 'd',
    title: 'Trạng thái',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return row.status ? (
        <span class="text-success">True</span>
      ) : (
        <span class="text-danger">False</span>
      )
    },
  },
]
export default {
  name: 'CharacterPage',
  pageTitle: 'Quản lý nhân vật',
  permission: [MANAGE, CHARACTER],
  data() {
    return {
      columns,
    }
  },
  methods: {
    show() {
      this.$refs.modal.show()
    },
    reloadData() {
      this.$refs.table.loadData()
    },
    editCharacter(character) {
      this.$refs.modal.show(character)
    },
    deleteCharacter(character) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa nhân vật "${character.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/characters/' + character._id)
            this.$notifyDeleteSuccess('nhân vật')
            this.reloadData()
          }
        })
        .catch(() => {
          this.$notifyTryAgain()
        })
    },
  },
}
</script>
