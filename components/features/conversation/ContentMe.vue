<template>
  <div>
    <figure-select v-model="innerValue.figure" required rules="required" />

    <base-form-text-input
      v-model="innerValue.sentence_practice[0].sentence_en"
      required
      placeholder="Câu tiếng Anh 1"
      label="Câu tiếng Anh 1"
      rules="required"
    />

    <base-form-text-input
      v-model="innerValue.sentence_practice[0].sentence_vi"
      required
      placeholder="Câu tiếng Việt 1"
      label="Câu tiếng Việt 1"
      rules="required"
    />

    <base-form-upload
      v-model="innerValue.sentence_practice[0].audio_url"
      action="/files/upload-audio"
      accept=".mp3,.wav"
      label="Audio 1"
      required
      rules="required"
    />

    <base-form-text-input
      v-model="innerValue.sentence_practice[1].sentence_en"
      required
      placeholder="Câu tiếng Anh 2"
      label="Câu tiếng Anh 2"
      rules="required"
    />

    <base-form-text-input
      v-model="innerValue.sentence_practice[1].sentence_vi"
      required
      placeholder="Câu tiếng Việt 2"
      label="Câu tiếng Việt 2"
      rules="required"
    />

    <base-form-upload
      v-model="innerValue.sentence_practice[1].audio_url"
      action="/files/upload-audio"
      accept=".mp3,.wav"
      label="Audio 2"
      required
      rules="required"
    />

    <base-form-text-input
      v-model="innerValue.sentence_practice[2].sentence_en"
      required
      placeholder="Câu tiếng Anh 3"
      label="Câu tiếng Anh 3"
      rules="required"
    />

    <base-form-text-input
      v-model="innerValue.sentence_practice[2].sentence_vi"
      required
      placeholder="Câu tiếng Việt 3"
      label="Câu tiếng Việt 3"
      rules="required"
    />

    <base-form-upload
      v-model="innerValue.sentence_practice[2].audio_url"
      action="/files/upload-audio"
      accept=".mp3,.wav"
      label="Audio 3"
      required
      rules="required"
    />
  </div>
</template>

<script>
const defaultVal = [
  {
    sentence_vi: '',
    sentence_en: '',
    audio_url: '',
  },
  {
    sentence_vi: '',
    sentence_en: '',
    audio_url: '',
  },
  {
    sentence_vi: '',
    sentence_en: '',
    audio_url: '',
  },
]

export default {
  name: 'ConversationContentMe',
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      innerValue: defaultVal,
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
        this.innerValue = {
          sentence_practice: defaultVal,
        }
      }
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    } else {
      this.innerValue = {
        sentence_practice: defaultVal,
      }
    }
  },
}
</script>
