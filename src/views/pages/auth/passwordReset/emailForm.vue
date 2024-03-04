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

      <!-- Forgot password-->
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
            class="font-weight-bold mb-1 text-center"
          >
            Mot de passe oublié? 🔒
          </b-card-title>
          <b-card-text class="mb-2 text-center">
          Entrez votre email et nous vous enverrons des instructions pour réinitialiser votre mot de passe
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
            >
             <!-- IdCompte -->
              <b-form-group
                label="ID COMPTE"
                label-for="forgot-password-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="IdCompte"
                  rules="required|idcompte"
                >
               
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userIdCompte"
                    :state="errors.length > 0 ? false:null"
                    name="forgot-password-IdCompte"
                    placeholder="EN000000000000xxxx"
                  />
                    <b-link :to="{name:'reset-IdCompte'}">
                    <small style="display:flex;justify-content:end;color:" >ID compte oublié ?</small>
                  </b-link>
                  <small v-if="invalideIdCompte" :class="invalideIdCompte ? 'block' : 'none'" class="text-danger">Le code entreprise entré n'est pas associé a l'émail. Vérifiez le code et rééssayez !</small>
                </validation-provider>
              </b-form-group>

            <!-- email -->
              <b-form-group
                label="Email"
                label-for="forgot-password-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                  />
                  <small v-if="errors[0]" class="text-danger">Entrez une email valide</small>
                  <small v-if="invalideEmail" class="text-danger">Email non reconnue. Vérifiez l'email et rééssayez !</small>
                </validation-provider>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                    @click="send"
                block
              >
                <div v-if="loading===true" class="spinner-border text-primary"></div>
             <span v-else>Réinitialiser le mot de passe</span>
               
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{name:'login'}">
              <feather-icon icon="ChevronLeftIcon" /> Retour connexion
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Forgot password-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BCardTitle, BCardText, BImg, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import { required, email} from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import URL from '@/views/pages/request'
import axios from 'axios'

export default {
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BLink,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
       userIdCompte: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      invalideEmail: false,
      invalideIdCompte: false,
      required,
      email,
      idcompte,
      loading: false
    }
  },
  computed: {
    // imgUrl() {
    //   if (store.state.appConfig.layout.skin === 'dark') {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg')
    //     return this.sideImg
    //   }
    //   return this.sideImg
    // },
      imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    }
  },
  mounted(){
    document.title='Réinitialiser mot de passe';
  },
  methods: {
    validationForm() {
      return
      // this.$refs.simpleRules.validate().then(success => {
      //   if (success) {
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: 'Form Submitted',
      //         icon: 'EditIcon',
      //         variant: 'success',
      //       },
      //     })
      //   }
      // })
    },

    async send(){     
      var lien = "https://www.ediqia.com/#/new-password"
      console.log(lien)
        const data2 = {
          email: this.userEmail,
          IdCompte:this.userIdCompte,
          url:lien,
        }
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }
          this.loading = true;
        console.log('information envoyé au backend', data2, config)
        await axios.post(URL.EMAIL_RESET_PASSWORD, data2, config).then(res => {
            this.loading = false;
            console.log(res.data.errorMessage)
          // // this.userEmail="";
          if(res.data.errorMessage){
            this.invalideIdCompte = true
          }else{
            this.topEnd()
          }
    
          if (res.data.token) {
            // this.invalideEmail = false
            this.$router.push({name:'reset-password', params: { token: res.data.token, email: this.userEmail, }})
          }
        }).catch(error => {
            this.loading = false;
          console.log(error)
          if (error.response.data) {
            this.invalideEmail = true
              // this.invalideIdCompte = true
          } else {
            this.invalideEmail = false
              // this.invalideIdCompte = false
          }

        })
    },
    topEnd() {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Email envoyé avec success',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
      },

     
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
