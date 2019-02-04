<template>
  <div class="account">
   <input type="text" v-model="user.firstName">
   <input type="text" v-model="user.lastName">
   <input type="text" v-model="user.email">
   <input type="text" v-model="user.age">
   <input type="text" v-model="user.birthDate">
   <textarea type="date" v-model="user.bio"/>
    <select class="form-control" v-model ="user.gender" id="exampleFormControlSelect1" required>
    <option value="">Select your gender</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
      <option value="O">Others</option>
    </select>

<div class="phones">
  <div class="div" v-for="(phone, key) in user.phones" v-bind:key="phone.id">
    <input v-model="phone.ddi" type="text">
    <input v-model="phone.ddd" type="text">
    <input v-model="phone.phone" type="text">
 
  <button v-on:click.prevent = "removePhone(key)">Delete</button>
  </div>
  <button v-on:click.prevent = "addPhone">Add</button>
</div>

<div class="addresses">
  <div class="div" v-for="(address, key) in user.addresses" v-bind:key="address.id">
    <input v-model="address.street" type="text">
    <input v-model="address.number" type="text">
    <input v-model="address.neighborhood" type="text">
    <select class="form-control" v-model ="address.state" id="contrys" required>
      <option value="">Select your country</option>
      <option value="M" v-for="country in countries" v-bind:key="country.id">{{name}}</option>
    </select>
    <select class="form-control" v-model ="address.contry" id="contrys" required>
      <option value="">Select your country</option>
      <option value="M" v-for="country in countries" v-bind:key="country.id">{{name}}</option>
    </select>
    
  <button v-on:click.prevent = "removeAddress(key)">Delete</button>
  </div>
  <button v-on:click.prevent = "addAddress">Add</button>
</div>

  </div>
</template>

<script>

import userService from '../services/user-service';
export default {
  name: 'Account',
  data: function(){
    return {
      user: {},
      states:[],
      countries:[]
    }
  },
  methods: {
    saveUser: function() {
      userService.save().then(res => {
          console.log(res);
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
    }, getCountries: function() {
      userService.getCountries().then(res => {
          console.log(res),
          this.countries = res.data;
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
    }, getStates: function() {
      userService.getStates().then(res => {
          console.log(res),
          this.states = res.data;
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
    }, removeAddress: function(index) {
      userService.removeAddress(index).then(res => {
          console.log(res),
          this.getUser(this.user.id);
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
    }, removePhone: function(index) {
      userService.removePhone(index).then(res => {
          console.log(res),
          this.getUser(this.user.id);
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
    }, getUser: function(index) {
      userService.get(index).then(res => {
          console.log(res),
          this.getUser(this.user.id);
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
    }
  },
 created: function(){
    userService.get(index).then(res => {
          console.log(res),
          this.getUser(this.user.id);
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
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
