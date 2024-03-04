<template>
    <div>
        <div class="card mb-1">
            <div class="row m-1">
                <div class="col-lg-6 col-md-6">

                    <!-- Rôle -->

                    <b-libelle class="red">Rôle</b-libelle>
                    <b-form-group>
                        <v-select
                        @input="revaloriser"
                        v-model="selectedRole"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title"
                        :options="optionRole"
                        />
                    </b-form-group>
                </div>


                    <!-- Modifier -->
                <div class="col-lg-3 col-md-3">
                    <b-libelle class="red">Modifier</b-libelle>
                    <b-form-group>
                        <b-form-group label-for="defaultLabel">
                            <b-form-input id="defaultLabel" placeholder="Normal Input" v-model="roleName" />
                        </b-form-group>
                    </b-form-group>
                </div>
                <div class="col-lg-2 col-md-2 m-auto">
                    <button class=" w-100 btn btn-primary text-center" @click='confirmText'>
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
        <div  class="mt-3 mb-1">
            <div class="row">
                <b-col lg="6" v-for="elt in permissions" :key="elt.nom">
                    <b-card>
                        <b-card-title class="d-flex ">
                            {{ elt.nom}}
                        </b-card-title>

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
            </div>
        </div>
    </div>
</template>

<script>
    import { BRow, BCol, BFormGroup, BFormInput, BFormCheckbox } from "bootstrap-vue";
    import vSelect from "vue-select";
    import axios from 'axios';
    import URL from '@/views/pages/request'
    import Ripple from 'vue-ripple-directive'

    export default {
        components: {
            BFormCheckbox,
            BFormInput,
            BRow,
            BCol,
            BFormGroup,
            vSelect,
            axios,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                selectedRole: { },
                optionRole: [],
                elements:'',
                permission_with_role:'',
                permissions:'',
                selected:[],
                selectedAll:[],
                roleName:'',
                id:'',
            };
        },
       async mounted(){
            try{
                await axios.get(URL.ROLE_INDEX).then(reponse=>{
                    this.elements = reponse.data
                    this.permission_with_role = this.elements.role_permissions

                    for (let index = 0; index < this.permission_with_role.length; index++) {
                        this.optionRole.push({
                           title: this.permission_with_role[index].name,
                           obj: this.permission_with_role[index]
                        })
                    }
                    this.selectedRole = this.optionRole[0]
                    this.roleName = this.selectedRole.title
                    this.id = this.selectedRole.obj.id

                    // console.log(this.roleName)

                    
                    // for (let index = 0; index < this.permission_with_role.length; index++) {
                        for (let index = 0; index < this.permission_with_role[0].permissions.length; index++) {
                            this.selected.push(this.permission_with_role[0].permissions[index].name)
                        }
                    // }
                })
            }catch(error){
                console.log(error)
            }

            try{
                await axios.get(URL.PERMISSION_LIST).then(reponse=>{
                    this.permissions = reponse.data[0].element        
                 })
            }catch(error){
                console.log(error)
            }
        },
        methods:{
            revaloriser(){
                this.roleName = this.selectedRole.title
                this.id = this.selectedRole.obj.id

                for (let index = 0; index <  this.permission_with_role.length; index++) {
                    if(this.permission_with_role[index].id==this.selectedRole.obj.id){
                        this.selected = []
                        for (let index2 = 0; index2 < this.permission_with_role[index].permissions.length; index2++) {
                            this.selected.push(this.permission_with_role[index].permissions[index2].name)
                        }
                        index = this.permission_with_role.length
                    }
                }
            },
            confirmText() {
                this.$swal({
                    title: 'Confirmer',
                    text: "Etes vous sûr de vouloir appliquer ces modifications?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText:'OUI',
                    cancelButtonText:'NON',
                    customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                    },
                    buttonsStyling: false,
                }).then(result => {
                    if (result.value) {
                        this.save()
                    }
                })
            },
            async save(){
                try{
                    const data = {
                        name: this.roleName,
                        perm: this.selected,
                        id:this.id,
                        
                        // id: this.selectedRole.title

                    };
                        console.log(this.id)

                   await axios.post(URL.ROLE_UPDATE,data).then(reponse=>{
                       
                       this.returnData = reponse.data

                    //    console.log( this.returnData)
                   })
                   this.confirm()
                }catch(error){
                    console.log(error)
                }
            },
            confirm(){
                this.$swal({
                    title: this.roleName+' Enregistré avec succès',
                    customClass: {
                    confirmButton: 'btn btn-primary',
                },
                showClass: {
                popup: 'animate__animated animate__flipInX',
                },
                buttonsStyling: false,
            })
            }
        }
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";

    .red:after{
        content: " *";
        color: red;
    }
</style>