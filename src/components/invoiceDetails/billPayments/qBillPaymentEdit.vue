<script>
import axios from 'axios';
import URL from '@/views/pages/request';
import { reactive } from '@vue/composition-api';

export default {
	data() {
		return {
			loadingEditBillPayments: false,
			amount: '',
			errorInputForm: {
				path: '',
				message: '',
			},
		};
	},
	props: ['dataCurrentBillPayments'],
	methods: {
		/**
    EDIT SELF BILL PAYMENTS - OF USER
    @Method > Put
    @variable > [none]
    @send message > Success or Error
    @return > Array<Object>
  */
		EditBillPayments() {
			const digitOnly = /^\d+$/;

			if (this.amount === '') {
				this.errorInputForm.path = 'amount';
				this.errorInputForm.message = 'Ce champs est requis !';
			} else if (digitOnly.test(this.amount) === false) {
				this.errorInputForm.path = 'amount';
				this.errorInputForm.message = 'Ce champs est un digit !';
			} else {
				const _ = this.dataCurrentBillPayments;
				this.loadingEditBillPayments = true;
				const data = {
					montant: this.amount,
					facture_id: _.facture_id,
					compte_id: _.compte_id,
					id: _.id_versement,
				};
				this.errorInputForm.path = '';
				this.errorInputForm.message = '';
				axios
					.post(URL.BILL_PAYMANTS_UPDATE, data, this.config)
					.then(() => {
						this.loadingEditBillPayments = false;
						this.$store.commit(
							'qInvoice/UPDATE_AMOUNT',
							{
								data: this.$store.state.qInvoice.dataBillPayments,
								id: data.id,
								amount: this.amount,
							},
							{ root: true }
						);
						console.log(this.$store.state.qInvoice.dataBillPayments[0]);
						this.$bvModal.hide('modal-editBillPaymant');
						this.$swal({
							title: 'Succès !',
							text: 'Votre montant a bien ete enregistré',
							icon: 'success',
							confirmButtonText: 'Ok',
							customClass: {
								confirmButton: 'btn btn-primary',
							},
							buttonsStyling: false,
						});
            this.amount = ""
					})
					.catch((error) => {
						console.log(error);
						this.loadingEditBillPayments = false;
					});
			}
		},
	},
};
</script>

<template>
	<div>
		<b-modal
			ok-title="Enregistré"
			cancel-title="Annuler"
			centered
			id="modal-editBillPaymant"
			scrollable
			@ok="EditBillPayments"
			title="Modifier la facture"
		>
			<b-card-text>
				<!-- first name -->
				<b-col cols="12">
					<form ref="form" @submit.stop.prevent="EditBillPayments">
						<b-form-group label="Montant de la facture" label-for="vi-montant">
							<b-input-group class="input-group-merge">
								<b-input-group-prepend is-text>
									<feather-icon icon="CreditCardIcon" />
								</b-input-group-prepend>
								<b-form-input
									id="vi-montant"
									placeholder="Montant - Ex : 300000"
									v-model="amount"
								/>
							</b-input-group>
							<small
								class="text-danger"
								v-if="errorInputForm.path === 'amount'"
							>
								{{ errorInputForm.message }}
							</small>
						</b-form-group>
					</form>
				</b-col>
			</b-card-text>

			<template #modal-footer="{ cancel }">
				<b-button
					:disabled="loadingEditBillPayments === true ? true : false"
					variant="primary"
					@click="EditBillPayments"
				>
					<span v-if="loadingEditBillPayments === false">Enregistré</span>
					<b-spinner
						v-if="loadingEditBillPayments === true"
						label="Spinning"
					></b-spinner>
				</b-button>
				<b-button
					v-if="loadingEditBillPayments === false"
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
