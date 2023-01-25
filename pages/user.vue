<template>
  <content-card title="Danh sách người dùng">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>

    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        hide-action-column
        remote-url="/users"
      />

      <user-modal ref="modal" :on-action-success="reloadData" />
      <user-reset-password-modal
        ref="resetPasswordModal"
        :on-action-success="reloadData"
      />
    </template>
  </content-card>
</template>

<script>
import { ACTIVE, INACTIVE } from '~/constants/user-status.constant'
import { MANAGE } from '~/constants/permission-action.constant'
import { USER } from '~/constants/permission-object.constant'

export default {
  name: 'UserPage',
  pageTitle: 'Quản lý người dùng CMS',
  permission: [MANAGE, USER],
  data() {
    return {
      columns: [
        {
          field: 'email',
          key: 'a',
          title: 'Email',
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: 'fullName',
          key: 'b',
          title: 'Họ và tên',
          align: 'left',
        },
        {
          field: 'role',
          key: 'c',
          title: 'Nhóm người dùng',
          align: 'left',
          renderBodyCell: ({ row, column }, h) => {
            return <span>{row.role.displayName}</span>
          },
        },
        {
          field: 'status',
          key: 'd',
          title: 'Trạng thái',
          align: 'left',
          renderBodyCell: ({ row, column }, h) => {
            if (row.status === ACTIVE) {
              return <span class="text-success">Đang hoạt động</span>
            } else if (row.status === INACTIVE) {
              return <span class="text-secondary">Chưa kích hoạt</span>
            } else {
              return <span class="text-danger">Khóa</span>
            }
          },
        },
        {
          field: '',
          key: 'action',
          title: 'Hành động',
          width: 250,
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                <button
                  class="btn btn-sm btn-info"
                  on-click={() => this.resetPassword(row)}
                >
                  Đổi mật khẩu
                </button>
                &nbsp;
                <button
                  class="btn btn-sm btn-primary"
                  on-click={() => this.editUser(row)}
                >
                  Cập nhật
                </button>
                &nbsp;
                <button
                  class="btn btn-sm btn-danger"
                  on-click={() => this.deleteUser(row)}
                >
                  Xóa
                </button>
              </span>
            )
          },
        },
      ],
    }
  },
  methods: {
    reloadData() {
      this.$refs.table.loadData()
    },
    show() {
      this.$refs.modal.show()
    },
    editUser(user) {
      this.$refs.modal.show(user)
    },
    deleteUser(user) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa người dùng "${user.email}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/users/' + user._id)
            this.$notifyDeleteSuccess('người dùng')
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
    resetPassword(user) {
      this.$refs.resetPasswordModal.show(user)
    },
  },
}
</script>
