import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import app from './app';
import appConfig from './app-config';
import verticalMenu from './vertical-menu';
import qInvoice from './qInvoice';
import qFournier from './qFournier';
import qDevis from './qDevis';
import qCategory from './qCategory';
import qParametre from './qParametre';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		app,
		appConfig,
		verticalMenu,
		qInvoice,
		qFournier,
		qDevis,
		qCategory,
		qParametre
	},
	strict: process.env.DEV,
});
