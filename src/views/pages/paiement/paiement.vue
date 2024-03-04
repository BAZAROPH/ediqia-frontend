<template>
    <b-row class="m-5">
        <b-col lg="8" sm="12" md="12" class="m-auto">
            <div class="row">
                <div class="col-lg-12 text-center ">
                    <h1 class="h1 font-weight-bold">RÉSUMÉ DE L'ABONNEMENT</h1>
                </div>
            </div>
            <b-card>
                <b-row class="mt-2">
                    <b-col lg="12" class="m-auto">
                        <b-row class="ml-5 mr-5">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">Plan</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-jaune">
                                    <span style="font-size: 20px;">{{plan}}</span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">Durée</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-success">
                                    <span style="font-size: 20px;">{{duree}} Jours</span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">Total HT</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-warning">
                                    <span style="font-size: 20px;">{{ht}} {{devise}}</span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">TVA</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-warning">
                                    <span style="font-size: 20px;">{{tva}} % </span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">Total TTC</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-success">
                                    <span style="font-size: 20px;">{{ttc}} {{devise}}</span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">Date de souscription</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-success">
                                    <span style="font-size: 18px;">{{today}}</span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="6" class="m-auto text-center">
                                <span style="font-size: 18px;">Date de réabonnement</span>
                            </b-col>
                            <b-col lg="6" class="m-auto text-center">
                                <b-badge variant="light-danger">
                                    <span style="font-size: 18px;">{{dr}}</span>
                                </b-badge>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="12" class="m-auto text-center">
                                <span style="font-size: 18px;" class="text-success font-weight-bold">Les avantages</span>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="10" class="m-auto text-left">
                                <b-card class="bg-light-success w-100">
                                    <div class="row">
                                        <div class="col-8 m-auto">
                                            <span v-for="module in modules" :key="module">
                                                <feather-icon icon="CheckCircleIcon" class="mr-1" />
                                                {{module}}<br />
                                            </span>
                                        </div>
                                    </div>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row class="ml-5 mr-5 mt-1">
                            <b-col lg="5" class="m-auto text-center d-flex">
                                <b-button disabled variant="primary" block type="submit" class="bg-indigo" v-if="marche">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </b-button>
                                <b-button variant="primary" @click="payWithPaydunya" block type="submit" v-else class="bg-indigo">
                                    Passer au paiement
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script src="https://paydunya.com/assets/psr/js/psr.paydunya.min.js"></script>
<script src="https://code.jquery.com/jquery.min.js"></script>

<script>
    import { BFormCheckbox, BRow, BCol, BFormInput, BCard, BImg, BCardText, BFormGroup, BListGroup, BListGroupItem, BButton, BBadge, BForm } from "bootstrap-vue";
    import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
    import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
    import Ripple from "vue-ripple-directive";
    import URL from '@/views/pages/request'
    import axios from "axios";
    // import * from 'https://paydunya.com/assets/psr/js/psr.paydunya.min.js';
    // import  * from 'https://code.jquery.com/jquery.min.js';
    /* eslint-disable global-require */
    export default {
        components: {
            BForm,
            BFormGroup,
            axios,
            BFormInput,
            BFormCheckbox,
            BButton,
            BCardText,
            BListGroup,
            BListGroupItem,
            BRow,
            BCol,
            BCard,
            BBadge,
            BImg,
            AppCollapseItem,
            AppCollapse,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                modules: ["Création de Devis", "Création de Facture", "Gestion de catalogue", "Jusqu'à 15 utilisateurs en plus"],
                devise: "",
                today: "",
                reabonnement: "",
                selected:'',
                marche:'',
                plan:'',
                duree:'',
                ttc:'',
                tva:'',
                ht:'',
                ds:'',
                dr:'',
                ds_e:'',
                dr_e:'',
                rem:'',
                abonnement_id:'',
                montant_tva:'',
                methods: [
                    {
                        libelle: "Orange Money",
                        image: "",
                    },
                    {
                        libelle: "Moov Monney",
                        image: "",
                    },
                    {
                        libelle: "MTN MoMo",
                        image: "",
                    },
                    { libelle: "PayPal", image: "" },
                ],
            };
        },
        async mounted() {
            document.title = 'Paiement'
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();
            var reabonnement = yyyy + 1;

            this.today = dd + "-" + mm + "-" + yyyy;
            this.ds_e = yyyy + "-" + mm + "-" + dd;
            this.devise = localStorage.getItem("devise");
            this.reabonnement = dd + "-" + mm + "-" + reabonnement;
            this.dr_e = reabonnement + "-" + mm + "-" + dd;
            try {
                    const config = {
                        headers: {
                        Accept: "application/json",
                        },
                    };
                    await axios
                        .get(URL.ACHAT_ABONNEMENT, config)
                        .then((response) => {
                            this.returnData = response.data.List_Abonnements
                            // console.log(this.returnData)
                            this.plan =  this.returnData.libelle
                            this.duree = 365
                            this.ttc = this.returnData.montant
                            this.tva = 18 
                            this.ht = this.ttc - (0.18*this.ttc)
                            this.ds = this.today
                            this.dr = this.reabonnement 
                            this.abonnement_id = this.returnData.id
                            this.montant_tva = (0.18*this.ttc)
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                } catch (error) {
                    console.log(error.type);
                }
        },
        methods: {
            async payWithPaydunya(e) {
                e.preventDefault();
                this.marche = true;
                let data = {
                    montant_ht:this.ht,
                    montant_tva:this.montant_tva,
                    montant_remise:this.rem,
                    montant_ttc:this.ttc,
                    duree:this.duree,
                    abonnement_id:this.abonnement_id,
                    date_fin:this.dr_e,
                }
                await axios.post(URL.PAIEMENT, data).then((response) => {
                    this.userData = response.data;
                    console.log(this.userData.message);
                    this.marche = false;
                    if (this.userData.message) {
                        // data = {
                        //     code : this.userData.message
                        // };
                        // console.log(this.userData.message);
                        // try{
                        //     axios.post(URL.PAIEMENT, data).then((response) => {
                        //     });
                        // }
                        // catch(error){
                        //     console.log(error);
                        // }
                        //this.$router.push('http://127.0.0.1:8000/api/paiement');
                        window.location.assign(URL.PAIEMENT_TOKEN + this.userData.message);
                    }
                    // console.log(this.userData.message)
                });
            }
        },
    };
    /* eslint-disable global-require */
</script>

<style lang="scss">
    @import "@core/scss/vue/pages/page-pricing.scss";
    @import 'https://paydunya.com/assets/psr/css/psr.paydunya.min.css';
    [dir] .pricing-card .card.popular {
        border: 1px solid #450077;
    }
</style>
