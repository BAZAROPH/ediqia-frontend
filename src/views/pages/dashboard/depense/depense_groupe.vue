<template>
  <section class="invoice-add-wrapper">
    <b-row class="invoice-add">
      <!-- Col: Left (Invoice Container) -->
      <b-col cols="12" xl="9" md="8">
        <b-form @submit.prevent>
          <b-card no-body class="invoice-preview-card">
            <!-- Header -->
            <b-card-body class="invoice-padding pb-0 px-3">
              <div
                class="d-flex align-items-center justify-content-between flex-md-row flex-column invoice-spacing mt-0"
              >
              </div>
            </b-card-body>

            <b-row class="container mx-auto px-3">
              <b-col cols="12" xl="6">
                <b-form-group>
                  <h5 class="font-weight-bold">
                    Date d'émission
                  </h5>
                  <flat-pickr @input="validateDate" v-model="dateDefault" class="form-control" />
                </b-form-group>
              </b-col>
              <b-col cols="12" xl="6">
                  <b-form-group label="Libelle de la depense *"  label-for="register-nom">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                      <b-form-input id="register-nom" v-model="libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                      <!-- <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le libellé de la depense
                      </small> -->
                    </validation-provider>
                  </b-form-group>
              </b-col>
            </b-row>
            <div v-if="date_alert" class="d-flex align-items-center justify-content-center">
              <p class="text-danger">{{ date_alert }}</p>
            </div>

            <!-- Spacer -->
            <hr class="invoice-spacing" />

            <!-- Invoice Client & Payment Details -->
           

            <!-- Items Section -->
            <b-card-body class="invoice-padding form-item-section">
              <div
                ref="form"
                class="repeater-form"
                :style="{ height: trHeight }"
              >
                <b-row
                  v-for="(item, index) in invoiceData.items"
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
                        <b-col cols="12" lg="5">
                          Article
                        </b-col>
                        <b-col cols="12" lg="3">
                          Cout
                        </b-col>
                        <b-col cols="12" lg="2">
                          Qté
                        </b-col>
                        <b-col cols="12" lg="2">
                          Prix
                        </b-col>
                      </b-row>
                      <div class="form-item-action-col"/>
                    </div>

                    <!-- Form Input Fields OR content inside bordered area  -->
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-flex border rounded">
                      <b-row class="flex-grow-1 p-2">
                        <!-- Single Item Form Headers -->
                        <b-col cols="12" lg="5">
                          <label class="d-inline d-lg-none">Article</label>
                          <validation-provider #default="{ errors }" name="libelle" rules="required">
                      <b-form-input id="register-nom"   v-model="item.itemTitle" name="register-nom"  @input="(val) => updateItemForm(index, val)" :state="errors.length > 0 ? false:null" placeholder="" />
                      <!-- <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner un article
                      </small> -->
                    </validation-provider>
                        </b-col>
                        <b-col cols="12" lg="3">
                          <label class="d-inline d-lg-none">Cout</label>
                          <b-form-input
                            v-model="item.cout"
                            type="number"
                            class="mb-2"
                           
                          />
                        </b-col>
                        <b-col cols="12" lg="2">
                          <label class="d-inline d-lg-none">Qté</label>
                          <b-form-input
                            v-model="item.qte"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col cols="12" lg="2">
                          <label class="d-inline d-lg-none">Prix</label>
                          <p class="mb-1">
                            {{ formatter.format((item.prix = item.cout * item.qte)) }}
                          </p>
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
                <b-col cols="8">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    size="md"
                    variant="primary"
                    @click="addNewItemInItemForm"
                  >
                    Ajouter un article
                  </b-button>
                </b-col>

              
              </b-row>
            </b-card-body>

            <!-- Invoice Description: Total -->
            <b-card-body class="invoice-padding pb-0">
              <b-row>
                <!-- Col: Sales Persion -->
                <b-col
                  cols="12"
                  md="4"
                  class="mt-md-0 mt-3 d-flex align-items-center"
                  order="2"
                  order-md="1"
                >
                </b-col>

                <!-- Col: Total -->
                <b-col
                  cols="12"
                  md="8"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
                >
                  <div class="invoice-total-wrapper">
                    <!-- <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Sous total:
                      </p>
                      <p v-if="invoiceData.items.length !== 0" class="invoice-total-amount">
                        {{ formatter.format(getSousTotal(invoiceData.items)) }}
                      </p>
                    </div> -->
                    <!-- <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Remise:
                      </p>
                      <p class="invoice-total-amount">
                        {{ invoiceData.remise }} %
                      </p>
                    </div> -->
                    <!-- <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Taxe:
                      </p>
                      <p v-if="invoiceData.taxe" class="invoice-total-amount">
                        {{ invoiceData.taxe.valeur }} %
                      </p>
                      <p v-if="!invoiceData.taxe" class="invoice-total-amount">
                        0 %
                      </p>
                    </div> -->
                    <hr class="my-50">
                    <div
                      v-if="invoiceData.items.length !== 0"
                      class="invoice-total-item"
                    >
                      <h5 class="invoice-total-title font-weight-bold">
                        Total :
                      </h5>
                      <h4 class="invoice-total-amount">
                        {{ formatter.format(sumArticles()) }}
                      </h4>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Spacer -->
            <hr class="invoice-spacing" />

            <!-- Note -->
            <!-- <b-card-body class="invoice-padding pt-0">
              <span class="font-weight-bold">Note: </span>
              <b-form-textarea v-model="invoiceData.note" class="mt-1" />
            </b-card-body> -->
          </b-card>
        </b-form>
      </b-col>

      <!-- Right Col: Card -->
      <b-col cols="12" md="4" xl="3" class="invoice-actions mt-md-0 mt-2">
        <!-- Action Buttons -->
        <b-card>
          <!-- Button: Send Invoice -->
          <!-- <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
                @click="sendFactureEmail"
          >
            Envoyer
          </b-button> -->

          <!-- Button: DOwnload -->
          <!-- <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            block
            @click="PreviewFacture"
          >
            Previsualiser
          </b-button> -->

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            block
            @click="saveFacture"
          >
            Enregistrer
          </b-button>
        </b-card>
      </b-col>
    </b-row>

  </section>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BButton,
  BModal,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BFormTextarea,
  VBToggle,
  VBModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import store from '@/store'
