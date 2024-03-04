<script>
import { reactive, ref } from '@vue/composition-api';
import { methods } from 'vue-echarts';
import axios from 'axios';
import URL from '@/views/pages/request';

export default {
	props: ['dataCurrentFiles'],

	data() {
		return {
			loadingForDelete: false,
			config: {
				headers: {
					Accept: 'application/json',
				},
			},
		};
	},

	methods: {
		/*
    EDIT SELF BILL PAYMENTS - OF USER
    @Method > Put
    @variable > [none]
    @send message > Success or Error
    @return > Array<Object>
  */
		async DeleteFilesInvoice() {
			console.log(this.dataCurrentFiles);
			const _ = this.dataCurrentFiles;
			this.loadingForDelete = true;
			const data = {
				image_id: _.id,
			};

			await axios
				.post(URL.INVOICE_DELETE_FICHER, data, this.config)
				.then(() => {
					this.loadingForDelete = false;
					this.$bvModal.hide('modal-DeleteFilesInvoice');
					this.$swal({
						title: 'Succès !',
						text: `Votre file N° ${_.code} a bien ete suprimé`,
						icon: 'success',
						confirmButtonText: 'Ok',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});
					console.log('Success');
					localStorage.setItem('emit@deleteFilesInvoice', true);
				})
				.catch((error) => {
					this.loadingForDelete = false;
					console.log(error);
				});
		},
	},
};
</script>

<template>
	<div>
		<b-modal
			ok-title="Oui"
			cancel-title="Nom"
			centered
			id="modal-DeleteFilesInvoice"
			scrollable
			@ok="DeleteFilesInvoice"
			title="Suprimer le ficher"
		>
			<b-card-text>
				<!-- first name -->
				<b-col cols="12">
					Cette action supprimera ce file, auccun retour ne sera pas possible...
					<br />
					Voulez-vous effectuez cette action

					<!-- <b-form-checkbox v-model="selected" value="A" class="custom-control-primary">
ne plus me demander
    </b-form-checkbox> -->
				</b-col>
			</b-card-text>

			<template #modal-footer="{  cancel }">
				<b-button
					:disabled="loadingForDelete === true ? true : false"
					variant="primary"
					@click="DeleteFilesInvoice"
				>
					<span v-if="loadingForDelete === false">Suprimer</span>
					<b-spinner
						v-if="loadingForDelete === true"
						label="Spinning"
					></b-spinner>
				</b-button>
				<b-button
					v-if="loadingForDelete === false"
					variant=""
					@click="cancel()"
				>
					Cancel
				</b-button>
			</template>
		</b-modal>
	</div>
</template>

<style scoped></style>
