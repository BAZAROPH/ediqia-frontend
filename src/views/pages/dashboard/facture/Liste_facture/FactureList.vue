<template>
  <!-- Table Container Card -->
  <section>
    <div v-if="query === true">
      <b-card no-body>
        <b-tabs
          v-model="tabIndex"
          pills
          card
          class="flex justify-end justify-content-md-between"
        >
          <div class="mx-1">
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
                  v-model="state.perPage"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="perPageOptions"
                  :clearable="false"
                  class="per-page-selector d-inline-block ml-50 mr-1"
                />
                <b-button variant="primary" :to="{ name: 'FactureAdd' }">
                  <feather-icon icon="PlusIcon" class="mx-auto" />
                  Nouvelle facture
                </b-button>
              </b-col>

              <!-- Search -->
              <b-col cols="12" md="6">
                <div class="d-flex align-items-center justify-content-end">
                  <b-form-input
                    v-model="state.filter"
                    class="d-inline-block mr-1"
                    placeholder="Rechercher par : client, montant, numero de facture"
                  />
                </div>
              </b-col>
            </b-row>
          </div>

          <b-tab
            :title-link-class="linkClass(0)"
            :title="'Regler (' + invoiceData__finish.length + ')'"
          >
            <b-card-text>
              <!-- Loader -->
              <q-loader-table
                :success="state.success__finish"
                :empty="state.empty__finish"
                :warring="state.warring"
              />

              <b-table
                responsive
                primary-key="line"
                show-empty
                :items="invoiceData__finish"
                :currentPage="state.currentPageFinish"
                :perPage="state.perPage"
                :fields="tableColumns"
                :filter="state.filter"
                v-if="state.success__finish === true"
              >
                <template #head(invoiceStatus)>
                  <feather-icon icon="TrendingUpIcon" class="mx-auto" />
                </template>

                <template #cell(etat)="data">
                  <b-badge v-if="data.item.state === 'apayer'" variant="danger">
                    A payer
                  </b-badge>
                  <b-badge v-if="data.item.state === 'partiel'" variant="warning">
                    Partiel
                  </b-badge>
                  <b-badge v-if="data.item.state === 'payer'" variant="success">
                    Payer
                  </b-badge>
                </template>

                <!-- Column: Client -->
                <template #cell(client)="data">
                  <b-media vertical-align="center">
                    <template #aside>
                      <b-avatar
                        size="32"
                        :src="
                          data.item.client === null
                            ? ''
                            : data.item.client.profile_photo_url
                        "
                      />
                    </template>
                    <span
                      class="font-weight-bold text-nowrap d-flex align-content-center"
                    >
                      {{
                        data.item.client === null
                          ? "none"
                          : data.item.client.nom | subtext
                      }}
                    </span>
                    <small class="text-muted">{{ data.item.email }}</small>
                  </b-media>
                </template>

                <!-- Column: Montant total -->
                <template #cell(total_ttc)="data">
                  <span class="text-nowrap text-info">
                    {{ formatter.format(data.item.total_ttc) }}
                  </span>
                </template>

                <!-- Column: Payé -->
                <template #cell(paye)="data">
                  <span class="text-nowrap text-success">
                    {{ formatter.format(data.item.amountPaid) }}
                  </span>
                </template>

                <!-- Column: Impayé -->
                <template #cell(impaye)="data">
                  <span class="text-nowrap text-danger font-weight-bold">
                    {{ formatter.format(data.item.amountToPaid) }}
                  </span>
                  <!-- <span
					v-if="Number(data.item.somme_paye) === data.item.total_ttc"
					class="text-nowrap"
				>
					<b-button variant="success" size="sm" pill>
						Réglé
					</b-button>
				</span> -->
                </template>

                <!-- Column: Issued Date -->
                <template #cell(date_echeance)="data">
                  <span class="text-nowrap">
                    {{ format_date(data.value) }}
                  </span>
                </template>

                <!-- Column: Actions -->
                <template #cell(actions)="data">
                  <div class="text-nowrap">
                    <feather-icon
                      v-b-modal.modal-mail-sender
                      :id="`invoice-row-${data.item.id}-send-icon`"
                      icon="SendIcon"
                      class="cursor-pointer"
                      size="16"
                      @click="colletDataInvoiceToSendMail(data.item)"
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
                      @click="infoTreatments(data.item.id, 'view')"
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
                      <b-dropdown-item @click="invoiceDestroy(data.item.id)">
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50"> Supprimer</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </template>
              </b-table>

              <!-- Paginator -->
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
                      v-model="state.currentPageFinish"
                      :total-rows="invoiceData__finish.length"
                      :per-page="state.perPage"
                      first-number
                      last-number
                      class="mb-0 mt-1 mt-sm-0"
                      prev-class="prev-item"
                      next-class="next-item"
                      align="right"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </b-col>
                </b-row>
              </div> </b-card-text
          ></b-tab>
          <b-tab
            :title="'Enregistré (' + invoiceData__validate.length + ')'"
            :title-link-class="linkClass(1)"
          >
            <b-card-text>
              <!-- Loader -->
              <q-loader-table
                :success="state.success_validate"
                :empty="state.empty_validate"
                :warring="state.warring"
              />

              <b-table
                responsive
                primary-key="line"
                show-empty
                :items="invoiceData__validate"
                :currentPage="state.currentPageValidate"
                :perPage="state.perPage"
                :fields="tableColumns"
                :filter="state.filter"
                v-if="state.success_validate === true"
              >
                <template #head(invoiceStatus)>
                  <feather-icon icon="TrendingUpIcon" class="mx-auto" />
                </template>

                <template #cell(etat)="data">
                  <b-badge v-if="data.item.state === 'apayer'" variant="danger">
                    A payer
                  </b-badge>
                  <b-badge v-if="data.item.state === 'partiel'" variant="warning">
                    Partiel
                  </b-badge>
                  <b-badge v-if="data.item.state === 'payer'" variant="success">
                    Payer
                  </b-badge>
                </template>

                <!-- Column: Client -->
                <template #cell(client)="data">
                  <b-media vertical-align="center">
                    <template #aside>
                      <b-avatar
                        size="32"
                        :src="
                          data.item.client === null
                            ? ''
                            : data.item.client.profile_photo_url
                        "
                      />
                    </template>
                    <span
                      class="font-weight-bold text-nowrap d-flex justify-content-start align-content-center"
                    >
                      {{
                        data.item.client === null
                          ? "none"
                          : data.item.client.nom | subtext
                      }}
                    </span>
                    <small class="text-muted">{{ data.item.email }}</small>
                  </b-media>
                </template>

                <!-- Column: Montant total -->
                <template #cell(total_ttc)="data">
                  <span class="text-nowrap text-info">
                    {{ formatter.format(data.item.total_ttc) }}
                  </span>
                </template>

                <!-- Column: Payé -->
                <template #cell(paye)="data">
                  <span class="text-nowrap text-success">
                    {{ formatter.format(data.item.amountPaid) }}
                  </span>
                </template>

                <!-- Column: Impayé -->
                <template #cell(impaye)="data">
                  <span class="text-nowrap text-danger font-weight-bold">
                    {{ formatter.format(data.item.amountToPaid) }}
                  </span>
                  <!-- <span
					v-if="Number(data.item.somme_paye) === data.item.total_ttc"
					class="text-nowrap"
				>
					<b-button variant="success" size="sm" pill>
						Réglé
					</b-button>
				</span> -->
                </template>

                <!-- Column: Issued Date -->
                <template #cell(date_echeance)="data">
                  <span class="text-nowrap">
                    {{ format_date(data.value) }}
                  </span>
                </template>

                <!-- Column: Actions -->
                <template #cell(actions)="data">
                  <div class="text-nowrap">
                    <feather-icon
                      v-b-modal.modal-mail-sender
                      :id="`invoice-row-${data.item.id}-send-icon`"
                      icon="SendIcon"
                      class="cursor-pointer"
                      size="16"
                      @click="colletDataInvoiceToSendMail(data.item)"
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
                      @click="infoTreatments(data.item.id, 'view')"
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
                      <b-dropdown-item
                        @click="collectDataToBillPayments(data.item)"
                        v-if="
                          data.item.amountToPaid && Number(data.item.amountToPaid) !== 0
                        "
                        v-b-modal.modal-billPayment-add
                      >
                        <feather-icon icon="ShoppingBagIcon" />
                        <span class="align-middle ml-50"> Régler</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </template>
              </b-table>

              <!-- Paginator -->
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
                      v-model="state.currentPageValidate"
                      :total-rows="invoiceData__validate.length"
                      :per-page="state.perPage"
                      first-number
                      last-number
                      class="mb-0 mt-1 mt-sm-0"
                      prev-class="prev-item"
                      next-class="next-item"
                      align="right"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </b-col>
                </b-row>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            :title="'Broullon (' + invoiceData__draft.length + ')'"
            :title-link-class="linkClass(2)"
          >
            <b-card-text>
              <!-- Loader -->
              <q-loader-table
                :success="state.success_draft"
                :empty="state.empty_draft"
                :warring="state.warring"
              />

              <b-table
                responsive
                primary-key="line"
                show-empty
                :items="invoiceData__draft"
                :currentPage="state.currentPageDraft"
                :perPage="state.perPage"
                :fields="tableColumns"
                :filter="state.filter"
                v-if="state.success_draft === true"
              >
                <template #head(invoiceStatus)>
                  <feather-icon icon="TrendingUpIcon" class="mx-auto" />
                </template>

                <template #cell(etat)="data">
                  <b-badge v-if="data.item.state === 'apayer'" variant="danger">
                    A payer
                  </b-badge>
                  <b-badge v-if="data.item.state === 'partiel'" variant="warning">
                    Partiel
                  </b-badge>
                  <b-badge v-if="data.item.state === 'payer'" variant="success">
                    Payer
                  </b-badge>
                </template>

                <!-- Column: Client -->
                <template #cell(client)="data">
                  <b-media vertical-align="center">
                    <template #aside>
                      <b-avatar
                        size="32"
                        :src="
                          data.item.client === null
                            ? ''
                            : data.item.client.profile_photo_url
                        "
                      />
                    </template>
                    <span
                      class="font-weight-bold text-nowrap d-flex align-content-center"
                    >
                      {{
                        data.item.client === null
                          ? "none"
                          : data.item.client.nom | subtext
                      }}
                    </span>
                    <small class="text-muted">{{ data.item.email }}</small>
                  </b-media>
                </template>

                <!-- Column: Montant total -->
                <template #cell(total_ttc)="data">
                  <span class="text-nowrap text-info">
                    {{ formatter.format(data.item.total_ttc) }}
                  </span>
                </template>

                <!-- Column: Payé -->
                <template #cell(paye)="data">
                  <span class="text-nowrap text-success">
                    {{ formatter.format(data.item.amountPaid) }}
                  </span>
                </template>

                <!-- Column: Impayé -->
                <template #cell(impaye)="data">
                  <span class="text-nowrap text-danger font-weight-bold">
                    {{ formatter.format(data.item.amountToPaid) }}
                  </span>
                  <!-- <span
					v-if="Number(data.item.somme_paye) === data.item.total_ttc"
					class="text-nowrap"
				>
					<b-button variant="success" size="sm" pill>
						Réglé
					</b-button>
				</span> -->
                </template>

                <!-- Column: Issued Date -->
                <template #cell(date_echeance)="data">
                  <span class="text-nowrap">
                    {{ format_date(data.value) }}
                  </span>
                </template>

                <!-- Column: Actions -->
                <template #cell(actions)="data">
                  <div class="text-nowrap">
                    <feather-icon
                      icon="CheckIcon"
                      size="16"
                      class="cursor-pointer"
                      :id="`invoice-row-${data.item.id}-etat-icon`"
                      @click="etatInvoiceFunctions(data.item.id)"
                    />

                    <b-tooltip
                      title="validé la facture"
                      class="cursor-pointer"
                      :target="`invoice-row-${data.item.id}-etat-icon`"
                    />

                    <feather-icon
                      :id="`invoice-row-${data.item.id}-preview-icon`"
                      icon="EyeIcon"
                      size="16"
                      class="mx-1 cursor-pointer"
                      @click="infoTreatments(data.item.id, 'view')"
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

                      <b-dropdown-item @click="invoiceDestroy(data.item.id)">
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50"> Supprimer</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </template>
              </b-table>

              <!-- Paginator -->
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
                      v-model="state.currentPageDraft"
                      :total-rows="invoiceData__draft.length"
                      :per-page="state.perPage"
                      first-number
                      last-number
                      class="mb-0 mt-1 mt-sm-0"
                      prev-class="prev-item"
                      next-class="next-item"
                      align="right"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </b-col>
                </b-row>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

    <!-- 	 
		-
		-
		-
		-
		-
		-
		-
		-
		-
		-	  			 
		 -->

    <div class="" v-if="query === false">
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
              v-model="state.perPageDevis"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            />
            <b-button variant="primary" :to="{ name: 'DevisAdd' }">
              <feather-icon icon="PlusIcon" class="mx-auto" />
              Nouveau devis
            </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="state.filtreDevis"
                class="d-inline-block mr-1"
                placeholder="Rechercher par nom de client, prix, date..."
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <b-card-text>
        <!-- Loader -->
        <q-loader-table
          :success="state.success__devis"
          :empty="state.empty__devis"
          :warring="state.warring"
        />

        <b-table
          responsive
          primary-key="line"
          show-empty
          :items="devisLists__data"
          :currentPage="state.currentPageDevis"
          :perPage="state.perPage"
          :fields="tableColumnsDevis"
          :filter="state.filterDevis"
          v-if="state.success__devis === true"
        >
          <template #head(invoiceStatus)>
            <feather-icon icon="TrendingUpIcon" class="mx-auto" />
          </template>

          <template #cell(devisStatus)="data">
            <b-badge variant="primary" v-if="data.item.transition === 'devis_to_invoice'">
              Facture
            </b-badge>

            <b-badge variant="info" v-else> Devis </b-badge>
          </template>

          <!-- Column: Client -->
          <template #cell(client)="data">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="
                    data.item.client === null ? '' : data.item.client.profile_photo_url
                  "
                />
              </template>
              <span class="font-weight-bold text-nowrap d-flex align-content-center">
                {{ data.item.client === null ? "none" : data.item.client.nom | subtext }}
              </span>
              <small class="text-muted">{{ data.item.email }}</small>
            </b-media>
          </template>

          <!-- Column: Montant total -->
          <template #cell(total_ttc)="data">
            <span class="text-nowrap text-info">
              {{ formatter.format(data.item.total_ttc) }}
            </span>
          </template>

          <!-- Column: Payé -->
          <template #cell(paye)="data">
            <span class="text-nowrap text-success">
              {{ formatter.format(data.item.amountPaid) }}
            </span>
          </template>

          <!-- Column: Impayé -->
          <template #cell(impaye)="data">
            <span class="text-nowrap text-danger font-weight-bold">
              {{ formatter.format(data.item.amountToPaid) }}
            </span>
            <!-- <span
					v-if="Number(data.item.somme_paye) === data.item.total_ttc"
					class="text-nowrap"
				>
					<b-button variant="success" size="sm" pill>
						Réglé
					</b-button>
				</span> -->
          </template>

          <!-- Column: Issued Date -->
          <template #cell(total_taxe)="data">
            <span class="text-nowrap">
              {{ format_date(data.value) }}
              {{ data.item.total_taxe === null ? "0" : data.item.total_taxe }}
            </span>
          </template>

          <template #cell(remise)="data">
            <span class="text-center">
              {{ data.item.remise === null ? "0" : data.item.remise }}
            </span>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div class="text-nowrap">
              <feather-icon
                :id="`invoice-row-${data.item.id}-converte-icon`"
                icon="ClipboardIcon"
                size="24"
                class="cursor-pointer text-primary"
                @click="changeDevisToInvoice(data.item.id)"
                v-if="data.item.transition === null"
              />
              <feather-icon
                v-if="data.item.transition !== null"
                icon="CheckCircleIcon"
                size="24"
                class="text-primary"
              />
              <b-tooltip
                title="convertir en facture"
                :target="`invoice-row-${data.item.id}-converte-icon`"
              />

              <feather-icon
                :id="`invoice-row-${data.item.id}-preview-icon`"
                icon="EyeIcon"
                size="16"
                class="mx-1 cursor-pointer"
                @click="infoTreatments(data.item.id, 'view')"
              />

              <b-tooltip
                title="Prévisualiser la facture"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
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
                <b-dropdown-item @click="infoTreatments(data.item.id, 'edit')">
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Modifier</span>
                </b-dropdown-item>
                <!-- <b-dropdown-item
									v-b-modal.modal-mail-sender
									@click="colletDataInvoiceToSendMail(data.item)"
								>
									<feather-icon icon="TrashIcon" />
									<span class="align-middle ml-50"> Envoyer</span>
								</b-dropdown-item> -->

                <b-dropdown-item @click="invoiceDestroy(data.item.id)">
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50"> Supprimer</span>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </template>
        </b-table>

        <!-- Paginator -->
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
                v-model="state.currentPageDevis"
                :total-rows="devisLists__data.length"
                :per-page="state.perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                align="right"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </b-col>
          </b-row>
        </div>
      </b-card-text>
    </div>

    <b-card no-body>
      <!-- Modal pour effectuer un paiement -->
      <q-bill-payment-adds :refrechData="getInvoiceFacture" :uid="uidToBillPayments" />
      <!-- Modal pour ajouter une nouvelle taxe -->
      <bank-account-add />
      <q-invoice-mail-sender
        :invoiceData="state.invoiceData"
        v-if="state.mailSender === true"
      />
      <!-- <q-invoice-remove :deleteinvoice__Uid="invoiceDestroy__uid" /> -->
    </b-card>
    <span hidden>{{ getInvoiceLists }}</span>
  </section>
