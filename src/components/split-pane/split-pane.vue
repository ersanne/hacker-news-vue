<template>
    <div :class="`split-pane ${dragging ? 'is-dragging' : ''}`"
         @mousemove="dragMove"
         @mouseup="dragEnd"
         @mouseleave="dragEnd">
        <div class="split-pane-item"
             :style="'width: ' + splitLeft">
            <slot name="left"></slot>
        </div>
        <div class="split-pane-gutter"
             @mousedown="dragStart">
        </div>
        <div class="split-pane-item"
             :style="'width: ' + splitRight">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'split-pane',
        data: function data() {
            return {
                gutter: 11,
                split: 50,
                dragging: false
            };
        },
        computed: {
            splitLeft: function splitLeft() {
                return 'calc('.concat(this.split, '% - ').concat(this.gutter, 'px)');
            },
            splitRight: function splitRight() {
                return 'calc('
                  .concat(100 - this.split, '% - ')
                  .concat(this.gutter, 'px)');
            }
        },
        methods: {
            dragStart: function dragStart(e) {
                this.dragging = true;
                this.startX = e.pageX;
                this.startSplit = this.split;
            },
            dragMove: function dragMove(e) {
                if (this.dragging) {
                    var dx = e.pageX - this.startX;
                    var totalWidth = this.$el.offsetWidth;
                    this.split = this.startSplit + ~~((dx / totalWidth) * 100);
                }
            },
            dragEnd: function dragEnd() {
                this.dragging = false;
            }
        }
    }
</script>

<style scoped>
    .split-pane {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .split-pane-item,
    .split-pane-gutter {
        height: 100%;
    }

    .split-pane-gutter {
        background: #464646;
        opacity: .2;
        z-index: 1;
        box-sizing: border-box;
        background-clip: padding-box;
        width: 22px;
        margin: 0 -5px;
        border-left: 5px solid rgba(255, 255, 255, 0);
        border-right: 5px solid rgba(255, 255, 255, 0);
        cursor: col-resize;
    }

    .split-pane-gutter:hover,
    .split-pane-gutter:focus {
        border-left: 5px solid rgba(20, 20, 20, 0.5);
        border-right: 5px solid rgba(25, 25, 25, 0.5);
        transition: all 2s ease;
    }

    .is-dragging {
        cursor: col-resize;
    }
</style>
