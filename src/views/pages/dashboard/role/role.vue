<template>
    <div class="position-relative table-responsive table-base">
        <!-- <b-card> -->
            <validation-observer ref="registerForm">

                <b-form class="auth-register-form mt-2">
                    <b-container>
                        <b-row>
                        <b-col>
                            <!-- <div>
                                <h5 class="text-danger text-center">{{user_exist}}</h5>
                            </div>                    -->
                        
                            <!-- Créer Role -->
                            <b-libelle class="red">Nom du role</b-libelle>
                            <b-form-group label-for="register-name">
                                <validation-provider #default="{ errors }" name="name" rules="required">
                                    <b-form-input id="register-nom" @input="validateName" v-model="name" name="register-name" :state="errors.length > 0 ? false:null" placeholder="Role" />
                                    <small :class="valideName ? 'block' : 'none'" class="text-danger">
                                        Vous devez renseigner le nom du rôle
                                    </small>
                                </validation-provider>
                            </b-form-group>



                            <!-- <b-row>
                                <b-col lg="10">
                                    <b-form-group label="Nom du role" label-for="register-name">
                                        <validation-provider #default="{ errors }" name="name" rules="required">
                                            <b-form-input id="register-nom" @input="validateName" v-model="name" name="register-name" :state="errors.length > 0 ? false:null" placeholder="Role" />
                                            <small :class="valideName ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le nom du rôle
                                            </small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <b-col  class="col-lg-2 col-md-2 m-auto" >
                                    <button class=" w-100 btn btn-primary text-center" @click='confirmText'>
                                        Modifier
                                    </button>
                                </b-col>

                            </b-row> -->
                    
                            <!-- Les permissions -->
                            <b-row>
                                <b-col lg="6" v-for='elt in elements' :key='elt.nom'>
                                    <b-card>
                                        <b-card-title class="d-flex" @change="all">{{ elt.nom}}<b-form-checkbox
                                        class="ml-2"
                                            v-model="selectedAll"
                                            :value="elt.nom"
                                        >
                                        </b-form-checkbox></b-card-title>
                                        
                                        <div class="demo-inline">
                                            <b-row>                                              
                                                <b-col  lg="6" v-for="permission in elt.permissions" :key='permission.id'>
                                                   <b-form-checkbox
                                                        v-model="selected"
                                                        :value="permission.name"
                                                    >
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
                        <b-button
                        v-b-toggle.sidebar-invoice-add-new-customers
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="mr-2"
                        type="submit"
                        @click="saveRole"
                       
                        >
                        Ajouter
                        </b-button>
                        <b-button
                        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                        variant="outline-secondary"
                        
                        >
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
import { forEach } from 'postcss-rtl/lib/affected-props';
    export default {
        components: {
            axios,
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
                selectedAll:[],
                selected:[],
                name: "",
                valideName:"",
                valideEditName: false,
                userUp: "",
                returnData: "",
                required,
                user_exist: "",
                roles:[],
                role:[],
                valideExiste: "",
                edit_nom: "",
                edit_index: "",

                user_id: "",
                updateIndex: "",

                elements:'',

            };
        },
       async mounted(){
            try {
                await axios
                    .get(URL.PERMISSION_LIST)
                    .then((response) => {
                        this.returnData = response;
                        this.elements = this.returnData.data[0].element
                        console.log(this.elements)
                    })
                .catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            all(){
                for(let index = 0; index<this.elements.length; index++){
                    for (let index1 = 0; index1 < this.elements[index].permissions.length; index1++) {
                        const perm = this.elements[index].permissions[index1].name
                        for (let index2 = 0; index2 < this.selectedAll.length; index2++) {
                            if (perm.lastIndexOf(this.selectedAll[index2]) >= 0 && this.isInArray(perm, this.selected)===false) {
                                this.selected.push(perm)
                            }
                        }
                    }
                }

                let inter = []

                for (let index = 0; index < this.selected.length; index++) {
                    let ver = false
                    for (let index1 = 0; index1 < this.selectedAll.length; index1++) {
                        if(this.selected[index].lastIndexOf(this.selectedAll[index1])>=0){
                            ver = true
                            index1 = this.selectedAll.length
                        }
                    }
                    // console.log(ver, this.selected[index])
                    if(ver === true){
                        inter.push(this.selected[index])
                    }
                    // console.log(this.selected)
                }
                this.selected = inter
                console.log(this.selected)
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
                    title: "Rôle enregistré avec succès",
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
            
            

            async saveRole(e) { 
                e.preventDefault();
                try {
                    this.validateName()
                    this.validateName();
                    // this.if_exist();
                  
                    if (this.valideName ) {
                        this.handleSubmit();
                    } else {
                      
                        const newPermission= {
                            name: this.name,
                            perm: this.selected
                            // description:this.description
                        };
                        this.topEnd();
                          console.log(newPermission)
                        await axios.post(URL.ROLE_CREATE, newPermission,this.config).then((response) => {
                            
                        });
                            // this.permissions.push(newPermission);
                             this.name = "";
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
    
    .name{
        padding-left: 50PX;
    }
    }
    .red:after{
        content: " *";
        color: red;
    }
</style>
