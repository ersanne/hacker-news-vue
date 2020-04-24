<template>
    <v-item v-if="post" v-slot:default="{ active, toggle }">
        <v-card class="preview-card"
                :color="active ? 'grey darken-4' : ''"
                :active="active"
                @click="toggle">
            <v-card-title>
                <a :href="post.url" target="_blank" style="text-decoration: none">
                    <h2>{{post.title}}</h2>
                </a>
            </v-card-title>
            <v-card-subtitle>
                {{post.score}} points, by
                <router-link to="/">{{post.by}}</router-link>
                ,{{post.time}} ago | hide | {{post.descendants}} comments
            </v-card-subtitle>
        </v-card>
    </v-item>
</template>

<script>
  export default {
    name: "PostListCard",
    props: {
      postId: {
        type: Number,
        required: true
      },
    },
    data: () => ({
      post: null,
    }),
    mounted() {
      this.axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${this.postId}.json`)
        .then(response => {
          this.post = response.data
        })
    }
  }
</script>

<style scoped>
    .preview-card {
        min-width: 100%;
    }
</style>
