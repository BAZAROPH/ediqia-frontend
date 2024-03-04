<template>
  <div class="position-relative table-responsive table-base">
    <div class="tableau">
      <b-card no-body class="px-2">
        <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvelle taxe -->
        <b-row>
          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1">
            <label>Entrées</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6" class="mt-1">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="filtreRelance" class="d-inline-block mr-1" placeholder="Rechercher par le nom du client, valeur..." />
            </div>
          </b-col>
        </b-row>

        <!-- Le tableau affichant les taxes -->
        <b-table hover responsive primary-key="id" :per-page="perPage" :current-page="currentPage" :items="relances" :fields="tableColumns" :filter="filtreRelance" show-empty empty-text="Aucune relance enregistrée" class="bg-white mt-2">
          <!-- Bouton d'action -->
          <template #cell(relancer)="data">
              <!-- @click="relancer(data.item.code, data.item.id, data.item.email )" -->
            <b-button size="lg" title="Relancer" v-b-modal.modal-info variant="flat-success" class="btn-icon mr-2" @click="enclencher(data.item.code, data.item.email, data.item.montant_restant, data.item.date_echeance )">
              <feather-icon icon="ExternalLinkIcon" />
            </b-button>
          </template>
        </b-table>
        <b-modal
            id="modal-info"
            ok-only
            ok-variant="info"
            ok-title="Envoyer"
            modal-class="modal-info"
            centered
            title="Relancer une facture"
            @ok="relancer"
            >
            <div class="row mb-1">
                <div class="col-12 p-1 rounded alert-warning">
                    <span class="p-0 pl-1 font-weight-bold text-warning h6">NB:</span>
                    <span class="p-0 pl-1 font-weight-bold text-warning h7">Référez-vous au montant affiché pour le message.</span>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 ">
                    <label for="">Message de relance :</label>
                    <b-form-textarea @input="validateMessage" id="textarea" v-model="message" placeholder="Entrer les details de l'article ici" rows="5" max-rows="6"> </b-form-textarea>
                    <small :class="valideMessage ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner un message pour la relance
                    </small>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <b-form-input id="register-nom" @input="validateEmail"  v-model="email" name="register-nom" placeholder="email" />
                    <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner un email
                    </small>
                    <small
                        :class="valideEmail ? 'block' : 'none'"
                        class="text-danger"
                    >
                        Veuillez entrer un email valide 
                    </small>
                </div>
            </div>
            <div class="row">
                <div class="col-6 m-auto text-center">
                    <label class="font-weight-bold text-info" for="">Montant restant</label>
                    <b-form-input id="register-nom" class="text-center"  v-model="montant_restant" disabled name="register-nom" placeholder="email" />
                </div>
            </div>
        </b-modal>

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
                        :total-rows="relanceTotal"
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
    import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg, BTooltip } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import { required, email } from "@validations";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";

    export default {
        components: {
            BTooltip,
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
                valideEmail:'',
                valideMessage:false,
                code:'',
                email:'',
                message:'',
                montant_restant:'',
                relances:'',
                perPage:7,
                currentPage:1,
                relanceTotal:'',
                tableColumns: [{ key: "relancer" },{ key: "date_echeance", label: "Date d'échéance", sortable: true },{ key: "code", label: "Facture N˚", sortable: true }, { key: "total_ht", label:'Total HT',sortable: true }, { key: "total_ttc", label:'Total TTC',sortable: true },{ key: "montant_restant", label:'Montant restant',sortable: true }, { key: "description", label:'Description', sortable: true }, {key:'nom' ,sortable: true}, {key:'prenoms', label:'Prénom' ,sortable: true}, {key:'email'},],
                filtreRelance: "",
                perPageOptions: [3, 5, 10, 15],
                marche:false
            };
        },
        async mounted() {
            document.title = 'Relances - Ediqia'  
            try{
                await axios.get(URL.FACTURE_LIST).then(response =>{
                this.relances = response.data.relance
                this.relanceTotal = this.relances.length
                // console.l0g('relances',relances)
                })
            }catch(erro){
                console.log(error)
            }
            // console.log(this.relances)
        },
       methods:{
           enclencher(code, email, montant_restant, date_echeance){
               this.montant_restant= montant_restant
               this.message = 'Madame/Monsieur;\nNous vous remercions pour la confiance placée en notre structure pour les différentes prestations.\nPar ailleurs, le  '+ date_echeance+'  arrive à échéance la facture n°  '+ code + ' ; nous vous prions donc de bien vouloir procéder au paiement des  '+ this.montant_restant +' '+ localStorage.getItem('devise') +'  avant le '+ date_echeance +'.'
               this.email= email
               this.code = code
               this.validateMessage()
               this.validateEmail()
           },
           async relancer(bvModalEvt){
               this.validateMessage()
               this.validateEmail()
               if(this.valideMessage || this.valideEmail){
                    bvModalEvt.preventDefault();
                    this.handleSubmit();
               }else{
                    try{
                        this.marche=true
                        const data = {
                                'message' : this.message,
                                'code': this.code,
                                'email': this.email,
                                'montant_restant': this.montant_restant
                            }
                        await axios.post(URL.ENVOI_RELANCE, data).then(response =>{
                            this.reponseData = response
                        })
                        // console.log(this.reponseData)
                        this.topEnd(this.email)
                    }catch(error){
                        console.log(error)
                    }
               }
           },
           validateEmail() {
                // valid email regex pattern
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!this.email.match(emailPattern) || !this.email) {
                    this.valideEmail = true;
                } else {
                    this.valideEmail = false;
                }
            },
           validateMessage(){
               if(!this.message){
                   this.valideMessage = true
               }else{
                   this.valideMessage = false
               }
           },
           topEnd(email) {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Relance envoyé avec succès sur "+ email,
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
       }
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
