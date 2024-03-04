<template>
	<div>
		<!-- Modal pour mettre à jour un client    -->
		<b-modal
			id="edit-fournier"
			cancel-variant="outline-secondary"
			ok-title="Modifier"
			cancel-title="Annuler"
			centered
			title="Modification du fournisseur"
			@ok="editFournier"
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
							v-model="state['newFournier'].phone"
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
					<b-form-input
						id="autocomplete_search"
						@input="initialize"
						name="autocomplete_search"
						type="text"
						placeholder="Abidjan, Angré RCI 0089 BP 00225"
						v-model="state['newFournier'].localisation"
					/>
					<input type="hidden" name="lat" />
					<input type="hidden" name="long" />
					<small v-if="errorInput.path === 'name'" class="text-danger">
						{{ errorInput.message }}
					</small>
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
					@click="editFournier"
				>
					<span v-if="loading === false">Modifier</span>
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

	props: {
		fournierDataUid: Object,
	},
	setup(props, { root }) {
		const status_id = ref(0);
		const indicatifFinal = ref('');
		const loading = ref(false);
		const fournierUpOption = ref([
			{ title: 'Particulier' },
			{ title: 'Entreprise' },
		]);
		const phone = ref('');
		const state = computed(() => {
			return {
				newFournier: {
					nom: props.fournierDataUid.nom,
					contact: props.fournierDataUid.contact,
					email: props.fournierDataUid.email,
					localisation:
						props.fournierDataUid.localisation === null
							? ''
							: props.fournierDataUid.localisation.formatted_address,
					phone: props.fournierDataUid.contact,
					type_client:
						props.fournierDataUid.type_client === 1
							? fournierUpOption.value[0].title
							: fournierUpOption.value[1].title,
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
			if (e.name) {
				state.value.newFournier.contact.country.name = e.name;
			}
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
		const editFournier = async () => {
			const place = JSON.parse(localStorage.getItem('place_fouriner'));
			if (state.value.newFournier.nom === '') {
				errorInput.path = 'nom';
				errorInput.message = 'Le nom du fournisseur est requis';
			} else if (state.value.newFournier.email === '') {
				errorInput.path = 'email';
				errorInput.message = "L'email du fournisseur est requis";
			} else if (!emailPattern.test(state.value.newFournier.email)) {
				errorInput.path = 'email';
				errorInput.message = 'Entrez un email valide';
			} else if (state.value.newFournier.contact === '') {
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
				errorInput.path = '';
				errorInput.message = '';
				const fournier = {
					id: props.fournierDataUid.id,
					nom: state.value.newFournier.nom,
					indicateur: indicatifFinal.value,
					contact: state.value.newFournier.contact.formatted,
					localisation: place,
					email: state.value.newFournier.email,
					type_client: status_id.value,
				};

				loading.value = true;
				localStorage.removeItem('place_fouriner');
				await axios.post(URL.FOURNISSEUR_UPDATE, fournier).then((response) => {
					// Add client on list

					console.log(response);
					root.$bvModal.hide('edit-fournier');
					root.$swal({
						title: 'Succès !',
						text: `Client ${response.data.nom} a bien ete modifier avec succès`,
						icon: 'success',
						confirmButtonText: 'Ok',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});

					let newDataFounier = root.$store.state.qFournier.dataFournier;

					newDataFounier.forEach((el) => {
						if (el.id === fournier.id) {
							el.nom = fournier.nom;
							el.indicateur = fournier.indicateur;
							el.contact = fournier.contact;
							el.localisation = fournier.localisation;
							el.email = fournier.email;
							el.type_client = fournier.type_client;
						}
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

			editFournier,
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
