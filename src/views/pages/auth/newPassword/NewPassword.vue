<template>
<section>
    <div class="auth-wrapper auth-v1 px-2" v-if="isTokenValide === false">
    <div class="auth-inner py-2">
      <!-- Reset Password v1 -->
      <b-card class="mb-0">

        <!-- logo -->
        <b-link class="brand-logo">
          <vuexy-logo />
        </b-link>

        <b-card-title class="mb-1">
          Mise à jour du mot de passe 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Votre nouveau mot de passe doit etre différent du précédent
        </b-card-text>

        <!-- form -->
        <validation-observer ref="simpleRules">
          <b-form
            method="POST"
            class="auth-reset-password-form mt-2"
            @submit.prevent="validationForm"
          >

            <!-- password -->
            <b-form-group
              label="Nouveau mot de passe"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="new_password"
                    :type="password1FieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="reset-password-new"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password1ToggleIcon"
                      @click="togglePassword1Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              type="submit"
              variant="primary"
              @click="updatePassword"
            >
              Enregistrer mot de passe
            </b-button>
          </b-form>
        </validation-observer>

        <p class="text-center mt-2">
          <b-link :to="{name:'login'}">
            <feather-icon icon="ChevronLeftIcon" /> Retour à la connexion
          </b-link>
        </p>

      </b-card>
    <!-- /Reset Password v1 -->
    </div>
  </div>
  <div class="" v-if="isTokenValide === true">
    Votre Token a expiré
  </div>
</section>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BCard, BCardTitle, BCardText, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BLink, BFormInput, BButton,
} from 'bootstrap-vue'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import URL from '@/views/pages/request'
import axios from 'axios'
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64';
export default {
  components: {
    VuexyLogo,
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
      cPassword: '',
      password: '',
      new_password: '',
      // validation
      required,

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
      token: '',
      email: '',
      tokenGet:'',
      isTokenValide : false
    }
  },

  beforeMount(){
      
  
    
  },

   mounted() {
    document.title='Modifier mot de passe';
    this.token = this.$route.params.token
    this.email = this.$route.params.email

    var href1= window.location.href

    var href2 = href1.search('yts=')
    console.log(href2)
    var href3 = href1.substr(href2+4,href1.length)
    console.log(href3)
    console.log('token : ', this.$route.params)


     var token = href1.search('token=')
    // console.log('token: ', token)
    this.tokenGet = href1.substring(parseInt(token+6),parseInt(href2-1))
    console.log('tokenGet: ',this.tokenGet)
    // console.log('token : ', this.$route.params)

    const replace_ = href3.split('3YMouRDF43').join('-')
     const replace_by = replace_.split('5vgfT0KO7').join(':')
    let replace_by_complete = replace_by.split('9vgMufT0KO1').join(' ')
    console.log(moment.utc().isAfter(replace_by_complete),replace_by_complete)

    const verifyTimeInToken = moment.utc().isAfter(replace_by_complete) 
  
    if(verifyTimeInToken === true){
      this.isTokenValide = true
    }else{
      this.isTokenValide = false
    }

    console.log(this.isTokenValide);
     
      //  axios.post(URL.RESET_PASSWORD, data).then((response) => {
      //     this.token = response
      //     console.log('eeeeeeee');
      //   }).catch((error) => {
      //     console.log(error);
      //   });
  },
  computed: {
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Mot de passe réinitialisé avec success',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }
      })
    },
    async updatePassword() {
      try {
        const data = {
          // email: this.email,
          token: this.tokenGet,
          password: this.new_password
        }
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }
        await axios.post(URL.RESET_PASSWORD, data, config).then(res => {
          console.log(data)
          if (res.data.message==="token invalide") {
            this.isTokenValide=false;
          }else{
            this.$router.push('/login')
          }
        }).catch(err => {
          console.log('api error', err)
        })
      } catch (error) {
        console.log('trycathc error', error)
      }
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
