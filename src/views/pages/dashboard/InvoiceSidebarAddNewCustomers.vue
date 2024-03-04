<template>
  <b-sidebar
    id="sidebar-invoice-add-new-customers"
    sidebar-class="sidebar-lg"
    bg-variant="white"
    shadow
    backdrop
    no-header
    right
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
         Ajouter un compte
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- Body -->
      <b-form
        class="p-2"
        @submit.prevent
      >

        <!-- Numero compte -->
        <b-form-group
          label="Numero de compte"
          label-for="customer-name"
        >
          <validation-provider #default="{ errors }" name="nom" rules="required">
            <b-form-input id="register-nom" v-model="compte.numero_compte" name="register-numeroCompte" :state="errors.length > 0 ? false:null" placeholder="AZ000000EH09" />
          </validation-provider>
        </b-form-group>

        <!-- Libelle -->

        <b-form-group
          label="Libelle"
          label-for="customer-name"
        >
          <validation-provider #default="{ errors }" name="libelle" rules="required">
            <b-form-input id="register-libelle" v-model="compte.libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="NSIA, ECOBANK" />
          </validation-provider>
        </b-form-group>

        <!-- Solde -->
        <b-form-group
          label="solde"
          label-for="email"
        >
          <validation-provider #default="{ errors }" name="solde" rules="required">
            <b-form-input id="register-solde" v-model="compte.solde" type="text" name="register-solde" :state="errors.length > 0 ? false:null" placeholder="1000000000" />
          </validation-provider>
        </b-form-group>
        
        <!-- Description -->
        <b-form-group>
          <label for="taxeValue">Description (facultatif):</label>
          <b-form-textarea id="textarea" v-model="compte.description" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
        </b-form-group> 

        
        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            type="submit"
            @click="saveCompte"
          >
            Ajouter
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            @click="hide"
          >
            Annuler 
          </b-button>
        </div>
      </b-form>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormTextarea, BButton,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import countries from '@/@fake-db/data/other/countries'
import vSelect from 'vue-select'
import URL from '@/views/pages/request'
import axios from 'axios'

export default {
  components: {
    BSidebar, BForm, BFormGroup, BFormInput, BFormTextarea, BButton, vSelect, ValidationProvider, ValidationObserver,
  },
  directives: {
    Ripple,
  },
  setup() {
    const compte = ref({
      solde: '',
      numero_compte: '',
      libelle: '',
      description: '',
    })

    const saveCompte = async function() {
      try {
        const data = compte.value
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }

        await axios.post(URL.COMPTE_CREATE, data, config).then((response) => {
          console.log(response.data)
        });
      } catch (error) {
        console.log('trycatch error', error)
      }
    }


    return {
      compte,
      countries,
      saveCompte,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
