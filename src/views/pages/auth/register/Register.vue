<template>
    <div class="auth-wrapper auth-v2">
        <b-row class="auth-inner m-0">
            <!-- Brand logo-->
            <b-link class="brand-logo">
                <h2 class="brand-text text-primary ml-1">
                    <vuexy-logo />
                </h2>
            </b-link>

            <!-- /Brand logo-->

            <!-- Left Text-->
            <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
                    <b-img fluid :src="imgUrl" alt="Register V2" />
                </div>
            </b-col>
            <!-- /Left Text-->

            <!-- Register-->
            <b-col lg="4" class="d-flex align-items-center auth-bg px-2 pt-lg-2 pr-lg-5 pl-lg-5">
                <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                    <b-card-title title-tag="h2" class="font-weight-bold mb-1 text-center">
                        L'aventure débute ici
                    </b-card-title>
                    <b-card-text class="mb-2 text-center">
                        Accroissez vos performances 🚀
                        <b-button style="display: none;" id="declenche" v-ripple.400="'rgba(0, 207, 232, 0.15)'" v-b-modal.modal-primary variant="outline-primary">
                            primary
                        </b-button>
                        
                        <b-button id="entrepriselist" style="display: none;" v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-default variant="outline-primary">
                            Default Modal
                        </b-button>

                        <b-modal id="modal-default" hide-footer centered title="Vos Entreprises">
                            <div class="row" v-for="(entreprise) in logData.entreprises" :key="entreprise.id">
                                <div class="col-lg-8 m-auto">
                                    <a @click='log(entreprise.code)'>
                                        <div class="row alert-primary p-1 rounded">
                                            <div class="col-lg-8 text-center alert-primary-strong">
                                                <span class="h2 text-center font-weight-bold text-indigo">{{entreprise.libelle}}</span>
                                            </div>
                                            <div class="col-lg-4">
                                                <img v-if="entreprise.image" :src="entreprise.image" height="30" width="40" alt="logo">
                                                <img v-else src="@/assets/images/logo/logo.png" height="30" width="40" alt="logo">
                                            </div>
                                            <hr>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </b-modal>

                        <b-modal id="modal-primary" ok-only ok-variant="primary" ok-title="Continuer" modal-class="modal-primary" title="Ce compte est liée à une ou plusieurs entreprise" @ok="connexion">
                            <div class="row mb-1">
                                <div class="col-lg-10 alert-primary rounded p-1 m-auto text-center">
                                    <div class="text-center mb-1">
                                        <span class="h4 text-primary">Vous pouvez</span><br>
                                    </div>
                                    <span class="h5 text-primary p-0"> - Vous connecter à l'entreprise</span><br>
                                    <span class="h5 text-primary p-0"> - Créer une nouvelle entreprise</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <b-form-group>
                                        <b-input-group>
                                            <b-form-input id="basic-password" v-model="presentPassword" :type="passwordFieldType" placeholder="Entrer votre mot de passe" />
                                            <b-input-group-append is-text>
                                                <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                                            </b-input-group-append>
                                        </b-input-group>
                                        <small :class="validePresentPassword ? 'block' : 'none'" class="text-danger">
                                            Vous devez renseigner votre mot de passe
                                        </small>
                                        <small :class="logData.error ? 'block' : 'none'" class="text-danger">
                                            {{logData.error}}
                                        </small>
                                    </b-form-group>

                                </div>
                            </div>
                            <!-- <b-card-text>
                                Biscuit chocolate cake gummies. Lollipop I love macaroon bear claw caramels. I love marshmallow tiramisu I love fruitcake I love gummi bears. Carrot cake topping liquorice. Pudding caramels liquorice sweet I
                                love. Donut powder cupcake ice cream tootsie roll jelly.
                            </b-card-text> -->
                        </b-modal>
                    </b-card-text>

                    <!-- form -->
                    <validation-observer ref="registerForm">
                        <b-form class="auth-register-form mt-2">
                            <!-- nom -->
                            <b-form-group label="Nom" label-for="register-nom">
                                <validation-provider #default="{ errors }" name="nom" rules="required">
                                    <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                                    <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                        Vous devez renseigner votre nom
                                    </small>
                                </validation-provider>
                            </b-form-group>

                            <!-- prenom -->
                            <b-form-group label="Prénom" label-for="register-prenom">
                                <validation-provider #default="{ errors }" name="prenom" rules="required">
                                    <b-form-input id="register-prenom" @input="validatePrenom" v-model="prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                    <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                                        Vous devez renseigner votre prénom
                                    </small>
                                </validation-provider>
                            </b-form-group>

                            <!-- email -->
                            <b-form-group label="Email" label-for="register-email">
                                <validation-provider #default="{ errors }" name="Email" rules="required|email">
                                    <b-form-input id="register-email" @input="validateEmail" v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                                    <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                        Veuillez entrer un email valide
                                    </small>
                                </validation-provider>
                            </b-form-group>
                            <!-- <b-form-group>
                                <label for="map">Adresse</label>
                                <vue-google-autocomplete ref="address" id="map" classname="form-control" :country="['ci','ml']" placeholder="Cocody" v-on:placechanged="getAddressData"> </vue-google-autocomplete>
                            </b-form-group> -->
                            <label for="">Localisation</label>
                            <div id="custom-search-input" class="mb-1">
                                <div class="input-group">
                                    <input id="autocomplete_search" @input="initialize" name="autocomplete_search" type="text" class="form-control" placeholder="Votre adresse" />
                                    <input type="hidden" name="lat" />
                                    <input type="hidden" name="long" />
                                </div>
                            </div>
                            <!-- contact -->
                            <b-form-group label="Contact" label-for="register-contact">
                                <validation-provider #default="{ errors }" name="contact" rules="required">
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
                                </validation-provider>
                            </b-form-group>

                            <!-- password -->
                            <b-form-group label-for="register-password" label="Mot de passe">
                                <validation-provider #default="{ errors }" name="Password" rules="required">
                                    <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                                        <b-form-input
                                            id="register-password"
                                            @input="validatePassword"
                                            v-model="password"
                                            class="form-control-merge"
                                            :type="passwordFieldType"
                                            :state="errors.length > 0 ? false:null"
                                            name="register-password"
                                            placeholder="············"
                                        />
                                        <b-input-group-append is-text>
                                            <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                                        </b-input-group-append>
                                    </b-input-group>
                                    <small :class="validePassword ? 'block' : 'none'" class="text-danger">
                                        Le mot de passe est de 8 caractrères minimum
                                    </small>
                                </validation-provider>
                            </b-form-group>

                            <b-form-group>
                                <b-form-checkbox id="register-privacy-policy" @change="validateStatus" v-model="status" name="checkbox-1">
                                    Accepter les
                                    <b-link :class="valideStatus ?'text-danger' : 'n'">Conditions générales d'utilisation.</b-link>
                                </b-form-checkbox>
                            </b-form-group>

                            <b-button disabled variant="primary" block type="submit" class="bg-indigo" v-if="marche">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </b-button>
                            <b-button variant="primary" block type="submit" class="bg-indigo" v-else @click.prevent="save">
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
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import VuexyLogo from "@core/layouts/components/Logo.vue";
    import { BRow, BCol, BLink, BButton, BModal, VBModal, BForm,BInputGroupPrepend, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText } from "bootstrap-vue";
    import { required, email } from "@validations";
    import store from "@/store/index";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
    import URL from "@/views/pages/request";
    import axios from "axios";
    import setAuthHeader from "../../../../auth/jwt/token";
    import vSelect from "vue-select";
    import { VueTelInput } from "vue-tel-input";
    import Ripple from "vue-ripple-directive";
    import VueGoogleAutocomplete from "vue-google-autocomplete";
    import CryptoJS from "crypto-js";
    import { togglePasswordVisibility } from '@core/mixins/ui/forms';
    export default {
        components: {
            BInputGroupPrepend,
            CryptoJS,
            VueGoogleAutocomplete,
            VueTelInput,
            vSelect,
            VuexyLogo,
            BRow,
            BImg,
            BCol,
            BLink,
            BModal,
            BButton,
            BForm,
            BCardText,
            BCardTitle,
            BFormCheckbox,
            BFormGroup,
            BFormInput,
            BInputGroup,
            BInputGroupAppend,
            // validations
            ValidationProvider,
            VBModal,
            ValidationObserver,
            setAuthHeader,
        },
        mixins: [togglePasswordVisibility],
        directives: {
            "b-modal": VBModal,
            Ripple,
        },
        data() {
            return {
                logData:'',
                validePresentPassword: false,
                presentPassword:'',
                phone: "",
                status: "",
                nom: "",
                prenom: "",
                contactFinal: "",
                indicatifFinal: "",
                email: "",
                password: "",
                contact: "",
                valideNom: false,
                validePrenom: false,
                valideContact: false,
                valideEmail: false,
                valideContactNumber: false,
                validePassword: false,
                valideStatus: false,
                sideImg: require("@/assets/images/pages/register-v2.svg"),
                erreur: false,
                required,
                email,
                marche: false,
                address: "",
                ad: "",
                placechanged: "",
                localisation: "",
                permissions: [],
            };
        },
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
        mounted() {
            if (localStorage.getItem("token")) {
                this.$router.push({ name: "home" });
            }
            document.title = "Nouveau compte";
            google.maps.event.addDomListener(window, "load", initialize);
        },
        methods: {
            log(code){
                try {
                    this.marche = true;
                    const data = {
                        email: this.email,
                        password: this.presentPassword,
                        code: code,
                    };
                    const config = {
                        headers: {
                            Accept: "application/json",
                        },
                    };
                    axios.post(URL.LOGIN, data, config).then((response) => {
                        this.userData = response.data;
                        setAuthHeader(response.data.token);
                    });
                    localStorage.clear();
                    localStorage.setItem("token", this.userData.token);
                    if (localStorage.getItem("token")) {
                        for (let index = 0; index < this.userData.user_connected_details[1].length; index++) {
                            this.permissions.push(this.userData.user_connected_details[1][index].name);
                        }
                        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.permissions), "qenium 123").toString();
                        localStorage.setItem("permission", ciphertext);

                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userData.sidebar), "qenium 123").toString();
                        localStorage.setItem("sidebar", ciphertext);
                        localStorage.setItem("modia", true);
                    }
                    if (this.userData !== "") {
                        this.$router.push({ name: "home" });
                    }
                } catch (error) {
                    console.log(error);
                }

            },
            connexion(bvModalEvt){
                this.validatePresentPassword()
                if(this.validePresentPassword){
                    bvModalEvt.preventDefault();
                    this.handleSubmit();
                }else{
                    const data={
                        'email': this.email,
                        'password': this.presentPassword
                    }
                    try{
                        axios.post(URL.CHECKPASS, data).then((response)=>{
                            this.logData = response.data
                            console.log(this.logData)
                            if(this.logData.error){
                                document.querySelector("#declenche").click();
                            }else{
                                document.querySelector("#entrepriselist").click();
                            }
                        })
                    }catch(error){
                        console.log(error)
                    }
                }
            },
            validatePresentPassword(){
                if(!this.presentPassword){
                    this.validePresentPassword = true;
                }else{
                    this.validePresentPassword = false
                }
            },
            initialize() {
                var input = document.getElementById("autocomplete_search");
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.addListener("place_changed", function () {
                    var place = autocomplete.getPlace();
                    // place variable will have all the information you are looking for.
                    $("#lat").val(place.geometry["location"].lat());
                    $("#long").val(place.geometry["location"].lng());
                    this.localisation = place;
                    localStorage.setItem("locali", JSON.stringify(place));
                    // console.log(this.address)
                });
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            async save() {
                this.validateStatus();
                this.address = JSON.parse(localStorage.getItem("place"));
                console.log(this.address, "jkjk");
                // console.log(this.address)
                try {
                    this.contactFinal = this.contact.country.nationalNumber;
                    this.validateEmail();
                    this.validateContact();
                    this.validateNom();
                    this.validatePrenom();
                    this.validatePassword();
                    const config = {
                        headers: {
                            Accept: "application/json",
                        },
                    };
                    if (this.erreur === false && this.status === true) {
                        this.indicatifFinal = "+" + "" + this.contact.country.dialCode;
                        const data = {
                            nom: this.nom,
                            prenoms: this.prenom,
                            contact: this.contactFinal,
                            email: this.email,
                            password: this.password,
                            indicateur: this.indicatifFinal,
                            localisation: JSON.parse(localStorage.getItem("locali")),
                        };
                        localStorage.removeItem("locali");
                        console.log(data);
                        this.marche = true;
                        this.$refs.registerForm.validate().then((success) => {
                            if (success) {
                                this.$toast({
                                    component: ToastificationContent,
                                    props: {
                                        title: "Reception de vos informations",
                                        icon: "EditIcon",
                                        variant: "success",
                                    },
                                });
                            }
                        });
                        try {
                            await axios.post(URL.REGISTER, data, config).then((response) => {
                                this.userData = response.data;
                                if (this.userData.present) {
                                    console.log(this.userData.present)
                                    document.querySelector("#declenche").click();
                                    this.marche = false
                                } else {
                                    setAuthHeader(response.data.token);
                                    localStorage.setItem("token", this.userData.token);
                                    if (localStorage.getItem("token")) {
                                        localStorage.setItem("modia", true);
                                    }
                                    for (let index = 0; index < this.userData.allpermissions.length; index++) {
                                        this.permissions.push(this.userData.allpermissions[index].name);
                                    }
                                    console.log(this.permissions);
                                    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.permissions), "qenium 123").toString();
                                    localStorage.setItem("permission", ciphertext);
                                    ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userData.sidebar), "qenium 123").toString();
                                    localStorage.setItem("sidebar", ciphertext);
                                    localStorage.setItem("refresh", "1");
                                    if (!this.erreur_duplicate_contact) {
                                        this.$router.push("/entreprise");
                                    }
                                }
                            });
                        } catch (error) {
                            this.marche = false;
                            console.log(error);
                        }
                    } else {
                        this.error_global = true;
                        this.marche = false;
                    }
                } catch (error) {
                    console.log(error);
                }
                localStorage.removeItem("place");
            },
            validateEmail() {
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
            validateContact() {
                this.contactFinal = this.contact.formatted;
                if (!this.contactFinal) {
                    this.valideContact = true;
                    this.erreur = true;
                } else {
                    this.valideContact = false;
                    this.erreur = false;
                }

                if (this.contactFinal && this.contactFinal.length < 8) {
                    this.valideContactNumber = true;
                    this.erreur = true;
                } else {
                    this.valideContactNumber = false;
                    this.erreur = false;
                }
            },
            validatePassword() {
                if (!this.password || this.password.length < 8) {
                    this.validePassword = true;
                    this.erreur = true;
                } else {
                    this.validePassword = false;
                    this.erreur = false;
                }
            },
            validateNom() {
                if (!this.nom) {
                    this.valideNom = true;
                    this.erreur = true;
                } else {
                    this.valideNom = false;
                    this.erreur = false;
                }
            },
            validatePrenom() {
                if (!this.prenom) {
                    this.validePrenom = true;
                    this.erreur = true;
                } else {
                    this.validePrenom = false;
                    this.erreur = false;
                }
            },
            validateStatus() {
                if (this.status == false || !this.status) {
                    this.valideStatus = true;
                    this.erreur = true;
                    console.log("selectione");
                } else {
                    this.valideStatus = false;
                    this.erreur = false;
                }
            },
            contactEntier(e) {
                this.contact = e;
                //    console.log(this.phone)
            },
            changer(e) {
                console.log(this.phone);
                this.contact.country.name = e.name;
            },
        },
    };
    /* eslint-disable global-require */
</script>

<style lang="scss">
    @import "@core/scss/vue/pages/page-auth.scss";
    @import "@core/scss/vue/libs/vue-select.scss";
    .none {
        display: none;
    }
    .block {
        display: inline-block;
    }
    [dir] .vs__search,
    [dir] .vs__search:focus {
        border: 1px solid transparent;
        border-left-color: transparent;
        border-left-style: solid;
        border-left-width: 1px;
        margin: 4px 0 0 0;
        margin-top: 4px;
        padding: 0 0px;
        background: none;
        box-shadow: none;
    }
</style>
