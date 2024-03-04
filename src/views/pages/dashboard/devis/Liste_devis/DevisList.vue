<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

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
          <b-button
            variant="primary"
            :to="{ name: 'DevisAdd'}"
          >
            Créer un nouveau dévis
          </b-button>
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
          </div>
        </b-col>
      </b-row>

    </div>

    <!-- Loader -->
    <!-- <div v-if="devisList.length === 0 && !success" class="loader">
      <b-spinner type="grow" label="Chargement..."></b-spinner>
    </div> -->

    <!-- <div v-if="devisList.length === 0 && success" class="loader">
      <h3>Aucun devis enregistré</h3>
    </div> -->

    <!-- <div v-if="devisList.length === 0 && warning" class="loader">
      <p>Erreur serveur, recharger la page s'il vous plait...</p>
    </div> -->

    <b-table
      ref="refInvoiceListTable"
      :items="devisList"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="Aucun devis enregistré"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filtre_facture"
    >

      <template #head(invoiceStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'FacturePreview', params: { id: data.item.code }}"
          class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
      </template>

      <!-- Column: Client -->
      <template #cell(client)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="32"
              :src="data.item.profile_photo_url"
              :variant="`light-${resolveClientAvatarVariant(data.item.invoiceStatus)}`"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.client.nom }} {{ data.item.client.prenoms }}
          </span>
          <small class="text-muted">{{ data.item.client.email }}</small>
        </b-media>
      </template>

      <!-- Column: Montant total -->
      <template #cell(total_ttc)="data">
        <span class="text-nowrap text-info">
          {{ formatter.format(data.item.total_ttc) }}
        </span>
      </template>

      <!-- Column: Taxe -->
      <template #cell(total_taxe)="data">
        <span v-if="data.item.total_taxe === null" class="text-nowrap text-success">
          0 %
        </span>
        <span v-if="data.item.total_taxe !== null" class="text-nowrap text-success">
          {{ data.item.total_taxe }} %
        </span>
      </template>

      <!-- Column: Remise -->
      <template #cell(remise)="data">
        <span v-if="data.item.remise === null" class="text-nowrap text-success">
          0 %
        </span>
        <span v-if="data.item.remise !== null" class="text-nowrap text-success">
          {{ data.item.remise }} %
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
            @click="sendFactureEmail(data.item)"
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
            @click="prevFac(data.item.id)"
          />
          <b-tooltip
            title="Prévisualiser la facture"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />

          <feather-icon
            :id="`invoice-row-${data.item.id}-change-icon`"
            icon="FileTextIcon"
            size="16"
            class="mr-1 cursor-pointer"
            @click="transform(data.item.id)"
          />
          <b-tooltip
            title="Transformer en facture"
            :target="`invoice-row-${data.item.id}-change-icon`"
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
            <!-- <b-dropdown-item v-if="data.item.somme_impaye && Number(data.item.somme_impaye) !== 0" v-b-modal.modal-login @click="getInvoiceId(data.item.id, data.item.total_ttc)">
              <feather-icon icon="ShoppingBagIcon" />
              <span class="align-middle ml-50">Régler</span>
            </b-dropdown-item> -->
            <b-dropdown-item @click="deleteFac(data.item.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Supprimer</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>

    </b-table>
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
            :total-rows="devisTotal"
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



    <!-- Modal pour effectuer un paiement -->
    <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Régler" cancel-title="Annuler" centered title="Ajouter un paiement" @ok="paiement">
      <b-form>
        <!-- nom -->
        <b-form-group label="Compte" label-for="register-nom">
          <validation-provider #default="{  }" name="compte" rules="required">
            <v-select v-model="compte" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="compteList" >
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
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { ref, onUnmounted, onMounted } from '@vue/composition-api'
import store from '@/store'
import useInvoicesList from './useInvoiceList'
import invoiceStoreModule from '../invoiceStoreModule'
import URL from '@/views/pages/request'
import axios from 'axios'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,

    vSelect,
  },
  methods: {
    // Transforme le devis en facture
    async transform(id) {
      try {
        const config = {
          headers: {
            'Accept': 'application/json'
          },
        }

        await axios.post(URL.DEVIS_TO_FACTURE, { id: id }, config).then((response) => {
          console.log(response.data)
          if (response.data) {
            this.$router.push('/facture')
            axios.get(URL.FACTURE_LIST).then(res => {
              this.devisList = []
              this.devisTotal = 0

              this.devisList = res.data.facture.filter(item => {
                return item.status === 'devis'
              })
              if (this.devisList.length === 0) {
                this.devisTotal = 0
              }
              if (this.devisList.length === 0) {
                this.success = true
              }
            }).catch((error) => {
              console.log(error)
              this.warning = true
            })
          }
        })
      } catch (error) {
        console.log('trycatch error', error)
      }
    },
    // ***
    // **
    // Envoie facture par email
    // **
    async sendFactureEmail(data) {
      const data2 = {
        client: data.client.email,
        client_id: data.client_id,
        id: data.id,
        entreprise_id: data.entreprise_id,
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
        this.$swal({
          title: 'Attention !',
          text: 'Quelque chose s\'est mal passé',
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
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
      const fac = this.devisList.filter(item => item.id === this.invoice_id)

      if (this.montant > this.total_ttc) {
        this.alert_text = 'Le montant entré est supérieur à celui inscrit sur la facture !'
        this.montantTrop = true
      } else if(this.montant > Number(fac[0].somme_impaye)) {
        this.alert_text = 'Le montant entré est supérieur au reste à payer !'
        this.montantTrop = true
      } else {
        this.montantTrop = false
      }
    },
    getInvoiceId(id, montant) {
      this.invoice_id = id
      this.total_ttc = montant
    },
    async paiement(bvModalEvt) {
      try {
        if (this.montantTrop || !this.compte || !this.montant) {
          bvModalEvt.preventDefault();
        } else {

          const data = {
            compte_id: this.compte.id,
            montant: this.montant,
            facture_id: this.invoice_id
          }

          await axios.post(URL.VERSEMENT_CREATE, data).then((response) => {

            axios.get(URL.VERSEMENT_LIST).then((res) => {
              this.versementList = res.data[0]
              console.log('list versement', this.versementList)
            }).catch((error) => {
              console.log(error)
            })
            this.$swal({
              title: 'Succès !',
              text: 'Votre paiement a été enregistré avec succès',
              icon: 'success',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                this.compte = ''
                this.montant = ''
              }
            })
          });
        }
      } catch (error) {
        console.log(error)
      }
    },
    montantPaye(id) {
      const fac = this.devisList.filter(item => item.id === id)
      if (this.versementList.length !== 0) {
        const result = this.versementList.filter(item => item.facture_id === id)
        const fac = this.devisList.filter(item => item.id === id)

        if (result.length !== 0 && result.length === 1) {
          fac[0].somme_paye = result[0].montant
          return result[0].montant.toFixed(2)

        } else if (result.length > 1) {
          let montant = 0
          for (let i = 0; i < result.length; i++) {
            montant += result[i].montant
          }
          fac[0].somme_paye = montant.toFixed(2)
          return montant.toFixed(2)

        } else {
          fac[0].somme_paye = 0
          return Number('0')
        }

      } else {
        fac[0].somme_paye = 0
        return Number('0')
      }
      
    },
    restePaye(id) {
      if (this.versementList.length !== 0) {
        const result = this.versementList.filter(item => item.facture_id === id)
        const fac = this.devisList.filter(item => item.id === id)

        if (result.length === 0) {
          fac[0].somme_impaye = fac[0].total_ttc
          return fac[0].total_ttc.toFixed(2)

        } else if (result.length === 1) {
          let num = fac[0].total_ttc - result[0].montant
          fac[0].somme_impaye = num.toFixed(2)
          return num.toFixed(2)

        } else if (result.length > 1) {
          let montant = 0
          for (let i = 0; i < result.length; i++) {
            montant += result[i].montant
          }
          let num = fac[0].total_ttc - montant
          fac[0].somme_impaye = num.toFixed(2)
          return num.toFixed(2)
        }

      } else {
        const fac = this.devisList.filter(item => item.id === id)
        fac[0].somme_impaye = fac[0].total_ttc
        return fac[0].total_ttc
      }

    },
    prevFac(id) {
      const currectFacture = this.devisList.filter(item => item.id === id)

      localStorage.setItem('facture', JSON.stringify(currectFacture[0]))
      this.$router.push('/devis/view')
    },
    async deleteFac(id) {
      await axios.delete(`${URL.FACTURE_DESTROY}/${id}`).then(res => {
      }).catch(error => console.log(error))
      setTimeout(async () => {
        await axios.get(URL.FACTURE_LIST).then(res => {
          this.devisList = res.data.facture
          this.devisTotal = res.data.facture.length
        })
      }, 100);
    },
    editFac(id) {
      const currectFacture = this.devisList.filter(item => item.id === id)

      localStorage.setItem('facture_edit', JSON.stringify(currectFacture[0]))
      this.$router.push('/facture/modification')
    },
  },
  mounted(){
    document.title = 'Liste des devis';
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    onMounted(async () => {
      try {
        await axios.get(URL.VERSEMENT_LIST).then((response) => {
          versementList.value = response.data[0]
        }).catch((error) => {
          console.log(error)
        })

        await axios.get(URL.FACTURE_LIST).then(res => {
          console.log('facture list',res.data)
          devisList.value = res.data.facture.filter(item => {
            return item.status === 'devis'
          })
          devisTotal.value = devisList.value.length
          if (devisList.value.length === 0) {
            success.value = true
          }
        }).catch((error) => {
          console.log(error)
          warning.value = true
        })

        await axios.get(URL.VERSEMENT_LIST).then((response) => {
          console.log('versement liste',response.data)
          compteList.value = response.data
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    const {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList()

    // ***
    // **
    // LES VARIBLES AJOUTES
    // ***
    const devisList = ref([])
    const devisTotal = ref(0)
    const versementList = ref([])
    const invoice_id = ref(null)
    const montant = ref('')
    const compte = ref('')
    const compteList = ref([])
    const montantTrop = ref(false)
    const total_ttc = ref(0)

    const success = ref(false)
    const warning = ref(false)

    const filtre_facture = ref('')


    // FUNCTION TO CONVERT NUMBER INTO CURRENCY
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
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,

      devisList,
      devisTotal,
      versementList,
      invoice_id,
      montant,
      compte,
      compteList,
      montantTrop,
      total_ttc,

      filtre_facture,

      success,
      warning,

      formatter,

      newCompte,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.add-new-client-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}

.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}

.loader {
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
