<template>

        <v-card v-if="post" style="min-width: 100%">
            <v-row>
                <v-col cols="1">
                    <v-row>
                        <v-col offset-md="2">
                            <v-icon>mdi-arrow-up</v-icon>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col offset-md="2">
                            {{post.score}}
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col offset-md="2">
                            <v-icon>mdi-arrow-down</v-icon>
                        </v-col>
                    </v-row>

                </v-col>
                <v-col cols="11">
                    <v-card-title>
                        <router-link :to="`/item?id=${postId}`" style="text-decoration: none">
                        {{post.title}}
                        </router-link>
                    </v-card-title>
                    <v-card-subtitle>
                        By
                        <router-link to="/">{{post.by}}</router-link>
                        ,{{post.time}} ago | hide | {{post.descendants}} comments
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </v-card>
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

</style>
