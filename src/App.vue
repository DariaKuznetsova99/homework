<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <v-icon>mdi-open-in-new</v-icon>
        <span class="mr-2">Склад</span>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
              <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="addShelve()"
            >
              Добавить стеллаж
            </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld v-for="(shelve, i)  in shelves" :shelves="shelves" :shelve="shelve" :key="i" @remove="removeShelve(i)" @save="updateShelve(i, $event)" @append="appendItem" />



    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import axios from 'axios';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    shelves: []
  }),
    methods: {
      appendItem(item, i) {
        this.shelves[i].items.push(item)
      },
      addShelve () {
        let newdata = {name:'Новый стеллаж', items:[]}
      this.shelves.push(newdata)
        axios.post(`http://0.0.0.0:3001/shelves`, {
          body: JSON.stringify(newdata)
       })
      .then(response => {response})
      .catch(e => {
        this.errors.push(e)
      })
      },
      removeShelve(i) {
        this.shelves.splice(i, 1)
          axios.delete(`http://0.0.0.0:3001/shelves/`+i)
      .then(response => {response})
      .catch(e => {
        this.errors.push(e)
      })
      },
      updateShelve(i, shelve) {
        this.shelves[i] = shelve
        axios.put(`http://0.0.0.0:3001/shelves/`+i, {
          data: shelve
       })
      .then(response => {response})
      .catch(e => {
        this.errors.push(e)
      })
      }
    },
    mounted () {
    axios
      .get('http://0.0.0.0:3001/shelves')
      .then(response => (this.shelves = response.data))
  }

};
</script>