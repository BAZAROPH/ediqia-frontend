<template>
    <validation-observer ref="addEmprunt">
        <b-form class="auth-register-form mt-2" @submit.prevent>
            <b-row>
                <b-col lg="12" md="12" xs="12" sm="12" class="m-auto">
                    <b-card class="pr-3 pl-3">
                        <section>
                            <b-row>
                                <b-col lg="6" xs="12" md="6" sm="12" class="m-auto">
                                        
                                     <!-- Libelle -->
                                    <b-form-group label="" label-for="register-nom">
                                         <label for="">Libelle <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="nom" rules="required">
                                            <b-form-input id="register-nom" @input="validateLibelle"  v-model="Libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                                         <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                                                 Vous devez renseigner le libelle
                                          </small>
                                        </validation-provider>
                                    </b-form-group>
                                     </b-col>

                                    <b-col lg="6" xs="12" md="6" sm="12" class="m-auto">
                                            <!-- Date debut -->
                                    <b-form-group>
                                        <label>
                                        Date de début<span class="p-0 text-danger h6">*</span>
                                        </label>
                                        <validation-provider>
                                            <flat-pickr
                                            v-model="dateDebut"
                                            class="form-control"
                                            rules = "required"
                                            @input="validateDateDebut"
                                            />
                                        <small :class="valideDateDebut ? 'block' : 'none'" class="text-danger">
                                                 Vous devez renseigner la date de debut
                                          </small>
                                        </validation-provider>
                                    </b-form-group>
                                    </b-col>
                                  

                                     <b-col lg="6" xs="12" md="6" sm="12" class="m-auto">
                                    <!-- Date fin -->
                                    <b-form-group>
                                        <label>
                                        Date de fin
                                        </label>
                                        <validation-provider>
                                            <flat-pickr
                                            v-model="dateFin"
                                            class="form-control"
                                            rules = "required"
                                          
                                            />
                                              <!-- <small :class="valideDateFin  ? 'block' : 'none'" class="text-danger">
                                                 Vous devez renseigner la date de fin
                                            </small> -->
                                        </validation-provider>
                                    </b-form-group>
                                    </b-col>
                                  

                                 
                                    <b-col lg="6" xs="12" md="6" sm="12" class="m-auto">
                                    <b-form-group label="Motif de la prospection" label-for="register-description">
                                      <b-form-textarea id="textarea" v-model="description" placeholder="Saisissez une description" rows="3" max-rows="6"></b-form-textarea>
                                    </b-form-group>
                                    </b-col>
                   

                                <!-- </b-col> -->
                            </b-row>


                            <hr />

                            <!-- Multi ajout de prospect -->

                               <div class="row">
                                <div class="col-md-12 col-xs-12 col-sm-12 m-auto">
                                    <div class="card">
                                        <h3>Ajouter des prospects</h3>
                                        <hr style="width: 100%;" />
                                        <div class="card-body">
                                            <!-- <h3 class="card-title">Règlement</h3> -->
                                            <b-card-body class="invoice-padding form-item-section">
                                                <div ref="form" class="repeater-form" :style="{ height: trHeight }">
                                                    <b-row v-for="(item, index) in multiProspects" :key="index" ref="row" class="pb-2">
                                                        <!-- Item Form -->
                                                        <!-- ? This will be in loop => So consider below markup for single item -->
                                                        <b-col cols="12">
                                                            <div class="d-flex border rounded">
                                                                <b-row class="flex-grow-1 p-2">
                                                                    <!-- compte -->
                                                                    <b-col cols="12" md="12" class="m-auto">
                                                                        <b-form-group label="" label-for="register-libelle">
                                                                            <label for="">Prospect<span class="p-0 text-danger h6">*</span></label>
                                                                            <v-select
                                                                                v-model="item.selectedProspect"
                                                                                placeholder="Selectionnez un prospect"
                                                                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                                                                label="nom"
                                                                                rules="required"
                                                                                
                                                                                :options="prospectList"
                                                                                @input="(val) => updateItemForm(index, val)"
                                                                            >
                                                                                <template #list-header>
                                                                                    <li v-b-toggle.sidebar-invoice-add-new-customers-fournisseur class="add-new-client-header d-flex align-items-center my-50 zindex-100">
                                                                                        <feather-icon icon="PlusIcon" size="16" />
                                                                                        <span class="align-center ml-25">créer un nouveau prospect</span>
                                                                                    </li>
                                                                                </template>
                                                                            </v-select>
                                                                        </b-form-group>
                                                                    </b-col>
                                                                </b-row>

                                                                <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                                                                    <feather-icon size="16" icon="XIcon" class="cursor-pointer" @click="removeItem(index)" />
                                                                </div>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                </div>
                                                <b-row>
                                                    <b-col cols="12" style="">
                                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="md" variant="primary" @click="addNewItemInItemForm">
                                                            Ajouter un prospect
                                                        </b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            <!-- Multi ajout de prospect -->

                            <!-- Form Actions -->
                            <div class="text-center mt-2">
                                <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mr-2">
                                    Annuler
                                </b-button>
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit" @click="AddNewProspection">
                                    Ajouter
                                </b-button>
                            </div>
                        </section>

                         <!-- SIDEBAR FORMULAIRE POUR AJOUTER UN Prospect -->
                        <b-sidebar id="sidebar-invoice-add-new-customers-fournisseur" sidebar-class="sidebar-lg" ref="sidebarProspect" bg-variant="white" shadow backdrop no-header right>                            <template #default="{ }">
                                <!-- Header -->
                                <div id="saveFourniseur__id" class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                                    <h5 class="mb-0">
                                        Ajouter un Prospect
                                    </h5>

                                    <!-- <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" /> -->
                                </div>

                                <!-- Body -->
                                <b-form @submit.prevent class="p-2">

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
                 Prénoms
                    </label>
                        <validation-provider #default="{ errors }" name="prenom" rules="">
                            <b-form-input id="register-prenom"  v-model="prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                            <!-- <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le prénom du prospect
                            </small> -->
                        </validation-provider>
                    </b-form-group>

                    <!-- email -->
                    <b-form-group label="Email" label-for="register-email">
                        <validation-provider #default="{ errors }" name="Email" rules="">
                            <b-form-input id="register-email"  v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                            <!-- <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer un email valide
                            </small> -->
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
                    <b-form-group>
                          <label>
                 Status du client<span class="p-0 text-danger h6">*</span>
                    </label>
                        <v-select    @input="validateStatus" v-model="selected" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option" />
                    <small :class="valideStatus ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le status du prospect
                    </small>
  </b-form-group>
                                    <!-- Form Actions -->
                                    <div class="d-flex mt-2">
                                        <b-button v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="saveProspect">
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


                        
                    </b-card>
                </b-col>
            </b-row>
            
        </b-form>
    </validation-observer>
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

                //prospect

                nom: "",
                prenom: "",
                email: "",
                localisation: "",
                contact: "",
                phone:'',
                contactFinal:'',
                indicatifFinal:'',
                valideNom: false,

                valideProspection: false,
                validePrenom: false,
                valideContact: false,
                valideEmail: false,
                valideContactNumber: false,
                validePassword: false,
                valideLocalisation: false,
                valideContactNumber: false,
                Libelle: "",
                valideLibelle: false,
                dateDebut: null,
                valideDateDebut:false,
                dateFin: null,
                selectedProspect: "",
                valideProspect: null,
                valideDateFin:false,
                description: '',
                        selected: "Quel est votre status",
                option: [{ title: "Particulier" }, { title: "Entreprise" }],

                prospections: [],

                    prospectionUp: "",

                    edit_libelle:"",
                    edit_dateDebut:"",
                    edit_dateFin:"",
                    edit_description:"",
                    id_update:"",
                     edit_index: "",
                    prospectList: [],
                      multiProspects: [],

                    //  item: this.multiProspects,

                     multiProspectItem: {
                         selectedProspect:"",
                         selectedProspectId:"",
                },

                newTaxeName: "",
                newTaxeValue: "",
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
                pTotal: 0,
                tableColumns: [
                    // { key: 'code', label: 'Code', sortable: true },
                    { key: 'libelle', sortable: true },
                    { key: 'description', label:'motif', sortable: true, },
                    { key: 'date_debut', sortable: true, },
                    { key: 'date_fin', sortable: true, },
                    { key: 'actions' },
                ],
                filtreProspection: '',
                perPageOptions: [3, 5, 10, 15]
            };
        },
        async mounted() {
            document.title = 'Prospection'  
                  google.maps.event.addDomListener(window, 'load', initialize);

            try {
                await axios.get(URL.PROSPECT_LIST).then((response) => {
                               this.prospectList= response.data.prospects
                               this.pTotal = this.prospects.length
                            })



                await axios
                    .get(URL.PROSPECTION_LIST)
                    .then((response) => {
                       this.prospections = response.data.prospections
                       this.pTotal = this.prospections.length
                    })
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            // confirm texrt
             updateItemForm(index, val) {
                const { id } = val;
                this.multiProspects[index].selectedProspectId= id;
                console.log(this.multiProspects[0].selectedProspect.nom);
                console.log('test')
                console.log('aaa:',this.multiProspects[0].selectedProspect)
            },

            addNewItemInItemForm() {
                // this.valideMontantTotal();

                // if (this.montantValidation) {
                //     return;
                // } 
                // if {
                    // this.$refs.form.style.overflow = "hidden";
                    this.multiProspects.push(JSON.parse(JSON.stringify(this.multiProspectItem)));

                    this.$nextTick(() => {
                        this.trAddHeight(this.$refs.row[0].offsetHeight);
                        setTimeout(() => {
                            this.$refs.form.style.overflow = null;
                        }, 350);
                    });
                // }
                
            },

               removeItem(index) {
                this.multiProspects.splice(index, 1);
                this.trTrimHeight(this.$refs.row[0].offsetHeight);
            },

            initTrHeight() {
            this.trSetHeight(null)
            this.$nextTick(() => {
            this.trSetHeight(this.$refs.form.scrollHeight)
          })
        },


vider(){
    this.valideContact = false;
},

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


            confirmText(id) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Cette prospection sera supprimée définitivement !",
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
                        this.deleteProspection(id);
                    }
                });
            },
          
            async deleteProspection(indentifiant) {
                const id_delete = {
                    id: indentifiant,
                };
                try {
                    await axios
                        .post(URL.PROSPECTION_DESTROY, id_delete)
                        .then((response) => {
                            response.data;
                            axios.get(URL.PROSPECTION_LIST).then((response) => {
                                 this.prospections = response.data.prospections
                                    this.pTotal = this.prospections.length
                            }).catch((error) => {
                                console.log(error.response.data.errors)
                            })
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.prospections.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(item) {
                this.prospectionUp = item;
                this.edit_libelle = this.prospectionUp.libelle;
                this.edit_dateDebut = this.prospectionUp.date_debut;
                this.edit_dateFin = this.prospectionUp.date_fin;
                this.edit_description = this.prospectionUp.description;
                this.id_update = this.prospectionUp.id;
            },

               async updateProspection(bvModalEvt) {
                    if (!this.edit_libelle || !this.edit_dateDebut || !this.edit_dateFin || !this.edit_description) {
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
                                        id: this.prospectionUp.id,
                                        libelle: this.edit_libelle,
                                        date_debut: this.edit_dateDebut,
                                        date_fin: this.edit_dateFin,
                                        description: this.edit_description,
                                    };
                                  console.log(this.prospectionUp.id)
                                    axios
                                        .post(URL.PROSPECTION_UPDATE, data)
                                        .then((response) => {
                                            response.data;
                                            axios.get(URL.PROSPECTION_LIST).then((response) => {
                                           this.prospections = response.data.prospections
                                            this.pTotal = this.prospections.length
                                            }).catch((error) => {
                                                console.log(error.response.data.errors);
                                            });
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    this.prospections[index].libelle = this.edit_libelle;
                                    this.prospections[index].date_debut = this.edit_dateDebut;
                                    this.prospections[index].date_fin = this.edit_dateFin;
                                    this.prospections[index].description = this.edit_description;
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
            
            },


            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Prospection enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },


             topPEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Prospection enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
//validation
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

             validateNom() {
                if (!this.nom) {
                    this.valideNom = true;
                    this.erreur = true;
                } else {
                    this.valideNom = false;
                    this.erreur = false;
                }
            },
//  validatePrenom() {
//                 if (!this.prenom) {
//                     this.validePrenom = true;
//                     this.erreur = true;
//                 } else {
//                     this.validePrenom = false;
//                     this.erreur = false;
//                 }
//             },
  validateStatus() {
                if (this.selected === "Quel est votre status") {
                    this.valideStatus = true;
                    this.erreur = true;
                } else {
                    this.valideStatus = false;
                    this.erreur = false;
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

              contactEntier(e){
               this.contact=e
            //    console.log(this.phone)
            },
            changer(e){
                // console.log(this.phone)
               this.contact.country.name=e.name 
            },


validateSelectedProspect(){
    if (this.multiProspects.length === 0 || !this.multiProspects[0].selectedProspect.nom) {
       

                                // shake alert quand le prospect n'est pas rempli
                                this.$swal({
                                    title: "Ajouter un prospect ou un client",
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    showClass: {
                                        popup: 'animate__animated animate__shakeX',
                                    },
                                    buttonsStyling: false,
                                });
                            }
},


validateLibelle() {
                if (!this.Libelle) {
                    this.valideLibelle= true;
                } else {
                    this.valideLibelle= false;
                }
            },

            validateDateDebut() {
                if (!this.dateDebut) {
                    this.valideDateDebut= true;
                } else {
                    this.valideDateDebut= false;
                }
            },

            //  validateDateFin() {
            //     if (!this.dateFin) {
            //         this.valideDateFin= true;
            //     } else {
            //         this.valideDateFin= false;
            //     }
            // },

            //  validateProspect() {
            //     if (!this.selectedProspect) {
            //         this.valideProspect= true;
            //     } else {
            //         this.valideProspect= false;
            //     }
            // },




            async AddNewProspection(bvModalEvt) {
      try {
          this.validateLibelle();
            this.validateDateDebut();
            // this.validateDateFin();
            this.validateSelectedProspect();
            // this.validateProspect();
        if (!this.Libelle || !this.dateDebut || this.multiProspects.length===0) {
          bvModalEvt.preventDefault()
        } else {
          const newProspection = {
            libelle: this.Libelle,
            date_fin: this.dateFin,
             date_debut: this.dateDebut,
            description:this.description,
            prospect_id: this.selectedProspect.id,
            prospect_nom: this.selectedProspect.nom,  
            count: this.multiProspects.length,
            item: this.multiProspects,
          }
        //   console.log(this.multiProspects.length,this.multiProspects)
          await axios.post(URL.PROSPECTION_CREATE, newProspection).then((response) => {
              this.topEnd();
                 this.$router.push("/liste-prospection");
              this.prospectionData = response.data;
                 this.prospections.push(newProspection);
                 this.Libelle = ''
                 this.dateDebut = ''
                 this.dateFin = ''
                 this.description= ''
              
          })
        }
      } catch (error) {
        console.log('error:', error)
      }
    },

      async saveProspect(bvModalEvt) {
                try {
                    this.validateStatus();
                    this.validateNom();
                    this.validateContact();
                    // this.if_exist();
                    // Prevent modal from closing
                    if (this.valideNom || this.valideContact) {
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
                            // prospection_id : this.selectedProspection.id,
                            // prospection_name : this.selectedProspection.libelle

                        };
                         localStorage.removeItem('place')
                        await axios.post(URL.PROSPECT_CREATE, newProspect, config).then((response) => {
                            this.userData = response.data;
                               this.$refs.sidebarProspect.hide();
                            this.prospectList.unshift(newProspect);
                            this.topPEnd();
                        });
                        this.nom = "";
                        this.prenom = "";
                        this.email = "";
                        this.phone = "";
                        this.localisation = "";
                        this.contactFinal= "";
                        this.indicatifFinal= "";
                        this.status_id= "";
                        this.selected = "Quel est votre status"
                       
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },

        },
    };
</script>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";

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
