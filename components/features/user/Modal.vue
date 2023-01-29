<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật người dùng' : 'Thêm mới người dùng'"
    no-close-on-backdrop
    no-enforce-focus
    cancel-title="Hủy bỏ"
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.email"
        :disabled="isEdit ? true : false"
        :required="isEdit ? false : true"
        :error="vForm.errors.get('email')"
        placeholder="Email"
        label="Email"
        rules="required|max:100"
        name="email"
      />

      <base-form-text-input
        v-if="!isEdit"
        v-model="form.password"
        :required="isEdit ? false : true"
        :error="vForm.errors.get('password')"
        placeholder="Mật khẩu"
        label="Mật khẩu"
        rules="required|min:8|max:100"
        name="password"
        type="password"
      />

      <base-form-text-input
        v-model="form.fullName"
        required
        :error="vForm.errors.get('fullName')"
        placeholder="Họ và tên"
        label="Họ và tên"
        rules="required|max:100"
        name="fullName"
      />

      <user-status-select
        v-model="form.status"
        required
        :error="vForm.errors.get('status')"
        placeholder="Trạng thái"
        label="Trạng thái"
        rules="required|max:100"
        name="status"
      />

      <role-select v-model="form.role" required rules="required" />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'
import userStatusConstant from '~/constants/user-status.constant'

const defaultForm = {
  fullName: '',
  status: null,
  role: null,
}

export default {
  name: 'UserModal',
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

        const status = userStatusConstant.find((o) => o.id === item.status)

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
        await this.vForm.post(this.$axios.defaults.baseURL + '/users')

        this.$notifyAddSuccess('người dùng')
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
          this.$axios.defaults.baseURL + '/users/' + this.form._id
        )

        this.$notifyUpdateSuccess('người dùng')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
