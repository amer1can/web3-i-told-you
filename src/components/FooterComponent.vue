<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-around align-items-center py-3 my-4 border-top">
        <span class="text-muted">© 2022 Company, Inc</span>
        <div class="twitter">
          <img src=".././assets/twitter-logo.svg" alt="">
          <a href="https://twitter.com/amer1canWM" target="_blank" rel="noreferrer">Seeing on Twitter</a>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
.twitter a {
  color: coral;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in;
}
.twitter a:hover {
  color: #ff4444;
  transition: all 0.2s ease-in;
}
.twitter img {
  width: 30px;
}

</style>
