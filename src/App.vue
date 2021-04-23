<template>
  <div id="app" class="row">
    <div class="column"><AddItemForm/></div>
    <div class="column"><ItemList/></div>
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
}
img {
  width: 50px;
  height: 50px;
}
.row {
  display: flex;
}

.column {
  flex: 50%;
  border: solid 2px;
  padding-left: 2em;
  padding-right: 2em;
}
</style>
