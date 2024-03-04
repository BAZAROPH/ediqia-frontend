<template>
  <b-sidebar
    id="sidebar-invoice-add-new-customer"
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
         Ajouter un Créancier
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
         <!-- type créancier -->  
        <b-form-group label="Type créancier " label-for="entreprise-domaine">
          <validation-provider #default="{  }" name="nom" rules="required">
            <v-select v-model="creancier_type" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="creancierType" />
          </validation-provider>
        </b-form-group>
                   

        <!-- Nom-->
        <b-form-group
          label="Nom"
          label-for="customer-name"
        >
          <b-form-input
            id="customer-name"
            v-model="customer.nom"
            trim
            placeholder="John Doe"
          />
        </b-form-group>

        <!-- Prenoms-->
        <b-form-group
          label="Prénoms"
          label-for="customer-name"
        >
          <b-form-input
            id="customer-name"
            v-model="customer.prenoms"
            trim
            placeholder="John Doe"
          />
        </b-form-group>

        <!-- Email -->
        <b-form-group
          label="Email"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="customer.email"
            trim
            placeholder="example@domain.com"
            type="email"
          />
        </b-form-group>

          <!-- Contact -->
        <b-form-group
          label="Contact"
          label-for="contact"
        >
          <b-form-input
            id="contact"
            v-model="customer.contact"
            type="number"
            placeholder="763-242-9206"
            trim
          />
        </b-form-group>


         <!-- Description -->
         <b-form-group label="Description" label-for="register-description">
            <b-form-textarea id="textarea" v-model="customer.description" placeholder="Saisissez une description" rows="5" max-rows="6"></b-form-textarea>
          </b-form-group>


          <!-- logo -->
        
        <div>
            <!-- Styled -->
            <label for="">Logo de la structure</label>
            <b-form-file class="text-center mb-1" v-model="file" @change="processFile($event)" :state="Boolean(file)" placeholder="Images du produit" drop-placeholder="Drop file here..." multiple />
        </div>
        
        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            type="submit"
            @click="createCreancier"
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
import { ref, onMounted } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import countries from '@/@fake-db/data/other/countries'
import vSelect from 'vue-select'
import URL from '@/views/pages/request'
import axios from 'axios'

export default {
  components: {
    BSidebar, BForm, BFormGroup, BFormInput, BFormTextarea, BButton, vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    onMounted(async () => {
      try {
        await axios.get(URL.EMPRUNT_LIST).then((response) => {
          creancierType.value = response.data.type_creancier
          console.log('data from invoiceSidebar', response.data)
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    })

    const customer = ref({
      nom: '',
      prenoms: '',
      email: '',
      description: '',
      type: '',
      contact: '',
      logo: ''
    })

    const text = ref('')
    const file = ref([])
    const creancierType = ref([])
    const creancier_type = ref('')

    const createCreancier = async function() {
      try {
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }
        const data = {
          type_user_creancie: creancier_type.value.type_parametre_id,
          nom: customer.value.nom,
          premons: customer.value.prenoms,
          contact: customer.value.contact,
          email: customer.value.email,
          description: customer.value.description,
        }
        console.log(data)
        await axios.post(URL.CREANCIER_CREATE, data, config).then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log('trycatch error', error)
      }
    }


    return {
      customer,
      countries,
      text,
      file,
      creancierType,
      creancier_type,
      createCreancier
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
