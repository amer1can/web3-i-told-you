<template>
  <header class="p-3 bg-dark text-white">
      <div class="header-info container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="text-white-50">{{ this.$store.state.metamaskStatus }}</li>
          <li class="mx-2">Network: {{ this.$store.state.networkStatus }}</li>
<!--          <li class="mx-2">Address: {{ this.$store.state.accountAddress }}</li>-->
          <li class="mx-2">Address:
            <span class="header-address"
                  @click="copyAddress"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Copy">{{ showShortAddress }}</span>
            <span class="tooltip">Copy</span>
          </li>
        </ul>

        <div class="text-end">
          <button type="button" class="btn btn-warning" @click="connectToWallet">{{ btnStatus }}</button>
        </div>
      </div>
  </header>
</template>

<script>

export default {
  name: "HeaderComponent",
  mounted() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  computed: {
    btnStatus() {
      return this.$store.state.accountAddress !== '---' ? 'Connected' : 'Connect to wallet'
    },
    showShortAddress() {
      const str = this.$store.state.accountAddress;
      const res = str.slice(0,4) + '...' + str.slice(-4)
      return res
    }
  },
  methods: {
    async connectToWallet() {
      await this.$store.dispatch('connectToWallet')
    },
    copyAddress() {
      const cp = this.$store.state.accountAddress
      navigator.clipboard.writeText(cp)
        .then(() => {
          console.log('Copied: ', cp)
        })
        .catch(err => console.log(err))
    }
  },
}
</script>

<style scoped>
.nav span {
  cursor: pointer;
}
header-address {

}
.tooltip {

}
</style>
