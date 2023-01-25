<template>
  <content-card title="Danh sách nhóm người dùng">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/roles"
        @editRow="editRole"
        @deleteRow="deleteRole"
      />

      <role-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { ROLE } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Mã nhóm người dùng',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'displayName',
    key: 'b',
    title: 'Tên hiển thị',
    align: 'left',
  },
  {
    field: 'status',
    key: 'c',
    title: 'Trạng thái',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return row.status ? (
        <span class="text-success">Đang sử dụng</span>
      ) : (
        <span class="text-danger">Khóa</span>
      )
    },
  },
]

export default {
  name: 'RolePage',
  pageTitle: 'Quản lý nhóm người dùng',
  permission: [MANAGE, ROLE],
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
    editRole(role) {
      this.$refs.modal.show(role)
    },
    deleteRole(role) {
      this.$bvModal
        .msgBoxConfirm(
          `Bạn chắc chắn muốn xóa nhóm người dùng "${role.name}"?`,
          {
            title: 'Cảnh báo',
            okVariant: 'danger',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy bỏ',
          }
        )
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/roles/' + role._id)
            this.$notifyDeleteSuccess('nhóm người dùng')
            this.reloadData()
          }
        })
        .catch((e) => {
          if (e.response) {
            if (
              e.response.status === 400 &&
              e.response.data.code === 'DATA_REFERENCE'
            ) {
              this.$notify(
                'Thông báo',
                'Dữ liệu đang được sử dụng, không thể xóa!',
                'danger'
              )
            }
          } else {
            this.$notifyTryAgain()
          }
        })
    },
  },
}
</script>
