<template>
    <section>
        <!-- Alert: No item found -->
        <b-row class="text-right">
            <b-col>
                <b-button @click="rediriger" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mb-75 float-right">
                    Liste des modules
                </b-button>
            </b-col>
        </b-row>

        <div class="position-relative table-responsive table-base">
            <!-- <b-card> -->
            <validation-observer ref="registerForm">
                <b-form class="auth-register-form mt-2">
                    <b-container>
                        <b-row>
                            <b-col lg="6">
                                <b-form-group label="Libellé du module" label-for="register-name">
                                    <validation-provider #default="{ errors }" name="name" rules="required">
                                        <b-form-input id="register-nom" @input="validateLibelle" v-model="libelle" name="register-name" :state="errors.length > 0 ? false:null" placeholder="Libellé" />
                                        <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                                            Vous devez entrer le libelle du module
                                        </small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col lg="6">
                                <b-form-group label="Prix" label-for="register-name">
                                    <validation-provider #default="{ errors }" name="name" rules="required">
                                        <b-form-input id="register-nom" @input="validatePrix" v-model="prix" name="register-name" :state="errors.length > 0 ? false:null" placeholder="Prix" />
                                        <small :class="validePrix ? 'block' : 'none'" class="text-danger">
                                            Vous devez renseigner le prix du module
                                        </small>
                                        <small :class="validePrixNumber ? 'block' : 'none'" class="text-danger">
                                            Le prix doit être un nombre
                                        </small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col lg="12">
                                <b-form-group label-for="register-name">
                                    <validation-provider name="name" rules="required">
                                        <b-form-group>
                                            <label for="taxeValue">Description :</label>
                                            <b-form-textarea id="textarea" v-model="description" placeholder="Entrer les détails du module" rows="5" max-rows="6"> </b-form-textarea>
                                        </b-form-group>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row>
                                    <b-col lg="6" v-for="elt in elements" :key="elt.nom">
                                        <b-card>
                                            <b-card-title class="d-flex" @change="all">{{ elt.nom}}<b-form-checkbox class="ml-2" v-model="selectedAll" :value="elt.nom"> </b-form-checkbox></b-card-title>

                                            <div class="demo-inline">
                                                <b-row>
                                                    <b-col lg="6" v-for="permission in elt.permissions" :key="permission.id">
                                                        <b-form-checkbox v-model="selected" :value="permission.name">
                                                            {{permission.name}}
                                                        </b-form-checkbox>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </b-card>
                                    </b-col>
                                </b-row>

                                <!-- Form Actions -->
                                <div class="text-center t-2">
                                    <b-button v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="save">
                                        Ajouter
                                    </b-button>
                                    <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary">
                                        Annuler
                                    </b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-form>
            </validation-observer>

            <!-- </b-card> -->
        </div>
    </section>
</template>

