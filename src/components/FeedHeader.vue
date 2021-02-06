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
        placeholder="Поиск"
      >
      </v-autocomplete>
      <button @click="logout">Выйти</button>
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
      <li v-for="(element, i) in filterableElements"
        :key="i" @click="filterBy(element.param, i)"
        :class="{ active: element.isActive }">
        <font-awesome-icon :icon="element.icon" />
      </li>
      <li v-if="loading" class="loading">Подождите ...</li>
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
    loading: false,
    sortableElements: [
      { title: 'Лайки', param: 'likes', isActive: false },
      { title: 'Репосты', param: 'reposts', isActive: false },
      { title: 'Комментарии', param: 'comments', isActive: false },
      { title: 'Дата', param: 'dates', isActive: true },
    ],
    filterableElements: [
      { param: 'photo', icon: 'camera', isActive: false },
      { param: 'copy_history', icon: 'link', isActive: false },
      { param: 'video', icon: 'video', isActive: false },
      { param: 'text', icon: 'font', isActive: false },
      { param: 'reset', icon: 'backspace', isActive: true },
    ]
  }),
  methods: {
    setPosts(item) {
      this.loading = true
      this.setActiveElement('sortable', 3)
      this.setActiveElement('filterable', 4)

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
            id: -item.id,
            pic: item.photo_50,
            posts: res.response.items,
          }
          this.$emit('setPosts', payload)
          this.loading = false
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
    setActiveElement(type, i) {
      this[`${type}Elements`].forEach(element => element.isActive = false)
      this[`${type}Elements`][i].isActive = true
    },
    sortBy(param, i) {
      this.setActiveElement('sortable', i)
      this.$emit('sortBy', param)
    },
    filterBy(param, i) {
      this.setActiveElement('filterable', i)
      this.$emit('filterBy', param)
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
  created() {
    this.fetchUsersGroups()
  }
}
</script>