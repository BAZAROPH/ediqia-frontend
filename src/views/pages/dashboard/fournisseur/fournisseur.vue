<template>
	<div class="position-relative table-responsive table-base">
		<!-- Tableau pour afficher les clients -->

		<b-col>
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
						<b-button variant="primary" v-b-modal.add-fournier>
							<feather-icon icon="PlusIcon" class="mx-auto" />
							Fournisseur
						</b-button>
					</b-col>

					<!-- Search -->
					<b-col cols="12" md="6">
						<div class="d-flex align-items-center justify-content-end">
							<b-form-input
								v-model="state.filter"
								class="d-inline-block mr-1"
								placeholder="Rechercher par : fourniser, date, numero de telephone"
							/>
						</div>
					</b-col>
				</b-row>
			</div>

			<!-- Loader -->
			<q-loader-table
				:success="state.success"
				:empty="state.empty"
				:warring="state.warring"
			/>

			<b-table
				responsive
				primary-key="id"
				show-empty
				:items="getAllFournier"
				:currentPage="state.currentPage"
				:perPage="state.perPage"
				:fields="tableColumns"
				:filter="state.filter"
				v-if="state.success === true"
			>
				<template #cell(index)="data">
					<span> {{ data.item.index }} </span>
				</template>

				<!-- Column: Actions -->
				<template #cell(actions)="data">
					<div class="text-nowrap">
						<feather-icon
							v-b-modal.edit-fournier
							:id="`invoice-row-${data.item.id}-send-icon`"
							icon="EditIcon"
							class="cursor-pointer"
							size="16"
							@click="editFournier(data.item)"
						/>

						<b-tooltip
							title="modifier le fournisseur"
							class="cursor-pointer"
							:target="`invoice-row-${data.item.id}-send-icon`"
						/>

						<feather-icon
							:id="`invoice-row-${data.item.id}-preview-icon`"
							icon="EyeIcon"
							size="16"
							class="mx-1 cursor-pointer"
							@click="previewFournier(data.item)"
						/>
						<b-tooltip
							title="Prévisualiser le fournisseur"
							:target="`invoice-row-${data.item.id}-preview-icon`"
						/>

						<feather-icon
							icon="TrashIcon"
							:id="`invoice-row-${data.item.id}-trash-icon`"
							size="16"
							class=" cursor-pointer"
							@click="destroyFournier(data.item.id, data.item.nom)"
						/>
						<b-tooltip
							title="supprimer le fournieur"
							:target="`invoice-row-${data.item.id}-trash-icon`"
						/>
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
							v-model="state.currentPage"
							:total-rows="getAllFournier.length"
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
		</b-col>

		<e-edit-fournier
			:fournierDataUid="Fournier__dataUid"
			v-if="Fournier__bool === true"
		/>
		<e-add-fournier />
	</div>
</template>

<script>
import { onMounted, reactive, ref, computed } from '@vue/composition-api';
import {
	BRow,
	BCol,
	BModal,
	BFormInput,
	BFormGroup,
	BButton,
	VBModal,
	BForm,
	BLink,
	BFormCheckbox,
	BInputGroup,
	BInputGroupAppend,
	BImg,
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import vSelect from 'vue-select';
import URL from '@/views/pages/request';
import axios from 'axios';
import { VueTelInput } from 'vue-tel-input';
import QLoaderTable from '@/components/__partials/loaders/qLoaderTable.vue';
import EEditFournier from '@/components/__partials/eEditFournier.vue';
import EAddFournier from '@/components/__partials/eAddFournier.vue';
export default {
	components: {
		VueTelInput,
		vSelect,
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
		BInputGroupAppend,
		ValidationProvider,
		ValidationObserver,
		QLoaderTable,
		EEditFournier,
		EAddFournier,
	},
	directives: {
		Ripple,
	},
	props: [],
	setup(props, { root }) {
		const fournier = ref([]);
		const Fournier__dataUid = ref('');
		const Fournier__bool = ref(false);
		const tableColumns = [
			// { key: 'id', label: 'N', sortable: true },
			{ key: 'index', label: 'N*', sortable: true },
			{ key: 'nom', label: 'Nom' },
			{ key: 'email', label: 'Email' },
			{ key: 'contact', label: 'Contact' },
			{ key: 'localisation.formatted_address', label: 'Adresse' },
			{ key: 'actions' },
		];
		const perPageOptions = [30, 40, 50, 100, 150, 500];
		const state = reactive({
			currentPage: 1,
			perPage: 30,
			filter: '',
			success: false,
			warring: false,
			empty: false,
		});
		const see = ref(false);

		onMounted(() => {
			document.title = 'Fournisseur - Ediqia';
			getFournier();
		});

		const getAllFournier = computed(() => {
			if (see.value === true) {
				if (fournier.value.length > 0) {
					state.success = true;
					state.empty = false;
				}

				if (root.$store.state.qFournier.dataFournier.length === 0) {
					state.success = false;
					state.empty = true;
				}
			}
			return root.$store.state.qFournier.dataFournier;
		});

		// Get All Founier
		const getFournier = async () => {
			axios
				.get(URL.FOURNISSEUR_LIST)
				.then(({ data }) => {
					if (data) {
						if (data[0]) {
							see.value = true;
						}

						fournier.value = data[0];
						fournier.value.reverse();
						fournier.value.forEach((el, index) => {
							el.index = index + 1;
						});

						root.$store.commit('qFournier/LIST_DATA_FOURNIER', fournier.value, {
							root: true,
						});
						localStorage.setItem(
							'dataFournier',
							JSON.stringify(fournier.value)
						);
						console.log(fournier.value);
					}
				})
				.catch((error) => {
					state.warring = true;
					console.log(error);
				});
		};

		// Actions Functions
		const previewFournier = async (data) => {
			localStorage.setItem('client', JSON.stringify(data));
			root.$router.push('/detail');
		};
		const editFournier = (data) => {
			Fournier__dataUid.value = data;
			Fournier__bool.value = true;
		};
		const destroyFournier = async (id, nom) => {
			root
				.$swal({
					title: `Suppressions de votre fournisseur ''${nom}''`,

					text: `Etre vous bien sûr de vouloir le retirer de la liste de vos fournisseur? `,

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
							.post(URL.FOURNISSEUR_DESTROY, { id: id })
							.then(({ data }) => {
								console.log(data);
								if (data) {
									let newDataFounier = root.$store.state.qFournier.dataFournier;
									newDataFounier = newDataFounier.filter((foun) => {
										return foun.id !== id;
									});
									newDataFounier.forEach((el, index) => {
										el.index = index + 1;
									});

									root.$store.commit(
										'qFournier/LIST_DATA_FOURNIER',
										newDataFounier,
										{
											root: true,
										}
									);
								}
							});
					}
				});
		};

		return {
			state,
			Fournier__dataUid,
			Fournier__bool,
			perPageOptions,
			tableColumns,
			fournier,
			getAllFournier,

			previewFournier,
			editFournier,
			destroyFournier,
		};
	},
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.table-base {
	margin: 30px auto 0;
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
</style>
