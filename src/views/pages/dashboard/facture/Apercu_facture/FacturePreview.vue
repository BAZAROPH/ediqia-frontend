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
										<img :src="entreprise_logo" />
									</div>
								</div>
							</div>

							<!-- Header: Right Content -->
							<div class="mt-md-0 mt-2">
								<h4
									v-if="invoiceData.code && invoiceData.id"
									class="invoice-title"
								>
									{{ invoiceData.status }} n°
									<span class="invoice-number">{{ invoiceData.code }}</span>
								</h4>
								<h4
									v-if="!invoiceData.code && invoiceData.id"
									class="invoice-title"
								>
									{{ invoiceData.status }} n°
									<span class="invoice-number">{{ invoiceData.id }}</span>
								</h4>

								<div class=" d-flex flex-column">
									<div class="">
										<span class="invoice-date-title">Date d'émission: </span>
										<span class="invoice-date">{{
											invoiceData.date_emission
										}}</span>
									</div>

									<div class="">
										<span class="invoice-date-title">Date d'émission: </span>
										<span class="invoice-date">{{
											invoiceData.date_echeance
										}}</span>
									</div>
								</div>
							</div>
						</div>
					</b-card-body>

					<!-- Spacer -->
					<hr class="invoice-spacing" />

					<!-- Invoice Client & Payment Details -->
					<b-card-body v-if="invoiceData.client" class="invoice-padding pt-0">
						<div class="mb-1" v-if="invoiceData.libelle !== null">
							<span class="invoice-date-title">Objet : </span>
							<span class="invoice-date">{{ invoiceData.libelle }} </span>
						</div>
						<b-row class="invoice-spacing">
							<!-- Col: Invoice To -->
							<b-col cols="12" xl="6" class="p-0">
								<h6 class="mb-2">
									Facture à:
								</h6>
								<h6 class="mb-25">
									Mr/Mme: {{ invoiceData.client.nom }}
									{{ invoiceData.client.prenoms }}
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
								{{
									data.item.pivot.prix_vente === null
										? formatter.format(data.item.prix_vente)
										: formatter.format(data.item.pivot.prix_vente)
								}}
							</b-card-text>
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
										<p
											v-if="invoiceData.facturePrixTotalHt"
											class="invoice-total-amount"
										>
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
										<p
											v-if="
												invoiceData.total_taxe &&
													invoiceData.total_taxe !== null
											"
											class="invoice-total-amount"
										>
											{{ invoiceData.total_taxe }} %
										</p>
										<p
											v-if="invoiceData.total_taxe === null"
											class="invoice-total-amount"
										>
											0 %
										</p>
										<!-- <p v-if="!invoiceData.total_taxe && !invoiceData.taxe" class="invoice-total-amount">
                      0 %
                    </p> -->
										<p
											v-if="
												!invoiceData.total_taxe &&
													invoiceData.taxe &&
													invoiceData.taxe !== null
											"
											class="invoice-total-amount"
										>
											{{ invoiceData.taxe.valeur }} %
										</p>
										<p
											v-if="
												!invoiceData.total_taxe && invoiceData.taxe === null
											"
											class="invoice-total-amount"
										>
											0 %
										</p>
									</div>
									<hr class="my-50" />
									<div class="invoice-total-item">
										<p class="invoice-total-title">
											Total TTC:
										</p>
										<p
											class="invoice-total-amount"
											v-if="formatter.format(invoiceData.total_ttc)"
										>
											{{ formatter.format(invoiceData.total_ttc) }}
										</p>
										<p class="invoice-total-amount" v-else>
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
								<p>
									La présente facture est arreté à la somme de
									{{ intNombreALettre(invoiceData.total_ttc) }} franc CFA.
								</p>
							</b-col>
							<!-- <b-col
								cols="12"
								class="mt-md-0 mt-3 pt-2"
								order="3"
								v-if="
									invoiceData.total_ttc &&
										!Number.isInteger(invoiceData.total_ttc)
								"
							>
								<p>
									La présente facture est arreté à la somme de
									<span class="font-weight-bold" style="font-weight: bold;"
										>{{ intNombreALettre(invoiceData.total_ttc) }} virgule
										{{ decNombreALettre(invoiceData.total_ttc) }}</span
									>
									franc CFA.
								</p>
							</b-col> -->
							<b-col
								cols="12"
								class="mt-md-0 mt-3 pt-2"
								order="3"
								v-if="
									invoiceData.facturePrixTotal &&
										!Number.isInteger(invoiceData.facturePrixTotal)
								"
							>
								<p>
									La présente facture est arreté à la somme de
									<span class="font-weight-bold" style="font-weight: bold;"
										>{{ intNombreALettre(invoiceData.facturePrixTotal) }}
										virgule
										{{ decNombreALettre(invoiceData.facturePrixTotal) }}</span
									>
									franc CFA.
								</p>
							</b-col>
						</b-row>
					</b-card-body>

					<!-- Spacer -->
					<hr class="invoice-spacing" />

					<!-- Note -->
					<b-card-body class="invoice-padding pt-0">
						<span class="font-weight-bold">Note: </span>
						<span v-if="invoiceData.description">{{
							invoiceData.description
						}}</span>
						<span v-if="invoiceData.note">{{ invoiceData.note }}</span>
					</b-card-body>
				</b-card>
			</b-col>

			<!-- Right Col: Card -->
			<b-col cols="12" md="4" xl="3" class="invoice-actions">
				<q-invoice-buttons-actions
					:q_sendMail="mailSenderFun"
					:etatInvoice="invoiceData.etat"
					:status="invoiceData.status"
					:etatInvoiceFunctions="etatInvoiceFunctions"
					:regler="
						parseInt(invoiceData.amountPaid) >=
							parseInt(invoiceData.amountToPaid)
					"
				/>
				<q-invoice-details-transaction :invoiceData="transRealTime" />
			</b-col>
		</b-row>

		<!-- ADD A NEW PAYMENTS   +
		!-- ADD A NEW BANK ACCOUNT -->
		<q-invoice-mail-sender
			:invoiceData="invoiceData"
			v-if="mailSender === true"
		/>
		<q-bill-payment-adds
			:refrechData="UpdateAmountPaid"
			:uid="invoiceData[0]"
		/>
		<bank-account-add />

		<b-card>
			{{ invoiceData.mode }}
			<q-invoice-more-details v-if="hideInvoiceMoreDetails__bool === false" />
		</b-card>
	</section>
