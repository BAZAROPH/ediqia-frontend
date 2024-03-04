<template>
    <div class="position-relative table-responsive table-base">
        <!-- Modal pour ajouter une nouvelle taxe -->
        <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Ajouter une permission" @ok="handleOk">
            <validation-observer ref="registerForm">
                <b-form class="auth-register-form mt-2">
                    <!-- <div>
                        <h5 class="text-danger text-center">{{permission_exist}}</h5>
                    </div> -->

                    <!-- Libelle -->
                    <b-libelle class="red" >Libelle permission</b-libelle>
                    <b-form-group label-for="register-name">
                        <validation-provider #default="{ errors }" name="name" rules="required">
                            <b-form-input id="register-name" @input="validateName" v-model="name" name="register-name" :state="errors.length > 0 ? false:null" placeholder="Write, Read, create,delete"/>
                            <small :class="valideName? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le libelle
                            </small>
                        </validation-provider>
                    </b-form-group> 

                        <!-- Description -->
                    <!-- <b-form-group>
                    <label for="taxeValue">Description (facultatif):</label>
                    <b-form-textarea id="textarea" v-model="description" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
                    </b-form-group>  -->


                </b-form>
            </validation-observer>
        </b-modal>

        <!-- Modal pour mettre à jour une permission   -->

        <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier une permission"  @ok="updateCompte">
            <b-form class="auth-register-form mt-2">
                <!-- name -->
                <b-form-group label="Libelle permission" label-for="register-name">
                    <validation-provider #default="{ errors }" name="name" rules="required">
                        <b-form-input id="register-name" @input="validateEditName" v-model="editName" name="register-name" :state="errors.length > 0 ? false:null" placeholder=" Write, Read, create,delete" />
                        <small :class="valideEditName ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libelle
                        </small>
                    </validation-provider>
                </b-form-group>


                <!-- <b-form-group>
                    <label for="taxeValue">Description (Facultatif):</label>
                    <b-form-textarea id="textarea" v-model="editDescription" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
                </b-form-group>   -->

            </b-form>
        </b-modal>
        <!-- Tableau pour afficher les taxes -->
         <!-- <div class="tableau"> 
            <table class="table position-relative table-card table-bordered mt-5 pt-3">
                <b-button variant="relief-primary" v-b-modal.modal-login class="add-btn position-absolute">
                    Ajouter
                </b-button>
                <thead>
                    <tr class="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Libelle</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="text-center" id="table_line" v-for="(permission, index) in permissions" :key="permission">
                        <th scope="row" class="col-1">{{ index + 1 }}</th>
                        
                        <td class="col">
                            <p>{{ permission }}</p>
                        </td>
                        <td class="col-3">
                            <div class="w-50 mx-auto d-flex justify-content-around">
                                <b-button variant="gradient-primary" class="btn-icon mr-2 edit-color" v-b-modal.modal-update @click="update(index)">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                                <b-button variant="gradient-danger" class="btn-icon" @click="confirmText(permission.id,index)">
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>  -->


         <b-card
            no-body
            class="px-2"
        >
            <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvelle permission -->
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
                        Créer une permission
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
                        v-model="filtrePermission"
                        class="d-inline-block mr-1"
                        placeholder="Rechercher par le nom de la pemission,valeur..."
                        />
                    </div>
                </b-col>
            </b-row>


            <!-- Le tableau affichant les permissions -->
            <b-table
                hover
                responsive
                primary-key="id"
                :per-page="perPage"
                :current-page="currentPage"
                :items="permissions"
                :fields="tableColumns"
                :filter="filtrePermission"
                show-empty
                empty-text="Aucune permission enregistrée"
                class="bg-white mt-2 text-center "
                
            > 

                <!-- Bouton d'action -->
                <template #cell(actions)="data">
                    <b-button variant="gradient-primary" class="btn-icon mr-1 edit-color" v-b-modal.modal-update @click="update(data.item)">
                        <feather-icon icon="Edit3Icon" />
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
                        :total-rows="permissionTotal"
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
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import { VueTelInput } from 'vue-tel-input'
    // import moment from 'moment'
    import moment from 'moment';
    export default {
        components: {
            moment,
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
        data() {
            return {
                // validation                
                
                config : {
                    headers: {
                        'Accept': 'application/json'
                    },
                },
            
                name:'',
                valideName:false,

            //   description:'',
                allpermission:[],
                // permission_exist:'',

                editName:'',
                valideEditName:false,
                // editDescription:'',
                compteUp:'',
                edit_index: "",

                valeurGood: false,
                valeurEditGood: false,
                compteUp: "",
                returnData: "",
                required,
                valideExiste: false,              
                id: "",
                dat:"",
                // dateDeCreation:"",
                updateIndex: "",
                permissionUp:'',

                elements:[],
                permissions:[],

                permissionTotal: 0,
                permis:[],
                perPage:5,
                currentPage: 1,
                filtrePermission: '',               
                perPageOptions: [5, 10, 100, 500, 1000, 2000, 10000],

                tableColumns: [
                    { key: 'name', label: 'Permissions',  sortable: true },
                     { key: 'dat', label: 'Date de créatrion',  sortable: true },
                    { key: 'actions' },
                ],

            };
        },

        async mounted(){
            document.title = 'Permission'  
            try {
                await axios
                    .get(URL.PERMISSION_LIST)
                    .then((response) => {

                        this.returnData = response;
                        this.permissionTotal = response.data[0].permissions.length


                        this.elements = this.returnData.data[0].element
                        for (let index = 0; index < this.elements.length; index++) {
                            for (let index2 = 0; index2 < this.elements[index].permissions.length; index2++) {

                                // this.permissions.push(this.elements[index].permissions[index2].name)

                                this.permissions.push(
                                    {
                                        name : this.elements[index].permissions[index2].name,
                                        id :this.elements[index].permissions[index2].id,
                                        dat : this.format_date(this.elements[index].permissions[index2].created_at),
                                        

                                    }
                                 )

                            }
                        }
                        console.log(this.permissionTotal)
                    })
                .catch((error) => {
                    console.log(error);
                });

                
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
            
            validateName(){
                if(!this.name){
                this.valideName =true
                }else{
                this.valideName = false
                }
            },

            validateEditName(){
                if(!this.editName){
                this.valideEditName =true
                }else{
                this.valideEditName = false
                }
            },

            isDigit(str) {
                return /^\d+$/.test(str);
            },

            // confirm texrt
            confirmText(id, index) {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "Ce client sera supprimé définitivement !",
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
                        this.deletePermission(id, index);
                    }
                });
            },
            // top end
            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "permission enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            deletePermission(identifiant, index) {
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
                        .post(URL.PERMISSION_DESTROY, id,config)
                        .then((response) => {
                            response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                    this.permissions.splice(index, 1);
                } catch (error) {
                    console.log(error.type);
                }
            },

            update(item) {
                this.permissionUp = item;
                // this.permissionUp = this.allpermission[indice];
                this.editName= this.permissionUp.name;
                this.edit_index = this.permissions.findIndex((el) => el.id === item.id);
                this.id = this.permissionUp.id;
                
                console.log(this.edit_index)
            },

            async updateCompte(bvModalEvt) {
                const index = this.edit_index;
                this.validateEditName()
                if (this.valideEditName) {
                    bvModalEvt.preventDefault();
                } else {
                    if (
                        this.permissions[index].name != this.editName
                        // ||this.permissions[index].description != this.editDescription
                      
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
                                        id:this.id,
                                        name: this.editName,
                                        // description: this.editDescription,
                                    };
                                    
                                    axios
                                        .post(URL.PERMISSION_UPDATE, data,this.config)
                                        .then((response) => {
                                            response.data;
                                        })
                                        .catch((error) => {
                                            if (error.response) {
                                                console.log(error.response.data);
                                            }
                                        });
                                    this.permissions[index].name = this.editName
                                    // this.permissions[index].description = this.editDescription
                                } catch (error) {
                                    console.log(error.type);
                                }
                            }
                        });
                    }
                }
            },
            //  if_exist() {
            //     for (let index = 0; index < this.permissions.length; index++) {
            //       if (this.numeroCompte == this.comptes[index].numero_compte) {
            //           this.valideExiste = true;
            //             this.permission_exist = "Permission existe déjà! Veuillez vérifier le numero";
            //         } else {
            //             this.valideExiste = false;
            //         }
            //     }
            // },
          
           
            async handleOk(bvModalEvt) {
               this.validateName()
                try {
                    this.validateName();
                    // this.if_exist();
                  
                    if (this.valideName ) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                      
                        const newPermission= {
                            name: this.name,
                            // description:this.description
                        };
                        this.topEnd();
                          console.log(newPermission)
                        await axios.post(URL.PERMISSION_CREATE, newPermission,this.config).then((response) => {
                            // this.userData = response.data;
                            console.log(this.name)
                        });
                            this.allpermission.push(this.name);
                             this.name = "";
                    }
                } catch (error) {
                    console.log(error);
                }
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

    .red:after {
    content:" *";
    color: red;
  }
</style>
