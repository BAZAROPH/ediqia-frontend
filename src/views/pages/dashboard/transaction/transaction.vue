<template>
	<section class="invoice-add-wrapper">
		<b-card>
			<!-- Header Zone -->

			<div class="d-flex justify-content-between flex-wrap">
				<!-- Parmas : Up, Exenchange, byType(Filter) -->
				<div class="">
					<!-- See Transactions hight -->
					<b-button
						v-for="transc in TranscAdvance"
						:key="transc.icon"
						class="mr-50"
						v-ripple.400="'rgba(255, 255, 255, 0.15)'"
						:variant="transc.color"
					>
						<feather-icon :icon="transc.icon" class="mr-50" />
						<span class="align-middle"> {{ transc.label }} </span>
					</b-button>

					<!-- Filter the Transactions by type -->
					<b-dropdown
						v-ripple.400="'rgba(113, 102, 240, 0.15)'"
						text="Types"
						variant="outline-secondary"
					>
						<template #button-content>
							<feather-icon icon="LayersIcon" class="mr-50" />
							<span>Types</span>
						</template>
						<b-dropdown-item
							v-for="type in typeTranscOptions"
							:key="type.label"
							@click="typeTranscOptions__filter(type.handler)"
						>
							<feather-icon :icon="type.icon" class="mr-50" />
							<span>{{ type.label }}</span>
						</b-dropdown-item>
						<b-dropdown-divider />

						<b-dropdown-item @click="typeTranscOptions__filter('all')">
							<feather-icon icon="TrendingUpIcon" class="mr-50" />
							<span>Tous afficher</span>
						</b-dropdown-item>
					</b-dropdown>
				</div>

				<!-- Filter by date components-->
				<div
					class="mr-50 border border-primary d-flex align-items-center justify-content-center px-50"
					style="border-radius: 5px;"
				>
					<div class="d-flex align-items-center">
						<div
							v-ripple.400="'rgba(255, 255, 255, 0.15)'"
							class="mr-50  d-flex align-items-center justify-content-center cursor-pointer"
							:class="
								date.active === true
									? 'bg-primary text-light'
									: 'text-secondary'
							"
							style="padding: 0px 6px; height: 25px !important; border-radius: 5px;"
							v-for="date in dates"
							:key="date.label"
							@click="filterByDate__search(date.value)"
						>
							<span class="align-middle " style="font-size: 12px">
								{{ date.label }}
							</span>
						</div>
						<b-form-group class="ml-50 ">
							<label
								for="transc-flat-pickr"
								style="position: relative; top: 12px"
							>
								<feather-icon
									icon="CalendarIcon"
									class="mr-50 text-primary"
									size="20"
								/>
							</label>
							<flat-pickr
								v-model="state.filterAvancedData"
								style="position: relative; top: -5px"
								id="transc-flat-pickr"
								class="form-control border-0"
								value=""
								@input="filterAvancedByDate__search(state.filterAvancedData)"
								:config="{ mode: 'range' }"
							/>
						</b-form-group>
					</div>
				</div>
			</div>

			<!-- Table -->
			<div class="my-2">
				<!-- Loader table -->
				<q-loader-table
					:success="state.success"
					:empty="state.empty"
					:warring="state.warring"
				/>

				<b-table
					responsive
					primary-key="id"
					show-empty
					:items="transcLists__data"
					:currentPage="state.currentPage"
					:perPage="state.perPage"
					:fields="tableColumns"
					:filter="state.filter"
					v-if="state.success === true"
				>
					<template #head(invoiceStatus)>
						<feather-icon icon="TrendingUpIcon" class="mx-auto " />
					</template>

					<template #cell(type)="data">
						<div
							v-for="type in typeTranscOptions"
							:key="type.label"
							class="d-flex flex-column align-items-center "
						>
							<div
								:variant="type.color"
								class="d-flex align-items-center"
								v-if="data.item.type === type.handler"
								style="padding: 0.5em 0em"
							>
								<feather-icon
									:icon="type.icon"
									variant="warning"
									class="mr-50 "
									:class="'text-' + type.color"
									size="24"
								/>
								<span> {{ type.label }} </span>
							</div>
						</div>
					</template>

					<template #cell(type_libelle)="data">
						<span> {{ data.item.libelle | toSubtr }} </span>
					</template>

					<template #cell(status)="data">
						<b-badge
							:variant="data.item.status === 'out' ? 'success' : 'danger'"
						>
							{{ data.item.status === 'out' ? 'Entrant' : 'Sortant' }}
						</b-badge>
					</template>

					<template #cell(montant)="data">
						{{
							data.item.status !== 'out'
								? '-' + formatter.format(data.item.montant)
								: formatter.format(data.item.montant)
						}}
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
								v-model="state.currentPage"
								:total-rows="transcLists__data.length"
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
			</div>
		</b-card>
	</section>
