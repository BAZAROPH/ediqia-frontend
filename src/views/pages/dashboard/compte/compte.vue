
<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle taxe -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter un compte" @ok="handleOk">
            <validation-observer ref="registerForm">
                <b-form class="auth-register-form mt-2">
                    <div>
                        <h5 class="text-danger text-center">{{compte_exist}}</h5>
                    </div>
                    <!-- Numero compte -->
                    <b-libelle class="red">Numero de compte</b-libelle>
                    <b-form-group  label-for="register-numeroCompte">
                        <validation-provider #default="{ errors }" name="nom" rules="required">
                            <b-form-input id="register-nom" @input="validateNumeroCompte" v-model="numeroCompte" name="register-numeroCompte" :state="errors.length > 0 ? false:null" placeholder="AZ000000EH09" />
                            <small :class="valideNumeroCompte ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le numero du compte
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- Libelle -->
                    <b-libelle class="red">Libelle du compte</b-libelle>
                    <b-form-group label-for="register-libelle">
                        <validation-provider #default="{ errors }" name="libelle" rules="required">
                            <b-form-input id="register-libelle" @input="validateLibelle" v-model="libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="NSIA, ECOBANK" />
                            <small :class="valideLibelle? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le libelle
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- solde -->
                    <b-libelle class="red">Solde</b-libelle>
                    <b-form-group label-for="register-solde">
                        <validation-provider #default="{ errors }" name="solde" rules="required">
                            <b-form-input id="register-solde" @input="validateSolde" v-model="solde" type="text" name="register-solde" :state="errors.length > 0 ? false:null" placeholder="1000000000" />
                            <small :class="valideSolde ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer votre solde
                            </small>
                              <small :class="valeurGood ? 'block' : 'none'" class="text-danger">
                            Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                            Un POINT( . ) à la place de la virgule( , )
                        </small>
                        </validation-provider>
                    </b-form-group>

                      <!-- Description -->
                  <b-form-group>
                    <label for="taxeValue">Description (facultatif):</label>
                    <b-form-textarea id="textarea" v-model="description" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
                </b-form-group>                 
                </b-form>
            </validation-observer>
        </b-modal>






        <!-- Modal pour mettre à jour un compte   -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier un client"  @ok="updateCompte">
            <b-form class="auth-register-form mt-2">
                <!-- nom -->
                <b-libelle class="red">Numero du compte</b-libelle>
                <b-form-group  label-for="register-numero_compte">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-numero" @input="validateEditNumeroCompte" v-model="editNumeroCompte" name="register-numero_compte" :state="errors.length > 0 ? false:null" placeholder="AZE12000067GF" />
                        <small :class="valideEditNumeroCompte ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le numero du compte
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- libelle -->
                <b-libelle class="red">libelle du compte</b-libelle>
                <b-form-group label-for="register-libelle">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                        <b-form-input id="register-libelle" @input="validateEditLibelle" v-model="editLibelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="NSIA, ECOBANK" />
                        <small :class="valideEditLibelle ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libelle du compte
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- email -->
                 <!-- solde -->
                    <b-libelle class="red">Solde</b-libelle>
                    <b-form-group  label-for="register-solde">
                        <validation-provider #default="{ errors }" name="solde" rules="required">
                            <b-form-input id="register-solde" @input="validateEditSolde" v-model="editSolde"  name="register-solde" :state="errors.length > 0 ? false:null" placeholder="1000000000" />
                            <small :class="valideEditSolde ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer votre solde
                            </small>
                             <small :class="valeurEditGood ? 'block' : 'none'" class="text-danger">
                            Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                            Un POINT( . ) à la place de la virgule( , )
                        </small>
                        </validation-provider>
                    </b-form-group>

                <b-form-group>
                    <label for="taxeValue">Description (Facultatif):</label>
                    <b-form-textarea id="textarea" v-model="editDescription" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
                </b-form-group>  
            </b-form>
        </b-modal>


        <!-- Tableau pour afficher les taxes -->
        <!-- <div class="tableau">
            <table class="table position-relative table-card table-bordered mt-5 pt-3">
                <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">
                    Ajouter
                </b-button>
                <thead>
                    <tr class="text-center">
                        <th scope="col">#</th>
                        <th scope="col">N° compte</th>
                        <th scope="col">Libelle</th>
                        <th scope="col">Solde</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="text-center" id="table_line" v-for="(compte, index) in comptes" :key="compte.id">
                        <th scope="row" class="col-1">{{ index + 1 }}</th>
                        <td class="col">
                            <p>{{ compte.numero_compte }}</p>
                        </td>
                        <td class="col">
                            <p>{{ compte.libelle }}</p>
                        </td>
                        <td class="col">
                            <p>{{ compte.solde }}</p>
                        </td>
                       
                        <td class="col">
                            <p>{{ compte.description }}</p>
                        </td>
                        <td class="col-3">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button variant="gradient-primary" class="btn-icon mr-2 edit-color" v-b-modal.modal-update @click="update(index)">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(compte.id,index)">
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->


        <b-card
            no-body
            class="px-2"
        >
            <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvelle taxe -->
            <b-row>
                <!-- Per Page -->
                <b-col
                cols="12"
                md="6"
                class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1"
                >
                    <label>Entrées</label>
                    <v-select
                        v-model="perPage"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="perPageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block ml-50 mr-1"
                    />
                    <b-button
                        variant="gradient-primary"
                        v-b-modal.modal-login
                    >
                        Créer un nouveau compte
                    </b-button>
                    </b-col>

                    <!-- Search -->
                    <b-col
                    cols="12"
                    md="6"
                    class="mt-1"
                    >
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input
                            v-model="filtreCompte"
                            class="d-inline-block mr-1"
                            placeholder="Rechercher par le nom du compte..."
                            />
                        </div>
                    </b-col>
            </b-row>


            <!-- Le tableau affichant les taxes -->
            <b-table
                hover
                responsive
                primary-key="id"
                :per-page="perPage"
                :current-page="currentPage"
                :items="comptes"
                :fields="tableColumns"
                :filter="filtreCompte"
                show-empty
                empty-text="Aucun comptes enregistrés"
                class="bg-white mt-2 text-center"
            >
                <!-- Bouton d'action -->
                <template #cell(solde)="data">
                    <p>{{ formatMoney(data.item.solde) }}</p>
                </template>
                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-2 edit-color" v-b-modal.modal-update @click="update(data.item.id)">
                        <feather-icon icon="Edit3Icon" />
                    </b-button>
                    <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(data.item.id)">
                        <feather-icon icon="Trash2Icon" />
                    </b-button>
                </template>
            </b-table>


            <!-- Les boutons de pagination -->
            <div class="mx-2 mb-2 pb-1">
                <b-row>
                    <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-start"
                    >
                    <span class="text-muted"></span>
                    </b-col>
                    <!-- Pagination -->
                    <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-end"
                    >
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="compteTotal"
                        :per-page="perPage"
                        first-number
                        last-number
                        class="mb-0 mt-1 mt-sm-0"
                        prev-class="prev-item"
                        next-class="next-item"
                    >
                        <template #prev-text>
                        <feather-icon
                            icon="ChevronLeftIcon"
                            size="18"
                        />
                        </template>
                        <template #next-text>
                        <feather-icon
                            icon="ChevronRightIcon"
                            size="18"
                        />
                        </template>
                    </b-pagination>

                    </b-col>

                </b-row>
            </div>
        </b-card>
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
    import { VueTelInput } from 'vue-tel-input'
    export default {
        components: {
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
        data() {
            return {
                // validation
                config : {
                    headers: {
                        'Accept': 'application/json'
                    },
                },
                numeroCompte:'',
                valideNumeroCompte:false,

                libelle:'',
                valideLibelle:false,

                solde:'',
                valideSolde:false,

                description:'',
                comptes: [],
                compte_exist:'',

                //validation Update
                editNumeroCompte:'',
                valideEditNumeroCompte:false,
                editLibelle:'',
                valideEditLibelle:false,
                editSolde:'',
                valideEditSolde:false,
                editDescription:'',
                compteUp:'',
                edit_index: "",

                valeurGood: false,
                valeurEditGood: false,
                returnData: "",
                required,
                valideExiste: false,              
                id_update: "",
                updateIndex: "",

                perPage: 3,
                currentPage: 1,
                compteTotal: 0,
                tableColumns: [
                    { key: 'numero_compte', label: 'N Compte', sortable: true },
                    { key: 'libelle', label: 'Libellé', sortable: true },
                    { key: 'solde', label: 'Solde', sortable: true, },
                    { key: 'description', label: 'Description', sortable: true, },
                    { key: 'actions' },
                ],
                filtreCompte: '',
                perPageOptions: [3, 5, 10, 15]
                
            };
        },
        async mounted() {
            document.title = 'Comptes'
            try {
                await axios
                    .get(URL.COMPTE_LIST)
                    .then((response) => {
                        this.returnData = response;
                        this.compteTotal = response.data[0].length
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
                for (let index = 0; index < this.returnData.data[0].length; index++) {
                    this.comptes.push(this.returnData.data[0][index]);
                }
            } catch (error) {
                console.log(error);
            }
        },
        methods: {

            formatMoney(money) {
                const formatter = new Intl.NumberFormat('ci-CI', {
                    style: 'currency',
                    currency: 'XOF',
                    minimumFractionDigits: 2
                })

                return formatter.format(money)
            },

          //validationStore
          validateNumeroCompte(){
            if(!this.numeroCompte){
              this.valideNumeroCompte=true
            }else{
              this.valideNumeroCompte=false
            }
          },

          validateLibelle(){
            if(!this.libelle){
              this.valideLibelle =true
            }else{
              this.valideLibelle = false
            }
          },

          validateSolde(){
            if(!this.solde){
              this.valideSolde = true
            }else{
              this.valideSolde= false
            }

             if (!this.solde) {
                    this.valideSolde = true;
                } else {
                    this.valideSolde = false;
                }
                if (this.solde&& this.isFloat(this.solde) === false) {
                    if (this.isDigit(this.solde) === false) {
                        this.valeurGood = true;
                    } else {
                        this.valeurGood = false;
                    }
                } else {
                    this.valeurGood = false;
                }
          },

          //validationUpdate
          validateEditNumeroCompte(){
            if (!this.editNumeroCompte) {
              this.valideEditNumeroCompte = true
            }else{
            this.valideEditNumeroCompte = false
            }
          },

            validateEditLibelle(){
            if(!this.editLibelle){
              this.valideEditLibelle =true
            }else{
              this.valideEditLibelle = false
            }
          },

          validateEditSolde(){
            if(!this.editSolde){
              this.valideEditSolde = true
            }else{
              this.valideEditSolde= false
            }

            if (!this.editSolde) {
                    this.valideEditSolde = true;
                } else {
                    this.valideEditSolde = false;
                }
                if (this.editSolde&& this.isFloat(this.editSolde) === false) {
                    if (this.isDigit(this.editSolde) === false) {
                        this.valeurEditGood = true;
                    } else {
                        this.valeurEditGood = false;
                    }
                } else {
                    this.valeurEditGood = false;
                }
          },


          isDigit(str) {
                return /^\d+$/.test(str);
            },
            isFloat(str) {
                return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
            },


          


              validateValeur() {
                if (!this.solde) {
                    this.valideSolde = true;
                } else {
                    this.valideSolde = false;
                }
                if (this.solde&& this.isFloat(this.solde) === false) {
                    if (this.isDigit(this.solde) === false) {
                        this.valeurEditGood = true;
                    } else {
                        this.valeurEditGood = false;
                    }
                } else {
                    this.valeurEditGood = false;
                }
            },


            // confirm texrt
            confirmText(id) {
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
                        this.deleteCompte(id);
                    }
                });
            },
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
            async deleteCompte(identifiant) {
                try {
                    const id = {
                        id: identifiant,
                    };
                    await axios
                        .post(URL.COMPTE_DESTROY, id)
                        .then((response) => {
                            if (response.data) {
                                axios.get(URL.COMPTE_LIST).then((response) => {
                                    this.comptes = response.data[0]
                                     this.compteTotal = response.data[0].length
                                }).catch((error) => {
                                    console.log(error.response.data.errors);
                                })
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(indice) {
                const element = this.comptes.filter(item => {
                    return item.id === indice
                })
                this.compteUp = element[0]
                this.editNumeroCompte = this.compteUp.numero_compte;
                this.editLibelle= this.compteUp.libelle;
                this.editSolde = this.compteUp.solde;
                this.editDescription = this.compteUp.description;
                this.edit_index = indice;
                this.id_update = this.compteUp.id;

            },
            async updateCompte(bvModalEvt) {
                const compte = this.compteUp
                this.validateEditNumeroCompte()
                this.validateEditLibelle()
                this.validateEditSolde()
                if (this.valideEditNumeroCompte|| this.valideEditLibelle || this.valideEditSolde) {
                    bvModalEvt.preventDefault();
                } else {
                    if (
                        compte.numero_compte != this.editNumeroCompte ||
                        compte.libelle != this.editLibelle||
                        compte.solde != this.editSolde ||
                        compte.description != this.editDescription
                      
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
                                        numero_compte: this.editNumeroCompte,
                                        libelle: this.editLibelle,
                                        solde: this.editSolde,
                                        description: this.editDescription,
                                    };
                                    
                                    axios
                                        .post(URL.COMPTE_UPDATE, data,this.config)
                                        .then((response) => {
                                            if (response.data) {
                                                axios.get(URL.COMPTE_LIST).then((response) => {
                                                    this.comptes = response.data[0]
                                                    this.comptes = response.data[0]
                                                    this.compteTotal = response.data[0].length
                                                }).catch((error) => {
                                                    console.log(error.response.data.errors);
                                                })
                                            }
                                            
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
                }
            },
             if_exist() {
                for (let index = 0; index < this.comptes.length; index++) {
                  if (this.numeroCompte == this.comptes[index].numero_compte) {
                      this.valideExiste = true;
                        this.compte_exist = "Ce compte existe déjà! Veuillez vérifier le numero";
                    } else {
                        this.valideExiste = false;
                    }
                }
            },
          
           
            async handleOk(bvModalEvt) {
              this.validateNumeroCompte(),
               this.validateLibelle(),
               this.validateSolde()
                try {
                    this.validateNumeroCompte();
                    this.validateLibelle();
                    this.validateSolde();
                    this.if_exist();
                  
                    if (this.valideNumeroCompte || this.valideLibelle|| this.valideSolde ||this.valideExiste || this.valeurGood) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                      
                        const newCompte= {
                            numero_compte: this.numeroCompte,
                            libelle: this.libelle,
                            solde: this.solde,
                            description:this.description
                        };
                        this.topEnd();
                          console.log(newCompte)
                        await axios.post(URL.COMPTE_CREATE, newCompte,this.config).then((response) => {
                            // this.userData = response.data;
                            console.log(response.data)
                        });
                            this.comptes.push(newCompte);
                             this.numeroCompte = "";
                             this.libelle = "";
                             this.solde = "";
                             this.description = "";
                    }
                } catch (error) {
                    console.log(error);
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
    .red:after{
        content: " *";
        color: red;
    }
</style>
