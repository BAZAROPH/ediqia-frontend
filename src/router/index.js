import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		// Route vers l'accueil
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/pages/dashboard/Home.vue'),
			meta: {
				title: 'Tableau de bord',
				pageTitle: 'Tableau de bord',
				breadcrumb: [
					{
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page configuration
		{
			path: '/typeparametres',
			name: 'typeparametres',
			component: () =>
				import('@/views/pages/dashboard/parametre/type_parametre.vue'),
			meta: {
				pageTitle: 'Parametrage',
				breadcrumb: [
					{
						text: 'Liste des types parametres',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/parametres',
			name: 'parametres',
			component: () =>
				import('@/views/pages/dashboard/parametre/parametre.vue'),
			meta: {
				pageTitle: 'Parametrage',
				breadcrumb: [
					{
						text: 'Liste des parametres',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers la page d'inscription
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/pages/auth/register/Register.vue'),
			meta: {
				layout: 'full',
			},
		},
		// Route vers la page de connexion
		{
			path: '/entreprise',
			name: 'entreprise',
			component: () => import('@/views/pages/auth/register/Entreprise.vue'),
			meta: {
				layout: 'full',
				requiresAuth: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/pages/auth/login/Login.vue'),
			meta: {
				layout: 'full',
			},
		},
		// Route vers la page de reintialisation de mot de passe
		{
			path: '/reset-password',
			name: 'reset-password',
			component: () => import('@/views/pages/auth/passwordReset/emailForm.vue'),
			meta: {
				layout: 'full',
			},
		},
		{
			path: '/new-password',
			name: 'new-password',
			component: () => import('@/views/pages/auth/newPassword/NewPassword.vue'),
			meta: {
				layout: 'full',
			},
		},

		// Route vers la page de reintialisation ID compte
		{
			path: '/reset-IdCompte',
			name: 'reset-IdCompte',
			component: () => import('@/views/pages/auth/codeReset/codeResetForm.vue'),
			meta: {
				layout: 'full',
			},
		},
		// Route vers la page des taxes
		{
			path: '/taxes',
			name: 'taxes',
			component: () => import('@/views/pages/dashboard/taxe/Taxe.vue'),
			meta: {
				pageTitle: 'Taxes',
				breadcrumb: [
					{
						text: 'Taxes',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers la page de definition des echeances
		{
			path: '/echeances/create',
			name: 'taxes',
			component: () => import('@/views/pages/dashboard/facture/echeances.vue'),
			meta: {
				pageTitle: 'Échéances',
				breadcrumb: [
					{
						text: 'écheances',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page detail entreprise
		{
			path: '/profile/entreprise',
			name: 'Détail Entreprise',
			component: () => import('@/views/pages/dashboard/entreprise/profil.vue'),
			meta: {
				pageTitle: 'Détail Entreprise',
				breadcrumb: [
					{
						text: 'Détail Entreprise',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page profil de l'utilisateur connecté
		{
			path: '/profile',
			name: 'profile',
			component: () => import('@/views/pages/dashboard/profile/profile2.vue'),
			meta: {
				pageTitle: 'Profile',
				breadcrumb: [
					{
						text: 'Mon Profil',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page des comptes
		{
			path: '/comptes',
			name: 'comptes',
			component: () => import('@/views/pages/dashboard/compte/compte.vue'),
			meta: {
				pageTitle: 'Comptes',
				breadcrumb: [
					{
						text: 'Comptes',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page des versement
		{
			path: '/versements',
			name: 'versements',
			component: () =>
				import('@/views/pages/dashboard/versement/versement.vue'),
			meta: {
				pageTitle: 'Versement',
				breadcrumb: [
					{
						text: 'versements',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/pack',
			name: 'pack',
			component: () => import('@/views/pages/pricing/pack.vue'),
			meta: {
				pageTitle: 'Pack',
				layout: 'full',
				requiresAuth: true,
			},
		},
		// Route vers la page des clients
		{
			path: '/clients',
			name: 'clients',
			component: () => import('@/views/pages/dashboard/client/Client.vue'),
			meta: {
				pageTitle: 'Client',
				breadcrumb: [
					{
						text: 'Client',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers les details d'un client
		{
			path: '/clients/detail',
			name: 'détail client',
			component: () =>
				import('@/views/pages/dashboard/client/detail/ClientDetail.vue'),
			meta: {
				pageTitle: 'Détail Client',
				breadcrumb: [
					{
						text: 'Détail client',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/list',
			name: 'apps-users-list',
			component: () => import('@/views/apps/user/users-list/UsersList.vue'),
		},

		// Route vers la page des articles
		{
			path: '/articles',
			name: 'articles',
			component: () => import('@/views/pages/dashboard/article/article.vue'),
			meta: {
				pageTitle: 'Article',
				breadcrumb: [
					{
						text: 'article',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page catalogue
		{
			path: '/catalogues',
			name: 'catalogue',
			component: () => import('@/views/pages/dashboard/article/catalogue.vue'),
			meta: {
				pageTitle: 'Catalogue',
				breadcrumb: [
					{
						text: 'catalogue',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page catalogue pdf
		{
			path: '/catalogues-pdf',
			name: 'Catalogue',
			component: () =>
				import('@/views/pages/dashboard/article/cataloguepdf.vue'),
			meta: {
				pageTitle: 'Catalogue',
				breadcrumb: [
					{
						text: 'catalogue pdf',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page Liste facture
		// {
		// 	path: '/devis',
		// 	name: 'DevisList',
		// 	component: () =>
		// 		import('@/views/pages/dashboard/devis/Liste_devis/DevisList.vue'),
		// 	meta: {
		// 		title: 'Banana fish',
		// 		pageTitle: 'Liste des devis',
		// 		breadcrumb: [
		// 			{
		// 				text: 'Devis',
		// 				active: true,
		// 			},
		// 		],
		// 		requiresAuth: true,
		// 	},
		// },

		// // Route vers la page de creation de devis
		// {
		// 	path: '/devis/create',
		// 	name: 'DevisAdd',
		// 	component: () => import('@/views/pages/dashboard/devis/Devis.vue'),
		// 	meta: {
		// 		pageTitle: 'Devis',
		// 		breadcrumb: [
		// 			{
		// 				text: 'Devis',
		// 				active: true,
		// 			},
		// 		],
		// 		requiresAuth: true,
		// 	},
		// },

		/*****
		 *
		 *
		 *
		 *
		 */
		{
			path: '/facture/view',
			name: 'FacturePreview',
			component: () =>
				import(
					'@/views/pages/dashboard/facture/Apercu_facture/FacturePreview.vue'
				),
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '/devis/view',
			name: 'DevisPreview',
			component: () =>
				import(
					'@/views/pages/dashboard/facture/Apercu_facture/FacturePreview.vue'
				),
			meta: {
				requiresAuth: true,
			},
		},

		/*****
		 *
		 *
		 *
		 *
		 */
		{
			path: '/edit/devis',
			name: 'DevisEdit',
			component: () => import('@/views/pages/dashboard/facture/Facture.vue'),
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '/edit/facture',
			name: 'FactureEdit',
			component: () => import('@/views/pages/dashboard/facture/Facture.vue'),
			meta: {
				requiresAuth: true,
			},
		},

		/*****
		 *
		 *
		 *
		 *
		 */
		{
			path: '/create/devis',
			name: 'DevisAdd',
			component: () => import('@/views/pages/dashboard/facture/Facture.vue'),
			meta: {
				pageTitle: 'Devis',
				breadcrumb: [
					{
						text: 'Devis',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/create/facture',
			name: 'FactureAdd',
			component: () => import('@/views/pages/dashboard/facture/Facture.vue'),
			meta: {
				pageTitle: 'Facture',
				breadcrumb: [
					{
						text: 'Facture',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		/*****
		 *
		 *
		 *
		 *
		 */

		// Route vers la page de creation de module
		{
			path: '/modules/create',
			name: 'module',
			component: () => import('@/views/pages/dashboard/module/module.vue'),
			meta: {
				pageTitle: 'Module',
				breadcrumb: [
					{
						text: 'Module',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		/*****
		 *
		 *
		 *
		 *
		 */
		{
			path: '/transactions',
			name: 'transaction',
			component: () =>
				import('@/views/pages/dashboard/transaction/transaction.vue'),
			meta: {
				pageTitle: 'Tous les transactions',
				breadcrumb: [
					{
						text: 'Transactions',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de modifier de module
		{
			path: '/modules/update',
			name: 'module',
			component: () =>
				import('@/views/pages/dashboard/module/update_module.vue'),
			meta: {
				pageTitle: 'Module',
				breadcrumb: [
					{
						text: 'Modier un Module',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de d'achat de module
		{
			path: '/modules/add',
			name: 'add',
			component: () => import('@/views/pages/dashboard/module/add.vue'),
			meta: {
				pageTitle: 'Modules',
				breadcrumb: [
					{
						text: 'Acheter un Module',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de crud de modules
		{
			path: '/modules',
			name: 'listmodule',
			component: () => import('@/views/pages/dashboard/module/list_module.vue'),
			meta: {
				pageTitle: 'Module',
				breadcrumb: [
					{
						text: 'Module',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page des relances
		{
			path: '/relances',
			name: 'relance',
			component: () => import('@/views/pages/dashboard/relance/relance.vue'),
			meta: {
				pageTitle: 'Relances',
				breadcrumb: [
					{
						text: 'Relance',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page Liste facture
		{
			path: '/lists/factures',
			name: 'FactureList',
			component: () =>
				import('@/views/pages/dashboard/facture/Liste_facture/FactureList.vue'),
			meta: {
				title: 'Banana fish',
				pageTitle: 'Liste des factures',
				breadcrumb: [
					{
						text: 'Facture',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/lists/devis',
			name: 'DevisList',
			component: () =>
				import('@/views/pages/dashboard/facture/Liste_facture/FactureList.vue'),
			meta: {
				title: 'Banana fish',
				pageTitle: 'Liste des devis',
				breadcrumb: [
					{
						text: 'Devis',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de paiement
		{
			path: '/paiement',
			name: 'paiement',
			component: () => import('@/views/pages/paiement/paiement.vue'),
			meta: {
				layout: 'full',
				requiresAuth: true,
			},
		},
		//Projets
		{
			path: '/projets',
			name: 'projet',
			component: () => import('@/views/pages/dashboard/projet/projet.vue'),
			meta: {
				pageTitle: 'Projet',
				breadcrumb: [
					{
						text: 'Projet',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers la page Aperçu facture
		// {
		// 	path: '/facture/view',
		// 	name: 'FacturePreview',
		// 	component: () =>
		// 		import(
		// 			'@/views/pages/dashboard/facture/Apercu_facture/FacturePreview.vue'
		// 		),
		// 	meta: {
		// 		requiresAuth: true,
		// 	},
		// },
		// Route vers la page Aperçu facture
		// {
		// 	path: '/facture/edit',
		// 	name: 'FactureEdit',
		// 	component: () =>
		// 		import(
		// 			'@/views/pages/dashboard/facture/Edition_facture/FactureEdit.vue'
		// 		),
		// 	meta: {
		// 		requiresAuth: true,
		// 	},
		// },
		// Route vers la page des Emprunts
		{
			path: '/emprunts',
			name: 'emprunt',
			component: () => import('@/views/pages/dashboard/emprunt/emprunt.vue'),
			meta: {
				pageTitle: 'Emprunt',
				breadcrumb: [
					{
						text: 'Accueil',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

   // Route vers la page creation des depense simple
   {
    path: '/depense-simple',
    name: 'depense-simple',
    component: () => import('@/views/pages/dashboard/depense/simple/depense_simple.vue'),
    meta: {
      pageTitle: 'Depense',
      breadcrumb: [
        {
          text: 'Effectuer une depense',
          active: true,
        },
        {
          text: 'Liste des depenses simples',
          to: { name: 'liste-depense-simple' }
        },
      ],
      requiresAuth: true
    },
  },
 // Route vers la page preview des depenses simples
 {
  path: '/preview-depense-simple',
  name: 'preview-depense-simple',
  component: () => import('@/views/pages/dashboard/depense/simple/preview_depense_simple.vue'),
  meta: {
    pageTitle: 'Depense',
    breadcrumb: [
      {
        text: 'Detail de la depense',
        active: true,
      },
      {
        text: 'Liste des depenses simples',
        to: { name: 'liste-depense-simple' },
      },
    ],
    requiresAuth: true
  },
},

//   Route vers la page liste des depense simples
  {
    path: '/liste-depense-simple',
    name: 'liste-depense-simple',
    component: () => import('@/views/pages/dashboard/depense/simple/liste_depense_simple.vue'),
    meta: {
      pageTitle: 'Depense',
      breadcrumb: [
        {
          text: 'Liste des depenses',
          active: true,
        },
      ],
      requiresAuth: true
    },
  },
	
		// Route vers la page des depense simple
		{
			path: '/depense-simple',
			name: 'depense-simple',
			component: () =>
				import('@/views/pages/dashboard/depense/simple/depense_simple.vue'),
			meta: {
				pageTitle: 'Depense',
				breadcrumb: [
					{
						text: 'Effectuer une depense',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

	
		// Route vers la page des depense-groupée
		{
			path: '/depense-groupe',
			name: 'depense-groupe',
			component: () =>
				import('@/views/pages/dashboard/depense/depense_groupe.vue'),
			meta: {
				pageTitle: 'Depense groupée',
				breadcrumb: [
					{
						text: 'Effectuer une depense groupée',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de la liste des depenses groupées
		{
			path: '/liste-depense-groupe',
			name: 'liste-depense-groupe',
			component: () =>
				import('@/views/pages/dashboard/depense/liste_depense_groupe.vue'),
			meta: {
				pageTitle: 'Depense groupée',
				breadcrumb: [
					{
						text: 'Liste des depense groupées',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page des depenses recurrentes
		{
			path: '/depense-recurrente',
			name: 'depense-recurrente',
			component: () =>
				import('@/views/pages/dashboard/depense/depense_recurrente.vue'),
			meta: {
				pageTitle: 'Depense',
				breadcrumb: [
					{
						text: 'Effectuer une depense recurrente',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de la liste des depenses recurrentes
		{
			path: '/liste-depense-recurrente',
			name: 'liste-depense-recurrente',
			component: () =>
				import('@/views/pages/dashboard/depense/liste_depense_recurrente.vue'),
			meta: {
				pageTitle: 'Depense recurrente',
				breadcrumb: [
					{
						text: 'Liste des depense recurrente',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page de fournisseur
		{
			path: '/fournisseurs',
			name: 'fournisseurs',
			component: () =>
				import('@/views/pages/dashboard/fournisseur/fournisseur.vue'),
			meta: {
				pageTitle: 'Fournisseur',
				breadcrumb: [
					{
						text: 'Enregistrer un fournisseur',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/detail',
			name: 'détail-fournisseur',
			component: () =>
				import('@/views/pages/dashboard/fournisseur/detail/ClientDetail.vue'),
			meta: {
				pageTitle: 'Détail Fournisseur',
				breadcrumb: [
					{
						text: 'Détail fournisseur',
						active: true,
						to: { name: 'fournisseurs' },
					},
					{
						text: 'Retour',
						to: { name: 'fournisseurs' },
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers la page des departements
		{
			path: '/departements',
			name: 'departement',
			component: () =>
				import('@/views/pages/dashboard/departement/departement.vue'),
			meta: {
				pageTitle: 'Département',
				breadcrumb: [
					{
						text: 'departement',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers la page 404
		{
			path: '/error-404',
			name: 'error-404',
			component: () => import('@/views/error/Error404.vue'),
			meta: {
				layout: 'full',
			},
		},
		// Route vers new emprunt
		{
			path: '/newemprunt',
			name: 'newemprunt',
			component: () => import('@/views/pages/dashboard/emprunt/newemprunt.vue'),
			meta: {
				pageTitle: 'Emprunt',
				breadcrumb: [
					{
						text: 'Emprunt',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers new creation des employees
		{
			path: '/createUsers',
			name: 'createUsers',
			component: () => import('@/views/pages/dashboard/user/createUser.vue'),
			meta: {
				pageTitle: 'Gestion des utilisateurs',
				breadcrumb: [
					{
						text: "Creation d'Users",
						active: true,
					},
				],
				requiresAuth: true,
			},
		},
		// Route vers new creation d'un nouvel utilisateurs
		{
			path: '/employes',
			name: 'employes',
			component: () => import('@/views/pages/dashboard/user/newUsers.vue'),
			meta: {
				pageTitle: 'Gestion des employés',
				breadcrumb: [
					{
						text: 'Creation employés',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers detail d'un employe
		{
			path: '/detail/employe',
			name: 'détail employe',
			component: () =>
				import('@/views/pages/dashboard/user/detail/detail_users.vue'),
			meta: {
				pageTitle: 'Gestion des employés',
				breadcrumb: [
					{
						text: "Détail d'employe",
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers detail d'un employe
		{
			path: '/inventaires',
			name: 'inventaire',
			component: () =>
				import('@/views/pages/dashboard/inventaire/inventaire.vue'),
			meta: {
				pageTitle: 'Iventaire',
				breadcrumb: [
					{
						text: 'Créer un inventaire',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route vers detail d'une prospection
		{
			path: '/liste-prospection',
			name: 'liste-prospection',
			component: () =>
				import('@/views/pages/dashboard/prospection/prospection_liste.vue'),
			meta: {
				pageTitle: 'Prospection',
				breadcrumb: [
					{
						text: 'Créer une prospection',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		{
			path: '/prospection',
			name: 'prospection',
			component: () =>
				import('@/views/pages/dashboard/prospection/prospection_create.vue'),
			meta: {
				pageTitle: 'Prospection',
				breadcrumb: [
					{
						text: 'Créer une prospection',
						active: true,
					},
					{
						text: 'Liste des prospections',
						to: { name: 'liste-prospection' }
					  },
				],
				requiresAuth: true,
			},
		},

		// Route vers detail d'une prospection
		{
			path: '/prospect',
			name: 'prospect',
			component: () =>
				import('@/views/pages/dashboard/prospection/prospect.vue'),
			meta: {
				pageTitle: 'Prospection',
				breadcrumb: [
					{
						text: 'Créer un prospect',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route création de permission
		{
			path: '/permissions',
			name: 'permission',
			component: () =>
				import('@/views/pages/dashboard/permission/permission.vue'),
			meta: {
				pageTitle: 'Permissions',
				breadcrumb: [
					{
						text: 'créer une permission',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route création de permission
		{
			path: '/roles',
			name: 'role',
			component: () => import('@/views/pages/dashboard/role/role.vue'),
			meta: {
				pageTitle: 'Roles',
				breadcrumb: [
					{
						text: 'créer un role',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Route update de permission

		{
			path: '/updateRole',
			name: '',
			component: () => import('@/views/pages/dashboard/role/updateRole.vue'),
			meta: {
				pageTitle: 'Roles',
				breadcrumb: [
					{
						text: 'créer un role',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// // Route vers new emprunt
		// {
		//   path: '/newemprunt',
		//   name: 'emprunt',
		//   component: () => import('@/views/pages/dashboard/emprunt/newemprunt.vue'),
		//   meta: {
		//     pageTitle: 'Emprunt',
		//     breadcrumb: [
		//       {
		//         text: 'Emprunt',
		//         active: true,
		//       },
		//     ],
		//     requiresAuth: true
		//   },
		// },

		// ALL ROUTE FOR CATEGORIE
		{
			path: '/categories',
			name: 'CategorieArticles',
			component: () =>
				import('@/views/pages/dashboard/categorie/categorie.vue'),
			meta: {
				pageTitle: 'Listes des categories',
				breadcrumb: [
					{
						text: 'categories',
						active: true,
					},
				],
				requiresAuth: true,
			},
		},

		// Redirige vers la page 404 au cas où la route pointé ne figure pas dans la liste des routes
		{
			path: '*',
			redirect: 'error-404',
		},
	],
});

router.beforeEach((to, from, next) => {
	// Determine if the route requires authentication
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Get value from somewhere to determine if the user is
		// logged in or not
		let isLoggedIn = false;
		if (localStorage.getItem('token')) {
			isLoggedIn = localStorage.getItem('modia');
		}

		// If user is not logged in, navigate to the named "login" route
		// with a query string parameter indicating where to navigate to after
		// successful login
		if (!isLoggedIn) {
			// Navigate to login route
			next({
				name: 'login',
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
	// Remove initial loading
	const appLoading = document.getElementById('loading-bg');
	if (appLoading) {
		appLoading.style.display = 'none';
	}
});

export default router;
