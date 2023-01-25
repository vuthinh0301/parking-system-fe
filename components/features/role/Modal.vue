<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật nhóm người dùng' : 'Thêm mới nhóm người dùng'"
    no-close-on-backdrop
    no-enforce-focus
    cancel-title="Hủy bỏ"
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.name"
        required
        :error="vForm.errors.get('name')"
        placeholder="Mã nhóm"
        label="Mã nhóm"
        rules="required|max:100"
        name="name"
      />

      <base-form-text-input
        v-model="form.displayName"
        required
        :error="vForm.errors.get('displayName')"
        placeholder="Tên hiển thị"
        label="Tên hiển thị"
        rules="required|max:100"
        name="displayName"
      />

      <base-form-switch v-model="form.status" label="Trạng thái" />

      <permission-selection v-model="form.permissions" />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'

const defaultForm = {
  name: '',
  displayName: '',
  status: true,
  permissions: [],
}

export default {
  name: 'RoleModal',
  mixins: [BaseFormModal],
  data() {
    return {
      form: cloneDeep(defaultForm),
    }
  },
  methods: {
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.isEdit = false
    },
    processFormToSubmit() {
      return cloneDeep(this.form)
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/roles')

        this.$notifyAddSuccess('nhóm người dùng')
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
          this.$axios.defaults.baseURL + '/roles/' + this.form._id
        )

        this.$notifyUpdateSuccess('nhóm người dùng')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
