<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật danh mục' : 'Thêm mới danh mục'"
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
        placeholder="Tên danh mục"
        label="Tên danh mục"
        rules="required|max:100"
        name="name"
      />

      <category-select v-model="form.parent" />

      <base-form-text-input
        v-model="form.order"
        required
        :error="vForm.errors.get('order')"
        placeholder="Thứ tự"
        label="Thứ tự"
        rules="positive"
        type="number"
        name="order"
      />

      <base-form-text-input
        v-model="form.slug"
        required
        :error="vForm.errors.get('slug')"
        placeholder="Đường dẫn"
        label="Đường dẫn"
        rules="required|max:100"
        name="slug"
      />

      <base-form-image-upload
        v-model="form.image"
        action="/files/upload-hash-image"
        accept="image/*"
        preview-image
        label="Ảnh đại diện"
        required
        rules="required"
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

      <base-form-switch v-model="form.status" label="Trạng thái" />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import { extend } from 'vee-validate'
import BaseFormModal from '@/components/base/form/Modal'

extend('positive', (value) => {
  if (value >= 0) {
    return true
  }

  return 'Giá là một số lớn hơn 0'
})
const defaultForm = {
  name: '',
  parent: null,
  order: 0,
  slug: '',
  image: '',
  status: true,
}

export default {
  name: 'CategoryModal',
  mixins: [BaseFormModal],
  data() {
    return {
      form: cloneDeep(defaultForm),
      disable: true,
    }
  },
  methods: {
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.isEdit = false
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      form.order = parseInt(this.form.order)
      form.parent = this.form.parent?._id
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/categories')

        this.$notifyAddSuccess('danh mục')
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
          this.$axios.defaults.baseURL + '/categories/' + this.form._id
        )

        this.$notifyUpdateSuccess('danh mục')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
