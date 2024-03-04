<template>
  <section>
    <div class="position-relative table-responsive table-base">       
      <!-- Tableau pour afficher les taxes -->
      <div class="tableau">
        <table class="table position-relative table-card table-bordered mt-5 pt-3">
          <b-button variant="relief-primary"  class="add-btn position-absolute " @click="redirection" >
            Ajouter
          </b-button>
          
          <!-- <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">
            Enregistrer creancier
          </b-button> -->
          <thead>
            <tr class="text-center">
              <th scope="col-3">no</th>
              <th scope="col-3">Nom</th>
              <th scope="col-3">Prenoms</th>
              <th scope="col-3">Email</th>
              <th scope="col-3">Contact</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr class="text-center" id="table_line" v-for="(user, index) in users" :key="user.id">
              <th scope="row" class="col-1">{{ index + 1 }}</th>
              <td class="col-6">
                <p>{{ user.nom }}</p>
              </td>
              <td class="col-2">
                <p>{{ user.Prenoms }}</p>
              </td>
              <td class="col-6">
                <p>{{ user.Email }}</p>
              </td>
              <td class="col-6">
                <p>{{ taxe.contact }}</p>
              </td>
              <td class="col-3">
                <div class="w-50 mx-auto d-flex justify-content-around">
                  <b-button variant="gradient-primary" class="btn-icon" v-b-modal.modal-update @click="update(taxe.taxeName)">
                    <feather-icon icon="Edit3Icon" />
                  </b-button>
                  <b-button variant="gradient-danger" class="btn-icon" @click="deleteTaxe(taxe.taxeName)">
                    <feather-icon icon="Trash2Icon" />
                  </b-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

</template>







<script>
  import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg,BFormTextarea,VBToggle } from "bootstrap-vue"
  import Ripple from "vue-ripple-directive"
  import store from '@/store'

  import { required, email } from "@validations";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import vSelect from 'vue-select'

  import URL from '@/views/pages/request'
  import axios from "axios"; 

  export default {
    components: {
      vSelect,
      VBToggle,
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
      BFormTextarea,
      BInputGroupAppend,
      // validations
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      Ripple,
      'b-toggle': VBToggle,
    },
    data() {
      return {

        // validation       
        libelle:'',
        valideLibelle:false,

        prenoms:'',
        valideMo:false,

        selectedCompte: "",
        selectedCreancier: "",

        optionType:["Personne physique", "Banque", "Micro finance", "Autre"],




        required,
        select: 'Selectionner le compte',
        select: 'Selectionner le créancier',
        status_id:'',
        option: [{ title: 'Bancaire' }, { title: 'Epargne' }],
        option1: [{ title: 'Particulier' }, { title: 'Entreprise' }],

        newTaxeValue: "",

        fakeData: [
          {
            taxeName: "Madela",
            taxeValue: "$78",
          },
          {
            taxeName: "Banane",
            taxeValue: "$18",
          },
        ],
        updateIndex: "",
        users:"",
      };
    },

    //collecte listes des utilisateurs de l'entreprise connectée 
    async mounted() {
        document.title = 'Nouvel utilisateur'  
        try {
            await axios
                .get(URL.USER_INFO)
                .then((response) => {
                this.returnData = response;
                })
                .catch((error) => {
                console.log(error.response.data.errors);
                });
                
            for (let index = 0; index < this.returnData.data[0].length; index++) {
                this.clients.push(this.returnData.data[0][index])
                
            }
        } catch (error) {
            console.log(error);
        }
    },
     //End collecte listes des utilisateurs de l'entreprise connectée 


    methods: {
     async handleOk(bvModalEvt) {
        this.validateLibelle(),
        this.validateMontant(),
        this.validateTaux(),
        this.validateDelai(),
        this.validateEmprunt(),
        this.validateRemboursement()

          try {
              this.validateLibelle();
              this.validateMontant();
              this.validateTaux();
              this.validateDelai();
              this.validateEmprunt();
              this.validateRemboursement();
              // Prevent modal from closing

              if (this.valideLibelle || this.valideMontant || this.valideTaux || this.valideDelai || this.valideEmprunt||this.valideRemboursement) {
                console.log(
                  'oooooooo'
                )
                  bvModalEvt.preventDefault();
                  this.handleSubmit();
              } else {
                  const newEmprunt = {
                      libelle: this.libelle,
                      montant: this.montant,
                      taux: this.taux,
                      delai:this.delai,
                      date_emprunt:this.date_emprunt,
                      date_remboursement:this.date_remboursement,
                      description: this.description
                  };
                  this.topEnd();
                  await axios.post(URL.EMPRUNT_CREATE, newEmprunt).then((response) => {
                      this.userData = response.data;
                      this.emprunts.push(newEmprunt);
                  });
                  this.libelle = "";
                  this.montant = "";
                  this.taux = "";
                  this.delai = "";
                  this.date_emprunt = "";
                  this.date_remboursement = "";
                  this.description = "";
              }
          } catch (error) {
              console.log(error);
          }
      },
      redirection(){
       this.$router.push('/newUsers')
      },


      obligatoryCompte() {
        // console.log(this.selectedCompte.title)
        // if (this.selectedCompte.title) {

        // } else {

        // }

      if (this.selectedCompte.title === "") {
        this.valideCompte = true;
        this.erreur = true;
        console.log("epargne")
      } else {
        this.valideCompte = false;
        this.erreur = false;
        console.log('pas epargne')
      }
    },
      deleteClient(indice) {
        const taxeIndex = this.fakeData.findIndex((taxe) => taxe.taxeName === indice);
        this.fakeData.splice(taxeIndex, 1);
        console.log(taxeIndex);
      },
      update(indice) {
        const taxeIndex = this.fakeData.findIndex((taxe) => taxe.taxeName === indice);
        this.newTaxeName = this.fakeData[taxeIndex].taxeName;
        this.newTaxeValue = this.fakeData[taxeIndex].taxeValue;
        this.updateIndex = taxeIndex;
      },
      updateClient(index) {
        this.fakeData[index].taxeName = this.newTaxeName;
        this.fakeData[index].taxeValue = this.newTaxeValue;
      },


    },
  };
</script>






<style lang="scss">

      // @import '@core/scss/vue/libs/vue-select.scss';
      //   .table-base {
      //     margin: 30px auto 0;
      //   }

        @import "@core/scss/vue/libs/vue-select.scss";
          .add-new-client-header {
              padding: $options-padding-y $options-padding-x;
              color: $success;
              &:hover {
              background-color: rgba($success, 0.12);
              }
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
