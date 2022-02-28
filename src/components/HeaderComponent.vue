<template>
  <header class="p-3 bg-dark text-white">
      <div class="header-info container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="text-white-50">{{ this.$store.state.metamaskStatus }}</li>
          <li class="mx-2">Network: {{ this.$store.state.networkStatus }}</li>
          <li class="mx-2">Address:
            <span id="header-address"
                  @click="copyThisAddress(this.$store.state.accountAddress)"
                  >{{ showShortAddress }}</span>
          </li>
          <li>
            <div class="d-flex">
              <input type="file"
                     class="form-control"
                     ref="file"
                     @change="handleFileUpload">
              <button class="btn btn-secondary mx-2" @click="sendFile">Submit</button>
            </div>
          </li>
        </ul>

        <div class="text-end">
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
import { create } from 'ipfs-http-client'

export default {
  name: "HeaderComponent",
  data() {
    return {
      copyingAddr: false,
      file: '',
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
    copyThisAddress(address) {
      copyAddress(address)
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },
    async sendFile() {
      const client = create('https://ipfs.infura.io:5001/api/v0')

      try {
        const added = await client.add(this.file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        console.log('URL added file: ', url)

      } catch(err) {
        console.log('Upload error', err)
      }
    }
  },
}
</script>

<style scoped>
.nav span {
  cursor: pointer;
}


</style>
