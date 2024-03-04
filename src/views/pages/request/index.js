// ****
// Indication important avant de pouvoir utiliser les routes d'api definit ici
//
// Ajoutez dans chaque composant (fichiers) où vous souhaitez faire des requetes vers l'api le lien ci dessous
// ===>>> import URL from '@/views/pages/request'
//
// Vous n'avez ensuite qu'a faire dans vos requetes < URL.NOM_DE_LA_ROUTE_A_UTILISER >
//
// ****

// TOUTES LES URL DISPONIBLE DANS L'APP
const baseUrl = 'https://api.ediqia.com/api'
// const baseUrl = 'http://127.0.0.1:8000/api'

const URL = {
	LOGIN: `${baseUrl}/login`,

	VERIFICATION: `${baseUrl}/verification`,

	REGISTER: `${baseUrl}/register`,

	CHECKPASS: `${baseUrl}/checkpass`,

	RESET_PASSWORD: `${baseUrl}/reset_password`,

	EMAIL_RESET_PASSWORD: `${baseUrl}/email_reset_password`,

	EMAIL_RESET_IDCOMPTE: `${baseUrl}/resetIdCompte`,

	ENVOI_TOKEN: `${baseUrl}/paiement-status`,

	ACHAT_ABONNEMENT: `${baseUrl}/abonnement`,

	ABONNEMENT_CREATE: `${baseUrl}/abonnement/store`,

	CONNECTED_USER: `${baseUrl}/user_connecte`,

	USER_CONNECTED_INFO_PROFILE: `${baseUrl}/users_info`,

	USER_CONNECTED_OR_PERSONAL_UPDATE: `${baseUrl}/update_Users`,

	VERIFY_TOKEN: `${baseUrl}/checktokens`,

	CREATED_USER: `${baseUrl}/user_createur`,

	RESET_USER_CONNECT_PASSWORD: `${baseUrl}/resetPassword`,

	ENTREPRISE_INFO: `${baseUrl}/entreprise_info`,
	ENTREPRISE_UPDATE: `${baseUrl}/update_Entreprise`,
	PRESENTATION_UPDATE: `${baseUrl}/update_presentation`,
	

	ENTREPRISE_ANALYSIS: `${baseUrl}/entreprise/analysis`,

	ENTREPRISE_CREATE: `${baseUrl}/entreprise/create`,

	ENTREPRISE_STORE: `${baseUrl}/entreprise/store`,

	ENTREPRISE: `${baseUrl}/entreprise`,

	USER_INFO: `${baseUrl}/user_info`,

	USER_CREATE: `${baseUrl}/createUser`,

	USER_UPDATE: `${baseUrl}/updateUser`,

	EMPLOYE_LIST: `${baseUrl}/liste_employee`,

	EMPLOYE_DETROY: `${baseUrl}/employe/destroy`,

	CLIENT_LIST: `${baseUrl}/client`,

	CLIENT_CREATE: `${baseUrl}/client/store`,

	CLIENT_DESTROY: `${baseUrl}/client/destroy`,

	CLIENT_UPDATE: `${baseUrl}/client/update/`,

	ARTICLE_LIST: `${baseUrl}/article`,

	ARTICLE_CREATE: `${baseUrl}/article/store`,

	ARTICLE_UPDATE: `${baseUrl}/article/update`,

	ARTICLE_DESTROY: `${baseUrl}/article/destroy`,

	// Categorie

	CATEGORY_CREATE: `${baseUrl}/article/categorisation`,

	CATEGORY_UPDATE: `${baseUrl}/article/updateCategorisation`,

	CATEGORY_DESTROY: `${baseUrl}/article/deleteCategorisation`,

	// End Category

	CATALOGUE: `${baseUrl}/mailCatalogue`,

	TAXE_LIST: `${baseUrl}/taxe`,

	TAXE_CREATE: `${baseUrl}/taxe/store`,

	TAXE_DESTROY: `${baseUrl}/taxe/destroy`,

	CATEGORIE_LIST: `${baseUrl}/article/create`,

	FACTURE_LIST: `${baseUrl}/facture`,

	LISTE_FACTURE_CLIENT: `${baseUrl}/listFactureClient`,

	FACTURE_CREATE: `${baseUrl}/facture/store`,

	FACTURE_UPDATE: `${baseUrl}/facture/update/`,

	FACTURE_DESTROY: `${baseUrl}/facture/destroy`,
	FACTURE_CHANGE_ETAT: `${baseUrl}/facture/changerEtatDeFacture`,

	FACTURE_SENDEMAIL: `${baseUrl}/facture/sendmailpdf`,

	DEVIS_TO_FACTURE: `${baseUrl}/facture/change/`,

	ENVOI_RELANCE: `${baseUrl}/mailRelance`,

	VERSEMENT_: `${baseUrl}/versement`,

	VERSEMENT_LIST: `${baseUrl}/versement`,

	VERSEMENT_CREATE: `${baseUrl}/versement/store`,

	VERSEMENT_UPDATE: `${baseUrl}/versement/update`,

	VERSEMENT_DESTROY: `${baseUrl}/versement/destroy`,

	COMPTE_LIST: `${baseUrl}/compte`,

	COMPTE_CREATE: `${baseUrl}/compte/store`,

	COMPTE_UPDATE: `${baseUrl}/compte/update/`,

	COMPTE_DESTROY: `${baseUrl}/compte/destroy`,

	DEPARTEMENT_LIST: `${baseUrl}/departement/`,

	DEPARTEMENT_CREATE: `${baseUrl}/departement/store`,

	DEPARTEMENT_UPDATE: `${baseUrl}/departement/update`,

	DEPARTEMENT_DESTROY: `${baseUrl}/departement/destroy`,

	DEPENSE_LIST: `${baseUrl}/depense`,

	DEPENSE_CREATE: `${baseUrl}/depense/store`,

	DEPENSE_RECURRENTE: `${baseUrl}/depense/storeRecurrente`,

	DEPENSE_GROUPE: `${baseUrl}/depense/storeGroupe`,

	EMPRUNT_LIST_CREATE: `${baseUrl}/emprunt/create`,

	EMPRUNT_CREATE: `${baseUrl}/emprunt/store`,
	DEPENSE_CREATE_REGLEMENT: `${baseUrl}/depense/storeReglement`,

	DEPENSE_DESTROY: `${baseUrl}/depense/destroy`,

	DEPENSE_ITEM: `${baseUrl}/depense/item`,

	PARAMETRE_LIST: `${baseUrl}/parametre`,

	PARAMETRE_ITEM: `${baseUrl}/parametre/item`,

	PARAMETRE_CREATE: `${baseUrl}/parametre/store`,

	PARAMETRE_CREATEADMIN: `${baseUrl}/parametre/storeAdmin`,

	PARAMETRE_UPDATE: `${baseUrl}/parametre/update`,

	PARAMETRE_DESTROY: `${baseUrl}/parametre/destroy`,

	FOURNISSEUR_LIST: `${baseUrl}/fournisseur`,

	FOURNISSEUR_CREATE: `${baseUrl}/fournisseur/store`,

	FOURNISSEUR_UPDATE: `${baseUrl}/fournisseur/update`,

	FOURNISSEUR_DESTROY: `${baseUrl}/fournisseur/destroy`,

	EMPRUNT_LIST: `${baseUrl}/emprunt`,

	EMPRUNT_CREATE: `${baseUrl}/emprunt/store`,

	EMPRUNT_DESTROY: `${baseUrl}/emprunt/destroy`,

	REMBOURSEMENT_UPDATE: `${baseUrl}/remboursement/update`,

	CREANCIER_CREATE: `${baseUrl}/creancier/store`,

	PARAMETRE: `${baseUrl}/parametre`,

	TYPE_PARAMETRE: `${baseUrl}/type-parametre`,

	TYPE_PARAMETRE_CREATE: `${baseUrl}/type-parametre/store`,

	TYPE_PARAMETRE_UPDATE: `${baseUrl}/type-parametre/update`,

	TYPE_PARAMETRE_DESTROY: `${baseUrl}/type-parametre/destroy`,

	PERMISSION_LIST: `${baseUrl}/permission`,

	PERMISSION_CREATE: `${baseUrl}/permission/store`,

	PERMISSION_UPDATE: `${baseUrl}/permission/update`,

	PERMISSION_DESTROY: `${baseUrl}/permission/destroy`,

	PROJET_LIST: `${baseUrl}/projet`,

	PROJET_CREATE: `${baseUrl}/projet/store`,

	PROJET_UPDATE: `${baseUrl}/projet/update`,

	PROJET_DESTROY: `${baseUrl}/projet/destroy`,

	ROLE_CREATE: `${baseUrl}/role/store`,
	ROLE_UPDATE: `${baseUrl}/role/update`,
	ROLE_INDEX: `${baseUrl}/role`,

	PAIEMENT: `${baseUrl}/paiement`,

	PAIEMENT_TOKEN: `${baseUrl}/paiement?token=`,

	PROSPECTION_LIST: `${baseUrl}/prospection`,

	PROSPECTION_CREATE: `${baseUrl}/prospection/store`,

	PROSPECTION_DESTROY: `${baseUrl}/prospection/destroy`,

	PROSPECTION_UPDATE: `${baseUrl}/prospection/update`,

	PROSPECT_LIST: `${baseUrl}/prospect`,

	PROSPECT_CREATE: `${baseUrl}/prospect/store`,

	PROSPECT_UPDATE: `${baseUrl}/prospect/update`,

	PROSPECT_DESTROY: `${baseUrl}/prospect/destroy`,

	MODULES: `${baseUrl}/module`,

	MODULES_CREATE: `${baseUrl}/module/store`,

	MODULES_UPDATE: `${baseUrl}/module/update`,

	//BILL PAYMANTS - INVOICE
	BILL_PAYMANTS: `${baseUrl}/versementFacture`,
	BILL_PAYMANTS_UPDATE: `${baseUrl}/versement/update`,
	BILL_PAYMANTS_DELETE: `${baseUrl}/versement/destroy`,

	//BILL PAYMANTS HISTORIQUE - INVOICE
	INVOICE_HISTORIQUE: `${baseUrl}/historique`,

	//BILL PAYMANTS FILES - INVOICE
	INVOICE_SEND_FILES: `${baseUrl}/ajoutDeFichierfacture`,
	INVOICE_COLLECT_FILES: `${baseUrl}/collectDeFichier`,
	INVOICE_ADD_COMMENTS: `${baseUrl}/ajoutDeCommentaire`,
	INVOICE_COLLECT_COMMENTS: `${baseUrl}/collectDeCommentaire`,
};

export default URL;
