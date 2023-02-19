<template>
  <content-card title="Danh sách đăng kí vé tháng">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/monthly-card-registers"
        @editRow="editMonthlyCardRegister"
        @deleteRow="deleteMonthlyCardRegister"
      />

      <monthly-card-register-modal
        ref="modal"
        :on-action-success="reloadData"
      />
    </template>
  </content-card>
</template>

<script>
import dayjs from 'dayjs'
import { MANAGE } from '~/constants/permission-action.constant'
import { MONTHLY_CARD_REGISTER } from '~/constants/permission-object.constant'
import MonthlyCardRegisterModal from '~/components/features/monthly-card-register/Modal'

const columns = [
  {
    field: 'card',
    key: 'a',
    title: 'Id vé',
    align: 'left',
    sortBy: 'asc',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{row.card?._id}</span>
    },
  },
  {
    field: 'card',
    key: 'e',
    title: 'Chủ xe',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{row.card?.owner.fullName}</span>
    },
  },
  {
    field: 'card',
    key: 'f',
    title: 'Biển kiểm soát',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{row.card?.vehicle.plateNumber}</span>
    },
  },
  {
    field: 'registerDate',
    key: 'b',
    title: 'Ngày đăng kí',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{dayjs(row.registerDate).format('DD/MM/YYYY')}</span>
    },
  },
  {
    field: 'expiredDate',
    key: 'c',
    title: 'Ngày hết hạn',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{dayjs(row.expiredDate).format('DD/MM/YYYY')}</span>
    },
  },
  {
    field: 'amount',
    key: 'd',
    title: 'Phí (VND)',
    align: 'left',
  },
]

export default {
  name: 'MonthlyCardPage',
  components: { MonthlyCardRegisterModal },
  pageTitle: 'Quản lý vé đăng kí vé tháng',
  permission: [MANAGE, MONTHLY_CARD_REGISTER],
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
    editMonthlyCardRegister(monthlyCardRegister) {
      this.$refs.modal.show(monthlyCardRegister)
    },
    deleteMonthlyCardRegister(monthlyCardRegister) {
      this.$bvModal
        .msgBoxConfirm(
          `Bạn chắc chắn muốn xóa đăng kí vé "${monthlyCardRegister._id}"?`,
          {
            title: 'Cảnh báo',
            okVariant: 'danger',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy bỏ',
          }
        )
        .then(async (value) => {
          if (value) {
            await this.$axios.delete(
              '/monthly-card-registers/' + monthlyCardRegister._id
            )
            this.$notifyDeleteSuccess('đăng kí vé')
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
