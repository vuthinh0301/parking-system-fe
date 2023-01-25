<template>
  <div class="base-form-upload border bg-white rounded d-flex overflow-hidden">
    <input
      ref="input"
      class="d-none"
      type="file"
      :accept="accept"
      @change="handleChange"
    />

    <div
      :class="[showPreview ? 'd-none' : 'd-flex']"
      class="base-form-upload__chose-file w-100 justify-content-center align-items-center cursor-pointer"
      @click="showChooseFile"
    >
      <i class="flaticon2-plus icon-2x text-dark-10"></i>
    </div>

    <div
      :class="[showPreview ? 'd-flex' : 'd-none']"
      class="base-form-upload__preview flex-column w-100 justify-content-center align-items-center overflow-hidden position-relative"
    >
      <img
        v-if="previewImage && innerVal"
        alt=""
        :src="imageUrl"
        class="w-100 h-100 position-absolute top-0 right-0 bottom-0 left-0"
        style="object-fit: cover"
      />

      <i v-if="!previewImage && innerVal" class="flaticon-file-2 icon-3x"></i>

      <div
        v-if="innerVal && !loading"
        class="base-form-upload__remove w-100 h-100 position-absolute top-0 right-0 bottom-0 left-0 cursor-pointer zindex-5 d-flex justify-content-center align-items-center"
        @click="removeFile"
      >
        <i class="flaticon-delete icon-2x text-white"></i>
      </div>

      <div
        v-if="loading"
        class="text-center spinner spinner-primary spinner-lg mr-8"
      ></div>
      <p v-if="loading" class="mt-5 text-center">{{ uploadProgress }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormUploadCore',
  props: {
    value: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      required: true,
    },
    accept: { type: String, default: '' },
    name: {
      type: String,
      default: 'file',
    },
    headers: { type: Object, default: () => {} },
    beforeUpload: { type: Function, default: () => {} },
    previewImage: {
      type: Boolean,
      default: false,
    },
    isHashImage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      req: {},
      uploadProgress: 0,
      file: null,
      loading: false,
      innerVal: '',
    }
  },
  computed: {
    uploadHeaders() {
      return {
        Authorization: this.$auth.strategy.token.get(),
      }
    },
    showPreview() {
      return this.file !== null || this.innerVal
    },
    imageUrl() {
      return this.isHashImage && this.innerVal
        ? this.convertHashToUrl(this.innerVal)
        : this.innerVal
    },
  },
  watch: {
    value(val) {
      this.innerVal = val
    },
    innerVal(val) {
      this.$emit('input', val)
    },
  },
  created() {
    this.innerVal = this.value
  },
  methods: {
    convertHashToUrl(hash) {
      const image = encodeURIComponent(hash) + '-300.jpg'
      return process.env.imageHost + '/uploads/' + image
    },
    handleChange(ev) {
      this.uploadProgress = 0
      const files = ev.target.files
      if (!files || files.length === 0) return
      this.upload(files[0])
    },
    showChooseFile() {
      this.$refs.input.click()
    },
    onProgress(percentCompleted) {
      this.uploadProgress = percentCompleted
      this.$emit('progress', percentCompleted)
    },
    onSuccess(res) {
      this.$emit('upload-success', res)
    },
    onError() {
      this.$emit('upload-error')
    },
    upload(rawFile) {
      this.file = rawFile
      if (!this.beforeUpload) {
        this.$refs.input.value = null
        this.file = rawFile
        return this.post(rawFile)
      }
      const before = this.beforeUpload(rawFile)
      if (before && before.then) {
        before.then(
          () => {
            this.post(rawFile)
          },
          () => {
            // this.onRemove(null, rawFile)
          }
        )
      } else if (before !== false) {
        this.post(rawFile)
      } else {
        // this.onRemove(null, rawFile)
      }
    },
    post(rawFile) {
      const formData = new FormData()
      formData.append(this.name, rawFile)

      this.$emit('upload')
      this.$emit('selected', rawFile)
      this.loading = true
      const options = {
        onSuccess: (res) => {
          this.onSuccess(res, rawFile)
          this.innerVal = res.data.Location
          this.req = null
          this.loading = false
        },
        onError: (err) => {
          this.onError(err, rawFile)
          this.req = null
          this.loading = false
        },
      }
      const req = this.$axios.post(this.action, formData, {
        headers: {
          ...this.headers,
          ...this.uploadHeaders,
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          this.onProgress(percentCompleted, rawFile)
        },
      })
      this.req = req
      if (req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    },
    removeFile() {
      this.innerVal = ''
      this.file = null
      this.$refs.input.value = null
    },
    abort() {
      const { req } = this
      if (req) {
        req.abort()
        this.req = null
      }
      this.$emit('abort')
    },
  },
}
</script>

<style lang="scss">
.base-form-upload {
  width: 180px;
  height: 180px;

  &.is-invalid {
    border-color: #f64e60 !important;
  }

  &__remove {
    opacity: 0;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
