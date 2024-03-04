export default {
	namespaced: true,
	state: {
		//
		dataFournier: [],
	},
	getters: {},
	mutations: {
		/***
		 * @Invoice
		 */

		LIST_DATA_FOURNIER(state, data) {
			state.dataFournier = data;
		},
	},
	actions: {},
};
