<template>
    <section>
        <b-row class="text-right">
            <b-col>
                <b-button @click="rediriger" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mb-75 float-right">
                    <span>Liste des modules</span>
                </b-button>
            </b-col>
        </b-row>
        <b-form>
            <!-- nom -->
            <b-form-group label-for="register-nom">
                <validation-provider #default="{ errors }" name="editLibelle" rules="required">
                    <b-row>
                        <b-col lg="6">
                            <label for="">Libelle</label>
                            <b-form-input id="register-nom" @input="validateEditLibelle" v-model="edit_libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Libelle du module" />
                            <small :class="valideEditLibelle? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le libellé du module
                            </small>
                        </b-col>
                        <b-col lg="6">
                            <label for="">Prix</label>
                            <b-form-input id="register-nom" @input="validateEditPrix" v-model="edit_prix" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Prix du module" />
                            <small :class="valideEditPrix? 'block' : 'none'" class="text-danger">
                                Vous devez renseigner le prix du module
                            </small>
                            <small :class="valideEditPrixNumber? 'block' : 'none'" class="text-danger">
                                Le prix doit être un nombre
                            </small>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12">
                            <b-form-group label-for="register-name">
                                <validation-provider name="name" rules="required">
                                    <b-form-group>
                                        <label for="taxeValue">Description :</label>
                                        <b-form-textarea id="textarea" v-model="edit_description" placeholder="Entrer les détails du module" rows="5" max-rows="6"> </b-form-textarea>
                                    </b-form-group>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </validation-provider>
            </b-form-group>
        </b-form>
        <b-row>
            <b-col lg="6" v-for="elt in elements" :key="elt.nom">
                <b-card>
                    <b-card-title class="d-flex" @change="all">{{ elt.nom}}<b-form-checkbox class="ml-2" @change="all" v-model="selectedAll" :value="elt.nom"> </b-form-checkbox></b-card-title>

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
            <b-button v-if="marche" v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2 pr-4 pl-4" type="submit" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </b-button>
            
            <b-button v-else v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="confirmText">
                Enregistrer
            </b-button>
            
            
            <b-button @submit.prevent="marche= false" v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary">
                Annuler
            </b-button>
        </div>
    </section>
</template>

<script>
    import { BModal, VBModal, BAlert, BSidebar, BForm, BFormGroup, BFormInput, BFormTextarea, BButton } from "bootstrap-vue";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";
    import Ripple from "vue-ripple-directive";
    import CryptoJS from "crypto-js"

    export default {
        components: {
            CryptoJS,
            BModal,
            BAlert,
            VBModal,
            axios,
            BForm,
            BFormGroup,
            BFormInput,
            BFormTextarea,
            BButton,
            vSelect,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                marche: false,
                edit_description:'',
                valideEditPrixNumber:false,
                valideEditLibelle:false,
                edit_libelle:'',
                valideEditPrix:false,
                edit_prix:'',
                elements:'',
                element_edit :'',
                selectedAll: [],
                selected: [],
            };
        },
        async mounted() {
            document.title = 'Modification de module'  
            //Les permissions
            try {
                var ciphertext = localStorage.getItem('aUpdate')
                var bytes  = CryptoJS.AES.decrypt(ciphertext, 'qenium 123')
                this.element_edit  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
                // console.log(this.element_edit,'hobrou')
                this.edit_prix = this.element_edit.montant
                this.edit_libelle = this.element_edit.libelle
                this.edit_description = this.element_edit.description
            } catch (error) {
                console.log(error);
            }
            
            try {
                await axios
                    .get(URL.PERMISSION_LIST)
                    .then((response) => {
                        this.returnData = response;
                        this.elements = this.returnData.data[0].element;
                        for (let index = 0; index < this.element_edit.permissions.length; index++) {
                            this.selected.push(this.element_edit.permissions[index].name)
                            
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            async saveUpdate(){
                this.marche = true
                this.valideEditPrixNumber
                this.valideEditLibelle
                this.valideEditPrix
                if(this.validePrix || this.validePrixNumber || this.valideLibelle) {
                    this.handleSubmit();
                }else{
                    const data = {
                        id : this.element_edit.id,
                        description: this.edit_description,
                        montant: this.edit_prix,
                        permissions: this.selected,
                        libelle : this.edit_libelle
                    }
                    const config = {
                        headers: {
                            'Accept': 'application/json'
                        },
                    }
                    axios
                    .post(URL.MODULES_UPDATE, data,config)
                    .then((response) => {
                        response.data;
                        this.marche = false
                        this.topEnd()
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                        }
                    });
                }
            },
            rediriger(){
                this.$router.push('/modules')
            },
            validateEditLibelle() {
              if (!this.edit_libelle) {
                  this.valideEditLibelle = true;
              } else {
                  this.valideEditLibelle = false;
              }
            },
            validateEditPrix() {
              if (!this.edit_prix) {
                  this.valideEditPrix = true;
              } else {
                  this.valideEditPrix = false;
              }
              if (this.edit_prix && this.isDigit(this.edit_prix) === false) {
                    this.valideEditPrixNumber = true;
              } else {
                    this.valideEditPrixNumber = false;
              }
            },

            confirmText() {
                this.$swal({
                    title: "Êtes vous sûr?",
                    text: "de vouloir apporter ces modifications",
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
                        this.saveUpdate();
                    }
                });
            },
            isDigit(str) {
                return /^\d+$/.test(str);
            },
            isFloat(str) {
                return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
            },
            topEnd() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Modifications enregistrées avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
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

                // let inter = [];

                // for (let index = 0; index < this.selected.length; index++) {
                //     let ver = false;
                //     for (let index1 = 0; index1 < this.selectedAll.length; index1++) {
                //         if (this.selected[index].lastIndexOf(this.selectedAll[index1]) >= 0) {
                //             ver = true;
                //             index1 = this.selectedAll.length;
                //         }
                //     }
                //     if (ver === true) {
                //         inter.push(this.selected[index]);
                //     }
                // }
                // this.selected = inter;
            },
            isInArray(value, array) {
                return array.indexOf(value) > -1;
            },
        },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";
    .none {
        display: none;
    }
    .block {
        display: inline-block;
    }
</style>
