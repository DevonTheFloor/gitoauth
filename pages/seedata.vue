<template>
  <div>
    <h1>See token</h1>
    <p> {{ datas }} </p>
  </div>
</template>

<script>
export default {
  mounted () {
    const gettingStores = this.$cookies.get('logged-session.sig')
    console.log('getCookie :', gettingStores)
  }
}
</script>
