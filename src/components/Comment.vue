<template>
    <div v-if="comment">
        {{comment.by}}
        2 hours ago {{comment.time}}
        <a @click="toggleComment">
            [{{toggleText}}]
        </a>
        <div v-if="!hidden">
            <p class="pl-2 mb-0" v-html="comment.text"></p>
            <a class="pb-2">reply</a>
            <Comment v-for="(comment, i) in comment.kids"
                     :key="i" :id="comment"
                     :style="'padding-left:' + 5*depth + '%'"
                     :depth="depth + 1"
            ></Comment>
        </div>
    </div>
</template>

<script>
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
            toggleText: function() {
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
                  })
            }
        },
        mounted() {
            this.getComment()
        },
    }
</script>

<style scoped>

</style>
