<template>
	<div>
		<b-modal
			id="add-new-client"
			title="Ajouter un nouveau client"
			cancel-title="Annuler"
			ok-title="Ajouter"
			centered
			cancel-variant="outline-secondary"
			@ok="AddNewClient"
		>
			<b-form>
				<!-- Nom -->
				<b-form-group label="Nom" label-for="name">
					<template #label>
						<span>Nom</span>
						<span class="text-danger">*</span>
					</template>
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="name"
							v-model="state.newUser.nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Enter votre nom"
						/>
					</validation-provider>
					<span
						class="text-danger"
						v-if="errorInput.path === 'nom'"
						style="font-size: 12px"
					>
						{{ errorInput.message }}
					</span>
				</b-form-group>

				<!-- Prénoms -->
				<b-form-group label="Prénoms" label-for="prenoms">
					<validation-provider name="nom" rules="required">
						<b-form-input
							id="prenoms"
							v-model="state.newUser.prenoms"
							placeholder="Enter vos prénoms"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Email -->
				<b-form-group label="Email" label-for="email">
					<validation-provider name="nom" rules="required">
						<b-form-input
							id="email"
							type="email"
							v-model="state.newUser.email"
							placeholder="john@example.com"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Contact -->
				<b-form-group label="Zip Code" label-for="zip-code">
					<template #label>
						<span>Numéro de telephone</span>
						<span class="text-danger">*</span>
					</template>
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<vue-tel-input
							id="contact"
							@country-changed="changer"
							@validate="contactEntier($event)"
							v-model="phone"
							:state="errors.length > 0 ? false : null"
							placeholder="000-000-000-000"
						/>
					</validation-provider>
					<span
						class="text-danger"
						v-if="errorInput.path === 'contact'"
						style="font-size: 12px"
					>
						{{ errorInput.message }}
					</span>
				</b-form-group>

				<!-- Localisation -->
				<!-- <b-form-group label="Localisation" label-for="localisation">
					<validation-provider
						#default="{ errors }"
						name="localisation"
						rules="required"
					>
						<b-form-input
							id="localisation"
							name="localisation"
							v-model="newUser.localisation"
							:state="errors.length > 0 ? false : null"
							class="text-center"
							placeholder="Abidjan, Angré RCI 0089 BP 00225"
						/>
					</validation-provider>
				</b-form-group> -->

				<!-- Status -->
				<b-form-group>
					<v-select
						v-model="state.newUser.statut"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="title"
						:options="clientUpOption"
						placeholder="Choisir un statut pour le client"
					/>
				</b-form-group>
			</b-form>

			<template #modal-footer="{ cancel }">
				<b-button v-if="loading === false" variant="" @click="cancel()">
					Cancel
				</b-button>
				<b-button
					:disabled="loading === true ? true : false"
					variant="primary"
					@click="AddNewClient"
				>
					<span v-if="loading === false">Ajouter</span>
					<b-spinner v-if="loading === true" label="Spinning"></b-spinner>
				</b-button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import vSelect from 'vue-select';
import URL from '@/views/pages/request/index';
import axios from 'axios';
import { VueTelInput } from 'vue-tel-input';

export default {
	components: {
		vSelect,
	},
	props: {
		clientList: Array,
	},
	setup(props, { root }) {
		const status_id = ref(0);
		const indicatifFinal = ref('');
		const phone = ref('');
		const loading = ref(false);

		const state = reactive({
			newUser: {
				nom: '',
				prenoms: '',
				libelle: '',
				contact: '',
				email: '',
				localisation: '',
				statut: '',
			},
		});
		const clientUpOption = ref([
			{ title: 'Particulier' },
			{ title: 'Entreprise' },
		]);

		const errorInput = reactive({
			path: '',
			message: '',
		});

		const contactEntier = (e) => {
			state.newUser.contact = e;
		};

		const changer = (e) => {
			if (e.name) {
				state.newUser.contact.country.name = e.name;
			}
		};

		// *****
		// ****
		// FUNCTION POUR AJOUT DE CLIENT
		// ****
		// *****
		const AddNewClient = async () => {
			try {
				if (state.newUser.nom === '') {
					errorInput.path = 'nom';
					errorInput.message = 'Le nom du client est requis';
				} else if (state.newUser.contact === '') {
					errorInput.path = 'contact';
					errorInput.message = 'Le cantact du client est requis';
				} else {
					indicatifFinal.value =
						'+' + '' + state.newUser.contact.country.dialCode;
					if (state.newUser.statut.title == 'Particulier') {
						status_id.value = 1;
					} else {
						status_id.value = 2;
					}
					const newClient = {
						nom: state.newUser.nom,
						prenoms: state.newUser.prenoms,
						contact: state.newUser.contact.formatted,
						indicateur: indicatifFinal.value,
						localisation: state.newUser.localisation,
						email: state.newUser.email,
						type_client: status_id.value,
					};
					loading.value = true;
					await axios.post(URL.CLIENT_CREATE, newClient).then((response) => {
						// Add client on list
						props.clientList.unshift(response.data.client);

						root.$bvModal.hide('add-new-client');
						root.$swal({
							title: 'Succès !',
							text: `Client ${response.data.client.nom} a bien ete ajouter avec succès`,
							icon: 'success',
							confirmButtonText: 'Ok',
							customClass: {
								confirmButton: 'btn btn-primary',
							},
							buttonsStyling: false,
						});

						loading.value = false;
						state.newUser.nom = '';
						state.newUser.prenoms = '';
						state.newUser.email = '';
						state.newUser.contact = '';
						phone.value = '';
						state.newUser.localisation = '';
						state.newUser.statut = '';
					});
				}
			} catch (error) {
				loading.value = false;
				console.log('error:', error);
			}
		};

		return {
			changer,
			status_id,
			state,
			errorInput,
			AddNewClient,
			clientUpOption,
			contactEntier,
			VueTelInput,
			phone,
			loading,
		};
	},
};
</script>

<style scoped></style>