</template>

<script>
import {
	ref,
	onUnmounted,
	reactive,
	onBeforeMount,
	onMounted,
	computed,
} from '@vue/composition-api';
import { heightTransition } from '@core/mixins/ui/transition';
import Ripple from 'vue-ripple-directive';
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
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import flatPickr from 'vue-flatpickr-component';
import store from '@/store';
import axios from 'axios';
import URL from '@/views/pages/request';
import { VueTelInput } from 'vue-tel-input';
import 'animate.css';
import EAddArticles from '@/components/__partials/articles/eAddArticles.vue';
import EAddNewClient from '@/components/__partials/eAddNewClient.vue';
import QInvoiceMailSender from '@/components/invoiceDetails/mailSender/qInvoiceMailSender.vue';
import QLoaderTable from '@/components/__partials/loaders/qLoaderTable.vue';
import moment from 'moment';

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
		QLoaderTable,
	},
	directives: {
		Ripple,
		'b-modal': VBModal,
		'b-toggle': VBToggle,
	},

	filters: {
		toSubtr(value) {
			if (!value) return '';
			value = value.toString();
			if (value.length > 10) {
				return value.substring(0, 10) + '...';
			} else {
				return value;
			}
		},
		toUpper(value) {
			if (!value) return '';
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
	},

	mixins: [heightTransition],
	props: [],

	setup(props, { root }) {
		const transcLists__data = ref([]);
		const transcLists__data__cache = ref([]);
		const state = reactive({
			currentPage: 1,
			perPage: 30,
			filter: '',
			success: false,
			empty: false,
			warring: false,
			filterAvancedData: '',
			__boolType: 'all',
			dateValue: 0,
		});
		const tableColumns = [
			{
				key: 'type',
				label: 'References',
			},
			{
				key: 'status',
				label: 'Status',
			},
			{
				key: 'type_libelle',
				label: 'Types',
			},
			{
				key: 'montant',
				label: 'Montant',
			},
			{
				key: 'date',
				label: 'Date',
			},
		];
		const typeTranscOptions = ref([
			{
				icon: 'CornerLeftUpIcon',
				label: 'Depenses',
				handler: 'depense',
				color: 'warning',
			},
			{
				icon: 'CornerRightDownIcon',
				label: 'Emprunts',
				handler: 'emprunt',
				color: 'danger',
			},
			{
				icon: 'CreditCardIcon',
				label: 'Versements',
				handler: 'versement',
				color: 'info',
			},
		]);
		const TranscAdvance = ref([
			// {
			// 	color: 'info',
			// 	icon: 'TrendingUpIcon',
			// 	label: 'En Hause',
			// },
			{
				color: 'warning',
				icon: 'RepeatIcon',
				label: 'Echange',
			},
		]);
		const dates = ref([
			{
				active: true,
				label: 'Tout',
				value: 0,
			},
			{
				active: false,
				label: '10j',
				value: 10,
			},
			{
				active: false,
				label: '15j',
				value: 15,
			},
			{
				active: false,
				label: '25j',
				value: 25,
			},
			{
				active: false,
				label: '1M',
				value: 30,
			},
			{
				active: false,
				label: '3M',
				value: 90,
			},
			{
				active: false,
				label: '6M',
				value: 120,
			},
			{
				active: false,
				label: '1Y',
				value: 360,
			},
		]);

		onMounted(() => {
			getTransc();
		});

		// const transcLists__data =  computed(() => {

		// })

		// FUNCTION TO CONVERT NUMBER INTO CURRENCY
		const formatter = new Intl.NumberFormat('de-DE', {
			currency: 'XOF',
			style: 'currency',
			minimumFractionDigits: 2,
		});

		// Convert date to mill Sencond
		const dataToMills = (date) =>
			moment(date)
				.toDate()
				.getTime()
				.toString();

		const ifOptions = (_bool, __data, dataCaching) => {
			if (_bool === 'all') {
				return (__data = dataCaching);
			} else {
				__data = dataCaching.filter((transc) => {
					return transc.type === _bool;
				});
				return __data;
			}
		};

		// Get all transactions
		const getTransc = async () => {
			try {
				const { data } = await axios.get(
					'http://localhost:8000/api/transaction'
				);

				if (data) {
					// Loader verify

					const versements = data.versements;
					const depenses = data.depenses;
					const emprunts = data.emprunts;

					const dataTranscs = [];

					// versement
					for (let i = 0; i < versements.length; i++) {
						const versement = versements[i];
						dataTranscs.push({
							libelle: 'facture',
							montant: versement.montant,
							date: moment(versement.created_at)
								.format('DD-MM-YYYY à HH:mm')
								.toString(),
							data_time: dataToMills(versement.created_at),
							type: 'versement',
							status: 'enter',
						});
					}

					// Depense
					for (let i = 0; i < depenses.length; i++) {
						const depense = depenses[i];

						for (let n = 0; n < depense.comptes.length; n++) {
							const compte = depense.comptes[n].pivot;
							dataTranscs.push({
								libelle: depense.libelle,
								montant: compte.montant_reglement,
								date: moment(
									compte.created_at !== null
										? compte.created_at
										: new Date().toString()
								)
									.format('DD-MM-YYYY à HH:mm')
									.toString(),
								data_time: dataToMills(
									compte.created_at !== null
										? compte.created_at
										: new Date().toString()
								),
								type: 'depense',
								status: 'out',
							});
						}
					}

					// Emprunts
					for (let i = 0; i < emprunts.length; i++) {
						const emprunt = emprunts[i];
						dataTranscs.push({
							libelle: emprunt.libelle,
							montant: emprunt.montant,
							date: moment(emprunt.created_at)
								.format('DD-MM-YYYY à HH:mm')
								.toString(),
							data_time: dataToMills(emprunt.created_at),
							type: 'emprunt',
							status: 'enter',
						});
					}

					dataTranscs.sort((x, y) => x.data_time < y.data_time);
					transcLists__data__cache.value = dataTranscs;
					transcLists__data.value = dataTranscs;

					transcLists__data.value.length === 0
						? (state.empty = true)
						: (state.success = true);
					console.log(state.success, state.empty);
				}
			} catch (error) {
				console.log(error);
				state.success = false;
				state.warring = true;
			}
		};

		// Filter in transactions - By date
		const filterByDate__search = (dateValue) => {
			state.dateValue = dateValue;
			// Get uid transactions
			const dateTransc = dates.value.filter((dateTransc) => {
				return dateTransc.value === dateValue;
			});

			// Remove and active elements clicks
			dates.value.forEach((date) => {
				date.active = false;
			});
			dateTransc[0].active = true;

			// Date to filter
			let toSearched = '';
			dateValue > 0
				? (toSearched = moment()
						.subtract(dateValue, 'days')
						.toString())
				: (toSearched = moment()
						.subtract(99, 'years')
						.utc()
						.toString());

			// Date filter - convert to mill second
			const millDate = dataToMills(toSearched);
			console.log(toSearched);

			//Reference computed
			const byOptionsTransc = ifOptions(
				state.__boolType,
				transcLists__data.value,
				transcLists__data__cache.value
			);
			transcLists__data.value = byOptionsTransc.filter((transc) => {
				return transc.data_time > millDate;
			});

			transcLists__data.value.length === 0
				? (state.empty = true) && (state.success = false)
				: (state.success = true) && (state.empty = false);
		};

		const filterAvancedByDate__search = (dateValue) => {
			state.dateValue = 0;
			const toSearchedAvanced = dateValue.split('to');

			dates.value.forEach((date) => {
				date.active = false;
			});

			if (toSearchedAvanced.length === 2) {
				let startingDate = dataToMills(toSearchedAvanced[0].trim());
				let endDate = dataToMills(toSearchedAvanced[1].trim());

				//Reference computed
				const byOptionsTransc = ifOptions(
					state.__boolType,
					transcLists__data.value,
					transcLists__data__cache.value
				);
				transcLists__data.value = byOptionsTransc.filter((transc) => {
					return (
						transc.data_time >= startingDate && transc.data_time <= endDate
					);
				});

				transcLists__data.value.length === 0
					? (state.empty = true) && (state.success = false)
					: (state.success = true) && (state.empty = false);
			}
		};

		// Filter transactions by type
		const typeTranscOptions__filter = (type) => {
			state.__boolType = type;
			console.log(state.__boolType);
			transcLists__data.value = ifOptions(
				state.__boolType,
				transcLists__data.value,
				transcLists__data__cache.value
			);
			filterByDate__search(state.dateValue);
		};

		return {
			dates,
			TranscAdvance,
			typeTranscOptions,
			state,
			tableColumns,
			transcLists__data,
			formatter,

			// Functions
			filterByDate__search,
			filterAvancedByDate__search,
			typeTranscOptions__filter,
		};
	},
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
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
@import '~@core/scss/base/pages/app-invoice.scss';
@import '~@core/scss/base/components/variables-dark';

.flatpickr-input {
	display: flex;
	width: 0px;
	height: 0px;
	position: absolute;
}

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
[dir] [type='button']::-moz-focus-inner,
[dir] [type='reset']::-moz-focus-inner,
[dir] [type='submit']::-moz-focus-inner {
	padding-left: 0;
	padding-right: 0;
	border-style: none;
}
</style>
