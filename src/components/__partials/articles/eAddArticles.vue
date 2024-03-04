<template>
	<b-modal
		id="e-add-new-article"
		cancel-variant="outline-secondary"
		ok-only
		ok-title="Ajouter"
		cancel-title="Annuler"
		centered
		title="Ajouter un nouveau produit"
		@ok="AddNewArticle"
	>
		<b-form>
			<!-- Libellé -->
			<b-form-group label="Libellé">
				<template #label> Libellé <span class="text-danger">*</span> </template>

				<b-form-input
					id="libelle"
					v-model="newArticle.libelle"
					name="libelle"
					placeholder="Libellé de l'article"
				/>
				<span
					class="text-danger"
					style="font-size: 12px"
					v-if="errorInput.path === 'libelle'"
				>
					{{ errorInput.message }}
				</span>
			</b-form-group>

			<!-- Categorie du produit -->
			<b-form-group label="Catégorie de l'article">
				<v-select
					v-if="addNewCategorie === false"
					v-model="newArticle.categorie"
					:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
					:options="categories"
					input-id="invoice-data-client"
					:clearable="false"
					label="libelle"
					placeholder="Choisir la catégorie du produit"
				>
					<template #list-header>
						<li
							v-b-toggle.sidebar-invoice-add-new-customer
							class="add-new-client-header d-flex align-items-center mx-1 py-1 text-primary"
							@click="addNewCategorie = true"
						>
							<feather-icon icon="PlusIcon" size="16" />
							<span class="align-middle ml-25 addcat"
								>Ajouter une nouvelle catégorie</span
							>
						</li>
					</template>
				</v-select>

				<div class="row d-flex mb-1" v-if="addNewCategorie === true">
					<div class="col-11 mr-0 pr-0">
						<validation-provider #default="{ errors }" name="newcategorieValue">
							<b-form-input
								id="register-nom"
								v-model="categorieNewValue"
								name="categorieNewValue"
								:state="errors.length > 0 ? false : null"
								placeholder="Ajouter un article"
							/>
						</validation-provider>
						<span
							class="text-danger"
							style="font-size: 12px"
							v-if="errorInput.path === 'categories'"
						>
							{{ errorInput.message }}
						</span>
					</div>

					<div class="col-1 m-auto pl-1">
						<feather-icon
							@click="addNewCategorie = false"
							icon="XCircleIcon"
							class="caticon"
							style="font-size: 38px;"
						/>
					</div>
				</div>
			</b-form-group>

			<!-- Type de produit -->
			<b-form-group label="Type de produit">
				<template #label>
					Type de produit <span class="text-danger">*</span>
				</template>
				<v-select
					v-model="newArticle.type"
					:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
					label="title"
					:options="optionType"
					placeholder="Renseigner le type du produit"
				/>
				<span class="text-danger" v-if="errorInput.path === 'type'">
					{{ errorInput.message }}
				</span>
			</b-form-group>

			<!-- Poids et unité -->
			<b-row>
				<b-col>
					<!-- Poids -->
					<b-form-group label="Poids" label-for="register-nom">
						<b-form-input
							id="register-nom"
							v-model="newArticle.poids"
							name="register-nom"
							placeholder="Poids du produit"
						/>
					</b-form-group>
				</b-col>
				<b-col>
					<!-- Unité -->
					<b-form-group label="Unité de mesure">
						<v-select
							v-model="newArticle.unite"
							:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
							label="title"
							:options="optionUnite"
						/>
					</b-form-group>
				</b-col>
			</b-row>

			<!-- Prix achat et Prix de vente -->
			<b-row>
				<b-col>
					<b-form-group label="Prix d'achat">
						<validation-provider
							#default="{ errors }"
							name="prix_achat"
							rules="required"
						>
							<b-form-input
								id="prix_achat"
								v-model="newArticle.prix_achat"
								name="prix_achat"
								:state="errors.length > 0 ? false : null"
								placeholder="Prix d'achat"
							/>
						</validation-provider>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group label-for="prix_vente" label="Prix de vente">
						<template #label>
							Prix de vente <span class="text-danger">*</span>
						</template>
						<validation-provider
							#default="{ errors }"
							name="prix_ventet"
							rules="required"
						>
							<b-form-input
								id="prix_vente"
								v-model="newArticle.prix_vente"
								name="prix_vente"
								:state="errors.length > 0 ? false : null"
								placeholder="Prix de vente"
							/>
						</validation-provider>
						<span class="text-danger" v-if="errorInput.path === 'prix_vente'">
							{{ errorInput.message }}
						</span>
					</b-form-group>
				</b-col>
			</b-row>

			<!-- lien video -->
			<b-form-group label-for="movie" label="Lien de vidéo">
				<b-form-input
					id="movie"
					v-model="newArticle.movie"
					name="movie"
					placeholder="Lien d'une vidéo"
				/>
			</b-form-group>

			<!-- Image du produit -->
			<div>
				<label for="">Image du produit</label>
				<b-form-file
					class="text-center mb-1"
					v-model="newArticle.file"
					@change="processFile2($event)"
					placeholder="Images du produit"
					drop-placeholder="Glisser un fichier ici..."
					multiple
				/>
			</div>

			<!-- Description du produit -->
			<b-form-group>
				<label for="taxeValue">Description </label>
				<b-form-textarea
					id="textarea"
					v-model="newArticle.description"
					placeholder="Entrer les details de l'article ici"
					rows="5"
					max-rows="6"
				>
				</b-form-textarea>
			</b-form-group>
		</b-form>

		<template #modal-footer="{ cancel }">
			<b-button v-if="state.loading === false" variant="" @click="cancel()">
				Annuel
			</b-button>
			<b-button
				:disabled="state.loading === true ? true : false"
				variant="primary"
				@click.stop.prevent="AddNewArticle"
			>
				<span v-if="state.loading === false">Ajouter</span>
				<b-spinner v-if="state.loading === true" label="Spinning"></b-spinner>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import vSelect from 'vue-select';
