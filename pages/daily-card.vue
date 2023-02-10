<template>
  <content-card title="Danh sách vé ngày">
    <template #toolbar>
      <b-button variant="primary" @click="show">
        <i class="flaticon2-plus"></i> Thêm mới
      </b-button>
    </template>
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        remote-url="/daily-cards"
        @editRow="editDailyCard"
        @deleteRow="deleteDailyCard"
      />

      <daily-card-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { DAILY_CARD } from '~/constants/permission-object.constant'
import DailyCardModal from '~/components/features/daily-card/Modal'

const columns = [
  {
    field: '_id',
    key: 'a',
    title: 'Id vé',
    align: 'left',
  },
  {
    field: 'status',
    key: 'c',
    title: 'Trạng thái vé',
    align: 'left',
  },
]

export default {
  name: 'DailyCardPage',
  components: { DailyCardModal },
  pageTitle: 'Quản lý vé vãng lai',
  permission: [MANAGE, DAILY_CARD],
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
    editDailyCard(dailyCard) {
      this.$refs.modal.show(dailyCard)
    },
    deleteDailyCard(dailyCard) {
      this.$bvModal
        .msgBoxConfirm(`Bạn chắc chắn muốn xóa vé "${dailyCard._id}"?`, {
          title: 'Cảnh báo',
          okVariant: 'danger',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy bỏ',
        })
        .then(async (value) => {
          if (value) {
            await this.$axios.delete('/daily-cards/' + dailyCard._id)
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
