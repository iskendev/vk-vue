<template>
  <div class="feed__header">
    <div class="feed__header--top">
      <h1>Лента</h1>
      <v-autocomplete
        :items="groups"
        :value="item"
        :component-item='template'
        @change="updateGroups"
        :get-label="setPosts"
      >
      </v-autocomplete>
    </div>
    <hr>
    <ul>
      <li v-for="(element, i) in sortableElements"
        :key="i" @click="sortBy(element.param, i)"
        :class="{ active: element.isActive }"
      >{{ element.title }}
      </li>
    </ul>
    <ul class="feed__header--icons">
      <li><font-awesome-icon icon="camera" /></li>
      <li><font-awesome-icon icon="link" /></li>
      <li><font-awesome-icon icon="video" /></li>
    </ul>
  </div>
</template>

<script>
import ItemTemplate from './ItemTemplate.vue'
export default {
  components: {  },
  data: () => ({
    item: '',
    groups: [],
    template: ItemTemplate,
    token: '',
    sortableElements: [
      { title: 'Лайки', param: 'likes', isActive: false },
      { title: 'Репосты', param: 'reposts', isActive: false },
      { title: 'Комментарии', param: 'comments', isActive: false },
      { title: 'Дата', param: 'dates', isActive: true },
    ]
  }),
  methods: {
    setPosts(item) {
      console.log(item);
      const options = {
        v: '5.126',
        owner_id: -item.id,
        count: '100',
        extended: '1',
      }

      VK.Api.call('wall.get', options, (res) => {
        if (res.response.items) {
          const payload = {
            name: item.name,
            pic: item.photo_50,
            posts: res.response.items
          }
          this.$emit('setPosts', payload)
        }
      });

      return item.name
    },
    updateGroups(text) {
      if (text) {
        const options = {
          v: '5.126',
          q: text
        }

        VK.Api.call('groups.search', options, (res) => {
          if (res.response.items) {
            this.groups = res.response.items
          }
        });
      }
    },
    fetchUsersGroups() {
      VK.init({ apiId: 7749448 })

      const options = {
        v: '5.126',
        extended: 1,
        count: '1000'
      }

      VK.Api.call('groups.get', options, (res) => {
        if(res.response.items) {
          this.groups = res.response.items
        }
      });
    },
    sortBy(param, i) {
      this.sortableElements.forEach(element => element.isActive = false)
      this.sortableElements[i].isActive = true
      this.$emit('sortBy', param)
    }
  },
  created() {
    this.fetchUsersGroups()
  }
}
</script>