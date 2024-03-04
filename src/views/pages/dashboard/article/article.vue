<template>
	<div class="position-relative table-responsive table-base">
		<!-- Modal pour ajouter une nouvelle taxe -->

		<b-modal
			id="modal-login"
			ok-only
			size="login"
			cancel-variant="outline-secondary"
			ok-title="Ajouter"
			cancel-title="Annuler"
			centered
			title="Ajouter un nouvel article"
			@ok="handleOk"
		>
			<b-form>
				<!-- Libelle -->

				<b-form-group label-for="register-nom">
					<label class="red">Libellé</label>
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="register-nom"
							@input="validateLibelle"
							v-model="libelle"
							name="register-nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Libellé de l'article"
						/>

						<small
							:class="valideLibelle ? 'block' : 'none'"
							class="text-danger"
						>
							Vous devez renseigner le libellé du produit
						</small>
					</validation-provider>
				</b-form-group>

				<span v-if="newcategorie">
					<label class="red">Catégorie de l'article</label>

					<div class="row d-flex mb-1">
						<div class="col-11 mr-0 pr-0">
							<validation-provider
								#default="{ errors }"
								name="newcategorieValue"
							>
								<b-form-input
									id="register-nom"
									@input="validateNewCategorie"
									v-model="newcategorieValue"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Libellé de l'article"
								/>

								<small
									:class="valideNewCategorie ? 'block' : 'none'"
									class="text-danger"
								>
									Vous devez renseigner une catgégorie ou en choisir une
								</small>
							</validation-provider>
						</div>

						<div class="col-1 m-auto pl-1">
							<feather-icon
								@click="revenir"
								icon="XCircleIcon"
								class="caticon"
								style="font-size: 38px;"
							/>
						</div>
					</div>
				</span>
				<b-form-group v-else>
					<label class="red">Catégorie de l'article</label>
					<v-select
						v-model="selectedCategorie"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						:options="categories"
						input-id="invoice-data-client"
						:clearable="false"
					>
						<template #list-header>
							<li
								v-b-toggle.sidebar-invoice-add-new-customer
								@click="addCategorie"
								class="add-new-client-header d-flex align-items-center my-50"
							>
								<feather-icon icon="PlusIcon" size="16" />

								<span class="align-middle ml-25 addcat"
									>Ajouter une nouvelle catégorie</span
								>
							</li>
						</template>
					</v-select>
				</b-form-group>

				<b-form-group>
					<label class="red">Type de produit</label>
					<v-select
						v-model="selectedType"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="title"
						:options="optionType"
					/>
				</b-form-group>

				<small :class="valideType ? 'block' : 'none'" class="text-danger">
					Vous devez renseigner votre status
				</small>

				<b-row>
					<b-col>
						<!-- Poids -->

						<label for="">Poids</label>

						<b-form-group label-for="register-nom">
							<validation-provider #default="{ errors }" name="poids" rules="">
								<b-form-input
									id="register-nom"
									@input="validatePoids"
									v-model="poids"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Poids du produit"
								/>

								<small
									:class="validePoids ? 'block' : 'none'"
									class="text-danger"
								>
									Cette valeur est incorrecte
								</small>
							</validation-provider>
						</b-form-group>
					</b-col>

					<b-col>
						<!-- Unité -->

						<b-form-group>
							<label for="">Unité de mesure</label>

							<v-select
								v-model="selectedUnite"
								:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
								label="title"
								:options="optionUnite"
							/>

							<small
								:class="valideUnite ? 'block' : 'none'"
								class="text-danger"
							>
								Vous devez renseigner l'unité de mesure'
							</small>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col>
						<b-form-group label-for="register-nom" label="Prix d'achat">
							<validation-provider #default="{ errors }" name="prix_achat">
								<b-form-input
									id="register-nom"
									@input="validatePrixAchat"
									v-model="prix_achat"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Prix d'achat"
								/>
								<small
									:class="valideNumberPrixAchat ? 'block' : 'none'"
									class="text-danger"
								>
									Cette valeur est incorrecte
								</small>
							</validation-provider>
						</b-form-group>
					</b-col>

					<b-col>
						<b-form-group label-for="register-nom">
							<validation-provider
								#default="{ errors }"
								name="prix_achat"
								rules="required"
							>
								<label class="red">Prix de vente</label>
								<b-form-input
									id="register-nom"
									@input="validatePrixVente"
									v-model="prix_vente"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="prix de vente"
								/>

								<small
									:class="validePrixVente ? 'block' : 'none'"
									class="text-danger"
								>
									Vous devez renseigner le prix de vente
								</small>

								<small
									:class="valideNumberPrixVente ? 'block' : 'none'"
									class="text-danger"
								>
									Cette valeur est incorrecte
								</small>
							</validation-provider>
						</b-form-group>
					</b-col>
				</b-row>

				<!-- lien video -->

				<b-form-group label-for="register-nom" label="Lien de vidéo">
					<validation-provider #default="{ errors }" name="movieLink">
						<b-form-input
							id="register-nom"
							@input="validateMovie"
							v-model="movie"
							name="register-nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Lien d'une vidéo"
						/>

						<small :class="valideMovie ? 'block' : 'none'" class="text-danger">
							Ceci n'est pas un lien
						</small>
					</validation-provider>
				</b-form-group>

				<div>
					<!-- Styled -->

					<label for="">Image du produit</label>

					<b-form-file
						class="text-center mb-1"
						v-model="file"
						@change="processFile($event)"
						placeholder="Images du produit"
						drop-placeholder="Drop file here..."
						multiple
					/>
				</div>

				<b-form-group>
					<label for="taxeValue">Description :</label>

					<b-form-textarea
						id="textarea"
						v-model="description"
						placeholder="Entrer les details de l'article ici"
						rows="5"
						max-rows="6"
					>
					</b-form-textarea>
				</b-form-group>
			</b-form>
		</b-modal>

		<!-- Modal pour mettre à jour une taxe déjà ajouté    -->

		<b-modal
			id="modal-update"
			cancel-variant="outline-secondary"
			ok-title="Modifier"
			cancel-title="Annuler"
			centered
			title="Modifier un article"
			@ok="updateArticle"
		>
			<b-form>
				<!-- Libelle -->

				<b-form-group label="Libellé" label-for="register-nom">
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="register-nom"
							@input="validateEditLibelle"
							v-model="edit_libelle"
							name="register-nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Libellé de l'article"
						/>

						<small
							:class="valideEditLibelle ? 'block' : 'none'"
							class="text-danger"
						>
							Vous devez renseigner le libellé du produit
						</small>
					</validation-provider>
				</b-form-group>

				<span v-if="newcategorie">
					<label class="red">Catégorie de l'article</label>

					<div class="row d-flex mb-1">
						<div class="col-11 mr-0 pr-0">
							<validation-provider
								#default="{ errors }"
								name="newcategorieValue"
							>
								<b-form-input
									id="register-nom"
									@input="validateNewCategorie"
									v-model="newcategorieValue"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Libellé de l'article"
								/>

								<small
									:class="valideNewCategorie ? 'block' : 'none'"
									class="text-danger"
								>
									Vous devez renseigner une catgégorie ou en choisir une
								</small>
							</validation-provider>
						</div>

						<div class="col-1 m-auto pl-1">
							<feather-icon
								@click="revenir"
								icon="XCircleIcon"
								class="caticon"
								style="font-size: 38px;"
							/>
						</div>
					</div>
				</span>
				<b-form-group v-else>
					<label class="red">Catégorie de l'article</label>
					<v-select
						v-model="selectedCategorie"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						:options="categories"
						input-id="invoice-data-client"
						:clearable="false"
					>
						<template #list-header>
							<li
								v-b-toggle.sidebar-invoice-add-new-customer
								@click="addCategorie"
								class="add-new-client-header d-flex align-items-center my-50"
							>
								<feather-icon icon="PlusIcon" size="16" />

								<span class="align-middle ml-25 addcat"
									>Ajouter une nouvelle catégorie</span
								>
							</li>
						</template>
					</v-select>
				</b-form-group>
				<b-form-group label="Type de produit">
					<v-select
						v-model="selectedEditType"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="title"
						:options="optionEditType"
					/>
				</b-form-group>

				<small :class="valideType ? 'block' : 'none'" class="text-danger">
					Vous devez renseigner votre status
				</small>

				<b-row>
					<b-col>
						<!-- Poids -->

						<label for="">Poids</label>

						<b-form-group label-for="register-nom">
							<validation-provider #default="{ errors }" name="poids" rules="">
								<b-form-input
									id="register-nom"
									@input="validateEditPoids"
									v-model="edit_poids"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Poids du produit"
								/>

								<small
									:class="valideEditPoids ? 'block' : 'none'"
									class="text-danger"
								>
									Cette valeur est incorrecte
								</small>
							</validation-provider>
						</b-form-group>
					</b-col>

					<b-col>
						<!-- Unité -->

						<b-form-group>
							<label for="">Unité de mesure</label>

							<v-select
								v-model="selectedUnite"
								:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
								label="title"
								:options="optionUnite"
							/>

							<small
								:class="valideUnite ? 'block' : 'none'"
								class="text-danger"
							>
								Vous devez renseigner l'unité de mesure'
							</small>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col>
						<b-form-group label-for="register-nom" label="Prix d'achat">
							<validation-provider
								#default="{ errors }"
								name="prix_achat"
								rules="required"
							>
								<b-form-input
									id="register-nom"
									v-model="edit_prix_achat"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Prix d'achat"
								/>
							</validation-provider>
						</b-form-group>
					</b-col>

					<b-col>
						<b-form-group label-for="register-nom" label="Prix de vente">
							<validation-provider
								#default="{ errors }"
								name="prix_achat"
								rules="required"
							>
								<b-form-input
									id="register-nom"
									@input="validateEditPrixVente"
									v-model="edit_prix_vente"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="prix de vente"
								/>

								<small
									:class="valideEditPrixVente ? 'block' : 'none'"
									class="text-danger"
								>
									Vous devez renseigner le prix de vente
								</small>

								<small
									:class="valideEditNumberPrixVente ? 'block' : 'none'"
									class="text-danger"
								>
									Cette valeur est incorrecte
								</small>
							</validation-provider>
						</b-form-group>
					</b-col>
				</b-row>

				<!-- lien video -->

				<b-form-group label-for="register-nom" label="Lien de vidéo">
					<validation-provider #default="{ errors }" name="movieLink">
						<b-form-input
							id="register-nom"
							@input="validateEditMovie"
							v-model="edit_movie"
							name="register-nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Lien d'une vidéo"
						/>

						<small
							:class="valideEditMovie ? 'block' : 'none'"
							class="text-danger"
						>
							Ceci n'est pas un lien
						</small>
					</validation-provider>
				</b-form-group>

				<div>
					<!-- Styled -->

					<label for="">Image du produit</label>

					<b-form-file
						class="text-center mb-1"
						v-model="file"
						@change="processFile($event)"
						placeholder="Images du produit"
						drop-placeholder="Drop file here..."
						multiple
					/>
				</div>

				<b-form-group>
					<label for="textarea">Description</label>

					<b-form-textarea
						id="textarea"
						v-model="description"
						placeholder="Entrer les details de l'article ici"
						rows="5"
						max-rows="6"
					>
					</b-form-textarea>
				</b-form-group>
			</b-form>
		</b-modal>

		<!-- Tableau pour afficher les taxes -->

		<!-- <div class="tableau">



            <table class="table position-relative table-card table-bordered mt-5 pt-3 bg-white">



                <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">



                    Ajouter



                </b-button>



                <thead>



                    <tr class="text-center">



                        <th class="align-middle" scope="col-1">#</th>



                        <th class="align-middle" scope="col-3">Libelle</th>



                        <th class="align-middle" scope="col-5">Type</th>



                        <th class="align-middle" scope="col-3">Prix de d'achat</th>



                        <th class="align-middle" scope="col-3">Prix de vente</th>



                        <th class="align-middle" scope="col-3">Poids</th>



                        <th class="align-middle" scope="col-3">Action</th>



                    </tr>



                </thead>



                <tbody id="tbody">



                    <tr class="text-center" id="table_line" v-for="(article, index) in articles" :key="article.id">



                        <th class="align-middle col-1" scope="row" >{{ index + 1 }}</th>



                        <td class="col-6">



                            <p>{{ article.libelle }}</p>



                        </td>



                        <td class="col-2">



                            <p>{{ article.type }}</p>



                        </td>



                        <td class="col-6">



                            <p>{{ article.prix_achat }}</p>



                        </td>



                        <td class="col-6">



                            <p>{{ article.prix_vente }}</p>



                        </td>



                        <td class="col-6">



                            <p>{{ article.poids }}</p>



                        </td>



                        <td class="col-3">



                            <div class="w-50 mx-auto d-flex justify-content-around">



                                <b-button variant="gradient-primary" class="btn-icon mr-2" v-b-modal.modal-update @click="update(index)">



                                    <feather-icon icon="Edit3Icon" />



                                </b-button>



                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(index)">



                                    <feather-icon icon="Trash2Icon" />



                                </b-button>



                            </div>



                        </td>



                    </tr>



                </tbody>



            </table>



        </div> -->

		<b-card no-body class="px-2">
			<!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvelle taxe -->

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

					<b-button variant="relief-success bg-success" v-b-modal.modal-login>
						Créer un nouvel article
					</b-button>
				</b-col>

				<!-- Search -->

				<b-col cols="12" md="6" class="mt-1">
					<div class="d-flex align-items-center justify-content-end">
						<b-form-input
							v-model="filtreArticle"
							class="d-inline-block mr-1"
							placeholder="Rechercher par le nom de l'article, valeur..."
						/>
					</div>
				</b-col>
			</b-row>

			<b-row class="mt-2">
				<div class="col-12 text-right">
					<button class="btn btn-warning mr-1 w-25" @click="catalogue">
						Catalogue
					</button>
				</div>
			</b-row>

			<!-- Le tableau affichant les taxes -->

			<b-table
				hover
				responsive
				primary-key="id"
				:per-page="perPage"
				:current-page="currentPage"
				:items="articles"
				:fields="tableColumns"
				:filter="filtreArticle"
				show-empty
				empty-text="Aucun article enregistré"
				class="bg-white mt-2 text-center"
			>
				<template #cell(prix_achat)="data">
					<p>{{ formatMoney(data.item.prix_achat) }}</p>
				</template>

				<template #cell(prix_vente)="data">
					<p>{{ formatMoney(data.item.prix_vente) }}</p>
				</template>

				<template #cell(poids)="data">
					<p>{{ data.item.poids }} kg</p>
				</template>

				<!-- Bouton d'action -->

				<template #cell(actions)="data">
					<b-button
						variant="gradient-primary"
						class="btn-icon mr-2"
						v-b-modal.modal-update
						@click="update(data.item)"
					>
						<feather-icon icon="Edit3Icon" />
					</b-button>

					<b-button
						variant="gradient-danger"
						class="btn-icon"
						@click="confirmText(data.item)"
					>
						<feather-icon icon="Trash2Icon" />
					</b-button>
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
							:total-rows="articleTotal"
							:per-page="perPage"
							first-number
							last-number
							class="mb-0 mt-1 mt-sm-0"
							prev-class="prev-item"
							next-class="next-item"
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
	</div>
