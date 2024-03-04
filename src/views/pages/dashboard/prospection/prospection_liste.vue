<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle prospection -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Nouvelle prospection" @ok="AddNewProspection">
            <b-form>
                <!-- <div>
                    <h5 class="text-danger text-center">{{exist_text}}</h5>
                </div> -->
                <!-- Liebbel -->
                <b-form-group label="" label-for="register-nom">
                     <label for="">Libelle <span class="p-0 text-danger h6">*</span></label>
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateLibelle"  v-model="Libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                     <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                             Vous devez renseigner le libelle
                      </small>
                    </validation-provider>
                </b-form-group>

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
                
                 <!-- Date fin -->
                <b-form-group>
                    <label>
                    Date de fin<span class="p-0 text-danger h6">*</span>
                    </label>
                    <validation-provider>
                        <flat-pickr
                        v-model="dateFin"
                        class="form-control"
                        rules = "required"
                        @input="validateDateFin"
                        />
                          <small :class="valideDateFin  ? 'block' : 'none'" class="text-danger">
                             Vous devez renseigner la date de fin
                        </small>
                    </validation-provider>
                </b-form-group>

                   
                  <b-form-group label="Motif de la prospection" label-for="register-description">
                    <b-form-textarea id="textarea" v-model="description" placeholder="Saisissez une description" rows="3" max-rows="6"></b-form-textarea>
                  </b-form-group>
               
            </b-form>
        </b-modal>

        <!-- Modal pour mettre à jour une prospection déjà ajouté -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Mettre à jour" cancel-title="Annuler" centered title="Modifier la prospection" @ok="updateProspection()">
           <b-form>
                <!-- <div>
                    <h5 class="text-danger text-center">{{exist_text}}</h5>
                </div> -->
                <!-- Liebbel -->
                <b-form-group label="Libelle" label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom"  v-model="edit_libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                    </validation-provider>
                </b-form-group>

                <!-- Date debut -->
                <b-form-group>
                    <label>
                    Date de début
                    </label>
                    <validation-provider>
                        <flat-pickr
                        v-model="edit_dateDebut"
                        class="form-control"
                        />
                    </validation-provider>
                </b-form-group>
                 <!-- Date fin -->
                <b-form-group>
                    <label>
                    Date de fin
                    </label>
                    <validation-provider>
                        <flat-pickr
                        v-model="edit_dateFin"
                        class="form-control"
                        />
                    </validation-provider>
                </b-form-group>

                   
                  <b-form-group label="Motif de la prospection" label-for="register-description">
                    <b-form-textarea id="textarea" v-model="edit_description" placeholder="Saisissez une description" rows="3" max-rows="6"></b-form-textarea>
                  </b-form-group>
               
            </b-form>
        </b-modal>

            <!-- Modal pour ajouter des autres prospects -->

             <b-modal
      id="modal-reglement"
      cancel-variant="outline-secondary"
      ok-title="OK"
      cancel-title="Retour"
      centered
      title="Liste des prospects"
    >
      <b-card-body class="invoice-padding form-item-section">
        <div
          ref="form"
          class="repeater-form"
        > 
          <b-row
            v-for="(item, index) in prospection_index"
            :key="index"
            ref="row"
            class="pb-2 pt-2"
          >
            <!-- Item Form -->
            <!-- ? This will be in loop => So consider below markup for single item -->
            <b-col cols="12">
                <h4 class="text-center">Prospection: {{item.libelle}}</h4>
              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
              <!-- Form Input Fields OR content inside bordered area  -->
              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
              <div class="d-flex border rounded" v-for="(prospect,index) in item.prospects" :key="prospect.id">
                <b-row class="flex-grow-1 p-2">
                  <!-- Single Item Form Headers -->
                  <h5>Prospect #{{index + 1}}</h5>
                  <b-col cols="12" lg="12">
                    <span class="font-weight-bold">Nom et prenoms:</span> {{ prospect.nom}}  {{ prospect.prenom }}
                  </b-col>
                  <b-col cols="12" lg="12">
                    <span class="font-weight-bold">Email:</span> {{ prospect.email }}
                  </b-col>
                  <b-col cols="12" lg="12">
                    <span class="font-weight-bold">Contact:</span> {{ prospect.indicateur }} {{ prospect.contact }}
                  </b-col>
                  <b-col cols="12" lg="12">
                    <span class="font-weight-bold">Adresse:</span> {{ prospect.localisation.formatted_address }}
                  </b-col>
                  <b-col cols="12" lg="12">
                    <span class="font-weight-bold">Status:</span> {{ prospect.status_user }}
                  </b-col>
                  <b-col cols="12" lg="12">
                    <span class="font-weight-bold">Type {{ prospect.status_user }}:</span> {{ prospect.type_client }}
                  </b-col>
                 
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>


        <!-- DUPLICATEUR -->
        <!-- <b-row>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              size="md"
              variant="primary"
            >
              Ajouter un prospect
            </b-button>
          </b-col>
        </b-row> -->
      </b-card-body>
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
                        variant="gradient-primary"
                       @click="redirection"
                    >
                        Créer une nouvelle prospection
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
                            v-model="filtreProspection"
                            class="d-inline-block mr-1"
                            placeholder="Rechercher par le libelle,date ..."
                            />
                        </div>
                    </b-col>
            </b-row>

            <!-- Le tableau affichant les prospections -->
            <b-table
                hover
                responsive
                primary-key="id"
                :per-page="perPage"
                :current-page="currentPage"
                :items="prospections"
                :fields="tableColumns"
                :filter="filtreProspection"
                show-empty
                empty-text="Aucune prospection enregistrée"
                class="bg-white mt-2"
            >
                <!-- Bouton d'action -->
                <!-- <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-2" v-b-modal.modal-update @click="update(data.item)">
                        <feather-icon icon="Edit3Icon" />
                    </b-button>
                    <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(data.item.id)">
                        <feather-icon icon="Trash2Icon" />
                    </b-button>
                </template> -->


                <template #cell(actions)="data">
									<div class="text-nowrap">
							<feather-icon
			        			icon="Edit3Icon"
			        			:id="`invoice-row-${data.item.id}-Edit3-icon`"
			        			size="16"
			        			class="cursor-pointer mr-1"
			        	        	@click="update(data.item)"
                                    v-b-modal.modal-update
			        		/>
			        		<b-tooltip
			        			title="Modifier une prospection"
			        			:target="`invoice-row-${data.item.id}-Edit3-icon`"
			        		/>

                            <feather-icon 
			        			icon="TrashIcon"
			        			:id="`invoice-row-${data.item.id}-trash-icon`"
			        			size="16"
			        			class="cursor-pointer mr-1"
			        	        	@click="confirmText(data.item.id)"
			        		/>
			        		<b-tooltip
			        			title="supprimer"
			        			:target="`invoice-row-${data.item.id}-trash-icon`"
			        		/>

                                    <!-- <feather-icon
											:id="`invoice-row-${data.item.id}-preview-icon`"
											icon="EyeIcon"
											size="16"
											class="mx-1 cursor-pointer"
											@click="confirmText(data.item.id)"
										/>
										<b-tooltip
											title="Detail de la depense"
											:target="`invoice-row-${data.item.id}-preview-icon`"
										/> -->

										<!-- <feather-icon
											:id="`invoice-row-${data.item.id}-preview-icon`"
											icon="TrendingUpIcon"
											size="16"
											class="mx-1 cursor-pointer"
									    v-b-modal.modal-reglement @click="reglement(data.item.id, data.item.date_emission, data.item.montant_depense)"
										/>
										<b-tooltip
											title="Liste des reglements"
											:target="`invoice-row-${data.item.id}-preview-icon`"
										/> -->

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

											<b-dropdown-item v-b-modal.modal-reglement @click="prospectionAll(data.item)"
