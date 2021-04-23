<template>
    <div>
        <span v-for="option in this.radioOptions" v-bind:key="option.key">
            <input type="radio" 
            :id="option.key" 
            name="filter" 
            :value="option.key" 
            :checked="option.key === 'all' ? true: false" 
            v-on:click="doFilter(option.key)">
            <label :for="option.key">{{ option.text }}</label>
        </span>

        <h2>To do list:</h2>
        <div class="scroll-able">
            <table>
                <col width="50px" />
                <col width="500px" />
                <col width="100px" />
                <tr>
                    <th>Action</th>
                    <th>Items</th>
                    <th>Expired in</th>
                </tr>
                <Item v-for="item in todoList" v-bind:item="item" v-bind:key="item.id" />
            </table>
        </div>
    </div>
</template>

<script>
import Item from './Item'
import axios from 'axios'
import { mapMutations } from 'vuex'
import { calculateExpiredTime } from '../helper/DateTimeHelper'
export default {
    name: "ItemList",
    components: {
        Item
    },
    mounted: function () {
        // get Item list
        getToDoList().then(res => {
            // map to store
            this.$store.state.todoList = calculateExpiredTime(res.data)
        })
    },
    computed: {
        // map vuex store state to component props
        todoList () {
            return this.$store.state.todoList
        },
    },

    data: function() {
        return {
            // setup radio button options
            radioOptions: [
                {
                    key: "all",
                    text: "All"
                },
                {
                    key: "done",
                    text: "Done"
                },
                {
                    key: "notyet",
                    text: "Not Yet"
                },
            ]
        }
    },
    methods: {
         // map mutation method of vuex store
        ...mapMutations(["updateFilterMode"]),
        doFilter: function(key) {
            this.updateFilterMode(key)
            // get list with filter
            getToDoList(key).then(res => {
            // map to store
            this.$store.state.todoList = calculateExpiredTime(res.data)
        })
        }
    }
}

function getToDoList(filter) {
    let status = ""
    if (filter && (filter === "done" || filter === "notyet")) {
        status = "/?status=" + filter
    }
    return axios.get(process.env.VUE_APP_API_URL + '/item' + status)
}


</script>

<style>
    .scroll-able {
        width: 400px; height: 450px; overflow: auto;

    }
    table {
        border-collapse: collapse;
        table-layout:fixed;
    }
    td {
        overflow: hidden;
    }
    table, th, td {
        border: solid 1px;
    }
</style>