<template>
  <div class="hello">
    <auth-vidget/>
    <h1>HI</h1>

  </div>
</template>

<script>
  let url = `https://oauth.vk.com/authorize?client_id=${process.env.VUE_APP_VK_ID}&display=page&redirect_uri=&scope=friends,messages&response_type=token&v=5.52`
  let token = `https://oauth.vk.com/blank.html#access_token=da6e63328dd7d4993fa9e340e3fc55746b04939813ba98d40d4520551c098b14959d243965511e68331a6&expires_in=86400&user_id=169476481`
import AuthVidget from '../components/AuthVidget'

export default {
  name: '',
  components: {
    AuthVidget
  },
  created() {
    console.log(process.env);
  }
}
console.log(url);
console.log(token);
</script>



<style>

</style>
