<template >
  <section>
    <b-row>
      <b-col lg="12">
        <div class="position-relative table-responsive table-base ">
          
          <b-card>
            <b-row>
              <!-- User Info: Left col -->
              <b-col
                lg="6"
                class="d-flex justify-content-between flex-column"
              >
                <!-- User Avatar & Action Buttons -->
                <div class="d-flex justify-content-start">
                  <b-avatar
                    :src="userData.avatar"
                    :text="avatarText(userData.name)"
                    size="104px"
                    rounded
                  />
                  <div class="d-flex flex-column ml-1">
                    <div class="mb-1">
                      <h4 class="mb-0">
                        {{ userData.nom }} {{ userData.prenoms }}
                      </h4>
                      <span class="card-text">{{ userData.email }}</span>
                    </div>
                    <div class="d-flex flex-wrap">
                      <b-button
                        variant="primary"
                        v-b-modal.modal-update-user
                      >
                        Modifier
                      </b-button>
                      <b-button
                        variant="outline-danger"
                        class="ml-1"
                      >
                        Supprimer
                      </b-button>
                    </div>
                  </div>
                </div>

                <!-- User Stats -->
                <div class="d-flex align-items-center mt-2">
                  <!-- <div class="d-flex align-items-center mr-2"> -->
                  <!-- <div> -->
                  <!-- </div> -->
                  
                    <div>
                    <h3>Coordonnées</h3>
                    <span>-----------------------------------------------------------------</span>
                      <table class="mt-2 mt-xl-0 w-100">        
                        <tr>
                          <th class="pb-50">
                              <feather-icon
                                icon="CheckIcon"
                                class="mr-75"
                              />
                              <span class="font-weight-bold">Adresse de Facturation</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.facture }}
                          </td>
                        </tr>

                        <tr>
                          <th class="pb-50">
                            <feather-icon
                              icon="BriefcaseIcon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Secteur d'activité</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.secteur }}
                          </td>
                        </tr>

                        <tr>
                          <th class="pb-50">
                            <feather-icon
                              icon="BarChart2Icon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Taille</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.taille }}
                          </td>
                        </tr>

                        <tr>
                          <th class="pb-50">
                            <feather-icon
                              icon="MailIcon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Email</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.email }}
                          </td>
                        </tr>
                  
                        <tr>
                          <th class="pb-50">
                            <feather-icon
                              icon="RssIcon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Site internet</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.site }}
                          </td>
                        </tr>

                        <tr>
                            <th class="pb-50">
                              <feather-icon
                                icon="HomeIcon"
                                class="mr-75"
                              />
                              <span class="font-weight-bold">Adresse</span>
                            </th>
                            <td class="pb-50">
                              {{ userData.localisation }}
                            </td>                   
                        </tr>

                        <tr>
                            <th class="pb-50">
                              <feather-icon
                                icon="UserIcon"
                                class="mr-75"
                              />
                              <span class="font-weight-bold">Code</span>
                            </th>
                            <td class="pb-50">
                              {{ userData.code }}
                            </td>
                        </tr>

                        <tr>
                          <th>
                            <feather-icon
                              icon="PhoneIcon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Contact</span>
                          </th>
                          <td>
                            {{ userData.indicateur }} {{ userData.contact }}
                          </td>
                        </tr>

                        <tr>
                          <th class="pb-50">
                            <feather-icon
                              icon="TypeIcon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Type</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.status_user }}
                          </td>
                        </tr>

                        <tr>
                          <th class="pb-50">
                            <feather-icon
                              icon="StarIcon"
                              class="mr-75"
                            />
                            <span class="font-weight-bold">Role</span>
                          </th>
                          <td class="pb-50 text-capitalize">
                            {{ userData.role }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  

                  <!-- </div> -->

                </div>
              </b-col>

              <!-- Right Col: Table -->
              <b-col lg="6"
              >
                <table class="mt-2 mt-xl-0 w-100">        
                  <tr>
                    <th class="pb-50">
                      <feather-icon
                        icon="MenuIcon"
                        class="mr-75"
                      />
                      <span class="font-weight-bold">Commandé en TTC</span>
                    </th>
                    <td class="pb-50">
                      {{ userData.code }}
                    </td>
                  </tr>

                  <tr>
                    <th class="pb-50">
                      <feather-icon
                        icon="LayersIcon"
                        class="mr-75"
                      />
                      <span class="font-weight-bold">Facturé en TTC</span>
                    </th>
                    <td class="pb-50">
                      {{ userData.localisation }}
                    </td>
                  </tr>

                  <tr>
                    <th class="pb-50">
                      <feather-icon
                        icon="ListIcon"
                        class="mr-75"
                      />
                      <span class="font-weight-bold">Avoir non soldés en TTC</span>
                    </th>
                    <td class="pb-50">
                      {{ userData.Avoir }}
                    </td>
                  </tr>

                  <tr>
                    <th class="pb-50">
                      <feather-icon
                        icon="LoaderIcon"
                        class="mr-75"
                      />
                      <span class="font-weight-bold">Créances</span>
                    </th>
                    <td class="pb-50">
                      {{ userData.Avoir }}
                    </td>
                  </tr>
                  
                  <tr>
                    <th class="pb-50">
                      <feather-icon
                        icon="CopyIcon"
                        class="mr-75"
                      />
                      <span class="font-weight-bold">Recettes encaissées</span>
                    </th>
                    <td class="pb-50">
                      {{ userData.Avoir }}
                    </td>
                  </tr>

                  <tr>
                    <th class="pb-50">
                      <feather-icon
                        icon="DollarSignIcon"
                        class="mr-75"
                      />
                      <span class="font-weight-bold">Recettes attente d'encaissement</span>
                    </th>
                    <td class="pb-50">
                      {{ userData.Avoir }}
                    </td>
                  </tr>

                </table>
              </b-col>
              
            </b-row>
          </b-card>
        <!-- </div> -->



        <!-- :::::::: -->
      
        <!-- Debut tabs -->
                  

        <!-- <b-card>
          <client-more-detail/>      
        </b-card> -->



        <b-card>
          <b-tabs  class="text-center justified"> 
                <!-- content-class="mt-2" justified  -->
                <!-- tabs de ventes à relevé -->
                <b-tab> 
                    <template #title>
                        <feather-icon icon="LayersIcon" />
                        <span >Factures()</span>
                    </template>
                  
                    <div class="m-2">
                      <!-- Table Top -->
                      <b-row>
                        <!-- Per Page -->
                        <b-col
                          cols="12"
                          md="6"
                          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
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
                            variant="primary"
                            :to="{ name: 'FactureAdd'}"
                          >
                            Créer une nouvelle facture
                          </b-button> -->
                        </b-col>

                        <!-- Search -->
                        <b-col
                          cols="12"
                          md="6"
                        >
                          <div class="d-flex align-items-center justify-content-end">
                            <b-form-input
                              v-model="filtre_facture"
                              class="d-inline-block mr-1"
                              placeholder="Rechercher par nom de client, prix, date..."
                            />
                            <!-- <v-select
                              v-model="statusFilter"
                              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                              :options="statusOptions"
                              class="invoice-filter-select"
                              placeholder="Select Status"
                            >
                              <template #selected-option="{ label }">
                                <span class="text-truncate overflow-hidden">
                                  {{ label }}
                                </span>
                              </template>
                            </v-select> -->
                          </div>
                        </b-col>
                      </b-row>
                    </div>


                  <!-- Le tableau affichant les factures -->
                  <b-table 
                    hover responsive primary-key="id" 
                    :per-page="perPage" 
                    :current-page="currentPage"
                    :fields="tableColumns" 
                    :filter="filtre_facture" 
                    :items="listFacClient"
                    show-empty empty-text="Patienter svp" class="bg-white mt-2">

                      <template #head(invoiceStatus)>
                        <feather-icon
                          icon="TrendingUpIcon"
                          class="mx-auto"
                        />
                      </template>


                       <!-- Column: Montant total -->
                      <template #cell(code)="data">
                        <span class="text-nowrap text-info">
                          {{(data.item.code) }}
                        </span>
                      </template>

                      <!-- Column: Montant total -->
                      <template #cell(total_ttc)="data">
                        <span class="text-nowrap text-info">
                          {{(data.item.total_ttc) }}
                        </span>
                      </template>

                       <!-- Column: Payé -->
                      <template #cell(state)="data">
                        <span class="text-nowrap text-success">
                          {{ (data.item.id) }}
                        </span>
                      </template>


                    <!-- Column: Impayé -->
                    <template #cell(impaye)="data">
                      <span  class="text-nowrap text-danger font-weight-bold">
                        {{data.item.impaye }}
                      </span>
                    </template>

                    <!-- Column: Issued Date -->
                    <template #cell(date_echeance)="data">
                      <span class="text-nowrap">
                        {{  format_date(data.value) }}
                      </span>
                    </template>


                    <!-- Column: Actions -->
                    <template #cell(actions)="data">

                      <div class="text-nowrap">
                        <feather-icon
                          :id="`invoice-row-${data.item.id}-send-icon`"
                          icon="SendIcon"
                          class="cursor-pointer"
                          size="16"
                          @click="(data.item)"
                        />
                        <b-tooltip
                          title="Envoyer la facture"
                          class="cursor-pointer"
                          :target="`invoice-row-${data.item.id}-send-icon`"
                        />

                        <feather-icon
                          :id="`invoice-row-${data.item.id}-preview-icon`"
                          icon="EyeIcon"
                          size="16"
                          class="mx-1 cursor-pointer"
                          @click="(data.item.id)"
                        />
                        <b-tooltip
                          title="Prévisualiser la facture"
                          :target="`invoice-row-${data.item.id}-preview-icon`"
                        />

                        <!-- Dropdown -->
                        <b-dropdown
                          variant="link"
                          toggle-class="p-0"
                          no-caret
                          :right="$store.state.appConfig.isRTL"
                        >

                          <template #button-content>
                            <feather-icon
                              icon="MoreVerticalIcon"
                              size="16"
                              class="align-middle text-body"
                            />
                          </template>
                          <!-- <b-dropdown-item @click="editFac(data.item.id)">
                            <feather-icon icon="EditIcon" />
                            <span class="align-middle ml-50">Modifier</span>
                          </b-dropdown-item> -->
                          <b-dropdown-item>
                            <feather-icon icon="ShoppingBagIcon" />
                            <span class="align-middle ml-50">Régler</span>
                          </b-dropdown-item>
                          <b-dropdown-item @click="(data.item.id)">
                            <feather-icon icon="TrashIcon" />
                            <span class="align-middle ml-50">Supprimer</span>
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </template>


                  </b-table>

                    <!-- Parfination -->
                  <div class="mx-2 mb-2">
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
                          :total-rows="listFacClient.length"
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
       
                </b-tab>

                <!--  -->
                <b-tab>
                    <template #title>
                        <feather-icon icon="BookOpenIcon" />
                        <span>Dévis()</span>
                    </template>

                    <table class="table">
                      <thead>
                        <tr>
                            <th>Reference#</th>
                            <th>Emission</th>
                            <th>Echéance</th>
                            <th>Montant</th>
                            <th>Etape</th>

                        </tr>
                      </thead>

                      <tbody>
                          <tr>
                            <td class="font-weight-bold">Identifiant</td>
                            <td>31/12/2021</td>
                            <td>31/12/2022</td>
                            <td>25 000 0000 XOF</td>

                            <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="success"
                            class="mr-10"
                          >
                                Facturé               
                            </b-button>

                            <!-- Bouton d'action -->
                          <template>
                              <b-button variant="gradient-info" class="btn-icon mr-1 edit-color" >
                                  <feather-icon icon="FileIcon" />
                              </b-button>
                              <b-button variant="gradient-warning" class="btn-icon" >
                                  <feather-icon icon="EyeIcon" />
                              </b-button>
                          </template>

                          </tr>
                                                    
                      </tbody>
                    </table>
                      
                </b-tab>
              
                <b-tab>
                    <template #title>
                        <feather-icon icon="MessageCircleIcon" />
                        <span>Commentaires()</span>
                    </template>       
                    <div>
                      <b-form-textarea
                        id="textarea-default"
                        placeholder="Commentaire"
                        rows="3"
                      />

                    </div>

                    <div class=" mt-1">
                      <b-button
                      v-b-toggle.sidebar-invoice-add-new-customers
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="primary"
                      class="mr-2"
                      type="submit"
                      
                      
                      >
                      Envoyé
                      </b-button>
                              
                    </div>


                </b-tab>

                <b-tab >
                    <template #title>
                        <feather-icon icon="MailIcon" />
                        <span>Email()</span>
                    </template>      
                </b-tab>      

                <b-tab >
                    <template #title>
                        <feather-icon icon="FileTextIcon" />
                        <span>Fichiers()</span>
                    </template> 



                </b-tab>

                <b-tab >
                    <template #title>
                        <feather-icon icon="CpuIcon" />
                        <span>Historiques()</span>
                    </template>      
                </b-tab> 

          </b-tabs>
              
        </b-card>
        
        
        <!-- End tabs -->
          
        <!-- :::::::::::: -->


        <!-- Modal pour mettre à jour un client    -->
        <b-modal id="modal-update-user" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier mon client" @ok="updateClient(userData.id)">
          <b-form class="auth-register-form mt-2">
            <!-- nom -->
            <b-form-group label-for="register-nom">
              <label for="">Nom <span class=" text-danger h6">*</span></label>
              <validation-provider #default="{ errors }" name="nom" rules="required">
                <b-form-input id="register-nom" v-model="user.nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
              </validation-provider>
            </b-form-group>

            <!-- prenom -->
            <b-form-group label-for="register-prenom">
              <label for="">Prénom <span class=" text-danger h6">*</span></label>
              <validation-provider #default="{ errors }" name="prenom" rules="required">
                <b-form-input id="register-prenom" v-model="user.prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group label-for="register-email">
               <label for="">Email <span class=" text-danger h6">*</span></label>
              <validation-provider #default="{ errors }" name="Email" rules="required">
                <b-form-input id="register-email" v-model="user.email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
              </validation-provider>
            </b-form-group>

            <!-- contact -->
            <b-form-group  label-for="register-contact">
               <label for="">Contact <span class=" text-danger h6">*</span></label>
              <validation-provider #default="{ errors }" name="contact" rules="required">
                <vue-tel-input id="register-contact" @country-changed="changer" v-model="user.contact" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
              </validation-provider>
            </b-form-group>
            
            <!-- Localisation -->
            <b-form-group label-for="entreprise-localisation">
               <label for="">Localisation <span class=" text-danger h6">*</span></label>
              <validation-provider #default="{ errors }" name="localisation" rules="required">
                <b-form-input
                  id="entreprise-localisation"
                  v-model="user.localisation"
                  name="entreprise-localisation"
                  :state="errors.length > 0 ? false:null"
                  class="text-center"
                  placeholder="Abidjan, Angré RCI 0089 BP 00225"
                />
              </validation-provider>
            </b-form-group>

            <b-form-group>
               <label for="">Status <span class=" text-danger h6">*</span></label>
              <v-select v-model="user.type_client" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="clientUpOption" />
            </b-form-group>
          </b-form>
        </b-modal>

        </div>

      </b-col>
    </b-row>
  </section>  
</template>

<script>
import {
  BCard, BFormGroup, BButton, BAvatar, BRow, BCol, BModal, BFormInput, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg,BFormFile 
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from '@/views/pages/request'
import axios from 'axios'
import moment from 'moment';
import { VueTelInput } from 'vue-tel-input'
// import ClientMoreDetail from '@/components/clients/Preview/clientMoreDetail.vue';
// import QInvoiceMoreDetails from "@/components/factures/Preview/qInvoiceMoreDetails.vue";


// import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    moment,
    BFormFile ,
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
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

    // factureTotal,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      userData:'',

      user: {
        nom: '',
        prenoms: '',
        emai: '',
        contact: '',
        localisation: '',
        type_client: '',
      },
      status_id: '',
      indicateur: '',

      filtre_facture:'',
      listFacClient:'',
      versFacClient:[],

      versements:[],

      factureList:[],

      tableColumns :[
        { key: 'code', label: 'Code facture', sortable: true },
        { key: 'total_ttc', sortable: true, },
        { key: 'paye', label: 'Payé', sortable: true  },
        { key: 'impaye', label: 'Impayé', sortable: true  },
        { key: 'date_echeance', sortable: true },
        { key: 'actions' },
     ],
      perPageOptions:[3, 5, 10],

      clientUpOption: [{ title: "Particulier" }, { title: "Entreprise" }],
    
      perPage:3,
      currentPage:1,

    }
  },


  
  async mounted(){
      document.title = 'Détails Client - Ediqia'
      this.userData = JSON.parse(localStorage.getItem('clientDetails'))
      
      const id = {
        'client_id': this.userData.id,
        
      }


    //   const zip__amountPaid = (reponse) => {
    //  console.log(reponse.versements);
    //  // let amount_value = 0;

    //  // if (data.versements.length === 0 || data.versements === undefined) {
    //  //  return amount_value;
    //  // } else {
    //  //  for (let n = 0; n < data.versements.length; n++) {
    //  //    const el = data.versements[n];
    //  //    let amount = 0;
    //  //    amount = parseInt(amount + el.montant);
    //  //    amount_value = parseInt(amount);
    //  //  }
    //  //  return amount_value;
    //  // }
    // };
    
      try{
        await axios.post(URL.LISTE_FACTURE_CLIENT, id).then(reponse =>{
          this.listFacClient = reponse.data.list_facture_client
          // console.log(this.listFacClient)
          // console.log(this.listFacClient)

          this.versFacClient = reponse.data.list_facture_client
          for (let index = 0; index < this.versFacClient.length; index++) {
            let id = this.versFacClient[index].id;
            let somme = 0;
            for (let index2 = 0; index2 < this.versFacClient[index].versements.length; index2++) {
              somme += this.versFacClient[index].versements[index2].montant;
            }
            this.versements.push({
              'facture': id,
              'montantTotal': somme
            });
            this.listFacClient[index].paye = this.formatMoney(somme) +' '+ localStorage.getItem('devise')
            this.listFacClient[index].impaye =this.formatMoney(parseInt(this.listFacClient[index].total_ttc)-somme) +' '+ localStorage.getItem('devise')

          }
            console.log(this.listFacClient);

          // this.versement = this.versFacClient
          // for (let index = 0; index < this.versement.length; index++) {
          //   console.log( this.versement);
            
          // }


        })
      }catch(error){
        console.log(error)
      }

  },

  methods: {
    formatMoney(num) {
        const number = String(num);
        let inter='', cpt = 0;
        for (let index = number.length-1; index >=0 ; index--) {
            if (cpt==3){
                inter = ' '+inter
                cpt = 0
            }
            inter = number[index]+inter
            cpt++
        }
        return inter;
    },
    
    format_date(value) {
      if (value) {
          return moment(String(value)).format("DD-MM-YYYY");
      }
    },

   
    updateClient(Id) {
      const userId = Id
      this.$swal({
        title: "Êtes vous sûr de vouloir enregistrer",
        text: "Les modificiations seront prises en compte",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Oui, modifier !',
        cancelButtonText: 'Annuler',
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          try {
            if (this.type_client == "Particulier") {
              this.status_id = 1
            } else {
              this.status_id = 2
            }
            const data = {
              id: userId,
              nom: this.user.nom,
              prenoms: this.user.prenom,
              email: this.user.email,
              contact: this.user.contact,
              indicateur:this.indicateur,
              type_client: this.status_id,
              localisation: this.user.localisation,
            }
            console.log(data)
            const config = {
              headers: {
                'Accept': 'application/json'
              },
            }
            axios.post(URL.CLIENT_UPDATE, data, config).then((response) => {
              if(response.data) {
                axios.get(URL.CLIENT_LIST).then((response) => {
                  const listeClient = response.data[0]
                  this.userData = listeClient.filter(item => item.id === this.userData.id)
                }).catch((error) => {
                  console.log(error.response.data.errors);
                })
              }
            }).catch((error) => {
              if (error.response) {
                console.log('api error', error)
              }
            })
          } catch (error) {
            console.log('trycatch error', error);
          }
        }
      })
    },
    changer(e){
      this.indicateur = `+ ${e.dialCode}`
      console.log(this.user.contact)
    },
  },
  setup() {
    return {
      avatarText,
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";


.st{
  font-size: 10px;
}

</style>

