<template>
    <div>
        <input type="text" id="name" v-model="itemName" required>
        <button v-on:click="addNewItem">Add Item</button>
    </div>
</template>
    
<script>
import axios from "axios"
import { mapMutations } from 'vuex'

export default {
    name: 'AddItemForm',
    data: function () {
        return {
            itemName: null,
        }
    },
    methods: {
        // map mutation method of vuex store
        ...mapMutations(["addItem"]),
        // add new Item to list and vuex store
        addNewItem: function () {
            if(this.itemName) {
                axios.post(process.env.VUE_APP_API_URL + '/item', {name: this.itemName}).then((res) => {
                    alert("Item created")
                    if (this.filterMode !== "done") {
                        // add to vuex store
                        this.addItem(res.data)
                    }
                })
            }
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