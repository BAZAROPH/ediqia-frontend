<template>
    <div class="position-relative table-responsive table-base">
        <b-row class="text-right">
            <b-col>
                <b-button @click="rediriger" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mb-75 float-right">
                    Créer un module
                </b-button>
            </b-col>
        </b-row>
        <!-- Tableau pour afficher les départements -->
        <div class="">
            <table id="dtBasicExample" class="table table-striped table-bordered" style="width: 100%;">
                <thead>
                    <tr>
                        <th class="align-middle text-center">Module</th>
                        <th class="align-middle text-center">Prix (Fcfa)</th>
                        <th class="align-middle text-center">Date</th>
                        <th class="align-middle text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(module, index) in modules" :key="module.id" class="text-center">
                        <td class="col-3">{{module.libelle}}</td>
                        <td class="col-3">{{module.montant}}</td>
                        <td class="col-3">{{format_date(module.created_at)}}</td>
                        <td class="">
                            <div class="d-flex">
                            <span class="m-auto">
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" v-b-modal.modal-1 variant="flat-warning" @click="update(index)" class="btn-icon rounded-circle">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                            </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="text-center">
                        <th>Module</th>
                        <th>Prix</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </tfoot>
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
    import moment from "moment";
    import { VueTelInput } from 'vue-tel-input'
    import CryptoJS from "crypto-js"
    export default {
        components: {
            CryptoJS,
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
            elements:'',
            selectedAll: [],
            selected: [],
            edit_description:'',
            valideEditPrixNumber:false,
            valideEditLibelle:false,
            edit_libelle:'',
            valideEditPrix:false,
            edit_prix:'',
              config : {
                    headers: {
                        'Accept': 'application/json'
                    },
                },
                modules:'',
            };
        },
        async mounted() {
            document.title = 'Liste des modules'  
            try {
                await axios
                    .get(URL.MODULES)
                    .then((response) => {
                        this.returnData = response;
                        this.modules = this.returnData.data.module_et_permission
                        console.log(this.modules)
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
            } catch (error) {
                console.log(error);
            }

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
                this.$router.push('/modules/create')
            },
            update(indice){
                this.edit_description = this.modules[indice].description
                this.edit_libelle = this.modules[indice].libelle
                this.edit_prix = this.modules[indice].montant
                
                for (let index = 0; index < this.modules[indice].permissions.length; index++) {
                    this.selected.push(this.modules[indice].permissions[index].name);
                }
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.modules[indice]), 'qenium 123').toString(ciphertext)
                localStorage.setItem('aUpdate', ciphertext)    
                this.$router.push('/modules/update')
            },
            format_date(value) {
                if (value) {
                    return moment(String(value)).format("DD / MM / YYYY");
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
        }
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
