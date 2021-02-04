<template>
  <div class="feed">
    <feed-header />
  </div>
</template>

<script>
import axios from "axios";
import FeedHeader from '../components/FeedHeader.vue';

export default {
  components: { FeedHeader },
  name: "Feed",
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
    },
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
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },

  }
};
</script>

<style lang="scss">
  .feed {
    width: 40%;
    margin: 0 auto;
    color: #848F94;

    &__header {
      margin-top: 50px;
      padding: 0 15px;
      border: 1px solid #ccc;

      &--top {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;

        h1 {
          color: #6D726C;
          margin: 0;
          padding: 0;
        }

        .v-autocomplete {
          margin-top: 10px;
        }
      }

      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;

        li {
          margin-right: 30px;
          font-weight: bold;
          cursor: pointer;
          font-size: 15px;

          &:hover {
            color: #FA3B69;
          }
        }
      }

      .feed__header--icons {
        margin-top: 20px;

        li {
          border: 1px solid #6D726C;
          padding: 8px 10px;
          border-radius: 50%;
           margin-right: 20px;

          &:hover {
            border-color: #FA3B69;
          }
        }
      }
    }
  }
</style>