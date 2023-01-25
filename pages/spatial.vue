<template>
  <content-card title="Danh sách không gian học">
    <template #toolbar>
      <b-button variant="primary" @click="show()">
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/spatials"
        @editRow="editSpatial"
        @deleteRow="deleteSpatial"
      />
      <spatial-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { SPATIAL } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên không gian học',
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
  name: 'SpatialPage',
  pageTitle: 'Quản lý không gian học',
  permission: [MANAGE, SPATIAL],
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
    editSpatial(spatial) {
      this.$refs.modal.show(spatial)
    },
    deleteSpatial(spatial) {
      this.$bvModal
        .msgBoxConfirm(
          `Bạn chắc chắn muốn xóa không gian học "${spatial.name}"?`,
          {
            title: 'Cảnh báo',
            okVariant: 'danger',
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy bỏ',
          }
        )
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/spatials/' + spatial._id)
            this.$notifyDeleteSuccess('không gian học')
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
