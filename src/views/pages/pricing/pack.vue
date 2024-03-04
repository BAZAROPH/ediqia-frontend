<template>
  <section v-if="access" id="pricing-plan">
    <!-- title text and switch button -->
    <div class="text-center">
      <h1 class="mt-5">
        Notre Plan Premium
      </h1>
      <p class="mb-2 pb-75">
        Avec la version premium vous aurez accès à toutes les fonctionnalités de base et en plus la possiblité d'intégrer vos modules.
      </p>
      <div class="d-flex align-items-center justify-content-center mb-5 pb-50">
        <h6 class="mr-1 mb-0">
          Gratuit
        </h6>
        <b-form-checkbox id="priceSwitch" v-model="status" name="price-switch" value="premium" unchecked-value="gratuit" switch @input="tooglePlan" />
        <h6 class="ml-50 mb-0 text-indigo font-weight-bold">
          Premium
        </h6>
      </div>
    </div>
    <!--/ title text and switch button -->

    <!-- pricing plan cards -->
    <b-row class="pricing-card">
      <b-col offset-sm-2 sm="10" md="12" offset-lg="2" lg="10" class="mx-auto">
        <b-row>
          <b-col md="6" class="m-auto">
            <b-card class="popular pb-3" align="center">
              <div class="pricing-badge text-right">
                <b-badge v-show="!premiumPlanShow" variant="light-primary" pill>
                  Premium
                </b-badge>

                <b-badge v-show="premiumPlanShow" variant="light-primary" pill>
                  Gratuit
                </b-badge>
              </div>
              <!-- img premium -->
              <b-img v-show="!premiumPlanShow" :src="require('@/assets/images/illustration/premium.png')" class="mb-2 mt-2" alt="basic svg img" />
              <!--/ img premium -->
              <!-- img gratuit -->
              <b-img v-show="premiumPlanShow" :src="require('@/assets/images/illustration/gratuit.png')" class="mb-2 mt-2" alt="basic svg img" />
              <!--/ img gratuit -->
              <h3></h3>
              <b-card-text></b-card-text>

              <!-- premium plan -->
              <div class="annual-plan" v-show="!premiumPlanShow">
                <div class="plan-price mt-2">
                  <sup class="font-medium-1 font-weight-bold text-indigo pr-1">{{devise}}</sup>
                  <span class="pricing-basic-value font-weight-bolder text-indigo">{{prix | formatNumber}}</span>
                  <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/{{delai}}</sub>
                </div>
              </div>
              <!--/ premium plan -->
              <!-- gratuit plan -->
              <div class="annual-plan" v-show="premiumPlanShow">
                <div class="plan-price mt-2"><span class="pricing-basic-value font-weight-bolder text-indigo">Gratuit</span><br /></div>
                <div class="plan-price mt-1">
                  <sub class="pricing-duration text-body font-medium-1 font-weight-bold pt-3">Essayer pendant 14 Jours</sub>
                </div>
              </div>
              <!--/ gratuit plan -->

              <!-- plan premium benefit -->
              <b-list-group v-for="(premium_benefit,i) in premium_benefits" :key="i" class="list-group-circle text-left">
                <span class="mt-1"><i class="icofont-check-circled pr-1 text-violet"></i> {{premium_benefit }}</span>
              </b-list-group>
              <!--/ plan premium benefit -->

              <!-- buttons premium -->
              <b-button disabled v-if="marchePremium" v-show="!premiumPlanShow" v-ripple.400="'rgba(255, 255, 255, 0.15)'" block class="mt-2 bg-indigo" @click="premium">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </b-button>
              <b-button v-else v-show="!premiumPlanShow" v-ripple.400="'rgba(255, 255, 255, 0.15)'" block class="mt-2 bg-indigo" @click="premium">
                Souscrire
              </b-button>

              <!-- buttons gratuit -->
              <b-button disabled v-if="marcheGratuit" v-show="premiumPlanShow" v-ripple.400="'rgba(255, 255, 255, 0.15)'" block class="mt-2 bg-jaune" @click="free">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </b-button>
              <b-button v-else v-show="premiumPlanShow" v-ripple.400="'rgba(255, 255, 255, 0.15)'" block class="mt-2 bg-jaune" @click="free">
                Continuer
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!--/ pricing plan cards -->

    <!-- pricing free trial -->
    <div class="pricing-free-trial">
      <b-row>
        <b-col lg="10" offset-lg="3" class="mx-auto">
          <div class="pricing-trial-content d-flex justify-content-between">
            <div class="text-center text-md-left mt-3">
              <h3 class="text-jaune">
                Gratuit pendant 14 jours.
              </h3>
              <h5>Vous obtiendrez un accès à toutes les fonctionnalités pour 2 semaines.</h5>
              <b-button v-if="marcheGratuit" disabled v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-2 mt-lg-3 bg-jaune pr-5 pl-5" @click="free">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </b-button>
              <b-button v-else v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-2 mt-lg-3 bg-jaune" @click="free">
                Commencer avec 14 jours d'essai
              </b-button>
            </div>

            <!-- images -->
            <b-img fluid :src="require('@/assets/images/illustration/pricing-Illustration.svg')" class="pricing-trial-img" alt="svg img" />
            <!--/ images -->
          </div>
        </b-col>
      </b-row>
    </div>
    <!--/ pricing free trial -->

    <!-- pricing faq -->
    <div class="pricing-faq">
      <h3 class="text-center">
        FAQ's
      </h3>
      <p class="text-center">
        Laissez-nous vous aider à répondre aux questions les plus courantes.
      </p>
      <b-row class="py-2">
        <b-col lg="10" offset-lg="2" class="mx-auto">
          <app-collapse accordion type="margin">
            <app-collapse-item v-for="(faq,index) in faqs" :key="index" :title="faq.question">
              {{ faq.reponse }}
            </app-collapse-item>
          </app-collapse>
        </b-col>
      </b-row>
    </div>
    <!--/ pricing faq -->
  </section>
