<template>
	<b-modal
		id="e-edit-categorie"
		cancel-variant="outline-secondary"
		ok-only
		ok-title="Ajouter"
		cancel-title="Annuler"
		centered
		:title="'Modifer la categorie - '+ dataCategorie.id "
		@ok="EditCategorie"
	>
		<b-form @submit.stop.prevent>
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
				@click.stop.prevent="EditCategorie"
			>
				<span v-if="state.loading === false">Enregistré</span>
				<b-spinner v-if="state.loading === true" label="Spinning"></b-spinner>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api';
import vSelect from 'vue-select';
import axios from 'axios';
import URL from '@/views/pages/request';
import Ripple from 'vue-ripple-directive';
import qToast from '@/utils/qToast';

export default {
	components: {
		vSelect,
	},
	props: {
		dataCategorie: Object,
	},
	directives: {
		Ripple,
	},
	setup(props, { root }) {
		const state = reactive({
			loading: false,
		});
		const newCategories = computed(() => {
			return {
				libelle: props.dataCategorie.libelle,
				description: props.dataCategorie.description,
			};
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
		const EditCategorie = async () => {

			if (newCategories.value.libelle === '') {
				errorInput.path = 'libelle';
				errorInput.message = 'Veillez entrer un libellé';
			} else {
				state.loading = true;
				const config = {
					headers: {
						Accept: 'application/json',
					},
				};
			

				try {
					const editData = {
					id: props.dataCategorie.id,
					libelle: newCategories.value.libelle,
					description: newCategories.value.description
				}
					const { data } = await axios.post(
						URL.CATEGORY_UPDATE,
						editData
					);
					if (data) {
						state.loading = false;
						let dataCategory = [];
						dataCategory = root.$store.state.qCategory.dataCategory;
						dataCategory.forEach(el => {
							if(props.dataCategorie.id === el.id){
								el.libelle = editData.libelle
								el.description = editData.description
							}
						});
						
						qToast(root, 'info', 'top-right', 'Categorie modifier avec sucess !');
						

						root.$bvModal.hide('e-edit-categorie');
						root.$store.commit('qCategory/LIST_DATA_CATEGORY', dataCategory, {
							root: true,
						});
						console.log(data);
					}
				} catch (error) {
					state.loading = false;
					console.log(error);
				}
			}
		};

		return {
			errorInput,
			EditCategorie,

			newCategories,
			state,
		};
	},
};
</script>

<style scoped></style>
