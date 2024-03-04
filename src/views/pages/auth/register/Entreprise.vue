<template>
    <div v-if="access" class="auth-wrapper auth-v2">
        <b-row v-if="afficher" class="chargement">
            <div class="spinner-grow text-indigo" style="width: 7rem; height: 7rem;" role="status"></div>
        </b-row>

        <b-row v-else class="auth-inner m-0">
            <!-- Brand logo-->

            <b-link class="brand-logo">
                <h2 class="brand-text text-primary ml-1">
                    <vuexy-logo />
                </h2>
            </b-link>

            <!-- /Brand logo-->

            <!-- Left Text-->

            <b-col lg="4" class="d-none d-lg-flex align-items-center">
                <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
                    <b-img fluid :src="imgUrl" alt="Register V2" />
                </div>
            </b-col>

            <!-- /Left Text-->

            <!-- Register-->

            <b-col lg="8" class="d-flex align-items-center auth-bg px-2 p-lg-5">
                <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                    <b-card-title title-tag="h2" class="font-weight-bold mb-1 text-center">
                        Allons y !
                    </b-card-title>

                    <b-card-text class="mb-2 text-center">
                        Créer votre organisation 🏫
                    </b-card-text>

                    <!-- form -->

                    <validation-observer ref="registerForm">
                        <b-form class="auth-register-form mt-2">
                            <b-row>
                                <b-col lg="12">
                                    <!-- champs -->

                                    <!-- ligne 1 -->

                                    <b-row>
                                        <b-col lg="6">
                                            <!-- nom -->

                                            <b-form-group  class="text-danger" label-for="entreprise-name">
                                                <label for="">Nom <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider #default="{ errors }" name="nom" rules="required">
                                                    <b-form-input id="entreprise-nom" @input="obligatoryNom" v-model="nom" name="entreprise-nom" :state="errors.length > 0 ? false:null" placeholder="Qenium" />

                                                    <!-- Affichage d'un texte en cas d'erreur  -->

                                                    <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                                        Veuillez entrer le nom de votre organisation
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <!-- domaine d'activité -->

                                        <b-col lg="6">
                                            <b-form-group label-for="entreprise-domaine">
                                                <label for="">Domaine d'activité <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider #default="{  }" name="nom" rules="required">
                                                    <v-select v-model="selectedDomaine" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="domaine" />

                                                    <small :class="valideDomaine ? 'block' : 'none'" class="text-danger">
                                                        Veuillez entrer le votre domaine d'activité
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <!-- /ligne 1 -->

                                    <!-- ligne 2 -->

                                    <b-row>
                                        <!-- email -->

                                        <b-col lg="6">
                                            <b-form-group label-for="entreprise-email">
                                                <label for="">Email <span class="p-0 text-danger h6">*</span></label>
                                                <b-form-input id="entreprise-email" @input="obligatoryEmail" v-model="email" name="entreprise-email" placeholder="info@qenium.com" />

                                                <!-- Affichage d'un texte en cas d'erreur  -->

                                                <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                                    Veuillez entrer l'email de votre organisation
                                                </small>

                                                <small :class="exist_email ? 'block' : 'none'" class="text-danger">
                                                    {{erreur_duplicate_email}}
                                                </small>
                                            </b-form-group>
                                        </b-col>

                                        <!-- Taille -->

                                        <b-col lg="6">
                                            <b-form-group label-for="entreprise-taille">
                                                <label for="">Taille (Membres du personnel) <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider>
                                                    <v-select v-model="selectedTaille" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="taille" />

                                                    <small :class="valideDomaine ? 'block' : 'none'" class="text-danger">
                                                        Veuillez sélectionner la taille de votre personel
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <!-- /ligne 2 -->

                                    <!-- ligne 3 -->

                                    <b-row>
                                        <!-- site web -->

                                        <b-col lg="6">
                                            <b-form-group label="Site Web" label-for="entreprise-siteweb">
                                                <b-form-input id="entreprise-siteweb" v-model="siteweb" name="entreprise-siteweb" placeholder="www.qenium.com" />
                                            </b-form-group>
                                        </b-col>

                                        <!-- Devise -->

                                        <b-col lg="6">
                                            <b-form-group label-for="entreprise-devise">
                                                <label for="">Devise utilisée <span class="p-0 text-danger h6">*</span></label>
                                                <v-select v-model="selectedDevise" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="devise" />
                                                <small :class="valideDevise ? 'block' : 'none'" class="text-danger">
                                                        Veuillez sélectionner la devise de votre pays
                                                </small>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <!-- /ligne 3 -->

                                    <!-- ligne 4 -->

                                    <b-row>
                                        <!-- contact -->

                                        <b-col lg="6">
                                            <!-- contact -->

                                            <b-form-group label-for="register-contact" class="localisation">
                                                <validation-provider #default="{ errors }" name="contact" rules="required">
                                                    <label for="">Contact <span class="p-0 text-danger h6">*</span></label>
                                                    <vue-tel-input
                                                        id="register-contact"
                                                        @country-changed="changer"
                                                        @validate="contactEntier($event)"
                                                        v-model="phone"
                                                        name="register-contact"
                                                        :state="errors.length > 0 ? false:null"
                                                        placeholder="000-000-000-000"
                                                    />

                                                    <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                                                        Veuillez renseigner votre contact
                                                    </small>

                                                    <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                                                        Ce numéro de téléphone n'est pas valide
                                                    </small>

                                                    <small :class="exist_contact ? 'block' : 'none'" class="text-danger">
                                                        Ce contact existe déjà, veuillez utiliser un autre
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <b-col lg="6">
                                            <!-- Numéro fixe -->

                                            <b-form-group label="Télépone fixe" label-for="entreprise-telfixe">
                                                <validation-provider #default="{ errors }" name="telfixe">
                                                    <b-form-input id="entreprise-telfixe" v-model="telfixe" name="entreprise-telfixe" placeholder="000-000-000-000" />

                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <!-- /ligne 4 -->

                                    <!-- ligne 5 -->

                                    <label for="">Adresse</label>
                                    <div id="custom-search-input" class="mb-1">
                                        <div class="input-group">
                                            <input id="autocomplete_search" @input="initialize" name="autocomplete_search" type="text" class="form-control" placeholder="Où est situé votre entreprise" />
                                            <input type="hidden" name="lat">
                                            <input type="hidden" name="long">
                                        </div>
                                    </div>

                                    <!-- /ligne 5 -->

                                    <!-- ligne6 -->

                                    <b-row>
                                        <b-col lg="12" class="m-auto">
                                            <div>
                                                <!-- Styled -->

                                                <b-form-file
                                                    class="text-center"
                                                    v-model="file"
                                                    @change="processFile($event)"
                                                    :state="Boolean(file)"
                                                    placeholder="Choisir le logo de votre entreprise"
                                                    drop-placeholder="Drop file here..."
                                                    no-drop
                                                />
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-col>

                                <!-- /champs -->
                            </b-row>

                            <b-button disabled variant="primary" block type="submit" class="bg-indigo mt-2" v-if="marche">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </b-button>

                            <b-button variant="primary" block type="submit" class="bg-indigo mt-2" v-else @click.prevent="save">
                                Enregistrer
                            </b-button>
                        </b-form>
                    </validation-observer>

                    <p class="text-center mt-2">
                        <span>Vous avez un compte?</span>

                        <b-link :to="{name:'login'}">
                            <span>&nbsp;Se connecter</span>
                        </b-link>
                    </p>
                </b-col>
            </b-col>

            <!-- /Register-->
        </b-row>
    </div>
