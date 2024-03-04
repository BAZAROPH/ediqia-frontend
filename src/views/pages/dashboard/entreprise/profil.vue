<template>
    <div class="position-relative table-responsive table-base">
              <b-card
        class="profile-header mb-2"
        img-src="@/assets/images/portrait/small/office1.jpg"
        img-top
        alt="cover photo"
        body-class="p-0"
      >
        <!-- profile picture -->
        <div class="position-relative">
          <div class="profile-img-container d-flex align-items-center">
            
            <div class="profile-img">
              <b-img
                src="@/assets/images/portrait/small/logo2.jpg"
                rounded
                fluid
                class="img-fluid rounded"
                alt="profile photo"
              />
            </div>
            <!-- profile title -->
            <!-- <div class="profile-title ml-3">
              <h2 class="text-white">
                Aviato
              </h2>
              <p class="text-white">
                californie
              </p>
            </div> -->
            <!--/ profile title -->
          </div>
        </div>
        <!--/ profile picture -->
        <!--/ profile navbar -->
      </b-card>


      <b-card>
      <b-tabs  class="text-center justified"> 
        <!-- content-class="mt-2" justified  -->
        <!-- tabs de ventes à relevé -->

        <!--  -->
        <b-tab>
          <template #title>
              <feather-icon icon="BookOpenIcon" />
              <span>Accueil</span>
          </template>

          <section id="description-list-alignment">
            <b-row class="match-height">
              <!-- Description lists horizontal -->
                <b-col md="8">
                    <b-card no-body>
                        <b-card-header>
                            <b-card-title>
                            votre entreprise<small class="text-muted"></small>
                            <!-- <b-skeleton class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->

                            <feather-icon variant="relief-secondary" v-b-modal.modal-login class="ml-50 dt" icon="Edit3Icon" @click="update1(entrepriseInfo)"/>

                            </b-card-title>

                            <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="updateEntreprise">
                            <validation-observer ref="registerForm">
                                <b-form class="auth-register-form mt-2">
                                    <!-- <div>
                                        <h5 class="text-danger text-center">{{permission_exist}}</h5>
                                    </div> -->

                                    <!-- Nom de votre entreprise -->
                                    <b-form-group label="Nom de votre entreprise" label-for="register-nom">
                                        <validation-provider #default="{ errors }" name="nom" rules="required">
                                            <b-form-input id="register-entreprise" @input="validateEntrepriseEditNom" v-model="edit_nomEntreprise" name="register-entreprise" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                            <small :class="valideEntrepriseNom ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le Nom de votre entreprise
                                            </small>
                                        </validation-provider>
                                    </b-form-group>

                                        <!--Date de création-->
                                    <b-form-group>
                                        <label>
                                        Date de début<span class="p-0 text-danger h6"> </span>
                                        </label>
                                        <validation-provider>
                                            <flat-pickr
                                            v-model="edit_dateEntreprise"
                                            class="form-control"
                                            rules = "required"
                                            @input="validateEntrepriseDateEdit"
                                            />
                                        <small :class="valideEntrepriseDateEdit ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner la date de création de votre entreprise
                                        </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- localisation Entreprise -->
                                    <!-- <b-form-group label="Adresse" label-for="register-Adresse">
                                        <validation-provider #default="{ errors }" name="renumeration" rules="required">
                                            <b-form-input id="register-renumeration" @input="validateEntrepriseAddEdit" v-model="edit_EntrepriseAdd" name="renumeration" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                            <small :class="valideEntrepriseAdresse ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner l'adresse de votre entreprise
                                            </small>
                                        </validation-provider>
                                    </b-form-group> -->
                                    <!--  -->



                                    
                                     <b-form-group label-for="entreprise-localisation" class="localisation">
                                            <label>
                                        Localisation<span class="p-0 text-danger h6"></span>
                                            </label>
                                                <validation-provider #default="{ }" name="localisation" rules="required">
                                                    <div id="custom-search-input" class="mb-1">
                                                        <div class="input-group">
                                                            <input id="autocomplete_search" @input="initialize" name="autocomplete_search" type="text" class="form-control" placeholder="Votre adresse" />
                                                            <input type="hidden" name="lat">
                                                            <input type="hidden" name="long">
                                                        </div>
                                                    </div>
                                                <small :class="valideEntrepriseAdresse ? 'block' : 'none'" class="text-danger">
                                                    Veuillez entrer la localisation de du prospect
                                                </small>
                                                </validation-provider>
                                    </b-form-group>


                                    <!-- Contact Entreprise -->
                                    <!-- <b-form-group label="Numéro téléphonique" label-for="register-téléphonique">
                                        <validation-provider #default="{ errors }" name="contact" rules="required">
                                            <b-form-input id="register-echeancier" @input="validateEntrepriseContactEdit" v-model="edit_contactEntreprise" name="register-echeancier" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                            <small :class="valideEntrepriseContact ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le numéro téléphonique de votre entreprise
                                            </small>
                                        </validation-provider>
                                    </b-form-group>                          -->
                                    <!--  -->  


                                    <!-- Contact -->
                                    <b-form-group label-for="register-contact">
                                        <label for="">Contact<span class="p-0 text-danger h6"></span></label>
                                        <validation-provider #default="{ errors }" name="contact" rules="required">
                                            <vue-tel-input id="register-contact" @country-changed="edit_changerEntreprise" @validate="edit_contactEntierEntreprise($event)" v-model="edit_phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                                            <small :class="edit_valideContactEntreprise ? 'block' : 'none'" class="text-danger">
                                                Veuillez renseigner votre contact
                                            </small>
                                            <small :class="edit_valideContactEntrepriseNumber ? 'block' : 'none'" class="text-danger">
                                                Ce numéro de téléphone n'est pas valide
                                            </small>
                                        </validation-provider>
                                    </b-form-group>


                                    <!-- Email entreprise -->
                                    <!-- <b-form-group label="Adresse e-mail" label-for="register-email">
                                        <validation-provider #default="{ errors }" name="adresse" rules="required">
                                            <b-form-input id="register-email" @input="validateEntrepriseAdresseEmail" v-model="edit_emailEntreprise" name="register-email" :state="errors.length > 0 ? false:null" placeholder="johndoe@exemple.com" />
                                            <small :class="valideEmailEntreprise ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner l'email de votre entreprise
                                            </small>
                                        </validation-provider>
                                    </b-form-group> -->



                                    <!-- Email entreprise -->
                                    <b-form-group  label-for="register-email">
                                         <label for="">Email<span class="p-0 text-danger h6"></span></label>
                                        <validation-provider #default="{ errors }" name="Email" rules="required">
                                            <b-form-input id="register-email" @input="validateEntrepriseAdresseEmail" v-model="edit_emailEntreprise" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                                            <small :class="valideEmailEntreprise ? 'block' : 'none'" class="text-danger">
                                                Veuillez entrer l'email du client
                                            </small>
                                        </validation-provider>
                                    </b-form-group>


                                    
                                    <!-- Site internet -->
                                    <b-form-group label="Site web" label-for="register-email">
                                        <validation-provider #default="{ errors }" name="mode-paiement" rules="required">
                                            <b-form-input id="register-mode-paiement" @input="validateSiteEdit" v-model="edit_site" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                            <small :class="valideSite? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le site internet de votre entreprise
                                            </small>
                                        </validation-provider>
                                    </b-form-group>
                                    

                                </b-form>
                            </validation-observer>
                            </b-modal>
                        </b-card-header>

                        <b-card-body>
                            <dl class="row">
                                <dt class="col-sm-6 text-right">
                                    Nom de votre entreprise
                                <!-- <b-skeleton  class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->

                                </dt>
                                <dd class="col-sm-6  text-left">                       
                                {{entrepriseInfo.libelle}}
                                <b-skeleton v-if="loading === false"  class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                                </dd>
                            </dl>

                            <dl class="row">
                                <dt class="col-sm-6 text-right" >
                                    Date de création
                                    <!-- <b-skeleton class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->
                                </dt>
                                <dd class="col-sm-6 text-left">
                                    {{dateDeCreation }}
                                    <b-skeleton  v-if="loading === false" class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                                
                                </dd>
                            </dl>

                            <dl class="row">
                                <dt class="col-sm-6 text-right">
                                    Localisation
                                    <!-- <b-skeleton class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->
                                </dt>
                                <dd class="col-sm-6  text-left">
                                    {{entrepriseInfo.localisation}}
                                    <b-skeleton v-if="loading === false"  class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                                </dd>
                            </dl>

                            <dl class="row">
                                <dt class="col-sm-6 text-right">
                                    Numéro téléphonique 
                                    <!-- <b-skeleton class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->
                                </dt>
                                <dd class="col-sm-6  text-left">
                                {{entrepriseInfo.indicateur}} {{entrepriseInfo.contact}}
                                <b-skeleton  v-if="loading === false" class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                                </dd>
                            </dl>

                            <dl class="row">
                                <dt class="col-sm-6 text-right">
                                    Adresse e-mail
                                    <!-- <b-skeleton class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->
                                </dt>
                                <dd class="col-sm-6  text-left">
                                    {{entrepriseInfo.email}}
                                    <b-skeleton  v-if="loading === false" class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                                </dd>
                            </dl>

                            <dl class="row">
                            <dt class="col-sm-6 text-right">
                                Site web
                                <!-- <b-skeleton class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton> -->
                            </dt>
                            <dd class="col-sm-6 text-left">
                                {{entrepriseInfo.site_internet}}
                                <b-skeleton  v-if="loading === false" class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                            </dd>
                            </dl>
                        </b-card-body>
                    </b-card>
                </b-col>
              
            </b-row>
          </section>
        </b-tab>

        <b-tab>            
          <template #title>
              <feather-icon icon="LayersIcon" />
              <span >Infos</span>
          </template>

          <b-row class="match-height">
            <b-col cols="12">
              <div class="group-area mt-1">
                <!-- <h4>Présentation</h4> -->

                <b-card-title>
                    Présentation<small class="text-muted"></small>
                    <feather-icon variant="relief-secondary" v-b-modal.modal-login1 class="ml-50 dt" icon="Edit3Icon" @click="update2(entrepriseInfo)"/>
                </b-card-title>

                <p class="justify-content">                    
                    {{entrepriseInfo.description}}
                </p>

                <hr>

                <b-modal id="modal-login1" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="updatePresentation">
                    <validation-observer ref="registerForm">
                        <b-form class="auth-register-form mt-2">                           
                            <b-form-group>
                                <label for="taxeValue">Saisissez votre présentation:</label>
                                <b-form-textarea id="textarea" v-model="description" placeholder="votre description" rows="5" max-rows="6"> </b-form-textarea>
                            </b-form-group>                            

                        </b-form>
                    </validation-observer>
                </b-modal>


              </div>
            </b-col>
          </b-row>
        </b-tab>
                
        <b-tab>
            <template #title>
                <feather-icon icon="UsersIcon" />
                <span>Personnels</span>
            </template>   
                          
            <!-- Modal pour mettre à jour un employé déjà ajouté    -->
            <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier mon employe" @ok="updateUsers">
                <b-form class="auth-register-form mt-2">

                    <!-- Role -->
                    <b-form-group  label-for="entreprise-domaine">
                        <label for="">Role <span class="p-0 text-danger h6">*</span></label>
                        <validation-provider #default="{  }" name="nom" rules="required">
                            <v-select v-model="selectedEditRole" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name" :options="roles" placeholder="Selectionner un role" multiple/>

                            <small :class="valideEditRole ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer le role de l'employe
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- nom -->
                    <b-form-group label-for="register-nom">
                        <label for="">Nom <span class="p-0 text-danger h6">*</span></label>
                        <validation-provider #default="{ errors }" name="nom" rules="required">
                            <b-form-input id="register-nom" @input="validateEditNom" v-model="edit_nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                            <small :class="valideEditNom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le nom de l'employé
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- prenom -->
                    <b-form-group  label-for="register-prenom">
                        <label for="">Prénoms <span class="p-0 text-danger h6">*</span></label>
                        <validation-provider #default="{ errors }" name="prenom" rules="required">
                            <b-form-input id="register-prenom" @input="validateEditPrenom" v-model="edit_prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                            <small :class="valideEditPrenom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le prénom du client
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- email -->
                    <b-form-group  label-for="register-email">
                        <label for="">Email <span class="p-0 text-danger h6"></span></label>
                        <validation-provider #default="{ errors }" name="Email" rules="required">
                            <b-form-input id="register-email" @input="validateEditEmail" v-model="edit_email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                            <small :class="valideEditEmail ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer l'email du employé
                            </small>
                        </validation-provider>
                    </b-form-group>


                    <!-- password -->
                    <b-form-group label-for="register-password">
                        <label for="">Mot de passe <span class="p-0 text-danger h6">*</span></label>
                        <validation-provider #default="{ errors }" name="password" rules="required">
                            <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                                <b-form-input
                                    id="register-password"
                                    @input="validateEditPassword"
                                    v-model="passwordEdit"
                                    class="form-control-merge"
                                    :type="passwordFieldType"
                                    :state="errors.length > 0 ? false:null"
                                    name="register-password"
                                    placeholder="············"
                                />
                                <b-input-group-append is-text>
                                    <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                                </b-input-group-append>
                            </b-input-group>
                            <small :class="valideEditPassword ? 'block' : 'none'" class="text-danger">
                                Le mot de passe est de 8 caractrères minimum
                            </small>
                        </validation-provider>
                    </b-form-group>



                    <!-- contact -->
                    <b-form-group label-for="register-contact">
                        <label for="">Contact <span class="p-0 text-danger h6">*</span></label>
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
                </b-form>
            </b-modal>
            <!--  -->
            <b-card
            no-body
            class="px-2"
            >
            <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouveau employé -->
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
                    <!-- <b-button
                        variant="gradient-primary"
                        v-b-modal.modal-login
                    >
                        Créer un nouveau employé
                    </b-button> -->
                    </b-col>

                    <!-- Search -->
                    <b-col
                    cols="12"
                    md="6"
                    class="mt-1"
                    >
                      <div class="d-flex align-items-center justify-content-end">
                          <b-form-input
                          v-model="filtreUser"
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
                :items="users"
                :fields="tableColumns"
                :filter="filtreUser"
                show-empty
                empty-text="Aucun employé"
                class="bg-white mt-2"
            >
                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-1 edit-color" v-b-modal.modal-update @click="update(data.item)">
                        <feather-icon icon="Edit3Icon" />
                    </b-button>
                    <!-- <b-button variant="gradient-info" class="btn-icon mr-1 edit-color"  @click="detailEmploye(data.item)">
                        <feather-icon icon="EyeIcon" />
                    </b-button> -->
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
                        :total-rows="userTotal"
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
  
        </b-tab>

      </b-tabs>            
    </b-card>


      
    </div>
