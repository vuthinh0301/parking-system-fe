<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật phiên bản' : 'Thêm mới phiên bản'"
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
        placeholder="Tên phiên bản"
        label="Tên phiên bản"
        rules="required|max:100"
        name="name"
      />

      <base-form-upload
        v-model="form.catalog_json_url"
        action="/files/upload-vr-resource"
        accept=".json,.prefab,.hash,.bundle"
        label="Upload Catalog JSON"
        required
        rules="required"
      />

      <base-form-text-input
        v-model="form.catalog_json_url"
        required
        :error="vForm.errors.get('catalog_json_url')"
        placeholder="catalog_json_url"
        label="Catalog JSON"
        :disabled="disable"
        rules="required"
        name="catalog_json_url"
      />

      <base-form-upload
        v-model="form.catalog_hash_url"
        action="/files/upload-vr-resource"
        accept=".json,.prefab,.hash,.bundle"
        label="Upload Catalog Hash"
        required
        rules="required"
      />

      <base-form-text-input
        v-model="form.catalog_hash_url"
        required
        :error="vForm.errors.get('catalog_hash_url')"
        placeholder="catalog_hash_url"
        label="Catalog Hash"
        :disabled="disable"
        rules="required"
        name="catalog_hash_url"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'

const defaultForm = {
  name: '',
  catalog_json_url: '',
  catalog_hash_url: '',
}

export default {
  name: 'VersionModal',
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
        await this.vForm.post(this.$axios.defaults.baseURL + '/versions')

        this.$notifyAddSuccess('phiên bản')
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
          this.$axios.defaults.baseURL + '/versions/' + this.form._id
        )

        this.$notifyUpdateSuccess('phiên bản')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
