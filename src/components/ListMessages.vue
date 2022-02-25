<template>
  <div v-if="this.$store.state.messages.length === 0" class="no-messages container list-messages p-3 bg-dark text-white mt-2 p-3">
    <h1>No messages yet...</h1>
  </div>
  <div v-else class="container list-messages p-3 bg-dark text-white mt-2 p-3">
    <div class="searching-wrap">
      <div class="search-addr">
        <input type="text" v-model="searchAddress" placeholder="Search by address">
        <button class="btn-clear" @click="clearAddrSearch"></button>
      </div>
      <div class="search-mess">
        <input type="text" v-model="searchMessage" placeholder="Search by message">
        <button class="btn-clear" @click="clearMessSearch"></button>
      </div>
    </div>
    <OneMessage v-for="(mess) in searchedMes" :key="mess.timestamp" :mess="mess"  />
  </div>
</template>

<script>
import OneMessage from "@/components/OneMessage";

export default {
  name: "ListMessages",
  components: {OneMessage},
  data() {
    return {
      searchAddress: '',
      searchMessage: '',
    }
  },
  computed: {
    searchedMes() {
      if (this.searchAddress === '') {
        const arr = this.$store.state.messages.filter(elem => elem.message.toLowerCase().includes(this.searchMessage.toLowerCase()))
        return arr.sort().reverse()
      } else {
        const addrFilter = this.$store.state.messages.filter(elem => elem.address.includes(this.searchAddress))
        const arr = addrFilter.filter(elem => elem.message.toLowerCase().includes(this.searchMessage.toLowerCase()))
        return arr.sort().reverse()
      }
    }
  },
  methods: {
    clearAddrSearch() {
      this.searchAddress = ''
    },
    clearMessSearch() {
      this.searchMessage = ''
    }
  }
}
</script>

<style scoped>
.searching-wrap {
  display: flex;
}
.searching-wrap input {
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px 30px 5px 10px;
  font-size: 12px;
  outline: none;
}
.searching-wrap input:focus {
  outline: none;
}
.searching-wrap input::placeholder {
  font-size: 12px;
}
.search-addr {
  flex-basis: 30%;
  position: relative;
}
.btn-clear {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
  right: 5px;
  background: red;
  border-radius: 50%;
  font-size: 10px;
}
.search-mess {
  flex-basis: 62%;
  position: relative;
}
</style>
