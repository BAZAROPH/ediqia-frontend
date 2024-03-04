<template>
  <b-row>
    <!-- User Info: Left col -->
    <b-col lg="8">
      <b-card>
        <b-row>
          <b-col cols="21" xl="6" class="d-flex justify-content-between flex-column">
            <!-- User Avatar & Action Buttons -->
            <div class="d-flex justify-content-start">
              <b-avatar :variant="`light-${resolveUserRoleVariant(2)}`" size="104px" rounded />
              <div class="d-flex flex-column ml-1">
                <div class="mb-1">
                  <div class="row">
                    <div class="col-12">
                      <h4 v-if="abonnement && user_createur" class="mb-0">
                        {{entreprise.libelle}}
                      </h4>
                      <b-skeleton v-else class="pr-3 pl-2 pt-1 pb-1" width="80%"></b-skeleton>
                    </div>
                  </div>
                  <!-- <span class="card-text ">Créée le {{ dateDeCreation}}</span><br /><br>
                  <span class="card-text">Par: {{user_createur.nom}} </span><br /> -->
                  <div class="row mt-1">
                    <div class="col-12 w-100">
                      <span v-if="abonnement && user_createur" class="card-text ">Créée le : {{ dateDeCreation}}</span>
                      <b-skeleton class="pr-3 pl-5" v-else width="100%"></b-skeleton>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 w-100 pt-2">
                      <span v-if="abonnement && user_createur" class="card-text">Par: {{user_createur.nom}} </span>
                      <b-skeleton class="pr-2 pl-2 pt-0 mt-0" v-else width="50%"></b-skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- Right Col: Table -->
          <b-col cols="12" xl="6">
              <span>Utilisateur connecté</span>
            <!-- <table class="mt-2 mt-xl-0 w-100">
              <tr>
                <th class="pb-50">
                  <feather-icon icon="UserIcon" class="mr-75" />
                  <span class="font-weight-bold">Nom</span>
                </th>
                <td v-if="abonnement && user_createur" class="pb-50">
                  {{user_connecte.nom}}
                </td>
                <td v-else class="pb-50">
                  <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="100%"></b-skeleton>
                </td>
                
              </tr>
              <tr>
                <th class="pb-50">
                  <feather-icon icon="CheckIcon" class="mr-75" />
                  <span class="font-weight-bold">Email</span>
                </th>
                <td class="pb-50 text-capitalize">
                  {{user_connecte.email}}
                </td>
              </tr>
              <tr>
                <th class="pb-50">
                  <feather-icon icon="StarIcon" class="mr-75" />
                  <span class="font-weight-bold">Crée le :</span>
                </th>
                <td class="pb-50 text-capitalize">
                  {{ dateDeCreation_user_connecte }}
                </td>
              </tr>
              <tr>
                <th class="pb-50">
                  <feather-icon icon="FlagIcon" class="mr-75" />
                  <span class="font-weight-bold">Adresse</span>
                </th>
                <td class="pb-50">
                  {{ user_connecte.localisation }}
                </td>
              </tr>
              <tr>
                <th>
                  <feather-icon icon="PhoneIcon" class="mr-75" />
                  <span class="font-weight-bold">Contact</span>
                </th>
                <td>
                  {{ user_connecte.contact }}
                </td>
              </tr>
            </table> -->
            <div class="row pt-1">
              <div class="col-6">
                <feather-icon icon="UserIcon" class="mr-75" />
                <span class="p-0 font-weight-bold ">Nom</span>
              </div>
              <div class="col-6">
                <span v-if="abonnement && user_createur">{{user_connecte.nom}}</span>
                <b-skeleton v-else class="pr-2 pl-2 pt-0 mt-0" width="100%"></b-skeleton>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <feather-icon icon="CheckIcon" class="mr-75" />
                <span class="font-weight-bold">Email</span>
              </div>
              <div class="col-6">
                <span v-if="abonnement && user_createur">{{user_connecte.email}}</span>
                <b-skeleton v-else class="pr-2 pl-2 pt-0 mt-0" width="100%"></b-skeleton>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <feather-icon icon="StarIcon" class="mr-75" />
                <span class="font-weight-bold">Ajouté le :</span>
              </div>
              <div class="col-6">
                <span v-if="abonnement && user_createur && dateDeCreation_user_connecte">{{dateDeCreation_user_connecte}}</span>
                <b-skeleton v-else class="pr-2 pl-2 pt-0 mt-0" width="100%"></b-skeleton>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <feather-icon icon="FlagIcon" class="mr-75" />
                <span class="font-weight-bold">Adresse</span>
              </div>
              <div class="col-6">
                <span v-if="abonnement && user_createur">{{user_connecte.localisation}}</span>
                <b-skeleton v-else class="pr-2 pl-2 pt-0 mt-0" width="100%"></b-skeleton>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <feather-icon icon="PhoneIcon" class="mr-75" />
                <span class="font-weight-bold">Contact</span>
              </div>
              <div class="col-6">
                <span v-if="abonnement && user_createur">{{user_connecte.contact}}</span>
                <b-skeleton v-else class="pr-2 pl-2 pt-0 mt-0" width="100%"></b-skeleton>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <!-- plan -->
    </b-col>
    <b-col lg="4">
      <b-card v-if="abonnement && user_createur" no-body :class="gratuit ? 'border-jaune m-auto pb-2' : 'border-primary m-auto pb-2'">
        <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
          <h5 class="mb-0">
            Votre abonnement
          </h5>
          <b-badge :variant="gratuit ? 'light-jaune' : 'light-primary'">
            {{ abonnement.libelle}}
          </b-badge>
          <small class="text-muted w-100">Souscrit le : {{ date_fin_abonnement}}</small>
        </b-card-header>

        <b-card-body class="mt-1">
          <ul class="list-unstyled my-1">
            <li>
              <span class="align-middle">Il vous reste : {{ duree_restante_abonnement }} Jour(s)</span>
            </li>
          </ul>
          <b-button class="mt-1 p-1" v-if="gratuit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" block>
            {{faire}}
          </b-button>
          <b-button v-if="premium" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="mt-1" variant="primary" block>
            Description
          </b-button>
        </b-card-body>
      </b-card>
      <b-skeleton-img class="h-100" v-else></b-skeleton-img>
    </b-col>
  </b-row>
