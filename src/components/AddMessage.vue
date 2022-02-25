<template>
  <div class="p-3 bg-dark text-white">
    <div class="add-message container d-flex flex-wrap align-items-center justify-content-center">
      <label class="char">Chars: {{ charCounter }}</label>
      <form class="col-9 mb-3 mb-lg-0 me-lg-3">
        <input
            type="text"
            class="form-control form-control-dark"
            :class="{
                      wrongMessMore: charCounter < 10,
                      wrongMessLess: charCounter > 256
                     }"
            placeholder="Your message here must be more 10 and less 256 characters"
            v-model="msg"
        >
      </form>
      <div class="text-end">
        <button type="button"
                class="btn btn-secondary"
                @click="addNewMsg(msg)"
                :disabled="disableBtnLess || disableBtnMore">Add message</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddMessage",
  data() {
    return {
      msg: ''
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
    }
  }
}
</script>

<style scoped>
.char {
  font-size: 12px;
  color: sienna;
  margin-right: 10px;
}
.wrongMessMore,
.wrongMessMore:focus,
.wrongMessLess,
.wrongMessLess:focus{
  background: #f58d8d;
}
</style>
