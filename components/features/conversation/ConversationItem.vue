<template>
  <div>
    <base-form-text-input
      v-model="innerValue.name"
      required
      placeholder="Tên phân cảnh"
      label="Tên phân cảnh"
      rules="required|max:100"
      name="name"
    />

    <base-form-text-input
      v-model="innerValue.resource_key"
      required
      placeholder="Resource key"
      label="Resource key"
      rules="required|max:100"
      name="resource_key"
    />

    <background-select
      v-model="innerValue.background"
      required
      rules="required"
    />

    <conversation-content v-model="innerValue.content" />
  </div>
</template>

<script>
export default {
  name: 'ConversationItem',
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      innerValue: null,
    }
  },
  watch: {
    innerValue: {
      deep: true,
      handler(val) {
        this.$emit('input', val)
      },
    },
    value(val) {
      if (val) {
        this.innerValue = val
      } else {
        this.innerValue = {}
      }
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    } else {
      this.innerValue = {}
    }
  },
}
</script>
