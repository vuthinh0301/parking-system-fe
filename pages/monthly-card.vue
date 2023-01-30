<template>
  <content-card title="Danh sách vé tháng">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/monthly-cards"
        @editRow="editMonthlyCard"
        @deleteRow="deleteMonthlyCard"
      />

      <monthly-card-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { MONTHLY_CARD } from '~/constants/permission-object.constant'
import MonthlyCardModal from '~/components/features/monthly-card/Modal'

const columns = [
  {
    field: 'owner',
    key: 'a',
    title: 'Id chủ vé',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'vehicle',
    key: 'b',
    title: 'Id phương tiện',
    align: 'left',
  },
  {
    field: 'status',
    key: 'c',
    title: 'Trạng thái vé',
    align: 'left',
  },
  {
    field: 'balance',
    key: 'd',
    title: 'Số dư vé (VND)',
    align: 'left',
  },
]

export default {
  name: 'MonthlyCardPage',
  components: { MonthlyCardModal },
  pageTitle: 'Quản lý vé tháng',
  permission: [MANAGE, MONTHLY_CARD],
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
    editMonthlyCard(monthlyCard) {
      this.$refs.modal.show(monthlyCard)
    },
    deleteMonthlyCard(monthlyCard) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa vé "${monthlyCard._id}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/monthly-cards/' + monthlyCard._id)
            this.$notifyDeleteSuccess('vé')
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