</template>

<script>
  import { BCard, BButton, BAvatar, BRow, BCol, BBadge, BCardHeader } from "bootstrap-vue";
  import { avatarText } from "@core/utils/filter";
  import useUsersList from "../users-list/useUsersList";
  import URL from '@/views/pages/request'
  import axios from "axios";
  import moment from "moment";
  import Ripple from "vue-ripple-directive";

  export default {
    components: {
      BCard,
      BButton,
      BRow,
      BCol,
      BAvatar,
      axios,
      moment,
      BBadge,
      BCardHeader,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        gratuit:false,
        premium:false,
        loading: true,
        entreprise: "",
        abonnement:'',
        duree_restante_abonnement:'',
        afficher: "",
        dateDeCreation: "",
        user_createur: "",
        user_connecte:"",
        dateDeCreation_user_connecte: "",
        date_fin_abonnement:'',
      };
    },

    async mounted() {
      document.title = 'Profile'  
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      try {
        await axios.get(URL.CREATED_USER,config).then((res) => {
          this.user_createur = res.data[0][0];
        });
        await axios.get(URL.CONNECTED_USER,config).then((res) => {
          this.user_connecte = res.data[0].user_connecte;
        });
        await axios
          .get(URL.ENTREPRISE_INFO,config)
          .then((response) => {
            this.returnData = response;
          })
          .catch((error) => {
            console.log(error);
          });
        // this.duree_restante_abonnement=this.returnData.data.jour_restant
        // this.abonnement=this.returnData.data.abonnement_info[0]
        if (this.returnData.data) {
          this.afficher = false;
          this.entreprise = this.returnData.data[0].entreprise;
          this.dateDeCreation = this.format_date(this.entreprise.created_at);
          this.duree_restante_abonnement=this.returnData.data[0].nombre_jour_restant
          this.abonnement=this.returnData.data[0].abonnement_info
          this.date_fin_abonnement = this.returnData.data[0].abonnement_entreprise_pivot.date_final
          this.dateDeCreation_user_connecte = this.format_date(this.user_connecte.created_at);
          if(this.abonnement.libelle=="gratuit"){
            this.faire="Passer à la version premium"
            this.gratuit = true
            this.premium = false
          }else{
            this.faire="Renouveller l'abonnement"
            this.gratuit = false
            this.premium = true
          }
          console.log(this.faire)
        }
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      format_date(value) {
        if (value) {
          return moment(String(value)).format("DD/ MM/ YYYY");
        }
      },
    },
    props: {},
    setup() {
      const { resolveUserRoleVariant } = useUsersList();
      return {
        avatarText,
        resolveUserRoleVariant,
      };
    },
  };
</script>

<style></style>
