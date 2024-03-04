<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        lg="12"  md="12"
        class="d-flex justify-content-center"
      >
        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
             <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0 text-primary">
              {{formatMoney( depenses.montant_depense) }}
              </h5>
              <small>Montant depense</small>
            </div>
          </div>

          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-warning"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0 text-warning" >
                 {{ formatMoney(depenses.impaye) }}
              </h5>
              <small>Impayé</small>
            </div>
          </div>

            <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0 text-success">
               {{ formatMoney(depenses.paye) }}
              </h5>
              <small>Payé</small>
            </div>
          </div>

            <div class="d-flex align-items-center">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="CheckIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                <b-badge  v-if="depenses.status==='réglé'" variant="success">
              {{ depenses.status }}
            </b-badge>
             <b-badge  v-if="depenses.status==='partiel'" variant="warning">
              {{ depenses.status }}
            </b-badge>
             <b-badge  v-if="depenses.status==='à payer'" variant="danger">
              {{depenses.status }}
            </b-badge>
              </h5>
              <small>Status</small>
            </div>
          </div>
        </div>
      </b-col>
<hr style="width:100%">
      <!-- Right Col: Table -->
   <b-col lg="12" md="12" >
        <b-row>
        <b-col lg="6" md="6" >
         <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type depense :  {{ depenses.type_depense }}</span>
            </th>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Libelle :  {{ depenses.libelle }}</span>
            </th>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CalendarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Date depense :  {{ depenses.date_emission }}</span>
            </th>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Destinataire : 
                   <span v-if="depenses.employe !== null">{{ depenses.employe !== null ? depenses.employe : ''  }}</span>
            <span v-if="depenses.projet!== null">{{ depenses.projet !== null ? depenses.projet : ''  }}</span>
            <span v-if="depenses.departement !== null">{{ depenses.departement!== null ? depenses.departement: ''  }}</span>
            <span v-if="depenses.agence !== null">{{ depenses.agence !== null ? depenses.agence: ''  }}</span>
              </span>
            </th>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Fournisseur : {{ depenses.fournisseur }} </span>
            </th>
            <td>
              <!-- {{ userData.indicateur }} {{ userData.contact }} -->
            </td>
          </tr>
        </table>
         </b-col>
       
          </b-row>

       
      </b-col>

<hr style="width:100%">

<!-- liste des reglements -->

     <b-col cols="12">
              <h3>
                   <feather-icon
                icon="TrendingUpIcon"
                class="mr-75"
              />
                  Liste des règlements effectués</h3><br>
              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
              <div class="d-none d-lg-flex">
                <b-row class="flex-grow-1 px-1">
                  <!-- Single Item Form Headers -->
                  <b-col cols="12" lg="4">
                    Date reglement
                  </b-col>
                  <b-col cols="12" lg="4">
                    Montant reglement
                  </b-col>

                   <b-col cols="12" lg="4">
                    Compte
                  </b-col>
                 
                </b-row>
                <div class="form-item-action-col" />
              </div>
              <!-- Form Input Fields OR content inside bordered area  -->
              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
              <div class="d-flex border rounded" v-for="(item) in depenses.comptes"
              :key="item.id">
                <b-row class="flex-grow-1 p-2">
                  <!-- Single Item Form Headers -->
                  <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Date</label>
                    <b-form-input
                      v-model="item.pivot.date_reglement"
                      type="text"
                      class="mb-2"
                      readonly
                      disabled
                    />
                  </b-col>
                  <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Motant</label>
                    <b-form-input
                      v-model="item.pivot.montant_reglement"
                      type="number"
                      class="mb-2"
                      readonly
                      disabled
                    />
                  </b-col>
                   <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Compte</label>
                    <b-form-input
                      v-model="item.libelle"
                      type="text"
                      class="mb-2"
                      readonly
                      disabled
                    />
                  </b-col>
                  <!-- <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Status</label>
                    <v-select
                      v-model="item.status"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="statusList"
                      label="status"
                      :clearable="false"
                      class="mb-2 item-selector-title"
                    />
                  </b-col> -->
                </b-row>
              </div>
            </b-col>
      
    </b-row>

  </b-card>
</template>

