<template>
  <content-card title="Danh sách quyền người dùng">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/permissions"
        @editRow="editPermission"
        @deleteRow="deletePermission"
      />

      <permission-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { PERMISSION } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên quyền',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'action',
    key: 'b',
    title: 'Hoạt động',
    align: 'left',
  },
  {
    field: 'object',
    key: 'c',
    title: 'Đối tượng',
    align: 'left',
  },
]

export default {
  name: 'PermissionPage',
  pageTitle: 'Quản lý quyền truy cập',
  permission: [MANAGE, PERMISSION],
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
    editPermission(permission) {
      this.$refs.modal.show(permission)
    },
    deletePermission(permission) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa quyền "${permission.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/permissions/' + permission._id)
            this.$notifyDeleteSuccess('quyền')
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
