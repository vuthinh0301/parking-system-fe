<template>
  <p>Giao dịch thành công</p>
</template>

<script>
export default {
  name: 'ReturnPage',
  mounted() {
    const cardId = new URLSearchParams(window.location.search).get(
      'vnp_OrderInfo'
    )
    const transactionId = new URLSearchParams(window.location.search).get(
      'vnp_TransactionNo'
    )
    let amount = new URLSearchParams(window.location.search).get('vnp_Amount')
    const statusCode = new URLSearchParams(window.location.search).get(
      'vnp_ResponseCode'
    )
    amount = parseFloat(amount)
    amount = amount / 100
    const createObj = { card: cardId, amount, transactionId }

    if (statusCode !== '00') {
      this.$router.push('/error')
      return
    }
    this.$axios.post('/monthly-card-registers', createObj)
    this.$router.push('/result')
  },
}
</script>
