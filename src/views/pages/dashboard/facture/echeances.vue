<template>
    <div class="row">
      <div class="col-lg-12">

        <div class="row">
          <div class="col-lg-2">
            <b-form-group label="Nombre d'échéance" label-for="register-nom">
                <validation-provider #default="{ errors }" name="nom" rules="required">
                    <b-form-input id="register-nom" @change="mesure" v-model="nombreEcheance" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="0" type="number" />
                </validation-provider>
            </b-form-group>
          </div>
        </div>

        <div class="row">
            <div class="col-lg-5 col-md-5 m-auto" v-for="i in liste">
                <div class="row card pt-2 pb-2">
                    <div class="col-lg-12 col-md-12">
                       <span class="text-left h4 mb-2">Echéance <span class="p-0 m-0 text-primary">N˚ {{i+1}}</span></span>
                          <b-form-group label="Montant" label-for="register-nom">
                          <validation-provider #default="{ errors }" name="montant" rules="required">
                              <b-form-input id="register-nom" v-model="montant" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="0" />
                          </validation-provider>
                        </b-form-group>
                    </div>
                    <div class="col-lg-12 col-md-12">
                          <b-form-group label="Montant" label-for="register-nom">
                          <validation-provider #default="{ errors }" name="montant" rules="required">
                              <b-form-input id="register-nom" v-model="montant" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="0" />
                          </validation-provider>
                        </b-form-group>
                    </div>
                    <div class="col-lg-12 col-md-12">
                          <label for="taxeValue">Description :</label>
                          <b-form-textarea id="textarea" v-model="description" placeholder="Entrer les details de l'article ici" rows="5" max-rows="6"> </b-form-textarea>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg } from "bootstrap-vue";
  import Ripple from "vue-ripple-directive";
  import { required, email } from "@validations";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import vSelect from "vue-select";
  import URL from "@/views/pages/request";
  import axios from "axios";

  export default {
    components: {
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
    },
    directives: {
      Ripple,
    },
    data() {
      return {
          nombreEcheance:'',
          liste:[],
          montant:'',
          libelle:'',
          description:'',
          date_echeance:''
      };
    },
    async mounted(){
      document.title = 'Échéances'
    },
    methods: {
        mesure(){
            // this.liste = this.nombreEcheance
            this.liste=[]
            for (let index = 0; index < this.nombreEcheance; index++) {
              this.liste.push(index)
            }
            console.log(this.liste)
        },
      // confirm texrt
      confirmText(id) {
        this.$swal({
          title: "Êtes vous sûr?",
          text: "Cette taxe sera supprimée définitivement !",
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
            this.deleteTaxe(id);
          }
        });
      },
      isDigit(str) {
        return /^\d+$/.test(str);
      },
      isFloat(str) {
        return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
      },
      topEnd() {
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "Taxe enregistrée avec succès",
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

<style lang="scss" scoped>
  @import "@core/scss/vue/libs/vue-select.scss";
  .none {
    display: none;
  }
  .block {
    display: inline-block;
  }
</style>
