<script>
import URL from '@/views/pages/request';
import axios from 'axios';

export default {
	data() {
		return {
			loading: false,
			invoiceData: null,
		};
	},

	props: {
		deleteinvoice__Uid: Number,
	},

	mounted() {
		this.invoiceData = JSON.parse(localStorage.getItem('facture'));
	},

	methods: {
		/**
    DELETE SELF BILL PAYMENTS - OF USER
    @Method > Put
    @variable > [none]
    @send message > Success or Error
    @return > Array<Object>
  */

		async Deleteinvoice() {
			await axios
				.post(URL.FACTURE_DESTROY, { id: this.deleteinvoice__Uid })
				.then(({ data }) => {
					if (data) {
						const dataDraft = this.$store.state.qInvoice.dataInvoice;
						const invoiceLists__data = dataDraft.filter((draft) => {
							return draft.id !== this.deleteinvoice__Uid;
						});
						this.$store.commit(
							'qInvoice/LIST_DATA_INVOICE',
							invoiceLists__data,
							{
								root: true,
							}
						);
					}

					this.loading = false;
					this.$bvModal.hide('modal-destroyBillPaymant');
					this.$swal({
						title: 'Succès !',
						text: `Votre facture N° ${this.deleteinvoice__Uid} à bien été supprimé`,
						icon: 'success',
						confirmButtonText: 'Ok',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});
				})
				.catch((error) => {
					this.loading = false;
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
			id="modal-destroyInvoice"
			scrollable
			@ok="Deleteinvoice"
		>
			<b-card-text>
				<!-- first name -->
				<feather-icon icon="AlertCircleIcon" class="text-warning" size="64" />
				<b-col cols="12">
					Êtes vous sur de vouloir Supprimer la facture
					{{ this.deleteinvoice__Uid }}
				</b-col>
			</b-card-text>

			<template
				#modal-footer="{ cancel }"
				class="d-flex justify-centent-center"
			>
				<b-button v-if="loading === false" variant="" @click="cancel()">
					Cancel
				</b-button>
				<b-button
					:disabled="loading === true ? true : false"
					variant="primary"
					@click="Deleteinvoice"
				>
					<span v-if="loading === false">Supprimé</span>
					<b-spinner v-if="loading === true" label="Spinning"></b-spinner>
				</b-button>
			</template>
		</b-modal>
	</div>
</template>

<style scoped></style>
