<template>
  <content-card title="Danh sách phương tiện vãng lai">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/daily-vehicles"
        @editRow="editVehicle"
        @deleteRow="deleteVehicle"
      />

      <daily-vehicle-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { DAILY_VEHICLE } from '~/constants/permission-object.constant'

const columns = [
  {
    field: '_id',
    key: 'a',
    title: 'ID phương tiện',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'plateNumber',
    key: 'a',
    title: 'Biển kiểm soát',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'type',
    key: 'b',
    title: 'Loại xe',
    align: 'left',
  },
  {
    field: 'description',
    key: 'c',
    title: 'Mô tả',
    align: 'left',
  },
]

export default {
  name: 'VehiclePage',
  pageTitle: 'Quản lý phương tiện vãng lai',
  permission: [MANAGE, DAILY_VEHICLE],
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
    editVehicle(vehicle) {
      this.$refs.modal.show(vehicle)
    },
    deleteVehicle(vehicle) {
      this.$bvModal
        .msgBoxConfirm(
          `Bạn chắc chắn muốn xóa phương tiện "${vehicle.plateNumber}"?`,
          {
            title: 'Cảnh báo',
            okVariant: 'danger',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy bỏ',
          }
        )
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/daily-vehicles/' + vehicle._id)
            this.$notifyDeleteSuccess('phương tiện')
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