</template>

<script>
  import { BFormCheckbox, BRow, BCol, BCard, BImg, BCardText, BListGroup, BListGroupItem, BButton, BBadge } from "bootstrap-vue";
  import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
  import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
  import Ripple from "vue-ripple-directive";
  import URL from '@/views/pages/request'
  import axios from "axios";
  import numeral from 'numeral'
  import CryptoJS from 'crypto-js'

  /* eslint-disable global-require */
  export default {
    components: {
      BFormCheckbox,
      CryptoJS,
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
    filters: {
      formatNumber: function(value){
        return numeral(value).format("0,0");
      }
    },
    async beforeMount(){
        await axios.get(URL.VERIFICATION).then((response)=>{
            this.returnData = response.data;
            console.log(this.returnData)    
            if(this.returnData.abonnement_exist){
                this.$router.push({name: 'home'})
            }else{
                this.access = true
            }
        })
    },
    async mounted(){
        document.title = 'Pack'  
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
            this.prix = this.returnData.montant
        })
        .catch((error) => {
          console.log(error)
            if (error.response) {
                console.log(error.response.data);
            }
        });
        } catch (error) {
            console.log(error.type);
        }
    },
    data() {
      return {
        access:false,
        status: "gratuit",
        premiumPlanShow: true,
        repser:"",
        marchePremium:false,
        marcheGratuit:false,
        pricing: {},
        premium_benefits: ["CRM", "Gestion de stock", "Création de devis", "Gestion de factures", "Gestion des Trésorerie", "Création de catalogues", "Gestion de comptabilité"],
        devise: "Fcfa",
        prix: "",
        delai: "mois",
        faqs: [
          {
            question: "Ediqia propose quoi?",
            reponse: "Ediqia est une solution disgitale permettant de gérer une entreprise; c'est a1 dire gérer les clients, les entrées et sorties, les employés, les agences s'il y en a, établir les facture les devis",
          },
          {
            question: "Quelle est la solution phare d'Ediqia",
            reponse: "Le CRM, la facturation",
          },
          {
            question: "Qui somme nous ?",
            reponse: "Nous sommez une entreprise ivoiienne qui pronne la technologie et a le souhait de facilité la vie des star-up",
          },
        ],
      };
    },
    methods: {
      tooglePlan() {
        console.log(this.status);
        if (this.status === "gratuit") {
          this.premiumPlanShow = true;
        } else {
          this.premiumPlanShow = false;
        }
      },
      async free(e) {
        this.marcheGratuit=true
        try {
          e.preventDefault();
          const data = {
            libelle: this.status,
          };
          const config = {
            headers: {
              Accept: "application/json",
            },
          };
          await axios
            .post(URL.ABONNEMENT_CREATE, data, config)
            .then((response) => {
              response.data;
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.data);
              }
            });
        } catch (error) {
          console.log(error.type);
        }
        window.location.href = 'https://ediqia.com/#/'
      },
       premium(e) {
        this.marchePremium=true
        try {
          e.preventDefault();
          const data = {
            libelle: this.status,
          };
          const config = {
            headers: {
              Accept: "application/json",
            },
          };
            this.$router.push("/paiement")
        } catch (error) {
          console.log(error.type);
        }
      },
    },
  };
  /* eslint-disable global-require */
</script>

<style lang="scss">
  @import "@core/scss/vue/pages/page-pricing.scss";
  [dir] .pricing-card .card.popular {
    border: 1px solid #450077;
  }
</style>
