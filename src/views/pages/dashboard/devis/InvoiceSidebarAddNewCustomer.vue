<template>
    <!-- Modal pour ajouter une nouvelle taxe -->
    <b-modal id="" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter un nouveau client" @ok="handleOk">
      <validation-observer ref="registerForm">
        <b-form class="auth-register-form mt-2">
          <div>
            <h5 class="text-danger text-center">{{client_exist}}</h5>
          </div>
          <!-- nom -->
          <b-form-group label="Nom" label-for="register-nom">
            <validation-provider #default="{ errors }" name="nom" rules="required">
                <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                    Vous devez renseigner le nom du client
                </small>
            </validation-provider>
          </b-form-group>

          <!-- prenom -->
          <b-form-group label="Prénom" label-for="register-prenom">
            <validation-provider #default="{ errors }" name="prenom" rules="required">
              <b-form-input id="register-prenom" @input="validatePrenom" v-model="prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
              <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                  Vous devez renseigner le prénom du client
              </small>
            </validation-provider>
          </b-form-group>

          <!-- email -->
          <b-form-group label="Email" label-for="register-email">
            <validation-provider #default="{ errors }" name="Email" rules="required|email">
              <b-form-input id="register-email" @input="validateEmail" v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
              <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                  Veuillez entrer un email valide
              </small>
            </validation-provider>
          </b-form-group>

          <!-- contact -->
          <b-form-group label="Contact" label-for="register-contact">
            <validation-provider #default="{ errors }" name="contact" rules="required">
              <b-form-input id="register-contact" @input="validateContact" v-model="contact" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
              <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                  Veuillez renseigner le contact du client
              </small>
              <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                  Ce numéro est incorrecte
              </small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Localisation" label-for="entreprise-localisation">
            <validation-provider #default="{ errors }" name="localisation" rules="required">
              <b-form-input
                id="entreprise-localisation"
                @input="validateLocalisation"
                v-model="localisation"
                name="entreprise-localisation"
                :state="errors.length > 0 ? false:null"
                class="text-center"
                placeholder="Abidjan, Angré RCI 0089 BP 00225"
              />
              <small :class="valideLocalisation ? 'block' : 'none'" class="text-danger">
                Veuillez entrer la localisation du client
              </small>
            </validation-provider>
          </b-form-group>
          <b-form-group>
            <v-select v-model="selected" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option" />
          </b-form-group>
          <small :class="valideStatus ? 'block' : 'none'" class="text-danger">
            Vous devez renseigner le status du client
          </small>
        </b-form>
      </validation-observer>
    </b-modal>
</template>

