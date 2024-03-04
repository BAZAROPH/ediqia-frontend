<template>
  <validation-observer ref="addEmprunt">
    <b-form class="auth-register-form mt-2" @submit.prevent>
      <b-row>
        <b-col lg="10" class="m-auto">
          <b-card class="pr-3 pl-3">
            <b-row class="mb-2 d-flex">
              <b-col lg="6"></b-col>
              <b-col lg="6" class="ml-auto">
                <div class="somme">
                  <h4 style="text-align: right; font-weight: bold;">Somme de l'emprunt : <span class="text-danger font-weight-bold">{{ convert() }}</span></h4>
                </div>
              </b-col>
            </b-row>
           <section>
            <b-row>
              <b-col lg="12">
                <!-- Nom-->
                <b-form-group
                  label=""
                  label-for="customer-name"
                >
                  <label> Libellé <span class="p-0 text-danger h6">*</span> </label>
                  <validation-provider #default="{ errors }" name="montant" rules="required">
                    <b-form-input
                      id="customer-name"
                      v-model="libelle"
                      trim
                      :state="errors.length > 0 ? false:null" 
                      @input="validateLibelle"
                      placeholder="Emprunt de rénovation"
                    />
                       <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                           Vous devez renseigner le libellé de la depense
                       </small>
                  </validation-provider>
                </b-form-group>

                <b-row>
                  <!-- compte -->
                  <b-col lg="6" class="m-auto">
                    <b-form-group label="" label-for="register-libelle">
                      <label> Compte <span class="p-0 text-danger h6">*</span> </label>
                      <validation-provider #default="{ errors }" name="montant" rules="required">
                        <v-select v-model="selectedCompte" @input="validateSelectedCompte" placeholder="Selectionnez un compte" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="compteList" :state="errors.length > 0 ? false:null">
                          <template #list-header>
                            <li v-b-toggle.sidebar-invoice-add-new-customers-a class="add-new-client-header d-flex align-items-center my-50">
                              <feather-icon icon="PlusIcon" size="16" />
                              <span class="align-middle ml-25">créer un compte</span>
                            </li>
                          </template>
                        </v-select>
                          <small :class="valideSelectedCompte ? 'block' : 'none'" class="text-danger">
                           Vous devez sélectionner un compte
                       </small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <!-- Creancier -->
                  <b-col lg="6" class="m-auto">
                    <b-form-group label="" label-for="register-creancier">
                      <label> Créancier <span class="p-0 text-danger h6">*</span> </label>
                      <validation-provider #default="{ errors }" name="montant" rules="required">
                        <v-select v-model="selectedCreancier" @input="validateSelectedCreancier" placeholder="Selectionnez un creancier" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="nom" :options="creancierList" :state="errors.length > 0 ? false:null">
                          <template #list-header>
                            <li v-b-toggle.sidebar-invoice-add-new-customer class="add-new-client-header d-flex align-items-center my-50">
                              <feather-icon icon="PlusIcon" size="16" />
                              
                              <span class="align-middle ml-25">créer un créancier</span>
                            </li>
                          </template>
                        </v-select>
                         <small :class="valideSelectedCreancier ? 'block' : 'none'" class="text-danger">
                           Vous devez sélectionner un creancier
                       </small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <!-- montant -->
                  <b-col lg="4" class="">
                    <b-form-group label="" label-for="register-montant">
                      <label> Montant <span class="p-0 text-danger h6">*</span> </label>
                      <validation-provider #default="{ errors }" name="montant" rules="required">
                        <b-form-input id="register-montant" @input="validateMontant" v-model="montant" name="register-montant" :state="errors.length > 0 ? false:null" placeholder="" />
                       <small :class="valideMontant ? 'block' : 'none'" class="text-danger">
                           Vous devez entrer un montant
                       </small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                   <!-- Taux d'interet -->
                  <b-col lg="4" class="">
                    <b-form-group label="" label-for="register-taux">
                       <label> Taux d'interet <span class="p-0 text-danger h6">*</span> </label>
                      <validation-provider #default="{ errors }" name="taux" rules="required">
                        <b-form-input id="register-taux" @input="validateTaux" v-model="taux" name="register-taux" :state="errors.length > 0 ? false:null" placeholder="" />
                       <small :class="valideTaux ? 'block' : 'none'" class="text-danger">
                           Vous devez entrer un taux
                       </small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <!-- Delai -->
                  <b-col lg="4" class="">
                    <b-form-group>
                        <label> Date de l'emprunt <span class="p-0 text-danger h6">*</span> </label>
                      <validation-provider #default="{ errors }" name="taux" rules="required">
                        <flat-pickr
                          v-model="date_emprunt"
                          class="form-control"
                          @input="validateDate"
                          :state="errors.length > 0 ? false:null"
                        />
                        <small :class="valideEmprunt ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner la date d'emprunt
                        </small>
                      </validation-provider>
                    </b-form-group>                           
                  </b-col>
                </b-row>


                <b-row>


                  <!-- Date_renboursement -->
                  <b-col lg="12" class="m-auto">
                   <b-form-group>
                    <label>
                        Date du remboursement
                      <span class="p-0 text-danger h6">*</span>
                    </label>
                      <validation-provider #default="{ errors }" name="taux" rules="required">
                          <flat-pickr
                          v-model="date_remboursement"
                          class="form-control"
                          @input="validateDate"
                          :state="errors.length > 0 ? false:null"
                          />
                          <small :class="valideRemboursement ? 'block' : 'none'" class="text-danger">
                              Vous devez renseigner la date de remboursement
                          </small>
                      </validation-provider>
                  </b-form-group>                                  
                  </b-col>
                </b-row>

                <!-- Description -->
                <b-form-group label="Motif de l'emprunt" label-for="register-description">
                  <b-form-textarea id="textarea" v-model="description" placeholder="Saisissez une description" rows="5" max-rows="6"></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <hr class="my-60">

            <h3 class="m-2">Périodes de remboursement</h3>

        
            <b-card-body class="invoice-padding form-item-section" >
              <div
                ref="form"
                class="repeater-form"
                :style="{ height: trHeight }"
                v-if="showForm===true"
              >
                <b-row
                  v-for="(item, index) in remboursements"
                  :key="index"
                  ref="row"
                  class="pb-2"
                  
                >
                  <!-- Item Form -->
                  <!-- ? This will be in loop => So consider below markup for single item -->
                  <b-col cols="12">
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-none d-lg-flex">
                      <b-row class="flex-grow-1 px-1">
                        <!-- Single Item Form Headers -->
                        <b-col cols="12" lg="4">
                          Date du remboursement <span class="p-0 text-danger h6">*</span>
                          <!-- <span class="p-0 text-danger h6">*</span> -->
                        </b-col>
                        <b-col cols="12" lg="4">
                          Montant du remboursement <span class="p-0 text-danger h6">*</span>
                          <!-- <span class="p-0 text-danger h6">*</span> -->
                        </b-col>
                        <b-col cols="12" lg="4">
                          Status du remboursement 
                          <!-- <span class="p-0 text-danger h6">*</span> -->
                        </b-col>
                      </b-row>
                      <div class="form-item-action-col" />
                    </div>

                    <!-- Form Input Fields OR content inside bordered area  -->
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-flex border rounded">
                      <b-row class="flex-grow-1 p-2">
                        <!-- Single Item Form Headers -->
                        <b-col cols="12" lg="4">
                          <label class="d-inline d-lg-none">Date du remboursement <span class="p-0 text-danger h6">*</span></label>
                            <validation-provider #default="{ errors }" name="date de remboursement" rules="required">
                          <flat-pickr
                            v-model="item.date"
                            class="form-control"
                            @input="validateDateRemboursement(item.date, index)"
                              :state="errors.length > 0 ? false:null"
                          />
                            <small v-if="errorInput.path === 'item.date'" class="text-danger">
                             	{{ errorInput.message }}
                          </small>
                           </validation-provider>
                        </b-col>
                        <b-col cols="12" lg="4">
                          <label class="d-inline d-lg-none">Montant du remboursement <span class="p-0 text-danger h6">*</span></label>
                          <validation-provider #default="{ errors }" name="date de remboursement" rules="required">
                          <b-form-input
                            v-model="item.montant"
                              :state="errors.length > 0 ? false:null"
                              @input="validateMontantRemboursement"
                            type="number"
                            class="mb-2"
                          />
                            <small :class="valideMontantRemboursement ? 'block' : 'none'" class="text-danger">
                              Vous devez renseigner le montant
                          </small>
                           </validation-provider>
                        </b-col>
                        <b-col cols="12" lg="4">
                          <label class="d-inline d-lg-none">Status du remboursement</label>
                          <v-select
                            v-model="item.status"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="status"
                            :clearable="false"
                            :options="paiementStatus"
                          />
                        </b-col>
                      </b-row>
                      <div
                        class="d-flex flex-column justify-content-between border-left py-50 px-25"
                      >
                        <feather-icon
                          size="16"
                          icon="XIcon"
                          class="cursor-pointer"
                          @click="removeItem(index)"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <b-row>
                <b-col cols="12">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    size="md"
                    variant="primary"
                    @click="addNewItemInItemForm"
                  >
                    Ajouter une date de remboursement
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>



            <!-- Form Actions -->
            <div class="text-right mt-2 ">             
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                variant="outline-secondary"
                class="mr-2"             
                @click="hide"
              >
                Annuler
              </b-button>
               <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                type="submit"
                @click="saveEmprunt"
              >
                Ajouter
              </b-button>
            </div>



            <!-- FORMULAIRE POUR AJOUTER UN NOUVEAU COMPTE -->
              <b-sidebar
              id="sidebar-invoice-add-new-customers-a"
              sidebar-class="sidebar-lg"
              ref="sidebarCompte"
              bg-variant="white"
              shadow
              backdrop
              no-header
              right
            >
              <template  #default="{}">
                <!-- Header -->
                <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                  <h5 class="mb-0">
                  Ajouter un compte
                  </h5>

                  <feather-icon
                    class="ml-1 cursor-pointer"
                    icon="XIcon"
                    size="16"
                   
                  />

                </div>

                <!-- Body -->
                <b-form
                  class="p-2"
                  @submit.prevent
                >

                  <!-- Numero compte -->
                  <b-form-group
                    label="Numero de compte"
                    label-for="customer-name"
                  >
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                      <b-form-input id="register-nom" @input="validateNumeroCompte" v-model="compte.numero_compte" name="register-numeroCompte" :state="errors.length > 0 ? false:null" placeholder="AZ000000EH09" />
                    <small :class="valideNumeroCompte ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le numero du compte
                    </small>
                    </validation-provider>
                  </b-form-group>

                  <!-- Libelle -->

                  <b-form-group
                    label="Libelle"
                    label-for="customer-name"
                  >
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                      <b-form-input id="register-libelle" @input="validateLibelleCompte" v-model="compte.libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="NSIA, ECOBANK" />
                     <small :class="valideLibelleCompte ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le libelle
                    </small>
                    </validation-provider>
                  </b-form-group>

                  <!-- Solde -->
                  <b-form-group
                    label="solde"
                    label-for="solde"
                  >
                    <validation-provider #default="{ errors }" name="solde" rules="required">
                      <b-form-input id="register-solde" @input="validateSoldeCompte" v-model="compte.solde" type="text" name="register-solde" :state="errors.length > 0 ? false:null" placeholder="1000000000" />
                     <small :class="valideSoldeCompte ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le solde
                    </small>
                    </validation-provider>
                  </b-form-group>
                  
                  <!-- Description -->
                  <b-form-group>
                    <label for="taxeValue">Description (facultatif):</label>
                    <b-form-textarea id="textarea" v-model="compte.description" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
                  </b-form-group> 

                  
                  <!-- Form Actions -->
                  <div class="d-flex mt-2">
                    <b-button
                      v-b-toggle.sidebar-invoice-add-new-customers
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="primary"
                      class="mr-2"
                      type="submit"
                      @click="saveCompte"
                    >
                      Ajouter
                    </b-button>
                    <b-button
                      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                      variant="outline-secondary"
                    >
                      Annuler 
                    </b-button>
                  </div>
                </b-form>
              </template>
            </b-sidebar>
                     
                        <!-- end sidebar add compte -->


  <!-- FORMULAIRE POUR AJOUTER UN FOURNISSEUR -->
                        <b-sidebar id="sidebar-invoice-add-new-customer" sidebar-class="sidebar-lg" ref="sidebarCreancier" bg-variant="white" shadow backdrop no-header right>
                            <template #default="{ hide}">
                                 <!-- Header -->
                <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                  <h5 class="mb-0">
                  Ajouter un Créancier
                  </h5>

                  <feather-icon
                    class="ml-1 cursor-pointer"
                    icon="XIcon"
                    size="16"
                    @click="hide"
                  />

                </div>

                                <!-- Body -->
                                <b-form @submit.prevent class="p-2">

                                  <!-- type créancier -->  
                           <b-form-group label="" label-for="entreprise-domaine">
                                 <label for=""> Type créancier <span class="p-0 text-danger h6">*</span></label>
                             <validation-provider #default="{  }" name="nom" rules="required">
                               <v-select @input="validateTypeCreancier" v-model="creancier_type" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="TypeCreancierList" />
                              <small :class="valideTypeCreancier ? 'block' : 'none'" class="text-danger">
                                Vous devez sélectionner un compte
                             </small>
                             </validation-provider>
                           </b-form-group>
                            
                                    <!-- nom -->
                                    <b-form-group label="" label-for="register-nom">
                                      <label for="">Nom <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="nom" rules="required">
                                            <b-form-input id="register-nom" @input="validateNom" v-model="customer.nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                                            <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                                 Vous devez renseigner le nom du creancier
                                             </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- nom -->
                                    <b-form-group label="Prenom" label-for="register-nom">
                                        <validation-provider #default="{ errors }" name="nom" rules="">
                                            <b-form-input id="register-nom" v-model="customer.prenoms" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                                            <!-- <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le prenom du fournisseur
                                            </small> -->
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Libelle -->

                                    <b-form-group label="" label-for="register-email">
                                    <label for="">Email</label>
                                        <validation-provider #default="{ errors }" name="Email" rules="">
                                            <b-form-input id="register-email" v-model="customer.email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                                            <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                            Veuillez entrer un email valide
                                                </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- contact -->
                                    <b-form-group label="" label-for="register-contact">
                                     <label for="">Contact <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="contact" rules="required">
                                            <vue-tel-input
                                                id="register-contact"
                                                @country-changed="changer"
                                                @validate="contactEntier($event)"
                                                v-model="customer.contact"
                                                @input="vider"
                                                name="register-contact"
                                                :state="errors.length > 0 ? false:null"
                                                placeholder="000-000-000-000"
                                            />
                                            <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                                                  Veuillez renseigner le contact du creancier
                                              </small>
                                            <!-- <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                                                Ce numéro de téléphone n'est pas valide
                                            </small> -->
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Localisation -->
                                    <b-form-group label-for="entreprise-localisation" class="localisation">
                        <validation-provider #default="{ }" name="localisation" rules="required">
                            <div id="custom-search-input" class="mb-1">
                                <div class="input-group">
                                    <input id="autocomplete_search" @input="initialize" v-model="localisation" name="autocomplete_search" type="text" class="form-control" placeholder="Votre adresse" />
                                    <input type="hidden" name="lat">
                                    <input type="hidden" name="long">
                                </div>
                            </div>
                            <small :class="valideLocalisation ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer la localisation du client
                            </small>
                        </validation-provider>
                    </b-form-group>

                                    <!-- Form Actions -->
                                    <div class="d-flex mt-2">
                                        <b-button v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="createCreancier">
                                            Ajouter
                                        </b-button>
                                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" >
                                            Annuler
                                        </b-button>
                                    </div>
                                </b-form>
                            </template>
                        </b-sidebar>
                        <!-- end sidebar add fournisseur -->
           </section>           

          </b-card>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg, BFormCheckboxGroup } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { heightTransition } from '@core/mixins/ui/transition'
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
      BFormCheckboxGroup,
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
    mixins: [heightTransition],
    data() {
      return {
        creanciers:[],
        comptes:[],
        selectedCompte:"",
        selectedCreancier:"",
        montant:"",
        taux:"",
        delai:"",
         indicateurFinal: '',
        date_emprunt:"",
        date_remboursement:"",
        compte:"",
        creancier:"",
        // ValideCompte:"",
        description:"",
        valideMontant:"",
        valideTaux:"",
        valideEmprunt:"",
        valideDelai:"",
        valideContactNumber:"",
        valideRemboursement:"",
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
        date: null,
        dateDebut: null,
        valideDateDebut:false,

        ValideCreancier:false,
        compteList: [],
        creancierList: [],
        TypeCreancierList: [],
        file: [],
showForm:false,
        //variable validation

        valideLibelle:false,
        valideSelectedCompte:"",
        valideSelectedCreancier:"",
        valideMontant:false,
        valideTaux:false,
        valideContact:false,
        valideTypeCreancier:false,
        valideNom:false,
        valideContact:false,
        valideNumeroCompte:false,
        valideLibelleCompte:false,
        valideSoldeCompte:false,
       valideMontantRemboursement: false,
       valideDateRemboursement:false,


        errorInput:{
        	path: '',
        			message: '',
        },


        compte: {
          solde: '',
          numero_compte: '',
          libelle: '',
          description: '',
        },
        item:{
          date:"",
          montant:"",
        },

        customer: {
          nom: '',
          prenoms: '',
          email: '',
          description: '',
          type: '',
          contact: '',
          logo: ''
        },

        // creancierType: [],
        creancier_type: '',

        libelle: '',

        entreprise_id: '',

        selected: '',

        paiementStatus: [{ status: 'Soldé' }, { status: 'Partiel' }, { status: 'A payer' }],

        remboursements: [{ date: '', montant: '', status: '' }],

        modelRemboursement: { date: '', montant: '', status: '' },

        montantValidation: false
      };
    },
    async mounted (){
      document.title = 'Nouvel Emprunt';
      google.maps.event.addDomListener(window, 'load', initialize);

      try{
        this.initTrHeight()
        await axios.get(URL.EMPRUNT_LIST).then((response) => {
          const data = response.data.user
          this.entreprise_id = response.data.auth
          this.creancierList = data.filter(item => {
            return item.type_user_creancier === 'creancier'
          })
        }).catch(error => {
          console.log(error)
        })
        

        await axios.get(URL.COMPTE_LIST).then((response) => {
          this.compteList = response.data[0]
        }).catch(error => {
          console.log(error)
        })


        await axios.get(URL.EMPRUNT_LIST_CREATE).then((response) => {
          this.TypeCreancierList = response.data.creancierList
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })

      }
      catch (error) {
        console.log("ok");
        console.log(error);
      }

    },
    created() {
      window.addEventListener('resize', this.initTrHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
   contactEntier(e) {
                this.contact = e;
                //    console.log(this.phone)
            },
            changer(e) {
                this.contact.country.name = e.name;
            },

               initialize() {
                var input = document.getElementById('autocomplete_search');
                var autocomplete = new google.maps.places.Autocomplete(input);
               
                autocomplete.addListener('place_changed', function () {
                    var place = autocomplete.getPlace();
                    // place variable will have all the information you are looking for.
                    $('#lat').val(place.geometry['location'].lat());
                    $('#long').val(place.geometry['location'].lng());
                    localStorage.setItem('place', JSON.stringify(place)) 
                });
             },


      //FUNCTION VALIDATION 

      vider(){
    this.valideContact = false;
},
  validateContact() {
                this.contactFinal=this.contact.formatted
                if (!this.contactFinal) {
                    this.valideContact = true;
                   
                } else {
                    this.valideContact = false;
                   
                }

                if (this.contactFinal && this.contactFinal.length<8) {
                    this.valideContactNumber = true;
                    this.erreur = true;
                } else {
                    this.valideContactNumber = false;
                    this.erreur = false;
                }
            },

validateTypeCreancier() {
                if (!this.creancier_type) {
                    this.valideTypeCreancier = true;
                } else {
                    this.valideTypeCreancier = false;
                }
            },

 validateNom() {
                if (!this.customer.nom) {
                    this.valideNom = true;
                } else {
                    this.valideNom = false;
                }
            },

              validateNumeroCompte() {
                if (!this.compte.numero_compte) {
                    this.valideNumeroCompte = true;
                } else {
                    this.valideNumeroCompte = false;
                }
            },

            validateLibelleCompte() {
                if (!this.compte.libelle) {
                    this.valideLibelleCompte = true;
                } else {
                    this.valideLibelleCompte = false;
                }
            },

              validateSoldeCompte() {
                if (!this.compte.solde) {
                    this.valideSoldeCompte = true;
                } else {
                    this.valideSoldeCompte = false;
                }
            },

         validateLibelle() {
                if (!this.libelle) {
                    this.valideLibelle = true;
                } else {
                    this.valideLibelle = false;
                }
            },

              validateSelectedCompte() {
                if (!this.selectedCompte) {
                    this.valideSelectedCompte = true;
                } else {
                    this.valideSelectedCompte = false;
                }
            },

             validateSelectedCreancier() {
                if (!this.selectedCreancier) {
                    this.valideSelectedCreancier= true;
                } else {
                    this.valideSelectedCreancier = false;
                }
            },

            validateMontant() {
                          if (!this.montant) {
                              this.valideMontant= true;
                          } else {
                              this.valideMontant = false;
                          }
                      },

            validateTaux() {
              if (!this.taux) {
                  this.valideTaux= true;
              } else {
                  this.valideTaux = false;
              }
          },

          validateTaux() {
              if (!this.taux) {
                  this.valideTaux= true;
              } else {
                  this.valideTaux = false;
              }
          },

                      




/* ****************************** */

      // FUNCTION DE VALIDATION DES DATES
      validateDate() {
        const date_emprunt = this.date_emprunt
        const date_remboursement = this.date_remboursement
        if (this.date_remboursement !== '' && this.date_emprunt !== '') {
          if (date_remboursement < date_emprunt) {
            this.dateAlert()
            this.date_remboursement = ''
          } else {
            return
          }
        }

        if (!this.date_emprunt && !this.date_remboursement) {
          this.valideEmprunt = true;
           this.valideRemboursement = true;
        }else {
          this.valideEmprunt = false;
           this.valideRemboursement = false;
        }
        
      },

     
      // DEUXIEME FUNCTION DE VALIDATION DES DATES

      // validateMontantRemboursement(){
      //  if (!this.item.montant) {
      //      this.valideMontantRemboursement = true;
      //   }else {
      //      this.valideMontantRemboursement = false;
      //   }
      // },
   

      validateDateRemboursement(date, index) {
        const date_emprunt = this.date_emprunt
        const date_remboursement = this.date_remboursement
        if (this.date_remboursement !== '' && this.date_emprunt !== '' && date !== '') {
          if (date_emprunt > date || date_remboursement < date) {
            this.dateAlertRemboursement(date_emprunt, date_remboursement)
            this.remboursements[index].date = date_emprunt
          } else {
            return
          }
        } else if (this.date_remboursement !== '' && this.date_emprunt !== '' && date === '') {
          return
        } else {
          return
        }
        
      },

      valideMontantTotal () {
        let sum = parseFloat(this.montant * (1 + (this.taux / 100)))
        const montantTotal = sum.toFixed(2)
        let element = 0

        for (let i = 0; i < this.remboursements.length; i++) {
          element += Number(this.remboursements[i].montant)
        }

        if (montantTotal < element) {
          this.montantValidation = true
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'La somme des montants de remboursement est plus élévé que le montant total de l\'emprunt !',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          }).then(result => {
              if (result.value) {
                this.remboursements.splice((this.remboursements.length - 1), 1)
                this.trTrimHeight(this.$refs.row[0].offsetHeight)
              }
            })
          
        } else {
          this.montantValidation = false
        }
      },

      // with footer
      dateAlertRemboursement(emprunt, remboursement) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: `Choisir une date comprise entre le ${emprunt} et le ${remboursement}`,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      },

      // FUNCTION TO CONVERT NUMBER INTO CURRENCY
      convert() {
        const formatter = new Intl.NumberFormat('ci-CI', {
          style: 'currency',
          currency: 'XOF',
          minimumFractionDigits: 2
        })
 
        let sum = parseFloat(this.montant * (1 + (this.taux / 100)))

        return formatter.format(sum.toFixed(2))
      },
      addNewItemInItemForm() {
        this.showForm=true;
        // this.valideMontantTotal()

        if (this.montantValidation) {

          return

        } 
        else {

          this.$refs.form.style.overflow = 'hidden'
          this.remboursements.push(
            JSON.parse(JSON.stringify(this.modelRemboursement)),
          )

          this.$nextTick(() => {
            this.trAddHeight(this.$refs.row[0].offsetHeight)
            setTimeout(() => {
              this.$refs.form.style.overflow = null
            }, 350)
          })

        }
      },
      removeItem(index) {
        
        if (this.remboursements.length === 0) {
         this.showForm === false;
        }

        this.remboursements.splice(index, 1)
        this.trTrimHeight(this.$refs.row[0].offsetHeight)
      },
      updateItemForm(index, val) {
        const { date } = val
        this.remboursements[index].date = date
      },
      updateItemMontant(index, val) {
        const { montant } = val
        this.remboursements[index].montant = montant
      },
      updateItemStatus(index, val) {
        const { status } = val
        this.remboursements[index].status = status
      },
      initTrHeight() {
        this.trSetHeight(null)
        this.$nextTick(() => {
          this.trSetHeight(this.$refs.form.scrollHeight)
        })
      },

      topEnd() {
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "Compte enregistré avec succès",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      },

      topEnd2() {
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "Créancier enregistré avec succès",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      },

      successEmprunt() {
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "Emprunt enregistré avec succès",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      },

      async createCreancier() {
        try {

          this.validateTypeCreancier();
          this.validateNom();
          this.validateContact();
          const config = {
            headers: {
              'Accept': 'application/json'
            },
          }
       this.indicatifFinal = "+" + "" + this.contact.country.dialCode;
          const data = {
            type_user_creancier: this.creancier_type.id,
            nom: this.customer.nom,
            prenoms: this.customer.prenoms,
            contact: this.contact.formatted,
            indicateur : this.indicatifFinal,
             localisation: JSON.parse(localStorage.getItem('place')),
            email: this.customer.email,
            description: this.customer.description,
            creancier_id: this.creancier_type.id
          }
          console.log(data)
           localStorage.removeItem('place')
          await axios.post(URL.CREANCIER_CREATE, data, config).then((response) => {
               this.$refs.sidebarCreancier.hide();
          axios.get(URL.EMPRUNT_LIST).then((response) => {
              const data = response.data.user
              this.creancier_type = ''
              this.customer.nom = ''
              this.customer.prenoms = ''
              this.customer.contact = ''
              this.customer.email = ''
              this.indicateurFinal = ''
              this.customer.description = ''
              this.customer.logo = ''
              this.customer.type = ''
              this.creancierList = data.filter(item => {
                return item.type_user_creancier === 'creancier'
              })
            }).catch(error => {
              console.log(error)
            })
            this.topEnd2()
          }).catch((error) => {
            console.log(error)
          })
        } catch (error) {
          console.log('trycatch error', error)
        }
      },

      async saveCompte(bvModalEvt) {
        try {
        this.validateNumeroCompte();
         this.validateLibelleCompte();
         this.validateSoldeCompte();
         
          const config = {
            headers: {
              'Accept': 'application/json'
            },
          }

          if (this.valideNumeroCompte || this.valideLibelleCompte || this.valideSoldeCompte) {
                bvModalEvt.preventDefault();
                
          }else{
            const data = this.compte
            await axios.post(URL.COMPTE_CREATE, data, config).then((response) => {
              this.topEnd()
              this.$refs.sidebarCompte.hide();
              this.compte.solde = ''
              this.compte.numero_compte = ''
              this.compte.description = ''
              this.compte.libelle = ''
              axios.get(URL.COMPTE_LIST).then((response) => {
                this.compteList = response.data[0]
              }).catch(error => {
                console.log(error)
              })
            });
          }

        } catch (error) {
          console.log('trycatch error', error)
        }
      },

      hide() {
        this.$router.push('/emprunts')
      },

      async saveEmprunt() {
        try {

          if (!this.remboursements.date) {
				// shake alert quand le champ date d'émission n'est pas rempli
				this.$swal({
					title: "Ajouter une date de remboursement",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			}
          if (this.erreur !== true) {

            this.valideMontantTotal();
            this.validateLibelle();
            this.validateSelectedCompte();
            this.validateSelectedCreancier();
            this.validateMontant();
            this.validateTaux();
            this.validateDate();
            this.validateDateRemboursement();

            if (!this.libelle || !this.entreprise_id || !this.selectedCompte || !this.selectedCreancier || !this.montant || !this.taux || !this.delai || !this.date_emprunt || !this.date_remboursement || !this.description || !this.remboursements || !this.remboursements.date) {
                  bvModalEvt.preventDefault()
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Veillez renseigner les champs manquant s\'il vous plait',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })

            } else if (this.montantValidation) {

              return

            } else {
              
              this.marche = true
              
              const data = {
                libelle: this.libelle,
                entreprise_id: this.entreprise_id,
                compte_id: this.selectedCompte.id,
                creancier_id: this.selectedCreancier.id,
                montant: this.montant,
                taux: this.taux,
                // delai: this.delai,
                date_emprunt: this.date_emprunt,
                date_remboursement: this.date_remboursement,
                description: this.description,
                count: this.remboursements.length,
                item: this.remboursements,
              }
              
              const config = {
                headers: {
                  Accept: "application/json",
                },
              }
              console.log(data);
              await axios.post(URL.EMPRUNT_CREATE, data, config).then((response) => {
                this.successEmprunt()
                this.$router.push('/emprunts')
                console.log('emprunt', response.data)
              })

              this.marche = false

            }

          } else {
            this.error_global = true;
            setTimeout(() => {
              this.marche = false;
            }, 300);
          }
        } catch (error) {
          console.log(error.type);         
          this.error_global = true;

          setTimeout(() => {
              this.marche = false;
          }, 300);
        }
      },

      topEnd() {
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "Emprunt enregistrée avec succès",
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

    },
  };
</script>

<style lang="scss">

@import "@core/scss/vue/libs/vue-select.scss";
@import '@core/scss/vue/libs/vue-flatpicker.scss';

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
