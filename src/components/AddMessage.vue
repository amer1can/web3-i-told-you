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
        <button class="attach-file-btn btn btn-secondary mx-2" @click="sendFile">Attach</button>
      </div>
    </div>
  </div>
</template>

<script>
import {create} from "ipfs-http-client";

export default {
  name: "AddMessage",
  data() {
    return {
      msg: '',
      file: '',
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },
    async sendFile() {
      if(this.file !== '') {
        const client = create('https://ipfs.infura.io:5001/api/v0')

        try {
          const added = await client.add(this.file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log('URL added file: ', url)

        } catch(err) {
          console.log('Upload error', err)
        }
      } else {
        alert('Select file')
      }
    },
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