<script>
    import Logo from "@core/layouts/components/Logo.vue";
    import { heightTransition } from "@core/mixins/ui/transition";
    import Ripple from "vue-ripple-directive";
    import { required } from "@validations";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import { VueTelInput } from "vue-tel-input";
    import { BRow, BModal, BCol, BCard, BCardBody, BButton, BCardText, BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend, BFormTextarea, BFormCheckbox, BPopover, BAlert, BLink, VBToggle } from "bootstrap-vue";
    import flatPickr from "vue-flatpickr-component";

    export default {
        components: {
            required,
            axios,
            ValidationProvider,
            ValidationObserver,
            VueTelInput,
            BModal,
            BRow,
            BCol,
            BCard,
            BCardBody,
            BButton,
            BCardText,
            BForm,
            BFormGroup,
            BFormInput,
            BInputGroup,
            BInputGroupPrepend,
            BFormTextarea,
            BFormCheckbox,
            BPopover,
            BAlert,
            BLink,
            flatPickr,
            vSelect,
            Logo,
        },
        directives: {
            Ripple,
            "b-toggle": VBToggle,
        },
        mixins: [heightTransition],
        data() {
            return {
                description: "",
                prix: "",
                validePrixNumber: false,
                validePrix: false,
                libelle: "",
                valideLibelle: false,

                // validation
                selectedAll: [],
                selected: [],
                name: "",
                valideName: "",
                valideEditName: false,
                userUp: "",
                returnData: "",
                required,
                user_exist: "",
                roles: [],
                role: [],
                valideExiste: "",
                edit_nom: "",
                edit_index: "",

                user_id: "",
                updateIndex: "",

                elements: "",
            };
        },
        async mounted() {
            document.title = 'Modules'
            try {
                await axios
                    .get(URL.PERMISSION_LIST)
                    .then((response) => {
                        this.returnData = response;
                        this.elements = this.returnData.data[0].element;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            rediriger(){
                this.$router.push('/modules')
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            validatePrix() {
                if (!this.prix) {
                    this.validePrix = true;
                } else {
                    this.validePrix = false;
                }
                if (this.prix && this.isDigit(this.prix) === false) {
                    this.validePrixNumber = true;
                } else {
                    this.validePrixNumber = false;
                }
            },
            validateLibelle() {
                if (!this.libelle) {
                    this.valideLibelle = true;
                } else {
                    this.valideLibelle = false;
                }
            },
            all() {
                for (let index = 0; index < this.elements.length; index++) {
                    for (let index1 = 0; index1 < this.elements[index].permissions.length; index1++) {
                        const perm = this.elements[index].permissions[index1].name;
                        for (let index2 = 0; index2 < this.selectedAll.length; index2++) {
                            if (perm.lastIndexOf(this.selectedAll[index2]) >= 0 && this.isInArray(perm, this.selected) === false) {
                                this.selected.push(perm);
                            }
                        }
                    }
                }

                let inter = [];

                for (let index = 0; index < this.selected.length; index++) {
                    let ver = false;
                    for (let index1 = 0; index1 < this.selectedAll.length; index1++) {
                        if (this.selected[index].lastIndexOf(this.selectedAll[index1]) >= 0) {
                            ver = true;
                            index1 = this.selectedAll.length;
                        }
                    }
                    if (ver === true) {
                        inter.push(this.selected[index]);
                    }
                }
                this.selected = inter;
            },

            isInArray(value, array) {
                return array.indexOf(value) > -1;
            },

            // confirm texrt
            confirmText(id, index) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Ce rôle sera supprimé définitivement !",
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
                        this.deleteUser(id, index);
                    }
                });
            },
            // top end
            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Module enregistré avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },

            validateName() {
              console.log()
                if (!this.name) {
                    this.valideName = true;
                    this.erreur = true;
                } else {
                    this.valideName = false;
                    this.erreur = false;
                }
            },
            validateEditName() {
                if (!this.name) {
                    this.valideEditName = true;
                } else {
                    this.valideEditName = false;
                }
            },

            async save(e) {
                e.preventDefault();
                try {
                    this.validatePrix();
                    this.validateLibelle();
                    // this.if_exist();

                    if (this.validePrix || this.validePrixNumber || this.valideLibelle) {
                        this.handleSubmit();
                    } else {
                        const data = {
                            libelle: this.libelle,
                            prix: this.selected,
                            description: this.description,
                            montant: this.prix,
                            permissions: this.selected,
                            // description:this.description
                        };
                        this.topEnd();
                        await axios.post(URL.MODULES_CREATE, data, this.config).then((response) => {});
                        // this.permissions.push(newPermission);
                        this.libelle = "";
                        this.prix = "";
                        this.description = "";
                        this.selected = [];
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            // if_exist() {
            //     for (let index = 0; index < this.users.length; index++) {
            //         if (this.contactFinal == this.users[index].contact) {
            //             this.user_exist = "Ce employé existe déjà! Veuillez vérifier le contact";
            //             this.valideExiste = true;
            //         } else {
            //             this.valideExiste = false;
            //         }
            //     }
            // },
        },
    };
</script>

<style scoped lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>

<style scoped lang="scss" >
    @import "~@core/scss/base/pages/app-invoice.scss";

    .form-item-section {
        background-color: $product-details-bg;
    }

    .form-item-action-col {
        width: 27px;
    }

    .repeater-form {
        // overflow: hidden;
        transition: 0.35s height;
    }

    .v-select {
        &.item-selector-title,
        &.payment-selector {
            background-color: #fff;

            .dark-layout & {
                background-color: unset;
            }
        }
    }

    .dark-layout {
        .form-item-section {
            background-color: $theme-dark-body-bg;

            .row .border {
                background-color: $theme-dark-card-bg;
            }
        }
    }
    .none {
        display: none;
    }
    .block {
        display: inline-block;
    }
</style>
