<template>
<section>
  <div class="position-relative table-responsive table-base">
    <!-- Tableau pour afficher les taxes -->
    <div class="tableau">
      <b-card
        no-body
        class="px-2"
      >
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
              variant="relief-primary"
              @click="redirection"
            >
                Réaliser un emprunt
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
                v-model="filtreEmprunt"
                class="d-inline-block mr-1"
                placeholder="Rechercher par le nom de l'emprunt, le montant..."
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
          :items="emprunts"
          :fields="tableColumns"
          :filter="filtreEmprunt"
          show-empty
          empty-text="Aucun emprunt enregistré"
          class="bg-white mt-2 text-center"
        >
          <!-- Bouton de status -->
          <template #cell(stat)="data">
            <div v-if="getSolde(data.item.id).length !== 0 && getSolde(data.item.id).length == getAPayer(data.item.id).length">
              <b-badge variant="success">
                Soldé
              </b-badge>
            </div>
            <div v-if="getSolde(data.item.id).length === 0 && getSolde(data.item.id).length < getAPayer(data.item.id).length || getSolde(data.item.id).length !== 0 && getSolde(data.item.id).length < getAPayer(data.item.id).length">
              <b-badge variant="danger">
                A payer
              </b-badge>
            </div>
          </template>
          <!-- Bouton de taux -->
          <template #cell(taux)="data">
            <p>{{ data.item.taux }} %</p>
          </template>
          <!-- Bouton de delai -->
          <template #cell(del)="data">
            <p>{{ calculDelai(data.item.date_emprunt, data.item.date_remboursement) }}</p>
          </template>
          <!-- Bouton d'action -->
          <template #cell(actions)="data">
            <div class="w-50 mx-auto d-flex justify-content-around">
              <b-button variant="gradient-info" class="btn-icon" v-b-modal.modal-update @click="update(data.item.id)">
                <feather-icon icon="CheckCircleIcon" />
              </b-button>
              <b-button variant="gradient-danger" class="btn-icon" @click="deleteEmprunt(data.item.id)">
                <feather-icon icon="Trash2Icon" />
              </b-button>
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
                :total-rows="empruntTotal"
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



    <!-- modal login-->
    <b-modal
      id="modal-update"
      cancel-variant="outline-secondary"
      ok-title="Mettre à jour"
      cancel-title="Annuler"
      centered
      title="Remboursement d'emprunt"
      @ok="rembourser"
    >

      <b-card-body class="invoice-padding form-item-section">
        <div
          ref="form"
          class="repeater-form"
          v-if="remboursementTable"
        >
          <b-row
            v-for="(item, index) in remboursementTable"
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
                    Date remboursement
                  </b-col>
                  <b-col cols="12" lg="4">
                    Montant remboursement
                  </b-col>
                  <b-col cols="12" lg="4">
                    Status
                  </b-col>
                </b-row>
                <div class="form-item-action-col" />
              </div>

              <!-- Form Input Fields OR content inside bordered area  -->
              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
              <div class="d-flex border rounded" :class="{ 'border' : item.status === 'soldé' }">
                <b-row class="flex-grow-1 p-2">
                  <!-- Single Item Form Headers -->
                  <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Date</label>
                    <b-form-input
                      v-model="item.date_rembourement"
                      type="text"
                      class="mb-2"
                      readonly
                    />
                  </b-col>
                  <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Motant</label>
                    <b-form-input
                      v-model="item.montant_remboursement"
                      type="number"
                      class="mb-2"
                      readonly
                    />
                  </b-col>
                  <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Status</label>
                    <v-select
                      v-model="item.status"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="statusList"
                      label="status"
                      :clearable="false"
                      class="mb-2 item-selector-title"
                    />
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-card-body>
    </b-modal>
  </section>
</template>

