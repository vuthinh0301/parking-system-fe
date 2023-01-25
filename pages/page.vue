<template>
  <content-card title="Danh sách trang">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/pages"
        @editRow="editPage"
        @deleteRow="deletePage"
      />
      <page-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { PAGE } from '~/constants/permission-object.constant'

const columns = [
  {
    field: 'title',
    key: 'a',
    title: 'Tiêu đề ',
    align: 'left',
    sortBy: 'asc',
  },
  {
    field: 'description',
    key: 'b',
    title: 'Mô tả ',
    align: 'left',
  },
  {
    field: 'content',
    key: 'c',
    title: 'Content',
    align: 'left',
  },
]

export default {
  name: 'PagePage',
  pageTitle: 'Quản lý nội dung trang',
  permission: [MANAGE, PAGE],
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
    editPage(page) {
      this.$refs.modal.show(page)
    },
    deletePage(page) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa nội dung "${page.title}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/pages/' + page._id)
            this.$notifyDeleteSuccess('nội dung ')
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
