<template>
  <div id="app">
    <AddItemForm/>
    <ItemList/>
  </div>
</template>

<script>
import AddItemForm from './components/AddItemForm'
import ItemList from './components/ItemList'

export default {
  name: 'App',
  components: {
    AddItemForm,
    ItemList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding-left: 40%;
}
img {
  width: 50px;
  height: 50px;
}
</style>
