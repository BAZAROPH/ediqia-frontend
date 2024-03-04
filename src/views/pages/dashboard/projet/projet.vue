<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle taxe -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Nouveau projet" @ok="handleOk">
            <b-form>
                <div>
                    <h5 class="text-danger text-center">{{exist_text}}</h5>
                </div>
                <!-- libelle -->
                <b-form-group  label-for="register-nom">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                        <label for="">Libellé <span class="p-0 text-danger h6">*</span></label>
                        <b-form-input id="register-nom" @input="validateLibelle" v-model="libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="libelle du projet" />
                        <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du projet
                        </small>
                    </validation-provider>
                </b-form-group>
                
                <!-- Budget -->
                <b-form-group label-for="register-nom">
                    <validation-provider #default="{ errors }" name="budget" rules="required">
                        <label for="">Budget <span class="p-0 text-danger h6">*</span></label>
                        <b-form-input id="register-nom" @input="validateBudget" v-model="budget" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Budget alloué au projet" />
                        <small :class="valideBudget ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le budget alloué au projet
                        </small>
                        <small :class="budgetGood ? 'block' : 'none'" class="text-danger">
                            Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                            Un POINT( . ) à la place de la virgule( , )
                        </small>
                    </validation-provider>
                </b-form-group>
                <b-form-group>
                    <label for="">Date de début <span class="p-0 text-danger h6">*</span></label>
                    <validation-provider>
                        <flat-pickr
                        v-model="dateDebut"
                        class="form-control"
                        />
                        <small :class="valideDateDebut ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la date de début du projet
                        </small>
                    </validation-provider>
                </b-form-group>

                <b-form-group>
                    <label for="">Date de fin <span class="p-0 text-danger h6">*</span></label>
                    <validation-provider>
                        <flat-pickr
                        v-model="dateFin"
                        class="form-control"
                        @input="validateDate"
                        />
                        <small :class="valideDateFin ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la date de fin du projet
                        </small>
                        <small :class="datePasCorrecte ? 'block' : 'none'" class="text-danger">
                            La date de début doit être inférieure à la date de fin
                        </small>
                    </validation-provider>
                </b-form-group>
                <b-form-group>
                    <label for="taxeValue">Description</label>
                    <b-form-textarea id="textarea" v-model="description" placeholder="Entrer les details du projet ici" rows="5" max-rows="6"></b-form-textarea>
                </b-form-group>
            </b-form>
        </b-modal>

        <!-- Modal pour mettre à jour une taxe déjà ajouté -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Enregistrer" cancel-title="Annuler" centered title="Modifier la taxe" @ok="updateCompte()">
            <b-form>
                <!-- libelle -->
                <b-form-group label-for="register-nom">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                        <label for="">Libellé <span class="p-0 text-danger h6">*</span></label>
                        <b-form-input id="register-nom" @input="validateEditLibelle" v-model="edit_libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="libelle du projet" />
                        <small :class="valideEditLibelle ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du projet
                        </small>
                    </validation-provider>
                </b-form-group>
                
                <!-- Budget -->
                <b-form-group label-for="register-nom">
                    <validation-provider #default="{ errors }" name="budget" rules="required">
                        <label for="">Budget <span class="p-0 text-danger h6">*</span></label>
                        <b-form-input id="register-nom" @input="validateEditBudget" v-model="edit_budget" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Budget alloué au projet" />
                        <small :class="valideEditBudget ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le budget alloué au projet
                        </small>
                        <small :class="budgetEditGood ? 'block' : 'none'" class="text-danger">
                            Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                            Un POINT( . ) à la place de la virgule( , )
                        </small>
                    </validation-provider>
                </b-form-group>
                <b-form-group>
                    <label for="">Date de début <span class="p-0 text-danger h6">*</span></label>
                    <validation-provider>
                        <flat-pickr
                        v-model="edit_dateDebut"
                        class="form-control"
                        @input="validateEditDateDebut"
                        />
                        <small :class="valideEditDateDebut ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la date de début du projet
                        </small>
                    </validation-provider>
                </b-form-group>

                <b-form-group>
                    <label for="">Date de fin <span class="p-0 text-danger h6">*</span></label>
                    <validation-provider>
                        <flat-pickr
                        v-model="edit_dateFin"
                        class="form-control"
                        @input="validateEditDate"
                        />
                        <small :class="valideEditDateFin ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la date de fin du projet
                        </small>
                        <small :class="dateEditPasCorrecte ? 'block' : 'none'" class="text-danger">
                            La date de doit être inférieure à la date de fin
                        </small>
                    </validation-provider>
                </b-form-group>

                <b-form-group>
                    <label for="taxeValue">Description</label>
                    <b-form-textarea id="textarea" v-model="edit_description" placeholder="Entrer les details du projet ici" rows="5" max-rows="6"> </b-form-textarea>
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
                        <th class="align-middle" scope="col-5">Libelle</th>
                        <th class="align-middle" scope="col-5">Budget</th>
                        <th class="align-middle" scope="col-3">Date de début</th>
                        <th class="align-middle" scope="col-3">Date de fin</th>
                        <th class="align-middle" scope="col-3">Description</th>
                        <th class="align-middle" scope="col-3">Action</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="text-center" id="table_line" v-for="(projet, index) in projets" :key="projet.id">
                        <th class="align-middle col-1" scope="row" >{{ index + 1 }}</th>
                        <td class="col-6">
                            <p>{{ projet.libelle }}</p>
                        </td>
                        <td class="col-6">
                            <p>{{ projet.budget }}</p>
                        </td>
                        <td class="col-2">
                            <p>{{ projet.date_debut }}</p>
                        </td>
                        <td class="col-2">
                            <p>{{ projet.date_fin }}</p>
                        </td>
                        <td class="col-2">
                            <p>{{ projet.description }}</p>
                        </td>
                        <td class="col-3">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button variant="gradient-primary" class="btn-icon mr-2" v-b-modal.modal-update @click="update(index)">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(projet.id,index)">
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
    import flatPickr from 'vue-flatpickr-component'

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
        },
        directives: {
            Ripple,
        },
        data() {
            return {
            datePasCorrecte:false,
            dateEditPasCorrecte:false,
            projets:[],
            description:'',
            edit_description:'',
              valideLibelle:false,
              libelle:'',
              valideEditLibelle:false,
              edit_libelle:'',
              valideBudget:false,
              budget:'',
              budgetGood:false,
              valideEditBudget:false,
              edit_budget:'',
              budgetEditGood:false,
              date: null,
                dateDebut: null,
                valideDateDebut:false,
                valideDateFin:false,
                dateFin: null,
                edit_dateDebut: null,
                valideEditDateDebut:false,
                edit_dateFin: null,
                valideEditDateFin:false,
                projetUp:'',
                indexUp: "",
                valideExist: false,
                exist_text: "",



                nom: "",
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
                
                valeurGood: false,
                valeurEditGood: false,
            };
        },
        async mounted() {
            document.title = 'Projet'  
            try {
                await axios
                    .get(URL.PROJET_LIST)
                    .then((response) => {
                        this.returnData = response;
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
                for (let index = 0; index < this.returnData.data[1].length; index++) {
                    this.projets.push(this.returnData.data[1][index]);
                }
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
        isDigit(str) {
            return /^\d+$/.test(str);
        },
        isFloat(str) {
            return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
        },
        validateDateDebut(){
            if(!this.dateDebut){
                this.valideDateDebut=true
            }
        },
        validateDateFin(){
            if(!this.dateFin){
                this.valideDateFin=true
            }
        },
        validateDate(){
            if(this.dateDebut>this.dateFin){
                this.datePasCorrecte=true
            }
        },
        validateEditDate(){
            if(this.edit_dateDebut>this.edit_dateFin){
                this.dateEditPasCorrecte=true
            }
        },
        validateEditDateDebut(){
            if(!this.edit_dateDebut){
                this.valideEditDateDebut=true
            }
        },
        validateEditDateFin(){
            if(!this.edit_dateFin){
                this.valideEditDateFin=true
            }
        },
          validateLibelle(){
            if(!this.libelle){
              this.valideLibelle=true
            }else{
                this.valideLibelle=false
            }
          },
          validateEditLibelle(){
            if(!this.edit_libelle){
              this.valideEditLibelle=true
            }else{
                this.valideEditLibelle=false
            }
          },
          validateBudget(){
            if(!this.budget){
                this.valideBudget=true
            }else{
                this.valideBudget=false
            }
            if (this.budget && this.isFloat(this.budget) === false) {
                    if (this.isDigit(this.budget) === false) {
                        this.budgetGood = true;
                    } else {
                        this.budgetGood = false;
                    }
                } else {
                    this.budgetGood = false;
                }
          },
          validateEditBudget(){
            if(!this.edit_budget){
                this.valideEditBudget=true
            }else{
                this.valideEditBudget=false
            }
            if (this.edit_budget && this.isFloat(this.edit_budget) === false) {
                    if (this.isDigit(this.edit_budget) === false) {
                        this.budgetEditGood = true;
                    } else {
                        this.budgetEditGood = false;
                    }
                } else {
                    this.budgetEditGood = false;
                }
          },
            // confirm texrt
            confirmText(id, index) {
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
                        this.deleteProjet(id, index);
                    }
                });
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            isFloat(str) {
                return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
            },
            async deleteProjet(indentifiant, index) {
                const id_delete = {
                    id: indentifiant,
                };
                try {
                    await axios
                        .post(URL.PROJET_DESTROY, id_delete)
                        .then((response) => {
                            response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.projets.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(index) {
                this.projetUp = this.projets[index];
                this.edit_libelle = this.projetUp.libelle;
                this.edit_budget = this.projetUp.budget;
                this.edit_dateDebut = this.projetUp.date_debut;
                this.edit_dateFin = this.projetUp.date_fin;
                this.edit_description = this.projetUp.description;
                this.indexUp = index;
            },
            async updateCompte(){
                this.validateEditDateDebut()
                this.validateEditDateFin()
                this.validateEditLibelle()
                this.validateEditBudget()
                try {
                    this.validateDateDebut();
                    this.validateDateFin();
                    this.validateLibelle()
                    this.validateBudget()
                    this.if_exist();
                    // Prevent modal from closing
                    if (this.valideEditBudget || this.valideEditDateFin || this.valideEditDateDebut || this.valideEditLibelle) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        const data = {
                            libelle: this.nom,
                            valeur: this.valeur,
                        };
                        this.topEnd();
                        await axios.post(URL.PROJET_UPDATE, data).then((response) => {
                            this.taxeData = response.data;
                            this.taxes.push(data);
                            this.nom = "";
                            this.valeur = "";
                        });
                    }
                } catch (error) {
                    console.log(error.type);
                }
            },
            validateNom() {
                // console.log(this.valideNom)
                if (!this.nom) {
                    this.valideNom = true;
                } else {
                    this.valideNom = false;
                }
            },
            validateValeur() {
                if (!this.valeur) {
                    this.valideValeur = true;
                } else {
                    this.valideValeur = false;
                }
                if (this.valeur && this.isFloat(this.valeur) === false) {
                    if (this.isDigit(this.valeur) === false) {
                        this.valeurGood = true;
                    } else {
                        this.valeurGood = false;
                    }
                } else {
                    this.valeurGood = false;
                }
            },
            validateEditNom() {
                if (!this.edit_nom) {
                    this.valideEditNom = true;
                } else {
                    this.valideEditNom = false;
                }
            },
            validateEditValeur() {
                if (!this.edit_valeur) {
                    this.valideEditValeur = true;
                } else {
                    this.valideEditValeur = false;
                }
                if (this.edit_valeur && this.isFloat(this.edit_valeur) === false) {
                    if (this.isDigit(this.edit_valeur) === false) {
                        this.valeurEditGood = true;
                    } else {
                        this.valeurEditGood = false;
                    }
                } else {
                    this.valeurEditGood = false;
                }
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
            if_exist() {
                for (let index = 0; index < this.taxes.length; index++) {
                    if (this.nom == this.taxes[index].libelle) {
                        this.valideExist = true;
                        this.exist_text = "Cette taxe existe déjà !";
                        index = this.taxes.length;
                    } else {
                        this.valideExist = false;
                    }
                }
            },
            async handleOk(bvModalEvt)  {
                try {
                    this.validateDateDebut();
                    this.validateDateFin();
                    this.validateLibelle()
                    this.validateBudget()
                    this.if_exist();
                    // Prevent modal from closing
                    if (this.valideBudget || this.valideDateFin || this.valideDateDebut || this.valideLibelle) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        const data = {
                            libelle: this.libelle,
                            date_debut: this.dateDebut,
                            date_fin: this.dateFin,
                            budget: this.budget,
                            description: this.description
                        };
                        this.topEnd();
                        await axios.post(URL.PROJET_CREATE, data).then((response) => {
                            this.projetData = response.data;
                            this.projets.push(data);
                            this.libelle = "";
                            this.description = "";
                            this.dateFin="";
                            this.dateDebut=";"
                        });
                    }
                } catch (error) {
                    console.log(error.type);
                }
            },
        },
    };
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

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
