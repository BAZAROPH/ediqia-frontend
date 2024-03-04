<template>
	<div>
		<b-modal
			ok-title="Oui"
			cancel-title="Nom"
			centered
			id="modal-mail-sender"
			scrollable
			@ok="SenderInvoiceMail"
			:title="'Envoyer la facture à @' + input.client"
		>
			<b-card-text>
				<!-- email -->
				<b-form-group>
                    <label for="">Email <span class="bg-color-danger">*</span></label>
					<b-form-input
						v-model="input.email"
						placeholder="Email"
					></b-form-input>
					<span class="error"></span>
				</b-form-group>

				<!-- Numero de la facture -->
				<b-form-group>
					<b-form-input
						disabled
						v-model="input.code"
						placeholder="Numero de la facture"
					></b-form-input>
					<span class="error"></span>
				</b-form-group>
			</b-card-text>

			<template #modal-footer="{ cancel }">
                <b-button
					v-if="state.loadingSenderMail === false"
					variant=""
					@click="cancel()"
				>
					Annuler
				</b-button>
				<b-button variant="primary" @click="SenderInvoiceMail">
					<span v-if="state.loadingSenderMail === false">Envoyer</span>
					<b-spinner
						v-if="state.loadingSenderMail === true"
						label="Spinning"
					></b-spinner>
				</b-button>
				
			</template>
		</b-modal>
	</div>
</template>

<script>
import { reactive,computed, defineAsyncComponent, onMounted } from '@vue/composition-api';
import URL from '@/views/pages/request';
import axios from 'axios';
export default {
	props:['invoiceData'],
	setup(props, { root }) {
		// **
		const state = reactive({
			loadingSenderMail: false,
		});

		 
	
		const input = computed(() => {
			return{
			client : props.invoiceData.client.nom,
			email : props.invoiceData.client.email,
			code  : props.invoiceData.code
			}
		})

		const SenderInvoiceMail = async () => {
			state.loadingSenderMail = true;
			const infoInvoice__Mail = {
				email: input.email,
				client: input.client,
				client_id: invoiceData.client.id,
				id: props.invoiceData.id,
				entreprise_id: props.invoiceData.entreprise.id,
			};
			await axios
				.post(URL.FACTURE_SENDEMAIL, infoInvoice__Mail)
				.then((res) => {
					console.log('Email Send : ', res);
					state.loadingSenderMail = false;
					root.$swal({
						title: 'Succès !',
						text: 'La facture a été envoyé au client',
						icon: 'success',
						confirmButtonText: 'Ok',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});
				})
				.catch((error) => {
					state.loadingSenderMail = false;
					console.log(error);
				});
		};

		return {
			// Variables
			state,
			input,

			// Functions
			SenderInvoiceMail,
		};
	},
};
</script>
