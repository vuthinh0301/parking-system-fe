<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="
      isEdit ? 'Cập nhật phương tiện vãng lai' : 'Thêm mới phương tiện vãng lai'
    "
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.plateNumber"
        required
        :error="vForm.errors.get('plateNumber')"
        placeholder="Biển kiểm soát"
        label="Biển kiểm soát"
        rules="required|max:100"
        name="plateNumber"
      />

      <vehicle-type-select
        v-model="form.type"
        required
        :error="vForm.errors.get('type')"
        placeholder="Loại phương tiện"
        label="Loại phương tiện"
        rules="required|max:100"
        name="owner"
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
        v-model="form.image"
        action="/files/upload-hash-image"
        accept="image/*"
        preview-image
        label="Ảnh phương tiện"
        required
        rules="required"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'
import VehicleTypeSelect from '~/components/features/daily-vehicle/TypeSelect'
import vehicleType from '~/constants/vehicle-type.constant'

const defaultForm = {
  plateNumber: '',
  type: null,
  description: '',
  image: '',
}
export default {
  name: 'DailyVehicleModal',
  components: { VehicleTypeSelect },
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

        const type = vehicleType.find((o) => o.id === item.type)

        this.form.type = type
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
      form.type = form.type.id

      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/daily-vehicles')

        this.$notifyAddSuccess('phương tiện')
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
          this.$axios.defaults.baseURL + '/daily-vehicles/' + this.form._id
        )

        this.$notifyUpdateSuccess('phương tiện')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
