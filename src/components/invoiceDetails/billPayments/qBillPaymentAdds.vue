<script>
import { computed, onMounted, reactive, ref } from '@vue/composition-api';
import URL from '@/views/pages/request';
import vSelect from 'vue-select';
import axios from 'axios';
export default {
	components: {
		vSelect,
	},

	props: {
		refrechData: Function,
		uid: Object,
	},

	setup(props, { root }) {
		const state = reactive({
			loading: false,
			inputError: {
				path: '',
				message: '',
				error: false,
			},
		});
		const input = reactive({
			amount: '',
			account: '',
		});
		const invoiceData = ref();

		onMounted(async () => {
			await getListBankAccounts();
		});

		// Get all bank account
		const accountList__Options = computed(() => {
			return root.$store.state.qInvoice.dataBankAccount;
		});

		// Get List of All bank Account
		const getListBankAccounts = async () => {
			try {
				await axios.get(URL.COMPTE_LIST).then(({ data }) => {
					root.$store.commit('qInvoice/ADD_BANK_ACCOUNT', data[0], {
						root: true,
					});
				});
			} catch (error) {
				console.log(error);
			}
		};

		// Update sold in bank Account
		const updateSoldBankAccounts = async (account, amount) => {
			const newData = {
				id: account.id,
				numero_compte: account.numero_compte,
				libelle: account.libelle,
				solde: parseInt(account.solde - amount),
			};
			try {
				await axios.post(URL.COMPTE_UPDATE, newData).then(({ data }) => {
					console.log(data);
					accountList__Options.value.forEach((bank) => {
						if (bank.id === account.id) {
							bank.numero_compte = account.numero_compte;
							bank.libelle = account.libelle;
							bank.solde = newData.solde;
						}

						root.$store.commit(
							'qInvoice/ADD_BANK_ACCOUNT',
							accountList__Options.value,
							{
								root: true,
							}
						);
					});
				});
			} catch (error) {
				console.log(error);
			}
		};

		const accountForm = computed(() => {
			return input.account;
		});

		const dataInvoice = computed(() => {
			return root.$store.state.qInvoice.dataInvoice;
		});

		// Sender a new Bill payments
		const addBillPayment = async () => {
			invoiceData.value = props.uid;
			console.log(
				invoiceData.value.id,
				parseInt(input.amount),
				parseInt(invoiceData.value.total_ttc)
			);
			state.inputError.path = '';
			state.inputError.message = '';
			try {
				if (input.amount === '') {
					state.inputError.path = 'montant';
					state.inputError.message = 'Ce champs est requis';
					state.inputError.error = true;
				} else if (input.account === '' || input.account === null) {
					state.inputError.path = 'montant';
					state.inputError.message = 'Ce champs est requis';
					state.inputError.error = true;
				} else if (parseInt(input.amount) > parseInt(accountForm.value.solde)) {
					state.inputError.path = 'montant';
					state.inputError.message = 'Vous ne disposez pas de cette somme';
					state.inputError.error = true;
				} else if (
					parseInt(input.amount) > parseInt(invoiceData.value.amountToPaid)
				) {
					state.inputError.path = 'montant';
					state.inputError.message =
						'Ce montant est superieur au reste à payer';
					state.inputError.error = true;
				} else {
					state.inputError.path = '';
					state.inputError.message = '';
					state.inputError.error = false;
					state.loading = true;
					const data = {
						compte_id: input.account.id,
						montant: input.amount,
						facture_id: invoiceData.value.id,
					};

					await axios.post(URL.VERSEMENT_CREATE, data).then((response) => {
						state.loading = false;

						//Real Time - BillPayments
						const billPayment = response.data[0];
						const addNewData = root.$store.state.qInvoice.dataBillPayments;
						addNewData.unshift({
							id_versement: billPayment.id,
							compte_id: billPayment.user_id,
							facture_id: billPayment.id,
							code: billPayment.code, //Code of ivoice
							amount: billPayment.montant,
							montant: parseInt(billPayment.montant),
						});

						// Update Account Bank
						updateSoldBankAccounts(accountForm.value, billPayment.montant);

						root.$store.commit(
							'qInvoice/DATA_BILLPAYMENT',

							addNewData,

							{ root: true }
						);

						let newInvoice = dataInvoice.value.filter((bill) => {
							return bill.id === invoiceData.value.id;
						});

						dataInvoice.value.forEach((bill) => {
							if (bill.id === invoiceData.value.id) {
								bill.versements.unshift({
									id_versement: billPayment.id,
									compte_id: billPayment.user_id,
									facture_id: billPayment.id,
									code: billPayment.code, //Code of ivoice
									amount: billPayment.montant,
									montant: parseInt(billPayment.montant),
								});
							}
						});

						root.$store.commit(
							'qInvoice/LIST_DATA_INVOICE',
							dataInvoice.value,
							{
								root: true,
							}
						);

						// props.refrechData();

						root.$bvModal.hide('modal-billPayment-add');
						root
							.$swal({
								title: 'Succès !',
								text: 'Votre paiement a été enregistré avec succès',
								icon: 'success',
								confirmButtonText: 'Ok',
								customClass: {
									confirmButton: 'btn btn-primary',
								},

								buttonsStyling: false,
							})
							.then((result) => {
								if (result.value) {
									input.amount = '';
									input.account = '';
								}
							});
					});
				}
			} catch (error) {
				state.loading = false;
				console.log(error);
			}
		};

		return {
			// Variable
			state,
			input,
			accountList__Options,
			invoiceData,

			// Fuctions
			addBillPayment,
			accountForm,
		};
	},
};
</script>

