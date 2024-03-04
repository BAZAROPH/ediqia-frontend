import URL from '@/views/pages/request';
import axios from 'axios';

class paymentsRealTime {
	constructor(invoiceData) {
		this.invoiceData = invoiceData;
	}

	async changeStateInvoice(id, root) {
		const data = {
			id: id,
			etat: 'validate',
		};
		let response = false;
		await axios
			.post(URL.FACTURE_CHANGE_ETAT, data)
			.then(() => {
				root.$swal({
					title: 'Succès',
					text: 'Votre facture est maintenant engristré !',
					icon: 'success',
					showCancelButton: true,
					confirmButtonText: 'ok',
					customClass: {
						confirmButton: 'btn btn-primary',
						cancelButton: 'btn btn-outline-primary ml-1',
					},
				});

				response = true;
			})
			.catch((error) => {
				response = true;
				console.log(error);
				root.$swal({
					title: 'Erreur',
					text: "Votre facture n'est pas enregistré, veillez rééssayer",
					icon: 'error',
					showCancelButton: true,
					confirmButtonText: 'Rééssayer',
					cancelButtonText: 'Annuler',
					customClass: {
						confirmButton: 'btn btn-primary',
						cancelButton: 'btn btn-outline-primary ml-1',
					},
				});
			});

		return {
			data: response,
		};
	}

	zip__amountPaid(data, root = null) {
		let amount_value = 0;
		let amount = 0;

		if (data.versements.length === 0 || data.versements === undefined) {
			return amount_value;
		} else {
			for (let n = 0; n < data.versements.length; n++) {
				const el = data.versements[n];
				amount = parseInt(amount + el.montant);
				amount_value = parseInt(amount);
			}
			return parseInt(amount_value);
		}
	}

	zip__amountToPaid(data, root = null) {
		let amount_value = 0;
		let amount = 0;
		let toPaid = 0;
		if (data.versements.length === 0) {
			return parseInt(data.total_ttc);
		} else {
			for (let n = 0; n < data.versements.length; n++) {
				const el = data.versements[n];
				amount = parseInt(amount + el.montant);
				toPaid = parseInt(data.total_ttc - amount);
				amount_value = parseInt(toPaid);
			}
			return amount_value;
		}
	}
}

export default new paymentsRealTime();
