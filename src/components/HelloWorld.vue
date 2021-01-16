<template>

  <v-data-table
    :headers="headers"
    :items="shelve.items"
    class="elevation-1"
        hide-default-footer

  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><v-text-field
                      v-model="shelve.name"></v-text-field  ></v-toolbar-title>
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
              @click="addItem()"
            >
              Добавить товар
            </v-btn>
        
      </v-toolbar>
    </template>

    <template v-slot:item.name="{ item }">
                    <v-text-field
                      v-model="item.name"
                      label="Наименование"></v-text-field  >
    </template>
    <template v-slot:item.actions="{ item }">
          <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Переместить
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(sh, index) in shelves"
          :key="index"
        >
          <v-list-item-title @click="moveItem(item, index)">{{ sh.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      Пустой стеллаж
    </template> 
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      headers: [
        {
          text: 'Наименование',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      //shelve: {name:'Стеллаж', items:[]},
      
      }),
    props: [
      'shelves','shelve'
    ],

    created () {
      this.initialize();
    },
    watch: {
      shelve: {deep: true, handler() {
        this.$emit('save', this.shelve)
      }
      }
    },

    methods: {
      initialize () {
        this.shelve = 
        {name: 'Стеллаж1', items:[{name: 'тест'}]}
      
      },
      addItem () {
      this.shelve.items.push({name:'Новый товар'})

      },
      deleteItem (item) {
        this.shelve.items.splice(this.shelve.items.indexOf(item), 1)
        if(this.shelve.items.length === 0) {
          this.$emit('remove', [])
        }

      },
      moveItem (item, sh) {
        this.shelve.items.splice(this.shelve.items.indexOf(item), 1)
        this.$emit('append', item, sh)
        if(this.shelve.items.length === 0) {
          this.$emit('remove', [])
        }

      },

      
      
    }
    }
</script>