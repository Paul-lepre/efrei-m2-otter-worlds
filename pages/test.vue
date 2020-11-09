<template>
  <div>
    <div v-for="universe in universes" :key="universe.id">
      <v-card
        elevation="11"
        @click="1 + 1"
      >
        <v-card-title>
          <v-container fluid class="pa-0">
            <div class="d-flex justify-space-between">
              <div>
                {{ universe.elevation }} {{ universe.name }}
              </div>
              <div>
                <v-icon small>
                  {{ universe.public ? 'mdi-book-lock-open-outline' : 'mdi-book-lock-outline' }}
                </v-icon>
              </div>
            </div>
          </v-container>
        </v-card-title>
        <v-card-subtitle>
          <i>{{ universe.user }}</i>
        </v-card-subtitle>
        <v-card-text>
          {{ universe.description }}
        </v-card-text>
      </v-card>
      <br>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// Imports
const traverson = require('traverson-promise')

export default {
  name: 'Universes',
  components: {
  },
  data: () => ({
    universes: []
  }),
  computed: {
  },
  mounted () {
    traverson.from('http://localhost:3000/api/v1')
      .follow('$._links.universes')
      .getResource().result
      .then((document) => {
        this.universes = document.universes
        return Promise.all(this.universes.map((universe) => {
          console.log('here')
          console.log(universe._links.user)
          traverson.from(universe._links.user)
            .getResource().result
            .then((document) => {
              console.log('here2')
              universe.user = document
            })
        }))
      })
      .then(() => {
        console.log(this.universes)
      })
      .catch((err) => {
        throw err.message
      })
  },
  methods: {
  }
}
</script>
