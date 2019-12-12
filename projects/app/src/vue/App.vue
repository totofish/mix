<style lang="scss" scoped>
  .toolbar {
    background-color: #f6f6f6;
    color: #35495d;
    flex: 1;
  }
  .nav {
    a {
      text-decoration-line: none;
    }
    a:active,
    a:visited {
      color: #35495d;
    }
    a:hover {
      color: #547596;
    }
    a.active {
      text-decoration-line: underline;
    }
  }
</style>

<template>
  <div class="toolbar" role="banner">
    <img
      width="40"
      alt="Vue Logo"
      src="https://vuejs.org/images/logo.png"
    />
    <span>
      Welcome Vue -
      <router-view />
    </span>

    <span class="nav">
      <router-link
        active-class="active"
        to="/p1"
      >
        P1
      </router-link>
      <router-link
        active-class="active"
        to="/p2"
      >
        P2
      </router-link>
    </span>

  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>
