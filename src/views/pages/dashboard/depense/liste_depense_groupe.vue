<template>
    <section>
        <div class="position-relative table-responsive table-base">
            <!-- modal reglement -->

            <b-modal id="modal-reglement" cancel-variant="outline-secondary"  centered title="Contenu de la depense" @ok="addReglement">
                <b-card-body class="invoice-padding form-item-section">
                    <div ref="form" class="repeater-form">
                        <!-- <h4 v-if="restePaye() !== 0" class="text-center">Déjà payé: <span class="text-success"> {{ dejaPaye() }} </span>, reste à payer: <span class="text-warning">{{ restePaye() }}</span></h4> -->
                        <b-row v-for="(item, index) in listDepense" :key="index" ref="row" class="pb-2 pt-2">
                            <!-- Item Form -->
                            <!-- ? This will be in loop => So consider below markup for single item -->
                            <b-col cols="12">
                                <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                                <div class="d-none d-lg-flex">
                                    <b-row class="flex-grow-1 px-1">
                                        <!-- Single Item Form Headers -->
                                        <b-col cols="12" lg="4">
                                            Article
                                        </b-col>
                                        <b-col cols="12" lg="4">
                                            Quantité
                                        </b-col>

                                        <b-col cols="12" lg="4">
                                            Prix
                                        </b-col>
                                    </b-row>
                                    <div class="form-item-action-col" />
                                </div>
                                <!-- Form Input Fields OR content inside bordered area  -->
                                <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                                <div class="d-flex border rounded">
                                    <b-row class="flex-grow-1 p-2">
                                        <!-- Single Item Form Headers -->
                                        <b-col cols="12" lg="4">
                                            <label class="d-inline d-lg-none">Article</label>
                                            <b-form-input v-model="item.article" type="text" class="mb-2" readonly />
                                        </b-col>
                                        <b-col cols="12" lg="4">
                                            <label class="d-inline d-lg-none">Quantite</label>
                                            <b-form-input v-model="item.quantite" type="number" class="mb-2" readonly />
                                        </b-col>
                                        <b-col cols="12" lg="4">
                                            <label class="d-inline d-lg-none">prix</label>
                                            <b-form-input v-model="item.prix" type="text" class="mb-2" readonly />
                                        </b-col>
                                        <!-- <b-col cols="12" lg="4">
                    <label class="d-inline d-lg-none">Status</label>
                    <v-select
                      v-model="item.status"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="statusList"
                      label="status"
                      :clearable="false"
                      class="mb-2 item-selector-title"
                    />
                  </b-col> -->
                                    </b-row>
                                </div>
                            </b-col>
                        </b-row>
                    </div>

                  
                </b-card-body>
            </b-modal>

            <!-- Tableau pour afficher les taxes -->
            <div class="tableau">
                <!-- <table class="table position-relative table-card table-bordered mt-5 pt-3">
        <b-button variant="relief-primary"  class="add-btn position-absolute " @click="redirection" >
          Ajouter
        </b-button>
        <thead>
          <tr class="text-center">
            <th scope="col-3">#</th>
             <th scope="col-3">Status</th>
             <th scope="col-3">Date</th>
            <th scope="col-3">Libelle</th>
            <th scope="col-3">Montant de la depense</th>
            <th scope="col-3">Motif</th>
            <th scope="col-3">Fournisseur</th>
            <th scope="col-3">N° Facture fournisseur</th>
            <th scope="col-3">Destinataire depense</th>
            <th scope="col-3">Action</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr class="text-center" id="table_line" v-for="(depense, index) in depenses" :key="depense.id">
            <th scope="row" class="col-1">{{ index + 1 }}</th>
              <td class="col-3">
                  <b-badge :variant="depense.created_at">
                   <p>{{ depense.status}}</p>
                </b-badge>
            </td>
             <td class="col-6">
              <p>{{ depense.date_emission }}</p>
            </td>
            <td class="col-6">
              <p>{{ depense.libelle }}</p>
            </td>
            <td class="col-2">
              <p>{{ depense.montant_depense }}</p>
            </td>
            <td class="col-6">
              <p>{{ depense.description }}</p>
            </td>
            <td class="col-6">
              <p>{{ depense.fournisseur }}</p>
            </td>
            <td class="col-6">
              <p>{{ depense.facture_fournisseur }}</p>
            </td>
            
            <td class="col-3">
              <div class="w-50 mx-auto d-flex justify-content-around">
                  <b-button variant="gradient-info" class="btn-icon mr-2" v-b-modal.modal-reglement  @click="reglement(depense.id, depense.date_emission, depense.montant_depense, index)">
                  <feather-icon icon="TrendingUpIcon" />
                </b-button>
                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(depense.id,index)">
                  <feather-icon icon="Trash2Icon" />
                </b-button>

              </div>
            </td>
          </tr>
        </tbody>
      </table> -->

                <b-card no-body class="px-2">
                    <b-row>
                        <!-- Per Page -->
                        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1">
                            <label>Entrées</label>
                            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
                            <b-button variant="gradient-primary" @click="redirection">
                                Réaliser une dépense groupée
                            </b-button>
                        </b-col>

                        <!-- Search -->
                        <b-col cols="12" md="6" class="mt-1">
                            <div class="d-flex align-items-center justify-content-end">
                                <b-form-input v-model="filtreDepense" class="d-inline-block mr-1" placeholder="Rechercher par le nom de la dépense, le montant..." />
                            </div>
                        </b-col>
                    </b-row>

                    <!-- Le tableau affichant les depenses -->
                    <b-table
                        hover
                        responsive
                        primary-key="id"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :items="depenses"
                        :fields="tableColumns"
                        :filter="filtreDepense"
                        show-empty
                        empty-text="Aucune dépense enregistrée"
                        class="bg-white mt-2 text-center"
                    >
                        <!-- Status -->
                        <template #cell(status)="data">
                            <b-badge v-if="data.item.status==='réglé'" variant="success">
                                {{ data.item.status }}
                            </b-badge>
                            <b-badge v-if="data.item.status==='partiel'" variant="warning">
                                {{ data.item.status }}
                            </b-badge>
                            <b-badge v-if="data.item.status==='à payer'" variant="danger">
                                {{ data.item.status }}
                            </b-badge>
                        </template>
                        <!-- Montant -->
                        <template #cell(montant_depense)="data">
                            <p>{{ formatMoney(data.item.montant_depense) }}</p>
                        </template>

                        <!-- <template #cell(destinataire)="data">
            <p>{{ getDestinataire(data.item.projet_id) }}</p>
          </template> -->
                        <!-- Bouton d'action -->
                        <template #cell(actions)="data">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button  variant="gradient-info" class="btn-icon mr-2" v-b-modal.modal-reglement @click="reglement(data.item.id, data.item.article, data.item.quantite, data.item.prix)">
                                    <feather-icon icon="EyeIcon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(data.item)">
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </div>
                        </template>
                    </b-table>

                    <!-- Les boutons de pagination -->
                    <div class="mx-2 mb-2 pb-1">
                        <b-row>
                            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                <span class="text-muted"></span>
                            </b-col>
                            <!-- Pagination -->
                            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                                <b-pagination v-model="currentPage" :total-rows="depenseTotal" :per-page="perPage" first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
                                    <template #prev-text>
                                        <feather-icon icon="ChevronLeftIcon" padding:10 size="18" />
                                    </template>
                                    <template #next-text>
                                        <feather-icon icon="ChevronRightIcon" size="18" />
                                    </template>
                                </b-pagination>
                            </b-col>
                        </b-row>
                    </div>
                </b-card>
            </div>
        </div>
        <invoice-sidebar-add-new-customer />
        <invoice-sidebar-add-new-customers />
    </section>
