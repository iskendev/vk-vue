<template>
  <div class="feed__body">
    <div v-for="post in payload.posts" :key="post.id" class="feed__body--wrapper">
      <div class="feed__body--title">
        <img :src="payload.pic" alt="logo">
        <div>
          <p><strong>{{ payload.name }}</strong></p>
          <p><strong>{{ displayDateTime(post.date) }}</strong></p>
        </div>
      </div>
      <p>{{ post.text }}</p>
      <template v-if="post.attachments">
        <div class="feed__body--attachments" v-for="(attachment, i) in post.attachments" :key="i">
          <div v-if="attachment.type == 'photo'" class="attachments-pics">
            <img :src="attachment.photo.sizes[4].url" alt="pic">
          </div>
          <div v-if="attachment.type == 'video'" class="attachments-pics">
            <img :src="attachment.video.image[3].url" alt="pic">
          </div>
        </div>
      </template>
      <template v-if="post.hasOwnProperty('copy_history')">
        <span style="color: red">reposted from some source ...</span>
      </template>
      <hr>
      <div class="feed__body--info">
        <strong v-if="post.views"><font-awesome-icon icon="eye" /> {{ post.views.count }}</strong>
        <div>
          <strong><font-awesome-icon icon="heart" /> {{ post.likes.count }}</strong>
          <strong><font-awesome-icon icon="retweet" /> {{ post.reposts.count }}</strong>
          <strong v-if="post.comments.can_post"><font-awesome-icon icon="comments" /> {{ post.comments.count }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['payload'],
    name: 'FeedBody',
    methods: {
      displayDateTime(unix) {
        const date = new Date(unix * 1000).toLocaleDateString("ru-RU")
        const time = new Date(unix * 1000).toLocaleTimeString("ru-RU", {hour: '2-digit', minute:'2-digit'})

        return `${date} / ${time}`
      }
    }
  }
</script>

<style lang="scss">

</style>