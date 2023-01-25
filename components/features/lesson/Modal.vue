<template>
  <b-modal
    ref="modal"
    title="Phê duyệt bài học"
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
        :disabled="true"
        :error="vForm.errors.get('name')"
        placeholder="Tên bài học"
        label="Tên bài học"
        name="name"
      />

      <lesson-status-select
        v-model="form.status"
        required
        :error="vForm.errors.get('status')"
        placeholder="Trạng thái"
        label="Trạng thái"
        rules="required"
        name="status"
      />

      <base-form-textarea
        v-if="isBlockedStatus"
        v-model="form.blockReason"
        required
        :error="vForm.errors.get('blockReason')"
        placeholder="Lý do bị khóa"
        label="Lý do bị khóa"
        rules="required|max:500"
        name="description"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'
import LessonStatus, { BLOCKED } from '~/constants/lesson-status.constant'

const defaultForm = {
  blockReason: '',
  status: null,
}

export default {
  name: 'LessonModal',
  mixins: [BaseFormModal],
  data() {
    return {
      form: cloneDeep(defaultForm),
      disable: true,
    }
  },
  computed: {
    isBlockedStatus() {
      return this.form.status?.id === BLOCKED
    },
  },
  methods: {
    show(item) {
      if (item) {
        this.isEdit = true
        this.form = cloneDeep(item)

        const status = LessonStatus.find((o) => o.id === item.status)

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
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.patch(
          this.$axios.defaults.baseURL +
            '/admin/lessons/' +
            this.form._id +
            '/approve'
        )

        this.$notifyUpdateSuccess('bài học')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
