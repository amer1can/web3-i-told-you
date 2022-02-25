<template>
  <HeaderComponent />
    <div class="main">
      <div :class="isAwait">
        <div class="icon">
          <img src="./assets/waiting_tr.gif" alt="" width="150">
          <h3 class="mt-5">Minting...</h3>
        </div>
      </div>
      <AddMessage />
      <ListMessages />
    </div>
<!--  <button class="btn btn-danger align-self-center" @click="withdraw">Withdraw</button>-->
  <FooterComponent />
</template>


<script>
//contract: 0xf2a440d9fbaF5C0991EbD9fA6f95e146609B1768 Rinkeby Balance: 0.1 ETH = 100 Finney
//contract2: 0x8444610D8EA250C4e5D1Bc0B43220113D5a11639 100Finney, isWinner option

import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import AddMessage from "@/components/AddMessage";
import ListMessages from "@/components/ListMessages";

import abi from './abi/IToldYou.json';
import { ethers } from "ethers";

export default {
  name: 'App',
  components: {
    ListMessages,
    AddMessage,
    FooterComponent,
    HeaderComponent
  },
  data() {
    return {
      contractABI: abi,
      contractAddress: '0x8444610D8EA250C4e5D1Bc0B43220113D5a11639',
      connectionStatus: '',
    }
  },
  computed: {
    isAwait() {
      return this.$store.state.isAwaiting ? 'waiting-on' : 'waiting-off'
    }
  },
  async mounted() {
    const { ethereum } = window
    if(!ethereum) {
      console.log('Make sure you have Metamask.');
      return;
    } else {
      console.log('We have ethereum object', this)
      await this.checkIfWalletIsConnected();
      this.getContractInstance()
      await this.$store.dispatch('getAllMessages')
    }
  },
  methods: {
    async checkIfWalletIsConnected() {
      const { ethereum } = window
      try {
        ethereum.isMetaMask ? this.$store.state.metamaskStatus = 'Metamask found'
            : this.$store.state.metamaskStatus = 'Metamask not found'
        ethereum.chainId === '0x4' ? this.$store.state.networkStatus = 'Rinkeby'
            : this.$store.state.networkStatus = ''

        const accounts = await ethereum.request({
          method: 'eth_accounts'
        })

        if(accounts.length !== 0) {
          console.log('Found an authorized account: ', accounts[0])
          this.$store.commit('connectToWallet', accounts[0])
        } else {
          console.log('No authorized accounts found')
        }
      } catch (err) {
        console.log('checkIfWalletIsConnected Error',  err)
      }
    },
    getContractInstance() {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
          this.contractAddress,
          this.contractABI,
          signer
      ) //address first! then ABI and signers!
      this.$store.commit('setContractInstance', contract)
    },
    withdraw() {
      try {
        const {ethereum} = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            this.contractAddress,
            this.contractABI,
            signer
        )
        console.log('Start')
        contract.getEthersFromBalance()
        console.log('End')

      } catch(err) {
        console.log(err)
      }
    },
  }
}
</script>

<style>
body {
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e5bcbc;
  background: #2b2828!important;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main {
  flex: 1 1;
}
.waiting-on {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background: black;
  z-index: 100;
  top: 0;
  bottom: 0;
}
.waiting-off {
  width: 0;
  height: 0;
  opacity: 1;
  z-index: 0;
}
.waiting-on .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.waiting-off .icon {
  display: none;
}
.tp {
  position: absolute;
  top: 20px;
  right: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  font-size: 12px;
  padding: 10px 15px;
  background: black;
  color: #e5bcbc;
  border-radius: 10px;
  transform: translateY(-100%);
  transition: all 0.7s ease-in-out;
}
.tp.showed {
  transform: translateY(0);
  visibility: visible;
  opacity: 1;
  transition: all 0.7s ease-in-out;
}

</style>
