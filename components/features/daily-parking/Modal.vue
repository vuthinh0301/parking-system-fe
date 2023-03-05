<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật vào ra vé lượt' : 'Thêm mới vào ra vé lượt'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.card"
        required
        :error="vForm.errors.get('card')"
        placeholder="Id chủ vé"
        label="Id chủ vé"
        rules="required|max:100"
        name="card"
      />

      <base-form-text-input
        v-model="form.vehicle._id"
        required
        :error="vForm.errors.get('vehicle')"
        placeholder="Id phương tiện"
        label="Id phương tiện"
        rules="required|max:100"
        name="vehicle"
      />
      <base-form-text-input
        v-model="form.checkin"
        required
        :error="vForm.errors.get('checkin')"
        disabled
        placeholder="Giờ vào"
        label="Giờ vào"
        rules="required|max:100"
        name="checkin"
      />
      <base-form-text-input
        v-model="form.checkout"
        required
        disabled
        :error="vForm.errors.get('checkout')"
        placeholder="Giờ ra"
        label="Giờ ra"
        rules="required|max:100"
        name="checkout"
      />
      <b-row>
        <base-form-image-upload
          v-model="form.checkinImageFront"
          action="/files/upload-hash-image"
          accept="image/*"
          preview-image
          label="Ảnh vào phía trước"
          required
          rules="required"
        />
        <base-form-image-upload
          v-model="form.checkinImageBehind"
          class="ml-4"
          action="/files/upload-hash-image"
          accept="image/*"
          preview-image
          label="Ảnh vào phía sau"
          required
          rules="required"
        />
      </b-row>
      <b-row>
        <base-form-image-upload
          v-model="form.checkoutImageFront"
          action="/files/upload-hash-image"
          accept="image/*"
          preview-image
          label="Ảnh ra phía trước"
          required
          rules="required"
        />
        <base-form-image-upload
          v-model="form.checkoutImageBehind"
          class="ml-4"
          action="/files/upload-hash-image"
          accept="image/*"
          preview-image
          label="Ảnh ra phía sau"
          required
          rules="required"
        />
      </b-row>
      <base-form-switch v-model="form.status" label="Trạng thái" />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import dayjs from 'dayjs'
import BaseFormModal from '~/components/base/form/Modal'

const defaultForm = {
  card: '',
  vehicle: '',
  checkin: 0,
  checkout: 0,
  checkinImageFront: '',
  checkinImageBehind: '',
  checkoutImageFront: '',
  checkoutImageBehind: '',
  status: true,
}
export default {
  name: 'DailyParkingModal',
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

        this.form.checkin = dayjs(this.form.checkin).format(
          'DD/MM/YYYY HH:mm:ss'
        )
        this.form.checkout = dayjs(this.form.checkout).format(
          'DD/MM/YYYY HH:mm:ss'
        )
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
      return cloneDeep(this.form)
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/daily-parking')

        this.$notifyAddSuccess('vào ra vé lượt')
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
          this.$axios.defaults.baseURL + '/daily-parking/' + this.form._id
        )

        this.$notifyUpdateSuccess('vào ra vé lượt')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
