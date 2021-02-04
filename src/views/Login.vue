<template>
  <div class="nav">
      <template v-if="!$auth.loading">
        <router-link to="/feed" class="nav-wrapper">
          <font-awesome-icon class="nav__logo" :icon="['fab', 'vk']"  size="lg" :style="{ color: '#2c3e50' }" />
          <span class="nav__login">{{ $auth.isAuthenticated ? 'Вы авторизованы' : 'Войти' }}</span>
        </router-link>
      </template>
      <template v-else>
        Подождите ...
      </template>
    </div>
</template>
<script>
  export default {
    name: 'Login'
  }
</script>
