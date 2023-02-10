<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật vé ngày' : 'Thêm mới vé ngày'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <daily-card-status-select
        v-model="form.status"
        required
        :error="vForm.errors.get('status')"
        placeholder="Trạng thái vé"
        label="Trạng thái vé"
        rules="required|max:100"
        name="status"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'
import cardStatus from '~/constants/monthly-card-status.constant'
import DailyCardStatusSelect from '~/components/features/daily-card/StatusSelect'

const defaultForm = {
  status: null,
}
export default {
  name: 'DailyCardModal',
  components: { DailyCardStatusSelect },
  mixins: [BaseFormModal],
  data() {
    return {
      form: cloneDeep(defaultForm),
    }
  },
  methods: {
    show(item) {
      if (item) {
        this.isEdit = true
        // eslint-disable-next-line no-console
        this.form = cloneDeep(item)

        const status = cardStatus.find((o) => o.id === item.status)

        this.form.status = status
      }

      this.$nextTick(() => {
        this.$refs.modal.show()
      })
    },
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.isEdit = false
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      form.status = form.status.id
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/daily-cards')

        this.$notifyAddSuccess('vé ngày')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/daily-cards/' + this.form._id
        )

        this.$notifyUpdateSuccess('vé ngày')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
