<template>
    <li>
        <img v-bind:class="!item.isDone ? 'black-img' : ''" v-bind:src="this.doneImgSrc" v-bind:id="item.id" v-on:click="updateItemStatus">
        <img v-bind:src="this.deleteImgSrc" alt="Delete Item" v-bind:id="item.id" v-on:click="deleteItem">
        {{ item.name }}
    </li>
</template>

<script>
    import axios from "axios"
    import { mapMutations } from 'vuex'

    export default {
        name: "Item",
        props: ['item'],
        data: function () {
            return {
                // image source
                doneImgSrc: "https://icon-library.com/images/all-done-icon/all-done-icon-7.jpg",
                deleteImgSrc: "https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png",
            }
        },
        methods: {
             // map mutation method of vuex store
            ...mapMutations(["removeItem", "updateItem"]),
            // update Item
            updateItemStatus: function() {
                axios.patch(process.env.VUE_APP_API_URL + '/item/' + this.item._id, {isDone: !this.item.isDone}).then((res) => {
                    alert("Item updated")
                    const item = res.data
                    // update vuex store
                    this.updateItem(item)
                    if (this.filterMode !== "all") {
                        // remove from vuex store
                        this.removeItem(this.item)
                    }
                })
            },
            // delete Item
            deleteItem: function() {
                 axios.delete(process.env.VUE_APP_API_URL + '/item/' + this.item._id).then(() => {
                    alert("Item removed")
                    // remove from vuex store
                    this.removeItem(this.item)
                })
            }
        },
        computed: {
            // map vuex store state to component props
            filterMode () {
                return this.$store.state.filterMode
            },
        },
    }
</script>

<style scoped>
    img {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    /* make image as black and white */
    .black-img {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
</style>