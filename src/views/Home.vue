<template>
    <div class="home">
        <v-container fluid>
            <v-row>
                <v-col cols="5" class="py-0">
                    <v-item-group active-class="primary"
                                  v-model="selected"
                    >
                        <v-row v-for="(post, i) in posts" :key="i">
                            <PostListCard :post-id="post"></PostListCard>
                        </v-row>
                    </v-item-group>
                </v-col>
                <v-col cols="7" class="primary">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
  import PostListCard from "@/components/PostListCard";

  export default {
    name: 'Home',
    components: {PostListCard},
    data: () => ({
      perPage: 30,
      posts: null,
    }),
    mounted() {
      this.axios
        .get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => {
          this.posts = response.data.slice(0, this.perPage - 1)
        })
    }
  }
</script>
