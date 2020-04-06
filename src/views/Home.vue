<template>
    <div class="home">
        <v-container>
            <v-row v-for="(post, i) in posts" :key="i">
                <v-col>
                    <PostListCard :post-id="post"></PostListCard>
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
          this.posts = response.data.slice(0, this.perPage-1)
        })
    }
  }
</script>
