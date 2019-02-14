<template>
  <md-content>
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
              <!-- <span class="md-error" v-if="!$v.user.birthDate.required">The Bith Date is required</span> -->
            </div>
          </div>

          <md-field :class="getValidationClass('bio')">
            <label>About</label>
            <md-textarea v-model="user.bio" md-counter="255"></md-textarea>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-subheader class="md-primary">Your Phones</md-subheader>
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
              <md-button v-on:click="editPhone(phone)" class="md-icon-button">
                <md-icon>edit</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </div>
        <md-progress-bar md-mode="indeterminate" v-if="sending"/>
        <md-snackbar :md-active.sync="saved">{{message}}</md-snackbar>
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
                  <span class="md-error" v-if="!$v.phone.ddi.required">The ddi is required</span>
                  <span class="md-error" v-else-if="!$v.phone.ddi.maxlength">Invalid ddi</span>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field :class="getValidationClass('ddd')">
                  <label for="ddd">DDD</label>
                  <md-input name="ddd" id="ddd" v-model="phone.ddd" :disabled="sending"/>
                  <span class="md-error" v-if="!$v.phone.ddd.required">The ddd is required</span>
                  <span class="md-error" v-else-if="!$v.phone.ddd.maxlength">Invalid ddd</span>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field :class="getValidationClass('phone')">
                  <label for="phone">Phone Number</label>
                  <md-input name="phone" id="phone" v-model="phone.phone" :disabled="sending"/>
                  <span class="md-error" v-if="!$v.phone.phone.required">The ddd is required</span>
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

        <md-dialog class="md-dialog-address" :md-active.sync="activeAddress">
          <md-dialog-title>Address</md-dialog-title>
          <div class="md-layout md-alignment-center-center">
            <form>
              <div class="md-layout md-gutter">
                <md-field :class="getValidationClass('country')">
                  <label for="country">Country</label>
                  <md-select
                    v-model="address.city.state.country"
                    placeholder="Country"
                    @md-selected="getStatesByCountry(address.city.state.country)">
                    <md-option
                      v-for="country in countries"
                      v-bind:key="country.id"
                      v-bind:value="country.id"
                    >{{country.name}}</md-option>
                  </md-select>
                </md-field>
                <md-field :class="getValidationClass('state')">
                  <label for="state">State</label>
                  <md-select
                    v-model="address.city.state"
                    name="name"
                    id="id"
                    placeholder="State"
                    @md-selected="getCitiesByState(address.city.state)"
                  >
                    <md-option
                      v-for="state in states"
                      v-bind:key="state.id"
                      v-bind:value="state.id"
                    >{{state.name}}</md-option>
                  </md-select>
                </md-field>
              </div>
                <md-field :class="getValidationClass('city')">
                  <label for="city">City</label>
                  <md-select v-model="address.city" name="name" id="id" placeholder="City">
                    <md-option
                      v-for="city in cities"
                      v-bind:key="city.id"
                      v-bind:value="city.id"
                    >{{city.name}}</md-option>
                  </md-select>
                </md-field>

              <div class="md-layout md-gutter">
                <md-field :class="getValidationClass('number')">
                  <label for="number">Number</label>
                  <md-input
                    name="number"
                    id="number"
                    autocomplete="family-name"
                    v-model="address.number"
                    :disabled="sending"
                  />
                </md-field>
                <md-field :class="getValidationClass('zipCode')">
                  <label for="zipCode">Zip Code</label>
                  <md-input
                    name="zipCode"
                    id="zipCode"
                    autocomplete="family-name"
                    v-model="address.zipCode"
                    :disabled="sending"
                  />
                </md-field>
              </div>
              <div class="md-layout md-gutter">
                <md-field :class="getValidationClass('street')">
                  <label for="last-name">Street</label>
                  <md-input
                    name="Street"
                    id="Street"
                    autocomplete="family-name"
                    v-model="address.street"
                    :disabled="sending"
                  />
                </md-field>
                <md-field :class="getValidationClass('neighborhood')">
                  <label for="last-name">Neighborhood</label>
                  <md-input
                    name="neighborhood"
                    id="neighborhood"
                    autocomplete="family-name"
                    v-model="address.neighborhood"
                    :disabled="sending"
                  />
                </md-field>
              </div>
            </form>
          </div>
          <md-dialog-actions>
            <md-button class="md-primary" type="submit">Save</md-button>
            <md-button class="md-primary" @click="activeAddress = false">Close</md-button>
          </md-dialog-actions>
        </md-dialog>
        <!-- <md-button class="md-fab md-fab-bottom-right md-primary">
        <md-icon>phone</md-icon>
        </md-button>-->
        <fab
          :position="position"
          :bg-color="bgColor"
          :actions="fabActions"
          @manageModal="addPhone"
          @saveUser="validateUser"
          @saveAddress="manageAddressModal"
        ></fab>
      </div>
    </div>
  </md-content>
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
        phones: []
      },
      sending: false,
      active: false,
      countries: [],
      cities: [],
      states: [],
      activeAddress: false,
      phone: {},
      address: { city: { state: {} } },
      saved: false,
      message: true,
      bgColor: "#000000",
      position: "bottom-rigth",
      fabActions: [
        {
          name: "manageModal",
          icon: "phone"
        },
        {
          name: "saveUser",
          icon: "how_to_reg"
        },
        {
          name: "saveAddress",
          icon: "home"
        }
      ]
    };
  },
  validations: {
    address: {
      neighborhood: {
        required
      },
      street: {
        required,
        maxLength: maxLength(255)
      },
      number: {
        required,
        maxLength: maxLength(20)
      },
      city: {
        required
      },
      state: {
        required
      },
      country: {
        required
      },
      zipCode: {
        required
      }
    },
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
      }
    }
  },
  methods: {
    loadUser() {
      userService.get().then(res => {
        this.user = res.data;
        console.log(this.user);
      });
    },
    saveAddress() {},
    getCountries() {
      let self = this;
      userService.getCountries().then(res => {
        console.log("Getting Countries: ", res);
        self.countries.push(res.data);
      });
      console.log("Paises", this.countries);
    },
    getStatesByCountry(country) {
      console.log(country);
      let self = this;
      userService.getStatesByCountry(country.id).then(function(res) {
        console.log("States ", res.data);
        self.states.push(res.data);
      });
    },
    getCitiesByState(state) {
      let self = this;
      userService.getCitiesByState(state.id).then(function(res) {
        console.log("Cities ", res.data);
        self.cities.push(res.data);
      });
    },
    removePhone(phone, index) {
      userService.removePhone(phone.id).then(res => {
        (this.message = res.message),
          (this.phoneSaved = true),
          this.user.phones.splice(index, 1);
      });
    },
    editPhone(phone) {
      this.phone = phone;
      this.manageModal();
    },
    addPhone() {
      this.phone = {};
      this.manageModal();
    },
    savePhone() {
      if (!this.phone.id) {
        this.phone.user_id = this.user.id;
        userService.postPhone(this.phone).then(res => {
          this.loadUser();
          this.manageModal();
          this.clearPhone();
          this.message = res.message;
          this.saved = true;
        });
      } else {
        userService.updatePhone(this.phone).then(res => {
          this.loadUser();
          this.manageModal();
          this.clearPhone();
          this.message = res.message;
          this.saved = true;
        });
      }
    },
    manageModal() {
      this.active = !this.active;
    },
    manageAddressModal() {
      console.log(this.user)
      if (this.user.address) {
        this.address = this.user.address;
      } else {
        this.address = this.newAddress();
        this.getCountries();
      }
      this.activeAddress = !this.activeAddress;
    },
    newAddress() {
      return {
        city: { state: { country: {} } }
      };
    },
    clearPhone() {
      this.phone = {};
    },
    getValidationClass(fieldName) {
      let field = null;

      if (this.$v.user[fieldName]) {
        field = this.$v.user[fieldName];
      } else if (this.$v.phone[fieldName]) {
        field = this.$v.phone[fieldName];
      } else if (this.$v.address[fieldName]) {
        field = this.$v.address[fieldName];
      }

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    saveUser() {
      this.sending = true;
      userService
        .update(this.user)
        .then(() => {
          this.message = res.message;
          this.saved = true;
        })
        .catch(error => {
          this.message = error;
          this.saved = true;
        });
    },
    validateUser() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.saveUser();
      }
    },
    validateAddress() {
      this.$v.address.$touch();
      if (!this.$v.address.$invalid) {
        this.saveAddress();
      }
    },
    validatePhone() {
      this.$v.phone.$touch();
      if (!this.$v.phone.$invalid) {
        this.savePhone();
      }
    }
  },
  mounted: function() {
    this.loadUser();
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
  // max-width: 768px !important;
  .md-input {
    padding: 10px;
  }
}
.md-content {
  justify-content: center;
  align-items: center;
}

.md-dialog-address {
  width: 50%;
  .md-field {
  }
}
</style>