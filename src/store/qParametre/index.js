export default {
	namespaced: true,
	state: {
		//
		dataParametre: [],
	},
	getters: {},
	mutations: {
		/***
		 * @Devis
		 */

		 LIST_PARAMETRES_DATA(state, data) {
			state.dataParametre = data;
		},
	},
	actions: {},
};