import axios from 'axios';
import URL from '@/views/pages/request';
import Ripple from 'vue-ripple-directive';

export default {
	components: {
		vSelect,
	},
	props: {
		categories: Array,
		getArticles: Function,
	},
	directives: {
		Ripple,
	},
	setup(props, { root }) {
		const optionUnite = ref(['Kg', 'Unité', 'Litre']);
		const optionType = ref(['Service', 'Produit']);
		const state = reactive({
			loading: false,
		});

		const addNewCategorie = ref(false);
		const categorieNewValue = ref('');
		const newArticle = reactive({
			libelle: '',
			categorie: '',
			type: '',
			poids: '',
			unite: '',
			prix_achat: '',
			prix_vente: '',
			movie: '',
			file: null,
			description: '',
		});

		const processFile2 = (event) => {
			newArticle.file = event.target.files[0];
			if (event.target.length !== 0) {
				console.log(newArticle.file);
			}
		};

		const errorInput = reactive({
			path: '',
			message: '',
		});

		// *****
		// ****
		// FUNCTION POUR AJOUT D'ARTICLE
		// ****
		// *****
		const AddNewArticle = async () => {
			console.log(newArticle.categorie);

			if (newArticle.libelle === '') {
				errorInput.path = 'libelle';
				console.log(newArticle.libelle === '', errorInput.path);
				errorInput.message = 'Veillez entrer un libellé';
			} else if (newArticle.type === '') {
				errorInput.path = 'type';
				errorInput.message = 'Séléction le type de produit';
			} else if (newArticle.prix_vente === '') {
				errorInput.path = 'prix_vente';
				errorInput.message = 'Veillez entrer un prix de vente valide';
			} else {
				state.loading = true;
				const config = {
					headers: {
						Accept: 'application/json',
					},
				};
				const data = new FormData();
				if (addNewCategorie.value === false) {
					const random = Math.random(9999999999);

					data.append('action', 'ancien');

					data.append('category_id', newArticle.categorie.id);
				} else {
					data.append('action', 'nouveau');

					data.append('categorie', categorieNewValue.value);
					props.categories.unshift(categorieNewValue.value);
					addNewCategorie.value = false;

					categorieNewValue.value = '';
				}
				data.append('image', newArticle.file);
				data.append('libelle', newArticle.libelle);
				data.append('type', newArticle.type);
				data.append('prix_vente', newArticle.prix_vente);
				data.append('description', newArticle.description);
				data.append('prix_achat', newArticle.prix_achat);
				data.append('poids', newArticle.poids);
				data.append('lien_video', newArticle.movie);
				await axios
					.post(URL.ARTICLE_CREATE, data, config)
					.then((response) => {
						if (response.data) {
							state.loading = false;

							root.$bvModal.hide('e-add-new-article');
							root
								.$swal({
									title: 'Succès !',
									text: 'Votre article a été enregistré avec succès',
									icon: 'success',
									confirmButtonText: 'Ok',
									customClass: {
										confirmButton: 'btn btn-primary',
									},

									buttonsStyling: false,
								})
								.then((result) => {
									if (result.value) {
										newArticle.libelle = '';
										newArticle.categorie = '';
										newArticle.type = '';
										newArticle.prix_vente = '';
										newArticle.description = '';
										newArticle.prix_achat = '';
										newArticle.poids = '';
										newArticle.movie = '';
										newArticle.unite = '';
									}
								});

							props.getArticles();
						}
					})
					.catch((error) => {
						state.loading = true;
						console.log(error.message);
					});
			}
		};

		return {
			optionUnite,
			optionType,
			errorInput,
			addNewCategorie,
			categorieNewValue,

			AddNewArticle,
			newArticle,
			processFile2,
			state,
		};
	},
};
</script>

<style scoped></style>