</template>

<script>
    import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import { required, email } from "@validations";
    import { togglePasswordVisibility } from "@core/mixins/ui/forms";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import { VueTelInput } from 'vue-tel-input'
    import moment from 'moment';
    import flatPickr from 'vue-flatpickr-component'


    export default {
        components: {
            flatPickr,
            VueTelInput,
            vSelect,
            BRow,
            BCol,
            moment,
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
        mixins: [togglePasswordVisibility],
        data() {
            return {

                loading:false,

                description:"",
                edit_contactFinalEntreprise:"",
                edit_indicatifFinalEntreprise:"",
                edit_valideContactEntrepriseNumber:false,
                edit_valideContactEntreprise:false,






                edit_nomEntreprise:"",
                edit_dateEntreprise:"",
                edit_EntrepriseAdd:"",
                edit_contactEntreprise:"",
                edit_emailEntreprise:"",
                edit_site:"",




                valideEntrepriseContact:false,
                valideEntrepriseDateEdit:false,
                valideEntrepriseNom:false,
                valideEntrepriseAdresse:false,
                valideEmailEntreprise:false,
                valideSite:false,

                entreprises:[],


                // validation
                // nom: "",
                // prenom: "",
                // email: "",
                // contact: "",
                // phone:'',
                // password:"",
                dateDeCreation: "",
                passwordEdit:"",
                edit_phone:'',
                contactFinal:'',
                indicatifFinal:'',
                edit_contactFinal:"",
                edit_indicatifFinal:"",
                // valideNom: false,
                // validePrenom: false,
                // valideContact: false,
                // valideEmail: false,
                // valideContactNumber: false,
                // validePassword: false,
                valideEditPassword: false,
                valideContactNumber: false,

                valideEditNom: false,
                valideEditPrenom: false,
                edit_valideContact: false,
                valideEditEmail: false,
                valideEditPassword: false,
                edit_valideContactNumber: false,
                email,
                userUp: "",
                entrepriseUp:"",
                returnData: "",
                required,
                user_exist: "",
                users: [],
                roles:[],
                entreprises:[],
                valideExiste: "",
                edit_nom: "",
                edit_prenom: "",
                edit_email: "",
                edit_contact: "",
                edit_index: "",

                edit_index1:"",

                user_id: "",
                entreprise_id:"",
                updateIndex: "",

                valideRole:"",
                selectedRole: "",
                
                valideEditRole:"",
                selectedEditRole: "",

                perPage: 3,
                currentPage: 1,
                entrepriseInfo:'',
                userTotal: 0,
                tableColumns: [
                    { key: 'nom', label: 'Nom', sortable: true },
                    { key: 'prenoms', label: 'Prénoms', sortable: true },
                    { key: 'email', label: 'Email', sortable: true, },
                    { key: 'contact', label: 'Contact', sortable: true, },
                    { key: 'adress', label: 'Adresse', sortable: true, },
                    { key: 'actions' },
                    
                ],
                filtreUser: '',
                perPageOptions: [3, 5, 10, 15]
            }; 
        },

        async mounted() {
            document.title = 'Détail Entreprise'  
             google.maps.event.addDomListener(window, 'load', initialize)
             this.loading = false
            try {                
                await axios
                    .get(URL.EMPLOYE_LIST)
                    .then((response) => {
                        this.userTotal = response.data.listeEmploye.length
                        this.users = response.data.listeEmploye;
                        this.roles = response.data.listeRole;
                    })
                        // console.log(this.users)  
                await axios
                .get(URL.ENTREPRISE_INFO)
                .then((response) => {
                    this.entrepriseInfo = response.data[0].entreprise
                    this.loading = true
                })
                console.log(this.entrepriseInfo)

                if (this.entrepriseInfo) {
                    this.dateDeCreation = this.format_date(this.entrepriseInfo.created_at);
                    console.log( this.dateDeCreation)
                }                                 
            
            } catch (error) {
                console.log(error);
            }
        },


        computed: {
            passwordToggleIcon() {
                return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
            },
            // imgUrl() {
            //     if (store.state.appConfig.layout.skin === "dark") {
            //         // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            //         this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
            //         return this.sideImg;
            //     }
            //     return this.sideImg;
            // },
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
                    localStorage.setItem('place', JSON.stringify(place))
                    // console.log(this.address)
                });
            },











            format_date(value) {
                if (value) {
                return moment(String(value)).format("DD/ MM/ YYYY");
                }
            },
            
            validateEditPassword() {
                if (!this.passwordEdit || this.passwordEdit.length < 8) {
                    this.valideEditPassword = true;
                    this.erreur = true;
                } else {
                    this.valideEditPassword = false;
                    this.erreur = false;
                }
            },


            // confirm texrt
            confirmText(id, index) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Ce employé sera supprimé définitivement !",
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
                        this.deleteUser(id, index);
                    }
                });
            },
            // top end
            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "employé enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
            deleteUser(identifiant, index) {
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
                        .post(URL.EMPLOYE_DETROY, id,config)
                        .then((response) => {
                            response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.users.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(item) {
                this.userUp = item;
                this.edit_nom = this.userUp.nom;
                this.edit_prenom = this.userUp.prenoms;
                this.edit_email = this.userUp.email;
                this.edit_index = this.users.findIndex((el) => el.id === item.id);
                this.user_id = this.userUp.id;
                this.passwordEdit = this.userUp.password;

                console.log(this.userUp)
            },
            async updateUsers(bvModalEvt) {
                this.edit_contactFinal=this.edit_contact.formatted
                const index = this.edit_index;
                this.edit_validateContact();
                this.validateEditPrenom();
                this.validateEditNom();
                this.validateEditRole();
                this.validateEditPassword();

                
                if ( this.valideEditNom || this.valideEditPrenom  || this.edit_valideContactNumber || this.edit_valideContact || this.valideEditRole || this.valideEditPassword) {
                    bvModalEvt.preventDefault();
                } else {
                    if (
                        this.users[index].nom != this.edit_nom ||
                        this.users[index].prenoms != this.edit_prenom ||
                        this.users[index].email != this.edit_email ||
                        this.users[index].role != this.selectedEditRole ||
                        this.users[index].contact != this.edit_contactFinal ||
                        this.users[index].password  != this.passwordEdit
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
                                        role: this.selectedEditRole[0].name,
                                        user_id: this.user_id,
                                        nom: this.edit_nom,
                                        prenoms: this.edit_prenom,
                                        email: this.edit_email,
                                        contact: this.edit_contactFinal,
                                        indicateur:this.edit_indicatifFinal,
                                        password:this.passwordEdit,


                                        
                                    };
                                    console.log(this.selectedEditRole[0].name, 'foutou')
                                    // console.log(role)
                                    const config = {
                                        headers: {
                                            'Accept': 'application/json'
                                        },
                                    }
                                    axios
                                        .post(URL.USER_UPDATE, data,config)
                                        .then((response) => {
                                            response.data;
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    this.users[index].nom = this.edit_nom;
                                    this.users[index].prenoms = this.edit_prenom;
                                    this.users[index].email = this.edit_email;
                                    this.users[index].contact =this.edit_contactFinal;
                                    this.users[index].indicateur=this.edit_indicatifFinal
                                    this.users[index].password = this.passwordEdit;
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                        // this.selectedRole = "";
                    }
                }
            },



            validateEntrepriseEditNom() {
                if (!this.edit_nomEntreprise) {
                    this.valideEntrepriseNom = true;
                } else {
                    this.valideEntrepriseNom = false;
                }
            },

            validateEntrepriseDateEdit() {
                if (!this.edit_dateEntreprise) {
                    this.valideEntrepriseDateEdit = true;
                } else {
                    this.valideEntrepriseDateEdit = false;
                }
            },

            validateEntrepriseAddEdit() {
                if (!this.edit_EntrepriseAdd) {
                    this.valideEntrepriseAdresse = true;
                } else {
                    this.valideEntrepriseAdresse = false;
                }
            },

            // validateEntrepriseContactEdit() {
            //     if (!this.edit_contactEntreprise) {
            //         this.valideEntrepriseContact = true;
            //     } else {
            //         this.valideEntrepriseContact = false;
            //     }
            // },

            // validateEntrepriseAdresseEmail() {
            //     if (!this.edit_emailEntreprise) {
            //         this.valideEmailEntreprise = true;
            //     } else {
            //         this.valideEmailEntreprise = false;
            //     }
            // },

            validateEntrepriseAdresseEmail() {
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!this.edit_emailEntreprise.match(emailPattern) && this.edit_emailEntreprise !== "") {
                    this.valideEmailEntreprise = true;
                    this.erreur = true;
                } else {
                    this.valideEmailEntreprise = false;
                    this.erreur = false;
                }

                // const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                // if (!this.email.match(emailPattern) && this.email !== "") {
                //     this.valideEmail = true;
                //     this.erreur = true;
                // } else {
                //     this.valideEmail = false;
                //     this.erreur = false;
                // }
            },

            validateSiteEdit() {
                if (!this.edit_site) {
                    this.valideSite = true;
                } else {
                    this.valideSite = false;
                }
            },

            update2(entrepriseInfo){
                this.entrepriseUp = entrepriseInfo;
                this.entreprise_id = this.entrepriseUp.id;
                this.description = this.entrepriseUp.description;
                console.log(this.description)
            },

            update1(entrepriseInfo){
                this.entrepriseUp = entrepriseInfo;
                this.edit_nomEntreprise = this.entrepriseUp.libelle;
                this.edit_dateEntreprise = this.entrepriseUp.created_at;
                // this.edit_EntrepriseAdd = this.entrepriseUp.adresse;
                this.edit_EntrepriseAdd = this.entrepriseUp.localisation;
                // this.edit_contactEntreprise = this.entrepriseUp.contact ;
                this.edit_emailEntreprise = this.entrepriseUp.email ;
                this.edit_site = this.entrepriseUp.site_internet;
                this.entreprise_id = this.entrepriseUp.id;
                // this.description = this.entrepriseUp.description;

                // console.log(this.description)
            },

            async updatePresentation(bvModalEvt) {                           
                try {
                    const data = {
                        id: this.entreprise_id,
                        description:this.description,
                    };

                    console.log(this.description)
                    const config = {
                        headers: {
                            'Accept': 'application/json'
                        },
                    }
                    axios
                        .post(URL.PRESENTATION_UPDATE, data,config)
                        .then((response) => {
                            response.data;
                        })
                        
                    console.log(this.description)

                    .catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                        }
                    });
                } catch (error) {
                    console.log(error.type);
                }
                            
                        
            },


            async updateEntreprise(bvModalEvt) {
                this.edit_contactFinalEntreprise=this.edit_contactEntreprise.formatted
                this.validateEntrepriseEditNom();
                this.validateEntrepriseDateEdit();
                this.validateEntrepriseAddEdit();
                // this.validateEntrepriseContactEdit();
                this.edit_validateContactEntreprise();
                // this.validateEntrepriseAdresseEmail();
                this.validateSiteEdit();
                
                //  this.valideEntrepriseAdresse||
                if ( this.valideEntrepriseNom || this.valideEntrepriseDateEdit || this.edit_valideContactEntreprise|| this.edit_valideContactEntrepriseNumber || this.valideSite ){
                    bvModalEvt.preventDefault();
                } else {
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
                                        id: this.entreprise_id,
                                        libelle: this.edit_nomEntreprise,
                                        created_at:this.edit_dateEntreprise,
                                        indicateur:this.edit_indicatifFinalEntreprise,
                                        contact:this.edit_contactFinalEntreprise,
                                        email:this.edit_emailEntreprise,
                                        site_internet:this.edit_site,
                                        // adresse:this.edit_EntrepriseAdd,
                                        localisation:JSON.parse(localStorage.getItem('place')),
                                    };

                                    console.log(this.edit_indicatifFinalEntreprise)
                                    const config = {
                                        headers: {
                                            'Accept': 'application/json'
                                        },
                                    }
                                    axios
                                        .post(URL.ENTREPRISE_UPDATE, data,config)
                                        .then((response) => {
                                            response.data;
                                        })
                                        
                                    console.log(this.entreprise_id)

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
                        // this.selectedRole = "";
                }
            },



            isDigit(str) {
                return /^\d+$/.test(str);
            },
             
            validateEditRole() {
                if (this.selectedEditRole== "") {
                    this.valideEditRole = true;
                    this.erreur = true;
                    } else {
                    this.valideEditRole = false;
                    this.erreur = false;
                }
                
            },

            validateEditEmail() {
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!this.edit_email.match(emailPattern) && this.edit_email !== "") {
                    this.valideEditEmail = true;
                } else {
                    this.valideEditEmail = false;
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
            
            validateEditNom() {
                if (!this.edit_nom) {
                    this.valideEditNom = true;
                } else {
                    this.valideEditNom = false;
                }
            },
            validateEditPrenom() {
                if (!this.edit_prenom) {
                    this.valideEditPrenom = true;
                } else {
                    this.valideEditPrenom = false;
                }
            },
            
            
          
            if_exist() {
                for (let index = 0; index < this.users.length; index++) {
                    if (this.contactFinal == this.users[index].contact) {
                        this.user_exist = "Ce employé existe déjà! Veuillez vérifier le contact";
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



            // ----------------Update contact entreprise-------------------------
            

            edit_contactEntierEntreprise(e){
               this.edit_contactEntreprise=e
            //    console.log(this.phone)
            },
            edit_changerEntreprise(e){
                console.log(this.phone)
                this.edit_contactEntreprise.country.name=e.name 
            },


            validateEditContactEntreprise() {
                if (!this.edit_contactEntreprise) {
                    this.validateEditContactEntreprise = true;
                    this.erreur = true;
                } else {
                    this.validateEditContactEntreprise = false;
                    this.erreur = false;
                }
                if (this.edit_contactEntreprise && this.isDigit(this.edit_contactEntreprise) === false) {
                    this.validateEditContactEntrepriseNumber = true;
                } else {
                    this.validateEditContactEntrepriseNumber = false;
                }
            },

            edit_validateContactEntreprise() {
                if (!this.edit_contactFinalEntreprise) {
                    this.edit_valideContactEntreprise = true;
                    this.erreur = true;
                } else {
                    this.edit_indicatifFinalEntreprise=this.edit_indicatifFinalEntreprise="+"+""+this.edit_contactEntreprise.country.dialCode
                    this.edit_valideContactEntreprise = false;
                    this.erreur = false;
                }
                if (this.edit_contactFinalEntreprise && this.edit_contactFinalEntreprise.length<8) {
                    this.edit_valideContactEntrepriseNumber = true;
                } else {
                    this.edit_valideContactEntrepriseNumber = false;
                }
            },
  


        },
    };
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-profile.scss';
@import "@core/scss/vue/libs/vue-select.scss";
@import '@core/scss/vue/libs/vue-flatpicker.scss';


.position-relative {
    position: relative !important;
}

.d-flex {
    display: flex !important;
}
.profile-img-container {
    position: absolute;
    bottom: -2rem;
    z-index: 2;
}
.profile-img-container {
    left: 2.14rem;
}
.img-fluid {
    max-width: 100%;
    height: auto;
}

.align-items-center {
    align-items: center !important;
}

.profile-img {
    border: 0.357rem solid #fff;
    background-color: #fff;
    border-radius: 0.428rem;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}
.rounded {
    border-radius: 0.357rem !important;
}

 .dt{
      color: green;
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
