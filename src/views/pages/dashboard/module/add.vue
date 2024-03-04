<template>
    <b-row>
        <div class="col-12" v-if="afficher==true">
            <b-row>
                <b-col lg="8" sm="12" md="8"  >
                    <b-row>
                        <b-col lg="6" sm="6" md="6" v-for="(module) in modules" :key="module.id">
                            <b-card no-body class="card-apply-job">
                                <b-card-header class="pb-1">
                                    <b-media no-body class="text-center m-auto">
                                        <b-media-aside class="mr-1">
                                            <!-- <b-avatar
                        size="42"
                        :src="require('@/assets/images/portrait/small/module.jpg')"
                    /> -->
                                        </b-media-aside>
                                        <b-media-body>
                                            <!-- <h5 class="mb-0">
                        <span class="titre">{{libelle | capitalize}}</span>
                    </h5> -->
                                            <small class="text-muted pr-1">
                                                <span class="">Ajouté le : </span>
                                                <b-badge variant="light-primary" pill>
                                                    {{format_date(module.created_at)}}
                                                </b-badge>
                                            </small>
                                        </b-media-body>
                                    </b-media>
                                    <b-form-group>
                                        <b-form-checkbox class="sel" @change="box" v-model="selected" :value="module"> </b-form-checkbox>
                                    </b-form-group>
                                </b-card-header>
                                <b-card-body>
                                    <h5 class="mb-2 text-center">
                                        <span class="titre">{{module.libelle}}</span>
                                    </h5>
                                    <b-card-text class="mb-2">
                                        <span v-html="module.description"></span>
                                    </b-card-text>

                                    <!-- payment  -->
                                    <div class="apply-job-package bg-light-primary rounded">
                                        <div class="m-auto">
                                            <sup class="text-body">
                                                <small class="">{{devise}}</small>
                                            </sup>
                                            <h2 class="d-inline mr-25">
                                                {{module.montant}}
                                            </h2>
                                            <sub class="text-body"><small class="">/ mois</small></sub>
                                        </div>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg="4" sm="4" md="4">
                    <b-card class="resume">
                        <b-row class="mb-1">
                            <b-col lg='12' sm="12" md="12">
                                <h2 class="text-primary pb-0 mb">Résumé</h2>
                            </b-col>
                        </b-row>
                        <!-- <b-row class=" text-center">
                            <b-col lg="12">
                                <label style="font-weight:bold; color:#EFC300;">Période</label>
                            </b-col>
                        </b-row> -->
                        <b-row>
                            <b-col lg="12" class=" text-center">
                                <b-form-group>
                                    <b-form-radio-group id="btn-radios-1" style="background-color: white;" v-model="temps" button-variant="outline-primary" :options="options" buttons name="radios-btn-default" @change="box" />
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-row class="text-center mb-1 mt-2">
                            <b-col lg="5" class="text-left font-weight-bold text-indigo pr-0">Montant HT </b-col>
                            <b-col lg="7" class="text-right"><span class="font-weight-bold text-warning ">{{tht}}</span> <small class="text-primary">{{devise}}</small></b-col>
                        </b-row>
                        
                        <b-row class="text-center mb-1">
                            <b-col lg="5" class="text-left font-weight-bold text-indigo pr-0">Montant TTC</b-col>
                            <b-col lg="7" class="text-right"><span class="font-weight-bold text-success">{{ttc}}</span> <small class="text-primary">{{devise}}</small></b-col>
                        </b-row>

                        <b-row>
                           <b-col lg="12">
                                <b-card class="bg-light-primary w-100">
                                    <span v-for="mod in selected" :key="mod.id">
                                        <b-row>
                                            <b-col lg="12" >
                                                <feather-icon icon="CheckIcon" class="mr-1"/>{{mod.libelle.toUpperCase()}}
                                            </b-col>
                                        </b-row>
                                    </span>
                                </b-card>
                           </b-col>
                        </b-row>

                        <b-row>
                             <b-col>
                                 <b-button v-if="desactiver"  disabled v-ripple.400="'rgba(255, 255, 255, 0.15)'" block variant="primary">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </b-button>
                                <b-button v-else v-ripple.400="'rgba(255, 255, 255, 0.15)'" block variant="primary" @click="payer">
                                    Passer au paiement
                                </b-button>
                             </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </b-row>
</template>

