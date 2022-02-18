<template>
  <div v-if="this.$store.state.messages.length === 0" class="no-messages container list-messages p-3 bg-dark text-white mt-2 p-3">
    <h1>No messages yet...</h1>
  </div>
  <div v-else class="container list-messages p-3 bg-dark text-white mt-2 p-3">
    <input type="text" v-model="searchValue">
    <OneMessage v-for="(mess) in searchedArr" :key="mess.timestamp" :mess="mess"  />
  </div>
</template>

<script>
import OneMessage from "@/components/OneMessage";

export default {
  name: "ListMessages",
  components: {OneMessage},
  data() {
    return {
      searchValue: '',
    }
  },
  computed: {
    searchedArr() {
      const arr = this.$store.state.messages.filter(elem => elem.message.includes(this.searchValue))
      return arr
    }
  },
  methods: {
    // down() {
    //     console.log(this.searchValue)
    //     const arr = this.$store.state.messages.filter(elem => elem.message.includes(this.searchValue))
    //     console.log(arr)
    // }
  }
}
</script>

<style scoped>

</style>
