<template>
    <div v-if="access">
        <b-row>
            <b-col lg="4">
                <b-card class="earnings-card bg-indigo text-white" style="height: 88%">
                    <b-card-title class="mb-1 text-white">
                        Chiffre d'affaire annuel 💰
                    </b-card-title>
                    <div class="m-auto">
                        <span class="text-success h3" >
                            {{formatMoney(chiffre_daffaire_annuel)}} {{devise}}
                        </span>
                        </div>
                    <b-card-text class="text-muted font-small-1 mt-0 pt-0">
                        <div class="mb-3 home">
                            <b-tabs align="center">

                                <b-tab title="Mois en cours">
                                    <b-card-text>
                                        <div class="row pt-2">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Chiffre d'affaire</div>
                                            <div class="col text-white text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(chiffre_daffaire_mois_actuel)}} {{devise}}</div>
                                        </div>
                                        <div class="row pt-2">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Dépenses</div>
                                            <div class="col text-danger text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(depense_mois_actuel)}} {{devise}}</div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Résultat</div>
                                            <div class="col text-warning text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(resultat_chiffre_daffaire_mois_actuel)}} {{devise}}</div>
                                        </div>
                                    </b-card-text>
                                </b-tab>
                                <b-tab class="" title="Mois Passé" active>
                                    <b-card-text>
                                        <div class="row pt-2">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Chiffre d'affaire</div>
                                            <div class="col text-white text-right" style="font-weight: bold; font-size: 12px;">{{chiffre_daffaire_mois_passe}} {{devise}}</div>
                                        </div>
                                        <div class="row pt-2">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Dépenses</div>
                                            <div class="col text-danger text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(depense_mois_passe)}} {{devise}}</div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Résultat</div>
                                            <div class="col text-warning text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(resultat_chiffre_daffaire_mois_passe)}} {{devise}}</div>
                                        </div>
                                    </b-card-text>
                                </b-tab>
                                <b-tab :title="String(ancours)">
                                    <b-card-text>
                                        <div class="row pt-2">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Chiffre d'affaire</div>
                                            <div class="col text-white text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(chiffre_daffaire_annuel)}} {{devise}}</div>
                                        </div>
                                        <div class="row pt-2">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Dépenses</div>
                                            <div class="col text-danger text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(depense_annuel)}} {{devise}}</div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col" style="font-weight: bold; font-size: 12px;">Résultat</div>
                                            <div class="col text-warning text-right" style="font-weight: bold; font-size: 12px;">{{formatMoney(resultat_chiffre_daffaire_annuel)}} {{devise}}</div>
                                        </div>
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </div>
                    </b-card-text>
                </b-card>
            </b-col>

            <b-col lg="3">
                <b-card class="earnings-card " style="height: 88%">
                    <b-card-title class="mb-1">
                        Devis à relancer
                    </b-card-title>

                    <b-row class="text-center">
                        <b-col cols="6" class="">
                            <span>Montant TTC</span>
                        </b-col>
                        <b-col cols="6" class="align-right">
                            <span>Nombre</span>
                        </b-col>
                    </b-row>

                    <b-row class="text-center mt-1">
                        <b-col cols="6" class="">
                            <span class="text-warning" style="font-weight: bold; font-size: 12px;">{{formatMoney(sumTotal_devis_a_relancer)}} {{devise}}</span>
                        </b-col>
                        <b-col cols="6" class="align-right">
                            <span class="text-primary" style="font-weight: bold; font-size: 12px;">{{formatMoney(nbr_de_devis_a_relancer)}}</span>
                        </b-col>
                    </b-row>

                    <hr />

                    <h4>Les échéances</h4>

                    <b-row class="text-center">
                        <b-col cols="6" class="">
                            <span>Montant TTC</span>
                        </b-col>
                        <b-col cols="6" class="align-right">
                            <span>Nombre</span>
                        </b-col>
                    </b-row>

                    <b-row class="text-center mt-1">
                        <b-col cols="6" class="">
                            <span class="text-warning" style="font-weight: bold; font-size: 12px;">{{formatMoney(echeanciers_global)}} {{devise}}</span>
                        </b-col>
                        <b-col cols="6" class="align-right">
                            <span class="text-primary" style="font-weight: bold; font-size: 12px;">{{echeanciers_global_no}}</span>
                        </b-col>
                    </b-row>

                    <hr />

                    <!-- <h4 class="text-center">Budget</h4> -->

                    <!-- <b-row class="text-center">
                        <b-col cols="" class="align-right">
                            <span class="text-success" style="font-weight: bold; font-size: 18px;">120.000 {{devise}}</span>
                        </b-col>
                    </b-row> -->
                </b-card>
            </b-col>

            <b-col lg="5">
                <b-card class="earnings-card" style="height: 88%">
                    <b-card-title class="mb-1">
                        <div class="row">
                            <div class="col-lg-8 m-auto">
                                Vos dernières factures
                            </div>
                            <div class="col-lg-4 m-auto text-right">
                                <b-button v-ripple.400="'rgba(40, 199, 111, 0.15)'" @click="$router.push({name:'FactureList'})" variant="flat-success" class="p-1 btn-icon rounded-circle"
                                            >
                                    <feather-icon icon="PlusSquareIcon" />
                                </b-button>
                            </div>
                        </div>
                    </b-card-title>
                    <div v-if="yafacture">
                        <b-card-text>
                            <div class="row">
                                <div class="col text-center">
                                    <span class="text-center text-primary">Vous n'avez aucune facture</span>
                                </div>
                            </div>
                        </b-card-text>
                    </div>
                    <div v-else>
                        <div class="row font-small-2 text-primary d-flex text-center">
                            <div class=" col-2 p-0">Numéro</div>
                            <div class=" col-2 p-0">Client</div>
                            <div class=" col-5 p-0 text-center">Montant TTC</div>
                            <div class=" col-2 p-0 text-left">État</div>
                            <div class=" col-1 p-0 text-left">Voir</div>
                        </div>
                        <hr class="mb-0" />
                        <div class="row font-small-2 pl-0 pt-1 pb-1 d-flex text-center m-auto border-bottom" v-for="facture in factures" :key="facture.code">
                            <div class=" font-small-1 col-2 p-0 m-auto">{{facture.code}}</div>
                            <div class=" col-2 p-0 m-auto">{{facture.prenoms}}</div>
                            <div class=" col-5 p-0 text-left">
                                <div class="row">
                                    <div class="col-lg-12 m-auto">
                                        <span class="text-indigo font-weight-bold">TTC:</span>
                                        <span class="pl-1 text-indigo">{{formatMoney(facture.total_ttc)}} {{devise}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 m-auto">
                                        <span class="text-success font-weight-bold">Payé:</span> 
                                        <span class="pl-1 text-success">{{formatMoney(parseInt(facture.total_versement))}} {{devise}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 m-auto">
                                        <span class="text-danger font-weight-bold">Impayé:</span> 
                                        <span class="pl-1 text-danger">{{formatMoney(facture.total_ttc - facture.total_versement)}} {{devise}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-2 text-left pl-0 m-auto">
                                <b-badge v-if="facture.state == 'apayer'"  variant="success">
                                    Payé
                                </b-badge>
                                <b-badge v-if="facture.state == 'aregler'" variant="danger">
                                    À Payer
                                </b-badge>
                                <b-badge v-if="facture.state == 'partiel'" variant="warning">
                                    Partiel
                                </b-badge>
                            </div>
                            <div class=" col-1 text-center m-auto voir" >
                                <feather-icon @click="previewInvoice(facture.facture_id)" icon="EyeIcon" />
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <hr />
        <div class="row mb-1">
            <div class="col-12 m-auto">
                <h2 class="text-center p-0 text-indigo">Mes comptes</h2>
            </div>
        </div>
        <div class="row mb-1">
            <div class="col-lg-4 text-center">
                <b-badge variant="light-success p-1">
                    <span class="h2 rounded text-success font-weight-bold">Solde: {{formatMoney(soldeTotal)}} {{devise}}</span>
                </b-badge>
            </div>
            <div class="col-lg-8 text-right m-auto">
                <button class="btn btn-primary p-1" @click="$router.push({name:'comptes'})">
                    <span class="text-white">Tous les comptes</span>
                </button>
            </div>
        </div>
        <div class="row text-center">
            <div class="col-lg-4 col-sm-6 col-md-6 m-auto" v-for="compte in comptes" :key="compte.id">
                <b-card>
                    <div class="row">
                        <div class="col-lg-7 m-auto">
                            <div class="row text-center">
                                <div class="col-lg-12 p-0" style="font-weight: bold;">
                                    {{compte.libelle}}
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-lg-12 p-0 pt-1 font-small-1 text-left ml-1" style="font-weight: bold;">
                                    <span class="font-weight-bold">Solde:</span> <span class="text-primary font-small-2">{{formatMoney(compte.solde)}} </span>{{devise}}
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-lg-12 p-0 font-small-1 text-left ml-1" style="font-weight: bold;">
                                    Numéro: {{compte.numero_compte}}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5 m-auto">
                            <img v-if="compte.status == 'orange'" class="img-circle" src="../../../assets/images/compte/orangemoney.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'wave'" class="img-circle" src="../../../assets/images/compte/wave.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'nsia'" class="img-circle" src="../../../assets/images/compte/nsia.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'ecobank'" class="img-circle" src="../../../assets/images/compte/ecobank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'moovmoney'" class="img-circle" src="../../../assets/images/compte/moovmoney.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bgfi'" class="img-circle" src="../../../assets/images/compte/bgfi.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'sib'" class="img-circle" src="../../../assets/images/compte/sib.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'afriland'" class="img-circle" src="../../../assets/images/compte/afriland.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'mtnmoney'" class="img-circle" src="../../../assets/images/compte/mtnmoney.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bankofafrica'" class="img-circle" src="../../../assets/images/compte/bankofafrica.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'banqueatlantique'" class="img-circle" src="../../../assets/images/compte/banqueatlantique.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bda'" class="img-circle" src="../../../assets/images/compte/bda.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'banquepopulaire'" class="img-circle" src="../../../assets/images/compte/banquepopulaire.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'banquesahelosaharienne'" class="img-circle" src="../../../assets/images/compte/banquesahelosaharienne.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bdu'" class="img-circle" src="../../../assets/images/compte/bdu.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bhci'" class="img-circle" src="../../../assets/images/compte/bhci.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bicici'" class="img-circle" src="../../../assets/images/compte/bicici.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bms'" class="img-circle" src="../../../assets/images/compte/bms.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bni'" class="img-circle" src="../../../assets/images/compte/bni.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'bridgebank'" class="img-circle" src="../../../assets/images/compte/bridgebank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'citi'" class="img-circle" src="../../../assets/images/compte/citi.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'corisbank'" class="img-circle" src="../../../assets/images/compte/corisbank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'diamond'" class="img-circle" src="../../../assets/images/compte/diamond.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'gtbank'" class="img-circle" src="../../../assets/images/compte/gtbank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'orabank'" class="img-circle" src="../../../assets/images/compte/orabank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'sgci'" class="img-circle" src="../../../assets/images/compte/sgci.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'stanbicbank'" class="img-circle" src="../../../assets/images/compte/stanbicbank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'scbank'" class="img-circle" src="../../../assets/images/compte/scbank.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'uba'" class="img-circle" src="../../../assets/images/compte/uba.jpg" height="70px" alt="" />
                            <img v-if="compte.status == 'versusbank'" class="img-circle" src="../../../assets/images/compte/versusbank.jpg" height="70px" alt="" />
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
        <hr />

        <!-- <b-row class="mt-2 mb-2">
            <div class="col-12">
                <h2 class="pr-1 mb-0 text-center">Les entrées</h2>
            </div>
            <div class="col-6">
                <h2 class="pr-1 mb-0 text-center">Les sorties</h2>
            </div>
        </b-row> -->

        <!-- <b-row class="mb-2">
            <div class="col-12">
                <table class="table table-bordered table-responsive" style="border-radius:12px;">
                    <thead class="text-white">
                        <tr>
                            <th class=" align-middle" scope="col">#</th>
                            <th class=" align-middle" scope="col">Référence facture</th>
                            <th class=" align-middle" scope="col">Montant</th>
                            <th class=" align-middle" scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody style="background-color: white;">
                        <tr class="" v-for="(entree, index) in versements" :key="entree.id">
                            <th scope="row">{{index+1}}</th>
                            <td>{{entree.code}}</td>
                            <td>{{entree.montant}}</td>
                            <td>{{entree.created_at}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-6">
                <table class="table table-bordered table-responsive" style="border-radius:12px;">
                    <thead class="text-white">
                        <tr>
                            <th class="align-middle" scope="col">#</th>
                            <th class="align-middle" scope="col">Référence facture</th>
                            <th class="align-middle" scope="col">Montant</th>
                            <th class="align-middle" scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody style="background-color: white;">
                        <tr class="">
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-row>
        <hr /> -->
        <br />
        <div class="row">
            <div class="col-12 text-center mb-2">
                <b-form-group class="overflow-auto">
                    <b-form-radio-group id="btn-radios-1" style="background-color: white;" v-model="selectedRadio" button-variant="outline-primary" :options="optionsRadio" buttons name="radios-btn-default" @change="trieur" />
                </b-form-group>
            </div>
        </div>

        <b-row>
            <div class="col-12">
                <h2 class="pr-1 mb-0 text-center text-indigo mb-2">Vos meilleures clients</h2>
            </div>
        </b-row>


        <b-row class="">
            <div class="col-12">
                <b-table :items="items" :fields="fields" striped responsive>
                    <template #cell(information)="row">
                        <b-form-checkbox v-model="row.detailsShowing" plain class="vs-checkbox-con" @change="row.toggleDetails">
                            <span class="vs-checkbox">
                                <span class="vs-checkbox--check">
                                    <i class="vs-icon feather icon-check" />
                                </span>
                            </span>
                            <span class="vs-label">{{ row.detailsShowing ? 'Cacher' : 'Voir' }}</span>
                        </b-form-checkbox>
                    </template>

                    <template #row-details="row">
                        <b-card>
                            <b-row class="mb-2">
                                <b-col md="4" class="mb-1"> <strong>Nom : </strong>{{ row.item.nom }} </b-col>
                                <b-col md="4" class="mb-1"> <strong>Prénom : </strong>{{ row.item.prenom }} </b-col>
                                <b-col md="4" class="mb-1"> <strong>Email : </strong>{{ row.item.email }} </b-col>
                                <b-col md="4" class="mb-1"> <strong>contact : </strong>{{ row.item.contact }} </b-col>
                                <b-col md="4" class="mb-1"> <strong>Créé le : </strong>{{ row.item.created_at | dateParse('YYYY-MM-DD') }} </b-col>
                            </b-row>

                            <b-button size="sm" variant="outline-secondary" @click="row.toggleDetails">
                                Cacher les détails
                            </b-button>
                        </b-card>
                    </template>

                    <template #cell(avatar)="data">
                        <b-avatar :src="data.value" />
                    </template>
                </b-table>
            </div>
        </b-row>
        <hr class="mb-5 mt-0 pt-0">

        <b-row>
            <div class="col-12">
                <b-card title="Les meilleures ventes">
                    <app-echart-bar class="w-100" :option-data="option" />
                </b-card>
            </div>
        </b-row>
    </div>
</template>
<?php
    $tok = $_GET['token'];
?>
<script>
    import { BTabs, BTable, BTab, BAvatar, BCard, BBadge, BCardHeader, BFormCheckboxGroup, BButtonGroup, BFormRadioGroup, BCardTitle, BDropdown, BDropdownItem, BCardBody, BRow, BProgress, BCol, BCardText } from "bootstrap-vue";
    import VueApexCharts from "vue-apexcharts";
    import { $themeColors } from "@themeConfig";
    import Ripple from "vue-ripple-directive";
    import { kFormatter } from "@core/utils/filter";
    import StatisticCardHorizontal from "@core/components/statistics-cards/StatisticCardHorizontal.vue";
    import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
    import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
    import AppEchartBar from "@core/components/charts/echart/AppEchartBar.vue";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import moment from "moment";
    import CryptoJS from 'crypto-js'


    export default {
        components: {
            CryptoJS,
            AppEchartBar,
            moment,
            BAvatar,
            BTable,
            BBadge,
            BFormRadioGroup,
            BFormCheckboxGroup,
            axios,
            AppCollapseItem,
            BTabs,
            BTab,
            AppCollapse,
            VueApexCharts,
            BCard,
            BCardHeader,
            BCardTitle,
            BDropdown,
            BDropdownItem,
            BCardText,
            BCardBody,
            BButtonGroup,
            BRow,
            BProgress,
            BCol,
            StatisticCardHorizontal,
        },
        directives: {
            Ripple,
        },
        name:'home',
        data() {
            return {
                preview:'',
                ancours:'',
                access:false,
                soldeTotal:0,
                abonnementSuccess:'',
                top_10_articles_year:'',
                top_10_articles_mois:'',
                top_10_articles_mois_passe:'',
                top_10_articles_depuid_deb:'',
                top_10_clients_depuis_deb: "",
                top_10_clients_year: "",
                top_10_clients_mois: "",
                top_10_clients_mois_passe: "",
                versements: "",
                top_10_clients: "",
                comptes: "",
                selectedRadio: "Mois en cours",
                optionsRadio: ["Mois en cours", "Mois passé", "Année en cours", "Depuis le début"],
                yafacture: false,
                factures: "",
                devise: "",
                echeanciers_global_no: "",
                echeanciers_global: "",
                nbr_de_devis_a_relancer: "",
                sumTotal_devis_a_relancer: "",
                chiffre_daffaire_annuel: "",
                depense_annuel: "",
                chiffre_daffaire_mois_actuel: "",
                depense_mois_actuel: "",
                chiffre_daffaire_mois_passe: "",
                depense_mois_passe: "",
                resultat_chiffre_daffaire_annuel: "",
                resultat_chiffre_daffaire_mois_actuel: "",
                resultat_chiffre_daffaire_mois_passe: "",
                perms:'',

                fields: ["information", "id", { key: "avatar", label: "Avatar" }, "nom", "prenom", "montant"],
                items:[],

                // option: {
                //     xAxis: [
                //         {
                //             type: "category",
                //             data: [],
                //         },
                //     ],
                //     yAxis: [
                //         {
                //             type: "value",
                //             splitLine: { show: false },
                //         },
                //     ],
                //     grid: {
                //         left: "40px",
                //         right: "30px",
                //         bottom: "30px",
                //     },
                //     series: [
                //         {
                //             name: "Quantité",
                //             type: "bar",
                //             stack: "advertising",
                //             data: [],
                //             barMaxWidth: "20%",
                //             barMinWidth: "10px",
                //             itemStyle: {
                //                 barBorderRadius: [10, 10, 0, 0],
                //             },
                //         },
                //     ],
                // },
                option: {
                    xAxis: [
                    {
                        type: 'category',
                        data: [],
                    },
                    ],
                    yAxis: [
                    {
                        type: 'value',
                        splitLine: { show: false },
                    },
                    ],
                    grid: {
                    left: '40px',
                    right: '30px',
                    bottom: '30px',
                    },
                    series: [
                    {
                        name: 'Quantité',
                        type: 'bar',
                        stack: 'advertising',
                        data: [],
                        barMaxWidth: '20%',
                        barMinWidth: '10px',
                    },
                    {
                        name: 'Montant vendu',
                        type: 'bar',
                        stack: 'advertising',
                        data: [],
                        barMaxWidth: '20%',
                        barMinWidth: '10px',
                        itemStyle: {
                        barBorderRadius: [10, 10, 0, 0],
                        },
                    },
                    ],
                },
            };
        },
        async beforeMount(){
            await axios.get(URL.VERIFICATION).then((response)=>{
                this.returnData = response.data;
                if(!this.returnData.abonnement_exist){
                    this.$router.push({name: 'pack'})
                }else{
                    this.access = true
                }
            })
        },
        // async beforeMount(){
        //     var ciphertext = localStorage.getItem('ae')
        //     var bytes  = CryptoJS.AES.decrypt(ciphertext, 'qenium 123')
        //     const abonnement_exist = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        //     if(!abonnement_exist){
        //         this.$router.push({name: 'pack'})
        //     }else{
        //         this.access = true
        //     }
        // },
        async mounted() {
            document.title='Tableau de bord';
            this.ancours = new Date().getFullYear()
            try {   
                var ciphertext = localStorage.getItem('permission')
                var bytes  = CryptoJS.AES.decrypt(ciphertext, 'qenium 123')
                this.perms  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

                await axios
                    .get(URL.ENTREPRISE_ANALYSIS)
                    .then((response) => {
                        this.userData = response;
                        //devise
                        this.devise = this.userData.data[0].devise;
                        localStorage.setItem('devise',this.devise)
                        //Les 10 articles plus performants
                        this.top_10_articles_year = this.userData.data[0].top_10_articles_year
                        this.top_10_articles_mois = this.userData.data[0].top_10_articles_mois
                        this.top_10_articles_mois_passe = this.userData.data[0].top_10_articles_mois_passe
                        this.top_10_articles_depuid_deb = this.userData.data[0].top_10_articles_depuid_deb

                        //les 10 clients les plus performants
                        this.top_10_clients_year = this.userData.data[0].top_10_clients_year;
                        this.top_10_clients_mois = this.userData.data[0].top_10_clients_mois;
                        this.top_10_clients_mois_passe = this.userData.data[0].top_10_clients_mois_passe;
                        this.top_10_clients_depuis_deb = this.userData.data[0].top_10_clients_depuis_deb;

                        this.preview = this.userData.data[0].preview

                        this.trieur();

                        //les comptes
                        this.comptes = this.userData.data[0].compte_du_jour;
                        this.versements = this.userData.data[0].vers;

                        let orange = "orange";
                        let money = "money";
                        let wave = "wave";
                        let nsia = "nsia";
                        let ecobank = "ecobank";
                        let moovmoney = "moov";
                        let bgfi = "bgfi";
                        let sib = "sib";
                        let afri = "afriland";
                        let mtn = "mtn";
                        let bank = "bank";
                        let africa = "africa";

                        for (let index = 0; index < this.comptes.length; index++) {
                            const str = this.comptes[index].libelle.toLowerCase();
                            this.soldeTotal = this.soldeTotal+this.comptes[index].solde
                            this.comptes[index].libelle = this.comptes[index].libelle.toUpperCase();
                            if (str.lastIndexOf(orange) >= 0 && str.lastIndexOf(money) >= 0) {
                                this.comptes[index].status = "orange";
                            }
                            if (str.lastIndexOf(moovmoney) >= 0 && str.lastIndexOf(money) >= 0) {
                                this.comptes[index].status = "moovmoney";
                            }
                            if (str.lastIndexOf(mtn) >= 0 || (str.lastIndexOf(mtn) >= 0 && str.lastIndexOf(money) >= 0)) {
                                this.comptes[index].status = "mtnmoney";
                            }
                            if (str.lastIndexOf(wave) >= 0) {
                                this.comptes[index].status = "wave";
                            }
                            if (str.lastIndexOf(nsia) >= 0) {
                                this.comptes[index].status = "nsia";
                            }
                            if (str.lastIndexOf(ecobank) >= 0) {
                                this.comptes[index].status = "ecobank";
                            }
                            if (str.lastIndexOf(bgfi) >= 0) {
                                this.comptes[index].status = "bgfi";
                            }
                            if (str.lastIndexOf(sib) >= 0 || ((str.lastIndexOf("société") >= 0 || str.lastIndexOf("societe") >= 0) && str.lastIndexOf("ivoirienne") >= 0 && str.lastIndexOf("banque") >= 0)) {
                                this.comptes[index].status = "sib";
                            }
                            if (str.lastIndexOf(afri) >= 0) {
                                this.comptes[index].status = "afriland";
                            }
                            if (str.lastIndexOf(bank) >= 0 && str.lastIndexOf(africa) >= 0 && str.lastIndexOf("of") >= 0) {
                                this.comptes[index].status = "bankofafrica";
                            }
                            if (str.lastIndexOf("banque") >= 0 && str.lastIndexOf("atlantique") >= 0) {
                                this.comptes[index].status = "banqueatlantique";
                            }
                            if (str.lastIndexOf("bda") >= 0) {
                                this.comptes[index].status = "bda";
                            }
                            if ((str.lastIndexOf("banque") >= 0 && str.lastIndexOf("populaire") >= 0) || str.lastIndexOf("bp") >= 0) {
                                this.comptes[index].status = "banquepopulaire";
                            }
                            if ((str.lastIndexOf("banque") >= 0 && str.lastIndexOf("sahelo") >= 0 && str.lastIndexOf("saharienne") >= 0) || str.lastIndexOf("bsic") >= 0) {
                                this.comptes[index].status = "banquesahelosaharienne";
                            }
                            if ((str.lastIndexOf("banque") >= 0 && str.lastIndexOf("union") >= 0 && str.lastIndexOf("de") >= 0) || str.lastIndexOf("bdu") >= 0) {
                                this.comptes[index].status = "bdu";
                            }
                            if ((str.lastIndexOf("banque") >= 0 && str.lastIndexOf("habitat") >= 0 && str.lastIndexOf("afrique") >= 0) || str.lastIndexOf("bhci") >= 0) {
                                this.comptes[index].status = "bhci";
                            }
                            if (str.lastIndexOf("bicici") >= 0) {
                                this.comptes[index].status = "bicici";
                            }
                            if (
                                (str.lastIndexOf("banque") >= 0 && str.lastIndexOf("malienne") >= 0 && (str.lastIndexOf("solidarité") >= 0 || str.lastIndexOf("solidarite") >= 0)) ||
                                str.lastIndexOf("bms") >= 0 ||
                                str.lastIndexOf("bms-ci") >= 0
                            ) {
                                this.comptes[index].status = "bms";
                            }
                            if ((str.lastIndexOf("banque") >= 0 && str.lastIndexOf("nationale") >= 0 && str.lastIndexOf("investisment") >= 0) || str.lastIndexOf("bni") >= 0) {
                                this.comptes[index].status = "bni";
                            }
                            if (str.lastIndexOf("bank") >= 0 && str.lastIndexOf("bridge") >= 0) {
                                this.comptes[index].status = "bridgebank";
                            }
                            if (str.lastIndexOf("citi") >= 0) {
                                this.comptes[index].status = "citi";
                            }
                            if (str.lastIndexOf("bank") >= 0 && str.lastIndexOf("coris") >= 0) {
                                this.comptes[index].status = "corisbank";
                            }
                            if (str.lastIndexOf("diamond") >= 0) {
                                this.comptes[index].status = "diamond";
                            }
                            if (str.lastIndexOf("bank") >= 0 && str.lastIndexOf("gt") >= 0) {
                                this.comptes[index].status = "gtbank";
                            }
                            if (str.lastIndexOf("orabank") >= 0) {
                                this.comptes[index].status = "orabank";
                            }
                            if (
                                str.lastIndexOf("sgci") >= 0 ||
                                str.lastIndexOf("societe") >= 0 ||
                                (str.lastIndexOf("société") >= 0 && str.lastIndexOf("generale") >= 0) ||
                                (str.lastIndexOf("générale") >= 0 && str.lastIndexOf("côte") >= 0) ||
                                (str.lastIndexOf("cote") >= 0 && str.lastIndexOf("ivoire") >= 0)
                            ) {
                                this.comptes[index].status = "sgci";
                            }
                            if (str.lastIndexOf("stanbic") >= 0 && str.lastIndexOf("bank")) {
                                this.comptes[index].status = "stanbicbank";
                            }
                            if ((str.lastIndexOf("sc") >= 0 && str.lastIndexOf("bank")) || (str.lastIndexOf("standard") >= 0 && str.lastIndexOf("chartered"))) {
                                this.comptes[index].status = "scbank";
                            }
                            if (str.lastIndexOf("uba") >= 0) {
                                this.comptes[index].status = "uba";
                            }
                            if ((str.lastIndexOf("versus") >= 0 && str.lastIndexOf("bank")) || str.lastIndexOf("versus") >= 0) {
                                this.comptes[index].status = "versusbank";
                            }
                        }

                        //derniere factures
                        this.factures = this.userData.data[0].detail_derniere_facture;

                        if (!this.factures) {
                            this.yafacture = true;
                        }

                        //Nombre total des échéances
                        this.echeanciers_global_no = this.userData.data[0].echeanciers_global_no;

                        //Montant total des échéanciers
                        this.echeanciers_global = this.userData.data[0].echeanciers_global.total_solde;
                        if (!this.echeanciers_global) {
                            this.echeanciers_global = 0;
                        }

                        //somme totale devis à relancer
                        this.sumTotal_devis_a_relancer = this.userData.data[0].sumTotal_devis_a_relancer.total_solde;
                        if (!this.sumTotal_devis_a_relancer) {
                            this.sumTotal_devis_a_relancer = 0;
                        }

                        //Nombre total devis à relancer
                        this.nbr_de_devis_a_relancer = this.userData.data[0].nbr_de_devis_a_relancer;

                        // Année
                        this.chiffre_daffaire_annuel = this.userData.data[0].chiffre_aff_year;
                        this.depense_annuel = this.userData.data[0].depenses_year;
                        this.resultat_chiffre_daffaire_annuel = this.chiffre_daffaire_annuel - this.depense_annuel;

                        //Mois en cours
                        this.chiffre_daffaire_mois_actuel = this.userData.data[0].chiffre_aff_du_mois;
                        this.depense_mois_actuel = this.userData.data[0].depenses_du_mois_current;
                        this.resultat_chiffre_daffaire_mois_actuel = this.chiffre_daffaire_mois_actuel - this.depense_mois_actuel;

                        //Mois passé
                        this.chiffre_daffaire_mois_passe = this.userData.data[0].chiffre_aff_mois_passe;
                        this.depense_mois_passe = this.userData.data[0].depenses_du_mois_passe;
                        this.resultat_chiffre_daffaire_mois_passe = this.chiffre_daffaire_mois_passe - this.depense_mois_passe;

                        const lien = window.location.href
                        if (lien.lastIndexOf("token") >= 0) {
                            let token = lien
                            token = token.split('?')
                            token = token[1].split('=')
                            token = token[1]
                            token = token.split('/')
                            token = token[0]
                            let log =''
                            for (let index = 0; index < token.length-1; index++) {
                                log+=token[index]
                            }
                            token = log
                            const data = {
                                token : token,
                            }
                            this.hyperEnvoi(data)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            previewInvoice(id) {
                let currectFacture = this.preview.filter(
                    (item) => item.id === id
                );
                let facture = this.factures.filter(
                    (item) => item.facture_id === id
                )
                // console.log(facture[0].total_versement)
                // for (let i in this.preview){
                //     if(this.preview[i].id === id){
                //         console.log(this.preview[i])
                //     }
                // }
                currectFacture = currectFacture[0]
                currectFacture.amountPaid = facture[0].total_versement
                currectFacture.amountToPaid = parseInt(facture[0].total_ttc - facture[0].total_versement)
                // console.log( currectFacture.amountPaid, currectFacture.amountToPaid)
                localStorage.setItem('facture', JSON.stringify(currectFacture));
                this.$router.push('/lists/f/facture/');
            },
            formatMoney(num) {
                const number = String(num);
                let inter='', cpt = 0;
                for (let index = number.length-1; index >=0 ; index--) {
                    if (cpt==3){
                        inter = ' '+inter
                        cpt = 0
                    }
                    inter = number[index]+inter
                    cpt++
                }
                return inter;
            },
            verifyPerm(permission){
                return this.perms.indexOf(permission) > -1;
            },
            async hyperEnvoi(data){
                
                const config = {
                    headers: {
                        Accept: "application/json",
                    },
                };
                await axios.post(URL.ENVOI_TOKEN, data, config).then((response) => {
                    this.userData = response.data;
                    if(this.userData.message){
                        this.$swal({
                            title: this.userData.message,
                            icon: "success",
                            text: 'Bienvenu sur Ediqia Premium',
                            allowOutsideClick: true,
                            customClass: {
                            confirmButton: 'btn btn-primary',
                            },
                            buttonsStyling: false,
                        });
                        window.location.href='https://ediqia.com'
                        // history.pushState({}, null, ' ');
                        // let stateObj = { id: "100" };
                        // window.history.replaceState(stateObj, "Page 3", "#/");
                    }
                });
            },
            kFormatter,
            format_date(value) {
                if (value) {
                    return moment(String(value)).format("DD / MM / YYYY");
                }
            },
            trieur() {
                if (this.selectedRadio === "Mois en cours") {
                    //Les clients les plus performants
                    this.items = [];
                    for (let index = 0; index < this.top_10_clients_mois.length; index++) {
                        this.items.push({
                            id: index + 1,
                            avatar: require("@/assets/images/avatars/customers.png"),
                            nom: this.top_10_clients_mois[index].client.nom,
                            prenom: this.top_10_clients_mois[index].client.prenoms,
                            montant: this.formatMoney(this.top_10_clients_mois[index].somme)+' '+this.devise,
                            created_at: this.format_date(this.top_10_clients_mois[index].client.created_at),
                            email: this.top_10_clients_mois[index].client.email,
                            contact: this.top_10_clients_mois[index].client.indicateur + " " + this.top_10_clients_mois[index].client.contact,
                        });
                    }

                    // les produits le plus vendu
                    const data = []
                    const dataSerie = []
                    const dataSerie2 = []
                    for (let index = 0; index < this.top_10_articles_mois.length; index++) {
                        data.push(this.top_10_articles_mois[index].libelle)
                        dataSerie.push(this.top_10_articles_mois[index].nombre)
                        dataSerie2.push(this.top_10_articles_mois[index].montant)
                    }
                    this.option.xAxis[0].data = data
                    this.option.series[0].data = dataSerie
                    this.option.series[1].data = dataSerie2


                } else if (this.selectedRadio === "Mois passé") {
                    // les produits le plus vendu
                    const data = []
                    const dataSerie = []
                    const dataSerie2 = []
                    for (let index = 0; index < this.top_10_articles_mois_passe.length; index++) {
                        data.push(this.top_10_articles_mois_passe[index].libelle)
                        dataSerie.push(this.top_10_articles_mois_passe[index].nombre)
                        dataSerie2.push(this.top_10_articles_mois_passe[index].montant)
                    }
                    this.option.xAxis[0].data = data
                    this.option.series[0].data = dataSerie
                    this.option.series[1].data = dataSerie2
                    
                    this.items = [];
                    for (let index = 0; index < this.top_10_clients_mois_passe.length; index++) {
                        this.items.push({
                            id: index + 1,
                            avatar: require("@/assets/images/avatars/customers.png"),
                            nom: this.top_10_clients_mois_passe[index].client.nom,
                            prenom: this.top_10_clients_mois_passe[index].client.prenoms,
                            montant: this.formatMoney(this.top_10_clients_mois_passe[index].somme)+' '+this.devise ,
                            created_at: this.format_date(this.top_10_clients_mois_passe[index].client.created_at),
                            email: this.top_10_clients_mois_passe[index].client.email,
                            contact: this.top_10_clients_mois_passe[index].client.indicateur + " " + this.top_10_clients_mois_passe[index].client.contact,
                        });
                    }
                } else if (this.selectedRadio === "Année en cours") {
                    // les produits le plus vendu
                    const data = []
                    const dataSerie = []
                    const dataSerie2 = []
                    for (let index = 0; index < this.top_10_articles_year.length; index++) {
                        data.push(this.top_10_articles_year[index].libelle)
                        dataSerie.push(this.top_10_articles_year[index].nombre)
                        dataSerie2.push(this.top_10_articles_year[index].montant)
                    }
                    this.option.xAxis[0].data = data
                    this.option.series[0].data = dataSerie
                    this.option.series[1].data = dataSerie2


                    this.items = [];
                    for (let index = 0; index < this.top_10_clients_year.length; index++) {
                        this.items.push({
                            id: index + 1,
                            avatar: require("@/assets/images/avatars/customers.png"),
                            nom: this.top_10_clients_year[index].client.nom,
                            prenom: this.top_10_clients_year[index].client.prenoms,
                            montant: this.formatMoney(this.top_10_clients_year[index].somme)+' '+this.devise,
                            created_at: this.format_date(this.top_10_clients_year[index].client.created_at),
                            email: this.top_10_clients_year[index].client.email,
                            contact: this.top_10_clients_year[index].client.indicateur + " " + this.top_10_clients_year[index].client.contact,
                        });
                    }
                } else if (this.selectedRadio === "Depuis le début") {
                    // les produits le plus vendu
                    const data = []
                    const dataSerie = []
                    const dataSerie2 = []
                    for (let index = 0; index < this.top_10_articles_depuid_deb.length; index++) {
                        data.push(this.top_10_articles_depuid_deb[index].libelle)
                        dataSerie.push(this.top_10_articles_depuid_deb[index].nombre)
                        dataSerie2.push(this.top_10_articles_depuid_deb[index].montant)
                    }
                    this.option.xAxis[0].data = data
                    this.option.series[0].data = dataSerie
                    this.option.series[1].data = dataSerie2


                    this.items = [];
                    for (let index = 0; index < this.top_10_clients_depuis_deb.length; index++) {
                        this.items.push({
                            id: index + 1,
                            avatar: require("@/assets/images/avatars/customers.png"),
                            nom: this.top_10_clients_depuis_deb[index].client.nom,
                            prenom: this.top_10_clients_depuis_deb[index].client.prenoms,
                            montant: this.formatMoney(this.top_10_clients_depuis_deb[index].somme)+' '+this.devise,
                            created_at: this.format_date(this.top_10_clients_depuis_deb[index].client.created_at),
                            email: this.top_10_clients_depuis_deb[index].client.email,
                            contact: this.top_10_clients_depuis_deb[index].client.indicateur + " " + this.top_10_clients_depuis_deb[index].client.contact,
                        });
                    }
                }
            },
        },
        
    };
</script>
<style scoped src="@/assets/private/home.css">

</style>
