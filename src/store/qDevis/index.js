export default {
	namespaced: true,
	state: {
		//
		dataDevis: [],
	},
	getters: {},
	mutations: {
		/***
		 * @Devis
		 */

		LIST_DATA_DEVIS(state, data) {
			state.dataDevis = data;
		},
	},
	actions: {},
};
