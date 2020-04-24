<template>
    <v-container v-if="post">
        <v-row no-gutters>
            <v-col>
                <a :href="post.url" target="_blank" style="text-decoration: none">
                    <h2>{{post.title}}</h2>
                </a>
            </v-col>

        </v-row>
        <v-row no-gutters>
            <v-col>
                {{post.score}} points, by
                <router-link to="/">{{post.by}}</router-link>
                ,{{post.time}} | hide | {{post.descendants}} comments
            </v-col>
        </v-row>
        <v-row no-gutters
               v-for="(comment, i) in post.kids"
               :key="i"
        >
            <v-col>
                <Comment :id="comment"
                         :depth="1"
                ></Comment>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Comment from "@/components/Comment";
    import moment from 'moment'

    export default {
        name: "PostView",
        components: {Comment},
        props: {
            postId: Number,
        },
        data: () => ({
            post: null,
        }),
        methods: {
            getPost() {
                this.axios
                  .get(`https://hacker-news.firebaseio.com/v0/item/${this.postId}.json`)
                  .then(response => {
                      this.post = response.data
                      this.post.time = moment(this.post.time, 'X').fromNow();
                  })
            },
        },
        mounted() {
            this.getPost()
        },
        watch: {
            postId: function (oldVal, newVal) {
                if(oldVal !== newVal) {
                    this.getPost()
                }
            }
        }
    }
</script>

<style scoped>
</style>
