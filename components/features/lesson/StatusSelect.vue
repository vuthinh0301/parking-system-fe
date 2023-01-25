<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    :label="label"
    :data-vv-as="label"
    :options="options"
    placeholder="Chọn một trạng thái..."
    id-field="id"
    text-field="text"
    name="selection"
  />
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import status from '~/constants/lesson-status.constant'

export default {
  name: 'LessonStatusSelect',
  props: {
    error: {
      type: String,
      default: '',
    },
    value: {
      type: [Object, Array],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Trạng thái',
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selection: null,
      options: status,
    }
  },
  watch: {
    selection(val) {
      this.$emit('input', val)
    },
    value(newVal, oldVal) {
      if (newVal) {
        if (!oldVal || (oldVal && newVal.id !== oldVal.id)) {
          this.selection = newVal
        }
      } else {
        this.selection = newVal
      }
    },
  },
  created() {
    if (this.value) {
      this.$nextTick(() => (this.selection = cloneDeep(this.value)))
    }
  },
}
</script>