<script>
  import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg,BFormTextarea,VBToggle } from "bootstrap-vue"
  import Ripple from "vue-ripple-directive"
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import vSelect from 'vue-select'
  import URL from '@/views/pages/request'
  import axios from "axios";

  export default {
    components: {
      vSelect,
      VBToggle,
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
      BFormTextarea,
      BInputGroupAppend,
      // validations
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      Ripple,
      'b-toggle': VBToggle,
    },
    data() {
      return {
        emprunts: [],
        remboursementTable: [],
        statusList: [{ status: 'Soldé' }, { status: 'Partiel' }, { status: 'A payer' }],

        filtreEmprunt: '',
        perPage: 3,
        currentPage: 1,
        empruntTotal: 0,
        tableColumns: [
            { key: 'stat', label: 'Status' },
            { key: 'libelle', sortable: true },
            { key: 'montant', sortable: true },
            { key: 'taux', sortable: true },
            { key: 'del', label: 'Delai', sortable: true },
            { key: 'date_emprunt', sortable: true, },
            { key: 'date_remboursement', sortable: true, },
            { key: 'actions' },
        ],
        perPageOptions: [3, 5, 10, 15]
      };
    },

    async mounted() {
        document.title = 'Emprunt'
        try {
          await axios.get(URL.EMPRUNT_LIST).then((response) => {
            this.emprunts = response.data.emprunts
            this.remboursementList = response.data.remboursements
            console.log(response.data)
          }).catch((error) => {
            console.log(error);
          })

        } catch (error) {
          console.log(error);
        }
    },


    methods: {
      convert(num, taux) {
        const formatter = new Intl.NumberFormat('ci-CI', {
          style: 'currency',
          currency: 'XOF',
          minimumFractionDigits: 2
        })
 
        let sum = parseFloat(num * (1 + (taux / 100)))

        return formatter.format(sum.toFixed(2))
      },
      
      async rembourser () {
        try {
          const item = this.remboursementTable.filter(item => {
            return typeof item.status === 'object'
          })

          const config = {
            headers: {
              'Accept': 'application/json'
            },
          }

          const data = {
            item: item,
            count: item.length
          }

          await axios.post(URL.REMBOURSEMENT_UPDATE, data, config).then((response) => {
            if (response.data) {
              this.successUpd()
              axios.get(URL.EMPRUNT_LIST).then((response) => {
                this.emprunts = response.data.emprunts
                this.remboursementList = response.data.remboursements
                console.log(response.data)
              }).catch((error) => {
                console.log(error);
              })
            }
          }).catch((error) => {
            console.log(error);
          })

        } catch (error) {
          console.log('trycatch error', error)
        }
      },

      successDel() {
        this.$swal({
          title: 'Réussi',
          text: 'Emprunt supprimé avec succès !',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      },

      successUpd() {
        this.$swal({
          title: 'Réussi',
          text: 'Status du remboursement modifié avec succès !',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      },

      redirection() {
        this.$router.push('/newEmprunt')
      },

      getAPayer(id) {
        const data = this.remboursementList.filter(item => {
          return item.emprunt_id === id
        })

        return data
      },
      
      getSolde(id) {
        const data = this.remboursementList.filter(item => {
          return item.emprunt_id === id
        })

        const stat = data.filter(item => {
          return item.status === 'Soldé'
        })

        return stat
      },

      async deleteEmprunt(id) {
        const data = {
          id: id
        }
        const config = {
          headers: {
            Accept: "application/json",
          },
        }
        await axios.post(URL.EMPRUNT_DESTROY, data, config).then(res => {
          console.log(res.data)
          const empruntIndex = this.emprunts.findIndex((item) => item.id === id);
          this.emprunts.splice(empruntIndex, 1);
          this.successDel()
        }).catch(error => console.log(error))
        setTimeout(async () => {
          await axios.get(URL.EMPRUNT_LIST).then(res => {
            this.emprunts = res.data.emprunts
            console.log(res.data)
          })
        }, 100);
      },

      update(id) {
        this.remboursementTable = this.remboursementList.filter(item => {
          return item.emprunt_id === id
        })
      },

      updateClient(index) {
        this.fakeData[index].taxeName = this.newTaxeName;
        this.fakeData[index].taxeValue = this.newTaxeValue;
      },

      calculDelai(debut, fin) {
        const date1 = new Date(debut)
        const date2 = new Date(fin)

        let diff = {}                           // Initialisation du retour
        let tmp = date2 - date1
    
        tmp = Math.floor(tmp/1000)             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60                    // Extraction du nombre de secondes
    
        tmp = Math.floor((tmp-diff.sec)/60)    // Nombre de minutes (partie entière)
        diff.min = tmp % 60                    // Extraction du nombre de minutes
    
        tmp = Math.floor((tmp-diff.min)/60)    // Nombre d'heures (entières)
        diff.hour = tmp % 24                   // Extraction du nombre d'heures
        
        tmp = Math.floor((tmp-diff.hour)/24)   // Nombre de jours restants
        diff.day = tmp

        if (diff.day) {
          return `${diff.day} jours`
        } else if (diff.day === 0) {
          return 'Moins de 1 jour'
        }
      }

    },
  }
</script>

<style lang="scss">

// @import '@core/scss/vue/libs/vue-select.scss';
//   .table-base {
//     margin: 30px auto 0;
//   }

   @import "@core/scss/vue/libs/vue-select.scss";
    .add-new-client-header {
        padding: $options-padding-y $options-padding-x;
        color: $success;
        &:hover {
        background-color: rgba($success, 0.12);
        }
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

  .border {
    border-color: cornflowerblue;
  }
</style>
