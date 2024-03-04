<template>
	<div>
		<b-card no-body class="px-1 py-2">
			<div class="mx-1 mb-2">
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
						<div class="" v-if="marche">
							<button class="btn btn-primary " disabled>
								<span
									class="spinner-border spinner-border-sm "
									role="status"
									aria-hidden="true"
								></span>
							</button>
						</div>
						<div class="" v-else>
							<button class="btn btn-primary" v-b-modal.modal-info>
								Générer le catalogue
							</button>
						</div>
					</b-col>

					<!-- Search -->
					<b-col cols="12" md="6">
						<div class="d-flex align-items-center justify-content-end">
							<b-form-input
								v-model="state.filter"
								class="d-inline-block mr-1"
								placeholder="Rechercher par : Articles, montant, date"
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
				primary-key="line"
				show-empty
				:items="catagolueData"
				:currentPage="state.currentPage"
				:perPage="state.perPage"
				:fields="tableColumns"
				:filter="state.filter"
				v-if="state.success === true"
			>
				<template #head(all)>
					<b-form-checkbox
						id="checkbox-1"
						v-model="status__check"
						name="checkbox-1"
						value="accepted"
						@change="selection_all"
						unchecked-value="not_accepted"
					>
						<span style="font-size:12px">
							tout - {{ state.countSelected }}
						</span>
					</b-form-checkbox>
				</template>

				<template #cell(all)="data">
					<b-form-checkbox
						v-model="selected"
						:value="data.item.id"
						@change="selection"
						unchecked-value="not_accepted"
					>
					</b-form-checkbox>
				</template>

				<template #head(items)>
					<span>Articles ({{ state.countArticle }}) </span>
				</template>
				<template #cell(items)="data">
					<div class="d-flex align-items-center">
						<img
							v-if="data.item.media !== ''"
							:src="data.item.media"
							style="border-radius: 10px"
							height="50px"
							width="60px"
						/>
						<div
							class="bg-secondary"
							style="height: 50px; width:60px; opacity: 0.2; border-radius: 10px"
							v-else
						></div>
						<span class="ml-1">{{ data.item.libelle | toSubtr }}</span>
					</div>
				</template>

				<template #cell(prix)="data">
					{{ formatter.format(data.item.prix_vente) }}
				</template>

				<template #cell(date)="data">
					{{ format_date(data.item.created_at) }}
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
							:total-rows="catagolueData.length"
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
		</b-card>

		<b-modal
			id="modal-info"
			ok-only
			ok-variant="info"
			ok-title="Envoyer"
			modal-class="modal-info"
			centered
			title="Envoyer un catalogue"
			@ok="generatePDF"
		>
			<div class="row mb-1">
				<div
					v-if="selected.length === 0"
					class="col-12 p-1 rounded alert-danger text-center"
				>
					<span class="p-0 pl-1 font-weight-bold text-danger h7"
						>Vous devez sélectionner un ou plusieurs articles.</span
					>
					<span class="p-0 pl-1 font-weight-bold text-danger h6">⚠️</span>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="Destinataire" label-for="entreprise-devise">
						<v-select
							multiple
							v-model="selectedClient"
							label="title"
							:options="clients"
						/>
						<small
							:class="valideDestinataire ? 'block' : 'none'"
							class="text-danger"
						>
							Vous devez renseigner le ou les destinataires
						</small>
					</b-form-group>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-12">
					<label for="">Message</label>
					<b-form-textarea
						id="textarea"
						v-model="message"
						placeholder="Accompagner le catalogue d'un message ?"
						rows="5"
						max-rows="6"
					>
					</b-form-textarea>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
import {
	BTable,
	BFormCheckbox,
	BButton,
	BCard,
	BRow,
	BCol,
	BAvatar,
	BBadge,
	BFormGroup,
} from 'bootstrap-vue';
import URL from '@/views/pages/request';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import Ripple from 'vue-ripple-directive';
import vSelect from 'vue-select';
import CryptoJS from 'crypto-js';
import { reactive, ref } from '@vue/composition-api';
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue';
import QLoaderTable from '@/components/__partials/loaders/qLoaderTable.vue';

