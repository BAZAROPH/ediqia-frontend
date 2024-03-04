<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle taxe -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter un nouveau employé" @ok="handleOk">
            <validation-observer ref="registerForm">
                <b-form class="auth-register-form mt-2">
                    <div>
                        <h5 class="text-danger text-center">{{user_exist}}</h5>
                    </div>

                     <!-- Role -->
                    <b-libelle class="red">Role</b-libelle>
                    <b-form-group label-for="entreprise-domaine">
                        <validation-provider #default="{  }" name="nom" rules="required">
                            <v-select v-model="selectedRole" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name" :options="roles" placeholder="Selectionner un role" />

                            <small :class="valideRole ? 'block' : 'none'" class="text-danger">
                                Veuillez selectionner le role de l'employe
                            </small>
                        </validation-provider>
                    </b-form-group>
                    <!-- nom -->

                    <b-libelle class="red">Nom</b-libelle>
                    <b-form-group  label-for="register-nom">
                        <validation-provider #default="{ errors }" name="nom" rules="required">
                            <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                            <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le nom de l'employé
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- prenom -->
                    <b-libelle class="red">Prénoms</b-libelle>
                    <b-form-group label-for="register-prenom">
                        <validation-provider #default="{ errors }" name="prenom" rules="required">
                            <b-form-input id="register-prenom" @input="validatePrenom" v-model="prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                            <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le prénom de l'employé
                            </small>
                        </validation-provider>
                    </b-form-group>

                    <!-- email -->
                    <b-libelle class="red">Email</b-libelle>
                    <b-form-group  label-for="register-email">
                        <validation-provider #default="{ errors }" name="Email" rules="required|email">
                            <b-form-input id="register-email" @input="validateEmail" v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                            <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer l'email de l'employé
                            </small>
                        </validation-provider>
                    </b-form-group>

                     <!-- password -->
                    <b-libelle class="red">Mot de passe</b-libelle>
                    <b-form-group label-for="register-password">
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


                    <!-- contact -->
                    <b-libelle class="red">Contact</b-libelle>
                    <b-form-group label-for="register-contact">
                        <validation-provider #default="{ errors }" name="contact" rules="required">
                            <vue-tel-input id="register-contact" @country-changed="changer" @validate="contactEntier($event)" v-model="phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                            <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                                Veuillez renseigner le contact de l'employé
                            </small>
                            <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                                Ce numéro de téléphone n'est pas valide
                            </small>
                        </validation-provider>
                    </b-form-group>
                </b-form>
            </validation-observer>
        </b-modal>


        <!-- Modal pour mettre à jour une taxe déjà ajouté    -->


        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier mon employe" @ok="updateUsers">
            <b-form class="auth-register-form mt-2">

                <!-- Role -->
                <b-libelle class="red">Role</b-libelle>
                <b-form-group  label-for="entreprise-domaine">
                    <validation-provider #default="{  }" name="nom" rules="required">
                        <v-select v-model="selectedEditRole" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name" :options="roles" placeholder="Selectionner un role" multiple/>

                        <small :class="valideEditRole ? 'block' : 'none'" class="text-danger">
                            Veuillez entrer le role de l'employe
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- nom -->
                <b-libelle class="red">Nom</b-libelle>
                <b-form-group label-for="register-nom">
                    <validation-provider #default="{ errors }" name="nom" rules="required">
                        <b-form-input id="register-nom" @input="validateEditNom" v-model="edit_nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                        <small :class="valideEditNom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le nom de l'employé
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- prenom -->
                <b-libelle class="red">Prénoms</b-libelle>
                <b-form-group  label-for="register-prenom">
                    <validation-provider #default="{ errors }" name="prenom" rules="required">
                        <b-form-input id="register-prenom" @input="validateEditPrenom" v-model="edit_prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                        <small :class="valideEditPrenom ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le prénom du client
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- email -->
                <b-libelle class="red">Email</b-libelle>
                <b-form-group  label-for="register-email">
                    <validation-provider #default="{ errors }" name="Email" rules="required">
                        <b-form-input id="register-email" @input="validateEditEmail" v-model="edit_email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                        <small :class="valideEditEmail ? 'block' : 'none'" class="text-danger">
                            Veuillez entrer l'email du employé
                        </small>
                    </validation-provider>
                </b-form-group>


                <!-- password -->
                <b-libelle class="red">Mot de passe</b-libelle>
                <b-form-group label-for="register-password">
                    <validation-provider #default="{ errors }" name="password" rules="required">
                        <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                            <b-form-input
                                id="register-password"
                                @input="validateEditPassword"
                                v-model="passwordEdit"
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
                        <small :class="valideEditPassword ? 'block' : 'none'" class="text-danger">
                            Le mot de passe est de 8 caractrères minimum
                        </small>
                    </validation-provider>
                </b-form-group>



                <!-- contact -->
                <b-libelle class="red">Contact</b-libelle>
                <b-form-group label-for="register-contact">
                    <validation-provider #default="{ errors }" name="contact" rules="required">
                        <vue-tel-input id="register-contact" @country-changed="edit_changer" @validate="edit_contactEntier($event)" v-model="edit_phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                        <small :class="edit_valideContact ? 'block' : 'none'" class="text-danger">
                            Veuillez renseigner votre contact
                        </small>
                        <small :class="edit_valideContactNumber ? 'block' : 'none'" class="text-danger">
                            Ce numéro de téléphone n'est pas valide
                        </small>
                    </validation-provider>
                </b-form-group>
            </b-form>
        </b-modal>

        <!--  -->
        <!-- Tableau pour afficher les employes -->
        <!-- <div class="tableau">
            <table class="table position-relative table-card table-bordered mt-5 pt-3">
                <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">
                    Ajouter
                </b-button>
                <thead>
                    <tr class="text-center">
                        <th class="align-middle" scope="col">#</th>
                        <th class="align-middle" scope="col">Nom</th>
                        <th class="align-middle" scope="col">Prenoms</th>
                        <th class="align-middle" scope="col">Email</th>
                        <th class="align-middle" scope="col">contact</th>
                        <th class="align-middle" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="text-center" id="table_line" v-for="(user, index) in users" :key="user.id">
                        <th class="align-middle col-1" scope="row">{{ index + 1 }}</th>
                        <td class="col">
                            <p class="a" @click="detailEmploye(index)">{{ user.nom }}</p>
                        </td>
                        <td class="col">
                            <p>{{ user.prenoms }}</p>
                        </td>
                        <td class="col">
                            <p>{{ user.email }}</p>
                        </td>
                        <td class="col">
                            <p>{{ user.indicateur}} {{ user.contact }}</p>
                        </td>
                        <td class="col-3">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button variant="gradient-primary" class="btn-icon mr-2 edit-color" v-b-modal.modal-update @click="update(index)">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                                 <b-button variant="gradient-info" class="btn-icon mr-1 edit-color" @click="detailEmploye(index)">
                                    <feather-icon icon="EyeIcon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(user.id,index)">
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->

        <!--  -->
          <b-card
            no-body
            class="px-2"
        >
            <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouveau employé -->
            <b-row>
                <!-- Per Page -->
                <b-col
                cols="12"
                md="6"
                class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1"
                >
                    <label>Entrées</label>
                    <v-select
                        v-model="perPage"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="perPageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block ml-50 mr-1"
                    />
                    <b-button
                        variant="gradient-primary"
                        v-b-modal.modal-login
                    >
                        Créer un nouveau employé
                    </b-button>
                    </b-col>

                    <!-- Search -->
                    <b-col
                    cols="12"
                    md="6"
                    class="mt-1"
                    >
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input
                            v-model="filtreUser"
                            class="d-inline-block mr-1"
                            placeholder="Rechercher par le nom de la taxe, valeur..."
                            />
                        </div>
                    </b-col>
            </b-row>


            <!-- Le tableau affichant les taxes -->
            <b-table
                hover
                responsive
                primary-key="id"
                :per-page="perPage"
                :current-page="currentPage"
                :items="users"
                :fields="tableColumns"
                :filter="filtreUser"
                show-empty
                empty-text="Aucun employé"
                class="bg-white mt-2"
            >
                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-1 edit-color" v-b-modal.modal-update @click="update(data.item)">
                        <feather-icon icon="Edit3Icon" />
                    </b-button>
                    <b-button variant="gradient-info" class="btn-icon mr-1 edit-color"  @click="detailEmploye(data.item)">
                        <!-- @click="detailEmploye(index) -->
                        <feather-icon icon="EyeIcon" />
                    </b-button>
                    <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(data.item.id)">
                        <feather-icon icon="Trash2Icon" />
                    </b-button>
                </template>
            </b-table>


            <!-- Les boutons de pagination -->
            <div class="mx-2 mb-2 pb-1">
                <b-row>
                    <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-start"
                    >
                    <span class="text-muted"></span>
                    </b-col>
                    <!-- Pagination -->
                    <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-end"
                    >
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="userTotal"
                        :per-page="perPage"
                        first-number
                        last-number
                        class="mb-0 mt-1 mt-sm-0"
                        prev-class="prev-item"
                        next-class="next-item"
                    >
                        <template #prev-text>
                        <feather-icon
                            icon="ChevronLeftIcon"
                            size="18"
                        />
                        </template>
                        <template #next-text>
                        <feather-icon
                            icon="ChevronRightIcon"
                            size="18"
                        />
                        </template>
                    </b-pagination>

                    </b-col>

                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
    import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import { required, email } from "@validations";
    import { togglePasswordVisibility } from "@core/mixins/ui/forms";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import { VueTelInput } from 'vue-tel-input'
    export default {
        components: {
            VueTelInput,
            vSelect,
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
            BInputGroupAppend,
            // validations
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
        },
        mixins: [togglePasswordVisibility],
        data() {
            return {
                // validation
                nom: "",
                prenom: "",
                email: "",
                contact: "",
                phone:'',
                password:"",
                passwordEdit:"",
                edit_phone:'',
                contactFinal:'',
                indicatifFinal:'',
                edit_contactFinal:"",
                edit_indicatifFinal:"",
                valideNom: false,
                validePrenom: false,
                valideContact: false,
                valideEmail: false,
                valideContactNumber: false,
                validePassword: false,
                valideEditPassword: false,
                valideContactNumber: false,

                valideEditNom: false,
                valideEditPrenom: false,
                edit_valideContact: false,
                valideEditEmail: false,
                valideEditPassword: false,
                edit_valideContactNumber: false,
                email,
                userUp: "",
                returnData: "",
                required,
                user_exist: "",
                users: [],
                roles:[],
                valideExiste: "",
                edit_nom: "",
                edit_prenom: "",
                edit_email: "",
                edit_contact: "",
                edit_index: "",

                user_id: "",
                updateIndex: "",

                valideRole:"",
                selectedRole: "",
                
                valideEditRole:"",
                selectedEditRole: "",

                perPage: 3,
                currentPage: 1,
                userTotal: 0,
                tableColumns: [
                    { key: 'nom', label: 'Nom', sortable: true },
                    { key: 'prenoms', label: 'Prénoms', sortable: true },
                    { key: 'email', label: 'Email', sortable: true, },
                    { key: 'contact', label: 'Contact', sortable: true, },
                    { key: 'adress', label: 'Adresse', sortable: true, },
                    { key: 'actions' },
                    
                ],
                filtreUser: '',
                perPageOptions: [3, 5, 10, 15]
            }; 
        },

        async mounted() {
            document.title = 'Nouvel utilisateur'  
            try {
                
                
                await axios
                    .get(URL.EMPLOYE_LIST)
                    .then((response) => {

                        this.userTotal = response.data.listeEmploye.length
                        this.users = response.data.listeEmploye;
                        this.roles = response.data.listeRole;


                        // if()
                    })
                        console.log(this.userTotal)

                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
                // for (let index = 0; index < this.returnData.data[0].length; index++) {
                //     this.users.push(this.returnData.data[0][index]);
                // }
            } catch (error) {
                console.log(error);
            }
        },


        computed: {
            passwordToggleIcon() {
                return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
            },
            // imgUrl() {
            //     if (store.state.appConfig.layout.skin === "dark") {
            //         // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            //         this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
            //         return this.sideImg;
            //     }
            //     return this.sideImg;
            // },
        },



        methods: {

            //  detailClient(item) {
            //     const employe = item
            //     localStorage.setItem('employe', JSON.stringify(employe))
            //     this.$router.push('detail/employe')
            // },
           
            validatePassword() {
                if (!this.password || this.password.length < 8) {
                    this.validePassword = true;
                    this.erreur = true;
                } else {
                    this.validePassword = false;
                    this.erreur = false;
                }
            },

            validateEditPassword() {
                if (!this.passwordEdit || this.passwordEdit.length < 8) {
                    this.valideEditPassword = true;
                    this.erreur = true;
                } else {
                    this.valideEditPassword = false;
                    this.erreur = false;
                }
            },



            detailEmploye(item) {
                const user = item
                localStorage.setItem('user', JSON.stringify(user))
                this.$router.push('/detail/employe')
            },

            // confirm texrt
            confirmText(id, index) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Ce employé sera supprimé définitivement !",
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
                    title: "employé enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
            deleteUser(identifiant, index) {
                try {
                    const id = {
                        id: identifiant,
                    };
                    const config = {
                        headers: {
                            'Accept': 'application/json'
                        },
                    }
                    axios
                        .post(URL.EMPLOYE_DETROY, id,config)
                        .then((response) => {
                            response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.users.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(item) {
                this.userUp = item;
                this.edit_nom = this.userUp.nom;
                this.edit_prenom = this.userUp.prenoms;
                this.edit_email = this.userUp.email;
                this.edit_index = this.users.findIndex((el) => el.id === item.id);;
                this.user_id = this.userUp.id;
                this.passwordEdit = this.userUp.password

                console.log(indice)
            },
            async updateUsers(bvModalEvt) {
                this.edit_contactFinal=this.edit_contact.formatted
                const index = this.edit_index;
                this.edit_validateContact();
                this.validateEditPrenom();
                this.validateEditNom();
                this.validateEditRole();
                this.validateEditPassword();

                
                if ( this.valideEditNom || this.valideEditPrenom  || this.edit_valideContactNumber || this.edit_valideContact || this.valideEditRole || this.valideEditPassword) {
                    bvModalEvt.preventDefault();
                } else {
                    if (
                        this.users[index].nom != this.edit_nom ||
                        this.users[index].prenoms != this.edit_prenom ||
                        this.users[index].email != this.edit_email ||
                        this.users[index].role != this.selectedEditRole ||
                        this.users[index].contact != this.edit_contactFinal ||
                        this.users[index].password  != this.passwordEdit
                    ) {
                        this.$swal({
                            title: "Êtes vous sûr de vouloir enregistrer",
                            text: "Les modificiations seront prises en compte",
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
                                try {
                                    const data = {
                                        role: this.selectedEditRole[0].name,
                                        user_id: this.user_id,
                                        nom: this.edit_nom,
                                        prenoms: this.edit_prenom,
                                        email: this.edit_email,
                                        contact: this.edit_contactFinal,
                                        indicateur:this.edit_indicatifFinal,
                                        password:this.passwordEdit,


                                        
                                    };
                                    console.log(this.selectedEditRole[0].name, 'foutou')
                                    // console.log(role)
                                    const config = {
                                        headers: {
                                            'Accept': 'application/json'
                                        },
                                    }
                                    axios
                                        .post(URL.USER_UPDATE, data,config)
                                        .then((response) => {
                                            response.data;
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    this.users[index].nom = this.edit_nom;
                                    this.users[index].prenoms = this.edit_prenom;
                                    this.users[index].email = this.edit_email;
                                    this.users[index].contact =this.edit_contactFinal;
                                    this.users[index].indicateur=this.edit_indicatifFinal
                                    this.users[index].password = this.passwordEdit;
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                        // this.selectedRole = "";
                    }
                }
            },

            isDigit(str) {
                return /^\d+$/.test(str);
            },
             
            validateEditRole() {
                if (this.selectedEditRole== "") {
                    this.valideEditRole = true;
                    this.erreur = true;
                    } else {
                    this.valideEditRole = false;
                    this.erreur = false;
                }
                
            },

            validateRole() {
                if (this.selectedRole== "") {
                this.valideRole = true;
                this.erreur = true;
                } else {
                this.valideRole = false;
                this.erreur = false;
                }
                
            },

            validateEmail() {
                // valid email regex pattern
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!this.email.match(emailPattern) && this.email !== "") {
                    this.valideEmail = true;
                    this.erreur = true;
                } else {
                    this.valideEmail = false;
                    this.erreur = false;
                }
            },
            validateEditEmail() {
                // valid email regex pattern
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!this.edit_email.match(emailPattern) && this.edit_email !== "") {
                    this.valideEditEmail = true;
                } else {
                    this.valideEditEmail = false;
                }
            },
            validateContact() {
                this.contactFinal=this.contact.formatted
                if (!this.contactFinal) {
                    this.valideContact = true;
                    this.erreur = true;
                } else {
                    this.valideContact = false;
                    this.erreur = false;
                }

                if (this.contactFinal && this.contactFinal.length<8) {
                    this.valideContactNumber = true;
                    this.erreur = true;
                } else {
                    this.valideContactNumber = false;
                    this.erreur = false;
                }
            },
            validateEditContact() {
                if (!this.edit_contact) {
                    this.valideEditContact = true;
                    this.erreur = true;
                } else {
                    this.valideEditContact = false;
                    this.erreur = false;
                }
                if (this.edit_contact && this.isDigit(this.edit_contact) === false) {
                    this.valideEditContactNumber = true;
                } else {
                    this.valideEditContactNumber = false;
                }
            },
            edit_validateContact() {
                if (!this.edit_contactFinal) {
                    this.edit_valideContact = true;
                    this.erreur = true;
                } else {
                    this.edit_indicatifFinal=this.edit_indicatifFinal="+"+""+this.edit_contact.country.dialCode
                    this.edit_valideContact = false;
                    this.erreur = false;
                }
                if (this.edit_contactFinal && this.edit_contactFinal.length<8) {
                    this.edit_valideContactNumber = true;
                } else {
                    this.edit_valideContactNumber = false;
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
            validateEditNom() {
                if (!this.edit_nom) {
                    this.valideEditNom = true;
                } else {
                    this.valideEditNom = false;
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
            validateEditPrenom() {
                if (!this.edit_prenom) {
                    this.valideEditPrenom = true;
                } else {
                    this.valideEditPrenom = false;
                }
            },
            
            
          
            async handleOk(bvModalEvt) {
                try {
                    this.validateNom();
                    this.validatePrenom();
                    this.validateContact();
                    this.validateRole();
                    this.validatePassword();
                    this.if_exist();
                    // Prevent modal from closing
                    if ( this.valideNom || this.validePrenom || this.valideContact || this.valideContactNumber || this.valideExiste || this.validePassword || this.valideRole) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        this.indicatifFinal="+"+""+this.contact.country.dialCode
                        console.log(this.indicatifFinal)

                        const newUser = {
                            role: this.selectedRole[0].name,
                            nom: this.nom,
                            prenoms: this.prenom,
                            contact: this.contactFinal,
                            indicateur:this.indicatifFinal,
                            email: this.email,
                            password: this.password,

                        };

                        console.log(newUser,'bien')
                        this.topEnd();
                        await axios.post(URL.USER_CREATE, newUser).then((response) => {
                            this.userData = response.data;
                            this.users.push(newUser);
                        });
                        this.nom = "";
                        this.prenom = "";
                        this.email = "";
                        this.contact = "";
                        this.indicateur ="";
                        this.password = "";
                    }
                } catch (error) {
                    console.log(error.type);
                }
            },
            if_exist() {
                for (let index = 0; index < this.users.length; index++) {
                    if (this.contactFinal == this.users[index].contact) {
                        this.user_exist = "Ce employé existe déjà! Veuillez vérifier le contact";
                        this.valideExiste = true;
                    } else {
                        this.valideExiste = false;
                    }
                }
            },
            contactEntier(e){
               this.contact=e
            //    console.log(this.phone)
            },
            changer(e){
                console.log(this.phone)
               this.contact.country.name=e.name 
            },

            edit_contactEntier(e){
               this.edit_contact=e
            //    console.log(this.phone)
            },
            edit_changer(e){
                console.log(this.phone)
                this.edit_contact.country.name=e.name 
            },
        },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    .table-base {
        margin: 30px auto 0;
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
    .a::hover {
    //   background-color: #450077;
    text-decoration: underline;
    color:  #450077;
    }

    .red:after{
    content: " *";
    color: red;
    }
</style>