>
												<feather-icon icon="ListIcon" />
												<span class="align-middle ml-50">Liste des prospects</span>
											</b-dropdown-item>

											<!-- <b-dropdown-item @click="invoiceDestroy(data.item.id)">
												<feather-icon icon="TrashIcon" />
												<span class="align-middle ml-50"> Supprimer</span>
											</b-dropdown-item> -->
										</b-dropdown>
									</div>
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
                Libelle: "",
                valideLibelle: false,
                dateDebut: null,
                valideDateDebut:false,
                dateFin: null,
                valideDateFin:false,
                description: '',
                prospections: [],
                prospection_index:'',

                    prospectionUp: "",

                    edit_libelle:"",
                    edit_dateDebut:"",
                    edit_dateFin:"",
                    edit_description:"",
                    id_update:"",
                     edit_index: "",


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
            try {
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

             prospectionAll(data) {
    
        const index = this.prospections.filter((prospect) => {
            return  prospect.id === data.id
        })
        this.prospection_index = index
console.log(this.prospection_index)
      },


             redirection() {
        this.$router.push('/prospection')
      },
            // confirm texrt
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

               async updateProspection() {
                    if (!this.edit_libelle || !this.edit_dateDebut || !this.edit_dateFin || !this.edit_description) {
                        // bvModalEvt.preventDefault();
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
//validation

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

             validateDateFin() {
                if (!this.dateFin) {
                    this.valideDateFin= true;
                } else {
                    this.valideDateFin= false;
                }
            },




            async AddNewProspection(bvModalEvt) {
      try {
          this.validateLibelle();
            this.validateDateDebut();
            this.validateDateFin();
        if (!this.Libelle || !this.dateDebut || !this.dateFin) {
          bvModalEvt.preventDefault()
        } else {
          const newProspection = {
            libelle: this.Libelle,
            date_fin: this.dateFin,
             date_debut: this.dateDebut,
            description:this.description
          }
            this.topEnd();
          await axios.post(URL.PROSPECTION_CREATE, newProspection).then((response) => {
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

        },
    };
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
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
<style scoped lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
