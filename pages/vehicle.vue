<template>
  <content-card title="Danh sách phương tiện">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/vehicles"
        @editRow="editVehicle"
        @deleteRow="deleteVehicle"
      />

      <vehicle-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { VEHICLE } from '~/constants/permission-object.constant'
import VehicleModal from '~/components/features/vehicle/Modal'

const columns = [
  {
    field: '_id',
    key: 'a',
    width: 100,
    title: 'Id phương tiện',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'plateNumber',
    key: 'b',
    title: 'Biển kiểm soát',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'type',
    key: 'c',
    title: 'Loại xe',
    align: 'left',
  },
  {
    field: 'description',
    key: 'd',
    title: 'Mô tả',
    align: 'left',
  },
  {
    field: 'owner',
    key: 'e',
    width: 100,
    title: 'ID chủ sở hữu',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{row.owner?._id}</span>
    },
  },
  {
    field: 'owner',
    key: 'f',
    title: 'Tên chủ sở hữu',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      return <span>{row.owner?.fullName}</span>
    },
  },
]

export default {
  name: 'VehiclePage',
  components: { VehicleModal },
  pageTitle: 'Quản lý phương tiện',
  permission: [MANAGE, VEHICLE],
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
            await this.$axios.delete('/vehicles/' + vehicle._id)
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
