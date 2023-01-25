<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật hội thoại' : 'Thêm mới hội thoại'"
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
        placeholder="Tên hội thoại"
        label="Tên hội thoại"
        rules="required|max:100"
        name="name"
      />

      <base-form-text-input
        v-model="form.description"
        required
        :error="vForm.errors.get('description')"
        placeholder="Mô tả"
        label="Tóm tắt"
        rules="required|max:255"
        name="description"
      />

      <lesson-select v-model="form.lesson" required rules="required" />

      <base-form-switch v-model="form.is_public" label="Trạng thái" />

      <conversation-list v-model="form.items" />
    </validation-observer>
  </b-modal>
</template>

<script>
/* eslint-disable camelcase */

import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'

const defaultForm = {
  name: '',
  description: '',
  lesson: null,
  is_public: true,
  items: [],
}

export default {
  name: 'ConversationModal',
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
      form.lesson = this.form.lesson._id
      form.items = this.form.items.map((item) => {
        if (item.type === 'conversation') {
          return {
            ...item,
            background: {
              _id: item.background._id,
              name: item.background.name,
            },
            content: item.content.map((o) => {
              const {
                key,
                type,
                figure,
                sentence_en,
                sentence_vi,
                audio_url,
                sentence_practice,
              } = o
              if (o.type === 'figure') {
                return {
                  key,
                  type,
                  figure: {
                    _id: figure._id,
                    name: figure.name,
                  },
                  sentence_en,
                  sentence_vi,
                  audio_url,
                }
              } else {
                return {
                  key,
                  type,
                  sentence_practice,
                }
              }
            }),
          }
        } else {
          return item
        }
      })

      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/conversations')

        this.$notifyAddSuccess('hội thoại')
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
          this.$axios.defaults.baseURL + '/conversations/' + this.form._id
        )

        this.$notifyUpdateSuccess('hội thoại')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
