<template>
	<b-modal
		id="e-add-new-categorie"
		cancel-variant="outline-secondary"
		ok-only
		ok-title="Ajouter"
		cancel-title="Annuler"
		centered
		title="Ajouter une nouvelle categorie"
		@ok="AddNewCategorie"
	>
		<b-form>
			<!-- Libellé -->
			<b-form-group label="Libellé">
				<template #label> Libellé <span class="text-danger">*</span> </template>

				<b-form-input
					id="libelle"
					v-model="newCategories.libelle"
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

			<!-- Description du produit -->
			<b-form-group>
				<label for="taxeValue">Description </label>
				<b-form-textarea
					id="textarea"
					v-model="newCategories.description"
					placeholder="Entrer les details de l'article ici"
					rows="5"
					max-rows="6"
				>
				</b-form-textarea>
			</b-form-group>
		</b-form>

		<template #modal-footer>
			<!-- <b-button v-if="state.loading === false" variant="" @click="cancel()">
				Annuel
			</b-button> -->
			<b-button
				:disabled="state.loading === true ? true : false"
				variant="primary"
				@click.stop.prevent="AddNewCategorie"
			>
				<span v-if="state.loading === false">Ajouter</span>
				<b-spinner v-if="state.loading === true" label="Spinning"></b-spinner>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api';
import vSelect from 'vue-select';
import axios from 'axios';
import URL from '@/views/pages/request';
import Ripple from 'vue-ripple-directive';
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue';
import qToast from '@/utils/qToast';

export default {
	components: {
		vSelect,
	},
	props: {},
	directives: {
		Ripple,
	},
	setup(props, { root }) {
		const state = reactive({
			loading: false,
		});
		const newCategories = reactive({
			libelle: '',
			description: '',
		});

		const errorInput = reactive({
			path: '',
			message: '',
		});

		// *****
		// ****
		// FUNCTION POUR AJOUT D'ARTICLE
		// ****
		// *****
		const AddNewCategorie = async () => {
			if (newCategories.libelle === '') {
				errorInput.path = 'libelle';
				errorInput.message = 'Veillez entrer un libellé';
			} else {
				state.loading = true;
				const config = {
					headers: {
						Accept: 'application/json',
					},
				};
				
					const newData = {
						libelle: newCategories.libelle,
						description: newCategories.description,
					};
					const { data } = await axios.post(
						URL.CATEGORY_CREATE,
						newData,
						config
					);
					console.log(data);
					if (data) {
						console.log('test', data.categorie);
						state.loading = false;
						let dataCategory = [];
						dataCategory = root.$store.state.qCategory.dataCategory;
						dataCategory.push({
							id: data.categorie.id,
							libelle: data.categorie.libelle,
							nombres: 0,
							description:
								data.description === '' || data.categorie.description === null
									? 'non defini...'
									: data.categorie.description,
							created_at: data.categorie.created_at,
						});
						qToast(root, 'info', 'top-right', 'Categories creer avec sucess !');
						dataCategory.reverse();

						root.$bvModal.hide('e-add-new-categorie');
						root.$store.commit('qCategory/LIST_DATA_CATEGORY', dataCategory, {
							root: true,
						});
						console.log(data);
					
				}
			}
		};


		

		return {
			errorInput,
			AddNewCategorie,

			newCategories,
			state,
		};
	},
};
</script>

<style scoped></style>