</template>

<script>
import {
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
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import {
  ref,
  onUnmounted,
  onMounted,
  reactive,
  computed,
  onUpdated,
  onBeforeMount,
} from "@vue/composition-api";
import store from "@/store";
import useInvoicesList from "./useInvoiceList";
import invoiceStoreModule from "../invoiceStoreModule";
import URL from "@/views/pages/request";
import axios from "axios";
import moment from "moment";
import QLoader from "@/components/__partials/loaders/qLoader.vue";
import BankAccountAdd from "@/components/bankAccounts/bankAccountAdd.vue";
import QInvoiceMailSender from "@/components/invoiceDetails/mailSender/qInvoiceMailSender.vue";
import QBillPaymentAdds from "@/components/invoiceDetails/billPayments/qBillPaymentAdds.vue";
import paymentRealTime from "@/utils/utilsInvoice/paymentRealTime";
import QLoaderTable from "@/components/__partials/loaders/qLoaderTable.vue";
import QInvoiceRemove from "@/components/invoiceDetails/__invoices/qInvoiceRemove.vue";
import { RETURN } from "vue-custom-google-autocomplete";
import { toast_error, toast_sucess } from "@/utils/qToast";

export default {
  components: {
    moment,
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
    QLoader,
    BankAccountAdd,
    QInvoiceMailSender,
    QBillPaymentAdds,
    QLoaderTable,
    QInvoiceRemove,
  },

  filters: {
    subtext: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.length > 5 ? value.substring(0, 10) + "..." : value;
    },
  },

  methods: {
    // ***
    // **
    // Envoie facture par email
    // **
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },

    infoTreatments(id, type) {
      let addDataToLocal = [];
      console.log(this.$route.path, this.$route.params.type);

      if (type === "view") {
        if (this.$route.name === "FactureList") {
          addDataToLocal = this.getInvoiceLists.data.filter((item) => {
            return item.id === id;
          });
          localStorage.setItem("facture", JSON.stringify(addDataToLocal[0]));
          this.$router.push("/facture/view");
        } else if (this.$route.name === "DevisList") {
          addDataToLocal = this.$store.state.qDevis.dataDevis.filter((item) => {
            return item.id === id;
          });
          localStorage.setItem("facture", JSON.stringify(addDataToLocal[0]));
          this.$router.push("/devis/view");
        } else {
          this.$router.push("/error-404");
        }
      } else if ("edit") {
        if (this.$route.name === "FactureList") {
          addDataToLocal = this.getInvoiceLists.data.filter((item) => {
            return item.id === id;
          });
          localStorage.setItem("edit_facture", JSON.stringify(addDataToLocal[0]));
          this.$router.push("/edit/facture");
        } else if (this.$route.name === "DevisList") {
          addDataToLocal = this.$store.state.qDevis.dataDevis.filter((item) => {
            return item.id === id;
          });

          addDataToLocal[0].items = [];
          for (let i = 0; i < addDataToLocal[0].articles.length; i++) {
            const el = addDataToLocal[0].articles[i];
            addDataToLocal[0].items.push({
              itemTitle: el.libelle,
              cout: el.pivot.prix_vente,
              prix: el.pivot.prix,
              qte: el.pivot.quantite,
            });
          }

          localStorage.setItem("edit_facture", JSON.stringify(addDataToLocal[0]));
          this.$router.push("/edit/devis");
        } else {
          this.$router.push("/error-404");
        }
      }
    },
  },
  setup(props, { root }) {
    const state = reactive({
      success_validate: false,
      empty_validate: false,

      success_draft: false,
      empty_draft: false,

      success__finish: false,
      empty__finish: false,

      success__devis: false,
      empty__devis: false,

      warring: false,
      filter: "",
      filterDevis: "",

      currentPageFinish: 1,
      currentPageValidate: 1,
      currentPageDraft: 1,
      currentPageDevis: 1,

      perPage: 30,
      filter: "",
      mailSender: "",
      invoiceData: "",
      perPageDevis: 30,
    });
    const perPageOptions = [30, 40, 50, 100, 150, 500];
    const tableColumns = [
      { key: "etat", label: "Status", sortable: true },
      { key: "code", label: "Code", sortable: true },
      { key: "client", sortable: true },
      { key: "total_ttc", sortable: true },
      { key: "paye", label: "Payé" },
      { key: "impaye", label: "Impayé" },
      { key: "date_echeance", sortable: true },
      { key: "actions" },
    ];
    // Table Handlers
    const tableColumnsDevis = [
      { key: "devisStatus", label: "Status", sortable: true },
      { key: "code", label: "Code devis", sortable: true },
      { key: "client", sortable: true },
      { key: "total_ttc", sortable: true },
      { key: "total_taxe", label: "Taxe", sortable: true },
      { key: "remise", label: "Remise", sortable: true },
      { key: "actions" },
    ];
    const statusOptions = ["Broulion", "Validé", "Tremine", "regler"];

    // FUNCTION TO CONVERT NUMBER INTO CURRENCY
    const formatter = new Intl.NumberFormat("ci-CI", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 2,
    });
    const mailSender = ref(false);
    const tabIndex = ref(0);

    const linkClass = (idx) => {};

    const invoiceCurrent = reactive({
      value: {},
    });

    const colletDataInvoice = (data) => {
      invoiceCurrent.value = data;
    };

    const invoiceData__validate = ref([]);
    const invoiceData__draft = ref([]);
    const invoiceData__finish = ref([]);
    const devisLists__data = ref([]);
    const see = ref(false);
    const loadingIsConvertToInvoice = ref(false);

    const uidToBillPayments = ref();
    const invoiceDestroy__uid = ref(0);
    // const query = ref(false);

    // onBeforeMount();

    const query = computed(() => {
      let link = root.$route.path;
      link = link.split("/")[2];
      console.log(link);
      if (link.toLowerCase() === "factures") {
        return true;
      } else if (link.toLowerCase() === "devis") {
        return false;
      } else {
        location.assign("/error-404");
      }
    });

    onMounted(async () => {
      document.title = "Facture - Ediqia";
      await getInvoiceFacture();
    });

    const colletDataInvoiceToSendMail = (data) => {
      state.mailSender = true;
      state.invoiceData = data;
    };

    const collectDataToBillPayments = (data) => {
      uidToBillPayments.value = data;
    };

    const changeDevisToInvoice = async (id) => {
      root
        .$swal({
          title: `Êtes vous sûr de vouloir convertir le devis ${id} en facture `,

          text: "",

          icon: "warning",

          showCancelButton: true,

          confirmButtonText: "Oui",

          customClass: {
            confirmButton: "btn btn-primary",

            cancelButton: "btn btn-outline-danger ml-1",
          },

          buttonsStyling: false,
        })
        .then(async ({ isConfirmed }) => {
          if (isConfirmed) {
            loadingIsConvertToInvoice.value = false;

            try {
              const { data } = await axios.post(URL.DEVIS_TO_FACTURE, {
                id: id,
                transition: "devis_to_invoice",
                etat: "validate",
              });
              if (data) {
                loadingIsConvertToInvoice.value = false;
                // Devis
                const devisLists__data = root.$store.state.qDevis.dataDevis;
                devisLists__data.forEach((invc) => {
                  if (invc.id === id) {
                    invc.status === "facture";
                    invc.transition = "devis_to_invoice";
                    console.log(invc);
                  }
                });
                toast_sucess(
                  root,
                  "success",
                  "top-right",
                  "Votre devis convertir avec succés"
                );

                root.$store.commit("qDevis/LIST_DATA_DEVIS", devisLists__data, {
                  root: true,
                });
              }
            } catch (error) {
              toast_error(root, "danger", "top-right", "Oups, un erreur est survenu !");
              loadingIsConvertToInvoice.value = false;
              console.log(error);
            }
          }
        });
    };

    const invoiceDestroy = async (id) => {
      root
        .$swal({
          title: `Êtes vous sûr de vouloir supprimé la facture ${id}`,

          text: "Aucun retour en arriere de sera posible",

          icon: "warning",

          showCancelButton: true,

          confirmButtonText: "Oui",

          customClass: {
            confirmButton: "btn btn-primary",

            cancelButton: "btn btn-outline-danger ml-1",
          },

          buttonsStyling: false,
        })
        .then(async (response) => {
          if (response.isConfirmed === true) {
            await axios
              .post(URL.FACTURE_DESTROY, { id: id })
              .then(({ data }) => {
                if (data) {
                  const dataDraft = root.$store.state.qInvoice.dataInvoice;
                  const invoiceLists__data = dataDraft.filter((draft) => {
                    return draft.id !== id;
                  });
                  root.$store.commit("qInvoice/LIST_DATA_INVOICE", invoiceLists__data, {
                    root: true,
                  });
                }

                root.$swal({
                  title: "Succès !",
                  text: `Votre facture N° ${id} à bien été supprimé`,
                  icon: "success",
                  confirmButtonText: "Ok",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                  buttonsStyling: false,
                });
              })
              .catch((error) => {
                root.$swal({
                  title: "Error !",
                  text: `Oups, un erreur est survenu veillez ressayer`,
                  icon: "error",
                  confirmButtonText: "Ok",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                  buttonsStyling: false,
                });
                console.log(error);
              });
          }
        });
    };

    const getInvoiceFacture = async () => {
      await axios
        .get(URL.FACTURE_LIST)
        .then(async ({ data }) => {
          const invoiceLists__data = data.facture.filter((item) => {
            return item.status === "facture";
          });

          const devisLists__data_to_invoice = data.facture.filter((item) => {
            return item.transition === "devis_to_invoice";
          });

          see.value = true;

          for (let i = 0; i < invoiceLists__data.length; i++) {
            const el = invoiceLists__data[i];
            el.line = i;
            invoiceLists__data[i].amountPaid = paymentRealTime.zip__amountPaid(el, root);
            invoiceLists__data[i].amountToPaid = paymentRealTime.zip__amountToPaid(
              el,
              root
            );

            if (paymentRealTime.zip__amountToPaid(el, root) > 0) {
              invoiceLists__data[i].state = "apayer";
            }
            if (
              paymentRealTime.zip__amountPaid(el, root) ===
              paymentRealTime.zip__amountToPaid(el, root)
            ) {
              invoiceLists__data[i].state = "partiel";
            } else if (paymentRealTime.zip__amountToPaid(el, root) === 0) {
              invoiceLists__data[i].state = "payer";
            }
          }

          console.log(invoiceLists__data);

          invoiceLists__data.reverse();
          root.$store.commit("qInvoice/LIST_DATA_INVOICE", invoiceLists__data, {
            root: true,
          });

          // Devis

          const devisLists__data_ = data.facture.filter((item) => {
            return item.status === "devis";
          });

          const devisLists__data = devisLists__data_.concat(devisLists__data_to_invoice);

          devisLists__data.reverse();
          root.$store.commit("qDevis/LIST_DATA_DEVIS", devisLists__data, {
            root: true,
          });
        })
        .catch((error) => {
          state.success_draft = false;
          state.success__finish = false;
          state.success_validate = false;
          state.warring = true;
          console.log(error);
        });
    };

    const getInvoiceLists = computed(() => {
      const __data = root.$store.state.qInvoice.dataInvoice;

      if (see.value === true) {
        for (let i = 0; i < __data.length; i++) {
          const el = __data[i];
          if (paymentRealTime.zip__amountToPaid(el, root) > 0) {
            __data[i].state = "apayer";
          }
          if (
            paymentRealTime.zip__amountPaid(el, root) ===
            paymentRealTime.zip__amountToPaid(el, root)
          ) {
            __data[i].state = "partiel";
          } else if (paymentRealTime.zip__amountToPaid(el, root) === 0) {
            __data[i].state = "payer";
          }
        }

        //List des factures valider
        invoiceData__validate.value = __data.filter((bill) => {
          return bill.etat === "validate" && bill.amountToPaid > 0;
        });

        invoiceData__validate.value.length > 0
          ? ((state.success_validate = true), (state.empty_validate = false))
          : ((state.empty_validate = true), (state.success_validate = false));

        //Liste des factures en broullon
        invoiceData__draft.value = __data.filter((bill) => {
          return bill.etat === "draft";
        });
        invoiceData__draft.value.length > 0
          ? ((state.success_draft = true), (state.empty_draft = false))
          : ((state.success_draft = false), (state.empty_draft = true));

        //liste des factures régler
        invoiceData__finish.value = __data.filter((bill) => {
          return bill.etat === "finish" || bill.amountToPaid <= 0;
        });
        invoiceData__finish.value.length > 0
          ? ((state.success__finish = true), (state.empty__finish = false))
          : ((state.success__finish = false), (state.empty__finish = true));

        //
        devisLists__data.value = root.$store.state.qDevis.dataDevis;
        devisLists__data.value.length > 0
          ? ((state.success__devis = true), (state.empty__devis = false))
          : ((state.success__devis = false), (state.empty__devis = true));
      }

      return {
        data: root.$store.state.qInvoice.dataInvoice,
        count: root.$store.state.qInvoice.countDataInvoice,
      };
    });

    const etatInvoiceFunctions = async (id) => {
      const { data } = await paymentRealTime.changeStateInvoice(id, root);
      console.log(data);
      if (data) {
        const newDataInvoice = root.$store.state.qInvoice.dataInvoice;
        newDataInvoice.forEach((_invoices) => {
          if (_invoices.id === id) {
            _invoices.etat = "validate";
          }
        });
        root.$store.commit("qInvoice/LIST_DATA_INVOICE", newDataInvoice, {
          root: true,
        });
      }
    };

    return {
      // Data
      getInvoiceLists,
      state,
      statusOptions,
      colletDataInvoice,
      invoiceCurrent,
      mailSender,
      tabIndex,
      tableColumns,
      tableColumnsDevis,
      invoiceData__validate,
      invoiceData__draft,
      invoiceData__finish,
      uidToBillPayments,
      etatInvoiceFunctions,
      invoiceDestroy__uid,
      see,
      query,
      devisLists__data,
      loadingIsConvertToInvoice,

      perPageOptions,
      colletDataInvoiceToSendMail,
      invoiceDestroy,
      collectDataToBillPayments,
      changeDevisToInvoice,

      //
      linkClass,
      formatter,
      getInvoiceFacture,
    };
  },
};
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

#modal-billPayment-add___BV_modal_content_ {
  height: 100vh !important;
}

.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 180px;

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
@import "@core/scss/vue/libs/vue-select.scss";
</style>
