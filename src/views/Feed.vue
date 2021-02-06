<template>
  <div class="feed">
    <feed-header @setPosts="setPosts"
      @sortBy="sortBy" @filterBy="filterBy"/>
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
      payload: null
    };
  },
  methods: {
    setPosts(payload) {
      this.payload = payload
    },
    sortBy(param) {
      if (this.payload) {
        this.payload.posts.sort((a, b) => {
          return param === 'dates' ?
            this.sortByDates(a.date, b.date) :
              b[param].count - a[param].count
        });
      }
    },
    sortByDates(a, b) {
      const first = new Date(a * 1000)
      const second = new Date(b * 1000)
      return new Date(second) - new Date(first)
    },
    filterBy(param) {
      switch (param) {
        case 'photo': {
          this.fetchPosts().then(posts => {
            this.filterByPhotosVideos(posts, param)
          })
        }
        break

        case 'video': {
          this.fetchPosts().then(posts => {
            this.filterByPhotosVideos(posts, param)
          })
        }
        break

        case 'copy_history': {
          this.fetchPosts().then(posts => {
            this.filterByReposts(posts)
          })
        }
        break


        case 'text': {
          this.fetchPosts().then(posts => {
            this.filterByTextOnly(posts)
          })
        }
        break

        case 'reset': {
          this.fetchPosts().then(posts => {
            this.payload.posts = posts
          })
        }
        break
      }
    },
    fetchPosts() {
      const promise = new Promise((resolve, reject) => {
        const options = {
          v: '5.126',
          owner_id: this.payload.id,
          count: '100',
          extended: '1',
        }
        VK.Api.call('wall.get', options, (result) => {
          if (result.response.items) {
            resolve(result.response.items)
          }
        })
      })
      return promise
    },
    filterByPhotosVideos(posts, attachmentType) {
      posts = posts.filter(post => post.attachments)
      posts = posts.filter(post => post.attachments = post.attachments.filter(attch => attch.type === attachmentType))
      posts = posts.filter(post => post.attachments.length)
      this.payload.posts = posts
    },
    filterByReposts(posts) {
      this.payload.posts = posts.filter(post => post.copy_history)
    },
    filterByTextOnly(posts) {
      posts = posts.filter(post => !post.attachments)
      posts = posts.filter(post => !post.copy_history)
      this.payload.posts = posts
    }
  }
};
</script>