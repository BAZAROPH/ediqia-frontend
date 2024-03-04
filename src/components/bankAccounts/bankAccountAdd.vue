<template>
	<div>
		<b-modal
			id="modal-compte"
			cancel-variant="outline-secondary"
			ok-title="Créer"
			cancel-title="Annuler"
			centered
			title="Ajouter un compte"
			@ok="addBankAccount"
		>
			<validation-observer ref="registerForm">
				<b-form class="auth-register-form mt-2">
					<!-- Numero compte -->
					<b-form-group
						label="Numero de compte"
						label-for="register-numeroCompte"
					>
						<b-form-input
							id="register-nom"
							v-model="input.numeroCompte"
							name="register-numeroCompte"
							placeholder="AZ000000EH09"
						/>
						<span
							v-if="
								state.errorInput.errors === true &&
									state.errorInput.path === 'numeroCompte'
							"
						>
							{{ state.errorInput.message }}
						</span>
					</b-form-group>

					<!-- Libelle -->
					<b-form-group label="Libelle du compte" label-for="register-libelle">
						<b-form-input
							id="register-libelle"
							v-model="input.libelle"
							name="register-libelle"
							placeholder="Ex: Alantique Bank"
						/>
						<span
							v-if="
								state.errorInput.errors === true &&
									state.errorInput.path === 'libelle'
							"
						>
							{{ state.errorInput.message }}
						</span>
					</b-form-group>

					<!-- solde -->
					<b-form-group label="Solde" label-for="register-solde">
						<b-form-input
							id="register-solde"
							v-model="input.solde"
							type="text"
							name="register-solde"
							placeholder="1000000000"
						/>
						<span
							v-if="
								state.errorInput.errors === true &&
									state.errorInput.path === 'solde'
							"
						>
							{{ state.errorInput.message }}
						</span>
					</b-form-group>

					<!-- Description -->
					<b-form-group>
						<label for="taxeValue">Description (facultatif):</label>
						<b-form-textarea
							id="textarea"
							v-model="input.description"
							placeholder="Entrer les details du compte"
							rows="5"
							max-rows="6"
						>
						</b-form-textarea>
						<span
							v-if="
								state.errorInput.errors === true &&
									state.errorInput.path === 'description'
							"
						>
							{{ state.errorInput.message }}
						</span>
					</b-form-group>
				</b-form>
			</validation-observer>
		</b-modal>
	</div>
</template>

<script>
import { reactive } from '@vue/composition-api';
import URL from '@/views/pages/request';
import axios from 'axios';
export default {
	setup(propos, { root }) {
		const state = reactive({
			errorInput: {
				message: '',
				path: '',
			errors: true,
			}
		});
		const input = reactive({
			numeroCompte: '',
			libelle: '',
			solde: '',
			description: '',
		});

		const addBankAccount = async () => {
			try {
				const data = {
					numero_compte: input.numeroCompte,
					libelle: input.libelle,
					solde: input.solde,
					description: input.description,
				};

				const config = {
					headers: {
						Accept: 'application/json',
					},
				};

				await axios.post(URL.COMPTE_CREATE, data, config).then(({ data }) => {
					root.$swal({
						title: 'Nouveau compte enregistré avec succès',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
						buttonsStyling: false,
					});
					const newData = root.$store.state.qInvoice.dataBankAccount;
					newData.push(data[0]);
					console.log('newData :', newData, 'data[0] : ', data);
					root.$store.commit('qInvoice/ADD_BANK_ACCOUNT', newData, {
						root: true,
					});

					input.numeroCompte = '';
					input.libelle = '';
					input.solde = '';
					input.description = '';
				});
			} catch (error) {
				console.log('trycatch error', error);
			}
		};

		return {
			// Variables
			state,
			input,

			// Functions
			addBankAccount,
		};
	},
};
</script>
