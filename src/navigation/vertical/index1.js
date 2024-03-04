export default [
  {
    title: "Tableau de bord",
    route: "home",
    icon: "HomeIcon",
  },
  {
    title: "Entreprise",
    icon: "BriefcaseIcon",
    children: [
      {
        title: "Personnel",
        icon: "UserIcon",
        route: "employes",
      },
      {
        title: "Info entreprise",
        icon: "FolderIcon",
        route: "",
      },
      {
        title: "Module",
        icon: "CommandIcon",
        route: "",
      },
      {
        title: "Historique des factures",
        icon: "LayersIcon",
        route: "",
      },
      {
        title: "Département",
        icon: "LayoutIcon",
        route: "",
      },
      {
        title: "Agence",
        icon: "MapIcon",
        route: "",
      },
      {
        title: "Projet",
        icon: "PlusSquareIcon",
        route: "",
      },
    ],
  },
  {
    title: "Facturation",
    icon: "LayersIcon",
    children: [
      {
        title: "Facture",
        route: "FactureList",
        icon: "FileTextIcon",
        params:'facture'
      },
      {
        title: "Devis",
        route: "DevisList",
        icon: "FileMinusIcon",
      },
      {
        title: "Relance",
        route: "",
        icon: "RotateCwIcon",
      },
      {
        title: "Taxe",
        route: "taxes",
        icon: "PaperclipIcon",
      },
      {
        title: "Bon de commande",
        route: "",
        icon: "DollarSignIcon",
      },
      {
        title: "Configuration",
        route: "",
        icon: "CodepenIcon",
      },
    ],
  },
  {
    title: "Tresorerie",
    icon: "DollarSignIcon",
    children: [
      {
        title: "Dépense",
        route: "",
        icon: "CornerLeftUpIcon",
        children:[
          {
            title: "Depense simple",
            route: "liste-depense-simple",
            icon: "TrendingUpIcon",
          },
          {
            title: "Depense recurrente",
            route: "liste-depense-recurrente",
            icon: "TrendingUpIcon",
          },
          {
            title: "Depense groupée",
            route: "liste-depense-groupe",
            icon: "TrendingUpIcon",
          }
        ]
      },
      {
        title: "Transaction",
        route: "transaction",
        icon: "TrendingUpIcon",
      },
      {
        title: "Compte",
        route: "",
        icon: "LockIcon",
      },
      {
        title: "Budget",
        route: "",
        icon: "LayersIcon",
      },
      {
        title: "Emprunt",
        route: "emprunt",
        icon: "CornerRightDownIcon",
      },
    ],
  },
  {
    title: "Catalogue",
    icon: "ShoppingBagIcon",
    children: [
      {
        title: "Article",
        route: "articles",
        icon: "ShoppingBagIcon",
      },
      {
        title: "Code promo",
        route: "",
        icon: "TagIcon",
      },
      {
        title: "Catégorie d'article",
        route: "CategorieArticles",
        icon: "GridIcon",
      },

      {
        title: "Catalogue de produit",
        route: "catalogue",
        icon: "CopyIcon",
      },
      {
        title: "Pack",
        route: "depenses",
        icon: "CopyIcon",
      },
    ],
  },
  {
    title: "CRM",
    icon: "UsersIcon",
    children: [
      {
        title: "Client",
        route: "clients",
        icon: "UserCheckIcon",
      },
      {
        title: "Prospection",
        route: "liste-prospection",
        icon: "Minimize2Icon",
      },
      {
        title: "Prospect",
        route: "prospect",
        icon: "MehIcon",
      },
      {
        title: "Fournisseur",
        route: "",
        icon: "TruckIcon",
      },
    ],
  },
  {
    title: "parametres",
    route: "typeparametres",
    icon: "ToolIcon",
  },
  {
    title: "Modules",
    route: "listmodule",
    icon: "CreditCardIcon",
  },
  {
    title: "Ediqia",
    icon: "ZapIcon",
    children:[
      {
        title: "Rôles",
        route: "",
        icon: "FramerIcon",
      },
      {
        title: "Permissions",
        route: "",
        icon: "KeyIcon",
      },
      {
        title: "Modules",
        route: "",
        icon: "CommandIcon",
      },
      {
        title: "Paramètres",
        route: "parametres",
        icon: "SettingsIcon",
      },
      {
        title: "Type paramètres",
        route: "typeparametres",
        icon: "ServerIcon",
      },
    ],
  },
];