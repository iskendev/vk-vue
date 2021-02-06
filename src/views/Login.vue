<template>
  <div class="login">
      <template v-if="!$auth.loading">
        <router-link to="/feed" class="login-wrapper">
          <font-awesome-icon class="login__logo" :icon="['fab', 'vk']"  size="lg" :style="{ color: '#2c3e50' }" />
          <span class="login__enter">{{ $auth.isAuthenticated ? 'Вы авторизованы' : 'Войти' }}</span>
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
