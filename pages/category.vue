<template>
  <content-card title="Danh sách danh mục">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/categories"
        @editRow="editCategory"
        @deleteRow="deleteCategory"
      />

      <category-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { CATEGORY } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên danh mục',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'parent',
    key: 'b',
    title: 'Danh mục cha',
    align: 'left',
    renderBodyCell: ({ row, column }, h) => {
      if (row.parent !== null) {
        return row.parent.name
      } else {
        return ''
      }
    },
  },
  {
    field: 'order',
    key: 'c',
    title: 'Thứ tự',
    align: 'left',
  },
  {
    field: 'slug',
    key: 'd',
    title: 'Đường dẫn',
    align: 'left',
  },
  {
    field: 'status',
    key: 'e',
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
  name: 'CategoryPage',
  pageTitle: 'Quản lý danh mục',
  permission: [MANAGE, CATEGORY],
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
    editCategory(category) {
      this.$refs.modal.show(category)
    },
    deleteCategory(category) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa danh mục "${category.name}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/categories/' + category._id)
            this.$notifyDeleteSuccess('danh mục')
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
