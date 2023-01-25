<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật nhân vật' : 'Thêm mới nhân vật'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.name"
        required
        :error="vForm.errors.get('name')"
        placeholder="Tên nhân vật"
        label="Tên nhân vật"
        rules="required|max:100"
        name="name"
      />

      <base-form-text-input
        v-model="form.key"
        required
        :error="vForm.errors.get('key')"
        placeholder="Key"
        label="Key"
        rules="required|max:100"
        name="name"
      />
      <base-form-textarea
        v-model="form.description"
        required
        :error="vForm.errors.get('description')"
        placeholder="Mô tả"
        label="Mô tả"
        rules="required|max:500"
        name="description"
      />
      <base-form-image-upload
        v-model="form.avatar"
        action="/files/upload-hash-image"
        accept="image/*"
        preview-image
        label="Ảnh đại diện"
        required
        rules="required"
      />
      <base-form-image-upload
        v-model="form.image"
        action="/files/upload-hash-image"
        accept="image/*"
        preview-image
        label="Ảnh minh họa"
        required
        rules="required"
      />
      <base-form-switch v-model="form.status" label="Trạng thái" />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'

const defaultForm = {
  name: '',
  key: '',
  description: '',
  image: '',
  avatar: '',
  status: true,
}
export default {
  name: 'CharacterModal',
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
      const form = cloneDeep(this.form)
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/characters')
        this.$notifyAddSuccess('nhân vật')
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
          this.$axios.defaults.baseURL + '/characters/' + this.form._id
        )

        this.$notifyUpdateSuccess('nhân vật')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
