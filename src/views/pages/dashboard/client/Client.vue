<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter un nouveau client -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter un nouveau client" @ok="handleOk">
            <validation-observer ref="registerForm">
                <b-form class="auth-register-form mt-2">
                    <div>
                        <h5 class="text-danger text-center">{{client_exist}}</h5>
                    </div>
                    <!-- nom -->
                    <b-libelle class="red">Nom</b-libelle>
                    <b-form-group label-for="register-nom">
                        <validation-provider #default="{ errors }" name="nom" rules="required">
                            <!-- <label for="">Nom <span class="p-0 text-danger h6">*</span></label> -->
                            <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                            <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le nom du client
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- prenom -->

                    <b-libelle class="red">Prénoms</b-libelle>
                    <b-form-group label-for="register-prenom">
                        <validation-provider #default="{ errors }" name="prenom" rules="required">
                            <!-- <label for="">Prénom <span class="p-0 text-danger h6">*</span></label> -->
                            <b-form-input id="register-prenom" @input="validatePrenom" v-model="prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                            <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le prénom du client
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- email -->
                    <label>Email</label>
                    <b-form-group  label-for="register-email">
                        <validation-provider #default="{ errors }" name="Email" rules="required|email">
                            <b-form-input id="register-email" @input="validateEmail" v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                            <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer un email valide
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- contact -->
                    <b-libelle class="red">Contact</b-libelle>
                    <b-form-group label-for="register-contact">
                        <validation-provider #default="{ errors }" name="contact" rules="required">
                            <!-- <label for="">Contact <span class="p-0 text-danger h6">*</span></label> -->
                            <vue-tel-input id="register-contact" @country-changed="changer" @validate="contactEntier($event)" v-model="phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                            <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                                Veuillez renseigner votre contact
                            </small>
                            <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                                Ce numéro de téléphone n'est pas valide
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- Localisation -->
                    <b-libelle class="red">Localisation</b-libelle>
                    <b-form-group label-for="entreprise-localisation" class="localisation">
                        <validation-provider #default="{ }" name="localisation" rules="required">
                            <div id="custom-search-input" class="mb-1">
                                <div class="input-group">
                                    <input id="autocomplete_search" @input="initialize" name="autocomplete_search" type="text" class="form-control" placeholder="Votre adresse" />
                                    <input type="hidden" name="lat">
                                    <input type="hidden" name="long">
                                </div>
                            </div>
                            <small :class="valideLocalisation ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer la localisation du client
                            </small>
                        </validation-provider>
                    </b-form-group>
                    <b-form-group>
                        <label for="">Status <span class="p-0 text-danger h6">*</span></label>
                        <v-select v-model="selected" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option" />
                    </b-form-group>
                    <small :class="valideStatus ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le status du client
                    </small>
                </b-form>
            </validation-observer>
        </b-modal>






        <!-- Modal pour mettre à jour un client    -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier mon client" @ok="updateClient">
            <b-form class="auth-register-form mt-2">
                <!-- nom -->
                <b-libelle class="red">Nom</b-libelle>
                <b-form-group  label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <!-- <label for="">Nom <span class="p-0 text-danger h6">*</span></label> -->
                        <b-form-input id="register-nom" @input="validateEditNom" v-model="edit_nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                        <small :class="valideEditNom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le nom du client
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- prenom -->
                <b-libelle class="red">Prénom</b-libelle>
                <b-form-group label-for="register-prenom">
                    <validation-provider #default="{ errors }" name="prenom" rules="required">
                        <!-- <label for="">Prénom <span class="p-0 text-danger h6">*</span></label> -->
                        <b-form-input id="register-prenom" @input="validateEditPrenom" v-model="edit_prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                        <small :class="valideEditPrenom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le prénom du client
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- email -->
                 <b-libelle class="red">Email</b-libelle>
                <b-form-group  label-for="register-email">
                    <validation-provider #default="{ errors }" name="Email" rules="required">
                        <b-form-input id="register-email" @input="validateEditEmail" v-model="edit_email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                        <small :class="valideEditEmail ? 'block' : 'none'" class="text-danger">
                            Veuillez entrer l'email du client
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- contact -->
                 <b-libelle class="red">Contact</b-libelle>
                <b-form-group label-for="register-contact">
                    <validation-provider #default="{ errors }" name="contact" rules="required">
                        <!-- <label for="">Contact <span class="p-0 text-danger h6">*</span></label> -->
                        <vue-tel-input id="register-contact" @country-changed="edit_changer" @validate="edit_contactEntier($event)" v-model="edit_phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                        <small :class="edit_valideContact ? 'block' : 'none'" class="text-danger">
                            Veuillez renseigner votre contact
                        </small>
                        <small :class="edit_valideContactNumber ? 'block' : 'none'" class="text-danger">
                            Ce numéro de téléphone n'est pas valide
                        </small>
                    </validation-provider>
                </b-form-group>
                
                <!-- Localisation -->
                <b-libelle class="red">Localisation</b-libelle>
                <b-form-group  label-for="entreprise-localisation">
                    <validation-provider #default="{ errors }" name="localisation" rules="required">
                        <b-form-input
                            id="entreprise-localisation"
                            @input="validateEditLocalisation"
                            v-model="edit_localisation"
                            name="entreprise-localisation"
                            :state="errors.length > 0 ? false:null"
                            class="text-center localisation"
                            placeholder="Abidjan, Angré RCI 0089 BP 00225"
                        />
                        <small :class="valideEditLocalisation ? 'block' : 'none'" class="text-danger">
                            Veuillez entrer la localisation de du client
                        </small>
                    </validation-provider>
                </b-form-group>
                <b-form-group>
                    <!-- <label for="">Status <span class="p-0 text-danger h6">*</span></label> -->
                    <v-select v-model="edit_type_client" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="clientUpOption" />
                </b-form-group>
                <small :class="valideEditStatus ? 'block' : 'none'" class="text-danger">
                    Vous devez renseigner le status du client
                </small>
                
            </b-form>
        </b-modal>
        <!-- Tableau pour afficher les clients -->
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
                    <label 
                    v-if="verifyPerm('index-client')"
                    >Entrées</label>
                    <v-select
                        v-if="verifyPerm('index-client')"
                        v-model="perPage"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="perPageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block ml-50 mr-1"
                    />
                    <b-button
                        v-if="verifyPerm('create-client')"
                        variant="gradient-primary"
                        v-b-modal.modal-login
                    >
                        Créer un nouveau client
                    </b-button>
                    </b-col>

                    <!-- Search -->
                    <b-col
                    v-if="verifyPerm('index-client')"
                    cols="12"
                    md="6"
                    class="mt-1"
                    >
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input
                            v-model="filtreClient"
                            class="d-inline-block mr-1"
                            placeholder="Rechercher par le nom de la taxe, valeur..."
                            />
                        </div>
                    </b-col>
            </b-row>


            <!-- Le tableau affichant les taxes -->
            <b-table
                v-if="verifyPerm('index-client')"
                hover
                responsive
                primary-key="id"
                :per-page="perPage"
                :current-page="currentPage"
                :items="clients"
                :fields="tableColumns"
                :filter="filtreClient"
                show-empty
                empty-text="Aucun client"
                class="bg-white mt-2"
            >
                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-1 edit-color" v-b-modal.modal-update @click="update(data.item)">
                        <feather-icon icon="Edit3Icon" />
                    </b-button>
                    <b-button variant="gradient-info" class="btn-icon mr-1 edit-color" @click="detailClient(data.item)">
                        <feather-icon icon="EyeIcon" />
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
                    v-if="verifyPerm('index-client')"
                        v-model="currentPage"
                        :total-rows="clientTotal"
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
    import CryptoJS from 'crypto-js'
    export default {
        components: {
            CryptoJS,
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
                valideStatus: false,
                nom: "",
                prenom: "",
                email: "",
                localisation: "",
                contact: "",
                phone:'',
                edit_phone:'',
                contactFinal:'',
                indicatifFinal:'',
                edit_contactFinal:"",
                edit_indicatifFinal:"",
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
                edit_valideContact: false,
                valideEditEmail: false,
                valideEditPassword: false,
                valideEditLocalisation: false,
                edit_valideContactNumber: false,
                valideEditStatus: false,
                email,
                clientUp: "",
                returnData: "",
                perms:'',
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

                perPage: 3,
                currentPage: 1,
                clientTotal: 0,
                tableColumns: [
                    { key: 'nom', label: 'Nom', sortable: true },
                    { key: 'prenoms', label: 'Prénoms', sortable: true },
                    { key: 'email', label: 'Email', sortable: true, },
                    { key: 'contact', label: 'Contact', sortable: true, },
                    { key: 'adress', label: 'Adresse', sortable: true, },
                    { key: 'actions' },
                ],
                filtreClient: '',
                listFacture:'',
                // client_id:'',
                perPageOptions: [3, 5, 10, 15],
            };
        },
        async mounted() {
            document.title = 'Client - Ediqia'
            google.maps.event.addDomListener(window, 'load', initialize);
            try {
                var ciphertext = localStorage.getItem('permission')
                var bytes  = CryptoJS.AES.decrypt(ciphertext, 'qenium 123')
                this.perms  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
                await axios
                    .get(URL.CLIENT_LIST)                   
                    .then((response) => {
                        this.returnData = response;
                        this.clientTotal = response.data[0].length
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
                for (let index = 0; index < this.returnData.data[0].length; index++) {
                    this.clients.push(this.returnData.data[0][index]);
                } 
                  
            } catch (error) {
                console.log(error);
            }


            // await axios.get(URL.LISTE_FACTURE_CLIENT).then(response => {
            // this.ListFacture = response.data[0]
            // console.log(this.ListFacture)
            // }).catch((error) => {
            // console.log(error)
            // })
        },
        methods: {
            initialize() {
                var input = document.getElementById('autocomplete_search');
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.addListener('place_changed', function () {
                    var place = autocomplete.getPlace();
                    // place variable will have all the information you are looking for.
                    $('#lat').val(place.geometry['location'].lat());
                    $('#long').val(place.geometry['location'].lng());
                    this.localisation = place
                    console.log(this.place)
                });
            },
            verifyPerm(permission){
                return this.perms.indexOf(permission) > -1;
            },
            detailClient(item) {
                const client = item
                localStorage.setItem('clientDetails', JSON.stringify(client))
                this.$router.push('/clients/detail')
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
                        this.deleteClient(id);
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
            deleteClient(identifiant) {
                try {
                    const id = {
                        id: identifiant,
                    };
                    const config = {
                        headers: {
                            'Accept': 'application/json'
                        },
                    }
                    axios
                        .post(URL.CLIENT_DESTROY, id,config)
                        .then((response) => {
                            axios.get(URL.CLIENT_LIST).then((res) => {
                                    this.clients = res.data[0]
                                    this.clientTotal = res.data[0].length
                                }).catch((error) => {
                                    console.log(error.response.data.errors);
                                });
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
            update(item) {
                this.clientUp = item;
                this.edit_nom = this.clientUp.nom;
                this.edit_prenom = this.clientUp.prenoms;
                this.edit_email = this.clientUp.email;
                this.edit_localisation = this.clientUp.localisation;
                this.edit_type_client = this.clientUp.type_client;
                this.edit_index = this.clients.findIndex((el) => el.id === item.id);
                this.id_update = this.clientUp.id;

                if (this.edit_type_client == 1) {
                    this.edit_type_client = "Particulier";
                } else {
                    this.edit_type_client = "Entreprise";
                }
            },
            async updateClient(bvModalEvt) {
                this.edit_contactFinal=this.edit_contact.formatted
                const index = this.edit_index;
                this.edit_validateContact();
                this.validateEditPrenom();
                this.validateEditNom();
                this.validateEditStatus();
                this.validateEditLocalisation();
                if (this.valideEditNom || this.valideEditPrenom || this.valideEditLocalisation || this.valideEditStatus || this.edit_valideContactNumber || this.edit_valideContact) {
                    bvModalEvt.preventDefault();
                } else {
                    if (
                        this.clients[index].nom != this.edit_nom ||
                        this.clients[index].prenoms != this.edit_prenom ||
                        this.clients[index].localisation != this.edit_localisation ||
                        this.clients[index].email != this.edit_email ||
                        this.clients[index].contact != this.edit_contactFinal ||
                        this.clients[index].type_client != this.edit_status_id
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
                                    if (this.edit_type_client == "Particulier") {
                                        this.status_id = 1;
                                    } else {
                                        this.status_id = 2;
                                    }
                                    const data = {
                                        id: this.id_update,
                                        nom: this.edit_nom,
                                        prenoms: this.edit_prenom,
                                        email: this.edit_email,
                                        contact: this.edit_contactFinal,
                                        indicateur:this.edit_indicatifFinal,
                                        type_client: this.status_id,
                                        localisation: this.edit_localisation,
                                    };
                                    const config = {
                                        headers: {
                                            'Accept': 'application/json'
                                        },
                                    }
                                    axios
                                        .post(URL.CLIENT_UPDATE, data,config)
                                        .then((response) => {
                                            axios.get(URL.CLIENT_LIST).then((res) => {
                                                this.clients = res.data[0]
                                                this.clientTotal = response.data[0].length
                                            }).catch((error) => {
                                                console.log(error.response.data.errors);
                                            });
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    this.clients[index].nom = this.edit_nom;
                                    this.clients[index].prenoms = this.edit_prenom;
                                    this.clients[index].localisation = this.edit_localisation;
                                    this.clients[index].email = this.edit_email;
                                    this.clients[index].contact =this.edit_contactFinal;
                                    this.clients[index].indicateur=this.edit_indicatifFinal
                                    this.clients[index].type_client = this.edit_status_id;
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
                }
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
                this.contactFinal=this.contact.formatted
                if (!this.contactFinal) {
                    this.valideContact = true;
                    this.erreur = true;
                } else {
                    this.valideContact = false;
                    this.erreur = false;
                }

                if (this.contactFinal && this.contactFinal.length<8) {
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
            edit_validateContact() {
                if (!this.edit_contactFinal) {
                    this.edit_valideContact = true;
                    this.erreur = true;
                } else {
                    this.edit_indicatifFinal=this.edit_indicatifFinal="+"+""+this.edit_contact.country.dialCode
                    this.edit_valideContact = false;
                    this.erreur = false;
                }
                if (this.edit_contactFinal && this.edit_contactFinal.length<8) {
                    this.edit_valideContactNumber = true;
                } else {
                    this.edit_valideContactNumber = false;
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
                        this.indicatifFinal="+"+""+this.contact.country.dialCode
                        console.log(this.indicatifFinal)
                        if (this.selected.title == "Particulier") {
                            this.status_id = 1;
                        } else {
                            this.status_id = 2;
                        }
                        const newClient = {
                            nom: this.nom,
                            prenoms: this.prenom,
                            contact: this.contactFinal,
                            indicateur:this.indicatifFinal,
                            localisation: this.localisation,
                            email: this.email,
                            type_client: this.status_id,
                        };
                        this.topEnd();
                        await axios.post(URL.CLIENT_CREATE, newClient).then((response) => {
                            this.userData = response.data
                            axios.get(URL.CLIENT_LIST).then((res) => {
                                this.clients = res.data[0]
                                this.clientTotal = res.data[0].length
                            }).catch((error) => {
                                console.log(error.response.data.errors);
                            });
                        });
                        this.nom = "";
                        this.prenom = "";
                        this.email = "";
                        this.contact = "";
                        this.localisation = ""
                        this.selected = "Quel est votre status"
                    }
                } catch (error) {
                    console.log(error.type);
                }
            },
            if_exist() {
                for (let index = 0; index < this.clients.length; index++) {
                    if (this.contactFinal == this.clients[index].contact) {
                        this.client_exist = "Ce client existe déjà! Veuillez vérifier le contact";
                        this.valideExiste = true;
                    } else {
                        this.valideExiste = false;
                    }
                }
            },
            contactEntier(e){
               this.contact=e
            //    console.log(this.phone)
            },
            changer(e){
                console.log(this.phone)
               this.contact.country.name=e.name 
            },

            edit_contactEntier(e){
               this.edit_contact=e
            //    console.log(this.phone)
            },
            edit_changer(e){
                console.log(this.phone)
               this.edit_contact.country.name=e.name 
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
        color:red;
    }
</style>
