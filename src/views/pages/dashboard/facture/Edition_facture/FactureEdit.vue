<template>
	<section class="invoice-add-wrapper">
		<b-row v-if="invoiceData" class="invoice-add">
			<!-- Col: Left (Invoice Container) -->
			<b-col cols="12" xl="9" md="8">
				<b-form @submit.prevent>
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
											<img :src="entreprise_logo" />
										</div>
									</div>
								</div>

								<!-- Header: Right Content -->
								<div class="invoice-number-date mt-md-0 mt-2">
									<div
										class="d-flex align-items-center justify-content-md-end mb-1"
									>
										<h4 class="invoice-title">
											Facture n°
										</h4>
										<b-input-group
											class="input-group-merge invoice-edit-input-group disabled"
										>
											<b-input-group-prepend is-text>
												<feather-icon icon="HashIcon" />
											</b-input-group-prepend>
											<b-form-input
												v-if="!invoiceData.code"
												id="invoice-data-id"
												v-model="invoiceData.id"
												disabled
											/>
											<b-form-input
												v-if="invoiceData.code"
												id="invoice-data-id"
												v-model="invoiceData.code"
												disabled
											/>
										</b-input-group>
									</div>
									<div class="d-flex align-items-center mb-1">
										<span class="title">
											Date d'émission:
										</span>
										<flat-pickr
											@input="validateDate"
											v-model="invoiceData.date_emission"
											class="form-control invoice-edit-input"
										/>
									</div>
									<div class="d-flex align-items-center">
										<span class="title">
											Date d'échéance:
										</span>
										<flat-pickr
											@input="validateDate"
											v-model="invoiceData.date_echeance"
											class="form-control invoice-edit-input"
										/>
									</div>
								</div>
							</div>
							<div class="d-flex align-items-center justify-content-end">
								<p class="text-danger">{{ date_alert }}</p>
							</div>
						</b-card-body>

						<!-- Spacer -->
						<hr class="invoice-spacing" />

						<!-- Invoice Client & Payment Details -->
						<b-card-body class="invoice-padding pt-0">
							<b-row class="invoice-spacing">
								<!-- Col: Invoice To -->
								<b-col cols="12" xl="6" class="mb-lg-1">
									<h6 class="mb-2">
										Facture à:
									</h6>

									<!-- Selected Client -->
									<div v-if="invoiceData.client" class="mt-1">
										<h6 class="mb-25">Mr/Mme: {{ invoiceData.client.nom }}</h6>
										<b-card-text class="mb-25">
											Adresse: {{ invoiceData.client.adresse }}
										</b-card-text>
										<b-card-text class="mb-25">
											Contact: {{ invoiceData.client.contact }}
										</b-card-text>
										<b-card-text class="mb-25">
											Email: {{ invoiceData.client.email }}
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
										<h6 class="mb-2">
											Entreprise:
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

						<!-- Items Section -->
						<b-card-body class="invoice-padding form-item-section">
							<div
								ref="form"
								class="repeater-form"
								:style="{ height: trHeight }"
								v-if="invoiceData.items"
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
													/>
												</b-col>
												<b-col cols="12" lg="3">
													<label class="d-inline d-lg-none">Cout</label>
													<b-form-input
														v-model="item.cout"
														type="number"
														class="mb-2"
														readonly
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
														{{
															formatter.format(
																(item.prix = item.cout * item.qte)
															)
														}}
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
										size="sm"
										variant="primary"
										@click="addNewItemInItemForm"
									>
										Ajouter un article
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
															label="Remise (fr)"
															label-for="setting-item-discount"
														>
															<b-form-input
																id="setting-item-discount"
																value="null"
																type="number"
																v-model="invoiceData.remise"
															/>
														</b-form-group>
													</b-col>

													<!-- Field: Tax 1 -->
													<b-col cols="12">
														<b-form-group
															label="Taxe (%)"
															label-for="setting-item-tax-1"
														>
															<v-select
																v-model="invoiceData.taxe"
																:dir="
																	$store.state.appConfig.isRTL ? 'rtl' : 'ltr'
																"
																label="libelle"
																:options="taxesList"
																input-id="setting-item-tax-1"
																:clearable="true"
															/>
														</b-form-group>
													</b-col>

													<b-col
														cols="12"
														class="d-flex justify-content-between mt-1"
													>
														<b-button
															variant="outline-primary"
															@click="
																() => {
																	$refs[`form-item-settings-popover`].$emit(
																		'close'
																	);
																}
															"
														>
															Appliquer
														</b-button>
														<!-- <b-button
                              variant="outline-secondary"
                              @click="() => {$refs[`form-item-settings-popover`].$emit('close')}"
                            >
                              Annuler
                            </b-button> -->
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
									md="6"
									class="mt-md-0 mt-3 d-flex align-items-center"
									order="2"
									order-md="1"
								>
								</b-col>

								<!-- Col: Total -->
								<b-col
									cols="12"
									md="6"
									class="mt-md-6 d-flex justify-content-end"
									order="1"
									order-md="2"
								>
									<div class="invoice-total-wrapper">
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Sous total:
											</p>
											<p
												v-if="invoiceData.items.length !== 0"
												class="invoice-total-amount"
											>
												{{ formatter.format(getSousTotal(invoiceData.items)) }}
											</p>
										</div>
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Remise :
											</p>
											<p v-if="invoiceData.remise" class="invoice-total-amount">
												{{ invoiceData.remise }} %
											</p>
											<p
												v-if="!invoiceData.remise"
												class="invoice-total-amount"
											>
												0 %
											</p>
										</div>
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Tax total:
											</p>
											<p
												v-if="invoiceData.taxe !== null"
												class="invoice-total-amount"
											>
												{{ invoiceData.taxe.valeur }} %
											</p>
											<p
												v-if="invoiceData.taxe === null"
												class="invoice-total-amount"
											>
												0 %
											</p>
										</div>
										<hr class="my-50" />
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Total :
											</p>
											<p
												v-if="invoiceData.items.length !== 0"
												class="invoice-total-amount"
											>
												{{ formatter.format(getTotalTtc()) }}
											</p>
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
							<b-form-textarea v-model="invoiceData.note" />
						</b-card-body>
					</b-card>
				</b-form>
			</b-col>

			<!-- Right Col: Card -->
			<b-col cols="12" md="4" xl="3" class="invoice-actions">
				<!-- Action Buttons -->
				<b-card>
					<!-- Button: Send Invoice -->
					<b-button
						@click="sendFactureEmail"
						v-ripple.400="'rgba(255, 255, 255, 0.15)'"
						v-b-toggle.sidebar-send-invoice
						variant="primary"
						class="mb-75"
						block
					>
						Envoyer
					</b-button>

					<!-- Button: DOwnload -->
					<b-button
						v-ripple.400="'rgba(113, 102, 240, 0.15)'"
						variant="outline-primary"
						class="mb-75"
						block
						@click="PreviewFacture"
					>
						Prévisualiser
					</b-button>

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

		<invoice-sidebar-send-invoice />
	</section>
