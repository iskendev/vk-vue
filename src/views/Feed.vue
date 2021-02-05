<template>
  <div class="feed">
    <feed-header @setPosts="setPosts" @sortBy="sortBy" />
    <feed-body v-if="payload" :payload="payload"/>
  </div>
</template>

<script>
import FeedHeader from '../components/FeedHeader.vue'
import FeedBody from '../components/FeedBody.vue'

export default {
  components: {
    FeedHeader,
    FeedBody
  },
  name: "Feed",
  data() {
    return {
      payload: null,
    };
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    setPosts(payload) {
      this.payload = payload
      console.log(this.payload);
    },
    sortBy(param) {
      if (this.payload) {
        this.payload.posts.sort((a, b) => {
          if (param === 'dates') {
            const first = new Date(a.date * 1000)
            const second = new Date(b.date * 1000)
            return new Date(second) - new Date(first)
          }
          return b[param].count - a[param].count
        });
      }
    }
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
      padding: 0 15px 15px 15px;
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

          .v-autocomplete-input-group {
            .v-autocomplete-input {
              font-size: 14px;
              padding: 5px;
              box-shadow: none;
              border: 1px solid #848F94;
              width: 250px;
              outline: none;
            }
          }

          .v-autocomplete-list {
            width: 100%;
            text-align: left;
            border: none;
            border-top: none;
            max-height: 400px;
            overflow-y: auto;
            border-bottom: 1px solid #848F94;

            .v-autocomplete-list-item {
              cursor: pointer;
              background-color: #fff;
              padding: 5px 10px;
              border-bottom: 1px solid #848F94;
              border-left: 1px solid #848F94;
              border-right: 1px solid #848F94;

              &:last-child {
                border-bottom: none;
              }

              &:hover {
                background-color: #eee;
              }
            }
          }
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

      .active {
        color: #FA3B69;;
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

    &__body {
      margin-top: 30px;
      padding: 15px;
      border: 1px solid #ccc;
      max-height: 600px;
      overflow: auto;

      &--wrapper {
        padding: 15px;
        border: 1px solid #eee;
        margin-bottom: 30px;

        strong { font-size: 14px; }

        p {
          margin-bottom: 0;
          white-space: pre-wrap;
        }
      }

      &--title {
        display: flex;

        img {
          border-radius: 50%;
        }

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 15px;

          p { margin: 0; padding: 0; }
        }
      }

      &--attachments {

        .attachments-pics {
          margin-top: 15px;

          img {
            width: 100%;
          }
        }
      }

      &--info {
        display: flex;
        justify-content: space-between;

        div {
          strong { margin-left: 15px; }
        }
      }
    }
  }
</style>