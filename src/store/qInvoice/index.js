import paymentRealTime from '@/utils/utilsInvoice/paymentRealTime';

export default {
	namespaced: true,
	state: {
		//Count
		countBillPayments: 0,
		countComments: 0,
		countDataInvoice: 0,
		countBankAccount: 0,

		//
		invoicePaidTotal: 0,
		invoiceUnpaid: 0,
		amountPaid: 0,

		// Data
		dataBillPayments: [],
		dataComments: [],
		dataToRemove: null,
		dataInvoice: [],
		dataBankAccount: [],

		//Other
		isEmptyData: false,
		isEmptyDataComments: false,
		ifBillPaymentsRemove: false,
		hideInvoiceMoreDetails: false,

		//
	},
	getters: {},
	mutations: {
		/***
		 * @Invoice
		 */

		LIST_DATA_INVOICE(state, data) {
			for (let i = 0; i < data.length; i++) {
				const el = data[i];
				el.line = i;
				data[i].amountPaid = paymentRealTime.zip__amountPaid(el);
				data[i].amountToPaid = paymentRealTime.zip__amountToPaid(el);
			}
			state.countDataInvoice = data.length;
			state.dataInvoice = data;
		},

		UPDATE_DATA_INVOICE(state, { id, amount, data }) {
			const newData = data.filter(function(bill) {
				return bill.id === id;
			});
			newData.amountPaid = parseInt(newData.amountPaid + amount);
			newData.amountToPaid = parseInt(newData.amountPaid - amount);
			state.dataInvoice = newData;
			state.countDataInvoice = newData.length;
		},

		/***
		 * @BillPaymants
		 */
		DATA_BILLPAYMENT(state, data) {
			state.countBillPayments = data.length;
			state.dataBillPayments = data;
		},

		UPDATE_AMOUNT(state, { data, id, amount }) {
			const newData = [];
			data.forEach((el, index) => {
				console.log(el.id_versement);
				if (el.id_versement === id) {
					el.amount = amount;
				}
				newData.push(el);
			});
			state.dataBillPayments = newData;
		},

		DATA_BILLPAYMENT_AMOUNT_TRANSC(state, { toPaid, unPaid }) {
			state.invoiceUnpaid = toPaid;
			state.invoicePaid = unPaid;
		},

		// DELETE_CHECKING(state, bool){
		// 	state.ifBillPaymentsRemove = bool
		// },

		DELETE_BILLPAYMENT(state, { data, id }) {
			const newData = data.filter(function(bill) {
				return bill.id_versement != id;
			});
			state.dataBillPayments = newData;
			state.countBillPayments = newData.length;
		},

		/***
		@Comments
		 */

		DATA_COMMENTS(state, data) {
			state.countComments = data.length;
			state.dataComments = data;
		},

		ADD_COMMENTS(state, data) {
			state.countComments = data.length;
			state.dataComments = data;
		},

		/***
		@Banks_Account
		 */

		ADD_BANK_ACCOUNT(state, data) {
			state.countBankAccount = data.length;
			state.dataBankAccount = data;
		},

		/***
		@Ohter
		 */
		HIDDEN_INVOICE_MORE_DETAIL(state, bool) {
			state.hideInvoiceMoreDetails = bool;
		},
		AMMOUNT_TO_PAID(state, montant) {
			state.amountPaid = montant;
		},
	},
	actions: {},
};
