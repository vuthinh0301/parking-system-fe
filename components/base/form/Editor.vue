<template>
  <validation-provider
    v-slot="{ errors }"
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
    class="b-editor"
  >
    <b-form-group v-bind="$attrs" :label-class="required ? 'required' : null">
      <client-only placeholder="loading...">
        <ckeditor-nuxt
          v-model="innerValue"
          :config="editorConfig"
        ></ckeditor-nuxt>
      </client-only>
      <b-form-invalid-feedback
        >{{ errors[0] || error }}
      </b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'BaseFormEditor',
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
    ValidationProvider,
  },
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
    singleRow: {
      type: Boolean,
      defautl: false,
    },
  },
  data() {
    return {
      innerValue: '',
      editorConfig: {
        height: 400,
        placeholder: 'Nhập nội dung...',
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl:
            this.$axios.defaults.baseURL + '/media/upload-multi-size-editor',
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        },
      },
    }
  },
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
.ck-body-wrapper {
  z-index: 9999;
}

.ck-editor {
  &__editable_inline {
    min-height: 200px;
  }
}
</style>
