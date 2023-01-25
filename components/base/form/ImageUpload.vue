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
      <base-form-upload-core
        ref="inputForm"
        v-model="innerValue"
        v-bind="$attrs"
        action="/files/upload-hash-image"
        accept="image/*"
        preview-image
        is-hash-image
        :class="[error || errors.length > 0 ? 'is-invalid' : '']"
      ></base-form-upload-core>
      <b-form-invalid-feedback>
        {{ errors[0] || error }}
      </b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script>
import BaseFormMixin from '@/components/base/form/Mixin'

export default {
  name: 'BaseFormUpload',
  mixins: [BaseFormMixin],
  data: () => ({
    innerValue: '',
  }),
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.innerValue = newVal
    },
  },
  created() {
    this.innerValue = this.value
  },
}
</script>
