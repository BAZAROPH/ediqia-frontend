<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter un nouveau client -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter un nouveau prospect" @ok="handleOk">
            <validation-observer ref="registerForm">
                <b-form class="auth-register-form mt-2">
                    <div>
                        <!-- <h5 class="text-danger text-center">{{client_exist}}</h5> -->
                    </div>
                    
                <b-form-group label="" label-for="register-nom">
                       <label>
                   Prospection<span class="p-0 text-danger h6">*</span>
                    </label>
                    <validation-provider #default="{ errors }" name="prospection" rules="required">
                          <v-select  v-model="selectedProspection" @input="validateProspection" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :state="errors.length > 0 ? false:null" :options="prospectionList" />
                       <small :class="valideProspection ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner la prospection
                            </small>
                    </validation-provider>
                </b-form-group>
                    <!-- nom -->
                    <b-form-group label="" label-for="register-nom">
                          <label>
                 Nom<span class="p-0 text-danger h6">*</span>
                    </label>
                        <validation-provider #default="{ errors }" name="nom" rules="required">
                            <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                            <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le nom du prospect
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- prenom -->
                    <b-form-group label="" label-for="register-prenom">
                          <label>
                 Prénoms<span class="p-0 text-danger h6">*</span>
                    </label>
                        <validation-provider #default="{ errors }" name="prenom" rules="required">
                            <b-form-input id="register-prenom" @input="validatePrenom" v-model="prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                            <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le prénom du prospect
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- email -->
                    <b-form-group label="Email" label-for="register-email">
                        <validation-provider #default="{ errors }" name="Email" rules="">
                            <b-form-input id="register-email" @input="validateEmail" v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                            <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer un email valide
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- contact -->
                    <b-form-group label="" label-for="register-contact">
                         <label>
                 Contact<span class="p-0 text-danger h6">*</span>
                    </label>
                        <validation-provider #default="{ errors }" name="contact" rules="required">
                            <vue-tel-input id="register-contact" @country-changed="changer" @input="vider" @validate="contactEntier($event)" v-model="phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
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
                          <label>
                 Status du client<span class="p-0 text-danger h6">*</span>
                    </label>
                        <v-select    @input="validateStatus" v-model="selected" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option" />
                    <small :class="valideStatus ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le status du prospect
                    </small>
                    </b-form-group>
                </b-form>
            </validation-observer>
        </b-modal>






        <!-- Modal pour mettre à jour un prospect    -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier un prospect" @ok="updateProspect">
            <b-form class="auth-register-form mt-2">

                  <b-form-group label="" label-for="register-nom">
                       <label>
                   Prospection<span class="p-0 text-danger h6">*</span>
                    </label>
                    <validation-provider #default="{ errors }" name="prospection" rules="required">
                          <v-select @input="validateEditProspection" v-model="selectedProspectionEdit" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :state="errors.length > 0 ? false:null" :options="prospectionList" />
                       <small :class="valideProspectionEdit ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner la prospection
                            </small>
                    </validation-provider>
                </b-form-group>
                <!-- nom -->
                <b-form-group label="Nom" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateEditNom" v-model="edit_nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                        <small :class="valideEditNom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le nom du prospect
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- prenom -->
                <b-form-group label="" label-for="register-prenom">
                    <label>
                   Prénoms<span class="p-0 text-danger h6">*</span>
                    </label>
                    <validation-provider #default="{ errors }" name="prenom" rules="required">
                        <b-form-input id="register-prenom" @input="validateEditPrenom" v-model="edit_prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                        <small :class="valideEditPrenom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le prénom du prospect
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- email -->
                <b-form-group label="Email" label-for="register-email">
                    <validation-provider #default="{ errors }" name="Email" rules="required">
                        <b-form-input id="register-email" @input="validateEditEmail" v-model="edit_email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                        <small :class="valideEditEmail ? 'block' : 'none'" class="text-danger">
                            Veuillez entrer l'email du prospect
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- contact -->
                <b-form-group label="" label-for="register-contact">
                      <label>
                   Contact<span class="p-0 text-danger h6">*</span>
                    </label>
                    <validation-provider #default="{ errors }" name="contact" rules="required">
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
                 <b-form-group label-for="entreprise-localisation" class="localisation">
                      <label>
                   Localisation<span class="p-0 text-danger h6">*</span>
                    </label>
                        <validation-provider #default="{ }" name="localisation" rules="required">
                            <div id="custom-search-input" class="mb-1">
                                <div class="input-group">
                                    <input id="autocomplete_search" @input="initialize" name="autocomplete_search" type="text" class="form-control" placeholder="Votre adresse" />
                                    <input type="hidden" name="lat">
                                    <input type="hidden" name="long">
                                </div>
                            </div>
                           <small :class="valideEditLocalisation ? 'block' : 'none'" class="text-danger">
                            Veuillez entrer la localisation de du prospect
                        </small>
                        </validation-provider>
                    </b-form-group>
              
                <b-form-group>
                       <label>
                 Status du client<span class="p-0 text-danger h6">*</span>
                    </label>
                    <v-select v-model="edit_type_client" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="prospectUpOption" />
                </b-form-group>
                <small :class="valideEditStatus ? 'block' : 'none'" class="text-danger">
                    Vous devez renseigner le status du prospect
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
                        Créer un nouveau prospect
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
                            v-model="filtreProspect"
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
                :items="prospects"
                :fields="tableColumns"
                :filter="filtreProspect"
                show-empty
                empty-text="Aucun prospect"
                class="bg-white mt-2"
            >

                 <template #cell(localisation)="data">
                    <p>{{ data.item.localisation.formatted_address }}</p>
                </template>

                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-1 edit-color" v-b-modal.modal-update @click="update(data.item)">
                        <feather-icon icon="Edit3Icon" />
                    </b-button>
                    <!-- <b-button variant="gradient-info" class="btn-icon mr-1 edit-color" @click="detailClient(data.item)">
                        <feather-icon icon="EyeIcon" />
                    </b-button> -->
                    <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(data.item.id)">
                        <feather-icon icon="Trash2Icon" size=12 />
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
                        :total-rows="pTotal"
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
                valideProspection: false,
                validePrenom: false,
                valideContact: false,
                valideEmail: false,
                valideContactNumber: false,
                validePassword: false,
                valideLocalisation: false,
                valideContactNumber: false,


                selectedProspection:false,
                 prospectionList:[],
                    prospect: [],

                valideEditNom: false,
                valideEditPrenom: false,
                edit_valideContact: false,
                valideEditEmail: false,
                valideEditPassword: false,
                valideEditLocalisation: false,
                edit_valideContactNumber: false,
                valideEditStatus: false,
                email,
                prospectUp: "",
                returnData: "",
                required,
                selected: "Quel est votre status",
                status_id: "",
                option: [{ title: "Particulier" }, { title: "Entreprise" }],
                prospectUpOption: [{ title: "Particulier" }, { title: "Entreprise" }],
                client_exist: "",
                prospects: [],
                valideExiste: "",
                edit_nom: "",
                edit_prenom: "",
                edit_email: "",
                edit_contact: "",
                // edit_changer:"",
                edit_localisation: "",
                selectedProspectionEdit: "",
                valideProspectionEdit: "",
                edit_type_client: "",
                edit_index: "",

                id_update: "",

                updateIndex: "",

                perPage: 3,
                currentPage: 1,
                pTotal: 0,
                tableColumns: [
                    { key: 'nom', label: 'Nom', sortable: true },
                    { key: 'prenoms', label: 'Prénoms', sortable: true },
                    { key: 'email', label: 'Email', sortable: true, },
                    { key: 'indicateur', label: 'Indicatif', sortable: true, },
                    { key: 'contact', label: 'Contact', sortable: true, },
                    { key: 'localisation', label: 'Adresse', sortable: true, },
                    { key: 'prospection_name', label: 'Prospection', sortable: true, },
                    { key: 'actions' },
                ],
                filtreProspect: '',
                perPageOptions: [3, 5, 10, 15]
            };
        },
        async mounted() {
            document.title = 'Prospect';
            google.maps.event.addDomListener(window, 'load', initialize);

            try {

                        await axios.get(URL.PROSPECT_LIST).then((response) => {
                               this.prospects= response.data.prospects
                               this.pTotal = this.prospects.length
                            })


                  await axios.get(URL.PROSPECTION_LIST).then((response) => {
                        this.prospectionList= response.data.prospections
                    }).catch(error => {
                        console.log(error)
                    })


                    
            } catch (error) {
                console.log(error);
            }
        },
        // created(){
        //     google.maps.event.addDomListener(window, 'load', initialize);
        // },
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
                    localStorage.setItem('place', JSON.stringify(place))
                    // console.log(this.address)
                });
            },
        getProspection(prospectionId) {
               const prospection = this.prospectionList.filter(item => {
                 return item.id === prospectionId
               })
        return prospection[0].libelle
      },


            detailClient(item) {
                const client =  this.prospects
                console.log(item);
                localStorage.setItem('client', JSON.stringify(client))
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
                        this.deleteProspect(id);
                    }
                });
            },
            // top end
            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Prospect enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
            deleteProspect(identifiant) {
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
                        .post(URL.PROSPECT_DESTROY, id,config)
                        .then((response) => {
                            response.data;
                            axios.get(URL.PROSPECT_LIST).then((response) => {
                                   this.prospects= response.data.prospects
                                    this.pTotal = this.prospects.length
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
                console.log(this.prospectUp.prospection_name);
                this.prospectUp = item;
                this.edit_nom = this.prospectUp.nom;
                this.edit_prenom = this.prospectUp.prenoms;
                // this.selectedProspectionEdit = this.prospectUp.prospection_name;
                // this.selectedProspectionEdit = this.prospectUp.prospection_id;
                this.edit_phone = this.prospectUp.contact;
                 this.edit_indicatifFinal= this.prospectUp.indicateur;
                this.edit_email = this.prospectUp.email;
                // this.edit_localisation = this.prospectUp.localisation;
                this.edit_type_client = this.prospectUp.type_client;
                this.edit_index = this.prospects.findIndex((el) => el.id === item.id);
                this.id_update = this.prospectUp.id;

                if (this.edit_type_client == 1) {
                    this.edit_type_client = "Particulier";
                } else {
                    this.edit_type_client = "Entreprise";
                }
            },
            async updateProspect(bvModalEvt) {
                this.edit_contactFinal=this.edit_contact.formatted
                const index = this.edit_index;
                this.edit_validateContact();
                this.validateEditPrenom();
                this.validateEditNom();
                this.validateEditStatus();
                this.validateEditProspection();
                this.validateEditLocalisation();

                // this.validateEditLocalisation();
            if (this.valideProspectionEdit || this.valideEditNom || this.valideEditPrenom || this.valideEditStatus || this.edit_valideContactNumber || this.edit_valideContact) {
                    bvModalEvt.preventDefault();
                }else {
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
                                 let vide ="";
                                try {
                                   
                                    // var libelle = this.selectedProspectionEdit;
                                    // var selected = this.selectedProspectionEdit.libelle;
                                    // if (libelle !== selected) {
                                    //    vide = libelle
                                    // } else{
                                    //    vide = selected;
                                    // }
                                    // console.log('libelle',libelle)
                                    //  console.log('selected',selected)
                                    //  console.log('vide',vide)
                                  const data = {
                                         id: this.id_update,
                                        nom: this.edit_nom,
                                        prenoms: this.edit_prenom,
                                        email: this.edit_email,
                                        contact: this.edit_phone,
                                        indicateur:this.edit_indicatifFinal,
                                        prospection_name:this.selectedProspectionEdit.libelle ,
                                        prospection_id:this.selectedProspectionEdit.id,
                                        type_client: this.edit_type_client,
                                        localisation: JSON.parse(localStorage.getItem('place')),
                                    };
                                     const config = {
                                        headers: {
                                            'Accept': 'application/json'
                                        },
                                    }
                                  console.log(data)
                                  localStorage.removeItem('place')
                                    axios
                                        .post(URL.PROSPECT_UPDATE, data,config)
                                        .then((response) => {
                                            response.data;
                                            axios.get(URL.PROSPECT_LIST).then((response) => {
                                           this.prospects = response.data.prospects
                                            this.pTotal = this.prospects.length
                                            }).catch((error) => {
                                                console.log(error.response.data.errors);
                                            });
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                        
                                    // this.prospects[index].nom = this.edit_nom ;
                                    // this.prospects[index].prenoms = this.edit_prenom ;
                                    // this.prospects[index].localisation = this.edit_localisation ;
                                    // this.prospects[index].email = this.edit_email ;
                                    // this.prospects[index].indicateur = this.edit_indicatifFinal;
                                    // this.prospects[index].contact = this.edit_phone ;
                                    // this.prospects[index].type_client = this.edit_type_client;
                                    // this.prospects[index].prospection_name = this.selectedProspectionEdit.libelle;
                                    // this.prospects[index].prospection_id = this.selectedProspectionEdit.id;

                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            vider(){
    this.valideContact = false;
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

             validateProspection() {
                if (!this.selectedProspection) {
                    this.valideProspection = true;
                    this.erreur = true;
                } else {
                    this.valideProspection = false;
                    
                }
            },

            validateEditPrenom() {
                if (!this.edit_prenom) {
                    this.valideEditPrenom = true;
                } else {
                    this.valideEditPrenom = false;
                }
            },
             validateEditProspection() {
                if (!this.selectedProspectionEdit) {
                    this.valideProspectionEdit= true;
                } else {
                    this.valideProspectionEdit = false;
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
                     this.validateProspection();
                    // this.if_exist();
                    // Prevent modal from closing
                    if (this.valideStatus ||this.valideProspection || this.valideNom || this.validePrenom || this.valideContact || this.valideContactNumber) {
                        bvModalEvt.preventDefault();
                        // this.handleSubmit();
                    } else {
                        this.indicatifFinal="+"+""+this.contact.country.dialCode
                        console.log(this.indicatifFinal)
                        if (this.selected.title == "Particulier") {
                            this.status_id = 'particulier';
                        } else {
                            this.status_id = 'entreprise';
                        }
                        const config = {
                                headers: {
                                    'Accept': 'application/json'
                                },
                            }
                        const newProspect = {
                            nom: this.nom,
                            prenoms: this.prenom,
                            contact: this.contactFinal,
                            indicateur:this.indicatifFinal,
                            localisation: JSON.parse(localStorage.getItem('place')),
                            email: this.email,
                            type_client: this.status_id,
                            prospection_id : this.selectedProspection.id,
                            prospection_name : this.selectedProspection.libelle

                        };
                         localStorage.removeItem('place')
                        await axios.post(URL.PROSPECT_CREATE, newProspect, config).then((response) => {
                            this.userData = response.data;
                            this.prospects.push(newProspect);
                            this.topEnd();
                        });
                        this.nom = "";
                        this.prenom = "";
                        this.email = "";
                        this.contact = "";
                        this.localisation = "";
                        this.contactFinal= "";
                        this.indicatifFinal= "";
                        this.status_id= "";
                        this.selectedProspection.id= "";
                        this.selected = "Quel est votre status"
                       
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },
            // if_exist() {
            //     for (let index = 0; index < this.clients.length; index++) {
            //         if (this.contactFinal == this.clients[index].contact) {
            //             this.client_exist = "Ce client existe déjà! Veuillez vérifier le contact";
            //             this.valideExiste = true;
            //         } else {
            //             this.valideExiste = false;
            //         }
            //     }
            // },
            contactEntier(e){
               this.contact=e
            //    console.log(this.phone)
            },
            changer(e){
                // console.log(this.phone)
               this.contact.country.name=e.name 
            },

            edit_contactEntier(e){
               this.edit_contact=e
            //    console.log(this.phone)
            },
            edit_changer(e){
                // console.log(this.phone)
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
</style>
