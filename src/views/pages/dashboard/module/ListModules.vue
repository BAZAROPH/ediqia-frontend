<template>
    <b-sidebar id="sidebar-list-modules" sidebar-class="sidebar-lg" bg-variant="white" shadow backdrop no-header right>
        <template>
            <!-- Alert: No item found -->
        <b-row class="text-right">
            <b-col>
                <b-button @click="rediriger" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mb-75 float-right">
                    Créer un module
                </b-button>
            </b-col>
        </b-row>
          <!-- Modal pour visionner les modules -->
          <b-modal
            id="modal-voir"
            :title="viewModule.libelle.toUpperCase()"
            ok-only
            size="lg"
            ok-title="Fermer"
          >
            <b-card-text>
              <div class="row">
                <div class="col-4 m-auto" style="font-size: 20px;">
                  Prix : <b-badge variant="success">{{viewModule.montant}} Fcfa</b-badge>
                </div>
                <div class="col-8  m-auto">
                  <b-card class=" m-auto">
                    <b-row>
                      <b-col class="" lg="6" v-for="perm in viewModule.permissions" :key="perm.id">
                        - {{perm.name}}<br>
                      </b-col>
                    </b-row>
                  </b-card>
                </div>
              </div>  
            </b-card-text>
          </b-modal>
          <!-- modale pour modifier un module  -->
          <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Enregistrer" cancel-title="Annuler" size="lg"  title="Modifier un module" @ok="updateModule()">
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

                        <b-row>
                            <b-col>
                                <b-row>
                                    <b-col lg="12" v-for="elt in elements_edit" :key="elt.nom">
                                        <b-card>
                                            <b-card-title class="d-flex">{{ elt.nom}}<b-form-checkbox class="ml-2" v-model="selectedAll_edit" @change="all" :value="elt.nom"> </b-form-checkbox></b-card-title>

                                            <div class="demo-inline">
                                                <b-row class="m-auto">
                                                    <b-col lg="6" v-for="permission in elt.permissions" :key="permission.id">
                                                        <b-form-checkbox @change="changement(index)" v-model="selected_edit" :value="permission.name">
                                                            {{permission.name}}
                                                        </b-form-checkbox>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </validation-provider>
                </b-form-group>
            </b-form>
        </b-modal>
            <table id="example" class="table table-striped table-bordered" style="width: 100%;">
                <thead>
                    <tr>
                        <th class="align-middle text-center">Module</th>
                        <th class="align-middle text-center">Prix (Fcfa)</th>
                        <th class="align-middle text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(module, index) in modules" :key="module.id">
                        <td class="col-4">{{module.libelle}}</td>
                        <td class="col-4">{{module.montant}}</td>
                        <td>
                            <div class="d-flex">
                              <span>
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="flat-success" class="btn-icon rounded-circle" v-b-modal.modal-voir @click="view(index)">
                                    <feather-icon icon="EyeIcon" />
                                </b-button>
                            </span>
                            <span>
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="flat-warning" v-b-modal.modal-update @click="update(index)" class="btn-icon rounded-circle">
                                    <feather-icon icon="Edit3Icon" />
                                </b-button>
                            </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Module</th>
                        <th>Prix</th>
                        <th>Action</th>
                    </tr>
                </tfoot>
            </table>
        </template>
    </b-sidebar>
</template>

<script>
    import { BModal,VBModal,BAlert,BSidebar, BForm, BFormGroup, BFormInput, BFormTextarea, BButton } from "bootstrap-vue";
    import { ref } from "@vue/composition-api";
    import Ripple from "vue-ripple-directive";
    import flatPickr from "vue-flatpickr-component";
    import vSelect from "vue-select";
    import URL from '@/views/pages/request'
    import axios from "axios";

    export default {
        components: {
          BModal,
          BAlert,
          VBModal,
            axios,
            BSidebar,
            BForm,
            BFormGroup,
            BFormInput,
            BFormTextarea,
            BButton,


            flatPickr,
            vSelect,
        },
        directives: {
            Ripple,
            'b-modal': VBModal,
        },
        data() {
            return {
                elements_edit:'',
                selected_edit:[],
                selectedAll_edit:[],
                edit_description:'',
                valideEditPrixNumber:false,
                valideEditLibelle:false,
                edit_libelle:'',
                valideEditPrix:false,
                edit_prix:'',
                viewModule:{
                  'libelle':''
                },
                modules: "",
                updateModule:{
                  'libelle':''
                },
                aUpdate:"",
            };
        },
        async mounted() {
            document.title = 'Liste des modules'  
            try {
                await axios
                    .get(URL.MODULES)
                    .then((response) => {
                        this.returnData = response;
                        this.modules = this.returnData.data.module_et_permission;
                    })
                    for (let index = 0; index < this.modules.length; index++) {
                        Object.assign(this.modules[index], a)
                    }
                    console.log(this.modules[0])
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
            //Les permissions
            try {
                await axios
                    .get(URL.PERMISSION_LIST)
                    .then((response) => {
                        this.returnData = response;
                        this.elements_edit = this.returnData.data[0].element;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        methods:{
            rediriger(){
                this.$router.push('/modules/create')
            },
            isInArray(value, array) {
                return array.indexOf(value) > -1;
            },
            all() {
                for (let index = 0; index < this.elements_edit.length; index++) {
                    for (let index1 = 0; index1 < this.elements_edit[index].permissions.length; index1++) {
                        const perm = this.elements_edit[index].permissions[index1].name;
                        for (let index2 = 0; index2 < this.selectedAll_edit.length; index2++) {
                            if (perm.lastIndexOf(this.selectedAll_edit[index2]) >= 0 && this.isInArray(perm, this.selected) === false) {
                                this.selected_edit.push(perm);
                            }
                        }
                    }
                }

                let inter = [];

                for (let index = 0; index < this.selected_edit.length; index++) {
                    let ver = false;
                    for (let index1 = 0; index1 < this.selectedAll_edit.length; index1++) {
                        if (this.selected_edit[index].lastIndexOf(this.selectedAll_edit[index1]) >= 0) {
                            ver = true;
                            index1 = this.selectedAll_edit.length;
                        }
                    }
                    if (ver === true) {
                        inter.push(this.selected_edit[index]);
                    }
                }
                this.selected = inter;
            },
            update(indice){
                this.aUpdate = this.modules[indice]
                console.log(this.aUpdate)
                for (let index = 0; index < this.aUpdate.permissions.length; index++) {
                    this.aUpdate.selected_ed.push(this.aUpdate.permissions[index].name) 
                }
                this.selected_edit =  this.aUpdate.selected_ed
            },
          isDigit(str) {
                return /^\d+$/.test(str);
          },
          view(indice){
            this.viewModule = this.modules[indice]
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

