<script>
import URL from '@/views/pages/request';
import axios from 'axios';

export default {
	data() {
		return {
			loadingEditBillPayments: false,
			invoiceData: null,
		};
	},

	props: ['dataCurrentBillPayments'],

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
		DeleteBillPayments() {
			const _ = this.dataCurrentBillPayments;
			this.loadingEditBillPayments = true;
			const data = {
				id: _.id_versement,
				montant: _.amount,
			};

			axios
				.post(URL.BILL_PAYMANTS_DELETE, data, this.config)
				.then((response) => {
					/****
					 *
					 *
					 */

					const new_somme_paye =
						Number(this.invoiceData.somme_paye) - Number(data.montant);
					this.invoiceData.somme_paye = new_somme_paye;
					this.invoiceData.somme_impaye =
						this.invoiceData.total_ttc + this.invoiceData.somme_paye;
					/****
					 *
					 *
					 */

					this.loadingEditBillPayments = false;
					this.$bvModal.hide('modal-destroyBillPaymant');
					this.$swal({
						title: 'Succès !',
						text: `Votre versement N° ${_.code} a bien ete suprimé`,
						icon: 'success',
						confirmButtonText: 'Ok',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});
					this.$store.commit(
						'qInvoice/DELETE_BILLPAYMENT',
						{
							data: this.$store.state.qInvoice.dataBillPayments,
							id: data.id,
						},
						{ root: true }
					);
				})
				.catch((error) => {
					this.loadingEditBillPayments = false;
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
			id="modal-destroyBillPaymant"
			scrollable
			@ok="DeleteBillPayments"
			:title="'Suprimer le versemment'"
		>
			<b-card-text>
				<!-- first name -->
				<b-col cols="12">
					Cette action supprimera ce reglement, accun retour ne sera possible
					<br />
					<br />
					Voulez-vous effectuez cette action ?
				</b-col>
			</b-card-text>

			<template #modal-footer="{ cancel }">
				<b-button
					v-if="loadingEditBillPayments === false"
					variant=""
					@click="cancel()"
				>
					Cancel
				</b-button>
				<b-button
					:disabled="loadingEditBillPayments === true ? true : false"
					variant="primary"
					@click="DeleteBillPayments"
				>
					<span v-if="loadingEditBillPayments === false">Supprimé</span>
					<b-spinner
						v-if="loadingEditBillPayments === true"
						label="Spinning"
					></b-spinner>
				</b-button>
			</template>
		</b-modal>
	</div>
</template>

<style scoped></style>
