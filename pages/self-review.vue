<template>
  <content-card title="Danh sách nhận xét">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>

    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/self-reviews"
        @editRow="editSelfReview"
        @deleteRow="deleteSelfReview"
      />
      <self-review-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { SELF_REVIEW } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'fullName',
    key: 'a',
    title: 'Họ và tên',
    align: 'left',
    sortBy: 'asc',
    width: 150,
  },
  {
    field: 'job',
    key: 'b',
    title: 'Nghề nghiệp',
    align: 'left',
    width: 150,
  },
  {
    field: 'workPlace',
    key: 'c',
    title: 'Nơi làm việc',
    align: 'left',
    width: 150,
  },
  {
    field: 'comment',
    key: 'd',
    title: 'Nhận xét',
    align: 'left',
  },
]
export default {
  name: 'SelfReview',
  pageTitle: 'Quản lý nhận xét',
  permission: [MANAGE, SELF_REVIEW],
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
    editSelfReview(selfReview) {
      this.$refs.modal.show(selfReview)
    },
    deleteSelfReview(selfReview) {
      this.$bvModal
        .msgBoxConfirm(
          `Bạn chắc chắn muốn xóa nhận xét của "${selfReview.fullName}"?`,
          {
            title: 'Cảnh báo',
            okVariant: 'danger',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy bỏ',
          }
        )
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/self-reviews/' + selfReview._id)
            this.$notifyDeleteSuccess('nhận xét')
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