<script>
import {
  BCard, BFormGroup, BButton, BAvatar, BRow, BCol, BModal, BFormInput, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from '@/views/pages/request'
import axios from 'axios'
import { VueTelInput } from 'vue-tel-input'
// import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
    VueTelInput,
    vSelect,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BModal,
    BFormGroup,
    VBModal,
    BForm,
    BImg,
    BLink,
    BForm,
    BFormCheckbox,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      clientUpOption: [{ title: "Particulier" }, { title: "Entreprise" }],
      user: {
        nom: '',
        prenoms: '',
        emai: '',
        contact: '',
        localisation: '',
        type_client: ''
      },
      status_id: '',
      indicateur: '',
      depenses:''
    }
  },

  mounted() {
      		this.depenses=JSON.parse(localStorage.getItem('depense'))	;

  },


  methods: {

      formatMoney(num) {
        const formatter = new Intl.NumberFormat('ci-CI', {
          style: 'currency',
          currency: 'XOF',
          minimumFractionDigits: 2
        })
        return formatter.format(num)
      },

    // deleteUser(id) {
    //   try {
    //     const data = {
    //       id: id,
    //     };
    //     const config = {
    //       headers: {
    //         'Accept': 'application/json'
    //       },
    //     }

    //     this.$swal({
    //       title: 'Etes-vous sur ?',
    //       text: "Supprimer ce client de la liste des clients !",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonText: 'Oui, supprimer !',
    //       cancelButtonText: 'Annuler',
    //       customClass: {
    //         confirmButton: 'btn btn-primary',
    //         cancelButton: 'btn btn-outline-danger ml-1',
    //       },
    //       buttonsStyling: false,
    //     }).then(async (result) => {
    //       if (result.value) {
    //         await axios.post(URL.CLIENT_DESTROY, data, config).then((response) => {
    //           if (response.data) {
    //             this.$router.push('/clients')
    //             localStorage.removeItem('client')
    //           }
    //         }).catch((error) => {
    //           console.log('api error', error)
    //         })
    //         this.$swal({
    //           icon: 'success',
    //           title: 'Supprimé !',
    //           text: 'Le client a été supprimé.',
    //           customClass: {
    //             confirmButton: 'btn btn-success',
    //           },
    //         })
    //       }
    //     })
    //   } catch (error) {
    //     console.log('trycatch error', error)
    //   }
    // },


    // updateClient(Id) {
    //   const userId = Id
    //   this.$swal({
    //     title: "Êtes vous sûr de vouloir enregistrer",
    //     text: "Les modificiations seront prises en compte",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonText: 'Oui, modifier !',
    //     cancelButtonText: 'Annuler',
    //     customClass: {
    //       confirmButton: "btn btn-primary",
    //       cancelButton: "btn btn-outline-danger ml-1",
    //     },
    //     buttonsStyling: false,
    //   }).then((result) => {
    //     if (result.value) {
    //       try {
    //         if (this.type_client == "Particulier") {
    //           this.status_id = 1
    //         } else {
    //           this.status_id = 2
    //         }
    //         const data = {
    //           id: userId,
    //           nom: this.user.nom,
    //           prenoms: this.user.prenom,
    //           email: this.user.email,
    //           contact: this.user.contact,
    //           indicateur:this.indicateur,
    //           type_client: this.status_id,
    //           localisation: this.user.localisation,
    //         }
    //         console.log(data)
    //         const config = {
    //           headers: {
    //             'Accept': 'application/json'
    //           },
    //         }
    //         axios.post(URL.CLIENT_UPDATE, data, config).then((response) => {
    //           if(response.data) {
    //             axios.get(URL.CLIENT_LIST).then((response) => {
    //               const listeClient = response.data[0]
    //               this.userData = listeClient.filter(item => item.id === this.userData.id)
    //             }).catch((error) => {
    //               console.log(error.response.data.errors);
    //             })
    //           }
    //         }).catch((error) => {
    //           if (error.response) {
    //             console.log('api error', error)
    //           }
    //         })
    //       } catch (error) {
    //         console.log('trycatch error', error);
    //       }
    //     }
    //   })
    // },
    changer(e){
      this.indicateur = `+ ${e.dialCode}`
      console.log(this.user.contact)
    },
  },
  setup() {
    return {
      avatarText,
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
