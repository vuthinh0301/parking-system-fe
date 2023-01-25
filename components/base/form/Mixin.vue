<script>
export default {
  name: 'BaseFormMixin',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    formClass: {
      type: String,
      default: null,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
