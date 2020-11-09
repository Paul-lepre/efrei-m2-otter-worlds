<template>
  <v-app dark>
    <!-- App bar (navbar) -->
    <v-app-bar app>
      <v-spacer />
      <!-- App-bar logo -->
      <router-link to="/">
        <v-img
          class="zoom-sm"
          href="/"
          src="/logo-text-full.png"
          max-height="80"
          max-width="180"
          contain
        />
      </router-link>

      <v-spacer />

      <!-- Search bar -->
      <v-text-field
        :placeholder="populateSearchBar"
        hide-details
        single-line
        clearable
      >
        <v-icon slot="prepend">
          mdi-magnify
        </v-icon>
      </v-text-field>

      <v-spacer />

      <!-- if logged : profile tab -->
      <v-menu
        v-if="isUserLogged"
        open-on-hover
        offset-y
        bottom
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- button to activate menu -->
          <v-btn
            class="ma-2"
            outlined
            x-large
            v-bind="attrs"
            v-on="on"
          >
            <v-badge
              v-if="isUserLogged"
              class="ma-2"
              bordered
              bottom
              color="red lighten-1"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar size="40">
                <v-img
                  src="https://tse1.mm.bing.net/th?id=OIP.UYxX1vxsuqp7EKw6eFQr7QHaE8&pid=Api"
                />
              </v-avatar>
            </v-badge>
            {{ name }}
          </v-btn>
        </template>

        <!-- menu displaying a user's action -->
        <v-list>
          <v-list-item
            v-for="(item, index) in itemsProfile"
            :key="index"
            :to="item.to"
          >
            <v-icon
              class="ma-2"
            >
              {{ item.icon }}
            </v-icon>
            <v-list-item-title>- {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- otherwise : login / signin tab -->
      <v-btn
        v-else
        class="ma-2"
        outlined
        x-large
        @click="isDialogActive = true; tabModel = 0"
      >
        <v-icon class="mr-2">
          mdi-account-circle
        </v-icon>
        Login / Sign in
      </v-btn>
      <v-spacer />

      <!-- Tabs -->
      <template v-slot:extension>
        <v-tabs
          fixed-tabs
          icons-and-text
          center-active
        >
          <v-tab
            v-for="(item, i) in drawerItems"
            :key="i"
            :to="item.to"
            router
            exact
          >
            {{ item.title }}
            <v-icon>{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <!-- END APP BAR -->

    <!-- Login Form -->
    <v-dialog v-model="isDialogActive" max-width="750px">
      <!-- Login Dialog -->
      <v-card>
        <v-tabs
          v-model="tabModel"
          background-color="blue-grey darken-4"
          grow
          dark
        >
          <!-- All the menus Tabs-->
          <!-- 1 - Login -->
          <v-tab>
            <v-icon left>
              mdi-login
            </v-icon>
            <div class="shrink mt-1 d-none d-lg-flex">
              Login
            </div>
          </v-tab>

          <!-- 2 - Sign in -->
          <v-tab>
            <v-icon left>
              mdi-account-plus
            </v-icon>
            <div class="shrink mt-1 d-none d-lg-flex">
              Sign in
            </div>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabModel">
          <!-- All the menu's contents -->
          <!-- 1 - Login -->
          <v-tab-item>
            <v-card-text>
              <v-container>
                <v-form>
                  <!-- Text -->
                  <h3 class="pa-4" align="center">
                    Have you tried "user1" and "test" ?
                  </h3>

                  <v-spacer />

                  <!-- Field : Username -->
                  <v-text-field
                    v-model="loginUsername"
                    class="pa-4"
                    label="Username"
                    prepend-icon="mdi-face"
                    :rules="[rules.required]"
                    clearable
                    counter
                    maxlength="15"
                  />

                  <!-- Field : Password -->
                  <v-text-field
                    v-model="loginPassword"
                    class="pa-4"
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    :rules="[rules.required]"
                    required
                  />
                </v-form>

                <br><br><br>

                <!-- ALERT - displayed if the credentials are incorrect -->
                <v-alert
                  :value="loginFailed"
                  dense
                  outlined
                  dismissible
                  prominent
                  type="error"
                  transition="scale-transition"
                >
                  Please fill the form accordingly
                </v-alert>
              </v-container>
            </v-card-text>
          </v-tab-item>

          <!-- 2 - Sign up -->
          <v-tab-item>
            <v-card-text>
              <v-container>
                <v-form>
                  <!-- Text -->
                  <h3 class="pa-4" align="center">
                    Having an account allows you to keep track of your scores
                  </h3>

                  <v-spacer />

                  <!-- Field : Username -->
                  <v-text-field
                    v-model="signUpUsername"
                    class="pa-4"
                    label="Username"
                    prepend-icon="mdi-face"
                    :rules="[rules.required]"
                    clearable
                    counter
                    maxlength="15"
                  />

                  <!-- Field : Password -->
                  <v-text-field
                    v-model="signUpPassword"
                    class="pa-4"
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    :rules="[rules.required]"
                    required
                  />

                  <!-- Field : E-mail -->
                  <v-text-field
                    v-model="signUpEmail"
                    class="pa-4"
                    label="E-mail"
                    prepend-icon="mdi-at"
                    :rules="[rules.required, rules.email]"
                    required
                    clearable
                  />
                </v-form>
                <br><br><br>

                <!-- ALERT - displayed if the credentials are incorrect -->
                <v-alert
                  :value="signUpFailed"
                  dense
                  outlined
                  dismissible
                  prominent
                  type="error"
                  transition="scale-transition"
                >
                  Please fill the form accordingly
                </v-alert>
              </v-container>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>

        <!-- Buttons -->
        <v-card-actions>
          <v-spacer />
          <!-- Button - CLOSE -->
          <v-btn
            color="secondary"
            text
            @click="isDialogActive = false"
          >
            Close
          </v-btn>

          <!-- Button - ACTION ! -->
          <v-btn
            color="success"
            text
            @click="tabModel == 0 ? logIn() : signUp()"
          >
            {{ tabModel == 0 ? 'Login !' : 'Sign up !' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- END LOGIN / SIGN IN FORM -->

    <!-- Container for Nuxt's page -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- Footer to display the year -->
    <v-footer app>
      <span>
        &copy; {{ new Date().getFullYear() }} - made for Louis Cherel, with love
      </span>
    </v-footer>
    <!-- END FOOTER -->
  </v-app>
</template>

<style>
/* Zoom effect when overing */
.zoom {
  transition: transform .2s;
}
.zoom:hover {
  transform: scale(1.2);
}
.zoom-sm {
  transition: transform .2s;
}
.zoom-sm:hover {
  transform: scale(1.1);
}
</style>

<script>
export default {
  data () {
    return {
      // name: '',
      name: 'Dark motherfucker 69420',
      itemsProfile: [
        {
          icon: 'mdi-earth',
          title: 'My universes',
          to: '/universe'
        },
        {
          icon: 'mdi-human-handsup',
          title: 'My characters',
          to: '/characters'
        },
        {
          icon: 'mdi-cog',
          title: 'Edit profile',
          to: '/myprofile'
        },
        {
          icon: 'mdi-logout-variant',
          title: 'Logout',
          to: '/logout'
        }
      ],
      data: null,
      isDialogActive: false,
      tabModel: null,
      loginUsername: '',
      loginPassword: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpEmail: '',
      loginFailed: false,
      signUpFailed: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => !!value || 'Invalid e-mail.'
      }
      /*
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
      */
    }
  },

  computed: {
    drawerItems () {
      // We declare some items
      const items = [
        {
          icon: 'mdi-earth',
          title: 'Universes',
          to: '/universe'
        },
        {
          icon: 'mdi-human-handsup',
          title: 'Characters',
          to: '/characters'
        },
        {
          icon: 'mdi-feather',
          title: 'Wiki',
          to: '/wiki'
        },
        {
          icon: 'mdi-map-legend',
          title: 'Maps',
          to: '/map'
        },
        {
          icon: 'mdi-help',
          title: 'Forums',
          to: '/forum'
        }
      ]

      // We return the items
      return items
    },

    isUserLogged () {
      return this.name.length !== 0
    },

    searchBarItems () {
      return [
        'John Frusciante',
        'James Hetlfield',
        'Kirk Hammett',
        'Cliff Burton',
        'Tobias Forge',
        'Synister Gate',
        'Corey Taylor',
        'Jim Root',
        'Louka Diamond',
        'Dawn Pearl',
        'Luke Skywalker',
        'Darth Maul',
        'Darth Tyrannus',
        'Darth Sidious',
        'Darth Vader',
        'Darth Nihilus',
        'Kylo Ren',
        'General Grievous',
        'Karl Franz',
        'Krog-Gar',
        'Ulthuan',
        'Archaon',
        'Tobby-One-Eye'
      ]
    },

    populateSearchBar () {
      // We create a copy of the searchBarItems (since we'll use slice)
      const items = this.searchBarItems

      // We initialize a random number (from 1 to 3)
      const rnd = Math.floor(Math.random() * 3) + 1

      // We initialize a string
      let placeholder = ''

      // We add all the questions to our List several times
      for (let i = 0; i < rnd; i++) {
        // We initialize a 2nd random number
        const rnd2 = Math.floor(Math.random() * items.length)

        // We update the placeholder
        placeholder += items[rnd2]

        // Add '...' or ', ' depending on whether we add something after or not
        if (i === rnd - 1) {
          placeholder += '...'
        } else {
          placeholder += ', '
        }

        // We remove the used string from the list
        items.splice(rnd2, 1)
      }

      // We return the placeholder
      return placeholder
    }
  },

  method: {
    /** Method to Log in (connect to account) */
    logIn () {
    },

    /** Method to Sign in (create new account) */
    signUp () {
    }
  }
}
</script>
