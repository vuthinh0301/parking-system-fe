<template>
  <div>
    <label>{{ label }}</label>
    <span class="switch switch-outline switch-icon switch-success">
      <label>
        <input
          v-model="innerValue"
          type="checkbox"
          name="select"
          @change="emitValue"
        />
        <span></span>
      </label>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseFormSwitch',
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: 'Trạng thái',
    },
  },
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
      this.$emit('input', this.innerValue)
    },
  },
}
</script>