<script>
import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from '@/views/pages/request'
import axios from "axios";
export default {
  components: {
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
  data() {
    return {
      // validation
      valideStatus: false,
      nom: "",
      prenom: "",
      email: "",
      localisation: "",
      contact: "",
      valideNom: false,
      validePrenom: false,
      valideContact: false,
      valideEmail: false,
      valideContactNumber: false,
      validePassword: false,
      valideLocalisation: false,
      valideContactNumber: false,

      valideEditNom: false,
      valideEditPrenom: false,
      valideEditContact: false,
      valideEditEmail: false,
      valideEditContactNumber: false,
      valideEditPassword: false,
      valideEditLocalisation: false,
      valideEditContactNumber: false,
      valideEditStatus: false,
      email,
      clientUp: "",
      returnData: "",
      required,
      selected: "Quel est votre status",
      status_id: "",
      option: [{ title: "Particulier" }, { title: "Entreprise" }],
      clientUpOption: [{ title: "Particulier" }, { title: "Entreprise" }],
      client_exist: "",
      clients: [],
      valideExiste: "",
      edit_nom: "",
      edit_prenom: "",
      edit_email: "",
      edit_contact: "",
      edit_localisation: "",
      edit_type_client: "",
      edit_index: "",
      id_update: "",

      updateIndex: "",
    }
  },
  computed: {
    console: function() {
      console.log('good')
    }
  },
  methods: {
    // top end
    topEnd() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Client enregistrée avec succès",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    },
    isDigit(str) {
        return /^\d+$/.test(str);
    },
    validateEmail() {
        // valid email regex pattern
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!this.email.match(emailPattern) && this.email !== "") {
            this.valideEmail = true;
            this.erreur = true;
        } else {
            this.valideEmail = false;
            this.erreur = false;
        }
    },
    validateEditEmail() {
        // valid email regex pattern
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!this.edit_email.match(emailPattern) && this.edit_email !== "") {
            this.valideEditEmail = true;
        } else {
            this.valideEditEmail = false;
        }
    },
    validateContact() {
        if (!this.contact) {
            this.valideContact = true;
            this.erreur = true;
        } else {
            this.valideContact = false;
            this.erreur = false;
        }
        if (this.contact && this.isDigit(this.contact) === false) {
            this.valideContactNumber = true;
            this.erreur = true;
        } else {
            this.valideContactNumber = false;
            this.erreur = false;
        }
    },
    validateEditContact() {
        if (!this.edit_contact) {
            this.valideEditContact = true;
            this.erreur = true;
        } else {
            this.valideEditContact = false;
            this.erreur = false;
        }
        if (this.edit_contact && this.isDigit(this.edit_contact) === false) {
            this.valideEditContactNumber = true;
        } else {
            this.valideEditContactNumber = false;
        }
    },
    validateNom() {
        if (!this.nom) {
            this.valideNom = true;
            this.erreur = true;
        } else {
            this.valideNom = false;
            this.erreur = false;
        }
    },
    validateEditNom() {
        if (!this.edit_nom) {
            this.valideEditNom = true;
        } else {
            this.valideEditNom = false;
        }
    },
    validatePrenom() {
        if (!this.prenom) {
            this.validePrenom = true;
            this.erreur = true;
        } else {
            this.validePrenom = false;
            this.erreur = false;
        }
    },
    validateEditPrenom() {
        if (!this.edit_prenom) {
            this.valideEditPrenom = true;
        } else {
            this.valideEditPrenom = false;
        }
    },
    validateStatus() {
        if (this.selected === "Quel est votre status") {
            this.valideStatus = true;
            this.erreur = true;
        } else {
            this.valideStatus = false;
            this.erreur = false;
        }
    },
    validateEditStatus() {
        if (this.edit_type_client === "Quel est votre status") {
            this.valideEditStatus = true;
        } else {
            this.valideEditStatus = false;
        }
    },
    validateLocalisation() {
        if (!this.localisation) {
            this.valideLocalisation = true;
            this.erreur = true;
        } else {
            this.valideLocalisation = false;
            this.erreur = false;
        }
    },
    validateEditLocalisation() {
        if (!this.edit_localisation) {
            this.valideEditLocalisation = true;
        } else {
            this.valideEditLocalisation = false;
        }
    },
    async handleOk(bvModalEvt) {
      try {
        this.validateStatus();
        this.validateNom();
        this.validatePrenom();
        this.validateContact();
        this.if_exist();
        // Prevent modal from closing
        if (this.valideStatus || this.valideNom || this.validePrenom || this.valideContact || this.valideContactNumber || this.valideExiste) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        } else {
          if (this.selected.title == "Particulier") {
            this.status_id = 1;
          } else {
            this.status_id = 2;
          }
          const newClient = {
            nom: this.nom,
            prenoms: this.prenom,
            contact: this.contact,
            localisation: this.localisation,
            email: this.email,
            type_client: this.status_id,
          };
          this.clients.push(newClient);
          console.log(this.clients, this.nom, this.daaaa)
          this.topEnd();
          await axios.post(URL.CLIENT_CREATE, newClient).then((response) => {
            this.userData = response.data;
          }).catch(err => console.log(err))
          this.nom = "";
          this.prenom = "";
          this.email = "";
          this.contact = "";
          this.localisation = ""
          this.selected = "Quel est votre status"
        }
      } catch (error) {
        console.log(error);
      }
    },
    if_exist() {
      for (let index = 0; index < this.clients.length; index++) {
        if (this.contact == this.clients[index].contact) {
          this.client_exist = "Ce client existe déjà! Veuillez vérifier le contact";
          this.valideExiste = true;
        } else {
          this.valideExiste = false;
        }
      }
    },
},
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.none {
  display: none;
}
.block {
  display: inline-block;
}
</style>
