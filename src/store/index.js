import { createStore } from 'vuex'
import {ethers} from "ethers";
import abi from '../abi/IToldYou.json';

export default createStore({
  state: {
    messages: [],
    metamaskStatus: '',
    networkStatus: '',
    accountAddress: '---',
    contractInstance: null,
    contractAddress: '0x8444610D8EA250C4e5D1Bc0B43220113D5a11639',
    isAwaiting: false,
  },
  mutations: {
    connectToWallet(state, address) {
      this.state.accountAddress = address;
    },
    addMessage(state, data) {
      this.state.messages.push(data)
    },
    setContractInstance(state, contract) {
      this.state.contractInstance = contract
    },
    setAwaitingState(state, value) {
      this.state.isAwaiting = value
    }
  },
  actions: {
    async connectToWallet({commit}) {
      const { ethereum } = window
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      if(accounts.length !== 0) {
        commit('connectToWallet', accounts[0])
        console.log('Connected to: ', accounts[0])
      }
    },
    async getAllMessages({commit}) {
      commit('setAwaitingState', true)
      try {
        const allMessages = await this.state.contractInstance.getAllMesssages()

        allMessages.forEach(msg => {
          commit('addMessage', {
            address: msg.messanger,
            message: msg.message,
            date: new Date(msg.timestamp * 1000),
            isWinner: msg.isWinner
          })
        })
      } catch(err) {
        console.log('gettingAllMessages error', err)
      }
      commit('setAwaitingState', false)
    },
    async addNewMessage({commit}, msg) {
      commit('setAwaitingState', true)
      try {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            this.state.contractAddress,
            abi,
            signer
        )
        contract.on('NewMessage', (from, message, date) => {
          commit('addMessage', {
            address: from,
            message: message,
            date: new Date(date * 1000),
            isWinner: msg.isWinner
          })
        })
        let count = await contract.getTotalMessages()
        console.log('Total messages count: ', count.toNumber())

        const msgTxn = await contract.addMessage(msg,{gasLimit: 600000})
        console.log('Start mining...')
        await msgTxn.wait()
        console.log('Mining done, hash:', msgTxn.hash)

        count = await contract.getTotalMessages()
        console.log('Total messages count: ', count.toNumber())

      } catch(err) {
        console.log('addingNewMessage error', err)
      }
      commit('setAwaitingState', false)
    },
  },
  modules: {
  }
})
