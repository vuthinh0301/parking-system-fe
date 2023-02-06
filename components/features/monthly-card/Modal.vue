<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật vé tháng' : 'Thêm mới vé tháng'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <monthly-card-status-select
        v-model="form.status"
        required
        :error="vForm.errors.get('status')"
        placeholder="Trạng thái vé"
        label="Trạng thái vé"
        rules="required|max:100"
        name="status"
      />

      <base-form-text-input
        v-model="form.owner"
        required
        :error="vForm.errors.get('owner')"
        placeholder="Id chủ vé"
        label="Id chủ vé"
        rules="required|max:100"
        name="owner"
      />

      <base-form-text-input
        v-model="form.vehicle"
        required
        :error="vForm.errors.get('owner')"
        placeholder="Id phương tiện"
        label="Id phương tiện"
        rules="required|max:100"
        name="vehicle"
      />
      <base-form-text-input
        v-model="form.balance"
        required
        :error="vForm.errors.get('plateNumber')"
        placeholder="Số dư vé"
        label="Số dư vé (VND)"
        rules="required|max:100"
        name="balance"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'
import cardStatus from '~/constants/monthly-card-status.constant'
import MonthlyCardStatusSelect from '~/components/features/monthly-card/StatusSelect'

const defaultForm = {
  owner: '',
  vehicle: '',
  status: null,
  balance: 0,
}
export default {
  name: 'MonthlyCardModal',
  components: { MonthlyCardStatusSelect },
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
      form.balance = parseInt(this.form.balance)
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/monthly-cards')

        this.$notifyAddSuccess('vé tháng')
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
          this.$axios.defaults.baseURL + '/monthly-cards/' + this.form._id
        )

        this.$notifyUpdateSuccess('vé tháng')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
