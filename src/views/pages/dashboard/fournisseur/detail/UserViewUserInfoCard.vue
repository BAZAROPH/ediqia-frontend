<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="userData.avatar"
            :text="avatarText(userData.name)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.nom }} {{ userData.prenoms }}
              </h4>
              <span class="card-text">{{ userData.email }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                variant="primary"
                v-b-modal.modal-update-user
              >
                Modifier
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
                @click="deleteUser(userData.id)"
              >
                Supprimer
              </b-button>
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <!-- <div class="d-flex align-items-center mt-2">
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
              <h5 class="mb-0">
                23.3k
              </h5>
              <small>Dépense mensuelle</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="TrendingUpIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                $99.87k
              </h5>
              <small>Profit annuel</small>
            </div>
          </div>
        </div> -->
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Code</span>
            </th>
            <td class="pb-50">
              {{ userData.code }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.status_user }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Role</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.role }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="FlagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Adresse</span>
            </th>
            <td class="pb-50">
              {{ userData.localisation }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Contact</span>
            </th>
            <td>
              {{ userData.indicateur }} {{ userData.contact }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>



    <!-- Modal pour mettre à jour un client    -->
    <b-modal id="modal-update-user" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier mon client" @ok="updateClient(userData.id)">
      <b-form class="auth-register-form mt-2">
        <!-- nom -->
        <b-form-group label="Nom" label-for="register-nom">
          <validation-provider #default="{ errors }" name="nom" rules="required">
            <b-form-input id="register-nom" v-model="user.nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
          </validation-provider>
        </b-form-group>

        <!-- prenom -->
        <b-form-group label="Prénom" label-for="register-prenom">
          <validation-provider #default="{ errors }" name="prenom" rules="required">
            <b-form-input id="register-prenom" v-model="user.prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
          </validation-provider>
        </b-form-group>

        <!-- email -->
        <b-form-group label="Email" label-for="register-email">
          <validation-provider #default="{ errors }" name="Email" rules="required">
            <b-form-input id="register-email" v-model="user.email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
          </validation-provider>
        </b-form-group>

        <!-- contact -->
        <b-form-group label="Contact" label-for="register-contact">
          <validation-provider #default="{ errors }" name="contact" rules="required">
            <vue-tel-input id="register-contact" @country-changed="changer" v-model="user.contact" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
          </validation-provider>
        </b-form-group>
        
        <!-- Localisation -->
        <b-form-group label="Localisation" label-for="entreprise-localisation">
          <validation-provider #default="{ errors }" name="localisation" rules="required">
            <b-form-input
              id="entreprise-localisation"
              v-model="user.localisation"
              name="entreprise-localisation"
              :state="errors.length > 0 ? false:null"
              class="text-center"
              placeholder="Abidjan, Angré RCI 0089 BP 00225"
            />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <v-select v-model="user.type_client" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="clientUpOption" />
        </b-form-group>
      </b-form>
    </b-modal>
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
      indicateur: ''
    }
  },
  methods: {
    deleteUser(id) {
      try {
        const data = {
          id: id,
        };
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }

        this.$swal({
          title: 'Etes-vous sur ?',
          text: "Supprimer ce client de la liste des clients !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer !',
          cancelButtonText: 'Annuler',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(async (result) => {
          if (result.value) {
            await axios.post(URL.CLIENT_DESTROY, data, config).then((response) => {
              if (response.data) {
                this.$router.push('/clients')
                localStorage.removeItem('client')
              }
            }).catch((error) => {
              console.log('api error', error)
            })
            this.$swal({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le client a été supprimé.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }
        })
      } catch (error) {
        console.log('trycatch error', error)
      }
    },


    updateClient(Id) {
      const userId = Id
      this.$swal({
        title: "Êtes vous sûr de vouloir enregistrer",
        text: "Les modificiations seront prises en compte",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Oui, modifier !',
        cancelButtonText: 'Annuler',
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          try {
            if (this.type_client == "Particulier") {
              this.status_id = 1
            } else {
              this.status_id = 2
            }
            const data = {
              id: userId,
              nom: this.user.nom,
              prenoms: this.user.prenom,
              email: this.user.email,
              contact: this.user.contact,
              indicateur:this.indicateur,
              type_client: this.status_id,
              localisation: this.user.localisation,
            }
            console.log(data)
            const config = {
              headers: {
                'Accept': 'application/json'
              },
            }
            axios.post(URL.CLIENT_UPDATE, data, config).then((response) => {
              if(response.data) {
                axios.get(URL.CLIENT_LIST).then((response) => {
                  const listeClient = response.data[0]
                  this.userData = listeClient.filter(item => item.id === this.userData.id)
                }).catch((error) => {
                  console.log(error.response.data.errors);
                })
              }
            }).catch((error) => {
              if (error.response) {
                console.log('api error', error)
              }
            })
          } catch (error) {
            console.log('trycatch error', error);
          }
        }
      })
    },
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
