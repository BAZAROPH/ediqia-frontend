<template>
  <validation-observer ref="addEmprunt">
    <b-row hidden>
      <b-modal
        id="modal-login"
        cancel-variant="outline-secondary"
        ok-title="Créer"
        cancel-title="Annuler"
        centered
        title="Nouveau parametre"
        @ok="handleOk"
      >
        <b-form>
          <div>
            <h5 class="text-danger text-center">{{ exist_text }}</h5>
          </div>
          <!-- libelle -->
          <b-form-group label="Libelle" label-for="register-nom">
            <validation-provider #default="{ errors }" name="libelle" rules="required">
              <b-form-input
                id="register-nom"
                @input="validateLibelle"
                v-model="libelle"
                name="register-nom"
                :state="errors.length > 0 ? false : null"
                placeholder=""
              />
              <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                Vous devez renseigner le libellé du parametre
              </small>
            </validation-provider>
          </b-form-group>

          <!-- icône -->
          <b-form-group label="Icône" label-for="register-nom">
            <validation-provider #default="{ errors }" name="icone" rules="required">
              <b-form-input
                id="register-nom"
                v-model="icone"
                name="register-nom"
                :state="errors.length > 0 ? false : null"
                placeholder=""
              />
              <!-- <small :class="valideIcone ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du projet
                        </small> -->
            </validation-provider>
          </b-form-group>

          <!-- description -->
          <b-form-group>
            <label for="Description">Description</label>
            <b-form-textarea
              id="textarea"
              v-model="description"
              placeholder=""
              rows="5"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- update -->

      <b-modal
        id="modal-update"
        cancel-variant="outline-secondary"
        ok-title="Modifier"
        cancel-title="Annuler"
        centered
        title="Modifier un  parametre"
        @ok="updateParametre()"
      >
        <b-form>
          <!-- libelle -->
          <b-form-group label="Libelle" label-for="register-nom">
            <validation-provider #default="{ errors }" name="libelle" rules="required">
              <b-form-input
                id="register-nom"
                @input="validateEditLibelle"
                v-model="edit_libelle"
                name="register-nom"
                :state="errors.length > 0 ? false : null"
                placeholder=""
              />
              <small :class="valideEditLibelle ? 'block' : 'none'" class="text-danger">
                Vous devez renseigner le libellé du type parametre
              </small>
            </validation-provider>
          </b-form-group>

          <!-- icône -->
          <b-form-group label="Icône" label-for="register-nom">
            <validation-provider #default="{ errors }" name="icone" rules="required">
              <b-form-input
                id="register-nom"
                v-model="edit_icone"
                name="register-nom"
                :state="errors.length > 0 ? false : null"
                placeholder=""
              />
              <!-- <small :class="valideIcone ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du projet
                        </small> -->
            </validation-provider>
          </b-form-group>

          <!-- description -->
          <b-form-group>
            <label for="Description">Description</label>
            <b-form-textarea
              id="textarea"
              v-model="edit_description"
              placeholder=""
              rows="5"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-modal>

      <b-col lg="6" class="m-auto">
        <b-card class="pr-3 pl-3">
          <b-button
            variant="relief-primary"
            v-b-modal.modal-login
            class="add-btn position-absolute"
          >
            Ajouter
          </b-button>
          <b-list-group v-for="(parametre, index) in parametres" :key="parametre.id">
            <b-list-group-item class="d-flex">
              <span class="mr-1">
                <feather-icon icon="ToolIcon" size="16" />
              </span>
              <router-link to="">
                <!-- <span>{{index + 1}}</span> -->
                <span>{{ parametre.libelle }}</span>
              </router-link>
              <span>
                <div class="w-50 mx-auto d-flex justify-content-around">
                  <b-button
                    variant="gradient-primary"
                    class="btn-icon ml-2 mr-2"
                    v-b-modal.modal-update
                    @click="update(index)"
                  >
                    <feather-icon icon="Edit3Icon" />
                  </b-button>
                  <b-button
                    variant="gradient-danger"
                    class="btn-icon"
                    @click="confirmText(parametre.id, index)"
                  >
                    <feather-icon icon="Trash2Icon" />
                  </b-button>
                </div>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>

    <q-parametre />
  </validation-observer>
</template>

