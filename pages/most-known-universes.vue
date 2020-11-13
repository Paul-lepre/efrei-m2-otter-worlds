<template>
  <v-container>
    <!-- Iterate through the universes -->
    <div v-for="universe in universes" :key="universe.id">
      <!-- Card for the current universe -->
      <v-card
        class="zoom-xs"
        elevation="8"
        :to="'/universe/' + universe.name"
      >
        <!-- Title of the universe -->
        <v-card-title>
          <v-container fluid class="pa-0">
            <v-row align="center" justify="center">
              <!-- Logo -->
              <v-col md="2" align="right">
                <v-img src="/logo.png" max-height="100" max-width="100" contain />
              </v-col>

              <!-- Title -->
              <v-col md="5">
                <h1 class="primary--text">
                  {{ universe.name }}
                </h1>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>

        <!-- Some stuff -->
        <v-card-subtitle>
          <i>{{ (universe.user || {username: 'unknown' }).username }}</i>
        </v-card-subtitle>

        <!-- Description of the universe -->
        <v-card-text>
          <v-container>
            <h3>{{ universe.description }}</h3>
          </v-container>
        </v-card-text>
      </v-card>

      <!-- some spaces -->
      <br><br>
    </div>
  </v-container>
</template>

<script>
const traverson = require('traverson-promise')

export default {
  name: 'MostKnownUniverses',
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
          traverson.from(universe._links.user.href)
            .getResource().result
            .then((document) => {
              this.$set(universe, 'user', document)
            })
        }))
      })
      .catch((err) => {
        throw err.message
      })
  },

  methods: {
  }
}
</script>