import axios from 'axios'
import URL from '@/views/pages/request'
import { VueTelInput } from 'vue-tel-input'
import 'animate.css'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormTextarea,
    BModal,
    flatPickr,
    vSelect,
    VBModal,
    VueTelInput,
  },
  directives: {
    Ripple,
    'b-modal': VBModal,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],
  async mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    validateDate() {
      const date_creation = this.dateDefault
      const date_fin = this.dueDate
      if (date_creation > date_fin) {
        this.date_alert = 'La date d\'émission ne peut pas etre supérieur à la date d\'écheance'
        console.log('changer la date de fin')
      } else {
        this.date_alert = null
      }
    },
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = 'hidden'
      this.invoiceData.items.push(
        JSON.parse(JSON.stringify(this.itemFormBlankItem)),
      )
      
      // this.invoiceData.taxes_id.push(0)
      // console.log(this.invoiceData.taxes_id)

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },
    removeItem(index) {
      this.invoiceData.items.splice(index, 1)
      // this.invoiceData.totalTaxe.splice(index, 1)
      // this.invoiceData.taxes_id.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    // ***
    // FUNCTION TO UPLOAD LOGO
    // **
    chooseFile() {
      const input = document.querySelector('#input-file')
      input.click()
    },
    processFile(event) {
      this.choose = true
      this.picture = event.target.files[0]
      if (event.target.files.length !== 0) {
        const picturePath = URL.createObjectURL(this.picture)
        const picture = document.querySelector('#logo-img')
        picture.src = picturePath
      } else {
        const picture = document.querySelector('#logo-img')
        picture.src = ''
      }
    },
    deletePicture() {
      this.choose = false
      this.picture = ''
      const picture = document.querySelector('#logo-img')
      picture.src = ''
    },
    // *****
    // ***
    // FUNCTION POUR AVOIR LE TOTAL DE TOUS LES ARTICLES AJOUTEES
    // ***
    sumArticles() {
      let price = ''

      for (let i = 0; i < this.invoiceData.items.length; i++) {
        price = this.invoiceData.items
      }

      Array.prototype.sum = function(prop) {
        let total = 0
        for (let i = 0, _len = this.length; i < _len; i++) {
          total += this[i][prop]
        }
        return parseFloat(total)
      }

      if (this.invoiceData.remise && this.invoiceData.taxe) {

        let totalWithRemise = price.sum('prix') - (price.sum('prix') * (this.invoiceData.remise / 100))
        let num = parseFloat(totalWithRemise * (1 + (this.invoiceData.taxe.valeur / 100)))
        this.invoiceData.facturePrixTotal = num.toFixed(2)
        return num.toFixed(2)

      } else if (this.invoiceData.remise && !this.invoiceData.taxe) {

        let totalWithRemise = price.sum('prix') - (price.sum('prix') * (this.invoiceData.remise / 100))
        let num = parseFloat(totalWithRemise)
        this.invoiceData.facturePrixTotal = num.toFixed(2)
        return num.toFixed(2)

      } else if (!this.invoiceData.remise && this.invoiceData.taxe) {

        let totalWithoutRemise = price.sum('prix')
        let num = parseFloat(totalWithoutRemise * (1 + (this.invoiceData.taxe.valeur / 100)))
        this.invoiceData.facturePrixTotal = num.toFixed(2)
        return num.toFixed(2)

      } else {

        this.invoiceData.facturePrixTotal = price.sum('prix')
        return parseFloat(price.sum('prix'))

      }

      // return parseFloat(price.sum('prix'))
    },

    // ***
    // **
    // FAIRE LA SOMME DES PRODUITS SANS LES TAXES NI LA REMISE
    // **
    // ***
    getSousTotal(arr) {
      let price = ''

      for (let i = 0; i < arr.length; i++) {
        price = arr
      }

      Array.prototype.sum = function(prop, top) {
        let total = 0
        for (let i = 0, _len = this.length; i < _len; i++) {
          total += this[i][prop] * this[i][top] 
        }
        return total
      }

      this.invoiceData.facturePrixTotalHt = price.sum('cout', 'qte')
      return price.sum('cout', 'qte')
    },


    // ***
    // **
    // FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
    // **
    async saveFacture() {
      if (!this.dateDefault) {
        // shake alert quand le champ date d'émission n'est pas rempli
        this.$swal({
          title: 'Ajouter une date d\'émission',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          showClass: {
            popup: 'animate__animated animate__shakeX',
          },
          buttonsStyling: false,
        })
      }  else if (!this.invoiceData.items[0]) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: 'Ajouter un article',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          showClass: {
            popup: 'animate__animated animate__shakeX',
          },
          buttonsStyling: false,
        })
      } else if (!this.invoiceData.items[0].itemTitle) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: 'Ajouter un article',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          showClass: {
            popup: 'animate__animated animate__shakeX',
          },
          buttonsStyling: false,
        })
      } else {
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }
        if (this.invoiceData.remise === null && this.invoiceData.taxe === null) {
          const data = {
            // client: this.factureClient.id,
            date_emission: this.dateDefault,
            // date_echeance: this.dueDate,
            // entreprise: this.factureClient.id,
            libelle : this.libelle,
            items: this.invoiceData.items,
            // vendeur: this.invoiceData.vendeur,
            // description: this.invoiceData.note,
           montant_depense: this.invoiceData.facturePrixTotal,
            // total_ht: this.invoiceData.facturePrixTotalHt,
            nombre_article: this.invoiceData.items.length,
            // article: this.invoiceData.articles_id,
            // articles:this.invoiceData.articles,

            // type_facture: 'facture',
          }
          console.log(data)
          await axios.post(URL.DEPENSE_GROUPE, data, config).then(res => {
            console.log('facture enregistré', res.data)
             this.confirmText()
            this.$router.push('/liste-depense-groupe')

            // if (res.data) {
            //   this.confirmText()
            // }
          }).catch(error => {
            console.log('api error', error.messagae)
            this.errorText()
          })
        } else if (this.invoiceData.remise !== null && this.invoiceData.taxe === null) {
          const data = {
            client: this.factureClient.id,
            date_emission: this.dateDefault,
            date_echeance: this.dueDate,
            entreprise: this.factureClient.id,
            items: this.invoiceData.items,
            description: this.invoiceData.note,
            total_ttc: this.invoiceData.facturePrixTotal,
            total_ht: this.invoiceData.facturePrixTotalHt,
            nombre_article: this.invoiceData.items.length,
            articles_id: this.invoiceData.articles_id,
            type_facture: 'facture',
          }
          console.log(data)
          await axios.post(URL.DEPENSE_GROUPE, data, config).then(res => {
            console.log('facture enregistré', res.data)
            if (res.data) {
              this.confirmText()
            }
          }).catch(error => {
            console.log('api error', error.messagae)
            this.errorText()
          })
        } else if (this.invoiceData.remise === null && this.invoiceData.taxe !== null) {
          const data = {
            client: this.factureClient.id,
            date_emission: this.dateDefault,
            date_echeance: this.dueDate,
            entreprise: this.factureClient.id,
            items: this.invoiceData.items,
            vendeur: this.invoiceData.vendeur,
            description: this.invoiceData.note,
            remise: this.invoiceData.remise,
            total_ttc: this.invoiceData.facturePrixTotal,
            total_ht: this.invoiceData.facturePrixTotalHt,
            total_taxe: this.invoiceData.taxe.valeur,
            nombre_article: this.invoiceData.items.length,
            articles_id: this.invoiceData.articles_id,
            taxes_id: this.invoiceData.taxe.id,
            type_facture: 'facture',
          }
          console.log(data)
          await axios.post(URL.DEPENSE_GROUPE, data, config).then(res => {
            console.log('facture enregistré', res.data)
            if (res.data) {
              this.confirmText()
            }
          }).catch(error => {
            console.log('api error', error.messagae)
            this.errorText()
          })
        } else {
          const data = {
            // client: this.factureClient.id,
            date_emission: this.dateDefault,
            items: this.invoiceData.items,
            libelle_depense:this.libelle,
            total_ttc: this.invoiceData.facturePrixTotal,
            total_ht: this.invoiceData.facturePrixTotalHt,
            nombre_article: this.invoiceData.items.length,
            // article:this.invoiceData.articles,
            // articles_id: this.invoiceData.articles_id,
            // taxes_id: this.invoiceData.taxe.id,
            // type_facture: 'facture',
          }
          console.log(data)
          await axios.post(URL.DEPENSE_GROUPE, data, config).then(res => {
            console.log('facture enregistré', res.data)
            if (res.data) {
              this.confirmText()
            }
          }).catch(error => {
            console.log('api error', error.messagae)
            this.errorText()
          })
        }
      }
    },
    // Alerte quand facture enregistré avec succès 
    confirmText() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Depense enregistrée avec succès",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      }).then(result => { 
        if (result.value) {
          this.trTrimHeight(this.$refs.row[0].offsetHeight)
          this.factureClient = null
          this.dateDefault = null
          this.dueDate = null
          this.libelle = null
          this.invoiceData.client = null
          this.invoiceData.items = []
          this.invoiceData.taxes_id = []
          this.invoiceData.articles_id = []
          this.invoiceData.articles = []
          this.invoiceData.date_emission = null
          this.invoiceData.dateDefault = null
          this.invoiceData.nombre_article = 0
          this.invoiceData.note = 'Taper une note ici'
          this.invoiceData.facturePrixTotal = 0
        } else {
          this.$router.push('/liste-depense-groupe')
        }
      })
    },
    // Alerte quand facture non enregistré
    errorText() {
      this.$swal({
        title: 'Erreur',
        text: 'Votre facture n\'est pas enregistré, veillez rééssayer',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Rééssayer',
        cancelButtonText: 'Annuler',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.saveFacture()
            this.$router.push('/liste-depense-groupe')
        } else {
          this.$router.push('/liste-depense-groupe')
        }
      })
    },
    // ***
    // **
    // FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
    // **
  
    // ***
    // **
    // FUNTION POUR PREVISUALISER LA FACTURE
    // **

    // *****
    // ****
    // FUNCTION POUR AJOUT D'ARTICLE
    // ****
    // *****
   


    // *****
    // ****
    // FUNCTION POUR AJOUT DE CLIENT
    // ****
    // *****
   

    // Alert When added new article
    showAlert() {
      this.$swal({
        title: 'Article ajouté avec succès',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    }
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const clients = ref([])

    const itemFormBlankItem = {
      nom: null,
      cout: 0,
      taxe: 0,
      qte: 1,
      prix: 0,
      libelle:"entrer un article"
    }

    const invoiceData = ref({
      id: '0000',
      client: null,
      entreprise: null,
      logoEntreprise: null,
      date_emission: null,
      date_echeance: null,
      libelle: null,

      // ? Set single Item in form for adding data
      items: [],
      articles_id: [],
      articles: [],

      taxe: null,
      remise: null,
      taxes_id: null,
      // totalTaxe: [],
      nombre_article: 0,

      vendeur: '',
      facturePrixTotal: 0,
      facturePrixTotalHt: 0,
      factureTotalTaxe: 0,
      note: '50% à la livraison, 50% à la commande.\nNous vous remercions.',
      paiement: null,
    })

    // LISTE DES INFOS DE L'ENTREPRISE
    const entrerpiseData = ref('')
    const entreprise_logo = ref('')

    const updateItemForm = (index, val) => {
      const { prix_vente, id } = val
      // invoiceData.value.items[index].cout = prix_vente
      invoiceData.value.items[index].qte = 1
      invoiceData.value.articles_id[index] = id
      invoiceData.value.articles[index] = article
    }

    // ***
    // RECUPERE LA TAXE ET LA MODIFIE
    // **
    const updateItemTaxe = (index, val) => {
      const { valeur, id } = val
      invoiceData.value.items[index].taxe = valeur
      invoiceData.value.totalTaxe[index] = valeur
      invoiceData.value.taxes_id[index] = valeur
    }

    // *****
    // ***
    // VARIABLES DECLAREES PAR MOI - AIME
    // ***
    // *****
    // LISTE DES ARTICLES
    const articlesList = ref('')
    // LISTE DES TAXES
    const taxesList = ref('')
    // VARIABLES POUR UPLOAD LE LOGO
    const picture = ref('')
    const choose = ref('')
    // VARIABLES POUR LA LISTE DES CLIENTS
    const clientList = ref([])
    const factureClient = ref(null)
    // VARIABLES POUR LES DATES
    const dateDefault = ref(0)
    const dueDate = ref(0)
    // VARIABLES POUR LES ARTICLES
    const articleBlank = ref({
      nom: null,
      cout: 0,
      taxe: 0,
      qte: 1,
      prix: 0,
      itemTitle:'entrer un article'
    })

    const invoiceTaxe = ref(null)
    const invoiceRemise = ref(null)

    const date_alert = ref(null)

    const saved_facture = ref(null)

    const clientUpOption = ref([{ title: "Particulier" }, { title: "Entreprise" }])


    // FUNCTION TO CONVERT NUMBER INTO CURRENCY
    const formatter = new Intl.NumberFormat('ci-CI', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 2
    })



    

    const contactEntier = (e) => {
      newUser.value.contact = e
    }

    const changer = (e) => {
      if (e.name) {
        newUser.value.contact.country.name = e.name
      }
    }




    const processFile2 = (event) => {
      newArticle.value.file = event.target.files[0];
      if (event.target.files.length !== 0) {
        console.log(newArticle.value.file);
      }
    }





    // NEW USER DETAIL
    const newUser = ref({
      nom: '',
      prenoms: '',
      email: '',
      contact: '',
      localisation: '',
      statut: ''
    })

    // DATA FOR NEW USER CREATION
    const phone = ref('')
    const indicatifFinal = ref('')
    const status_id = ref(null)


    // NEW ARTICLE DETAILS
    const newArticle = ref({
      libelle: '',
      categorie: '',
      type: '',
      poids: '',
      unite: '',
      prix_achat: '',
      prix_vente: '',
      movie: '',
      file: null,
      description: '',
    })

    // DATA FOR NEW ARTICLE CREATION
    const optionUnite = ref(["Kg", "Unité", "Litre"])
    const optionType = ref(["Service", "Produit"])
    const categories = ref([])

    return {
      invoiceData,
      clients,
      updateItemForm,
      itemFormBlankItem,
      invoiceTaxe,
      invoiceRemise,
      entreprise_logo,
      // ***
      // VARIABLE QUE JAI AJOUTE
      // ***
      categories,
      processFile2,
      optionType,
      optionUnite,
      newArticle,
      status_id,
      indicatifFinal,
      phone,
      newUser,
      contactEntier,
      changer,
      clientUpOption,
      entrerpiseData,
      picture,
      choose,
      articleBlank,
      dateDefault,
      dueDate,
      clientList,
      factureClient,
      updateItemTaxe,
      articlesList,
      taxesList,
      date_alert,
      saved_facture,
      formatter,
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
    color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}

.invoice-total-wrapper {
  max-width: 15rem !important;
}
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
@import "~@core/scss/base/components/variables-dark";

.invoice-total-wrapper {
  max-width: 15rem !important;
}

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }
  }
}

.upload-logo {
  position: relative;
  border: 1px solid #6e6b7b;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.upload-logo .upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-logo .upload .upload-icon {
  width: 80%;
  height: 40px;
  margin: 15px auto 0;
}

.upload-logo .upload p {
  text-align: center;
  color: #6e6b7b;
  font-weight: 600;
}

.upload-logo #logo-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  display: block;
}

.upload-logo #logo-img.visible {
  display: block;
}

.upload-logo #logo-img.invisible {
  display: none;
}

.upload-logo button {
  position: absolute;
  top: 0;
  right: 0;
  outline: none;
  background-color: #450077;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  padding: 5px 10px;
}
</style>
