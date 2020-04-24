<template>
    <div class="home">
        <splitpanes class="default-theme" style="height: 100%">
            <pane size="70" min-size="20">
                <v-item-group active-class="primary"
                              v-model="selectedIdx"
                >
                    <v-row v-for="(post, i) in posts" :key="i" @click="viewStory">
                        <PostListCard :post-id="post"></PostListCard>
                    </v-row>
                </v-item-group>
            </pane>
            <pane size="30" min-size="30">
                <div v-if="selectedIdx !== -1">
                    <PostView :postId="selectedStory"></PostView>
                </div>
                <span v-else class="primary">
                    Select a story to see comments
                </span>
            </pane>
        </splitpanes>
    </div>
</template>

<script>
    import PostListCard from "@/components/PostListCard";
    import PostView from "@/components/PostView";
    import {Splitpanes, Pane} from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'

    export default {
        name: 'Home',
        components: {PostView, PostListCard, Splitpanes, Pane},
        data: () => ({
            perPage: 30,
            posts: null,
            selectedIdx: -1,
            selectedStory: null,
        }),
        computed: {
            selectedPost() {
                return this.selectedIdx === null ? -1 : this.posts[this.selectedIdx]
            }
        },
        methods: {
            viewStory() {
                this.selectedStory = this.posts[this.selectedIdx];
            },
        },
        mounted() {
            this.axios
              .get('https://hacker-news.firebaseio.com/v0/topstories.json')
              .then(response => {
                  this.posts = response.data.slice(0, this.perPage - 1)
              })
        }
    }
</script>

<style lang="scss">
    /*.dark-theme {*/
    /*    .default-theme .splitpanes--vertical > .splitpanes__splitter {*/
    /*        min-width: 7px;*/
    /*        background: red;*/
    /*    }*/
    /*}*/

</style>
