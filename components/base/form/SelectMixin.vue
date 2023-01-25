<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    :label="label"
    :data-vv-as="label"
    :placeholder="placeholder"
    :id-field="idField"
    :text-field="textField"
    name="selection"
  />
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'BaseFormSelectMixin',
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
      default: 'Lựa chọn',
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Hãy chọn một lựa chọn...',
    },
    idField: {
      type: String,
      default: 'id',
    },
    textField: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      selection: null,
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
