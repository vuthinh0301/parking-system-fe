<template>
  <div>
    <figure-select v-model="innerValue.figure" required rules="required" />

    <base-form-text-input
      v-model="innerValue.sentence_en"
      required
      placeholder="Câu tiếng Anh"
      label="Câu tiếng anh"
      rules="required"
      name="sentence_en"
    />

    <base-form-text-input
      v-model="innerValue.sentence_vi"
      required
      placeholder="Câu tiếng Việt"
      label="Câu tiếng Việt"
      rules="required"
      name="sentence_vi"
    />

    <base-form-upload
      v-model="innerValue.audio_url"
      action="/files/upload-audio"
      accept=".mp3,.wav"
      label="Audio"
      required
      rules="required|max:500"
    />
  </div>
</template>

<script>
export default {
  name: 'ConversationContentFigure',
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
