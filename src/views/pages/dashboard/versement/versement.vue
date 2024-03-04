<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle taxe -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Nouveau versement" @ok="handleOk">
            <b-form>
                <div>
                    <h5 class="text-danger text-center">{{exist_text}}</h5>
                </div>
                <!-- nom -->
                <b-form-group label="Compte" label-for="register-nom">
                    <validation-provider #default="{  }" name="compte" rules="required">
                          <v-select v-model="selectedCompte" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="compte" />
                        <small :class="valideCompte? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le compte
                        </small>
                    </validation-provider>
                </b-form-group>
                <!-- valeur -->
                <b-form-group label="montant" label-for="register-montant">
                    <validation-provider #default="{ errors }" name="montant" rules="required">
                        <b-form-input id="register-montant" @input="validateMontant" v-model="montant" name="register-montant" :state="errors.length > 0 ? false:null" placeholder="18.000000" />
                        <small :class="valideMontant ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le montant
                        </small>
                        <small :class="valeurGood ? 'block' : 'none'" class="text-danger">
                            Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                            Un POINT( . ) à la place de la virgule( , )
                        </small>
                    </validation-provider>
                </b-form-group>
            </b-form>
        </b-modal>

        <!-- Modal pour mettre à jour une taxe déjà ajouté -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Enregistrer" cancel-title="Annuler" centered title="Modifier un versement" @ok="updateVersement()">
            <b-form>
                <!-- nom -->
                 <b-form-group label="Compte" label-for="register-nom">
                    <validation-provider #default="{  }" name="compte" rules="required">
                          <v-select v-model="selectedEditCompte" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="compte" />
                        <small :class="valideEditCompte ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le compte
                        </small>
                    </validation-provider>
                </b-form-group>
                <!-- valeur -->
                <b-form-group label="Montant" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateEditMontant" v-model="edit_montant" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="18.000000" />
                        <small :class="valideEditMontant ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le montant
                        </small>
                        <small :class="valeurEditGood ? 'block' : 'none'" class="text-danger">
                            Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                            Un POINT( . ) à la place de la virgule( , )
                        </small>
                    </validation-provider>
                </b-form-group>
            </b-form>
        </b-modal>
        <!-- Tableau pour afficher les taxes -->
        <div class="tableau">
            <table class="table position-relative table-card table-bordered mt-5 pt-3">
                <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">
                    Ajouter
                </b-button>
                <thead>
                    <tr class="text-center">
                        <th class="align-middle" scope="col-1">#</th>
                        <th class="align-middle" scope="col-5">Compte</th>
                        <th class="align-middle" scope="col-3">Montant</th>
                        <th class="align-middle" scope="col-3">Action</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="text-center" id="table_line" v-for="(versement, index) in versements" :key="versement.id">
                        <th class="align-middle col-1" scope="row" >{{ index + 1 }}</th>
                        <td class="col-6">
                            <p>{{ versement.compte }}</p>
                        </td>
                        <td class="col-2">
                            <p>{{ versement.montant }}</p>
                        </td>
                        <td class="col-3">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button variant="gradient-primary" class="btn-icon mr-2" v-b-modal.modal-update @click="update(index)">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(versement.id,index)">
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
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
                compte: "",
                valideCompte:"",
                selectedCompte: "Selectionnez un compte",

                montant:"",
                valideMontant:"",
                 erreur: false,
                versements: [],

                valeurGood: false,
                selectedEditCompte:"",
                valideEditCompte:false,
                edit_montant:"",
                valideEditMontant:false,
                valeurEditGood:false,

               versementUp:"",
               edit_index:"",
               edit_update:"",








                valideNom: false,
                valeur: "",
                valideValeur: false,
                newTaxeName: "",
                newTaxeValue: "",
                taxes: [],
                updateIndex: "",
                valideEditValeur: false,
                valideEditNom: false,
                edit_nom: "",
                edit_valeur: "",
                taxeUp: "",
                indexUp: "",
                valideExist: false,
                exist_text: "",
                // valeurGood: false,
                valeurEditGood: false,
            };
        },
        async mounted() {
            document.title = 'Versement'  
            try {

                await axios
                .get(URL.VERSEMENT_LIST)
                .then((response) => {
                    this.compte = response.data;
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error.response.data.errors);
                });

                  // /compte
            //  for (let index = 0; index < this.userData.data[0].length; index++) {
            //    this.compte.push(`${this.userData.data[0][index].libelle}`);
            //  }

                await axios
                    .get(URL.VERSEMENT_)
                    .then((response) => {
                        this.returnData = response;
                        for (let i = 0; i < this.returnData.data[0].length; i++) {
                            console.log(this.returnData.data[0])
                            console.log(this.returnData.data[1])
                            if(this.returnData.data[0][i].compte_id===this.returnData.data[1][i][0].id){
                                this.verse={
                                    id:this.returnData.data[0][i].id,
                                    montant:this.returnData.data[0][i].montant,
                                    compte:this.returnData.data[1][i][0].libelle,
                                }
                                this.versements.push(this.verse);
                                console.log(this.versements)
                            }
                            
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            // confirm texrt
           
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            isFloat(str) {
                return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
            },
            deleteVersement(identifiant, index) {
                try {
                    const id = {
                        id: identifiant,
                    };
                    axios
                        .post(URL.VERSEMENT_DESTROY, id)
                        .then((response) => {
                            response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.versements.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
//confirm text delete
            confirmText(id, index) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Ce client sera supprimé définitivement !",
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
                        this.deleteVersement(id, index);
                    }
                });
            },

           

            validateCompte() {
         if (this.selectedCompte== "Selectionnez un compte") {
           this.valideCompte = true;
           this.erreur = true;
         } else {
           this.valideCompte = false;
           this.erreur = false;
         }
            },

            validateMontant() {
                if (!this.montant) {
                    this.valideMontant= true;
                } else {
                    this.valideMontant= false;
                }

                if (this.montant && this.isFloat(this.montant) === false) {
                    if (this.isDigit(this.montant) === false) {
                        this.valeurGood = true;
                    } else {
                        this.valeurGood = false;
                    }
                } else {
                    this.valeurGood = false;
                }
            },


              validateEditCompte() {
         if (this.selectedEditCompte == "Selectionnez un compte") {
           this.valideEditCompte = true;
           this.erreur = true;
         } else {
           this.valideEditCompte = false;
           this.erreur = false;
         }
            },

            validateEditMontant() {
                if (!this.edit_montant) {
                    this.valideEditMontant= true;
                } else {
                    this.valideEditMontant= false;
                }

                if (this.edit_montant && this.isFloat(this.edit_montant) === false) {
                    if (this.isDigit(this.edit_montant) === false) {
                        this.valeurEditGood = true;
                    } else {
                        this.valeurEditGood = false;
                    }
                } else {
                    this.valeurEditGood = false;
                }
            },


             // confirm texrt
            
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
            // if_exist() {
            //     for (let index = 0; index < this.taxes.length; index++) {
            //         if (this.nom == this.taxes[index].libelle) {
            //             this.valideExist = true;
            //             this.exist_text = "Cette taxe existe déjà !";
            //             index = this.taxes.length;
            //         } else {
            //             this.valideExist = false;
            //         }
            //     }
            // },
            async handleOk(bvModalEvt)  {
                try {
                    this.validateMontant();
                     this.validateCompte();
                    // this.if_exist();
                    // Prevent modal from closing
                    if (this.valideCompte || this.valideMontant || this.valideExist || this.valeurGood) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                       
                        const data = {
                            compte_id: this.selectedCompte.id,
                            montant: this.montant,
                        };
                        console.log(data);
                        this.topEnd();
                        await axios.post(URL.VERSEMENT_CREATE, data).then((response) => {
                            // this.versementData = response.data;
                            if (response) {
                                axios
                                    .get(URL.VERSEMENT_)
                                    .then((response) => {
                                        this.versements = []
                                        this.returnData = response;
                                        for (let i = 0; i < this.returnData.data[0].length; i++) {
                                            if(this.returnData.data[0][i].compte_id===this.returnData.data[1][i][0].id){
                                                this.verse={
                                                    id:this.returnData.data[0][i].id,
                                                    montant:this.returnData.data[0][i].montant,
                                                    compte:this.returnData.data[1][i][0].libelle,
                                                }
                                                this.versements.push(this.verse);
                                                console.log(this.versements)
                                            }
                                            
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        });
                            this.montant = "";
                            this.selectedCompte = "";
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            

              update(indice) {
                this.versementUp = this.versements[indice];
                this.selectedEditCompte = this.versementUp.compte;
                this.edit_montant= this.versementUp.montant;
                this.edit_index = indice;
                this.id_update = this.versementUp.id;

            },
            async updateVersement(bvModalEvt) {
                const index = this.edit_index;
                this.validateEditCompte()
                this.validateEditMontant()
                if (this.valideEditCompte || this.valideEditMontant) {
                    bvModalEvt.preventDefault();
                } else {
                    if (
                        this.versements[index].compte != this.selectedEditCompte||
                        this.versements[index].montant != this.edit_montant
                        
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
                        }).then(async (result) => {
                            if (result.value) {
                                try {
                                    const data = {
                                        id: this.id_update,
                                        compte_id: this.selectedEditCompte.id,
                                        montant: this.edit_montant,
                                    };

                                    console.log(data)
                                    
                                    await axios
                                        .post(URL.VERSEMENT_UPDATE, data,this.config)
                                        .then((response) => {
                                            response.data;
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    this.versements[index].compte_id = this.selectedEditCompte.id 
                                    this.versements[index].compte = this.selectedEditCompte.libelle
                                    this.versements[index].montant = this.edit_montant
                                   
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
                }
            },
        },
    };
</script>

<style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
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
