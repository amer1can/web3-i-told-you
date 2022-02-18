<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="text-white-50">{{ this.$store.state.metamaskStatus }}</li>
          <li class="mx-2">Network: {{ this.$store.state.networkStatus }}</li>
          <li class="mx-2">Address: {{ this.$store.state.accountAddress }}</li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
          <button type="button" class="btn btn-warning" @click="connectToWallet">{{ btnStatus }}</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: "HeaderComponent",
  computed: {
    btnStatus() {
      return this.$store.state.accountAddress !== '---' ? 'Connected' : 'Connect to wallet'
    }
  },
  methods: {
    async connectToWallet() {
      await this.$store.dispatch('connectToWallet')
    },
  },
}
</script>

<style scoped>

</style>