</template>

<script>
import { ref, onUnmounted, onMounted, computed } from '@vue/composition-api';

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
} from 'bootstrap-vue';
import Logo from '@core/layouts/components/Logo.vue';
import Ripple from 'vue-ripple-directive';
import { required } from '@validations';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import vSelect from 'vue-select';
import store from '@/store';
import invoiceStoreModule from '../invoiceStoreModule';
import URL from '@/views/pages/request';
import axios from 'axios';
import { NumberToLetter } from 'convertir-nombre-lettre';
import QInvoiceMoreDetails from '@/components/invoiceDetails/Preview/qInvoiceMoreDetails.vue';
import QBillPaymentEdit from '@/components/invoiceDetails/billPayments/qBillPaymentEdit.vue';
import QInvoiceMailSender from '@/components/invoiceDetails/mailSender/qInvoiceMailSender.vue';
import QBillPaymentAdds from '@/components/invoiceDetails/billPayments/qBillPaymentAdds.vue';
import QInvoiceButtonsActions from '@/components/invoiceDetails/__partials/qInvoiceButtonsActions.vue';
import QInvoiceDetailsTransaction from '@/components/invoiceDetails/__partials/qInvoiceDetailsTransaction.vue';
import BankAccountAdd from '@/components/bankAccounts/bankAccountAdd.vue';
import paymentRealTime from '@/utils/utilsInvoice/paymentRealTime';

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
		QInvoiceMoreDetails,
		QBillPaymentEdit,
		QInvoiceMailSender,
		QBillPaymentAdds,
		QInvoiceButtonsActions,
		QInvoiceDetailsTransaction,
		BankAccountAdd,
	},

	async mounted() {
		try {
			await axios.get(URL.ENTREPRISE_INFO).then((res) => {
				this.entreprise_logo = res.data[0].logo_entreprise;
			});
		} catch (error) {
			console.log(error);
		}
	},

	methods: {
		intNombreALettre(num) {
			const intPart = num.toString().split('.')[0];
			return NumberToLetter(intPart);
		},

		decNombreALettre(num) {
			const decPart = num.toString().split('.')[1];
			if (decPart.length === 2) {
				return NumberToLetter(decPart);
			} else {
				return NumberToLetter(`${decPart}0`);
			}
		},

		checkMontant() {
			if (this.montant === '') {
				this.alert_text = 'Veillez entrer un nombre valide.';
				this.montantTrop = true;
			} else if (this.montant > this.invoiceData.total_ttc) {
				this.alert_text = 'Ce momtant est supérieur, au montant de la facture.';
				this.montantTrop = true;
			} else if (
				this.invoiceData.somme_impaye &&
				Number(this.montant) > Number(this.invoiceData.somme_impaye)
			) {
				this.alert_text = 'Ce montant est supérieur au reste à payer !';
				this.montantTrop = true;
			} else {
				this.montantTrop = false;
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
					items: this.getAllArticles(
						this.invoiceData.articles,
						this.invoiceData.taxes
					),
					facturePrixTotal: this.invoiceData.total_ttc,
					total_ht: this.invoiceData.total_ht,
					total_taxe: this.invoiceData.total_taxe,
					totalTaxe: this.invoiceData.totalTaxe,
					taxes_id: this.getTaxeId(this.invoiceData.articles),
					note: this.invoiceData.description,
				};
				localStorage.setItem('facture_edit', JSON.stringify(invoice_next));
				this.$router.push('/facture/edit');
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
				};
				localStorage.setItem('facture_edit', JSON.stringify(invoice));
				this.$router.push('/facture/edit');
			}
		},
		getArticleTaxe(taxe_id) {
			const taxe = this.invoiceData.taxes.filter((item) => item.id === taxe_id);
			return taxe[0].valeur;
		},
		// ===== RECUPERE LE ID DES ARTICLES
		getArticleId(articles) {
			const articles_id = [];
			articles.filter((item) => {
				articles_id.push(item.id);
			});
			return articles_id;
		},
		// ===== RECUPERE LE ID DES TAXES
		getTaxeId(taxes) {
			const taxes_id = [];
			taxes.filter((item) => {
				taxes_id.push(item.id);
			});
			return taxes_id;
		},
		// ===== RECUPERE LES ARTICLES DE LA FACTURE EN ITEMS
		getAllArticles(articles, tax) {
			const allArticles = [];
			articles.filter((item) => {
				tax.filter((el) => {
					let article = {
						itemTitle: item,
						cout: item.prix_vente,
						prix: item.pivot.prix,
						qte: item.pivot.quantite,
						taxe: el.valeur,
					};
					allArticles.push(article);
				});
			});

			const key = 'prix';
			const items = [
				...new Map(allArticles.map((item) => [item[key], item])).values(),
			];
			return items;
		},
		// ***
		// **
		// FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
		// **
		async saveFacture() {
			const config = {
				headers: {
					Accept: 'application/json',
				},
			};
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

			await axios
				.post(URL.FACTURE_CREATE, data, config)
				.then((res) => {
					if (res.data) {
						this.confirmText();
					}
				})
				.catch((error) => {
					this.errorText();
					console.log('api error', error.messagae);
				});
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
					this.$router.push('/liste_facture');
				}
			});
		},
	},

	computed: {
		hideInvoiceMoreDetails__bool() {
			return this.$store.state.qInvoice.hideInvoiceMoreDetails;
		},
	},

	setup(props, { root }) {
		const invoiceData = ref([]);
		const paymentDetails = ref({});
		const compteList = ref([]);
		const compte = ref('');
		const montant = ref(null);
		const entreprise_logo = ref('');

		const alert_text = ref(
			'Le montant entré est supérieur à celui inscrit sur la facture !'
		);
		const montantTrop = ref(false);

		const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice';

		const mailSenderFun = () => {
			mailSender.value = true;
		};

		// Register module
		if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
			store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

		onMounted(() => {
			const dataLacal = JSON.parse(localStorage.getItem('facture'));
			invoiceData.value = dataLacal;
		});

		const invoiceDestroy = async (id) => {
			root
				.$swal({
					title: `Êtes vous sûr de vouloir supprimé la facture ${id}`,

					text: 'Aucun retour en arriere de sera posible',

					icon: 'warning',

					showCancelButton: true,

					confirmButtonText: 'Oui',

					customClass: {
						confirmButton: 'btn btn-primary',

						cancelButton: 'btn btn-outline-danger ml-1',
					},

					buttonsStyling: false,
				})
				.then(async (response) => {
					if (response.isConfirmed === true) {
						await axios
							.post(URL.FACTURE_DESTROY, { id: id })
							.then(({ data }) => {
								if (data) {
									getInvoiceFacture();
								}

								root.$swal({
									title: 'Succès !',
									text: `Votre facture N° ${id} à bien été supprimé`,
									icon: 'success',
									confirmButtonText: 'Ok',
									customClass: {
										confirmButton: 'btn btn-primary',
									},
									buttonsStyling: false,
								});
							})
							.catch((error) => {
								root.$swal({
									title: 'Error !',
									text: `Oups, un erreur est survenu veillez ressayer`,
									icon: 'error',
									confirmButtonText: 'Ok',
									customClass: {
										confirmButton: 'btn btn-primary',
									},
									buttonsStyling: false,
								});
								console.log(error);
							});
					}
				});
		};

		const transRealTime = computed(() => {
			invoiceData.value.versements =
				root.$store.state.qInvoice.dataBillPayments;

			return {
				amountPaid: paymentRealTime.zip__amountPaid(invoiceData.value, root),
				amountToPaid: paymentRealTime.zip__amountToPaid(
					invoiceData.value,
					root
				),
			};
		});

		// UnRegister on leave
		onUnmounted(() => {
			if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
				store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
		});

		const etatInvoiceFunctions = async () => {
			const { data } = await paymentRealTime.changeStateInvoice(
				invoiceData.value.id,
				root
			);
			if (data) {
				invoiceData.value.etat = 'validate';
			}
		};

		const UpdateAmountPaid = () => {};

		/*
		 *
		 */
		const mailSender = ref(false);
		const formatter = new Intl.NumberFormat('ci-CI', {
			style: 'currency',
			currency: 'XOF',
			minimumFractionDigits: 2,
		});

		/**
		 *
		 */

		const newCompte = ref({
			numeroCompte: 0,
			libelle: '',
			solde: '',
			description: '',
		});

		return {
			etatInvoiceFunctions,
			mailSenderFun,
			invoiceData,
			paymentDetails,
			compteList,
			compte,
			montant,
			alert_text,
			montantTrop,
			formatter,
			newCompte,
			entreprise_logo,
			mailSender,
			UpdateAmountPaid,
			transRealTime,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/pages/app-invoice.scss';
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

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
