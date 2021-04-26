<template>
    <div class="list-container">
        
        <div class="row">
            <div class="col"><h2>To do list:</h2></div>
            <div class="col radio-area">
                <span v-for="option in this.radioOptions" v-bind:key="option.key">
                    <input type="radio" 
                    :id="option.key" 
                    name="filter" 
                    :value="option.key" 
                    :checked="option.key === 'all' ? true: false" 
                    v-on:click="doFilter(option.key)">
                    <label :for="option.key">{{ option.text }}</label>
                </span>
            </div>
        </div>
        
        <div class="scroll-able">
            <table>
                <col width="50px" />
                <col width="300px" />
                <col width="200px" />
                <tr>
                    <th>Action</th>
                    <th>Items</th>
                    <th>Expired in</th>
                </tr>
                <Item v-for="item in todoList" v-bind:item="item" v-bind:key="item.id" />
            </table>
        </div>
        <div class="func-area">
            <a :href="this.API_URL + '/item/export'"><button>Export CSV</button></a>
            <input type="file" id="upload-csv" hidden accept=".csv" @change="csvSelected">
            <button for="upload-csv" onclick="document.getElementById('upload-csv').click()">Import</button>
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
            API_URL: process.env.VUE_APP_API_URL,
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
        },
        csvSelected: function(event) {
            const file = event?.target?.files[0]
            const formData = new FormData()
            formData.append("csv", file)
            axios.post(process.env.VUE_APP_API_URL + '/item/import', formData).then(() => {
                getToDoList().then(res => {
                    // map to store
                    this.$store.state.todoList = calculateExpiredTime(res.data)
                })
                document.getElementById('all').click()
            }).catch(err => {
                alert(err.message)
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
    .catch(err => {
        alert(err.message)
    })
}


</script>

<style>
    .list-container {
        padding: 2em 2em 2em 2em;
    }
    .scroll-able {
        height: 400px;
        overflow: auto;
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
    .radio-area {
        padding: 1.5em 1em 1em 15em;
    }
    .func-area {
        padding-top: 1em;
    }
    .func-area button:last-child {
        margin-left: 1em;
    }
</style>