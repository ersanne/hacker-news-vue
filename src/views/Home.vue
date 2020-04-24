<template>
    <div class="home">
        <splitpanes class="default-theme" style="height: 100%">
            <pane size="35" min-size="20">
                <v-item-group v-model="selectedIdx"
                >
                    <v-row v-for="(post, i) in posts" :key="i" @click="viewStory">
                        <PostListCard :post-id="post"></PostListCard>
                    </v-row>
                </v-item-group>
            </pane>
            <pane size="65" min-size="30">
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

<style>
    /* Pane background */
    .splitpanes.default-theme .splitpanes__pane {
        background-color: inherit;
    }

    /* Main splitter */
    .splitpanes.default-theme .splitpanes__splitter {
        background-color: #373737;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        -ms-flex-negative: 0;
        flex-shrink: 0
    }

    /* Vertical Splitter*/
    .default-theme.splitpanes--vertical>.splitpanes__splitter,
    .default-theme .splitpanes--vertical>.splitpanes__splitter {
        width: 7px;
        border-left: 1px solid #373737;
        margin-left: -1px
    }

    /* Horizontal Splitter */
    .default-theme.splitpanes--horizontal>.splitpanes__splitter,
    .default-theme .splitpanes--horizontal>.splitpanes__splitter {
        height: 7px;
        border-top: 1px solid #ee00b2;
        margin-top: -1px
    }
</style>
