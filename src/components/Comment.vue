<template>
    <v-card v-if="comment" :class="`mb-1 ${this.$vuetify.theme.dark ? 'dark-section' : 'light-section'}`">
        <v-card-title>
            <small>
                <a class="pr-1">{{comment.by}}</a>
                {{comment.time}}
                <a class="pl-1" @click="toggleComment">
                    [{{toggleText}}]
                </a>
            </small>
        </v-card-title>
        <div v-if="!hidden">
            <v-card-text>
                <p class="pl-2 mb-0" v-html="comment.text"></p>
            </v-card-text>
            <v-row no-gutters
                   v-for="(comment, i) in comment.kids"
                   :key="i"
            >
                <v-col>
                    <!-- :style="'padding-left:' + 5*depth + '%'" -->
                    <Comment :id="comment"
                             class="pl-3"
                             :depth="depth + 1"
                    ></Comment>
                </v-col>
            </v-row>
        </div>

    </v-card>

</template>

<script>
    import moment from "moment";

    export default {
        name: "Comment",
        props: {
            id: Number,
            depth: Number,
        },
        data: () => ({
            hidden: false,
            comment: null,
        }),
        computed: {
            toggleText: function () {
                // let children = this.comment.kids === undefined ? 1 : this.comments.kids.length
                // return this.hidden ? '+' + children : '-'
                return this.hidden ? '+' : '-'
            },
        },
        watch: {
            id: function () {
                this.getComment()
            }
        },
        methods: {
            toggleComment() {
                this.hidden = !this.hidden
            },
            getComment() {
                this.axios
                  .get(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json`)
                  .then(response => {
                      this.comment = response.data
                      this.comment.time = moment(this.comment.time, 'X').fromNow();
                  })
            }
        },
        mounted() {
            this.getComment()
        },
    }
</script>

<style scoped>
    /*.dark-section:nth-child(odd) {*/
    /*    background: #1e1e1e;*/
    /*}*/

    /*.light-section:nth-child(odd) {*/
    /*    !*background: #f6f8fb;*!*/
    /*    background: aquamarine;*/
    /*}*/

    /*.light-section:nth-child(even) {*/
    /*    !*background: #f6f8fb;*!*/
    /*    background: #ff90ee;*/
    /*}*/
</style>