</template>

<script>
import {
	BRow,
	BCol,
	BFormFile,
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

import { required, email } from '@validations';

import { ValidationProvider, ValidationObserver } from 'vee-validate';

import vSelect from 'vue-select';

import URL from '@/views/pages/request';

import axios from 'axios';

import { formatDate } from '@/@core/utils/filter';

export default {
	components: {
		vSelect,

		BRow,

		BFormFile,

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

		// validations

		ValidationProvider,

		ValidationObserver,
	},

	directives: {
		Ripple,
	},

	data() {
		return {
			required,

			email,

			valideLibelle: false,

			libelle: '',

			edit_libelle: '',

			valideEditLibelle: false,

			optionType: ['Service', 'Produit'],

			selectedType: 'Quel type de produits est ce ?',

			valideType: false,

			optionEditType: ['Service', 'Produit'],

			selectedEditType: '',

			categories: [],

			selectedCategorie: '',

			newcategorie: false,

			valideNewCategorie: '',

			newcategorieValue: '',

			categoriesBrute: '',

			id_categorie: '',

			valideUnite: false,

			optionUnite: ['Kg', 'Unité', 'Litre'],

			selectedUnite: 'Kg',

			validePoids: false,

			poids: '',

			valideEditPoids: false,

			edit_poids: '',

			prix_achat: '',

			validePrixAchat: false,

			valideNumberPrixAchat: false,

			edit_prix_achat: '',

			valideEditPrixAchat: false,

			valideEditNumberPrixAchat: false,

			prix_vente: '',

			validePrixVente: false,

			valideNumberPrixVente: false,

			edit_prix_vente: '',

			valideEditPrixVente: false,

			valideEditNumberPrixVente: false,

			valideMovie: false,

			movie: '',

			valideEditMovie: false,

			edit_movie: '',

			file: null,

			picture: '',

			pictures: [],

			description: '',

			edit_index: '',

			articles: [],

			articleUp: '',

			perPage: 3,

			currentPage: 1,

			articleTotal: 0,

			tableColumns: [
				{ key: 'libelle', label: 'Code', sortable: true },

				{ key: 'type', sortable: true },

				{ key: 'prix_achat', label: "Prix d'achat", sortable: true },

				{ key: 'prix_vente', label: 'Prix de vente', sortable: true },

				{ key: 'poids', label: 'Poids (Kg, L)', sortable: true },

				{ key: 'actions' },
			],

			filtreArticle: '',

			perPageOptions: [3, 5, 10, 30],
		};
	},

	async mounted() {
		document.title = 'Article - Ediqia';
		try {
			await axios
				.get(URL.CATEGORIE_LIST)

				.then((response) => {
					this.returnData = response;

					this.categoriesBrute = response;

					// console.log(response.data);
				})

				.catch((error) => {
					console.log(error.response.data.errors);
				});

			for (let index = 0; index < this.returnData.data.length; index++) {
				this.categories.push(this.returnData.data[index].libelle);
			}

			this.selectedCategorie = this.categories[0];

			await axios

				.get(URL.ARTICLE_LIST)

				.then((response) => {
					this.returnData = response;

					this.articleTotal = response.data[0].length;
				})

				.catch((error) => {
					console.log(error.response.data.errors);
				});
			for (let index = 0; index < this.returnData.data[0].length; index++) {
				this.articles.push(this.returnData.data[0][index]);
			}
		} catch (error) {
			console.log(error);
		}
	},

	methods: {
		catalogue() {
			this.$router.push('/catalogues');
		},

		// FUNCTION TO CONVERT NUMBER INTO CURRENCY

		formatMoney(num) {
			const formatter = new Intl.NumberFormat('ci-CI', {
				style: 'currency',

				currency: 'XOF',

				minimumFractionDigits: 2,
			});

			return formatter.format(num);
		},

		addCategorie() {
			this.newcategorie = true;
		},

		revenir() {
			this.newcategorie = false;
		},

		validateNewCategorie() {
			if (!this.newcategorieValue) {
				this.valideNewCategorie = true;
			}
		},

		// confirm texrt

		confirmText(item) {
			this.$swal({
				title: 'Êtes vous sûr?',

				text: 'Cet article sera supprimé définitivement !',

				icon: 'warning',

				showCancelButton: true,

				confirmButtonText: 'Oui',

				customClass: {
					confirmButton: 'btn btn-primary',

					cancelButton: 'btn btn-outline-danger ml-1',
				},

				buttonsStyling: false,
			}).then((result) => {
				if (result.value) {
					this.deleteArticle(item);
				}
			});
		},

		// top end

		topEnd() {
			this.$swal({
				position: 'top-end',

				icon: 'success',

				title: 'Article enregistrée avec succès',

				showConfirmButton: false,

				timer: 1500,

				customClass: {
					confirmButton: 'btn btn-primary',
				},

				buttonsStyling: false,
			});
		},

		validURL(str) {
			var pattern = new RegExp(
				'^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
					'(\\#[-a-z\\d_]*)?$',

				'i'
			); // fragment locator

			return !!pattern.test(str);
		},

		isDigit(str) {
			return /^\d+$/.test(str);
		},

		validateLibelle() {
			if (!this.libelle) {
				this.valideLibelle = true;
			} else {
				this.valideLibelle = false;
			}
		},

		validateEditLibelle() {
			if (!this.edit_libelle) {
				this.valideEditLibelle = true;
			} else {
				this.valideEditLibelle = false;
			}
		},

		validateType() {
			if (this.selectedType == 'Quel type de produits est ce ?') {
				this.valideType = true;
			} else {
				this.valideType = false;
			}
		},

		validatePoids() {
			if (this.poids && this.isDigit(this.poids) === false) {
				this.validePoids = true;
			} else {
				this.validePoids = false;
			}
		},

		validateEditPoids() {
			if (this.edit_poids && this.isDigit(this.edit_poids) === false) {
				this.valideEditPoids = true;
			} else {
				this.valideEditPoids = false;
			}
		},

		validatePrixAchat() {
			if (this.prix_achat && this.isDigit(this.prix_achat) === false) {
				this.valideNumberPrixAchat = true;
			} else {
				this.valideNumberPrixAchat = false;
			}
		},

		validateEditPrixAchat() {
			if (
				this.edit_prix_achat &&
				this.isDigit(this.edit_prix_achat) === false
			) {
				this.valideEditNumberPrixAchat = true;
			} else {
				this.valideEditNumberPrixAchat = false;
			}
		},

		validatePrixVente() {
			if (!this.prix_vente) {
				this.validePrixVente = true;
			} else {
				this.validePrixVente = false;
			}

			if (this.prix_vente && this.isDigit(this.prix_vente) === false) {
				this.valideNumberPrixVente = true;
			} else {
				this.valideNumberPrixVente = false;
			}
		},

		validateEditPrixVente() {
			if (!this.edit_prix_vente) {
				this.valideEditPrixVente = true;
			} else {
				this.valideEditPrixVente = false;
			}

			if (
				this.edit_prix_vente &&
				this.isDigit(this.edit_prix_vente) === false
			) {
				this.valideEditNumberPrixVente = true;
			} else {
				this.valideEditNumberPrixVente = false;
			}
		},

		validateMovie() {
			if (this.movie && !this.validURL(this.movie)) {
				this.valideMovie = true;
			} else {
				this.valideMovie = false;
			}
		},

		validateEditMovie() {
			if (this.edit_movie && !this.validURL(this.edit_movie)) {
				this.valideEditMovie = true;
			} else {
				this.valideEditMovie = false;
			}
		},

		processFile(event) {
			this.picture = event.target.files[0];

			if (event.target.files.length !== 0) {
				console.log(this.picture);
			}

			const data = new formatDate();
		},

		// processFile(event) {

		//     this.pictures = event.target.files;

		//     if (!picture.length) {

		//         return false;

		//     }

		//     for (let i = 0; i < picture.length; i++) {

		//         this.pictures.push(picture[i]);

		//     }

		//     console.log(this.pictures);

		// },

		//             this.attachments.forEach(file => {

		//   this.formImage.append("image[]", file)

		async handleOk(bvModalEvt) {
			try {
				if (this.newcategorie) {
					this.validateNewCategorie();
				}

				this.validateLibelle();

				this.validateType();

				this.validatePrixAchat();

				this.validatePrixVente();

				this.validatePoids();

				this.validateMovie();

				if (
					this.valideLibelle ||
					this.valideType ||
					this.valideMovie ||
					this.validePoids ||
					this.validePrixAchat ||
					this.validePrixVente ||
					this.valideNewCategorie
				) {
					bvModalEvt.preventDefault();

					this.handleSubmit();
				} else {
					if (this.selectedType == 'Quel type de produits est ce ?') {
						this.selectedType = '';
					} else {
						this.selectedType = this.selectedType;
					}

					const pic = new FormData();

					// const picture = new FormData();

					if (this.newcategorie === false) {
						for (
							let index = 0;
							index < this.categoriesBrute.data.length;
							index++
						) {
							if (
								this.selectedCategorie ==
								this.categoriesBrute.data[index].libelle
							) {
								this.id_categorie = this.categoriesBrute.data[index].id;
							}
						}

						pic.append('action', 'ancien');

						pic.append('category_id', this.id_categorie);
					} else {
						pic.append('action', 'nouveau');

						pic.append('categorie', this.newcategorieValue);

						this.newcategorie = false;

						this.newcategorieValue = '';
					}

					// picture.append("image", this.picture);

					pic.append('libelle', this.libelle);

					pic.append('type', this.selectedType);

					pic.append('prix_vente', this.prix_vente);

					pic.append('description', this.description);

					pic.append('prix_achat', this.prix_achat);

					pic.append('poids', this.poids);

					pic.append('lien_video', this.movie);

					pic.append('image', this.picture);

					// console.log(this.pictures[0])

					//   for (let i = 0; i < this.pictures.length; i++) {

					//     picture.append(`${image[i]}`, this.pictures[i])

					// }

					const data = {
						libelle: this.libelle,

						type: this.selectedType,

						prix_vente: this.prix_vente,

						description: this.description,

						prix_achat: this.prix_achat,

						poids: this.poids,

						lien_video: this.movie,
					};

					const config = {
						headers: {
							Accept: 'application/json',

							'Content-Type': 'multipart/form-data',
						},
					};

					await axios.post(URL.ARTICLE_CREATE, pic, config).then((response) => {
						this.userData = response.data;

						this.articles.push(data);
						console.log(data);
					});

					console.log(this.pictures);

					console.log(typeof this.pictures, 'ytuy');

					console.log(this.categories);
				}

				this.libelle = '';

				this.selectedType = 'Quel type de produits est ce ?';

				this.prix_vente = '';

				this.description = '';

				this.prix_achat = '';

				this.poids = '';

				this.movie = '';

				this.description = '';

				this.categories = [];
				await axios
					.get(URL.CATEGORIE_LIST)

					.then((response) => {
						this.returnData = response;

						this.categoriesBrute = response;

						// console.log(response.data);
					})

					.catch((error) => {
						console.log(error.response.data.errors);
					});

				for (let index = 0; index < this.returnData.data.length; index++) {
					this.categories.push(this.returnData.data[index].libelle);
				}
				this.topEnd();
			} catch (error) {
				console.log(error);
			}
		},

		deleteArticle(item) {
			try {
				const id = {
					id: item.id,
				};

				axios

					.post(URL.ARTICLE_DESTROY, id)

					.then((response) => {
						response.data;

						axios
							.get(URL.ARTICLE_LIST)
							.then((res) => {
								this.articles = res.data[0];

								this.articleTotal = response.data[0].length;
							})
							.catch((error) => {
								console.log(error.response.data.errors);
							});
					})

					.catch((error) => {
						if (error.response) {
							console.log(error.response.data);
						}
					});
			} catch (error) {
				console.log(error.type);
			}
		},

		update(item) {
			this.articleUp = item;

			this.edit_libelle = this.articleUp.libelle;

			this.selectedEditType = this.articleUp.type;

			this.edit_poids = this.articleUp.poids;

			this.edit_prix_achat = this.articleUp.prix_achat;

			this.edit_prix_vente = this.articleUp.prix_vente;

			this.edit_movie = this.articleUp.lien_video;

			this.edit_index = this.articles.findIndex((el) => el.id === item.id);

			this.selectedCategorie = this.articleUp.parametre.libelle;
			console.log(this.selectedCategorie);
		},

		updateArticle(bvModalEvt) {
			const index = this.edit_index;
			let action = '';
			let category_id;
			let categorie;
			if (this.newcategorie === false) {
				for (let index = 0; index < this.categoriesBrute.data.length; index++) {
					if (
						this.selectedCategorie == this.categoriesBrute.data[index].libelle
					) {
						this.id_categorie = this.categoriesBrute.data[index].id;
					}
				}
				action = 'ancien';
				category_id = this.id_categorie;
			} else {
				categorie = this.newcategorieValue;
				action = 'nouveau';

				this.newcategorie = false;

				this.newcategorieValue = '';
			}
			// console.log(action, categorie, category_id)

			if (
				this.articles[index].libelle != this.edit_libelle ||
				this.articles[index].type != this.selectedEditType ||
				this.articles[index].prix_vente != this.edit_prix_vente ||
				this.articles[index].description != this.edit_description ||
				this.articles[index].prix_achat != this.edit_prix_achat ||
				this.articles[index].poids != this.edit_poids ||
				this.articles[index].lien_video != this.edit_lien_video ||
				this.articles[index].description != this.edit_description ||
				this.articles[index].parametre.libelle != this.selectedCategorie
			) {
				this.validateEditLibelle();

				this.validateEditPrixAchat();

				this.validateEditPrixVente();

				this.validateEditPoids();

				this.validateEditMovie();

				if (
					this.valideEditLibelle ||
					this.valideEditMovie ||
					this.valideEditPoids ||
					this.valideEditPrixAchat ||
					this.valideEditPrixVente
				) {
					bvModalEvt.preventDefault();
				} else {
					this.$swal({
						title: 'Êtes vous sûr de vouloir enregistrer',

						text: 'Les modificiations seront prises en compte',

						icon: 'warning',

						showCancelButton: true,

						confirmButtonText: 'Oui',

						customClass: {
							confirmButton: 'btn btn-primary',

							cancelButton: 'btn btn-outline-danger ml-1',
						},

						buttonsStyling: false,
					}).then((result) => {
						if (result.value) {
							try {
								const data = {
									id: this.articleUp.id,

									libelle: this.edit_libelle,

									type: this.selectedEditType,

									prix_vente: this.edit_prix_vente,

									description: this.edit_description,

									prix_achat: this.edit_prix_achat,

									poids: this.edit_poids,

									lien_video: this.edit_movie,

									description: this.edit_description,
									action: action,
									category_id: category_id,
									categorie: categorie,
								};
								// console.log(data)
								axios

									.post(URL.ARTICLE_UPDATE, data)

									.then((response) => {
										response.data;

										axios
											.get(URL.ARTICLE_LIST)
											.then((res) => {
												this.articles = res.data[0];

												this.articleTotal = response.data[0].length;
											})
											.catch((error) => {
												console.log(error.response.data.errors);
											});
									})

									.catch((error) => {
										if (error.response) {
											console.log(error.response.data);
										}
									});

								this.articles[index].libelle = this.edit_libelle;

								this.articles[index].type = this.selectedEditType;

								this.articles[index].prix_vente = this.edit_prix_vente;

								this.articles[index].description = this.edit_description;

								this.articles[index].prix_achat = this.edit_prix_achat;

								this.articles[index].poids = this.edit_poids;

								this.articles[index].lien_video = this.edit_lien_video;

								this.articles[index].description = this.edit_description;
							} catch (error) {
								console.log(error.type);
							}
						}
					});
				}
			}
		},
	},
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.add-new-client-header {
	padding: $options-padding-y $options-padding-x;

	color: $success;

	&:hover {
		background-color: rgba($success, 0.12);
	}
}

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

.caticon {
	color: #ff3333;
}

.caticon:hover {
	cursor: pointer;
}
.red:after {
	content: ' *';
	color: red;
}
</style>
