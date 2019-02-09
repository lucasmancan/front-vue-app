<template>
 <div class="container">
    <div class="row">
        <!-- <div class="col-sm-6 col-md-4 col-md-offset-4"> -->
            <h1 class="text-center login-title">Create an Account</h1>
            <div class="account-wall">
                <form  class="form-signin" v-on:submit.prevent="register">
                <input type="text" maxlength="255" class="form-control" v-model="user.firstName" placeholder="First Name" required autofocus>
                <input type="text" maxlength="255" class="form-control" v-model="user.lastName" placeholder="Last Name" required autofocus>
                <input type="email" class="form-control" placeholder="Email" v-model="user.email" required autofocus>
                <input type="password" name="password" v-model="user.password" class="form-control" placeholder="Password" required>
                <input type="password" v-model="passwordConfirmation" v-on:blur="validate()" name="confirmationPassword" class="form-control" placeholder="Confirm your password" required> 
                <div v-if="passwordError" class="alert alert-danger" role="alert">
                <strong>Oops..!</strong> The password confirmation didn't match.
                </div>
                <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
                     <div v-for="error in errors" v-bind:key="error">
                        {{error}}
                    </div>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    Sing Up</button>
                </form> 
            </div>
            <router-link to="/"><a class="new-account">I've already an account</a></router-link>
        </div>
    </div>
<!-- </div> -->
</template>

<script>

import User from '../models/user';
import userService from '../services/user-service';
import Vue from 'vue';
import formLoading from 'vue2-form-loading';
Vue.use(formLoading);

export default {
  name: 'register',
  props: {
    msg: String,
    hello: String
  }, data: function(){
      return {
          user: {
              firstName: null,
              lastName: null,
              email:null,
              password: null
          },
          errors:[],
          loading:false,
          passwordConfirmation: null,
          passwordError: false
      };
  },
  methods:{
    validate(){

        console.log(this.user.password, this.passwordConfirmation)
        return this.user.password === this.passwordConfirmation;
    },
  register(){
      if(!this.validate()){
          this.passwordError = true;
          return;
      }
     this.passwordError = false;
        console.log(this.user);
      userService.create(this.user).then(res => {
          if(res.success){
            localStorage.setItem("user-token", res.data.token);
            this.$router.push('/account', res.data.user);
          }else{
              localStorage.removeItem("user-token");
          }


      }).catch(error => {
          this.errors.push(error);
          console.log("ERROR ", error)

      }) 
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signin
{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input, select
{
    margin-bottom: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
/* .form-signin input[type="password"]
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
} */
.account-wall
{
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title
{
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
.need-help
{
    margin-top: 10px;
}
.new-account
{
    display: block;
    margin-top: 10px;
}
</style>
