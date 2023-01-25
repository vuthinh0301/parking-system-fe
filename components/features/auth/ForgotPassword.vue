<template>
  <div class="login-form login-forgot">
    <validation-observer ref="observer">
      <form
        id="kt_login_forgot_form"
        ref="kt_login_forgot_form"
        class="form"
        novalidate="novalidate"
      >
        <div class="pt-lg-0 pt-5">
          <h3 class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
            Quên mật khẩu ?
          </h3>
          <p class="text-muted font-weight-bold font-size-h4">
            Nhập email của bạn để đổi mật khẩu
          </p>
        </div>
        <h4 v-if="error" class="text-danger">
          Thông tin tài khoản không đúng hoặc tài khoản không tồn tại!
        </h4>
        <validation-provider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <div class="form-group">
            <input
              v-model="form.email"
              :error="vForm.errors.get('email')"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              placeholder="Nhập email của bạn..."
              rules="required|max:100"
              name="email"
            />
          </div>

          <p class="text-danger mt-1">{{ errors[0] }}</p>
        </validation-provider>

        <div class="form-group d-flex flex-wrap pb-lg-0">
          <button
            id="kt_login_forgot_submit"
            type="button"
            class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
            @click="sendMail"
          >
            Gửi đi
          </button>
          <button
            id="kt_login_forgot_cancel"
            type="button"
            class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
            @click="showForm('signin')"
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'

const defaultForm = {
  email: '',
}

export default {
  name: 'AuthForgotPassword',
  mixins: [BaseFormModal],
  data() {
    return {
      form: cloneDeep(defaultForm),
      error: null,
    }
  },
  methods: {
    async sendMail() {
      this.error = null
      try {
        const form = { email: this.form.email }
        this.vForm = new Form(form)
        await this.vForm.post(
          this.$axios.defaults.baseURL + '/auth/forgot-password'
        )
        this.form = cloneDeep(defaultForm)
        this.showForm('signin')
      } catch (e) {
        this.error = e
      }
    },
    showForm(form) {
      this.form = cloneDeep(defaultForm)
      this.$refs.observer.reset()
      this.$emit('showForm', form)
    },
  },
}
</script>
