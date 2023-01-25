<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật nội dung' : 'Thêm mới nội dung'"
    no-close-on-backdrop
    no-enforce-focus
    cancel-title="Hủy bỏ"
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.title"
        required
        :error="vForm.errors.get('title')"
        placeholder="Tiêu đề"
        label="Tiêu đề"
        rules="required"
        name="title"
      />
      <base-form-text-input
        v-model="form.slug"
        required
        :error="vForm.errors.get('slug')"
        placeholder="Slug"
        label="Slug"
        rules="required"
        name="slug"
      />
      <base-form-text-input
        v-model="form.description"
        required
        :error="vForm.errors.get('description')"
        placeholder="Mô tả"
        label="Mô tả"
        name="description"
      />
      <base-form-image-upload
        v-model="form.featuredImage"
        action="/files/upload-hash-image"
        accept="image/*"
        preview-image
        label="Hình ảnh minh họa"
        required
        rules="required|max:500"
      />
      <base-form-editor
        v-model="form.content"
        required
        placeholder="Nội dung chính"
        label="Nội dung chính"
        rules="required"
        name="content"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'

const defaultForm = {
  title: '',
  slug: '',
  description: '',
  content: '',
  featuredImage: '',
}

export default {
  name: 'RoleModal',
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
      return cloneDeep(this.form)
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/pages')

        this.$notifyAddSuccess('nội dung')
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
          this.$axios.defaults.baseURL + '/pages/' + this.form._id
        )

        this.$notifyUpdateSuccess('nội dung')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
