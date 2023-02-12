<template>
  <content-card title="Danh sách ra vào bằng vé lượt">
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/daily-parking"
        @editRow="editMonthlyCardRegister"
        @deleteRow="deleteMonthlyCardRegister"
      />

      <monthly-parking-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import dayjs from 'dayjs'
import { MANAGE } from '~/constants/permission-action.constant'
import { MONTHLY_PARKING } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'card',
    key: 'a',
    title: 'Id vé',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'checkin',
    key: 'b',
    title: 'Giờ vào',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{dayjs(row.checkin).format('DD/MM/YYYY HH:mm:ss')}</span>
    },
  },
  {
    field: 'checkout',
    key: 'c',
    title: 'Giờ ra',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return (
        <span>
          {row.checkout !== 0
            ? dayjs(row.checkout).format('DD/MM/YYYY HH:mm:ss')
            : ''}
        </span>
      )
    },
  },
  {
    field: 'status',
    key: 'd',
    title: 'Trạng thái',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return row.status ? (
        <span class="text-success">Đã ra</span>
      ) : (
        <span class="text-danger">Chưa ra</span>
      )
    },
  },
]

export default {
  name: 'DailyParkingPage',
  pageTitle: 'Quản lý vào ra vé lượt',
  permission: [MANAGE, MONTHLY_PARKING],
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
    editMonthlyCardRegister(monthlyParking) {
      this.$refs.modal.show(monthlyParking)
    },
    deleteMonthlyCardRegister(monthlyParking) {
      this.$bvModal
        .msgBoxConfirm(
          `Bạn chắc chắn muốn xóa lượt vào ra "${monthlyParking._id}"?`,
          {
            title: 'Cảnh báo',
            okVariant: 'danger',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy bỏ',
          }
        )
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/monthly-parking/' + monthlyParking._id)
            this.$notifyDeleteSuccess('lượt vào ra')
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