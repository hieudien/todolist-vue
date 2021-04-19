<template>
    <div>
        <h1>To do:</h1>
        <div>
            <ul id="list">
                <Item v-for="item in todoList" v-bind:item="item" v-bind:key="item.id" />
            </ul>
        </div>
        <h1>Done:</h1>
        <div>
            <ul id="done-list">
                <Item v-for="item in doneList" v-bind:item="item" v-bind:key="item.id" />
            </ul>
        </div>
    </div>
</template>

<script>
import Item from "./Item"
import axios from "axios"

export default {
    name: "ItemList",
    components: {
        Item
    },
    mounted: function () {
        // get Item list
        axios.get(process.env.VUE_APP_API_URL + '/item').then(res => {
            // classify item into 2 list by isDone (true/false)
            this.$store.state.doneList = res.data.filter(item => item.isDone)
            this.$store.state.todoList = res.data.filter(item => !item.isDone)
        })
    },
    computed: {
        // map vuex store state to component props
        todoList () {
            return this.$store.state.todoList
        },
        doneList () {
            return this.$store.state.doneList
        },
    }
}
</script>

<style scoped>
    ul {
        list-style-type: none
    }
</style>