</template>

<script>
    import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg, BFormTextarea, VBToggle } from "bootstrap-vue";
    import { heightTransition } from "@core/mixins/ui/transition";
    import Ripple from "vue-ripple-directive";

    import { required, email } from "@validations";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from "@/views/pages/request";

    import axios from "axios";
    import InvoiceSidebarAddNewCustomer from "../InvoiceSidebarAddNewCustomer.vue";
    import InvoiceSidebarAddNewCustomers from "../InvoiceSidebarAddNewCustomers.vue";
    import flatPickr from "vue-flatpickr-component";

    export default {
        components: {
            flatPickr,
            vSelect,
            VBToggle,
            InvoiceSidebarAddNewCustomer,
            InvoiceSidebarAddNewCustomers,
            BRow,
            BCol,
            BFormInput,
            BButton,
            BModal,
            BFormGroup,
            VBModal,
            BForm,
            BImg,
            BLink,
            BForm,
            BFormCheckbox,
            BInputGroup,
            BFormTextarea,
            BInputGroupAppend,
            // validations
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
            "b-toggle": VBToggle,
        },
        mixins: [heightTransition],
        data() {
            return {
                // validation
                libelle: "",
                badge: "",
                valideLibelle: false,

                montant: "",
                valideMontant: false,

                taux: "",
                valideTaux: false,

                delai: "",
                valideDelai: false,

                date_emprunt: "",
                valideEmprunt: false,

                date_remboursement: "",
                valideRemboursement: "",
                selectedCompte: "",
                selectedCreancier: "",
                optionType: ["Personne physique", "Banque", "Micro finance", "Autre"],
                required,
                select: "Selectionner le compte",
                select: "Selectionner le créancier",
                status_id: "",
                option: [{ title: "Bancaire" }, { title: "Epargne" }],
                option1: [{ title: "Particulier" }, { title: "Entreprise" }],

                description: "",
                compteList: [],
                depenses: [],

                updateIndex: "",

                reglementTable: [],

                compteList: [],
                creancierList: [],
                reglements: [],
                reglementItem: {
                    date_reglement: "",
                    montant_reglement: "",
                    selectedCompte: "",
                    selectedCompteId: "",
                    note: "",
                },

                reglementItem: {
                    article: "",
                    quantite: "",
                    prix: "",
                },
                montantValidation: false,

                listDepense: "",
                newDepense: [],
                date_emis: "",
                montant_regle: "",
                montantValidation: false,
                depense_id: "",

                addItem: false,

                depense_index: "",

                depenseTotal: 0,
                filtreDepense: "",
                perPage: 3,
                currentPage: 1,
                tableColumns: [
                    { key: "status", label: "Status" },
                    { key: "libelle", sortable: true },
                    { key: "date_emission", label: "Date", sortable: true },
                    { key: "montant_depense", label: "Montant de la dépense", sortable: true },
                    { key: "actions" },
                ],
                perPageOptions: [3, 5, 10, 15],

                projetList: [],
            };
        },
        mixins: [heightTransition],
        async mounted() {
            try {

                this.initTrHeight();
                await axios
                    .get(URL.COMPTE_LIST, config)
                    .then((response) => {
                        this.compteList = response.data[0];
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                await axios
                    .post(URL.DEPENSE_LIST, config)
                    .then((response) => {
                        this.depenses = response.data.depense_groupe;
                        // this.reglements = response.data.reglements
                        this.depenseTotal = this.depenses.length;
                        this.listReglement = this.depenses[0].sous_depenses[0];
                        console.log("data relative à la dépense", response.data);
                        for (let index = 0; index < this.depenses.length; index++) {
                            if (this.depenses[index].status == "partiel") {
                                this.depenses[index].created_at = "warning";
                            }
                            if (this.depenses[index].status == "à payer") {
                                this.depenses[index].created_at = "danger";
                            }
                            if (this.depenses[index].status == "réglé") {
                                this.depenses[index].created_at = "success";
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                const config = {
                    headers: {
                        Accept: "application/json",
                    },
                };

                await axios
                    .post(URL.DEPENSE_ITEM, { item: "projet" }, config)
                    .then((response) => {
                        this.projetList = response.data.projet;
                        console.log(this.projetList);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        created() {
            window.addEventListener("resize", this.initTrHeight);
        },
        destroyed() {
            window.removeEventListener("resize", this.initTrHeight);
        },
        methods: {
            getDestinataire(destinataireId) {
                const destinataire = this.projetList.filter((item) => {
                    return item.id === destinataireId;
                });

                return destinataire[0].libelle;
            },
            // FUNCTION TO CONVERT NUMBER INTO CURRENCY
            formatMoney(num) {
                const formatter = new Intl.NumberFormat("ci-CI", {
                    style: "currency",
                    currency: "XOF",
                    minimumFractionDigits: 2,
                });
                return formatter.format(num);
            },

            calculReglement(montant_dep, list) {
                let sum = parseFloat(montant_dep);
                const montantTotal = Number(sum.toFixed(2));
                let element = 0;
                for (let i = 0; i < list.length; i++) {
                    element += Number(list[i].pivot.montant_reglement);
                }
                if (element !== montantTotal) {
                    this.addItem = true;
                    setTimeout(() => {
                        const footer = document.getElementById("modal-reglement___BV_modal_footer_");
                        console.log(footer);
                        footer.style.display = "none";
                    }, 100);
                }
            },

            topEndD() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Règlément enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            async addReglement() {
                try {
                    this.valideMontantTotal(this.montant_regle);

                    if (this.montantValidation) {
                        return;
                    } else {
                        const data = {
                            count: this.newDepense.length,
                            item: this.newDepense,
                            depense_id: this.depense_id,
                        };
                        console.log(data);

                        const config = {
                            headers: {
                                Accept: "application/json",
                            },
                        };

                        await axios.post(URL.DEPENSE_CREATE_REGLEMENT, data, config).then(async (response) => {
                            this.topEndD();
                            if (response.data) {
                                this.newDepense = [];
                                await axios
                                    .get(URL.COMPTE_LIST)
                                    .then((response) => {
                                        this.compteList = response.data[0];
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });

                                await axios
                                    .post(URL.DEPENSE_LIST)
                                    .then((response) => {
                                        this.depenses = response.data.depense_groupe;
                                        this.listReglement = this.depenses[0].sous_depenses[0];
                                        for (let index = 0; index < this.depenses.length; index++) {
                                            if (this.depenses[index].status == "partiel") {
                                                this.depenses[index].created_at = "warning";
                                            }
                                            if (this.depenses[index].status == "à payer") {
                                                this.depenses[index].created_at = "danger";
                                            }
                                            if (this.depenses[index].status == "réglé") {
                                                this.depenses[index].created_at = "success";
                                            }
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        });
                    }
                } catch (error) {
                    console.log("trycatch error", error);
                    this.error_global = true;

                    setTimeout(() => {
                        this.marche = false;
                    }, 300);
                }
            },

            updateItemForm(index, val) {
                const { id } = val;
                this.newDepense[index].selectedCompteId = id;
            },

            addNewItemInItemForm() {
                this.valideMontantTotal(this.montant_regle);

                if (this.montantValidation) {
                    return;
                } else {
                    this.$refs.form.style.overflow = "hidden";
                    this.newDepense.push(JSON.parse(JSON.stringify(this.reglementItem)));

                    console.log(this.newDepense);

                    this.$nextTick(() => {
                        this.trAddHeight(this.$refs.row[0].offsetHeight);
                        setTimeout(() => {
                            this.$refs.form.style.overflow = null;
                        }, 350);
                    });
                }
            },

            removeItem(index) {
                this.newDepense.splice(index, 1);
                this.trTrimHeight(this.$refs.row[0].offsetHeight);
            },

            initTrHeight() {
                this.trSetHeight(null);
                this.$nextTick(() => {
                    this.trSetHeight(this.$refs.form.scrollHeight);
                });
            },

            validateDate(date_regle, date_emis, index) {
                if (date_regle >= date_emis) {
                    return;
                } else {
                    this.dateAlert();
                    this.newDepense.splice(index, 1);
                    this.trTrimHeight(this.$refs.row[0].offsetHeight);
                }
            },

            // valideMontantTotal(montant_dep) {
            //     let sum = parseFloat(montant_dep);
            //     const montantTotal = sum.toFixed(2);
            //     let element = 0;
            //     for (let i = 0; i < this.newDepense.length; i++) {
            //         element += Number(this.newDepense[i].montant_reglement);
            //     }
            //     if (montantTotal < element) {
            //         this.montantValidation = true;
            //         this.$swal({
            //             icon: "error",
            //             title: "Oops...",
            //             text: "La somme des montants de remboursement est plus élévé que le montant total de l'emprunt !",
            //             customClass: {
            //                 confirmButton: "btn btn-primary",
            //             },
            //             buttonsStyling: false,
            //         }).then((result) => {
            //             if (result.value) {
            //                 this.newDepense.splice(this.newDepense.length - 1, 1);
            //                 this.trTrimHeight(this.$refs.row[0].offsetHeight);
            //             }
            //         });
            //     } else if (montantTotal === element) {
            //         this.addItem = true;
            //     } else {
            //         this.montantValidation = false;
            //     }
            // },

            // valideMontantTotal2(montant_dep) {
            //     let sum = parseFloat(montant_dep);
            //     const montantTotal = sum.toFixed(2);
            //     let element = 0;
            //     let element_2 = 0;
            //     for (let i = 0; i < this.newDepense.length; i++) {
            //         element += Number(this.newDepense[i].montant_reglement);
            //     }
            //     for (let i = 0; i < this.listDepense.length; i++) {
            //         element_2 += Number(this.listDepense[i].pivot.montant_reglement);
            //     }
            //     let total = element + element_2;
            //     console.log(total);
            //     if (total >= Number(montantTotal)) {
            //         this.addItem = true;
            //     } else {
            //         this.addItem = false;
            //     }
            // },

            validateMontant() {
                if (!this.montant) {
                    this.valideMontant = true;
                } else {
                    this.valideMontant = false;
                }

                if (this.montant && this.isFloat(this.montant) === false) {
                    if (this.isDigit(this.montant) === false) {
                        this.valeurGood = true;
                    } else {
                        this.valeurGood = false;
                    }
                } else {
                    this.valeurGood = false;
                }
            },

            // dejaPaye() {
            //     let element = 0;
            //     for (let i = 0; i < this.listDepense.length; i++) {
            //         element += Number(this.listDepense[i].sous_depenses.article);
            //     }
            //     return element;
            // },

            // restePaye() {
            //     let element = 0;
            //     for (let i = 0; i < this.listDepense.length; i++) {
            //         element += Number(this.listDepense[i].sous_depenses.article);
            //     }
            //     const reste = this.montant_regle - element;
            //     return reste;
            // },

            dateAlert() {
                this.$swal({
                    icon: "error",
                    title: "Oops...",
                    text: "La date de règlément doit etre une date qui vient après la date de la depense!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            reglement(id, art, qte, price) {
                this.addItem = false;
                this.depense_id = id;
                this.article = art;
                this.quantite = qte;
                this.prix = price;

                const index = this.depenses.findIndex((item) => item.id === id);
                this.depense_index = index;

                this.reglementTable = this.reglements.filter((item) => {
                    return item.depense_id === id;
                });

                this.listDepense = this.depenses[index].sous_depenses;
                // this.calculReglement(montant, this.listDepense)
            },

            deleteDepense(item) {
                try {
                    const id = {
                        id: item.id,
                    };
                    axios
                        .post(URL.DEPENSE_DESTROY, id)
                        .then((response) => {
                            response.data;
                            axios
                                .post(URL.DEPENSE_LIST)
                                .then((response) => {
                                    this.depenses = response.data.depense_groupe;
                                    this.depenseTotal = this.depenses.length;
                                    this.listReglement = this.depenses[0].sous_depenses[0];
                                    for (let index = 0; index < this.depenses.length; index++) {
                                        if (this.depenses[index].status == "partiel") {
                                            this.depenses[index].created_at = "warning";
                                        }
                                        if (this.depenses[index].status == "à payer") {
                                            this.depenses[index].created_at = "danger";
                                        }
                                        if (this.depenses[index].status == "réglé") {
                                            this.depenses[index].created_at = "success";
                                        }
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.depenses.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },

            confirmText(item) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Cette depense sera supprimé définitivement !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Oui",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-outline-danger ml-1",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.value) {
                        this.deleteDepense(item);
                    }
                });
            },

            redirection() {
                this.$router.push("/depense-groupe");
            },

            update() {
                this.$router.push("/depense_update");
            },

            obligatoryCreancier() {
                if (this.selectedCreancier == "Le créancier concerné svp") {
                    this.valideCreancier = true;
                    this.erreur = true;
                } else {
                    this.valideCreancier = false;
                    this.erreur = false;
                }
            },

            deleteClient(indice) {
                const taxeIndex = this.fakeData.findIndex((taxe) => taxe.taxeName === indice);
                this.fakeData.splice(taxeIndex, 1);
                console.log(taxeIndex);
            },
        },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";
    .add-new-client-header {
        padding: $options-padding-y $options-padding-x;
        color: $success;
        &:hover {
            background-color: rgba($success, 0.12);
        }
    }

    .tableau {
        box-shadow: 0px 6px 46px -21px rgba(0, 0, 0, 0.75);
    }

    .table-card {
        width: 100%;
        margin: auto;
        border-radius: 13px;
    }

    .table-card thead tr {
        border-radius: 13px;
        background-color: rgb(68, 68, 68) !important;
    }

    .table-card thead tr th {
        background-color: rgb(68, 68, 68) !important;
        color: white;
    }

    .add-btn {
        position: absolute;
        right: 0;
        top: -50px;
        background-color: #450077;
    }

    .none {
        display: none;
    }
    .block {
        display: inline-block;
    }
</style>
