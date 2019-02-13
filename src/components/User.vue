<template>
  <div class="md-layout md-alignment-center-center">
    <form
      novalidate
      class="md-layout-item md-large-size-60 md-small-size-100"
      @submit.prevent="validateUser"
    >
      <div class="md-layout md-alignment-center-center">
        <md-avatar class="md-large md-avatar-icon md-primary">{{user.firstName}}</md-avatar>
      </div>

      <div class="md-layout-item">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('firstName')">
              <label for="first-name">First Name</label>
              <md-input
                name="first-name"
                id="first-name"
                v-model="user.firstName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.user.firstName.required">The first name is required</span>
              <span class="md-error" v-else-if="!$v.user.firstName.minlength">Invalid first name</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">Last Name</label>
              <md-input
                name="last-name"
                id="last-name"
                v-model="user.lastName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.user.lastName.required">The last name is required</span>
              <span class="md-error" v-else-if="!$v.user.lastName.minlength">Invalid last name</span>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('gender')">
              <label for="gender">Gender</label>
              <md-select
                name="gender"
                id="gender"
                v-model="user.gender"
                md-dense
                :disabled="sending"
              >
                <md-option></md-option>
                <md-option value="M">Male</md-option>
                <md-option value="F">Female</md-option>
                <md-option value="O">Others</md-option>
              </md-select>
              <span class="md-error">The gender is required</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-datepicker required v-model="user.birthDate" name="birthDate"/>
            <span class="md-error" v-if="!$v.user.birthDate.required">The Bith Date is required</span>
          </div>
        </div>

        <md-field :class="getValidationClass('bio')">
          <label>About</label>
          <md-textarea v-model="user.bio" md-counter="255"></md-textarea>
        </md-field>

        <md-subheader>Your Address</md-subheader>
        <md-divider></md-divider>
        <div class="md-layout-item md-size-100" v-if="user.address">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('country')">
                <label for="country">Country</label>
                <md-select
                  v-model="user.address.city.state.country_id"
                  name="name"
                  id="id"
                  placeholder="Country"
                  @md-selected="getStatesByCountry()"
                >
                  <md-option
                    v-for="country in countries"
                    v-bind:key="country.id"
                    v-bind:value="country.id"
                  >{{country.name}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('state')">
                <label for="state">State</label>
                <md-select  @md-selected="getCitiesByState()"
                  v-model="user.address.city.state_id"
                  name="name"
                  id="id"
                  placeholder="State"
                >
                  <md-option
                    v-for="state in states"
                    v-bind:key="state.id"
                    v-bind:value="state.id"
                  >{{state.name}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('city')">
              <label for="city">City</label>
              <md-select
                v-model="user.address.city_id"
                name="name"
                id="id"
                placeholder="City"
              >
                <md-option
                  v-for="city in cities"
                  v-bind:key="city.id"
                  v-bind:value="city.id"
                >{{city.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field :class="getValidationClass('street')">
              <label for="last-name">Street</label>
              <md-input
                name="Street"
                id="Street"
                autocomplete="family-name"
                v-model="user.address.street"
                :disabled="sending"
              />
            </md-field>
          </div>
          <div class="md-layout md-gutter md-flex-100">
            <div class="md-layout-item md-small-size-100 md-flex-33">
              <md-field :class="getValidationClass('number')">
                <label for="number">Number</label>
                <md-input
                  name="number"
                  id="number"
                  autocomplete="family-name"
                  v-model="user.address.number"
                  :disabled="sending"
                />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('zipCode')">
                <label for="zipCode">Zip Code</label>
                <md-input
                  name="zipCode"
                  id="zipCode"
                  autocomplete="family-name"
                  v-model="user.address.zipCode"
                  :disabled="sending"
                />
              </md-field>
            </div>
          </div>
        </div>
      </div>

      <div class="md-layout-item">
        <md-subheader>Your Phones</md-subheader>
        <md-divider></md-divider>
        <div v-if="!user.phones || !user.phones.length > 0">
          <md-subheader>You have no contact information, please add a phone number by clicking on phone icon.</md-subheader>
        </div>

        <md-list v-if="user.phones.length > 0">
          <md-list-item v-for="(phone, index) in user.phones" v-bind:key="index">
            <md-icon>phone</md-icon>
            <span class="md-list-item-text">+{{phone.ddi}} ({{phone.ddd}}) {{phone.phone}}</span>
            <md-button v-on:click="removePhone(phone, index)" class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button v-on:click="editPhone(phone,index)" class="md-icon-button">
              <md-icon>edit</md-icon>
            </md-button>
          </md-list-item>
        </md-list>

        <!-- <div v-if="user.phones.length > 0">
  <div v-for="phone in user.phones" v-bind:key="phone">
    <div class="md-layout md-gutter">
    <div class="md-layout-item">{{phone.ddi}}</div>
    <div class="md-layout-item">{{phone.ddd}}</div>
    <div class="md-layout-item">{{phone.phone}}</div>
       <md-button  class="md-icon-button">
        <md-icon>delete</md-icon>
      </md-button>
             <md-button  class="md-icon-button">
        <md-icon>edit</md-icon>
      </md-button>
    </div>
  </div>
        </div>-->
      </div>

      <!-- <md-button type="submit" class="md-primary" :disabled="sending">Save</md-button> -->
      <!-- <md-button type="submit" class="md-fab md-fab-top-right md-primary">
        <md-icon>save</md-icon>
      </md-button>-->
      <md-progress-bar md-mode="indeterminate" v-if="sending"/>
      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      <md-snackbar :md-active.sync="phoneSaved">The phone was saved with success!</md-snackbar>
    </form>

    <div>
      <md-dialog :md-active.sync="active">
        <md-dialog-title>Phone</md-dialog-title>
        <div class="md-layout md-alignment-center-center">
          <form novalidate @submit.prevent="validatePhone" class="md-layout-item md-size-80">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('ddi')">
                <label for="ddi">DDI</label>
                <md-input name="ddi" id="ddi" v-model="phone.ddi" :disabled="sending"/>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field :class="getValidationClass('ddd')">
                <label for="ddd">DDD</label>
                <md-input name="ddd" id="ddd" v-model="phone.ddd" :disabled="sending"/>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field :class="getValidationClass('phone')">
                <label for="phone">Phone Number</label>
                <md-input name="phone" id="phone" v-model="phone.phone" :disabled="sending"/>
              </md-field>
            </div>

            <md-dialog-actions class="md-layout md-alignment-center-center">
              <md-button class="md-button md-accent" @click="manageModal">
                <md-icon>clear</md-icon>
              </md-button>
              <md-button type="submit" class="md-button md-primary">
                <md-icon>save</md-icon>
              </md-button>
            </md-dialog-actions>
          </form>
        </div>
      </md-dialog>

      <!-- <md-button class="md-fab md-fab-bottom-right md-accent md-raised" @click="manageModal">
        <md-icon>phone</md-icon>
      </md-button>-->
      <fab
        :position="position"
        :bg-color="bgColor"
        :actions="fabActions"
        @manageModal="manageModal"
        @saveUser="validateUser"
      ></fab>
    </div>
  </div>
</template>

<script>
import userService from "../services/user-service";
console.log("Import Statement: ", userService);
import fab from "vue-fab";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  components: {
    fab
  },
  name: "userValidation",
  mixins: [validationMixin],
  data: function() {
    return {
      user: {
        address: {},
        phones: []
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      active: false,
      phone: {},
      countries: [],
      states: [],
      cities: [],
      phoneSaved: false,
      bgColor: "#7000e8",
      position: "bottom-rigth",
      fabActions: [
        {
          name: "manageModal",
          icon: "phone"
        },
        {
          name: "saveUser",
          icon: "how_to_reg"
        }
      ]
    };
  },
  validations: {
    phone: {
      ddd: {
        required,
        maxLength: maxLength(2)
      },
      ddi: {
        required,
        maxLength: maxLength(2)
      },
      phone: {
        required
      }
    },
    user: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      birthDate: {
        required
      },
      gender: {
        required
      },
      bio: {
        minLength: minLength(3),
        maxLength: maxLength(255)
      },
      gender: {
        required
      },
      country: {
        required
      },
      state: {
        required
      },
      street: {
        required
      },
      city: {
        required
      },
      number: {
        required
      },
      zipCode: {
        required
      }
    }
  },
  methods: {
    loadUser() {
      userService.get(1).then(res => {
        console.log("Getting User Information: ", res);
        this.user = res.data;
      });
    },
    getCountries() {
      this.userService.getCountries().then(res => {
        console.log("Getting Countries: ", res);
        this.countries = res.data;
      });
    },
    getStatesByCountry() {
      let self = this;
      if (this.user.address && this.user.address.city && this.user.address.city.state.country_id) {
        userService
          .getStatesByCountry(this.user.address.city.state.country_id)
          .then(function(res) {
            self.states.push(res.data);
          });
      }
    },
    getCitiesByState() {
      let self = this;
      if (this.user.address && this.user.address.city && this.user.address.city.state_id) {
        userService
          .getCitiesByState(this.user.address.city.state_id)
          .then(function(res) {
            self.cities.push(res.data);
          });
      }
    },
    removePhone(phone, index) {
      console.log("Phone: ", phone, "Index:", index);
      if (phone.id) {
        this.userService.removePhone(phone.id);
      }

      this.user.phones.splice(index, 1);
      this.phoneSaved = true;
    },
    editPhone(phone, index) {
      console.log("Phone: ", phone, "Index:", index);
      this.phone = phone;
      this.manageModal();
      this.phoneSaved = true;
    },
    addPhonetoUser() {
      if (this.user.phones.filter(p => p.phone === this.phone.phone)[0]) {
        this.user.phones.filter(p => p === this.phone)[0] = this.phone;
      } else {
        this.user.phones.push(this.phone);
      }
      this.phone = {};
      this.manageModal();
      this.phoneSaved = true;
    },
    manageModal() {
      this.active = !this.active;
    },
    getValidationClass(fieldName) {
      let field = null;

      if (this.$v.user[fieldName]) {
        field = this.$v.user[fieldName];
      } else {
        field = this.$v.phone[fieldName];
      }

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearuser() {
      this.$v.$reset();
      this.user.firstName = null;
      this.user.lastName = null;
      this.user.birthDate = null;
      this.user.gender = null;
      this.user.address.country = null;
      this.user.address.state = null;
      this.user.address.city = null;
      this.user.address.street = null;
      this.user.address.number = null;
      this.user.address.zipCode = null;
    },
    saveUser() {
      this.sending = true;
      console.log(this.user);
      this.userService
        .update(this.user)
        .then(() => {
          this.lastUser = `${this.user.firstName} ${this.user.lastName}`;
          this.userSaved = true;
          this.sending = false;
        })
        .catch(error => {
          console.log(error);
          this.userSaved = false;
          this.sending = false;
        });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    validatePhone() {
      console.log("Validator: ", this.$v);
      this.$v.phone.$touch();

      if (!this.$v.phone.$invalid) {
        this.addPhonetoUser();
      }
    }
  },
  mounted: function() {
    userService.getCountries().then(res => {
      console.log("Getting Countries: ", res);
      this.countries = res.data;
    });

    this.getStatesByCountry();
    this.getCitiesByState();

    userService.get(1).then(res => {
      console.log(res.data);
      if (!res.data.address) {
        res.data.address = {};
        res.data.address.city = {};
        res.data.address.city.state = {};
      }
      this.user = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-dialog {
  max-width: 768px !important;
  .md-input {
    padding: 10px;
  }
}
</style>