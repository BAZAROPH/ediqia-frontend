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
                <!-- Header: Left Content -->
                <div>
                  <div class="logo-wrapper">
                    <div class="upload-logo">
                      <img id="logo-img" :src="entreprise_logo" alt="" />
                    </div>
                  </div>
                </div>

                <!-- Header: Right Content -->
                <div class="invoice-number-date mt-md-0 mt-2 pr-2">
                  <div class="d-flex align-items-center justify-content-md-end mb-1">
                    <h2 class="font-weight-bold">
                      {{ query === "invoice" ? "Facture" : "Devis" }}
                    </h2>
                  </div>
                </div>
              </div>
            </b-card-body>

            <b-row class="container mx-auto px-3">
              <b-col cols="12" xl="6">
                <b-form-group>
                  <h5 class="font-weight-bold">
                    <span class="font-weight-bold">
                      {{
                        query === "invoice" ? "Object de la facture" : "Object du devis"
                      }}
                    </span>
                  </h5>
                  <b-form-input
                    v-model="invoiceData.libelle"
                    placeholder="Obj : création de site web"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" xl="6">
                <b-form-group>
                  <h5 class="font-weight-bold">
                    Date d'émission <span class="text-danger">*</span>
                  </h5>
                  <flat-pickr
                    @input="validateDate"
                    v-model="dateDefault"
                    class="form-control"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" xl="6">
                <b-form-group>
                  <h5 class="font-weight-bold">
                    Date d'échéance <span class="text-danger">*</span>
                  </h5>
                  <flat-pickr
                    @input="validateDate"
                    v-model="dueDate"
                    class="form-control"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <div
              v-if="date_alert"
              class="d-flex align-items-center justify-content-center"
            >
              <p class="text-danger">{{ date_alert }}</p>
            </div>

            <!-- Spacer -->
            <hr class="invoice-spacing" />

            <!-- Invoice Client & Payment Details -->
            <b-card-body class="invoice-padding pt-0">
              <b-row class="invoice-spacing">
                <!-- Col: Invoice To -->
                <b-col cols="12" xl="6" class="mb-lg-1">
                  <h6 class="mb-2 text-uppercase font-weight-bold">
                    {{ query === "invoice" ? "Facture" : "Devis" }} à
                    <span class="text-danger">*</span> :
                  </h6>

                  <!-- Select Client -->
                  <v-select
                    v-model="factureClient"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="clientList"
                    label="nom"
                    input-id="invoice-data-client"
                    :clearable="false"
                    placeholder="Choisir un client"
                  >
                    <template #label>
                      Choix du client <span class="text-danger">*</span>
                    </template>
                    <template #list-header>
                      <li
                        v-b-modal.add-new-client
                        class="add-new-client-header d-flex align-items-center my-50"
                      >
                        <feather-icon icon="PlusIcon" size="16" />
                        <span class="align-middle ml-25">Ajouter un nouveau client</span>
                      </li>
                    </template>
                  </v-select>

                  <!-- Selected Client -->
                  <div v-if="factureClient" class="mt-2">
                    <h6 class="mb-2 text-uppercase font-weight-bold">Client :</h6>
                    <h6 class="mb-25">
                      Nom : {{ factureClient.nom }} {{ factureClient.prenoms }}
                    </h6>
                    <b-card-text class="mb-25">
                      Adresse : {{ factureClient.adresse }}
                    </b-card-text>
                    <b-card-text class="mb-25">
                      Contact : {{ factureClient.contact }}
                    </b-card-text>
                    <b-card-text class="mb-0">
                      Email : {{ factureClient.email }}
                    </b-card-text>
                  </div>
                </b-col>

                <!-- Col: Payment Details -->
                <b-col
                  xl="6"
                  cols="12"
                  class="mt-xl-0 mt-2 justify-content-end d-xl-flex d-block"
                >
                  <div>
                    <h6 class="mb-2 text-uppercase font-weight-bold">Entreprise:</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td class="pr-1 font-weight-bolder">Nom:</td>
                          <td>
                            <span class="font-weight-bold">{{
                              entrerpiseData.libelle
                            }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="pr-1 font-weight-bolder">Adresse:</td>
                          <td>{{ entrerpiseData.adresse }}</td>
                        </tr>
                        <tr>
                          <td class="pr-1 font-weight-bolder">Email:</td>
                          <td>{{ entrerpiseData.email }}</td>
                        </tr>
                        <tr>
                          <td class="pr-1 font-weight-bolder">Téléphone:</td>
                          <td>{{ entrerpiseData.contact }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Items Section -->
            <b-card-body class="invoice-padding form-item-section">
              <div ref="form" class="repeater-form" :style="{ height: trHeight }">
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
                        <b-col cols="12" lg="5"> Article </b-col>
                        <b-col cols="12" lg="3"> Cout </b-col>
                        <b-col cols="12" lg="2"> Qté </b-col>
                        <b-col cols="12" lg="2"> Prix </b-col>
                      </b-row>
                      <div class="form-item-action-col" />
                    </div>

                    <!-- Form Input Fields OR content inside bordered area  -->
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-flex border rounded">
                      <b-row class="flex-grow-1 p-2">
                        <!-- Single Item Form Headers -->
                        <b-col cols="12" lg="5">
                          <label class="d-inline d-lg-none">Article</label>
                          <v-select
                            v-model="item.itemTitle"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="articlesList"
                            label="libelle"
                            :clearable="false"
                            class="mb-2 item-selector-title"
                            placeholder="Selectionner un article"
                            @input="(val) => updateItemForm(index, val)"
                          >
                            <template #list-header>
                              <li
                                v-b-modal.e-add-new-article
                                class="add-new-client-header d-flex align-items-center my-50"
                              >
                                <feather-icon icon="PlusIcon" size="16" />
                                <span class="align-middle ml-25">Nouvel article</span>
                              </li>
                            </template>
                          </v-select>
                        </b-col>
                        <b-col cols="12" lg="3">
                          <label class="d-inline d-lg-none">Cout</label>
                          <b-form-input
                            v-model="item.cout"
                            type="number"
                            class="mb-2"
                            min="0"
                          />
                        </b-col>
                        <b-col cols="12" lg="2">
                          <label class="d-inline d-lg-none">Qté</label>
                          <b-form-input
                            min="1"
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
                    <feather-icon icon="PlusIcon" size="16" />
                    Ajouter un article <span class="text-ligth">*</span>
                  </b-button>
                </b-col>

                <b-col cols="4">
                  <b-button
                    id="form-item-settings-icon"
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                  >
                    <div class="cursor-pointer">Remise / Taxe</div>

                    <!-- Setting Item Form -->
                    <b-popover
                      ref="form-item-settings-popover"
                      target="form-item-settings-icon"
                      triggers="click"
                      placement="lefttop"
                    >
                      <b-form @submit.prevent>
                        <b-row>
                          <!-- Field: Remise -->
                          <b-col cols="12">
                            <b-form-group
                              label="Remise (%)"
                              label-for="setting-item-discount"
                            >
                              <b-form-input
                                id="setting-item-discount"
                                value="null"
                                type="number"
                                v-model="invoiceRemise"
                              />
                            </b-form-group>
                          </b-col>

                          <!-- Field: Tax 1 -->
                          <b-col cols="12">
                            <b-form-group label="Taxe (%)" label-for="setting-item-tax-1">
                              <v-select
                                v-model="invoiceTaxe"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                label="libelle"
                                :options="taxesList"
                                input-id="setting-item-tax-1"
                                :clearable="true"
                              />
                            </b-form-group>
                          </b-col>

                          <b-col cols="12" class="d-flex justify-content-between mt-1">
                            <b-button
                              variant="outline-primary"
                              @click="
                                () => {
                                  if (this.invoiceTaxe) {
                                    this.invoiceData.taxe = this.invoiceTaxe;
                                  }
                                  if (this.invoiceRemise) {
                                    this.invoiceData.remise = this.invoiceRemise;
                                  }
                                  $refs[`form-item-settings-popover`].$emit('close');
                                }
                              "
                            >
                              Appliquer
                            </b-button>
                            <b-button
                              variant="outline-secondary"
                              @click="
                                () => {
                                  $refs[`form-item-settings-popover`].$emit('close');
                                }
                              "
                            >
                              Annuler
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-form>
                    </b-popover>
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
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">Sous total:</p>
                      <p
                        v-if="invoiceData.items.length !== 0"
                        class="invoice-total-amount"
                      >
                        {{ formatter.format(getSousTotal(invoiceData.items)) }}
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">Remise:</p>
                      <p class="invoice-total-amount">{{ invoiceData.remise }} %</p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">Taxe:</p>
                      <p v-if="invoiceData.taxe" class="invoice-total-amount">
                        {{ invoiceData.taxe.valeur }} %
                      </p>
                      <p v-if="!invoiceData.taxe" class="invoice-total-amount">0 %</p>
                    </div>
                    <hr class="my-50" />
                    <div v-if="invoiceData.items.length !== 0" class="invoice-total-item">
                      <h5 class="invoice-total-title font-weight-bold">Total :</h5>
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
            <b-card-body class="invoice-padding pt-0">
              <span class="font-weight-bold">Note: </span>
              <b-form-textarea v-model="invoiceData.note" class="mt-1" />
            </b-card-body>
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
						v-b-modal.modal-mail-sender
						@click="sendFactureEmail"
					>
						Envoyer
					</b-button> -->

          <!-- Button: DOwnload -->
          <!-- If page edit -->
          <b-button
            v-if="query === 'eDevis'"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="editInfoTreatments('devis')"
          >
            Sauvegader le devis
          </b-button>

          <!-- If page edit -->
          <b-button
            v-if="query === 'eInvoice'"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="editInfoTreatments('facture')"
          >
            Sauvegader la facture
          </b-button>

          <b-button
            v-if="query === 'invoice'"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            @click="PreviewFacture('facture')"
          >
            Previsualiser et envoyer
          </b-button>

          <!-- Button: DOwnload -->
          <!-- <b-button
						v-if="query === 'devis'"
						v-ripple.400="'rgba(255, 255, 255, 0.15)'"
						variant="primary"
						class="mb-75"
						block
						@click="PreviewFacture('devis')"
					>
						Previsualiser et envoyer
					</b-button> -->

          <!-- Button: Print -->
          <b-button
            v-if="query === 'invoice'"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            block
            @click="saveFacture('facture')"
          >
            Enregistrer
          </b-button>

          <!-- Button: Print -->
          <b-button
            v-if="query === 'devis'"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            block
            @click="saveFacture('devis')"
          >
            Enregistrer
          </b-button>
          <!-- Button: Print -->
          <b-button
            v-if="query === 'invoice' || query === 'eInvoice'"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            block
            to="/lists/facture"
          >
            Liste des factures
          </b-button>
          <b-button
            v-if="query === 'devis' || query === 'eDevis'"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            block
            to="/lists/devis"
          >
            Liste des devis
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <!-- ====== AJOUTER UN NOUVEAU CLIENT ======== -->
    <!-- select 2 demo -->
    <e-add-new-client :clientList="clientList" />
    <q-invoice-mail-sender :invoiceData="invoiceData" v-if="mailSender === true" />

    <!-- ====== AJOUTER UN NOUVEL ARTICLE ======== -->
    <!-- modal login-->
    <e-add-articles :categories="categories" :getArticles="getDataArticles" />
  </section>
</template>

<script>
import {
  ref,
  onUnmounted,
  reactive,
  onBeforeMount,
  computed,
} from "@vue/composition-api";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import store from "@/store";
import axios from "axios";
import URL from "@/views/pages/request";
import { VueTelInput } from "vue-tel-input";
import "animate.css";
import paymentRealTime from "@/utils/utilsInvoice/paymentRealTime";
import EAddArticles from "@/components/__partials/articles/eAddArticles.vue";
import EAddNewClient from "@/components/__partials/eAddNewClient.vue";
import QInvoiceMailSender from "@/components/invoiceDetails/mailSender/qInvoiceMailSender.vue";
import { forEach } from "postcss-rtl/lib/affected-props";

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
    EAddArticles,
    EAddNewClient,
    QInvoiceMailSender,
  },
  directives: {
    Ripple,
    "b-modal": VBModal,
    "b-toggle": VBToggle,
  },
  name: "FactureList",
  mixins: [heightTransition],
  async mounted() {
    document.title = "Facture";
    this.initTrHeight();

    /*****
     * @Entreprise : List de information de l'entreprise
     */
    await axios
      .get(URL.ENTREPRISE_INFO)
      .then((res) => {
        this.entrerpiseData = res.data[0].entreprise;
        this.entreprise_logo = res.data[0].logo_entreprise;
      })
      .catch((error) => {
        console.log(error);
      });

    /*****
     * @Clients : List de information du clients
     */
    await axios
      .get(URL.CLIENT_LIST)
      .then((res) => {
        this.clientList = res.data[0];
        this.clientList.reverse();
      })
      .catch((error) => {
        console.log(error);
      });

    /*****
     * @Articles : List de information du artices
     */
    this.getDataArticles();

    /*****
     * @Taxes : list des taxes
     */
    await axios
      .get(URL.TAXE_LIST)
      .then((res) => {
        this.taxesList = res.data;
        this.taxesList.reverse();
      })
      .catch((error) => {
        console.log(error);
      });

    /*****
     * @Category : list des category
     */
    await axios
      .get(URL.CATEGORIE_LIST)
      .then((response) => {
        this.categories = response.data;
        this.categories.reverse();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
  methods: {
    async getDataArticles() {
      await axios
        .get(URL.ARTICLE_LIST)
        .then((res) => {
          this.articlesList = res.data[0];
          this.articlesList.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    validateDate() {
      const date_creation = this.dateDefault;
      const date_fin = this.dueDate;
      if (date_creation > date_fin) {
        this.date_alert =
          "La date d'émission ne peut pas etre supérieur à la date d'écheance";
      } else {
        this.date_alert = null;
      }
    },
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = "hidden";
      this.invoiceData.items.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)));

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
        setTimeout(() => {
          this.$refs.form.style.overflow = null;
        }, 350);
      });
    },
    removeItem(index) {
      this.invoiceData.items.splice(index, 1);
      // this.invoiceData.totalTaxe.splice(index, 1)
      // this.invoiceData.taxes_id.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },
    // ***
    // FUNCTION TO UPLOAD LOGO
    // **
    chooseFile() {
      const input = document.querySelector("#input-file");
      input.click();
    },
    processFile(event) {
      this.choose = true;
      this.picture = event.target.files[0];
      if (event.target.files.length !== 0) {
        const picturePath = URL.createObjectURL(this.picture);
        const picture = document.querySelector("#logo-img");
        picture.src = picturePath;
      } else {
        const picture = document.querySelector("#logo-img");
        picture.src = "";
      }
    },
    deletePicture() {
      this.choose = false;
      this.picture = "";
      const picture = document.querySelector("#logo-img");
      picture.src = "";
    },
    // *****
    // ***
    // FUNCTION POUR AVOIR LE TOTAL DE TOUS LES ARTICLES AJOUTEES
    // ***
    sumArticles() {
      let price = "";

      for (let i = 0; i < this.invoiceData.items.length; i++) {
        price = this.invoiceData.items;
      }

      Array.prototype.sum = function (prop) {
        let total = 0;
        for (let i = 0, _len = this.length; i < _len; i++) {
          total += this[i][prop];
        }
        return parseFloat(total);
      };

      if (this.invoiceData.remise && this.invoiceData.taxe) {
        let totalWithRemise =
          price.sum("prix") - price.sum("prix") * (this.invoiceData.remise / 100);
        let num = parseFloat(totalWithRemise * (1 + this.invoiceData.taxe.valeur / 100));
        this.invoiceData.facturePrixTotal = num.toFixed(2);
        return num.toFixed(2);
      } else if (this.invoiceData.remise && !this.invoiceData.taxe) {
        let totalWithRemise =
          price.sum("prix") - price.sum("prix") * (this.invoiceData.remise / 100);
        let num = parseFloat(totalWithRemise);
        this.invoiceData.facturePrixTotal = num.toFixed(2);
        return num.toFixed(2);
      } else if (!this.invoiceData.remise && this.invoiceData.taxe) {
        let totalWithoutRemise = price.sum("prix");
        let num = parseFloat(
          totalWithoutRemise * (1 + this.invoiceData.taxe.valeur / 100)
        );
        this.invoiceData.facturePrixTotal = num.toFixed(2);
        return num.toFixed(2);
      } else {
        this.invoiceData.facturePrixTotal = price.sum("prix");
        return parseFloat(price.sum("prix"));
      }

      // return parseFloat(price.sum('prix'))
    },

    // ***
    // **
    // FAIRE LA SOMME DES PRODUITS SANS LES TAXES NI LA REMISE
    // **
    // ***
    getSousTotal(arr) {
      let price = "";

      for (let i = 0; i < arr.length; i++) {
        price = arr;
      }

      Array.prototype.sum = function (prop, top) {
        let total = 0;
        for (let i = 0, _len = this.length; i < _len; i++) {
          total += this[i][prop] * this[i][top];
        }
        return total;
      };

      this.invoiceData.facturePrixTotalHt = price.sum("cout", "qte");
      return price.sum("cout", "qte");
    },

    // Alerte quand facture enregistré avec succès
    confirmText(text, confirmButtonText, oklinks, cancelButtonText) {
      this.$swal({
        title: "Succès",
        text: text,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-primary ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.trTrimHeight(this.$refs.row[0].offsetHeight);
          this.factureClient = null;
          this.dateDefault = null;
          this.dueDate = null;
          this.invoiceData.client = null;
          this.invoiceData.items = [];
          this.invoiceData.taxes_id = [];
          this.invoiceData.articles_id = [];
          this.invoiceData.date_emission = null;
          this.invoiceData.dateDefault = null;
          this.invoiceData.nombre_article = 0;
          this.invoiceData.note = "Taper une note ici";
          this.invoiceData.facturePrixTotal = 0;
        } else {
          this.$router.push(oklinks);
        }
      });
    },
    // Alerte quand facture non enregistré
    errorText() {
      this.$swal({
        title: "Erreur",
        text: "oups, une erreur c'est produite, veillez rééssayer",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Rééssayer",
        cancelButtonText: "Annuler",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-primary ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.saveFacture();
        } else {
          this.$router.push(this.$route.path);
        }
      });
    },

    // ***
    // **
    // FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
    // **
    async saveFacture(type) {
      if (!this.dateDefault) {
        // shake alert quand le champ date d'émission n'est pas rempli
        this.$swal({
          title: "Ajouter une date d'émission",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.dueDate) {
        // shake alert quand le champ date d'échéance n'est pas rempli
        this.$swal({
          title: "Ajouter une date d'échéance",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.factureClient) {
        // shake alert quand le champ client n'est pas rempli
        this.$swal({
          title: "Ajouter un client",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.invoiceData.items[0]) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: "Ajouter un article",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.invoiceData.items[0].itemTitle) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: "Ajouter un article",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else {
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

        this.sendModel(
          config,
          false,
          type,
          URL.FACTURE_CREATE,
          `${
            type === "devis"
              ? "Votre devis à été creer avec succéss"
              : "Votre facture à été creer avec succéss"
          }`,
          `${type === "devis" ? "Nouveau devis" : "Nouvelle facture"}`,
          `${type === "devis" ? "/lists/devis" : "/lists/facture"}`,
          `${type === "devis" ? "Liste des devis" : "Liste des factures"}`
        );
      }
    },

    // ***
    // **
    // FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
    // **
    async editInfoTreatments(type) {
      if (!this.dateDefault) {
        // shake alert quand le champ date d'émission n'est pas rempli
        this.$swal({
          title: "Ajouter une date d'émission",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.dueDate) {
        // shake alert quand le champ date d'échéance n'est pas rempli
        this.$swal({
          title: "Ajouter une date d'échéance",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.factureClient) {
        // shake alert quand le champ client n'est pas rempli
        this.$swal({
          title: "Ajouter un client",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.invoiceData.items[0]) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: "Ajouter un article",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.invoiceData.items[0].itemTitle) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: "Ajouter un article",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else {
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

        const data = {
          id: this.invoiceData.id,
          client_id: this.factureClient.id,
          entreprise_id: this.factureClient.id,
          client: this.factureClient.id,
          date_emission: this.dateDefault,
          date_echeance: this.dueDate,
          entreprise: this.factureClient.id,
          items: this.invoiceData.items,
          vendeur: this.invoiceData.vendeur,
          description: this.invoiceData.note,
          total_ttc: this.invoiceData.facturePrixTotal,
          total_ht: this.invoiceData.facturePrixTotalHt,
          remise: this.invoiceData.remise,
          nombre_article: this.invoiceData.items.length,
          articles_id: this.invoiceData.articles_id,
          type_facture: type,
          etat: type === "devis" ? "draft" : "validate",
          libelle: this.invoiceData.libelle,
        };

        await axios
          .post(URL.FACTURE_UPDATE, data, config)
          .then((res) => {
            if (res.data) {
              this.confirmText(
                "Vos modifications ont été bien prise en compte",
                `${type === "devis" ? "Liste des devis" : "Liste des facture"}`,
                "/lists/d/devis",
                `${type === "devis" ? "Liste des devis" : "Liste des facture"}`
              );
              if (mail === true) {
                this.mailSender = true;
              }
            }
          })
          .catch((error) => {
            console.log("api error", error.messagae);
            this.errorText();
          });
      }
    },

    // ***
    // **
    // FUNTION POUR PREVISUALISER LA FACTURE
    // **
    async PreviewFacture(type) {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      if (!this.dateDefault) {
        // shake alert quand le champ date d'émission n'est pas rempli
        this.$swal({
          title: "Ajouter une date d'émission",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.dueDate) {
        // shake alert quand le champ date d'échéance n'est pas rempli
        this.$swal({
          title: "Ajouter une date d'échéance",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.factureClient) {
        // shake alert quand le champ client n'est pas rempli
        this.$swal({
          title: "Ajouter un client",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.invoiceData.items[0]) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: "Ajouter un article",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else if (!this.invoiceData.items[0].itemTitle) {
        // shake alert quand le champ article n'est pas rempli
        this.$swal({
          title: "Ajouter un article",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          buttonsStyling: false,
        });
      } else {
        if (this.invoiceData.libelle.length > 30) {
          this.errorInput.path = "libelle_invoice";
          this.errorInput.message = "l'object 30 charatere maximun sont requis";
        } else if (this.invoiceData.remise === null && this.invoiceData.taxe === null) {
          const data = {
            client: this.factureClient.id,
            date_emission: this.dateDefault,
            date_echeance: this.dueDate,
            entreprise: this.factureClient.id,
            items: this.invoiceData.items,
            vendeur: this.invoiceData.vendeur,
            description: this.invoiceData.note,
            total_ttc: this.invoiceData.facturePrixTotal,
            total_ht: this.invoiceData.facturePrixTotalHt,
            nombre_article: this.invoiceData.items.length,
            articles_id: this.invoiceData.articles_id,
            type_facture: type,
            etat: "draft",
            libelle: this.invoiceData.libelle,
          };

          console.log(data, this.articlesList[0].id, this.invoiceData.articles_id[0]);

          await axios
            .post(URL.FACTURE_CREATE, data, config)
            .then(({ data }) => {
              console.log(data);
              const invoiceData__preview = data.facture;
              this.invoiceData.id = invoiceData__preview.id;
              this.invoiceData.code = invoiceData__preview.code;
              this.invoiceData.client = this.factureClient;
              this.invoiceData.date_emission = this.dateDefault;
              this.invoiceData.date_echeance = this.dueDate;
              this.invoiceData.entreprise = this.entrerpiseData;
              this.invoiceData.logoEntreprise = this.picture;
              this.invoiceData.libelle = invoiceData__preview.libelle;
              this.invoiceData.total_ttc = this.invoiceData.facturePrixTotal;
              this.invoiceData.articles = this.articlesList.filter((el) => {
                return el.id === this.invoiceData.articles_id[0];
              });
              this.invoiceData.articles[0]["pivot"] = {
                prix_vente: data.facture_created[0].articles[0].pivot.prix_vente,
                prix: data.facture_created[0].articles[0].pivot.prix,
                quantite: data.facture_created[0].articles[0].pivot.quantite,
              };
              this.invoiceData.etat = "draft";
              this.invoiceData.versements =
                this.invoiceData.versements === undefined
                  ? []
                  : this.invoiceData.versements;
              invoiceData__preview.versements = this.invoiceData.versements;

              this.invoiceData.amountPaid = paymentRealTime.zip__amountPaid(
                invoiceData__preview
              );
              this.invoiceData.status = invoiceData__preview.status;
              this.invoiceData.amountToPaid = paymentRealTime.zip__amountToPaid(
                invoiceData__preview
              );

              if (data) {
                console.log(this.invoiceData);
                localStorage.setItem("facture", JSON.stringify(this.invoiceData));
                type === "facture"
                  ? this.$router.push("/facture/view")
                  : this.$router.push("/devis/view");
              }
            })
            .catch((error) => {
              console.log("api error", error.messagae);
              this.$swal({
                title: "Erreur",
                text: "Oups une erreur c'est produite, veillez rééssayer",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Rééssayer",
                cancelButtonText: "Annuler",
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-primary ml-1",
                },
                buttonsStyling: false,
              });
            });
        } else if (this.invoiceData.remise !== null && this.invoiceData.taxe === null) {
          const data = {
            client: this.factureClient.id,
            date_emission: this.dateDefault,
            date_echeance: this.dueDate,
            entreprise: this.factureClient.id,
            items: this.invoiceData.items,
            vendeur: this.invoiceData.vendeur,
            description: this.invoiceData.note,
            total_ttc: this.invoiceData.facturePrixTotal,
            total_ht: this.invoiceData.facturePrixTotalHt,
            remise: this.invoiceData.remise,
            nombre_article: this.invoiceData.items.length,
            articles_id: this.invoiceData.articles_id,
            type_facture: "facture",
            etat: "draft",
            libelle: this.invoiceData.libelle,
          };

          await axios
            .post(URL.FACTURE_CREATE, data, config)
            .then(({ data }) => {
              const invoiceData__preview = data.facture;
              this.invoiceData.id = invoiceData__preview.id;
              this.invoiceData.code = invoiceData__preview.code;
              this.invoiceData.client = this.factureClient;
              this.invoiceData.date_emission = this.dateDefault;
              this.invoiceData.date_echeance = this.dueDate;
              this.invoiceData.entreprise = this.entrerpiseData;
              this.invoiceData.logoEntreprise = this.picture;
              this.invoiceData.libelle = invoiceData__preview.libelle;
              this.invoiceData.total_ttc = this.invoiceData.facturePrixTotal;

              this.invoiceData.articles = this.articlesList.filter((el) => {
                return el.id === this.invoiceData.articles_id[0];
              });
              this.invoiceData.status = invoiceData__preview.status;
              this.invoiceData.articles[0]["pivot"] = {
                prix_vente: data.facture_created[0].articles[0].pivot.prix_vente,
                prix: data.facture_created[0].articles[0].pivot.prix,
                quantite: data.facture_created[0].articles[0].pivot.quantite,
              };
              this.invoiceData.etat = "draft";
              this.invoiceData.versements =
                this.invoiceData.versements === undefined
                  ? []
                  : this.invoiceData.versements;
              invoiceData__preview.versements = this.invoiceData.versements;

              this.invoiceData.amountPaid = paymentRealTime.zip__amountPaid(
                invoiceData__preview
              );
              this.invoiceData.amountToPaid = paymentRealTime.zip__amountToPaid(
                invoiceData__preview
              );

              if (data) {
                localStorage.setItem("facture", JSON.stringify(this.invoiceData));
                type === "facture"
                  ? this.$router.push("/facture/view")
                  : this.$router.push("/devis/view");
              }
            })
            .catch((error) => {
              console.log("api error", error.messagae);
              this.$swal({
                title: "Erreur",
                text: "Votre facture n'est pas été mise en broullion, veillez rééssayer",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Rééssayer",
                cancelButtonText: "Annuler",
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-primary ml-1",
                },
                buttonsStyling: false,
              });
            });
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
            type_facture: "facture",
            etat: "draft",
            libelle: this.invoiceData.libelle,
          };

          await axios
            .post(URL.FACTURE_CREATE, data, config)
            .then(({ data }) => {
              const invoiceData__preview = data.facture;
              this.invoiceData.id = invoiceData__preview.id;
              this.invoiceData.code = invoiceData__preview.code;
              this.invoiceData.client = this.factureClient;
              this.invoiceData.date_emission = this.dateDefault;
              this.invoiceData.date_echeance = this.dueDate;
              this.invoiceData.entreprise = this.entrerpiseData;
              this.invoiceData.logoEntreprise = this.picture;
              this.invoiceData.libelle = invoiceData__preview.libelle;
              this.invoiceData.versements =
                this.invoiceData.versements === undefined
                  ? []
                  : this.invoiceData.versements;
              this.invoiceData.status = invoiceData__preview.status;
              invoiceData__preview.versements = this.invoiceData.versements;
              this.invoiceData.total_ttc = this.invoiceData.facturePrixTotal;
              this.invoiceData.articles = this.articlesList.filter((el) => {
                return el.id === this.invoiceData.articles_id[0];
              });
              this.invoiceData.articles[0]["pivot"] = {
                prix_vente: data.facture_created[0].articles[0].pivot.prix_vente,
                prix: data.facture_created[0].articles[0].pivot.prix,
                quantite: data.facture_created[0].articles[0].pivot.quantite,
              };
              this.invoiceData.etat = "draft";
              this.invoiceData.versements =
                this.invoiceData.versements === undefined
                  ? []
                  : this.invoiceData.versements;
              invoiceData__preview.versements = this.invoiceData.versements;

              this.invoiceData.amountPaid = paymentRealTime.zip__amountPaid(
                invoiceData__preview
              );
              this.invoiceData.amountToPaid = paymentRealTime.zip__amountToPaid(
                invoiceData__preview
              );

              if (data) {
                localStorage.setItem("facture", JSON.stringify(this.invoiceData));
                type === "facture"
                  ? this.$router.push("/facture/view")
                  : this.$router.push("/devis/view");
              }
            })
            .catch((error) => {
              console.log("api error", error.messagae);
              this.$swal({
                title: "Erreur",
                text: "Votre facture n'est pas été mise en broullion, veillez rééssayer",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Rééssayer",
                cancelButtonText: "Annuler",
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-primary ml-1",
                },
                buttonsStyling: false,
              });
            });
        } else {
          const data = {
            client: this.factureClient.id,
            date_emission: this.dateDefault,
            date_echeance: this.dueDate,
            entreprise: this.factureClient.id,
            items: this.invoiceData.items,
            vendeur: this.invoiceData.vendeur,
            description: this.invoiceData.note,
            total_ttc: this.invoiceData.facturePrixTotal,
            total_ht: this.invoiceData.facturePrixTotalHt,
            total_taxe: this.invoiceData.taxe.valeur,
            remise: this.invoiceData.remise,
            nombre_article: this.invoiceData.items.length,
            articles_id: this.invoiceData.articles_id,
            taxes_id: this.invoiceData.taxe.id,
            type_facture: "facture",
            etat: "draft",
            libelle: this.invoiceData.libelle,
          };
          await axios
            .post(URL.FACTURE_CREATE, data, config)
            .then(({ data }) => {
              const invoiceData__preview = data.facture;
              this.invoiceData.id = invoiceData__preview.id;
              this.invoiceData.code = invoiceData__preview.code;
              this.invoiceData.client = this.factureClient;
              this.invoiceData.date_emission = this.dateDefault;
              this.invoiceData.date_echeance = this.dueDate;
              this.invoiceData.entreprise = this.entrerpiseData;
              this.invoiceData.logoEntreprise = this.picture;
              this.invoiceData.libelle = invoiceData__preview.libelle;
              this.invoiceData.versements =
                this.invoiceData.versements === undefined
                  ? []
                  : this.invoiceData.versements;
              invoiceData__preview.versements = this.invoiceData.versements;
              this.invoiceData.total_ttc = this.invoiceData.facturePrixTotal;
              this.invoiceData.articles = this.articlesList.filter((el) => {
                return el.id === this.invoiceData.articles_id[0];
              });
              this.invoiceData.articles[0]["pivot"] = {
                prix_vente: data.facture_created[0].articles[0].pivot.prix_vente,
                prix: data.facture_created[0].articles[0].pivot.prix,
                quantite: data.facture_created[0].articles[0].pivot.quantite,
              };
              this.invoiceData.status = invoiceData__preview.status;
              this.invoiceData.etat = "draft";
              this.invoiceData.versements =
                this.invoiceData.versements === undefined
                  ? []
                  : this.invoiceData.versements;
              invoiceData__preview.versements = this.invoiceData.versements;

              this.invoiceData.amountPaid = paymentRealTime.zip__amountPaid(
                invoiceData__preview
              );
              this.invoiceData.amountToPaid = paymentRealTime.zip__amountToPaid(
                invoiceData__preview
              );

              if (data) {
                localStorage.setItem("facture", JSON.stringify(this.invoiceData));
                type === "facture"
                  ? this.$router.push("/facture/view")
                  : this.$router.push("/devis/view");
              }
            })
            .catch((error) => {
              console.log("api error", error.messagae);
              this.$swal({
                title: "Erreur",
                text: "Votre facture n'est pas été mise en broullion, veillez rééssayer",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Rééssayer",
                cancelButtonText: "Annuler",
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-primary ml-1",
                },
                buttonsStyling: false,
              });
            });
        }
      }
    },

    // *****
    // ****
    // FUNCTION POUR AJOUT DE CLIENT
    // ****
    // *****

    // Alert When added new article
    showAlert() {
      this.$swal({
        title: "Article ajouté avec succès",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    },

    /*******
     * *
     * *
     * *
     * *
     * *
     * *
     * *
     * *
     * *
     *
     */
    async sendModel(config, mail, type, url, text, textok, oklink, textno) {
      if (this.invoiceData.libelle.length > 30) {
        this.errorInput.path = "libelle_invoice";
        this.errorInput.message = "l'object 30 charatere maximun sont requis";
      } else if (this.invoiceData.remise === null && this.invoiceData.taxe === null) {
        const data = {
          id: this.invoiceData.id,
          client_id: this.factureClient.id,
          entreprise_id: this.factureClient.id,
          client: this.factureClient.id,
          date_emission: this.dateDefault,
          date_echeance: this.dueDate,
          entreprise: this.factureClient.id,
          items: this.invoiceData.items,
          vendeur: this.invoiceData.vendeur,
          description: this.invoiceData.note,
          total_ttc: this.invoiceData.facturePrixTotal,
          total_ht: this.invoiceData.facturePrixTotalHt,
          nombre_article: this.invoiceData.items.length,
          articles_id: this.invoiceData.articles_id,
          type_facture: type,
          etat: type === "devis" ? "draft" : "validate",
          libelle: this.invoiceData.libelle,
        };

        await axios
          .post(url, data, config)
          .then((res) => {
            if (res.data) {
              this.confirmText(text, textok, oklink, textno);
              if (mail === true) {
                this.mailSender = true;
              }
            }
          })
          .catch((error) => {
            console.log("api error", error.messagae);
            this.errorText();
          });
      } else if (this.invoiceData.remise !== null && this.invoiceData.taxe === null) {
        const data = {
          id: this.invoiceData.id,
          client_id: this.factureClient.id,
          entreprise_id: this.factureClient.id,
          client: this.factureClient.id,
          date_emission: this.dateDefault,
          date_echeance: this.dueDate,
          entreprise: this.factureClient.id,
          items: this.invoiceData.items,
          vendeur: this.invoiceData.vendeur,
          description: this.invoiceData.note,
          total_ttc: this.invoiceData.facturePrixTotal,
          total_ht: this.invoiceData.facturePrixTotalHt,
          remise: this.invoiceData.remise,
          nombre_article: this.invoiceData.items.length,
          articles_id: this.invoiceData.articles_id,
          type_facture: type,
          etat: type === "devis" ? "draft" : "validate",
          libelle: this.invoiceData.libelle,
        };

        await axios
          .post(url, data, config)
          .then((res) => {
            if (res.data) {
              this.confirmText(text, textok, oklink, textno);
              if (mail === true) {
                this.mailSender = true;
              }
            }
          })
          .catch((error) => {
            console.log("api error", error.messagae);
            this.errorText();
          });
      } else if (this.invoiceData.remise === null && this.invoiceData.taxe !== null) {
        const data = {
          id: this.invoiceData.id,
          client_id: this.factureClient.id,
          entreprise_id: this.factureClient.id,
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
          total_taxe: this.invoiceData.taxe,
          nombre_article: this.invoiceData.items.length,
          articles_id: this.invoiceData.articles_id,
          taxes_id: this.invoiceData.taxe.id,
          type_facture: type,
          etat: type === "devis" ? "draft" : "validate",
          libelle: this.invoiceData.libelle,
        };

        await axios
          .post(url, data, config)
          .then((res) => {
            if (res.data) {
              this.confirmText(text, textok, oklink, textno);
              if (mail === true) {
                this.mailSender = true;
              }
            }
          })
          .catch((error) => {
            console.log("api error", error.messagae);
            this.errorText();
          });
      } else {
        const data = {
          id: this.invoiceData.id,
          client_id: this.factureClient.id,
          entreprise_id: this.factureClient.id,
          client: this.factureClient.id,
          date_emission: this.dateDefault,
          date_echeance: this.dueDate,
          entreprise: this.factureClient.id,
          items: this.invoiceData.items,
          vendeur: this.invoiceData.vendeur,
          description: this.invoiceData.note,
          total_ttc: this.invoiceData.facturePrixTotal,
          total_ht: this.invoiceData.facturePrixTotalHt,
          total_taxe: this.invoiceData.taxe.valeur,
          remise: this.invoiceData.remise,
          nombre_article: this.invoiceData.items.length,
          articles_id: this.invoiceData.articles_id,
          taxes_id: this.invoiceData.taxe.id,
          type_facture: type,
          etat: type === "devis" ? "draft" : "validate",
          libelle: this.invoiceData.libelle,
        };
        await axios
          .post(URL.FACTURE_CREATE, data, config)
          .then((res) => {
            if (res.data) {
              this.confirmText(text, textok, oklink, textno);
              if (mail === true) {
                this.mailSender = true;
              }
            }
          })
          .catch((error) => {
            console.log("api error", error.messagae);
            this.errorText();
          });
      }
    },
  },
  setup(props, { root }) {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const clients = ref([]);
    const errorInput = reactive({
      path: "",
      message: "",
    });

    const itemFormBlankItem = {
      nom: null,
      cout: 0,
      taxe: 0,
      qte: 1,
      prix: 0,
    };

    const invoiceData = ref({
      id: "0000",
      client: null,
      entreprise: null,
      logoEntreprise: null,
      date_emission: null,
      date_echeance: null,
      status: null,

      // ? Set single Item in form for adding data
      items: [],
      articles_id: [],
      articles: [],
      taxe: null,
      remise: null,
      taxes_id: null,
      // totalTaxe: [],
      nombre_article: 0,

      vendeur: "",
      facturePrixTotal: 0,
      facturePrixTotalHt: 0,
      factureTotalTaxe: 0,
      note: "50% à la livraison, 50% à la commande.\nNous vous remercions.",
      paiement: null,
      libelle: "",
    });

    // LISTE DES INFOS DE L'ENTREPRISE
    const entrerpiseData = ref("");
    const entreprise_logo = ref("");

    const updateItemForm = (index, val) => {
      const { prix_vente, id } = val;
      invoiceData.value.items[index].cout = prix_vente;
      invoiceData.value.items[index].qte = 1;
      invoiceData.value.articles_id[index] = id;
    };

    // ***
    // RECUPERE LA TAXE ET LA MODIFIE
    // **
    const updateItemTaxe = (index, val) => {
      const { valeur, id } = val;
      invoiceData.value.items[index].taxe = valeur;
      invoiceData.value.totalTaxe[index] = valeur;
      invoiceData.value.taxes_id[index] = valeur;
    };

    // *****
    // ***
    // VARIABLES DECLAREES PAR MOI - AIME
    // ***
    // *****
    // LISTE DES ARTICLES
    const articlesList = ref([]);
    // LISTE DES TAXES
    const taxesList = ref([]);
    // VARIABLES POUR UPLOAD LE LOGO
    const picture = ref("");
    const choose = ref("");
    // VARIABLES POUR LA LISTE DES CLIENTS
    const clientList = ref([]);
    const factureClient = ref(null);
    // VARIABLES POUR LES DATES
    const dateDefault = ref(0);
    const dueDate = ref(0);
    const mailSender = ref(false);
    // VARIABLES POUR LES ARTICLES
    const articleBlank = ref({
      nom: null,
      cout: 0,
      taxe: 0,
      qte: 1,
      prix: 0,
    });

    const invoiceTaxe = ref(null);
    const invoiceRemise = ref(null);

    const date_alert = ref(null);

    const saved_facture = ref(null);

    const clientUpOption = ref([{ title: "Particulier" }, { title: "Entreprise" }]);

    const query = computed(() => {
      let link = root.$route.path;
      link = link.split("/")[2];

      if (link.toLowerCase() == "facture") {
        return "invoice";
      } else if (link.toLowerCase() == "devis") {
        return "devis";
      } else if (link.toLowerCase() == "devis" && root.$route.path() == "edit/devis") {
        const getData = JSON.parse(localStorage.getItem("edit_facture"));
        factureClient.value = getData.client;
        dateDefault.value = getData.date_emission;
        dueDate.value = getData.date_echeance;
        getData.taxe = getData.taxes.length === 0 ? null : getData.taxes;
        getData.articles_id = [];
        getData.articles.forEach((el, index) => {
          getData.articles_id.push(el.id);
        });
        invoiceData.value = getData;
        return "eDevis";
      } else {
        location.assign("/error-404");
      }
    });

    // onBeforeMount(() => {
    // 	// Create Invoice and Devis
    // 	if (
    // 		root.$route.params.type === 'facture' &&
    // 		root.$route.path === '/create/f/facture'
    // 	) {
    // 		query.value = 'invoice';
    // 	} else if (
    // 		root.$route.params.type === 'devis' &&
    // 		root.$route.path === '/create/d/devis'
    // 	) {
    // 		query.value = 'devis';
    // 	}
    // 	// Edit Invoice and Devis
    // 	else if (
    // 		root.$route.params.type === 'devis' &&
    // 		root.$route.path === '/edit/d/devis'
    // 	) {
    // 		query.value = 'eDevis';
    // 		const getData = JSON.parse(localStorage.getItem('edit_facture'));
    // 		factureClient.value = getData.client;
    // 		dateDefault.value = getData.date_emission;
    // 		dueDate.value = getData.date_echeance;
    // 		getData.taxe = getData.taxes.length === 0 ? null : getData.taxes;
    // 		getData.articles_id = [];
    // 		getData.articles.forEach((el, index) => {
    // 			getData.articles_id.push(el.id);
    // 		});
    // 		invoiceData.value = getData;
    // 	} else if (
    // 		root.$route.params.type === 'facture' &&
    // 		root.$route.path === '/edit/f/facture'
    // 	) {
    // 		query.value = 'eInvoice';
    // 		const getData = JSON.parse(localStorage.getItem('edit_facture'));
    // 		factureClient.value = getData.client;
    // 		dateDefault.value = getData.date_emission;
    // 		dueDate.value = getData.date_echeance;
    // 		getData.taxe = getData.taxes.length === 0 ? null : getData.taxes;
    // 		getData.articles_id = [];
    // 		getData.articles.forEach((el, index) => {
    // 			getData.articles_id.push(el.id);
    // 		});
    // 		invoiceData.value = getData;
    // 	}
    // 	// In case of error
    // 	else {
    // 		location.assign('/error-404');
    // 	}
    // });

    // FUNCTION TO CONVERT NUMBER INTO CURRENCY
    const formatter = new Intl.NumberFormat("ci-CI", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 2,
    });

    const contactEntier = (e) => {
      newUser.value.contact = e;
    };

    const changer = (e) => {
      if (e.name) {
        newUser.value.contact.country.name = e.name;
      }
    };

    const processFile2 = (event) => {
      newArticle.value.file = event.target.files[0];
      if (event.target.files.length !== 0) {
      }
    };

    // NEW USER DETAIL
    const newUser = ref({
      nom: "",
      prenoms: "",
      email: "",
      contact: "",
      localisation: "",
      statut: "",
    });

    // DATA FOR NEW USER CREATION
    const phone = ref("");
    const indicatifFinal = ref("");
    const status_id = ref(null);

    // NEW ARTICLE DETAILS
    const newArticle = ref({
      libelle: "",
      categorie: "",
      type: "",
      poids: "",
      unite: "",
      prix_achat: "",
      prix_vente: "",
      movie: "",
      file: null,
      description: "",
    });

    // DATA FOR NEW ARTICLE CREATION
    const optionUnite = ref(["Kg", "Unité", "Litre"]);
    const optionType = ref(["Service", "Produit"]);
    const categories = ref([]);

    return {
      invoiceData,
      clients,
      updateItemForm,
      itemFormBlankItem,
      invoiceTaxe,
      invoiceRemise,
      entreprise_logo,
      errorInput,
      mailSender,
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
      query,
    };
  },
};
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

.vti__dropdown-list {
  z-index: 1000;
}

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
[dir] button::-moz-focus-inner,
[dir] [type="button"]::-moz-focus-inner,
[dir] [type="reset"]::-moz-focus-inner,
[dir] [type="submit"]::-moz-focus-inner {
  padding-left: 0;
  padding-right: 0;
  border-style: none;
}
</style>
