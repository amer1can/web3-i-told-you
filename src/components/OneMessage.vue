<template>
  <div class="message">
    <div class="address">
      <span @click="copyThisAddress(mess.address)">{{ showShortAddress }}</span>
      <span>Date: {{ mess.date.toLocaleString() }}</span>
    </div>
    <div class="text">{{ mess.message }}</div>
    <div v-if="mess.isWinner" class="winner">Won!</div>
  </div>
</template>

<script>
import { copyAddress } from "@/utils";

export default {
  name: "OneMessage",
  props: ['mess'],
  computed: {
    showShortAddress() {
      return this.mess.address.slice(0,4) + '...' + this.mess.address.slice(-4)
    }
  },
  methods: {
    copyThisAddress(address) {
      copyAddress(address)
    },
  }
}
</script>

<style scoped>
.message {
  position: relative;
  display: flex;
  margin: 10px 0px;
  padding: 5px;
  background: #39393b;
  border-radius: 5px;
}
.address {
  margin-right: 10px;
  color: #e5bcbc;
  flex-basis: 12%;
  align-self: center;

}
.address span {
  display: block;
  color: coral;
  font-size: 10px;
}
.text {
  text-align: left;
  flex-basis: 62%;
}
.winner {
  position: absolute;
  padding: 3px 5px;
  top: 5px;
  right: 5px;
  background: yellow;
  color: black;
  border-radius: 3px;
  font-size: 10px;
}
</style>
