<template>
  <b-form>
    <label>Loại hàng hoá</label>
    <b-form-select
      v-model="form.orderType"
      :options="orderTypeOptions"
    ></b-form-select>

    <base-form-text-input
      v-model="form.moneyAmount"
      required
      placeholder="Số tiền"
      label="Số tiền"
      rules="required|max:100"
      name="moneyAmount"
    />
    <base-form-text-input
      v-model="form.content"
      required
      placeholder="Id vé"
      label="Id vé"
      rules="required|max:100"
      name="content"
    />
    <label>Ngân hàng</label>
    <b-form-select
      v-model="form.bankCode"
      :options="bankCodeOptions"
    ></b-form-select>

    <b-button
      variant="primary"
      style="margin-top: 16px"
      @click="createVnpayment"
      >Thanh toán</b-button
    >
    <b-button type="reset" variant="danger" style="margin-top: 16px"
      >Làm mới</b-button
    >
  </b-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

const dateFormat = require('dateformat')

const defaultForm = {
  moneyAmount: '',
  content: '',
  bankCode: '',
  language: '',
  orderType: 'Thanh toán hoá đơn',
}
export default {
  name: 'OrderPage',
  data() {
    return {
      form: cloneDeep(defaultForm),
      bankCodeOptions: [
        { value: 'NCB', text: 'Ngân hàng NCB' },
        { value: 'SCB', text: 'Ngân hàng SCB' },
        { value: 'SACOMBANK', text: 'Ngân hàng SACOMBANK' },
        { value: 'EXIMBANKB', text: 'Ngân hàng EXIMBANK' },
        { value: 'NAMABANK', text: 'Ngân hàng NAMABANK' },
      ],

      orderTypeOptions: [
        { value: 'topup', text: 'Nạp tiền điện thoại' },
        { value: 'billpayment', text: 'Thanh toán hóa đơn' },
        { value: 'fashion', text: 'Thời trang' },
      ],
    }
  },

  methods: {
    sortObject(obj) {
      const sorted = {}
      const str = []
      let key
      for (key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key))
        }
      }
      str.sort()
      for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
          /%20/g,
          '+'
        )
      }
      return sorted
    },
    createVnpayment() {
      const ipAddr = '192.168.1.66' // sua ip
      const tmnCode = 'VMGTZWKJ'
      const secretKey = 'HVIGERDJEZGBRPMXWWVLLFRXXDIKVVBI'
      let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
      // const returnUrl = 'http://localhost:8000/return'
      const returnUrl = process.env.vnp_ReturnUrl
      const date = new Date()

      const createDate = dateFormat(date, 'yyyymmddHHmmss')
      const orderId = dateFormat(date, 'HHmmss')
      const amount = this.form.moneyAmount
      const bankCode = this.form.bankCode

      const orderInfo = this.form.content
      const orderType = this.form.orderType
      const locale = 'vn'

      const currCode = 'VND'
      let vnpParams = {}
      vnpParams.vnp_Version = '2.1.0'
      vnpParams.vnp_Command = 'pay'
      vnpParams.vnp_TmnCode = tmnCode
      // vnpParams['vnp_Merchant'] = ''
      vnpParams.vnp_Locale = locale
      vnpParams.vnp_CurrCode = currCode
      vnpParams.vnp_TxnRef = orderId
      vnpParams.vnp_OrderInfo = orderInfo
      vnpParams.vnp_OrderType = orderType
      vnpParams.vnp_Amount = amount * 100
      vnpParams.vnp_ReturnUrl = returnUrl
      vnpParams.vnp_IpAddr = ipAddr
      vnpParams.vnp_CreateDate = createDate
      if (bankCode !== null && bankCode !== '') {
        vnpParams.vnp_BankCode = bankCode
      }

      vnpParams = this.sortObject(vnpParams)

      const querystring = require('qs')
      const signData = querystring.stringify(vnpParams, { encode: false })
      const crypto = require('crypto')
      const hmac = crypto.createHmac('sha512', secretKey)
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
      vnpParams.vnp_SecureHash = signed
      // eslint-disable-next-line no-unused-vars
      vnpUrl += '?' + querystring.stringify(vnpParams, { encode: false })
      window.location.href = vnpUrl
    },

    handleModalOk() {},
  },
}
</script>
