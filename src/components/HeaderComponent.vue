<template>
  <header class="p-3 bg-dark text-white">
      <div class="header-info container d-flex align-items-center justify-content-between justify-content-lg-start">
        <ul class="nav">
          <li class="text-white-50">{{ this.$store.state.metamaskStatus }}</li>
          <li class="mx-2">Network: {{ this.$store.state.networkStatus }}</li>
          <li class="mx-2">Address:
            <span id="header-address"
                  @click="copyThisAddress(this.$store.state.accountAddress)"
                  >{{ showShortAddress }}</span>
          </li>
        </ul>

        <div class="">
          <button type="button"
                  class="btn"
                  :class="this.$store.state.accountAddress !== '---' ? 'btn-success disabled' : 'btn-warning'"
                  @click="connectToWallet">{{ btnStatus }}</button>
        </div>
      </div>
  </header>
</template>

<script>

import { copyAddress } from "@/utils";

export default {
  name: "HeaderComponent",
  data() {
    return {
      copyingAddr: false,
    }
  },
  computed: {
    btnStatus() {
      return this.$store.state.accountAddress !== '---' ? 'Connected' : 'Connect to wallet'
    },
    showShortAddress() {
      const str = this.$store.state.accountAddress;
      if (str === '---') {
        const res = str
        return res
      } else {
        const res = str.slice(0,4) + '...' + str.slice(-4)
        return res
      }
    }
  },
  methods: {
    async connectToWallet() {
      await this.$store.dispatch('connectToWallet')
    },
    copyThisAddress(address) {
      copyAddress(address)
    },
  },
}
</script>

<style scoped>
.nav span {
  cursor: pointer;
}


</style>
