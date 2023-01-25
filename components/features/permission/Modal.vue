<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật quyền' : 'Thêm mới quyền'"
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
        placeholder="Tên quyền"
        label="Tên quyền"
        rules="required|max:100"
        name="name"
      />

      <permission-action-select
        v-model="form.action"
        required
        :error="vForm.errors.get('action')"
        placeholder="Hành động"
        label="Hành động"
        rules="required|max:100"
        name="action"
      />

      <base-form-text-input
        v-model="form.object"
        required
        :error="vForm.errors.get('object')"
        placeholder="Đối tượng"
        label="Đối tượng"
        rules="required|max:100"
        name="object"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'
import permissionActionConstant from '~/constants/permission-action.constant'

const defaultForm = {
  name: '',
  action: null,
  object: '',
}

export default {
  name: 'PermissionModal',
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
        this.form = cloneDeep(item)

        const action = permissionActionConstant.find(
          (o) => o.id === item.action
        )

        this.form.action = action
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
      form.action = form.action.id

      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/permissions')
        this.$notifyAddSuccess('quyền truy cập')
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
          this.$axios.defaults.baseURL + '/permissions/' + this.form._id
        )

        this.$notifyUpdateSuccess('quyền truy cập')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
