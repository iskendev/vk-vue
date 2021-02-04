<template>
  <div class="feed__header">
    <div class="feed__header--top">
      <h1>Лента</h1>
      <v-autocomplete :items="items" v-model="item" :component-item='template'>
      </v-autocomplete>
    </div>
    <hr>
    <ul>
      <li>Лайки</li>
      <li>Репосты</li>
      <li>Комментарии</li>
      <li>Дата</li>
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
  data () {
    return {
      item: '',
      items: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' }
      ],
      template: ItemTemplate
    }
  },
  methods: {
    searchGroup(e) {
      console.log(e.target.value);
      console.log(this.model);
      console.log(this.value);
    },
    selectGroup() {
      console.log(this.model);
      console.log(this.value);
    },
  }
}
</script>



<style lang="scss">
  .feed {

  }

</style>