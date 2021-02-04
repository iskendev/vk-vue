<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import axios from "axios";
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    // Log the user in
     login() {
       this.$auth.loginWithRedirect();
      // console.log(res, 'res');
      // const token = await this.$auth.getTokenSilently();
      // const { data } = await axios.get("https://api.vk.com/method/groups.get?v=5.52", {
      //   headers: {
      //     Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
      //   }
      // });

      // console.log(data, 'data');


    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>