<script>
import {
  BRow,
  BCol,
  BModal,
  BFormInput,
  BFormGroup,
  BButton,
  VBModal,
  BForm,
  BLink,
  BFormCheckbox,
  BInputGroup,
  BInputGroupAppend,
  BImg,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from "@/views/pages/request";
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import QParametre from "./qParametre.vue";

export default {
  components: {
    flatPickr,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BModal,
    BFormGroup,
    VBModal,
    BForm,
    BLink,
    BFormCheckbox,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    required,
    email,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    axios,
    QParametre,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      parametres: [],
      libelle: "",
      valideLibelle: false,
      valideEditLibelle: false,
      edit_libelle: "",
      icone: "",
      edit_icone: "",
      description: "",
      edit_description: "",
      edit_index: "",
      parametreUp: "",
      indexUp: "",
      id_update: "",
      updateIndex: "",
      valideExist: false,
      exist_text: "",
    };
  },
  async mounted() {
    document.title = "Paramètres";
    try {
      const paramId = localStorage.getItem("param_id");
      const param_id = {
        id: paramId,
      };

      await axios
        .post(URL.PARAMETRE_LIST, param_id)
        .then((response) => {
          this.parametres = response.data.parametre;
          // this.parametres = response.data.parametre_entreprise;

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    validateLibelle() {
      if (!this.libelle) {
        this.valideLibelle = true;
      } else {
        this.valideLibelle = false;
      }
    },
    validateEditLibelle() {
      if (!this.edit_libelle) {
        this.valideEditLibelle = true;
      } else {
        this.valideEditLibelle = false;
      }
    },

    paramId(id) {
      localStorage.setItem("param_id", id);
    },

    //delete

    async deleteParametre(indentifiant, index) {
      const id_delete = {
        id: indentifiant,
      };
      try {
        await axios
          .post(URL.PARAMETRE_DESTROY, id_delete)
          .then((response) => {
            response.data;
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          });
        this.parametres.splice(index, 1);
      } catch (error) {
        console.log(error.type);
      }
    },

    // confirm delete
    confirmText(id, index) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Ce parametre sera supprimée définitivement !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.deleteParametre(id, index);
        }
      });
    },

    //update
    update(index) {
      this.parametreUp = this.parametres[index];
      this.edit_libelle = this.parametreUp.libelle;
      this.edit_icone = this.parametreUp.icone;
      this.edit_description = this.parametreUp.description;
      this.indexUp = index;
      this.edit_index = index;
      this.id_update = this.parametreUp.id;
    },

    async updateParametre(bvModalEvt) {
      const index = this.edit_index;
      this.validateEditLibelle();
      if (this.validateEditLibelle()) {
        bvModalEvt.preventDefault();
      } else {
        if (
          this.parametres[index].libelle != this.edit_libelle ||
          this.parametres[index].icone != this.edit_icone ||
          this.parametres[index].description != this.edit_description
        ) {
          this.$swal({
            title: "Êtes vous sûr de vouloir enregistrer",
            text: "Les modificiations seront prises en compte",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui",
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-outline-danger ml-1",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.value) {
              try {
                const data = {
                  id: this.id_update,
                  libelle: this.edit_libelle,
                  icone: this.edit_icone,
                  description: this.edit_description,
                };
                console.log(data);
                axios
                  .post(URL.PARAMETRE_UPDATE, data)
                  .then((response) => {
                    response.data;
                  })
                  .catch((error) => {
                    if (error.response) {
                      console.log(error.response.data);
                    }
                  });
                this.parametres[index].libelle = this.edit_libelle;
                this.parametres[index].icone = this.edit_icone;
                this.parametres[index].description = this.edit_description;
              } catch (error) {
                console.log(error);
              }
            }
          });
        }
      }
    },

    if_exist() {
      for (let index = 0; index < this.parametres.length; index++) {
        if (this.libelle == this.parametres[index].libelle) {
          this.valideExist = true;
          this.exist_text = "Ce nom existe déjà !";
          index = this.parametres.length;
        } else {
          this.valideExist = false;
        }
      }
    },

    //store
    async handleOk(bvModalEvt) {
      try {
        this.validateLibelle();
        this.if_exist();
        if (this.valideLibelle || this.valideExist) {
          bvModalEvt.preventDefault();
          this.handleSubmit();
        } else {
          const data = {
            libelle: this.libelle,
            icone: this.icone,
            description: this.description,
            id: localStorage.getItem("param_id"),
          };
          console.log(data);
          this.topEnd();
          await axios.post(URL.PARAMETRE_CREATEADMIN, data).then((response) => {
            this.parametreData = response.data;
            this.parametres.push(data);
            this.libelle = "";
            this.icone = "";
            this.description = "";
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    topEnd() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "type parametre enregistrée avec succès",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.add-new-client-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;
  &:hover {
    background-color: rgba($success, 0.12);
  }
}

.table-base {
  margin: 30px auto 0;
}

.tableau {
  box-shadow: 0px 6px 46px -21px rgba(0, 0, 0, 0.75);
}

.table-card {
  width: 100%;
  margin: auto;
  border-radius: 13px;
}

.table-card thead tr {
  border-radius: 13px;
  background-color: rgb(68, 68, 68) !important;
}

.table-card thead tr th {
  background-color: rgb(68, 68, 68) !important;
  color: white;
}

.add-btn {
  position: absolute;
  right: 0;
  top: -50px;
  background-color: #450077;
}
.none {
  display: none;
}
.block {
  display: inline-block;
}
</style>