<template>
	<div>
		<!-- Modal pour ajouter un paiement -->

		<b-modal
			id="modal-billPayment-add"
			cancel-variant="outline-secondary"
			ok-title="Régler"
			cancel-title="Annuler"
			centered
			title="Régler votre facture"
			@ok="addBillPayment"
			scrollable
		>
			<div
				class="d-flex justify-content-center align-content-center  py-2"
				style="font-size: 24px"
			>
				<span v-if="!accountForm"
					>Aucun compte n'a ete selection, veillez choix ou
					<span
						class=""
						v-b-modal.modal-compte
						style="text-decoration: underline; cursor: pointer"
						>cree un compte</span
					></span
				>

				<span v-if="accountForm">
					Le solde de votre compte
					<span class="text-primary">''{{ accountForm.libelle }}''</span> est :
					<span
						class="text-primary"
						style="text-decoration: underline; cursor: pointer"
					>
						{{ accountForm.solde }}
					</span></span
				>
			</div>
			<b-form class="pt-2">
				<!-- nom -->
				<b-form-group label="Comptes de l'entreprise" label-for="register-nom">
					<v-select
						v-model="input.account"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="libelle"
						:options="accountList__Options"
					>
						<template #list-header>
							<li
								v-b-modal.modal-compte
								class="add-new-client-header d-flex align-items-center my-50"
							>
								<feather-icon icon="PlusIcon" size="16" />
								<span class="align-middle ml-25"
									>Ajouter un nouveau compte bancaire</span
								>
							</li>
						</template>
						<span
							v-if="state.inputError.errors"
							style=" margin-top: 5px; color: red; font-size: 12px;"
						>
							{{ state.inputError.message }}
						</span>
					</v-select>
				</b-form-group>
				<!-- valeur -->
				<b-form-group label="Montant (fr)" label-for="register-montant">
					<b-form-input
						type="text"
						id="register-montant"
						v-model="input.amount"
						name="register-montant"
						placeholder="Ex: 18000000"
					/>
					<span
						v-if="state.inputError.error"
						style=" margin-top: 5px; color: red; font-size: 12px;"
					>
						{{ state.inputError.message }}
					</span>
				</b-form-group>
			</b-form>

			<template #modal-footer="{  }">
				<b-button
					:disabled="state.loading === true ? true : false"
					variant="primary"
					@click="addBillPayment"
				>
					<span v-if="state.loading === false">Régler</span>
					<b-spinner v-if="state.loading === true" label="Spinning"></b-spinner>
				</b-button>
			</template>
		</b-modal>
	</div>
</template>

<style scoped></style>
