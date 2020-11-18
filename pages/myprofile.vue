<template>
  <v-container>
    <h1 class="primary--text">
      Name / Password
    </h1>
    <v-container>
      <h4>
        username
      </h4>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="10"
                label="Password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="confirmpassword"
                :rules="passwordRules"
                :counter="10"
                label="Confirme Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'PageSetings',

  components: {},

  data: () => ({
    username: 'John doe',
    valid: false,
    password: '',
    confirmpassword: '',
    passwordRules: [
      v => !!v || 'password is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
  }),

  computed: {},

  mounted () {},

  methods: {}
}
</script>
