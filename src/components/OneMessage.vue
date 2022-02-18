<template>
  <div class="message">
    <div class="address">{{ mess.address }}<span>Time: {{ mess.date }}</span></div>
    <div class="text">{{ mess.message }}</div>
    <div v-if="mess.isWinner" class="winner">Won! 0.0001 ETH</div>
  </div>
</template>

<script>
export default {
  name: "OneMessage",
  props: ['mess']
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
  flex-basis: 25%;
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
