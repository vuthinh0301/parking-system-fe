<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật nhận xét' : 'Thêm mới nhân xét'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.fullName"
        required
        :error="vForm.errors.get('fullName')"
        placeholder="Họ và tên"
        label="Họ và tên"
        rules="required|max:100"
        name="fullName"
      />

      <base-form-text-input
        v-model="form.job"
        required
        :error="vForm.errors.get('job')"
        placeholder="Công việc"
        label="Công việc"
        rules="required|max:100"
        name="job"
      />
      <base-form-text-input
        v-model="form.workPlace"
        required
        :error="vForm.errors.get('workPlace')"
        placeholder="Nơi làm việc"
        label="Nơi làm việc"
        rules="required|max:100"
        name="comment"
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
      <base-form-textarea
        v-model="form.comment"
        required
        :error="vForm.errors.get('description')"
        placeholder="Nhận xét"
        label="Nhận xét"
        rules="required|max:500"
        name="comment"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'

const defaultForm = {
  fullName: '',
  job: '',
  workPlace: '',
  avatar: '',
  comment: '',
}
export default {
  name: 'SpatialModal',
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
        await this.vForm.post(this.$axios.defaults.baseURL + '/self-reviews')
        this.$notifyAddSuccess('nhận xét')
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
          this.$axios.defaults.baseURL + '/self-reviews/' + this.form._id
        )

        this.$notifyUpdateSuccess('nhận xét')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
