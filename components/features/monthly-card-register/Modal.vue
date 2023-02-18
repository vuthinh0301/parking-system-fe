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
      <base-form-text-input
        v-model="form.card._id"
        required
        :error="vForm.errors.get('card')"
        placeholder="ID vé tháng"
        label="ID vé tháng"
        rules="required|max:100"
        name="card"
      />

      <base-form-text-input
        v-model="form.amount"
        required
        :error="vForm.errors.get('amount')"
        placeholder="Phí(VND)"
        label="Phí(VND)"
        rules="required|max:100"
        name="amount"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'

const defaultForm = {
  card: '',
  balance: 0,
}
export default {
  name: 'MonthlyCardRegisterModal',
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
      form.amount = parseInt(this.form.amount)
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(
          this.$axios.defaults.baseURL + '/monthly-card-registers'
        )

        this.$notifyAddSuccess('đăng kí vé tháng')
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
          this.$axios.defaults.baseURL +
            '/monthly-card-rgister/' +
            this.form._id
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
