<template>
    <div class="form">
        <span v-if="error" style="color: red">{{ error.message }}</span><br/><br/>
        <input type="text" v-model="itemName" required placeholder="Enter Text"><br/><br/>
        <input type="datetime-local" v-model="expiredDateTime" min="2021-04-24T0:42"><br/><br/>
        <input type="file" ref="imageInput" accept="image/*" v-on:change="onFileSelected"><br/><br/>
        <button v-on:click="addNewItem">Add Item</button><br/><br/>
        <img v-if="imgUrl" :src="imgUrl" alt=""><br/>
    </div>
</template>
    
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import moment from 'moment'
import { calculateExpiredTime } from '../helper/DateTimeHelper'

export default {
    name: 'AddItemForm',
    data: function () {
        return {
            itemName: null,
            itemImg: null,
            imgUrl: null,
            expiredDateTime: null,
            error: null,
        }
    },
    methods: {
        // map mutation method of vuex store
        ...mapMutations(["addItem"]),
        // add new Item to list and vuex store
        addNewItem: function () {
            if(this.itemName) {
                this.error = null
                const formData = new FormData()
                formData.append("name", this.itemName)
                if(this.itemImg) {
                    formData.append("image", this.itemImg, this.itemName.name)
                }
                if (this.expiredDateTime) {
                    if (moment(this.expiredDateTime).isAfter(moment())) {
                        formData.append("expiredDateTime", this.expiredDateTime)
                    } else {
                        this.error = { message: "Invalid datetime, please pick time in future" }
                        return
                    }
                }
                axios.post(process.env.VUE_APP_API_URL + '/item', formData).then((res) => {
                    if (this.filterMode !== "done") {
                        // add to vuex store
                        this.addItem(calculateExpiredTime(res.data))
                    }
                })
            } else {
                this.error = { message: "Please enter some text" }
            }
            // reset form
            this.itemName = null
            this.itemImg = null
            this.imgUrl = null
            this.$refs.imageInput.value = null
        },
        onFileSelected: function (event) {
            this.itemImg = event?.target?.files[0]
            this.imgUrl = URL.createObjectURL(this.itemImg)
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
    .form {
        margin: 2em 10em 2em 10em;
        padding: 1em 1em 1em 1em;
        height: 80%;
        border: solid 1px;
    }
    img {
        width: 15em;
        height: 15em;
        border: solid 1px;
    }
</style>