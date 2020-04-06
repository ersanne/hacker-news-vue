<template>
    <v-app-bar
            app
    >
        <div class="d-flex align-center">
            <router-link to="/" style="text-decoration: none !important;">
<!--                <v-img-->
<!--                        class="shrink"-->
<!--                        contain-->
<!--                        src="@/assets/logo/full-name/logo_transparent_cropped_small.png"-->
<!--                        transition="scale-transition"-->
<!--                        width="240"-->
<!--                />-->
                <h2 class="headline text-uppercase">Hacker News but better</h2>
            </router-link>
        </div>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="(link, i) in navLinks"
                   :key="i"
                   :to="link.path"
                   exact-active-class="primary--text"
                   text>
                {{ link.name }}
            </v-btn>
        </v-toolbar-items>
        <v-switch
                class="hidden-sm-and-down"
                v-model="$store.state.darkMode"
                label="Dark Mode"
                hide-details
                @click.stop.prevent="toggleTheme()"
        ></v-switch>
    </v-app-bar>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "AppBar",
        computed: mapState([
            'navLinks'
        ]),
        methods: {
            toggleTheme() {
                this.$store.dispatch('toggleDarkMode');
            }
        }
    }
</script>

<style scoped>
    .max-width-md {
        max-width: 1264px;
    }

    .v-btn {
        height: 100% !important;
    }
</style>