</template>

<script>
    /* eslint-disable global-require */
    import { BootstrapDropdown } from "vue-custom-google-autocomplete";

    import { ValidationProvider, ValidationObserver } from "vee-validate";

    import VuexyLogo from "@core/layouts/components/Logo.vue";

    import { BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText } from "bootstrap-vue";

    import { required, email } from "@validations";

    import { togglePasswordVisibility } from "@core/mixins/ui/forms";

    import store from "@/store/index";

    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

    import vSelect from "vue-select";

    import { BFormFile } from "bootstrap-vue";

    import URL from '@/views/pages/request'

    import axios from "axios";

    import { VueTelInput } from "vue-tel-input";

    import VueGoogleAutocomplete from "vue-google-autocomplete";

    export default {
        components: {
            VueGoogleAutocomplete,
            BootstrapDropdown,

            VuexyLogo,

            VueTelInput,

            BRow,

            BImg,

            BCol,

            BLink,

            BButton,

            BForm,

            BCardText,

            BCardTitle,

            BFormCheckbox,

            BFormGroup,

            BFormInput,

            BInputGroup,

            BInputGroupAppend,

            vSelect,

            BFormFile,

            // validations

            ValidationProvider,

            ValidationObserver,
        },

        data() {
            return {
                address: "",
                leRef: "",

                selectedLocation: null,

                autocomplete: "",

                phone: "",

                valideSelected: "",

                status: "",

                nom: "",

                localisation: "",

                siteweb: "",

                telfixe: "",

                email: "",

                domaine: "",

                devise: "",

                contact: "",

                taille: "",

                marche: false,

                sideImg: require("@/assets/images/pages/not-authorized.svg"),

                // validation

                required,

                email,

                file: null,

                selectedDomaine: "Votre domaine d'activité",

                selectedTaille: "La taille de votre personnel",

                selectedDevise: "Quelle devise utilisez vous ?",

                domaine: [],

                taille: [],

                devise: [],

                valideEmail: false,

                valideContact: false,

                valideLocalisation: false,

                valideNom: false,

                valideContactNumber: false,

                erreur_duplicate_email: "",

                erreur_duplicate_contact: "",

                exist_email: false,

                exist_contact: false,

                erreur: false,

                afficher: true,

                valideDomaine: false,

                picture: "",

                selectedIndicatif: "+225",

                optionIndicatif: [],

                valideTaille: false,

                contactFinal: "",

                indicatifFinal: "",

                access:false,
            };
        },
        async beforeMount(){
            await axios.get(URL.VERIFICATION).then((response)=>{
                this.returnData = response.data;
                console.log(this.returnData);
                if(this.returnData.entreprise_exist && !this.returnData.abonnement_exist){
                    this.$router.push({name: 'pack'});
                }else if(this.returnData.entreprise_exist){
                    this.$router.push({name : 'home'});
                }else{
                    this.access = true;
                }
            })
        },
        async mounted() {
            document.title='Nouvelle entreprise';

            // if (localStorage.getItem('token')) {
            //     this.$router.push('/')
            // }
            google.maps.event.addDomListener(window, 'load', initialize);

            try {

                await axios

                    .get(URL.ENTREPRISE_CREATE)

                    .then((response) => {
                        this.userData = response;
                    })

                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });

                await axios

                    .get(URL.ENTREPRISE)

                    .then((response) => {
                        localStorage.setItem("ref", JSON.stringify(this.$refs));
                        this.returnData = response;
                    })

                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });

                if (this.returnData.data !== "" && this.userData.data !== "") {
                    this.afficher = false;
                }

                // devise

                this.devise_id = this.userData.data[0][0].libelle + "";

                for (let index = 0; index < this.userData.data[0].length; index++) {
                    this.devise.push(this.userData.data[0][index].libelle +' '+ this.userData.data[0][index].description);
                }

                // /taille

                for (let index = 0; index < this.userData.data[1].length; index++) {
                    this.taille.push(`${this.userData.data[1][index].libelle}`);
                }

                // /domaine

                for (let index = 0; index < this.userData.data[2].length; index++) {
                    this.domaine.push(`${this.userData.data[2][index].libelle}`);
                }
            } catch (error) {
                console.log(error);
            }
        },

        mixins: [togglePasswordVisibility],

        computed: {
            passwordToggleIcon() {
                return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
            },

            imgUrl() {
                if (store.state.appConfig.layout.skin === "dark") {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties

                    this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");

                    return this.sideImg;
                }

                return this.sideImg;
            },
        },

        methods: {
            initialize() {
                var input = document.getElementById('autocomplete_search');
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                // place variable will have all the information you are looking for.
                $('#lat').val(place.geometry['location'].lat());
                $('#long').val(place.geometry['location'].lng());
                    localStorage.setItem('place', JSON.stringify(place))
                });
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },

            processFile(event) {
                this.picture = event.target.files[0];

                if (event.target.files.length !== 0) {
                    // const picturePath = URL.createObjectURL(this.picture)

                    // const picture = document.querySelector('#profil_picture')

                    // picture.src = picturePath

                    console.log(this.picture);
                } else {
                    // const picture = document.querySelector('#profil_picture')
                    // picture.src = ''
                }
            },

            // validationForm() {

            //   this.$refs.registerForm.validate().then((success) => {

            //     if (success) {

            //       const data= new FormData();

            //       data.append("logo",this.picture)

            //       this.$toast({

            //         component: ToastificationContent,

            //         props: {

            //           title: "Form Submitted",

            //           icon: "EditIcon",

            //           variant: "success",

            //         },

            //       });

            //     }

            //   });

            // },

            obligatoryEmail() {
                this.if_exist_email();

                // valid email regex pattern

                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

                if (!this.email.match(emailPattern)) {
                    this.valideEmail = true;

                    this.erreur = true;
                } else {
                    this.valideEmail = false;

                    this.erreur = false;
                }
            },

            obligatoryNom() {
                if (!this.nom) {
                    this.valideNom = true;

                    this.erreur = true;
                } else {
                    this.valideNom = false;

                    this.erreur = false;
                }
            },

            validateContact() {
                this.contactFinal = this.contact.formatted;

                this.indicatifFinal = this.contact.country.dialCode;

                if (!this.contactFinal) {
                    this.valideContact = true;

                    this.erreur = true;
                } else {
                    this.valideContact = false;

                    this.erreur = false;
                }

                if (this.contactFinal && this.contactFinal.length < 8) {
                    console.log(this.contactFinal);

                    this.valideContactNumber = true;

                    this.erreur = true;
                } else {
                    this.valideContactNumber = false;

                    this.erreur = false;
                }

                this.if_exist_contact();
            },

            obligatoryLocalisation() {
                if (!this.address) {
                    this.valideLocalisation = true;

                    this.erreur = true;
                } else {
                    this.valideLocalisation = false;

                    this.erreur = false;
                }
            },

            obligatoryDomaine() {
                if (this.selectedDomaine == "Votre domaine d'activité" || !this.selectedDomaine) {
                    this.valideDomaine = true;

                    this.erreur = true;
                } else {
                    this.valideDomaine = false;

                    this.erreur = false;
                }

                console.log(this.valideDomaine);
            },

            obligatoryTaille() {
                if (this.selectedTaille == "La taille de votre personnel" || !this.selectedTaille) {
                    this.valideTaille = true;

                    this.erreur = true;
                } else {
                    this.valideTaille = false;

                    this.erreur = false;
                }
            },

            obligatoryDevise() {
                if (this.selectedDevise == "Quelle devise utilisez vous ?" || !this.selectedDevise) {
                    this.valideDevise = true;
                    this.erreur = true;
                } else {
                    this.valideDevise = false;
                    this.erreur = false;
                }
            },

            find_id(text, objet) {
                for (let index1 = 0; index1 < this.userData.data.length; index1++) {
                    for (let index = 0; index < objet.data[index1].length; index++) {
                        if (text === objet.data[index1][index].libelle) {
                            return objet.data[index1][index].id;
                        }
                    }
                }
            },
            find_devise_id(text, objet) {
                for (let index1 = 0; index1 < this.userData.data.length; index1++) {
                    for (let index = 0; index < objet.data[index1].length; index++) {
                        if (text.indexOf(objet.data[index1][index].description)>1) {
                            console.log('hoho')
                            return objet.data[index1][index].id;
                        }
                    }
                }
            },

            async save() {
                this.address = JSON.parse(localStorage.getItem('place'))
                localStorage.removeItem('place')
                this.marche = true;

                try {
                    this.obligatoryLocalisation();

                    this.validateContact();

                    this.obligatoryNom();

                    this.obligatoryTaille();

                    this.obligatoryDevise();

                    this.obligatoryDomaine();

                    this.validateIndicatif();

                    if (!this.email) {
                        this.email = "_";
                    }

                    this.obligatoryEmail();

                    if (this.email === "_") {
                        this.email = "";
                    }

                    if (this.erreur !== true) {
                        this.marche = true;

                        this.domaine_id = this.find_id(this.selectedDomaine, this.userData);

                        this.taille_id = this.find_id(this.selectedTaille, this.userData);

                        this.devise_id = this.find_devise_id(this.selectedDevise, this.userData);

                        const data = new FormData();

                        data.append("image", this.picture);

                        data.append("libelle", this.nom);

                        data.append("domaine_id", this.domaine_id);

                        data.append("taille_id", this.taille_id);

                        data.append("email", this.email);

                        data.append("contact", this.contactFinal);

                        data.append("site_internet", this.siteweb);

                        data.append("fixe", this.telfixe);

                        data.append("indicateur", this.indicatifFinal);

                        data.append("localisation", this.address);

                        data.append("devise_id", this.devise_id);

                        var lien = window.location.href
                        
                        lien = lien.split('/#')

                        lien = lien[0]
                        lien = lien+'/#/login?'

                        data.append("url", lien)

                        this.$refs.registerForm.validate().then((success) => {
                            if (success) {
                                this.$toast({
                                    component: ToastificationContent,

                                    props: {
                                        title: "Reception de l'entreprise",

                                        icon: "EditIcon",

                                        variant: "success",
                                    },
                                });
                            }
                        });

                        this.marche = true;

                        const config = {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "multipart/form-data",
                            },
                        };

                        await axios.post(URL.ENTREPRISE_STORE, data, config).then((response) => {
                            this.dataReturn = response.data;
                        });

                        this.marche = false;

                        this.$router.push("/pack");
                    } else {
                        this.marche = false
                        this.error_global = true;
                    }
                } catch (error) {
                    console.log(error);

                    this.error_global = true;

                    setTimeout(() => {
                        this.marche = false;
                    }, 300);
                }
            },

            if_exist_email() {
                for (let index = 0; index < this.returnData.data.entreprise.length; index++) {
                    if (index < this.returnData.data.entreprise.length) {
                        if (this.returnData.data.entreprise[index].email == this.email) {
                            this.erreur_duplicate_email = "Ce email existe déjà, veuillez utiliser un autre";

                            this.exist_email = true;

                            this.erreur = true;

                            index = this.returnData.data.entreprise.length;
                        } else {
                            this.exist_email = false;

                            this.erreur = false;
                        }
                    }
                }
            },

            validateIndicatif() {
                if (!this.selected) {
                    this.valideSelected = true;

                    this.erreur = true;
                } else {
                    this.valideSelected = false;

                    this.erreur = false;
                }
            },

            if_exist_contact() {
                for (let index = 0; index < this.returnData.data.entreprise.length; index++) {
                    if (index < this.returnData.data.entreprise.length) {
                        console.log(this.returnData.data.entreprise[index].contact);

                        if (this.returnData.data.entreprise[index].contact == this.contactFinal) {
                            this.exist_contact = true;

                            this.erreur = true;

                            index = this.returnData.data.entreprise.length;
                        } else {
                            this.exist_contact = false;

                            this.erreur = false;
                        }
                    }
                }
            },

            contactEntier(e) {
                this.contact = e;

                //    console.log(this.phone)
            },

            changer(e) {
                this.contact.country.name = e.name;
            },
        },
    };

    /* eslint-disable global-require */
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";

    @import "@core/scss/vue/pages/page-auth.scss";

    .none {
        display: none;
    }

    .block {
        display: inline-block;
    }
    .vti__dropdown-list{
        z-index: 12000000000;
    }
</style>
