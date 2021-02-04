<template>
  <div>
    <button @click="callApi">Call</button>
    <p>{{ apiMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "external-api",
  data() {
    return {
      apiMessage: ""
    };
  },
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      // const token = await this.$auth.getTokenSilently();

      console.log(VK);

      VK.init({
        apiId: 7749448
      });

      let options = {
        v: '5.126',
        q: 'الإسلام',
        // user_id: '165681341',
        // extended: 1,
        // filter: 'groups, publics',
        // fields: 'description',
        // count: '10'
        // access_token: token,
        sort: 2


      }

      VK.Api.call('groups.search', options, function(r) {
        // if(r) {
          console.log(r);
        // alert(r.response[0].bdate);
        // }
      });

      // https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V
      // https://api.vk.com/method/users.get?user_ids=210700286&fields=bdate&access_token=533bacf01e11f55b536a565b57531ac114461ae8736d6506a3&v=5.126

      // Use Axios to make a call to the API


      // var script = document.createElement('script');
      // script.src = `https://api.vk.com/method/friends.getOnline?&access_token=${token}&v=5.126&callback=callbackFunc`;
      // document.getElementsByTagName("head")[0].appendChild(script);
      // // callbackFunc()
      // function callbackFunc(result) {
      //   console.log(result, 'res');

      // }

      // console.log(callbackFunc());

      // lcp --proxyUrl https://api.vk.com


      // const { data } = await axios.get(`https://api.vk.com/method/friends.getOnline?access_token=${token}&v=5.126`)
      // const { data } = await axios.get("/api/external", {
      //   headers: {
      //     Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
      //   }
      // });

      // console.log(data);
      //  let res = await axios.get("https://api.vk.com/method/users.get")
      //  console.log(res);

      // this.apiMessage = data;
    }
  }
};
</script>