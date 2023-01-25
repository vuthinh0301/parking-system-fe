<template>
  <validation-provider
    v-slot="{ errors }"
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
  >
    <b-form-group v-bind="$attrs" :label-class="required ? 'required' : null">
      <div :class="[error || errors.length > 0 ? 'is-invalid' : null]">
        <base-form-select2
          ref="input"
          v-model="innerValue"
          :has-all-option="hasAllOption"
          v-bind="$attrs"
          class="form-control"
        />
      </div>
      <b-form-invalid-feedback>{{
        errors[0] || error
      }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script>
export default {
  name: 'BaseFormSelect',
  props: {
    vid: {
      type: String,
      default: null,
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    value: {
      type: null,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hasAllOption: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    innerValue: null,
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
    if (this.value) {
      this.innerValue = this.value
    }
  },
}
</script>

<style lang="scss">
.is-invalid {
  .select2-container--default .select2-selection--single,
  .select2-container--default .select2-selection--multiple {
    border-color: #f64e60 !important;
  }
}
</style>