export default {
	components: {
		BFormGroup,
		vSelect,
		CryptoJS,
		numeral,
		moment,
		axios,
		BTable,
		BButton,
		BFormCheckbox,
		BCard,
		BRow,
		BCol,
		BBadge,
		BAvatar,
		QLoaderTable,
	},
	directives: {
		Ripple,
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
	data() {
		return {
			message: '',
			valideDestinataire: false,
			erreur: '',
			marche: false,
			selectedClient: '',
			list_client: '',
			clients: [],
			wagon: [],
			selected: [],
			articles: '',
			devise: '',
			fields: [
				'show_details',
				'id',
				{ key: 'avatar', label: 'Image' },
				'libelle',
				'prix_achat',
				'prix_vente',
				'date_creation',
			],
			items: [],
			status: [
				{
					1: 'Current',
					2: 'Professional',
					3: 'Rejected',
					4: 'Resigned',
					5: 'Applied',
				},
				{
					1: 'light-primary',
					2: 'light-success',
					3: 'light-danger',
					4: 'light-warning',
					5: 'light-info',
				},
			],
		};
	},

	setup(props, { root }) {
		const state = reactive({
			perPage: 30,
			filter: '',
			currentPage: 1,
			success: false,
			empty: false,
			warring: false,
			countArticle: 0,
			countSelected: 0,
		});
		const status__check = ref('not_accepted');
		const tableColumns = ref([
			{
				key: 'all',
				label: 'Tout',
			},
			{
				key: 'items',
				label: 'Articles',
			},
			{
				key: 'prix',
				label: 'Prix',
			},
			{
				key: 'date',
				label: "Dates d'ajout",
			},
		]);
		const catagolueData = ref([]);
		const perPageOptions = ref([30, 50, 100, 150, 200]);

		const formatter = new Intl.NumberFormat('de-DE', {
			currency: 'XOF',
			style: 'currency',
			minimumFractionDigits: 2,
		});
		return {
			state,
			perPageOptions,
			tableColumns,
			status__check,

			catagolueData,
			formatter,
		};
	},

	async mounted() {
		document.title = 'Catalogue - Ediqia';
		this.message =
			'Madame/Monsieur.\nDans   le   but   d’offrir   une   solution   de   gestion   complèted’optimisation   et   de   simplifier   la   facturation   et d’automatiser votre comptabilité à travers une interface simple et intuitive, nous avons le plaisir de vous faire parvenir notre catalogue.\nVous y découvrirez toutes nos offres pour l’année ' +
			new Date().getFullYear();
		try {
			this.devise = localStorage.getItem('devise');
			await axios
				.get(URL.ARTICLE_LIST)
				.then((response) => {
					this.returnData = response;
					this.articles = response.data[1];
					this.catagolueData = this.articles;
					this.state.countArticle = this.catagolueData.length;

					this.state.countArticle === 0
						? (this.state.empty = true)
						: (this.state.success = true);

					let i = 1;
					for (let index = 0; index < this.articles.length; index++) {
						let image = this.articles[index].media;
						if (!image) {
							image = require('@/assets/images/avatars/ediqiaprod.jpg');
						}
						let elt = {
							id: this.articles[index].id,
							// eslint-disable-next-line global-require
							avatar: image,
							libelle:
								this.articles[index].libelle.charAt(0).toUpperCase() +
								this.articles[index].libelle.slice(1),
							prix_achat:
								String(this.formatNumber(this.articles[index].prix_achat)) +
								' ' +
								this.devise,
							prix_vente:
								String(this.formatNumber(this.articles[index].prix_vente)) +
								' ' +
								this.devise,
							date_creation: this.format_date(this.articles[index].created_at),
						};
						i++;
						this.items.push(elt);
					}
					this.listClient();
				})
				.catch((error) => {
					console.log(error);
					this.state.warring = true;
					this.state.success = false;
				});
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		async listClient() {
			try {
				await axios
					.get(URL.CLIENT_LIST)
					.then((response) => {
						this.reponseData = response;
						this.list_client = response.data[0];
					})
					.catch((error) => {
						console.log(error);
					});
				for (let index = 0; index < this.list_client.length; index++) {
					this.clients.push({
						title:
							this.list_client[index].nom +
							' ' +
							this.list_client[index].prenoms,
						id: this.list_client[index].id,
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
		async generatePDF(bvModalEvt) {
			var ids = [];
			for (let index = 0; index < this.selectedClient.length; index++) {
				ids.push(this.selectedClient[index].id);
			}
			if (ids.length == 0 || this.selected.length === 0) {
				if (ids.length == 0) {
					this.valideDestinataire = true;
				}
				bvModalEvt.preventDefault();
				this.handleSubmit();
			} else {
				this.marche = true;
				for (let index = 0; index < this.selected.length; index++) {
					for (let indexArt = 0; indexArt < this.items.length; indexArt++) {
						if (this.selected[index] == this.items[indexArt].id) {
							this.wagon.push(this.items[indexArt]);
						}
					}
				}
				const data = {
					articleList: this.selected,
					client_id: ids,
					message: this.message,
				};
				try {
					await axios.post(URL.CATALOGUE, data).then((response) => {
						this.returnData = response;
						this.marche = false;
						if (this.returnData) {
							this.showToast('info', 'top-right', 'Catalogue envoyer!');

							this.selected = [];
							this.selectedClient = '';
							this.state.countSelected = 0;
						}
					});
				} catch (error) {
					console.log(error.type);
				}
			}
		},
		showToast(variant, position, text) {
			this.$toast(
				{
					component: ToastificationContentVue,
					props: {
						title: 'Succès',
						icon: 'InfoIcon',
						text: text,
						variant,
					},
				},
				{
					position,
				}
			);
		},
		selection() {
			this.status__check = 'not_accepted';
			this.state.countSelected = this.selected.length;
		},
		selection_all() {
			if (this.selected.length === this.catagolueData.length) {
				this.selected = [];
				this.status__check = 'not_accepted';
				this.state.countSelected = this.selected.length;
			} else {
				const dat = [];
				this.status__check = 'accepted';
				for (let i = 0; i < this.catagolueData.length; i++) {
					const el = this.catagolueData[i];
					dat.push(el.id);
				}

				this.selected = dat;
				this.state.countSelected = this.selected.length;
			}
		},
		format_date(value) {
			if (value) {
				return moment(String(value)).format('DD-MM-YYYY');
			}
		},
		formatNumber(value) {
			return numeral(value).format('0,0');
		},
	},
};
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.none {
	display: none;
}
.block {
	display: inline-block;
}
</style>
