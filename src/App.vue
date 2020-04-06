<template>
  <v-app>
    <AppBar></AppBar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/nav/AppBar";
export default {
  name: 'App',
  components: {AppBar},
};
</script>
