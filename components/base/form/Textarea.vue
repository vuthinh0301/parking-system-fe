<template>
  <validation-provider
    v-slot="{ errors }"
    :vid="vid"
    :name="$attrs.label ? $attrs.label : $attrs['label-name']"
    :rules="rules"
  >
    <b-form-group
      v-bind="$attrs"
      :label-class="required ? 'required' : null"
      :class="formClass"
    >
      <b-form-textarea
        ref="inputForm"
        v-model="innerValue"
        v-bind="$attrs"
        autocomplete="off"
        :state="errors[0] || error !== null ? false : null"
        :disabled="disabled"
        rows="4"
        @change="emitValue"
      ></b-form-textarea>
      <b-form-invalid-feedback>
        {{ errors[0] || error }}
      </b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script>
import BaseFormMixin from '@/components/base/form/Mixin'

export default {
  name: 'BaseFormTextarea',
  mixins: [BaseFormMixin],
  data: () => ({
    innerValue: '',
  }),
  watch: {
    innerValue(newVal) {
      if (!this.lazy) {
        this.$emit('input', newVal)
      }
    },
    value(newVal) {
      this.innerValue = newVal
    },
  },
  created() {
    this.innerValue = this.value
  },
  methods: {
    emitValue() {
      if (this.lazy) {
        this.$emit('input', this.innerValue)
      }
    },
    focus() {
      this.$refs.inputForm.focus()
    },
  },
}
</script>
