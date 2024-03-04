export default {
	namespaced: true,
	state: {
		//
		dataCategory: [],
	},
	getters: {},
	mutations: {
		/***
		 * @Devis
		 */

		LIST_DATA_CATEGORY(state, data) {
			state.dataCategory = data;
		},
	},
	actions: {},
};
