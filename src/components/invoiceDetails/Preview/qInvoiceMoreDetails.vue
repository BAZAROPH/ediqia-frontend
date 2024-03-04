<script>
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
	BTable,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import Ripple from 'vue-ripple-directive';
import {
	computed,
	onMounted,
	reactive,
	ref,
	watch,
	watchEffect,
} from '@vue/composition-api';
import axios from 'axios';
import URL from '@/views/pages/request/index';
import TableActionsBillPayment from '@/components/__partials/invoice_tabeActions/tableActionsBillPayment.vue';
import QBillPaymentEdit from '../billPayments/qBillPaymentEdit.vue';
import moment from 'moment';
import QBillPaymentsRemove from '../billPayments/qBillPaymentsRemove.vue';
import useInvoicesList from '@/views/pages/dashboard/devis/Liste_devis/useInvoiceList';
import InvoiceGetProvider from '@/services/invoices';
import QComment from '../comments/qComment.vue';
import QFileDestroy from '../files/qFileDestroy.vue';
import QFileUpload from '../files/qFileUpload.vue';
import QLoader from '@/components/__partials/loaders/qLoader.vue';
import QLoaderTable from '@/components/__partials/loaders/qLoaderTable.vue';

export default {
	directives: {
		Ripple,
		'b-toggle': VBToggle,
	},
	components: {
		vSelect,
		BRow,
		BCol,
		BCard,
		BCardBody,
		BTable,
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
		TableActionsBillPayment,
		QBillPaymentEdit,
		QBillPaymentsRemove,
		QComment,
		QFileDestroy,
		QFileUpload,
		QLoader,
		QFileUpload,
		QLoaderTable,
	},

	data() {
		return {
			//Loading
			loadingDeleteBillPayments: false,
			loadingSendFileToInvoiceDetails: false,

			//Config
			config: {
				headers: {
					Accept: 'application/json',
				},
			},
		};
	},

	setup(props, { root }) {
		/**** @START VARIABLE
    This variable inclus all value of compoment
    @State
    */

		const perPageOptions = [30, 40, 50, 100, 150, 500];
		const describle = ref('');
		const iconeBillPayments = reactive([
			{
				name: 'Modifier',
				icon: 'EditIcon',
			},
			{
				name: 'Suprimer',
				icon: 'TrashIcon',
			},
		]);
		const state = reactive({
			// Primitive value
			qUser: null,
			printInvoice: false,
			linksMenuInvoice: [
				{
					name: 'Reglements',
					active: true,
				},
				{
					name: 'Historiques',
					active: false,
				},
				{
					name: 'Liste des fichers',
					active: false,
				},
			],
			dataCurrentBillPayments: null,

			// Paginations
			currentPage: 1,

			// All varialbles tabs: Menu
			billPayments: {
				success: false,
				warring: false,
				empty: false,
				perPage: 30,
				count: 0,
				filter: '',
				tableFields: [
					{
						key: 'code',
						label: 'N° Versements',
					},
					{
						key: 'amount',
						label: 'Montants',
					},
					// {
					//   key: "data_emission",
					//   label: "Date d'emissions",
					// },
					// {
					//   key: "data_expiry",
					//   label: "Date d'echeange",
					// },
					{
						key: 'actions',
						label: 'Actions',
					},
				],
			},
			archives: {
				success: false,
				warring: false,
				empty: false,
				perPage: 30,
				count: 0,
				filter: '',
				tableFields: [
					{
						key: 'label',
						label: 'libelle',
					},

					{
						key: 'actions',
						label: 'Actions Effectuer',
					},

					{
						key: 'created_at',
						label: 'date de create',
					},
				],
			},

			files: {
				success: false,
				warring: false,
				empty: false,
				perPage: 30,
				count: 0,
				filter: '',
				tableFields: [
					{
						key: 'types',
						label: 'types',
					},
					{
						key: 'descriptions',
						label: 'Descriptions',
					},
					{
						key: 'actions',
						label: 'Actions',
					},
				],
			},

			comments: {
				success: false,
				warring: false,
				empty: false,
				perPage: 30,
				count: 0,
				value: '',
			},
		});
		const getData = reactive({
			billPayments: [],
			archives: [],
			files: [],
			comments: [],
		});

		/**** @END VARIABLE */

		/*
    Before to init the page
    @ return > Any
    */
		onMounted(async () => {
			await getAllBillPayments();
			await getAllArchives();
			await getAllFiles();
		});

		/*************************************************************************
		 * *
		 * *
		 * *
		 * *BILL PAYMENTS
		 * *
		 * *
		 * *
		 * **************************************************************************
		 */

		/***
    GET ALL BILL PAYMENTS
    @Method > Get
    @variable > [billPayments]
    @return > Array<Object>
  */
		const getAllBillPayments = async () => {
			const __reserve = [];
			const facture = JSON.parse(localStorage.getItem('facture'));
			await axios
				.post(URL.BILL_PAYMANTS, { id: facture.id })
				.then(({ data }) => {
					//Verifications
					__reserve.push(data[0][0]);
					state.billPayments.count = __reserve[0].versements.length;
					__reserve[0].versements.length > 0
						? (state.billPayments.success = true)
						: (state.billPayments.empty = true);

					//Send all data
					for (let i = 0; i < __reserve[0].versements.length; i++) {
						const billPayment = __reserve[0];
						getData.billPayments.unshift(
							InvoiceGetProvider.data_getBillPayments(billPayment, i)
						);
					}

					root.$store.commit(
						'qInvoice/DATA_BILLPAYMENT',
						getData.billPayments,
						{ root: true }
					);
				})
				.catch((error) => {
					console.error(error);
					state.billPayments.success = false;
					state.billPayments.warring = true;
				});
		};

		const qBillPayments = computed(() => {
			if (getData.billPayments.length > 0) {
				state.billPayments.success = true;
				state.billPayments.empty = false;
			}

			if (root.$store.state.qInvoice.countBillPayments === 0) {
				state.billPayments.success = false;
				state.billPayments.empty = true;
			}

			return {
				data: root.$store.state.qInvoice.dataBillPayments,
				count: root.$store.state.qInvoice.countBillPayments,
			};
		});
		/*************************************************************************
		 * *
		 * *
		 * *
		 * *ARCHIVE
		 * *
		 * *
		 * *
		 * **************************************************************************
		 */

		/***
    GET ALL HISTORIQUEs 
    @Method > Get
    @variable > [Archives]
    @return > Array<Object>
  */
		const getAllArchives = async () => {
			const __reserveArchives = [];
			const facture = JSON.parse(localStorage.getItem('facture'));
			await axios
				.post(URL.INVOICE_HISTORIQUE, { subject_id: facture.id })
				.then(({ data }) => {
					state.archives.count = data.historique[0].length;
					__reserveArchives.push(data.historique[0]);

					//Verifications

					__reserveArchives[0].length > 0
						? (state.archives.success = true)
						: (state.archives.empty = true);

					for (let i = 0; i < __reserveArchives[0].length; i++) {
						const archive = __reserveArchives[0][i];
						getData.archives.unshift({
							label: archive.subject_type,
							actions: archive.description,
							created_at: moment(archive.date)
								.format('DD-MM-YY à HH:MM')
								.toString(),
						});
					}
				})
				.catch((error) => {
					console.error(error);
					state.archives.success = false;
					state.archives.warring = true;
				});
		};

		/*************************************************************************
		 * *
		 * *
		 * *
		 * *FILES
		 * *
		 * *
		 * *
		 * **************************************************************************
		 */

		/***
    GET ALL Files 
    @Method > Post
    @variable > [Archives]
    @return > Array<Object>
  */
		const getAllFiles = async () => {
			const __reserveFiles = [];
			const facture = JSON.parse(localStorage.getItem('facture'));
			await axios
				.post(URL.INVOICE_COLLECT_FILES, { id: facture.id })
				.then(({ data }) => {
					__reserveFiles.push(data.facture[0].media);
					state.files.count = __reserveFiles[0].length;

					// // //Verifications

					__reserveFiles[0].length > 0
						? (state.files.success = true)
						: (state.files.empty = true);

					for (let i = 0; i < __reserveFiles[0].length; i++) {
						const file = __reserveFiles[0][i];

						getData.files.unshift({
							id: file.id,
							index: i + 1,
							types: file.mime_type.split('/')[1],
							descriptions: file.manipulations.commentaire,
							original_url: file.original_url,
							// created_at: moment(archive.date)
							// 	.format('DD-MM-YYYY à HH:mm')
							// 	.toString(),
						});
					}
				})
				.catch((error) => {
					console.error(error);
					state.files.success = false;
					state.files.warring = true;
				});
		};

		const qComments = computed(() => {
			return {
				count: root.$store.state.qInvoice.countComments,
			};
		});

		const onClickActionBillPayment = async (data) => {
			// const data = document.querySelector(".dataCurrentBillPayments");
			state.dataCurrentBillPayments = data;
		};

		return {
			// Variavles
			state,
			getData,
			iconeBillPayments,
			perPageOptions,

			//Data real Time
			qBillPayments,
			qComments,

			//Functions
			onClickActionBillPayment,
		};
	},
};
</script>
<template>
	<section class="">
		<!-- - - - - -------------------------------------------------------------
   -
   -
   -
   -
   @BILLPAYMENTS
   -
   -
   -
   -
   -------------------------------------------------------------------------->

		<b-tabs pills card class="flex justify-end justify-content-md-between">
			<b-tab>
				<!-- Add component -->
				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="CreditCardIcon"
						class="cursor-pointer"
						size="16"
					/>
					<div class="d-flex flex-row">
						<span class="d-none d-md-flex">Reglements </span>
						<span style="margin-left: 4px">({{ qBillPayments.count }})</span>
					</div>
				</template>

				<!-- ------------------------------------------------------------
   Fliter 
   -------------------------------------------------------------------------->
				<div class="mx-2">
					<!-- Table Top -->
					<b-row>
						<!-- Per Page -->
						<b-col
							cols="12"
							md="6"
							class="
                d-flex
                align-items-center
                justify-content-start
                mb-1 mb-md-0
              "
						>
							<label>Entrées</label>
							<v-select
								v-model="state.billPayments.perPage"
								:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
								:options="perPageOptions"
								:clearable="false"
								class="per-page-selector d-inline-block ml-50 mr-1"
							/>
						</b-col>

						<!-- Search -->
						<b-col cols="12" md="4">
							<div class="d-flex align-items-center justify-content-end">
								<b-form-input
									v-model="state.billPayments.filter"
									class="d-inline-block mr-1"
									placeholder="Ex : Client, prix, date..."
								/>
							</div>
						</b-col>
					</b-row>
				</div>
				<!--------------------------------------------------------------
   End Fliter 
   -------------------------------------------------------------------------->

				<!-- Loading -->
				<q-loader-table
					:warring="state.billPayments.warring"
					:empty="state.billPayments.empty"
					:success="state.billPayments.success"
				/>

				<b-col>
					<b-table
						v-if="state.billPayments.success === true"
						class="mb-32"
						responsive
						primary-key="id"
						show-empty
						:currentPage="state.currentPage"
						:perPage="state.billPayments.perPage"
						:items="qBillPayments.data"
						:fields="state.billPayments.tableFields"
						:filter="state.billPayments.filter"
					>
						<template #cell(actions)="data">
							<!-- Import The component -->

							<div class="text-nowrap d-flex justify-content-around">
								<!-- <feather-icon
									:id="`invoice-row-${data.item.id}-edit-icon`"
									icon="EditIcon"
									size="16"
									class=" cursor-pointer"
									v-b-modal.modal-editBillPaymant
									@click="onClickActionBillPayment(data.item)"
								/>
								<b-tooltip
									title="Modifier le reglement"
									:target="`invoice-row-${data.item.id}-edit-icon`"
								/> -->

								<feather-icon
									:id="`invoice-row-${data.item.id}-remove-icon`"
									icon="TrashIcon"
									size="16"
									class="mr-1 cursor-pointer"
									v-b-modal.modal-destroyBillPaymant
									@click="onClickActionBillPayment(data.item)"
								/>
								<b-tooltip
									title="Supprimé le reglement"
									:target="`invoice-row-${data.item.id}-remove-icon`"
								/>

								<!-- Dropdown -->
								<!-- <b-dropdown variant="link" toggle-class="p-0" no-caret>
									<template #button-content>
										<feather-icon
											data-id=""
											icon="MoreVerticalIcon"
											size="16"
											class="align-middle text-body"
										/>
									</template>
								</b-dropdown> -->
							</div>
						</template>
					</b-table>

					<b-pagination
						v-model="state.currentPage"
						:total-rows="qBillPayments.data.length"
						:per-page="state.billPayments.perPage"
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
			</b-tab>

			<!-- - - - - -------------------------------------------------------------
   -
   -
   -
   -
   @HISTORIQUES
   -
   -
   -
   -
   -------------------------------------------------------------------------->

			<b-tab>
				<!-- Add component -->

				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="ArchiveIcon"
						class="cursor-pointer"
						size="16"
					/>

					<div class="d-flex flex-row">
						<span class="d-none d-md-flex">Historique</span>
						<span style="margin-left: 4px">({{ state.archives.count }})</span>
					</div>
				</template>

				<!-- ------------------------------------------------------------
   Fliter 
   -------------------------------------------------------------------------->
				<div class="mx-2">
					<!-- Table Top -->
					<b-row>
						<!-- Per Page -->
						<b-col
							cols="12"
							md="6"
							class="
                d-flex
                align-items-center
                justify-content-start
                mb-1 mb-md-0
              "
						>
							<label>Entrées</label>
							<v-select
								v-model="state.archives.perPage"
								:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
								:options="perPageOptions"
								:clearable="false"
								class="per-page-selector d-inline-block ml-50 mr-1"
							/>
						</b-col>

						<!-- Search -->
						<!-- <b-col cols="12" md="6">
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  v-model="state.billPayments.filter"
                  class="d-inline-block mr-1"
                  placeholder="Ex : Client, prix, date..."
                />
              </div>
            </b-col> -->
					</b-row>
				</div>
				<!--------------------------------------------------------------
   End Fliter 
   -------------------------------------------------------------------------->

				<!-- Loading -->
				<q-loader-table
					:warring="state.archives.warring"
					:empty="state.archives.empty"
					:success="state.archives.success"
				/>
				<b-col>
					<b-table
						v-if="state.archives.success === true"
						class=""
						responsive
						primary-key="id"
						show-empty
						:currentPage="state.currentPage"
						:perPage="state.archives.perPage"
						:items="getData.archives"
						:fields="state.archives.tableFields"
						:filter="state.archives.filter"
					>
						<template #cell(actions)="data">
							<b-badge variant="">
								{{ data.item.actions }}
							</b-badge>
						</template>
					</b-table>

					<b-pagination
						v-model="state.currentPage"
						:total-rows="getData.archives.length"
						:per-page="state.archives.perPage"
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
			</b-tab>
			<!-- - - - - -------------------------------------------------------------
   -
   -
   -
   -
   @LISTE DES FICHERS
   -
   -
   -
   -
   -------------------------------------------------------------------------->

			<b-tab>
				<!-- Add component -->

				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="FileIcon"
						class="cursor-pointer"
						size="16"
					/>
					<div class="d-flex flex-row">
						<span class="d-none d-md-flex">Liste des fichers </span>
						<span style="margin-left: 4px">({{ state.files.count }})</span>
					</div>
				</template>

				<!-- ------------------------------------------------------------
   Fliter 
   -------------------------------------------------------------------------->
				<div class="mx-2">
					<!-- Table Top -->
					<b-row>
						<!-- Per Page -->
						<b-col
							cols="12"
							md="6"
							class="
                d-flex
                align-items-center
                justify-content-start
                mb-1 mb-md-0
              "
						>
							<label>Entrées</label>
							<v-select
								v-model="state.files.perPage"
								:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
								:options="perPageOptions"
								:clearable="false"
								class="per-page-selector d-inline-block ml-50 mr-1"
							/>
							<b-button v-b-modal.modal-sendFilesBillPayments variant="primary">
								<feather-icon
									:id="`invoice-row-1-send-icon`"
									icon="PlusIcon"
									class="cursor-pointer"
									style="margin-right: 5px"
									size="16"
								/>
								<span class="">Fichier</span>
							</b-button>
						</b-col>

						<!-- Search -->
						<b-col cols="12" md="6">
							<div class="d-flex align-items-center justify-content-end">
								<b-form-input
									v-model="state.files.filter"
									class="d-inline-block mr-1"
									placeholder="Ex : Client, prix, date..."
								/>
							</div>
						</b-col>
					</b-row>
				</div>
				<!--------------------------------------------------------------
   End Fliter 
   -------------------------------------------------------------------------->

				<!-- ADD A NEW FILES -->

				<!-- Loading -->
				<q-loader-table
					:warring="state.files.warring"
					:empty="state.files.empty"
					:success="state.files.success"
				/>

				<b-col>
					<b-table
						v-if="state.files.success === true"
						class="mb-32"
						responsive
						primary-key="id"
						show-empty
						:currentPage="state.currentPage"
						:perPage="state.files.perPage"
						:items="getData.files"
						:fields="state.files.tableFields"
						:filter="state.files.filter"
					>
						<template #cell(types)="data">
							<b-badge pill variant="primary">
								{{ data.item.types }}
							</b-badge>
						</template>

						<template #cell(actions)="data">
							<!-- Import The component -->

							<div class="text-nowrap">
								<a target="blank" :href="data.item.original_url">
									<feather-icon
										:id="`invoice-row-${data.item.id}-view-icon`"
										icon="EyeIcon"
										size="16"
										class="mr-1 cursor-pointer"
									/>
									<b-tooltip
										title="Voir le fichier"
										:target="`invoice-row-${data.item.id}-view-icon`"
									/>
								</a>

								<!-- Dropdown -->
								<b-dropdown variant="link" toggle-class="p-0" no-caret>
									<template #button-content>
										<feather-icon
											data-id=""
											icon="MoreVerticalIcon"
											size="16"
											class="align-middle text-body"
										/>
									</template>

									<!--  -->
									<b-dropdown-item
										@click="onClickActionBillPayment(data.item)"
										v-b-modal.modal-DeleteFilesInvoice
									>
										<feather-icon icon="TrashIcon" />

										<span class="align-middle ml-50">Supprimer</span>
									</b-dropdown-item>
								</b-dropdown>
							</div>
						</template>
					</b-table>

					<b-pagination
						v-model="state.currentPage"
						:total-rows="getData.files.length"
						:per-page="state.files.perPage"
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
			</b-tab>

			<!-- - - - - -------------------------------------------------------------
   -
   -
   -
   -
  @COMMENTAIRE
   -
   -
   -
   -
   -------------------------------------------------------------------------->

			<b-tab>
				<!-- Add component -->

				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="MessageCircleIcon"
						class="cursor-pointer"
						size="16"
					/>

					<div class="d-flex flex-row">
						<span class="d-none d-md-flex">Commentaire </span>
						<span style="margin-left: 4px">({{ qComments.count }})</span>
					</div>
				</template>

				<q-comment />
			</b-tab>
		</b-tabs>

		<!-- Bill Payments : modal For update and delete  -->
		<q-bill-payment-edit
			:dataCurrentBillPayments="state.dataCurrentBillPayments"
		/>
		<q-bill-payments-remove
			:dataCurrentBillPayments="state.dataCurrentBillPayments"
		/>

		<!-- Files :  modal for delete -->
		<!-- <q-file-destroy
      :dataCurrentFiles="state.dataCurrentBillPayments"
    /> -->
		<!-- Files : modal For create of new files -->
		<q-file-upload />
	</section>
</template>
