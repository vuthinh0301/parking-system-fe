<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'BaseFormModal',
  props: {
    onActionSuccess: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isEdit: false,
      vForm: new Form(),
    }
  },
  methods: {
    show(item) {
      if (item) {
        this.isEdit = true
        this.form = cloneDeep(item)
      }

      this.$nextTick(() => {
        this.$refs.modal.show()
      })
    },
    hide() {
      this.$refs.modal.hide()
    },
    async handleModalOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      await this.validateForm()
    },
    async validateForm() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        if (this.isEdit) {
          await this.updateItem()
        } else {
          await this.addItem()
        }
      }
    },
    processError(e) {
      if (e.response) {
        if (e.status !== 422) {
          this.$notifyTryAgain()
        }
      } else {
        this.$notifyTryAgain()
      }
    },
  },
}
</script>
