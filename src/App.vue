<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './styles/app.scss';

.nav {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &-wrapper {
    border: 1px solid #2c3e50;
    padding: 5px 30px;
    text-decoration: none;
    color: #2c3e50;
  }

  &__login {
    font-size: 18px;
  }

  &__logo {
    padding-top: 3px;
    margin-right: 5px;
  }
}
</style>
