<template>
  <div class="p-3 bg-dark text-white">
    <div class="add-message container">
      <form class="d-flex align-items-center justify-content-between">
        <label class="chars">Chars: {{ charCounter }}</label>
        <div class="add-line">
          <input
              type="text"
              class="form-control"
              :class="{
                      wrongMessMore: charCounter < 10,
                      wrongMessLess: charCounter > 256
                     }"
              placeholder="Your message here must be more 10 and less 256 characters"
              v-model="msg"
          >
        </div>
          <button type="button"
                  class="btn btn-secondary add-mess-btn"
                  @click="addNewMsg(msg)"
                  :disabled="disableBtnLess || disableBtnMore"
          >Add message</button>
      </form>

      <div class="d-flex my-2 align-items-center justify-content-center">
        <input type="file"
               class="attach-file form-control-file"
               ref="file"
               @change="handleFileUpload">
        <button class="attach-file-btn btn btn-secondary mx-2" @click="sendFileToNftStorage">Upload File</button>
        <button class="attach-file-btn btn btn-secondary mx-2" @click="mintNFT">Mint</button>
      </div>
    </div>
  </div>
</template>

<script>
// import {create} from "ipfs-http-client";
import {NFTStorage} from "nft.storage";
import abi from '../abi/item.json';
//contract address: 0x8aE94afADd97943d8f92BCBbB1EA91049b15147F
import { ethers } from 'ethers';

export default {
  name: "AddMessage",
  data() {
    return {
      msg: '',
      file: '',
      metadata: '',
    }
  },
  computed: {
    charCounter() {
      return this.msg.length
    },
    disableBtnLess() {
      if (this.msg.length < 10) return true
      else return false
    },
    disableBtnMore() {
      if (this.msg.length > 256) return true
      else return false
    }

  },
  methods: {
    addNewMsg(msg) {
        this.$store.dispatch('addNewMessage', msg)
        this.msg = ''
    },
    //select file to upload
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },

    // async sendFileToInfura() {
    //   if(this.file !== '') {
    //     const client = create('https://ipfs.infura.io:5001/api/v0')
    //
    //     try {
    //       const added = await client.add(this.file)
    //       const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //       console.log('URL added file: ', url)
    //
    //     } catch(err) {
    //       console.log('Upload error', err)
    //     }
    //   } else {
    //     alert('Select file')
    //   }
    // },

    // sending selected file to nft.storage
    async sendFileToNftStorage() {
      const api = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBlOTdiMDREMDRBZGI0MzRiNTREM0FkMkE0RDc0ZTZGMDNFZTg3YTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NDkyNjkyNDY0MywibmFtZSI6ImFuaW1lIGdpcmxzIn0.zEtZ562UCTtl76EdWhkELT0nG1aGfrOGJk56U4FHzDo'
      if(this.file !== '') {
        const nft = {
          image: this.file,
          name: 'Some image',
          description: 'Some description',
          properties: {
            type: "blog-post",
            origins: {
              http: "https://nft.storage/",
              ipfs: "ipfs:/some-address/"
            },
            authors: [{ name: "amer1can" }],
            content: {
              "text/markdown": "The last year has witnessed the explosion of NFTs"
            }
          }
        }

        const client = new NFTStorage({token: api})
        const metadata = await client.store(nft)

        console.log('NFT data stored!')
        console.log('Metadata URI:', metadata.url)
        this.metadata = metadata.url
        //Metadata URI: ipfs://bafyreicqxlyroy4d4ue5y5ymxwqikngeqs5oq5xwr4ha3gus3wmb6cffyi/metadata.json
      }
    },

    async mintNFT() {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(
              // '0x8aE94afADd97943d8f92BCBbB1EA91049b15147F', //not working
              '0x0fB189Bf5a61FC5e2F6fc069AA3F5911aE693965',
              abi,
              signer
          )

          let txn = await contract.awardItem(
              this.$store.state.accountAddress,
              'ipfs://bafyreicqxlyroy4d4ue5y5ymxwqikngeqs5oq5xwr4ha3gus3wmb6cffyi/metadata.json'
          )
          console.log('Minting')
          await txn.wait()
          console.log('Minted:', txn.hash)
          //0x7677d9882dd993f97f7c888e4a54106e9fd7d12f412ebdc1f66c6bd2fb51a65a
        }

      } catch(err) {
        console.log('MintNFT error', err)
      }
    }

  }
}
</script>

<style scoped>
.chars {
  font-size: 12px;
  color: sienna;
}
.add-line {
  flex: 1 1;
  margin: 0px 10px;
}
.wrongMessMore,
.wrongMessMore:focus,
.wrongMessLess,
.wrongMessLess:focus{
  background: #f58d8d;
}
.attach-file {
  font-size: 12px;
  border-radius: 5px;
}
.attach-file-btn {
  font-size: 12px;
  padding: 3px 10px;
}
</style>