</template>

<script>
import Logo from '@core/layouts/components/Logo.vue';
import { ref, onUnmounted } from '@vue/composition-api';
import { heightTransition } from '@core/mixins/ui/transition';
import Ripple from 'vue-ripple-directive';
import store from '@/store';
import {
	BRow,
	BCol,
	BCard,
	BCardBody,
	BButton,
	BCardText,
	BForm,
	BFormGroup,
	BFormInput,
	BInputGroup,
	BInputGroupPrepend,
	BFormTextarea,
	BFormCheckbox,
	BPopover,
	BAlert,
	BLink,
	VBToggle,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import flatPickr from 'vue-flatpickr-component';
import invoiceStoreModule from '../invoiceStoreModule';
import InvoiceSidebarSendInvoice from '../InvoiceSidebarSendInvoice.vue';
import URL from '@/views/pages/request';
import axios from 'axios';
import 'animate.css';

export default {
	components: {
		BRow,
		BCol,
		BCard,
		BCardBody,
		BButton,
		BCardText,
		BForm,
		BFormGroup,
		BFormInput,
		BInputGroup,
		BInputGroupPrepend,
		BFormTextarea,
		BFormCheckbox,
		BPopover,
		BAlert,
		BLink,
		flatPickr,
		vSelect,
		Logo,
		InvoiceSidebarSendInvoice,
	},
	directives: {
		Ripple,
		'b-toggle': VBToggle,
	},
	mixins: [heightTransition],

	// Reset Tr Height if data changes
	watch: {
		// eslint-disable-next-line func-names
		'invoiceData.items': function() {
			this.initTrHeight();
		},
	},
	async mounted() {
		document.title = 'Modifier une facture';
		this.initTrHeight();
		this.invoiceData = JSON.parse(localStorage.getItem('facture_edit'));
		console.log('invoiczzzzz', this.invoiceData);
		await axios
			.get(URL.ENTREPRISE_INFO)
			.then((res) => {
				this.entreprise_logo = res.data[0].logo_entreprise;
				console.log('entrerpise logo', this.entreprise_logo);
			})
			.catch((error) => {
				console.log(error);
			});
		await axios.get(URL.ARTICLE_LIST).then((res) => {
			this.articlesList = res.data[0];
			console.log('articles', this.articlesList);
		});
		await axios.get(URL.TAXE_LIST).then((res) => {
			this.taxesList = res.data[0];
			console.log('taxes', this.taxesList);
		});
	},
	created() {
		window.addEventListener('resize', this.initTrHeight);
	},
	destroyed() {
		window.removeEventListener('resize', this.initTrHeight);
	},
	methods: {
		validateDate() {
			const date_creation = this.invoiceData.date_emission;
			const date_fin = this.invoiceData.date_echeance;
			if (date_creation > date_fin) {
				this.date_alert =
					"La date d'émission ne peut pas etre supérieur à la date d'écheance";
				console.log('changer la date de fin');
			} else {
				this.date_alert = null;
				console.log('date correct');
			}
		},
		addNewItemInItemForm() {
			this.$refs.form.style.overflow = 'hidden';
			this.invoiceData.items.push(
				JSON.parse(JSON.stringify(this.itemFormBlankItem))
			);
			console.log('invoiceData.items', this.invoiceData.items);

			this.$nextTick(() => {
				this.trAddHeight(this.$refs.row[0].offsetHeight);
				setTimeout(() => {
					this.$refs.form.style.overflow = null;
				}, 350);
			});
		},
		removeItem(index) {
			this.invoiceData.items.splice(index, 1);
			this.trTrimHeight(this.$refs.row[0].offsetHeight);
		},
		// ***
		// **
		// FONCTION POUR FAIRE LA SOMME TOTAL DES TAXES
		// **
		// getTotalTaxe() {
		//   let total_taxes = this.invoiceData.totalTaxe.reduce((a, b) => a + b, 0)
		//   this.invoiceData.factureTotalTaxe = total_taxes
		//   return total_taxes
		// },
		// ***
		// **
		// FONCTION POUR FAIRE LA SOMME TOTAL DES TAXES
		// **
		// getPrixTotalArticle(cout, qte, taxe) {
		//   if (taxe === 1) {
		//     let taxe = (cout * qte)
		//     return taxe
		//   } else {
		//     let taxe2 = ((cout * qte) / (100 * taxe))
		//     console.log(typeof taxe2.toFixed(2))
		//     return ((cout * qte) + parseFloat(taxe2.toFixed(2)))
		//   }
		// },
		getSousTotal(arr) {
			let price = '';

			for (let i = 0; i < arr.length; i++) {
				price = arr;
			}

			Array.prototype.sum = function(prop, top) {
				let total = 0;
				for (let i = 0, _len = this.length; i < _len; i++) {
					total += this[i][prop] * this[i][top];
				}
				return total;
			};

			this.invoiceData.facturePrixTotalHt = price.sum('cout', 'qte');
			return price.sum('cout', 'qte');
		},
		// *****
		// ***
		// FUNCTION POUR AVOIR LE TOTAL DE TOUS LES ARTICLES AJOUTEES
		// ***
		getTotalTtc() {
			let price = '';

			for (let i = 0; i < this.invoiceData.items.length; i++) {
				price = this.invoiceData.items;
			}

			Array.prototype.sum = function(prop) {
				let total = 0;
				for (let i = 0, _len = this.length; i < _len; i++) {
					total += this[i][prop];
				}
				return parseFloat(total);
			};

			if (this.invoiceData.remise && this.invoiceData.taxe !== null) {
				let totalWithRemise =
					price.sum('prix') -
					price.sum('prix') * (this.invoiceData.remise / 100);
				let num = parseFloat(
					totalWithRemise * (1 + this.invoiceData.taxe.valeur / 100)
				);
				this.invoiceData.facturePrixTotal = num.toFixed(2);
				return num.toFixed(2);
			} else if (this.invoiceData.remise && this.invoiceData.taxe === null) {
				let totalWithRemise =
					price.sum('prix') -
					price.sum('prix') * (this.invoiceData.remise / 100);
				let num = parseFloat(totalWithRemise);
				this.invoiceData.facturePrixTotal = num.toFixed(2);
				return num.toFixed(2);
			} else if (!this.invoiceData.remise && this.invoiceData.taxe) {
				let totalWithoutRemise = price.sum('prix');
				let num = parseFloat(
					totalWithoutRemise * (1 + this.invoiceData.taxe.valeur / 100)
				);
				this.invoiceData.facturePrixTotal = num.toFixed(2);
				return num.toFixed(2);
			} else {
				return parseFloat(price.sum('prix'));
			}
		},

		// ***
		// **
		// FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
		// **
		async saveFacture() {
			if (!this.invoiceData.items[0]) {
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
				});
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
				});
			} else {
				const config = {
					headers: {
						Accept: 'application/json',
					},
				};
				if (this.invoiceData.code && this.invoiceData.id) {
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
						type_facture: 'facture',
					};
					console.log('data pour update une facture', data);
					await axios
						.patch(`${URL.FACTURE_UPDATE}${this.invoiceData.id}`, data, config)
						.then((res) => {
							console.log('facture update ::', res.data);
							if (res.data) {
								this.confirmText();
							}
						})
						.catch((error) => {
							console.log('api error', error.messagae);
							this.errorText();
						});
				}

				if (!this.invoiceData.code && this.invoiceData.id) {
					if (this.invoiceData.taxe !== null) {
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
							type_facture: 'facture',
						};
						console.log('data pour créer une facture', data);
						await axios
							.post(URL.FACTURE_CREATE, data, config)
							.then((res) => {
								if (res.data) {
									this.confirmText();
								}
							})
							.catch((error) => {
								console.log('api error', error.messagae);
								this.errorText();
							});
					} else {
						const data = {
							client: this.invoiceData.client.id,
							date_emission: this.invoiceData.date_emission,
							date_echeance: this.invoiceData.date_echeance,
							entreprise: this.invoiceData.entreprise.id,
							items: this.invoiceData.items,
							description: this.invoiceData.note,
							total_ttc: this.invoiceData.facturePrixTotal,
							total_ht: this.invoiceData.facturePrixTotalHt,
							remise: this.invoiceData.remise,
							nombre_article: this.invoiceData.items.length,
							articles_id: this.invoiceData.articles_id,
							type_facture: 'facture',
						};
						console.log('data pour créer une facture', data);
						await axios
							.post(URL.FACTURE_CREATE, data, config)
							.then((res) => {
								if (res.data) {
									this.confirmText();
								}
							})
							.catch((error) => {
								console.log('api error', error.messagae);
								this.errorText();
							});
					}
				}
			}
		},
		// ***
		// **
		// FUNTION POUR PREVISUALISER LA FACTURE
		// **
		PreviewFacture() {
			if (!this.invoiceData.items[0]) {
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
				});
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
				});
			} else {
				localStorage.setItem('facture', JSON.stringify(this.invoiceData));
				this.$router.push('/facture/apercu');
			}
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
			}).then((result) => {
				if (result.value) {
					this.$router.push('/facture/create');
				} else {
					this.$router.push('/facture');
				}
			});
		},
		// Alerte quand facture non enregistré
		errorText() {
			this.$swal({
				title: 'Erreur',
				text: "Votre facture n'est pas enregistré, veillez rééssayer",
				icon: 'error',
				showCancelButton: true,
				confirmButtonText: 'Rééssayer',
				cancelButtonText: 'Annuler',
				customClass: {
					confirmButton: 'btn btn-primary',
					cancelButton: 'btn btn-outline-primary ml-1',
				},
				buttonsStyling: false,
			}).then((result) => {
				if (result.value) {
					this.saveFacture();
				} else {
					this.$router.push('/facture');
				}
			});
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
			};
			console.log('information envoyé au backend', data2);
			await axios
				.post(URL.FACTURE_SENDEMAIL, data2)
				.then((res) => {
					console.log(res.data);
					console.log('response header', res.headers['content-type']);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		initTrHeight() {
			this.trSetHeight(null);
			this.$nextTick(() => {
				this.trSetHeight(this.$refs.form ? this.$refs.form.scrollHeight : 0);
			});
		},
	},
	setup() {
		const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice';

		// Register module
		if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
			store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

		// UnRegister on leave
		onUnmounted(() => {
			if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
				store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
		});

		const entrerpiseData = ref('');
		const entreprise_logo = ref('');
		const factureClient = ref('');
		const dateDefault = ref(0);
		const dueDate = ref(0);
		const invoiceData = ref(null);
		const invoiceArticles = ref([]);
		const articlesList = ref([]);
		const taxesList = ref([]);

		const date_alert = ref(null);

		const itemFormBlankItem = {
			nom: null,
			cout: 0,
			taxe: 0,
			qte: 1,
			prix: 0,
		};

		const updateItemForm = (index, val) => {
			const { prix_vente, id, qte } = val;
			invoiceData.value.items[index].cout = prix_vente;
			invoiceData.value.items[index].qte = 1;
			invoiceData.value.articles_id[index] = id;
		};

		// ***
		// RECUPERE LA TAXE ET LA MODIFIE
		// **
		// const updateItemTaxe = (index, val) => {
		//   console.log(val)
		//   const { valeur, id, libelle } = val
		//   invoiceData.value.items[index].taxe = valeur
		//   invoiceData.value.totalTaxe[index] = valeur
		//   invoiceData.value.taxes_id[index] = id
		// }

		// FUNCTION TO CONVERT NUMBER INTO CURRENCY
		const formatter = new Intl.NumberFormat('ci-CI', {
			style: 'currency',
			currency: 'XOF',
			minimumFractionDigits: 2,
		});

		return {
			invoiceData,
			updateItemForm,
			// updateItemTaxe,
			// updateItemForm2,
			// updateItemTaxe2,
			itemFormBlankItem,
			taxesList,
			articlesList,
			entrerpiseData,
			entreprise_logo,
			factureClient,
			dateDefault,
			dueDate,
			date_alert,
			invoiceArticles,
			formatter,
		};
	},
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style lang="scss" scoped>
@import '~@core/scss/base/pages/app-invoice.scss';

.logo {
	width: 120px;
}

.logo > img {
	width: 100%;
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
</style>
