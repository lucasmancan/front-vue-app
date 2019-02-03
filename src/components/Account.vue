<template>
  <div class="account">
   <input type="text" v-model="user.firstName">
   
   <input type="text" v-model="user.lastName">
   
   <input type="text" v-model="user.age">
   
   <input type="text" v-model="user.age">
     <select class="form-control" id="exampleFormControlSelect1" required>
    <option value="">Select your gender</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
      <option value="O">Others</option>
    </select>
   <input type="date" v-model="user.age">


  </div>
</template>

<script>
export default {
  name: 'Account',
  data: function(){
    return {
      user: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
