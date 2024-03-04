<template>
  <section class="invoice-preview-wrapper">
    <b-row v-if="invoiceData" class="invoice-preview">
      <!-- Col: Left (Invoice Container) -->
      <b-col cols="12" xl="9" md="8">
        <b-card no-body class="invoice-preview-card">
          <!-- Header -->
          <b-card-body class="invoice-padding pb-0">
            <div
              class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0"
            >
              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <div class="logo">
                    <img :src="entreprise_logo">
                  </div>
                </div>
              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <h4 v-if="invoiceData.code && invoiceData.id" class="invoice-title">
                  Devis n°
                  <span class="invoice-number">{{ invoiceData.code }}</span>
                </h4>
                <h4 v-if="!invoiceData.code && invoiceData.id" class="invoice-title">
                  Devis
                </h4>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Date d'émission:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.date_emission }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Date d'échéance:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.date_echeance }}
                  </p>
                </div>
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing" />

          <!-- Invoice Client & Payment Details -->
          <b-card-body v-if="invoiceData.client" class="invoice-padding pt-0">
            <b-row class="invoice-spacing">
              <!-- Col: Invoice To -->
              <b-col cols="12" xl="6" class="p-0">
                <h6 class="mb-2">
                  Facture à:
                </h6>
                <h6 class="mb-25">
                  Mr/Mme: {{ invoiceData.client.nom }} {{ invoiceData.client.prenoms }}
                </h6>
                <p class="card-text mb-25">
                  Adresse: {{ invoiceData.client.adresse }}
                </p>
                <p class="card-text mb-25">
                  Contact: {{ invoiceData.client.contact }}
                </p>
                <p class="card-text mb-0">
                  Email: {{ invoiceData.client.email }}
                </p>
              </b-col>

              <!-- Col: Payment Details -->
              <b-col
                xl="6"
                cols="12"
                class="p-0 mt-xl-0 mt-2 d-flex justify-content-xl-end"
              >
                <div>
                  <h6 class="mb-2">
                    Entreprise :
                  </h6>
                  <h6 class="mb-25">
                    Nom: {{ invoiceData.entreprise.libelle }}
                  </h6>
                  <p class="card-text mb-25">
                    Adresse: {{ invoiceData.entreprise.adresse }}
                  </p>
                  <p class="card-text mb-25">
                    Contact: {{ invoiceData.entreprise.contact }}
                  </p>
                  <p class="card-text mb-0">
                    Email: {{ invoiceData.entreprise.email }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Invoice Description: Table -->
          <b-table-lite
            v-if="invoiceData.items"
            responsive
            :items="invoiceData.items"
            :fields="['itemTitle', 'cout', 'qte', 'prix']"
          >
            <template #cell(itemTitle)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ data.item.itemTitle.libelle }}
              </b-card-text>
            </template>
            <template #cell(cout)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ formatter.format(Number(data.item.cout)) }}
              </b-card-text>
            </template>
            <template #cell(qte)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ data.item.qte }}
              </b-card-text>
            </template>
            <template #cell(prix)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ formatter.format(data.item.prix) }}
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Table 2 -->
          <b-table-lite
            v-if="invoiceData.articles"
            responsive
            :items="invoiceData.articles"
            :fields="['article', 'cout', 'qte', 'prix']"
          >
            <template #cell(article)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ data.item.libelle }}
              </b-card-text>
            </template>
            <template #cell(cout)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ formatter.format(data.item.prix_vente) }}
              </b-card-text>
              <!-- <b-card-text v-if="!data.item.pivot.options" class="font-weight-bold mb-25">
                0 %
              </b-card-text> -->
            </template>
            <template #cell(qte)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ data.item.pivot.quantite }}
              </b-card-text>
            </template>
            <template #cell(prix)="data">
              <b-card-text class="font-weight-bold mb-25">
                {{ formatter.format(data.item.pivot.prix) }}
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Total -->
          <b-card-body class="invoice-padding pb-0">
            <b-row>
              <!-- Col: Sales Persion -->
              <b-col
                cols="12"
                md="4"
                class="mt-md-0 mt-3"
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
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Sous total:
                    </p>
                    <p v-if="invoiceData.total_ht" class="invoice-total-amount">
                      {{ formatter.format(invoiceData.total_ht) }}
                    </p>
                    <p v-if="invoiceData.facturePrixTotalHt" class="invoice-total-amount">
                      {{ formatter.format(invoiceData.facturePrixTotalHt) }}
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Remise :
                    </p>
                    <p v-if="invoiceData.remise" class="invoice-total-amount">
                      {{ invoiceData.remise }} %
                    </p>
                    <p v-if="!invoiceData.remise" class="invoice-total-amount">
                      0 %
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Tax :
                    </p>
                    <p v-if="invoiceData.total_taxe && invoiceData.total_taxe !== null" class="invoice-total-amount">
                      {{ invoiceData.total_taxe }} %
                    </p>
                    <p v-if="invoiceData.total_taxe === null" class="invoice-total-amount">
                      0 %
                    </p>
                    <!-- <p v-if="!invoiceData.total_taxe && !invoiceData.taxe" class="invoice-total-amount">
                      0 %
                    </p> -->
                    <p v-if="!invoiceData.total_taxe && invoiceData.taxe && invoiceData.taxe !== null" class="invoice-total-amount">
                      {{ invoiceData.taxe.valeur }} %
                    </p>
                    <p v-if="!invoiceData.total_taxe && invoiceData.taxe === null" class="invoice-total-amount">
                      0 %
                    </p>
                  </div>
                  <hr class="my-50">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Total TTC:
                    </p>
                    <p class="invoice-total-amount" v-if="invoiceData.total_ttc">
                      {{ formatter.format(invoiceData.total_ttc) }}
                    </p>
                    <p class="invoice-total-amount" v-if="invoiceData.facturePrixTotal">
                      {{ formatter.format(invoiceData.facturePrixTotal) }}
                    </p>
                  </div>
                </div>
              </b-col>
              <!-- Col: Sales Persion -->
              <b-col
                cols="12"
                class="mt-md-0 mt-3 pt-2"
                order="3"
                v-if="Number.isInteger(invoiceData.total_ttc)"
              >
                <p>La présente facture est arreté à la somme de {{ intNombreALettre(invoiceData.total_ttc) }} franc CFA.</p>
              </b-col>
              <b-col
                cols="12"
                class="mt-md-0 mt-3 pt-2"
                order="3"
                v-if="invoiceData.total_ttc && !Number.isInteger(invoiceData.total_ttc)"
              >
                <p>La présente facture est arreté à la somme de <span style="font-weight: bold;">{{ intNombreALettre(invoiceData.total_ttc) }} virgule {{ decNombreALettre(invoiceData.total_ttc) }}</span> franc CFA.</p>
              </b-col>
              <b-col
                cols="12"
                class="mt-md-0 mt-3 pt-2"
                order="3"
                v-if="invoiceData.facturePrixTotal && !Number.isInteger(invoiceData.facturePrixTotal)"
              >
                <p>La présente facture est arreté à la somme de <span style="font-weight: bold;">{{ intNombreALettre(invoiceData.facturePrixTotal) }} virgule {{ decNombreALettre(invoiceData.facturePrixTotal) }}</span> franc CFA.</p>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing" />

          <!-- Note -->
          <b-card-body class="invoice-padding pt-0">
            <span class="font-weight-bold">Note: </span>
            <span v-if="invoiceData.description">{{ invoiceData.description }}</span>
            <span v-if="invoiceData.note">{{ invoiceData.note }}</span>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col cols="12" md="4" xl="3" class="invoice-actions">
        <b-card>
          <!-- Button: Send Invoice -->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="sendFactureEmail"
          >
            Envoyer
          </b-button>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printInvoice"
          >
            Imprimer
          </b-button>

          <!-- Button: Edit -->
          <b-button
            v-if="!invoiceData.code"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            block
            @click="editFacture"
          >
            Modifier
          </b-button>

          <!-- Button: enregistrer -->
          <b-button
            v-if="invoiceData.code && invoiceData.somme_impaye || invoiceData.code && Number(invoiceData.somme_impaye) === '0'"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            v-b-modal.modal-login
            block
          >
            Règlement
          </b-button>
        </b-card>


        <b-card v-if="invoiceData.somme_paye">
          <div v-if="invoiceData.somme_paye">
            <span class="font-weight-bold">Montant payé :</span> {{ formatter.format(invoiceData.somme_paye) }}
          </div>
          <div v-if="invoiceData.somme_paye === '0' || invoiceData.somme_paye === 0">
            <span class="font-weight-bold">Montant payé :</span> {{ invoiceData.somme_paye }} fr
          </div>

          <hr>
          
          <div v-if="invoiceData.somme_impaye">
            <span class="font-weight-bold">Reste à payer :</span> {{ formatter.format(invoiceData.somme_impaye) }}
          </div>
          <div  v-if="!invoiceData.somme_impaye || Number(invoiceData.somme_impaye) === '0'">
            <b-button
            variant="success"
            size="sm"
            pill
          >
            Facture réglée
          </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>



    <!-- Modal pour ajouter un paiement -->
    <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Régler" cancel-title="Annuler" centered title="Ajouter un paiement" @ok="paiement">
      <b-form>
        <!-- nom -->
        <b-form-group label="Compte" label-for="register-nom">
          <validation-provider #default="{  }" name="compte" rules="required">
            <v-select v-model="compte" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="compteList">
              <template #list-header>
                <li
                  v-b-modal.modal-compte
                  class="add-new-client-header d-flex align-items-center my-50"
                >
                  <feather-icon icon="PlusIcon" size="16" />
                  <span class="align-middle ml-25"
                    >Ajouter un nouveau compte bancaire</span
                  >
                </li>
              </template>
            </v-select>
          </validation-provider>
        </b-form-group>
        <!-- valeur -->
        <b-form-group label="Montant (fr)" label-for="register-montant">
          <validation-provider #default="{ errors }" name="montant" rules="required">
            <b-form-input @input="checkMontant" type="number" id="register-montant" v-model="montant" name="register-montant" :state="errors.length > 0 ? false:null" placeholder="18.000000" />
          </validation-provider>
          <p v-if="montantTrop" style="text-align: center; margin-top: 5px; color: red;">
            {{ alert_text }}
          </p>
        </b-form-group>
      </b-form>
    </b-modal>



    <!-- Modal pour ajouter une nouvelle taxe -->
    <b-modal id="modal-compte" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter un compte" @ok="newCompteBancaire">
      <validation-observer ref="registerForm">
        <b-form class="auth-register-form mt-2">
          <!-- Numero compte -->
          <b-form-group label="Numero de compte" label-for="register-numeroCompte">
            <validation-provider #default="{ errors }" name="nom" rules="required">
              <b-form-input id="register-nom" v-model="newCompte.numeroCompte" name="register-numeroCompte" :state="errors.length > 0 ? false:null" placeholder="AZ000000EH09" />
            </validation-provider>
          </b-form-group>

          <!-- Libelle -->
          <b-form-group label="Libelle du compte" label-for="register-libelle">
            <validation-provider #default="{ errors }" name="libelle" rules="required">
              <b-form-input id="register-libelle" v-model="newCompte.libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="NSIA, ECOBANK" />
            </validation-provider>
          </b-form-group>

          <!-- solde -->
          <b-form-group label="Solde" label-for="register-solde">
            <validation-provider #default="{ errors }" name="solde" rules="required">
              <b-form-input id="register-solde" v-model="newCompte.solde" type="text" name="register-solde" :state="errors.length > 0 ? false:null" placeholder="1000000000" />
            </validation-provider>
          </b-form-group>

          <!-- Description -->
          <b-form-group>
            <label for="taxeValue">Description (facultatif):</label>
            <b-form-textarea id="textarea" v-model="newCompte.description" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
          </b-form-group>        
        </b-form>
      </validation-observer>
    </b-modal>


  </section>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BTableLite,
  BCardText,
  BButton,
  VBToggle,
  BModal,
  BFormInput,
  BFormGroup,
  VBModal,
  BForm,
  BLink,
  BFormCheckbox,
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import { required } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import store from '@/store'
import invoiceStoreModule from '../invoiceStoreModule'
import URL from '@/views/pages/request'
import axios from 'axios'
import { NumberToLetter } from 'convertir-nombre-lettre'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BFormInput,
    BModal,
    BFormGroup,
    VBModal,
    BForm,
    BLink,
    BFormCheckbox,
    BInputGroup,
    BInputGroupAppend,
    required,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    Logo,
  },
  async mounted() {
    try {
      document.title = 'Devis'

      this.invoiceData = JSON.parse(localStorage.getItem('facture'))
      console.log(this.invoiceData)

      await axios.get(URL.VERSEMENT_LIST).then((response) => {
        this.compteList = response.data
      }).catch((error) => {
        console.log(error)
      })

      await axios.get(URL.ENTREPRISE_INFO).then(res => {
        this.entreprise_logo = res.data[0].logo_entreprise
        console.log('entrerpise logo', this.entreprise_logo)
      }).catch((error) => {
        console.log(error)
      })

      
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    intNombreALettre (num) {
      const intPart = num.toString().split('.')[0]
      return NumberToLetter(intPart)
    },

    decNombreALettre (num) {
      const decPart = num.toString().split('.')[1]
      if (decPart.length === 2) {
        return NumberToLetter(decPart)
      } else {
        return NumberToLetter(`${decPart}0`)
      }
    },

    async newCompteBancaire() {
      try {
        if (this.newCompte.numeroCompte && this.newCompte.libelle && this.newCompte.solde && this.newCompte.description) {
          const data = {
            numero_compte: this.newCompte.numeroCompte,
            libelle: this.newCompte.libelle,
            solde: this.newCompte.solde,
            description: this.newCompte.description
          }

          const config = {
            headers: {
              'Accept': 'application/json'
            },
          }

          await axios.post(URL.COMPTE_CREATE, data, config).then((response) => {
            axios.get(URL.COMPTE_LIST).then((response) => {
              this.compteList = response.data[0]
            }).catch((error) => {
              console.log(error);
            })
            this.$swal({
              title: 'Nouveau compte enregistré avec succès',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            if (response.data) {
              this.newCompte.numeroCompte = ''
              this.newCompte.libelle = ''
              this.newCompte.solde = ''
              this.newCompte.description = ''
            }
            this.compteList.push(this.newCompte)
          })
        }
      } catch (error) {
        console.log('trycatch error', error)
      }
    },

    checkMontant() {
      if (this.montant > this.invoiceData.total_ttc) {
        this.alert_text = 'Le montant entré est supérieur à celui inscrit sur la facture !'
        this.montantTrop = true
      } else if(this.invoiceData.somme_impaye && this.montant > this.invoiceData.somme_impaye) {
        this.alert_text = 'Le montant entré est supérieur au reste à payer !'
        this.montantTrop = true
      } else {
        this.montantTrop = false
      }
    },
    async paiement(bvModalEvt) {
      try {
        if (this.montantTrop || !this.compte || !this.montant) {
          bvModalEvt.preventDefault();
        } else {
          const data = {
            compte_id: this.compte.id,
            montant: this.montant,
            facture_id: this.invoiceData.id
          };
          await axios.post(URL.VERSEMENT_CREATE, data).then((response) => {
            // this.versementData = response.data;
            console.log(response.data)
            const new_somme_paye = Number(this.invoiceData.somme_paye) + Number(response.data[0].montant)
            this.invoiceData.somme_paye = new_somme_paye
            this.invoiceData.somme_impaye = this.invoiceData.total_ttc - this.invoiceData.somme_paye
            this.$swal({
              title: 'Succès !',
              text: 'Votre paiement a été enregistré avec succès',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Ok',
              cancelButtonText: 'Liste des factures',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-primary ml-1',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                this.compte = ''
                this.montant = ''
                localStorage.setItem('facture', JSON.stringify(this.invoiceData))
              } else {
                this.$router.push('/liste_facture')
                localStorage.setItem('facture', JSON.stringify(this.invoiceData))
              }
            })
          });
        }
      } catch (error) {
        console.log(error)
      }
    },
    editFacture() {
      // Vérifie si la facture à déjà un code
      if (this.invoiceData.code && this.invoiceData.articles) {
        const invoice_next = {
          code: this.invoiceData.code,
          id: this.invoiceData.id,
          articles_id: this.getArticleId(this.invoiceData.articles),
          date_emission: this.invoiceData.date_emission,
          date_echeance: this.invoiceData.date_echeance,
          client: this.invoiceData.client,
          entreprise: this.invoiceData.entreprise,
          items: this.getAllArticles(this.invoiceData.articles, this.invoiceData.taxes),
          facturePrixTotal: this.invoiceData.total_ttc,
          total_ht: this.invoiceData.total_ht,
          total_taxe: this.invoiceData.total_taxe,
          totalTaxe: this.invoiceData.totalTaxe,
          taxes_id: this.getTaxeId(this.invoiceData.articles),
          note: this.invoiceData.description,
        }
        localStorage.setItem('facture_edit', JSON.stringify(invoice_next))
        this.$router.push('/devis/edit')
        // console.log(invoice_next)
      } else {
        const invoice = {
          id: this.invoiceData.id,
          articles_id: this.invoiceData.articles_id,
          date_emission: this.invoiceData.date_emission,
          date_echeance: this.invoiceData.date_echeance,
          client: this.invoiceData.client,
          entreprise: this.invoiceData.entreprise,
          items: this.invoiceData.items,
          facturePrixTotal: this.invoiceData.facturePrixTotal,
          facturePrixTotalHt: this.invoiceData.facturePrixTotalHt,
          taxe: this.invoiceData.taxe,
          remise: this.invoiceData.remise,
          taxes_id: this.invoiceData.taxes_id,
          totalTaxe: this.invoiceData.totalTaxe,
          note: this.invoiceData.note,
        }
        localStorage.setItem('facture_edit', JSON.stringify(invoice))
        this.$router.push('/devis/edit')
      }
    },
    getArticleTaxe(taxe_id) {
      const taxe = this.invoiceData.taxes.filter(item => item.id === taxe_id)
      return taxe[0].valeur
    },
    // ===== RECUPERE LE ID DES ARTICLES
    getArticleId(articles) {
      const articles_id = []
      articles.filter(item => {
        articles_id.push(item.id)
      })
      return articles_id
    },
    // ===== RECUPERE LE ID DES TAXES
    getTaxeId(taxes) {
      const taxes_id = []
      taxes.filter(item => {
        taxes_id.push(item.id)
      })
      return taxes_id
    },
    // ===== RECUPERE LES ARTICLES DE LA FACTURE EN ITEMS
    getAllArticles(articles, tax) {
      const allArticles = []
      articles.filter(item => {
        tax.filter(el => {
          let article = {
            itemTitle: item,
            cout: item.prix_vente,
            prix: item.pivot.prix,
            qte: item.pivot.quantite,
            taxe: el.valeur
          }
          allArticles.push(article)
        })
      })

      const key = 'prix'
      const items = [...new Map(allArticles.map(item => [item[key], item])).values()]
      return items
    },
    // ***
    // **
    // FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
    // **
    async saveFacture() {
      const config = {
        headers: {
          'Accept': 'application/json'
        },
      }
      const data = {
        client: this.invoiceData.client.id,
        date_emission: this.invoiceData.date_emission,
        date_echeance: this.invoiceData.date_echeance,
        entreprise: this.invoiceData.entreprise.id,
        items: this.invoiceData.items,
        description: this.invoiceData.note,
        total_ttc: this.invoiceData.facturePrixTotal,
        total_ht: this.invoiceData.facturePrixTotalHt,
        total_taxe: this.invoiceData.taxe.valeur,
        remise: this.invoiceData.remise,
        nombre_article: this.invoiceData.items.length,
        articles_id: this.invoiceData.articles_id,
        taxes_id: this.invoiceData.taxe.id,
      }
      console.log(data)
      await axios.post(URL.FACTURE_CREATE, data, config).then(res => {
        console.log('facture enregistré', res.data)
        if (res.data) {
          this.confirmText()
        }
      }).catch(error => {
        this.errorText()
        console.log('api error', error.messagae)
      })
    },
    // Alerte quand facture enregistré avec succès 
    confirmText() {
      this.$swal({
        title: 'Succès',
        text: 'Votre facture a été enregistré avec succès',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Nouvelle facture',
        cancelButtonText: 'Liste des factures',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$router.push('/facture')
        } else {
          this.$router.push('/liste_facture')
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
        } else {
          this.$router.push('/liste_facture')
        }
      })
    },
    // ***
    // **
    // Envoie facture par email
    // **
    async sendFactureEmail() {
      const data2 = {
        client: this.invoiceData.client.email,
        client_id: this.invoiceData.client.id,
        id: this.invoiceData.id,
        entreprise_id: this.invoiceData.entreprise.id,
      }
      console.log('information envoyé au backend', data2)
      await axios.post(URL.FACTURE_SENDEMAIL, data2).then(res => {
        console.log(res.data)
        this.$swal({
          title: 'Succès !',
          text: 'La facture a été envoyé au client',
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }).catch(error => {
        console.log(error)
      })
    },
  },
  setup() {
    const invoiceData = ref(null)
    const paymentDetails = ref({})
    const compteList = ref([])
    const compte = ref('')
    const montant = ref(null)

    const entreprise_logo = ref('')
    
    const alert_text = ref('Le montant entré est supérieur à celui inscrit sur la facture !')
    const montantTrop = ref(false)

    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const printInvoice = () => {
      window.print()
    }

    const formatter = new Intl.NumberFormat('ci-CI', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 2
    })

    const newCompte = ref({
      numeroCompte: 0,
      libelle: '',
      solde: '',
      description: ''
    })

    return {
      invoiceData,
      paymentDetails,
      printInvoice,
      compteList,
      compte,
      montant,
      alert_text,
      montantTrop,
      formatter,
      newCompte,
      entreprise_logo
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.add-new-client-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}

.logo {
  width: 120px;
}

.logo > img {
  width: 100%;
}

@media print {
  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
            > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
              text-align: center;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
