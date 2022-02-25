<template>
  <header class="p-3 bg-dark text-white">
      <div class="header-info container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="text-white-50">{{ this.$store.state.metamaskStatus }}</li>
          <li class="mx-2">Network: {{ this.$store.state.networkStatus }}</li>
<!--          <li class="mx-2">Address: {{ this.$store.state.accountAddress }}</li>-->
          <li class="mx-2">Address:
            <span id="header-address"
                  @click="copyAddress"
                  >{{ showShortAddress }}</span>
            <span id="tooltip">Copied</span>
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
      const tooltip = document.querySelector('#tooltip')
      tooltip.classList.add('showed')

      setTimeout(()=> {
        tooltip.classList.remove('showed')
      }, 1000)
    }
  },
}
</script>

<style scoped>
.nav span {
  cursor: pointer;
}
#tooltip {
  visibility: hidden;
  opacity: 0;
  font-size: 10px;
  padding: 3px;
  background: black;
  color: #e5bcbc;
  margin-left: 10px;
  border-radius: 3px;
  transition: all 0.5s ease-in-out;
}
#tooltip.showed {
  visibility: visible;
  opacity: 1;
  transition: all 0.5s ease-in-out;
}

</style>
