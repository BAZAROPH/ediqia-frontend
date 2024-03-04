<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle taxe -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Nouvelle taxe" @ok="handleOk">
            <b-form>
                <div>
                    <h5 class="text-danger text-center">{{exist_text}}</h5>
                </div>
                <!-- nom -->
                <b-form-group label="Nom" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="TVA" />
                        <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé de la taxe
                        </small>
                    </validation-provider>
                </b-form-group>
                <!-- valeur -->
                <b-form-group label="Valeur de la taxe (%)" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input type="number" id="register-nom" @input="validateValeur" v-model="valeur" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="18" />
                        <small :class="valideValeur ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la valeur de la taxe
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
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Enregistrer" cancel-title="Annuler" centered title="Modifier la taxe" @ok="updateTaxe()">
            <b-form>
                <!-- nom -->
                <b-form-group label="Nom" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateEditNom" v-model="edit_nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="TVA" />
                        <small :class="valideEditNom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé de la taxe
                        </small>
                    </validation-provider>
                </b-form-group>
                <!-- valeur -->
                <b-form-group label="Valeur de la taxe (%)" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateEditValeur" v-model="edit_valeur" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="18" />
                        <small :class="valideEditValeur ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la valeur de la taxe
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
                        variant="relief-primary"
                        v-b-modal.modal-login
                    >
                        Créer une nouvelle taxe
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
                            v-model="filtreTaxe"
                            class="d-inline-block mr-1"
                            placeholder="Rechercher par le nom de la taxe, valeur..."
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
                :items="taxes"
                :fields="tableColumns"
                :filter="filtreTaxe"
                show-empty
                empty-text="Aucune taxe enregistrée"
                class="bg-white mt-2"
            >
                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-2" v-b-modal.modal-update @click="update(data.item)">
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
                        :total-rows="taxeTotal"
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
                indexUp: "",
                valideExist: false,
                exist_text: "",
                valeurGood: false,
                valeurEditGood: false,
                perPage: 3,
                currentPage: 1,
                taxeTotal: 0,
                tableColumns: [
                    { key: 'code', label: 'Code', sortable: true },
                    { key: 'libelle', sortable: true },
                    { key: 'valeur', sortable: true, },
                    { key: 'actions' },
                ],
                filtreTaxe: '',
                perPageOptions: [3, 5, 10, 15]
            };
        },
        async mounted() {
            document.title = 'Inventaire'  
            try {
                await axios
                    .get(URL.TAXE_LIST)
                    .then((response) => {
                        this.returnData = response;
                        console.log(response.data)
                        this.taxeTotal = response.data[0].length
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
                for (let index = 0; index < this.returnData.data[0].length; index++) {
                    this.taxes.push(this.returnData.data[0][index]);
                }
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
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
            async deleteTaxe(indentifiant) {
                const id_delete = {
                    id: indentifiant,
                };
                try {
                    await axios
                        .post(URL.TAXE_DESTROY, id_delete)
                        .then((response) => {
                            axios.get(URL.TAXE_LIST).then((res) => {
                                this.returnData = res
                                this.taxeTotal = res.data[0].length
                                this.taxes = this.returnData.data[0]
                            }).catch((error) => {
                                console.log(error.response.data.errors)
                            })
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.taxes.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(item) {
                this.taxeUp = item;
                this.edit_nom = this.taxeUp.libelle;
                this.edit_valeur = this.taxeUp.valeur;
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
                    this.validateValeur();
                    this.validateNom();
                    this.if_exist();
                    // Prevent modal from closing
                    if (this.valideNom || this.valideValeur || this.valideExist || this.valeurGood) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        const data = {
                            libelle: this.nom,
                            valeur: this.valeur,
                        };
                        this.topEnd();
                        await axios.post(URL.TAXE_CREATE, data).then((response) => {
                            this.taxeData = response.data;
                            axios.get(URL.TAXE_LIST).then((res) => {
                                    this.returnData = res
                                    this.taxeTotal = res.data[0].length
                                    this.taxes = this.returnData.data[0]
                                }).catch((error) => {
                                    console.log(error.response.data.errors)
                                })
                            this.nom = "";
                            this.valeur = "";
                        }).catch((error) => {
                            console.log(error.response.data.errors)
                        })
                    }
                } catch (error) {
                    console.log(error.type);
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
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
<style scoped lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
