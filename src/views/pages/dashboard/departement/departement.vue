<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter un nouveau département -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Nouveau département" @ok="handleOk">
            <b-form>
                <div>
                    <h5 class="text-danger text-center">{{exist_text}}</h5>
                </div>
                <!-- Libelle -->
                <b-form-group label="Nom du département" label-for="register-libelle">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                        <b-form-input id="register-libelle" @input="validateLibelle" v-model="libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="Informatique" />
                        <small :class="validelibelle ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du département
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- Nombre d'employés -->
                <b-form-group label="Nombre d'employés" label-for="register-libelle">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                        <b-form-input id="register-nombreEmploye" @input="validateNombreEmploye" v-model="nombreEmploye" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="" />
                        <small :class="valideNombreEmploye ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le nombre d'employé(s) dans le département
                        </small>
                        <small :class="valideNombreEmployeNumber ? 'block' : 'none'" class="text-danger">
                           Cette valeur est invalide
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- Email -->
                <b-form-group label="email" label-for="register-email">
                    <validation-provider #default="{ errors }" name="email">
                        <b-form-input id="register-email" @input="validateEmail" v-model="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="exemple@qenium.com" />
                        <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                            Cet email est invalide
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- contact -->
                <b-form-group label="Contact" label-for="register-contact">
                  <validation-provider #default="{ errors }" name="contact" rules="required">
                      <vue-tel-input id="register-contact" @country-changed="changer" @validate="contactEntier($event)" v-model="phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                      <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                          Veuillez renseigner votre contact
                      </small>
                      <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                          Ce numéro de téléphone n'est pas valide
                      </small>
                  </validation-provider>
              </b-form-group>

                <!-- description -->
                <b-form-group>
                    <label for="textarea">Description</label>
                    <b-form-textarea id="textarea" v-model="description" placeholder="Entrer une description" rows="5" max-rows="6"> </b-form-textarea>
                </b-form-group>
            </b-form>
        </b-modal>

        <!-- Modal pour mettre à jour une département déjà ajouté -->
        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Enregistrer" cancel-title="Annuler" centered title="Modifier le département" @ok="updateDepartement">
            <b-form>
                <!-- libelle -->
                <b-form-group label="Nom du département" label-for="register-libelle">
                    <validation-provider #default="{ errors }" name="edit_libelle" rules="required">
                        <b-form-input id="register-libelle" @input="validateEditLibelle" v-model="edit_libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="Informatique" />
                        <small :class="valideEditlibelle ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du département
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- Nombre d'employés -->
                <b-form-group label="Nombre d'employés" label-for="register-libelle">
                    <validation-provider #default="{ errors }" name="libelle" rules="required">
                        <b-form-input id="register-nombreEmploye" @input="validateEditNombreEmploye" v-model="edit_nombreEmploye" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="" />
                        <small :class="valideEditNombreEmploye ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le nombre d'employé(s) dans le département
                        </small>
                        <small :class="valideEditNombreEmployeNumber ? 'block' : 'none'" class="text-danger">
                           Cette valeur est invalide
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- Email -->
                <b-form-group label="email" label-for="register-email">
                    <validation-provider #default="{ errors }" name="email">
                        <b-form-input id="register-libelle" @input="validateEditEmail" v-model="edit_email" name="register-email" :state="errors.length > 0 ? false:null" />
                        <small :class="valideEditEmail ? 'block' : 'none'" class="text-danger">
                            Cet email est invalide
                        </small>
                    </validation-provider>
                </b-form-group>

                <!-- contact -->
                <b-form-group label="Contact" label-for="register-contact">
                    <validation-provider #default="{ errors }" name="contact" rules="required">
                        <vue-tel-input id="register-contact" @country-changed="edit_changer" @validate="edit_contactEntier($event)" v-model="edit_phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                        <small :class="valideEditContact ? 'block' : 'none'" class="text-danger">
                            Veuillez renseigner votre contact
                        </small>
                        <small :class="valideEditContactNumber ? 'block' : 'none'" class="text-danger">
                            Ce numéro de téléphone n'est pas valide
                        </small>
                    </validation-provider>
                </b-form-group>
                <!-- description -->
                <b-form-group>
                    <label for="textarea">Description</label>
                    <b-form-textarea id="textarea" v-model="edit_description" placeholder="Entrer une description" rows="5" max-rows="6"> </b-form-textarea>
                </b-form-group>
            </b-form>
        </b-modal>
        <!-- Tableau pour afficher les départements -->
        <div class="tableau">
            <table class="table position-relative table-card table-bordered mt-5 pt-3">
                <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">
                    Ajouter
                </b-button>
                <thead>
                    <tr class="text-center">
                        <th scope="col-1" class="align-middle">#</th>
                        <th scope="col-5" class="align-middle">Nom du département</th>
                        <th scope="col-3" class="align-middle">Nombre d'employé(s)</th>
                        <th scope="col-3" class="align-middle">Email</th>
                        <th scope="col-3" class="align-middle">Contact</th>
                        <th scope="col-3" class="align-middle">Description</th>
                        <th scope="col-3" class="align-middle">Action</th>

                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="text-center" id="table_line" v-for="(departement, index) in departements" :key="departement.id">
                        <td class="col">
                            <p>{{ index+1 }}</p>
                        </td>
                        <td class="col">
                            <p>{{ departement.libelle }}</p>
                        </td>
                        <td class="col">
                            <p>{{ departement.nombre_employe }}</p>
                        </td>
                        <td class="col">
                            <p>{{ departement.email }}</p>
                        </td>
                        <td class="col">
                            <p>{{ departement.contact }}</p>
                        </td>
                        <td class="col">
                            <p>{{ departement.description }}</p>
                        </td>

                        <td class="col-3">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button variant="gradient-primary" class="btn-icon mr-2" v-b-modal.modal-update @click="update(index)">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(departement.id,index)">
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import { required, email } from "@validations";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import { VueTelInput } from 'vue-tel-input'

    export default {
        components: {
            VueTelInput,
            BRow,
            BCol,
            BFormInput,
            BButton,
            BModal,
            BFormGroup,
            VBModal,
            BForm,
            BLink,
            BFormCheckbox,
            BInputGroup,
            BInputGroupAppend,
            BImg,
            required,
            email,
            ValidationProvider,
            ValidationObserver,
            vSelect,
            axios,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
              libelle:"",
              validelibelle: false,
              nombreEmploye:'',
              valideNombreEmploye:false,
              valideNombreEmployeNumber:false,
              edit_nombreEmploye:'',
              valideEditNombreEmploye:false,
              valideEditNombreEmployeNumber:false,
              email:'',
              valideEmail:false,
              edit_email:'',
              valideEditEmail:false,
              phone:'',
              contact:'',
              valideContact:false,
              valideContactNumber:'',
              departements:[],
              edit_libelle:'',
              valideEditlibelle: false,
              valideContactEditNumber:false,
              valideEditContact:false,
              edit_phone:'',
              edit_contactFinal:'',
              edit_contact:'',
              valideEditContactNumber:false,
              description:'',
              edit_description:'',
              config : {
                    headers: {
                        'Accept': 'application/json'
                    },
                },
                indexUp: "",
                valideExist: false,
                exist_text: "",
                updateIndex: "",
            };
        },
        async mounted() {
            document.title = 'Département'
            try {
                await axios
                    .get(URL.DEPARTEMENT_LIST)
                    .then((response) => {
                        this.returnData = response;
                        console.log(response.data[0])  
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
                for (let index = 0; index < this.returnData.data[0].length; index++) {
                    this.departements.push(this.returnData.data[0][index]);
                }
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            // confirm texrt
            confirmText(id, index) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Ce département sera supprimée définitivement !",
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
                        this.deleteDepartement(id, index);
                    }
                });
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            isFloat(str) {
                return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
            },

            validateNombreEmploye(){
              if(!this.nombreEmploye){
                this.valideNombreEmploye=true
              }else{
                this.valideNombreEmploye=false
              }

              if(this.nombreEmploye && this.isDigit(this.nombreEmploye)===false){
                this.valideNombreEmployeNumber=true
              }else{
                this.valideNombreEmployeNumber=false
              }
            },
            validateEditNombreEmploye(){
              if(!this.edit_nombreEmploye){
                this.valideEditNombreEmploye=true
              }else{
                this.valideEditNombreEmploye=false
              }

              if(this.edit_nombreEmploye && this.isDigit(this.edit_nombreEmploye)===false){
                this.valideEditNombreEmployeNumber=true
              }else{
                this.valideEditNombreEmployeNumber=false
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
                    this.erreur = true;
                } else {
                    this.valideEditEmail = false;
                    this.erreur = false;
                }
            },
            validateLibelle() {
                // console.log(this.validelibelle)
                if (!this.libelle) {
                    this.validelibelle = true;
                } else {
                    this.validelibelle = false;
                }
            },
            validateEditLibelle() {
                if (!this.edit_libelle) {
                    this.valideEditlibelle = true;
                } else {
                    this.valideEditlibelle = false;
                }
            },

            async deleteDepartement(indentifiant, index) {
                const id_delete = {
                    id: indentifiant,
                };
                console.log(id_delete)
                try {
                    await axios
                        .post(URL.DEPARTEMENT_DESTROY, id_delete, this.config)
                        .then((response) => {
                            response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.departements.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },
            update(index) {
                this.edit_libelle = this.departements[index].libelle;
                this.edit_nombreEmploye = this.departements[index].nombre_employe;
                this.edit_email = this.departements[index].email;
                this.edit_description= this.departements[index].description;
                this.indexUp = index;
            },
            async updateDepartement(bvModalEvt) {
                const a = this.indexUp;
                if (this.departements[a].libelle != this.edit_libelle || this.departements[a].nombre_employe != this.edit_valeur || this.departements[a].contact != this.contactFinal || this.departements[a].email != this.email) {
                    this.validateEditLibelle();
                    this.validateEditContact();
                    this.validateEditNombreEmploye();
                    this.if_exist();
                    if (this.valideEditlibelle || this.valideExist  || this.valideEditNombreEmploye || this.valideEditNombreEmployeNumber || this.valideEditContactNumber || this.valideEditContact) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        this.$swal({
                            title: "Êtes vous sûr de vouloir enregistrer?",
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
                                const data = {
                                    id: this.departements[a].id,
                                    libelle: this.edit_libelle,
                                    nombre_employe: this.edit_nombreEmploye,
                                    email:this.edit_email,
                                    contact:this.edit_contactFinal,
                                    description:this.edit_description
                                };

                                        console.log(data)
                                try {
                                    axios
                                        .post(URL.DEPARTEMENT_UPDATE, data,this.config)
                                        .then((response) => {
                                            response.data;
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    const index = this.indexUp;
                                    this.departements[index].libelle = this.edit_libelle;
                                    this.departements[index].email = this.edit_email;
                                    this.departements[index].contact = this.edit_contactFinal,
                                    this.departements[index].description = this.edit_description;
                                    this.departements[index].nombre_employe = this.edit_nombreEmploye;
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
                }
            },
            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Département enregistré avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },
            if_exist() {
                for (let index = 0; index < this.departements.length; index++) {
                    if (this.libelle == this.departements[index].libelle) {
                        this.valideExist = true;
                        this.exist_text = "Ce département existe déjà  avec le même nom !";
                        index = this.departements.length;
                    } else {
                        this.valideExist = false;
                    }
                }
            },
            async handleOk(bvModalEvt) {
                try {
                    this.validateContact();
                    this.validateNombreEmploye();
                    this.validateLibelle();
                    this.validateEmail();
                    this.if_exist();
                    if (this.validelibelle || this.valideEmail || this.valideNombreEmployeNumber || this.valideNombreEmploye || this.valideContactNumber || this.valideContact) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        const data = {
                            libelle: this.libelle,
                            nombre_employe: this.nombreEmploye,
                            email:this.email,
                            contact:this.contactFinal,
                            description:this.description
                        };
                        const config = {
                            headers: {
                                'Accept': 'application/json'
                            },
                        }
                        this.topEnd();
                        await axios.post(URL.DEPARTEMENT_CREATE, data, config).then((response) => {
                            this.departements.push(data);
                            this.libelle = "";
                            this.description = "";
                            this.nombreEmploye = "";
                            this.email="";
                            this.phone='';
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            contactEntier(e){
               this.contact=e
            //    console.log(this.phone)
            },
            changer(e){
               this.contact.country.name=e.name 
               console.log(this.contact.country.name)
            },
            validateContact() {
                this.contactFinal="+"+""+this.contact.country.dialCode+ " "+this.contact.formatted
                console.log(this.contactFinal)
                if (!this.contactFinal) {
                    this.valideContact = true;
                    this.erreur = true;
                } else {
                    this.valideContact = false;
                    this.erreur = false;
                }

                if (this.contact.formatted && this.contactFinal.length<8) {
                    this.valideContactNumber = true;
                    this.erreur = true;
                } else {
                    this.valideContactNumber = false;
                    this.erreur = false;
                }
            },
            edit_contactEntier(e){
               this.edit_contact=e
            },
            edit_changer(e){
               this.edit_contact.country.name=e.name 
            },
            validateEditContact() {
                this.edit_contactFinal="+"+""+this.edit_contact.country.dialCode+ " "+this.edit_contact.formatted
                if (!this.edit_contactFinal) {
                    this.valideEditContact = true;
                    this.erreur = true;
                } else {
                    this.valideEditContact = false;
                    this.erreur = false;
                }

                if (this.edit_contactFinal && this.edit_contactFinal.length<8) {
                    this.valideEditContactNumber = true;
                    this.erreur = true;
                } else {
                    this.valideEditContactNumber = false;
                    this.erreur = false;
                }
                console.log(this.valideEditContactNumber)
            },
        },
    };
</script>

<style scoped>
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
</style>