<script>
    import { BCard, BCardHeader, BMedia, BFormGroup,BFormRadioGroup, BFormInput, BForm, BMediaAside, BFormCheckboxGroup, BAvatar, BMediaBody, BBadge, BCardText, BCardBody, BButtonGroup, BButton } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import moment from "moment";
    import vSelect from "vue-select";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

    export default {
        components: {
            BFormRadioGroup,
            BButtonGroup,
            vSelect,
            ToastificationContent,
            BForm,
            BFormInput,
            BFormGroup,
            moment,
            BFormCheckboxGroup,
            axios,
            BCard,
            BButton,
            BBadge,
            BCardHeader,
            BMedia,
            BMediaAside,
            BAvatar,
            BMediaBody,
            BCardText,
            BCardBody,
        },
        data() {
            return {
                modules: "",
                selected: [],
                devise: "",
                options: ["1 mois", "3 Mois", "1 an"],
                temps: "",
                selections: [],
                tht: 0,
                ttc: 0,
                desactiver: false,
                rem:0,
                dr_e: '',
                nbr_jour:'',
                total_hors_taxe:'',
                montant_tva:'',
                total_ttc:'',
                afficher: false,
            };
        },
        directives: {
            Ripple,
        },
        mounted() {
            const refresh = localStorage.getItem('refresh')
            if(refresh){
                localStorage.removeItem('refresh')
                window.location.reload()
                
            }else{
                this.afficher = true
            }
            console.log(this.afficher)
            document.title = 'Nouveau module'  
            this.temps = "1 mois";
            this.devise = localStorage.getItem("devise");
            try {
                axios.get(URL.MODULES).then((response) => {
                    this.returnData = response;
                    this.modules = this.returnData.data.module_et_permission;
                });
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
           async payer() {
                if (this.selected.length <= 0) {
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: "Vous n'avez pas sélectionné de modules",
                            icon: "AlertCircleIcon",
                            variant: "danger",
                        },
                    });
                } else {
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, "0");
                    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                    var yyyy = today.getFullYear();
                    mm = Number(mm)
                    if(mm+3>12){
                        mm = mm+3
                        var cpt = 0
                        for (let index = 0; mm>12; index++) {
                            cpt++
                            mm--
                        }
                        var reabonnement = yyyy  + 1;
                        reabonnement = reabonnement + "-" + cpt + "-" + dd;
                    }else{
                        var reabonnement = mm  + 3;
                        reabonnement = yyyy + "-" + reabonnement + "-" + dd;
                    }
                    let data = {
                        montant_ht: this.total_hors_taxe,
                        montant_tva: (this.total_hors_taxe*18)/100,
                        montant_remise:this.rem,
                        montant_ttc:this.total_hors_taxe + (this.total_hors_taxe*18)/100,
                        duree: this.nbr_jour,
                        modules:this.selected,
                        date_fin:reabonnement,
                    }
                    await axios.post(URL.PAIEMENT, data).then((response) => {
                        this.userData = response.data;
                        console.log(this.userData.message);
                        this.desactiver = true;
                        if (this.userData.message) {
                            data = {
                                token : this.userData.message
                            };
                            console.log(this.userData.message);
                            try{
                                axios.post(URL.PAIEMENT, data).then((response) => {
                                });
                            }
                            catch(error){
                                console.error;
                            }
                            //this.$router.push('http://127.0.0.1:8000/api/paiement');
                            window.location.assign(URL.PAIEMENT_TOKEN + this.userData.message);
                        }
                        // console.log(this.userData.message)
                    });
                    this.top();
                    setTimeout(() => {
                        this.desactiver = false;
                    }, 400);
                }
            },
            box() {
                console.log(this.temps);
                this.tht = 0;
                this.ttc = 0;
                for (let index = 0; index < this.selected.length; index++) {
                    this.tht = this.tht + this.selected[index].montant;
                }
                this.ttc = this.tht + (this.tht * 18) / 100;
                this.nbr_jour =30
                if (this.temps == "3 Mois") {
                    this.nbr_jour=90
                    this.ttc = this.ttc * 3;
                    this.tht = this.tht * 3;
                } else if (this.temps == "1 an") {
                    this.nbr_jour=365
                    this.ttc = this.ttc * 12;
                    this.tht = this.tht * 12;
                }
                this.total_hors_taxe = this.tht
                this.total_ttc = this.ttc
                if (typeof Intl === "undefined" || !Intl.NumberFormat) {
                }else{
                    var nf = Intl.NumberFormat();
                    this.ttc=nf.format(this.ttc)
                    this.tht=nf.format(this.tht)
                }
            },
            top() {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: "Vous serez bientôt rediriger vers page de paiement",
                        icon: "DollarSignIcon",
                        variant: "success",
                    },
                });
            },
            format_date(value) {
                if (value) {
                    return moment(String(value)).format("DD / MM / YYYY");
                }
            },
        },
    };
</script>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";

    .custom-checkbox .custom-control-label::before,
    .custom-checkbox .custom-control-label::after,
    .custom-radio .custom-control-label::before,
    .custom-radio .custom-control-label:hover {
        cursor: pointer;
    }
    .titre {
        font-size: 20px;
    }

    @media (min-width: 0px) and (max-width: 854px), screen and (orientation: portrait) {
        .bar {
            position: relative;
        }
    }
    //  @media (min-width: 1250px), screen and (orientation: portrait) {
    //     .bar {
    //         margin-top: 280px;
    //         margin-bottom: 20px;
    //         position: fixed;
    //         width: calc(100vw - (100vw - 100%) - calc(2rem * 2) - 232px);
    //         z-index: 12;
    //     }
    //     .haut{
    //         margin-bottom: 180px ;
    //     }
    // }
    .btn {
        font-weight: 400;
        color: #450077;
        font-weight: bold;
        font-size: 10px;
    }
    [dir] .btn-outline-primary:not(:disabled):not(.disabled):active, [dir] .btn-outline-primary:not(:disabled):not(.disabled).active, [dir] .btn-outline-primary:not(:disabled):not(.disabled):focus {
        background-color: #450077;
        color: white;
    }
    
    @media (min-width: 992px), screen and (orientation:portrait){
        .resume{
            position: fixed;
            width:24%;
        }
    }
    @media (min-width: 0px) and (max-width: 991px){
        .resume{
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 1;
            margin-bottom: 0px;
            margin-top: 500px;
        }
    }
    // @media (min-width: 375px), screen and  (orientation: portrait){
    //     .resume{
    //         width:30%;
    //     }
    // }
</style>
