import axios from 'axios';
import URL from '@/views/pages/request/index';

class InvoiceGetProvider {
	constructor() {
		this.__invoice_current = JSON.parse(localStorage.getItem('facture'));
	}

	async getBillPayments() {
		return await axios.post(URL.BILL_PAYMANTS, {
			id: this.__invoice_current.id,
		});
	}

	data_getBillPayments(billPayment, i) {
		return {
			id_versement: billPayment.versements[i].id,
			compte_id: billPayment.user_id,
			facture_id: billPayment.id,
			code: billPayment.versements[i].code, //Code of ivoice
			amount:
				billPayment.versements.length !== 0
					? billPayment.versements[i].montant
					: 'Pas Definir...',
			montant: billPayment.versements[i].montant,
		};
	}

	async getInvoiceFiles() {
		return await axios.post(URL.BILL_PAYMENTS_COLLECT_FILES, {
			id: this.__invoice_current.id,
		});
	}
}

export default new InvoiceGetProvider();
