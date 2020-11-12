<template>
  <v-container>
    <!-- Logo -->
    <v-row align="center" justify="center">
      <v-col md="4">
        <v-img src="/logo-text.png" contain />
      </v-col>
    </v-row>

    <!-- blablabla -->
    <h1>About us</h1>
    <v-container>
      <h4>
        We are a group of 4 <a href="https://www.efrei.fr">Efrei Paris</a> Students in their 5th year of cursus in Software Engineering,
        and this website was made for a course of Asynchronous Programming.

        <br><br>

        Please do not hack us <span class="font-italic">(yet !)</span>, we'll be working on that in the short future...

        <br><br><br><br>

        <span class="ma-16">Still reading ? Thanks, here's a gift for you !</span>
      </h4>
    </v-container>

    <!-- Funny thing -->
    <v-row align="center" justify="center">
      <v-col md="6">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <v-img
            src="https://tse1.mm.bing.net/th?id=OIP.Qf7AaciNDBLzl6WlbMqG2wHaCe&pid=Api"
            contain
          />
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageGettingStarted',

  components: {},

  data: () => ({}),

  computed: {},

  mounted () {},

  methods: {}
}
</script>
