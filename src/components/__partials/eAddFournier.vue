<template>
	<div>
		<!-- Modal pour mettre à jour un client    -->
		<b-modal
			id="add-fournier"
			cancel-variant="outline-secondary"
			ok-title="Modifier"
			cancel-title="Annuler"
			centered
			title="Ajouter un fournisseur"
			@ok="addFournier"
		>
			<b-form class="auth-register-form mt-2">
				<!-- nom -->
				<b-form-group label="Nom" label-for="register-nom">
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="register-nom"
							v-model="state['newFournier'].nom"
							name="register-nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Bazaroph"
						/>
						<small v-if="errorInput.path === 'nom'" class="text-danger">
							{{ errorInput.message }}
						</small>
					</validation-provider>
				</b-form-group>

				<!-- email -->
				<b-form-group label="Email" label-for="register-email">
					<validation-provider
						#default="{ errors }"
						name="Email"
						rules="required"
					>
						<b-form-input
							id="register-email"
							v-model="state['newFournier'].email"
							type="email"
							name="register-email"
							:state="errors.length > 0 ? false : null"
							placeholder="john@example.com"
						/>
						<small v-if="errorInput.path === 'email'" class="text-danger">
							{{ errorInput.message }}
						</small>
					</validation-provider>
				</b-form-group>

				<!-- contact -->
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
				<b-form-group label="Localisation" label-for="entreprise-localisation">
					<validation-provider
						#default="{ errors }"
						name="localisation"
						rules="required"
					>
						<b-form-input
							id="autocomplete_search"
							@input="initialize"
							name="autocomplete_search"
							type="text"
							:state="errors.length > 0 ? false : null"
							placeholder="Abidjan, Angré RCI 0089 BP 00225"
						/>
						<input type="hidden" name="lat" />
						<input type="hidden" name="long" />
						<small v-if="errorInput.path === 'name'" class="text-danger">
							{{ errorInput.message }}
						</small>
					</validation-provider>
				</b-form-group>

				<!-- Type de fournisseur -->
				<b-form-group>
					<v-select
						v-model="state['newFournier'].type_client"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="title"
						:options="fournierUpOption"
					/>
					<small v-if="errorInput.path === 'name'" class="text-danger">
						{{ errorInput.message }}
					</small>
				</b-form-group>
			</b-form>
			<template #modal-footer="{ cancel }">
				<b-button v-if="loading === false" variant="" @click="cancel()">
					Cancel
				</b-button>
				<b-button
					:disabled="loading === true ? true : false"
					variant="primary"
					@click="addFournier"
				>
					<span v-if="loading === false">Ajouter</span>
					<b-spinner v-if="loading === true" label="Spinning"></b-spinner>
				</b-button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import {
	onMounted,
	onUpdated,
	reactive,
	computed,
	ref,
} from '@vue/composition-api';
import vSelect from 'vue-select';
import URL from '@/views/pages/request/index';
import axios from 'axios';
import { VueTelInput } from 'vue-tel-input';

export default {
	components: {
		vSelect,
	},

	props: {},
	setup(props, { root }) {
		const status_id = ref(0);
		const indicatifFinal = ref('');
		const phone = ref('');
		const loading = ref(false);
		const fournierUpOption = ref([
			{ title: 'Particulier' },
			{ title: 'Entreprise' },
		]);

		const state = computed(() => {
			return {
				newFournier: {
					nom: '',
					contact: '',
					email: '',
					localisation: '',
					type_client: fournierUpOption.value[0].title,
				},
			};
		});

		const errorInput = reactive({
			path: '',
			message: '',
		});

		const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

		//
		const contactEntier = (e) => {
			state.value.newFournier.contact = e;
		};

		const changer = (e) => {
			state.value.newFournier.contact['country'].name = e.name;
		};

		onMounted(() => {
			google.maps.event.addDomListener(window, 'load', initialize);
		});

		const initialize = () => {
			var input = document.getElementById('autocomplete_search');
			var autocomplete = new google.maps.places.Autocomplete(input);
			autocomplete.addListener('place_changed', function() {
				var place = autocomplete.getPlace();
				// place variable will have all the information you are looking for.
				$('#lat').val(place.geometry['location'].lat());
				$('#long').val(place.geometry['location'].lng());
				localStorage.setItem('place_fouriner', JSON.stringify(place));
			});
		};

		// *****
		// ****
		// FUNCTION POUR Editer UN FOURNISSEUR
		// ****
		// *****
		const addFournier = async () => {
			const plcae = JSON.parse(localStorage.getItem('place_fouriner'));
			console.log(plcae);
			if (state.value.newFournier.nom === '') {
				errorInput.path = 'nom';
				errorInput.message = 'Le nom du fournisseur est requis';
			} else if (state.value.newFournier.email === '') {
				errorInput.path = 'email';
				errorInput.message = "L'email du fournisseur est requis";
			} else if (!emailPattern.test(state.value.newFournier.email)) {
				errorInput.path = 'email';
				errorInput.message = 'Entrez un email valide';
			} else if (phone.value === '') {
				errorInput.path = 'contact';
				errorInput.message = 'Le cantact du fournisseur est requis';
			} else {
				indicatifFinal.value =
					'+' + '' + state.value.newFournier.contact.country.dialCode;
				if (state.value.newFournier.type_client.title == 'Particulier') {
					status_id.value = 1;
				} else {
					status_id.value = 2;
				}

				const fournier = {
					nom: state.value.newFournier.nom,
					contact: state.value.newFournier.contact.formatted,
					indicateur: indicatifFinal.value,
					localisation: plcae,
					email: state.value.newFournier.email,
					type_client: status_id.value,
				};

				errorInput.path = '';
				errorInput.message = '';

				loading.value = true;
				localStorage.removeItem('place_fouriner');
				await axios.post(URL.FOURNISSEUR_CREATE, fournier).then((response) => {
					// Add client on list

					state.value.newFournier.nom = '';
					state.value.newFournier.email = '';
					state.value.newFournier.contact = '';
					phone.value = '';
					state.value.newFournier.localisation = '';
					state.value.newFournier.type_client = '';

					root.$bvModal.hide('add-fournier');
					root.$swal({
						title: 'Succès !',
						text: `Le fournisseur ${response.data[0].nom} a bien ete ajouter avec succès`,
						icon: 'success',
						confirmButtonText: 'Ok',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});
					const newDataFounier = root.$store.state.qFournier.dataFournier;
					newDataFounier.unshift(response.data[0]);
					newDataFounier.forEach((el, index) => {
						el.index = index + 1;
					});
					root.$store.commit('qFournier/LIST_DATA_FOURNIER', newDataFounier, {
						root: true,
					});

					loading.value = false;
				});
			}
		};

		return {
			changer,
			status_id,
			state,
			errorInput,

			addFournier,
			fournierUpOption,
			contactEntier,
			VueTelInput,
			phone,
			loading,
			initialize,
		};
	},
};
</script>

<style scoped></style>
