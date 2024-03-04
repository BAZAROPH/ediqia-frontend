<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <h2 class="brand-text text-primary ml-1">
          <vuexy-logo />
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold text-center mb-1"
          >
            Bienvenue sur Ediqia! 👋 
          </b-card-title>
          <b-card-text class="mb-2 text-center">
            Se connecter pour commencer l'aventure.
            <!-- Affichage d'une erreur en cas d'une erreur avec le mot de passe -->
            <small
              :class="error_global ? 'block' : 'none'"
              class="text-danger text-center font-weight-bold"
            >
              {{message_error_global}}
            </small>
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
            <!-- ID de compte -->
            <div class="text-center">
              <label for="login-id" class="text-indigo font-weight-bold">ID de compte</label>
            </div>
              <b-form-group
                label-for="login-id"
              >
                <validation-provider
                  #default="{ errors }"
                  name="id"
                  rules="required"
                >
                  <b-form-input
                    id="login-id"
                    @input="validateID"
                    v-model="userId"
                    :state="errors.length > 0 ? false:null"
                    name="login-ID"
                    placeholder=""
                  />
                  <!-- Affichage d'un texte en cas d'erreur avec l'id -->
                  <small
                    :class="valideIdLen ? 'block' : 'none'"
                    class="text-danger"
                  >
                    Veuillez entrer un ID de compte valide
                  </small>
                </validation-provider>
              </b-form-group>
              <br>
              <!-- email -->
              <b-form-group
                label="Email"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    @input="validateEmail"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="bazaroph@example.com"
                  />
                  <!-- Affichage d'un texte en cas d'erreur avec l'email -->
                  <small
                    :class="valideEmail ? 'block' : 'none'"
                    class="text-danger"
                  >
                    Veuillez entrer un email valide 
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Mot de passe</label>
                  <b-link :to="{name:'reset-password'}">
                    <small>Mot de passe oublié ?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      @input="validatePassword"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <!-- Affichage d'une erreur en cas d'une erreur avec le mot de passe -->
                  <small
                    :class="validePassword ? 'block' : 'none'"
                    class="text-danger"
                  >
                    Le mot de passe est de 8 caractrères minimum
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Se souvenir de moi
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                class="bg-indigo"
                block
                @click="signUp"
                v-if="marche"
                disabled
              >
               <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </b-button>

              <b-button
                v-else
                type="submit"
                class="bg-indigo"
                block
                @click="signUp"
              >
              Connexion
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Vous êtes nouveau ?</span>
            <b-link :to="{name:'register'}">
              <span>&nbsp;Créer un compte </span>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import URL from '@/views/pages/request'
import axios from 'axios'
import setAuthHeader from "../../../../auth/jwt/token"
import CryptoJS from 'crypto-js'

export default {
  components: {
    CryptoJS,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      permissions:[],
      status: '',
      password: '',
      userEmail: '',
      userId:'',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      valideEmail: false,
      validePassword: false,
      valideID:false,
      valideIdLen:false,
      error_global:false,
      userData: '',
      marche:false,
      bouton:"Connexion",
      message_error_global:''
    }
  },
  mounted() {
    document.title='Connexion';
    if (localStorage.getItem('token')) {
      location.assign('/#/')
    }
    let current_link = window.location.href
    if (current_link.lastIndexOf('EN')>=0){
      current_link = current_link.split('?')
      this.userId = current_link[current_link.length-1]
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg') 
          return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Form Submitted',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }
      })
    },
    validateEmail() {
      // valid email regex pattern
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
      if (!this.userEmail.match(emailPattern)) {
        this.valideEmail = true
      } else {
        this.valideEmail = false
      }
    },
    validateID(){
       if(this.userId.length<15 || this.userId.length>15){
         this.valideIdLen=true
       }else{
         this.valideIdLen=false
       }
       if(!this.userId){
         this.valideID=true
       }else{
         this.valideID=false
       }
    },
    validatePassword() {
      if (this.password.length !== 0 && this.password.length >= 8) {
        this.validePassword = false
      } else {
        this.validePassword = true
      }
    },
    async signUp(e) {
      try{
        e.preventDefault();
        this.marche=true
        const data = {
          email: this.userEmail,
          password: this.password,
          code :this.userId
        }
        const config = {
            headers: {
                'Accept': 'application/json'
            },
        }
        this.bouton=""
        this.validateEmail()
        this.validatePassword()
        await axios.post(URL.LOGIN, data,config).then(response => {
          this.userData = response.data

          if(this.userData.error){
            this.error_global=true
            this.message_error_global = this.userData.error
          }else if(this.userData.message){
            this.error_global=true
            this.message_error_global = this.userData.message
          }
          console.log(this.message_error_global)

          setAuthHeader(response.data.token)
          })
        localStorage.clear();
        localStorage.setItem("token",this.userData.token)
        if(localStorage.getItem("token")){
          // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userData.entreprise_exist), 'qenium 123').toString()
          // localStorage.setItem('ee', ciphertext)

          // ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userData.abonnement_exist), 'qenium 123').toString()
          // localStorage.setItem('ae', ciphertext)

          // ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userData.valable), 'qenium 123').toString()
          // localStorage.setItem('va', ciphertext)

          for (let index = 0; index < this.userData.user_connected_details[1].length; index++) {
            this.permissions.push(this.userData.user_connected_details[1][index].name)
          }
          var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.permissions), 'qenium 123').toString()
          localStorage.setItem('permission',ciphertext)

          ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userData.sidebar), 'qenium 123').toString()
          localStorage.setItem('sidebar',ciphertext);
          localStorage.setItem("modia",true);
        }
        if (this.userData !== '') {
            this.$router.push({name: 'home'});
        }else{
          this.error_global=true
          // 
          setTimeout(() => { 
            this.marche=false
          }, 300);
        }
      }catch(error){
        console.log(error)
        this.error_global=true
        this.marche=false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/vue/pages/page-auth.scss';
  .none {
    display: none;
  }
  .block {
    display: inline-block;
  }
</style>