<template>
    <validation-observer ref="addEmprunt">
        <b-form class="auth-register-form mt-2" @submit.prevent>
            <b-row>
                <b-col lg="12" md="12" xs="12" sm="12" class="m-auto">
                    <b-card class="pr-3 pl-3">
                        <section>
                            <b-row>
                                <b-col lg="6" xs="12" md="6" sm="12">
                                    <h3>Depense</h3>
                                    <hr style="width: 100%;" />
                                    <b-row>
                                        <!-- type de depense -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group label-for="register-nom">
                                                <label for="">Type de la depense <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider #default="{  }" name="type_depense" rules="required">
                                                    <v-select @input="validateTypeDepense" v-model="selectedTypeDepense" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="TypeDepenseList[0]">
                                                        <template #list-header>
                                                            <li v-b-toggle.sidebar-invoice-add-new-customers-typeDepense class="add-new-client-header d-flex align-items-center my-50">
                                                                <feather-icon icon="PlusIcon" size="16" />
                                                                <span class="align-middle ml-25">Ajouter un type de depense</span>
                                                            </li>
                                                        </template>
                                                    </v-select>
                                                        <small :class="valideTypeDepense? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le type de depense
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>
                                        <!-- libelle -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group label="" label-for="register-nom">
                                                <label for="">Libelle de la depense <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider #default="{ errors }" name="libelle" rules="required">
                                                    <b-form-input id="register-nom" @input="validateLibelle" v-model="libelle" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                                                    <small :class="valideLibelle ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le libellé de la depense
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <!-- Date_emission -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group>
                                                <label for="">Date émission <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider  name="date_emission" rules="required">
                                                    <flat-pickr @input="validateDateEmission" v-model="date_emission" class="form-control" />
                                                    <small :class="valideDateEmission ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner la date
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <!-- montant -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group label="" label-for="register-montant">
                                                <label for="">Montant de la dépense <span class="p-0 text-danger h6">*</span></label>
                                                <validation-provider #default="{ errors }" name="montant" rules="required">
                                                    <b-form-input id="register-montant" @input="validateMontant" v-model="montant" name="register-montant" :state="errors.length > 0 ? false:null" placeholder="18.000000" />
                                                    <small :class="valideMontant ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le montant
                                                    </small>
                                                    <small :class="valeurGood ? 'block' : 'none'" class="text-danger">
                                                        Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                                                        Un POINT( . ) à la place de la virgule( , )
                                                    </small>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <!-- Description -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group label="Motif de la depense" label-for="register-description">
                                                <b-form-textarea id="textarea" v-model="description" placeholder="Saisissez une description" rows="3" max-rows="6"></b-form-textarea>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-col>

                                <b-col lg="6" xs="12" md="6" sm="12">
                                    <h3>Fournisseur</h3>
                                    <hr style="width: 100%;" />

                                    <b-row>
                                        <!-- Fournisseur -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group label="Fournisseur" label-for="register-nom">
                                                <validation-provider #default="{}" name="fournisseur" rules="required">
                                                    <v-select v-model="selectedFournisseur" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="nom" :options="fournisseurList">
                                                        <template #list-header>
                                                            <li v-b-toggle.sidebar-invoice-add-new-customers-fournisseur class="add-new-client-header d-flex align-items-center my-50">
                                                                <feather-icon icon="PlusIcon" size="16" />
                                                                <span class="align-middle ml-25">créer un fournisseur</span>
                                                            </li>
                                                        </template>
                                                    </v-select>
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <!--Numero facture fournisseur  -->
                                        <b-col lg="12" class="m-auto">
                                            <b-form-group label="Numero facture fournisseur" label-for="register-nom">
                                                <validation-provider #default="{ errors }" name="libelle" rules="">
                                                    <b-form-input id="register-nom" v-model="facture_fournisseur" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                                                </validation-provider>
                                            </b-form-group>
                                        </b-col>

                                        <!-- image facture fournisseur -->
                                        <b-col lg="12" class="m-auto">
                                            <label for="">fichier facture fournisseur</label>
                                            <b-form-file class="text-center" v-model="file" @change="processFile($event)" placeholder="inserer l'image de la facture du fournisseur" drop-placeholder="Drop file here..." no-drop />
                                        </b-col>
                                    </b-row>
                                    <br />

                                    <!-- Destinataire des depenses -->
                                    <b-col lg="12">
                                        <b-card class="earnings-card">
                                            <b-card-title class="mb-1">
                                                <h3>Destinataire de la depense</h3>
                                                <hr style="width: 100%;" />
                                            </b-card-title>
                                            <b-card-text class="text-muted font-small-2 mt-0 pt-0">
                                                <div class="mb-3">
                                                    <b-tabs align="center">

                                                        <b-tab title="">
                                                        </b-tab>

                                                        <b-tab title="Employes" @click="getParams('employe')">
                                                            <b-form-group label="" label-for="register-libelle">
                                                                <v-select v-model="employeItem" placeholder="Selectionner un employé" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="nom" :options="employes"> </v-select>
                                                            </b-form-group>
                                                        </b-tab>

                                                        <b-tab title="Agences" @click="getParams('agence')">
                                                            <b-form-group label="" label-for="register-libelle">
                                                                <v-select v-model="agenceItem" placeholder="Selectionner une agence" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="agences"> </v-select>
                                                            </b-form-group>
                                                        </b-tab>

                                                        <b-tab title="Projets" @click="getParams('projet')">
                                                            <b-form-group label="" label-for="register-libelle">
                                                                <v-select v-model="projetItem" placeholder="Selectionner un projet" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="projets"> </v-select>
                                                            </b-form-group>
                                                        </b-tab>

                                                        <b-tab title="Departements" @click="getParams('departement')">
                                                            <b-form-group label="" label-for="register-libelle">
                                                                <v-select v-model="departementItem" placeholder="Selectionner un departement" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="libelle" :options="departements">
                                                                </v-select>
                                                            </b-form-group>
                                                        </b-tab>
                                                    </b-tabs>
                                                </div>
                                            </b-card-text>
                                        </b-card>
                                    </b-col>
                                </b-col>
                            </b-row>

                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-sm-12">
                                    <div class="card">
                                        <h3>Reglement des depenses</h3>
                                        <hr style="width: 100%;" />
                                        <div class="card-body">
                                            <!-- <h3 class="card-title">Règlement</h3> -->
                                            <b-card-body class="invoice-padding form-item-section">
                                                <div ref="form" class="repeater-form" :style="{ height: trHeight }">
                                                    <b-row v-for="(item, index) in reglements" :key="index" ref="row" class="pb-2">
                                                        <!-- Item Form -->
                                                        <!-- ? This will be in loop => So consider below markup for single item -->
                                                        <b-col cols="12">
                                                            <div class="d-flex border rounded">
                                                                <b-row class="flex-grow-1 p-2">
                                                                    <!-- Date de reglement -->
                                                                    <b-col cols="12" md="3">
                                                                        <label class="d-inline d-lg-none">Date du reglement</label>

                                                                        <b-form-group>
                                                                            <label> Date règlement <span class="p-0 text-danger h6">*</span> </label>
                                                                            <validation-provider   rules="required">
                                                                                <flat-pickr v-model="item.date_reglement" class="form-control" @input="validateDate(item.date_reglement, index)" />
                                                                            </validation-provider>
                                                                        </b-form-group>
                                                                    </b-col>

                                                                    <!-- montant -->
                                                                    <b-col cols="12" md="3">
                                                                        <b-form-group label="" label-for="register-montant">
                                                                            <label for="">Montant <span class="p-0 text-danger h6">*</span></label>
                                                                            <validation-provider #default="{ errors }" name="montant" rules="required">
                                                                                <b-form-input id="register-montant" v-model="item.montant_reglement" name="register-montant" :state="errors.length > 0 ? false:null" placeholder="18.000000" />
                                                                                <!-- <small :class="valeurSup ? 'block' : 'none'" class="text-danger">
                                          Saisie incorrecte. Vous devez renseigner un nombre avec ou sans virgule.<br />
                                          Un POINT( . ) à la place de la virgule( , )
                                      </small> -->
                                                                            </validation-provider>
                                                                        </b-form-group>
                                                                    </b-col>

                                                                    <!-- compte -->
                                                                    <b-col cols="12" md="3" class="m-auto">
                                                                        <b-form-group label="" label-for="register-libelle">
                                                                            <label for="">Compte <span class="p-0 text-danger h6">*</span></label>
                                                                            <v-select
                                                                                v-model="item.selectedCompte"
                                                                                placeholder="Selectionnez un compte"
                                                                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                                                                label="libelle"
                                                                                rules="required"
                                                                                :options="compteList"
                                                                                @input="(val) => updateItemForm(index, val)"
                                                                            >
                                                                                <template #list-header>
                                                                                    <li v-b-toggle.sidebar-invoice-add-new-customers-a class="add-new-client-header d-flex align-items-center my-50">
                                                                                        <feather-icon icon="PlusIcon" size="16" />
                                                                                        <span class="align-middle ml-25">créer un compte</span>
                                                                                    </li>
                                                                                </template>
                                                                            </v-select>
                                                                        </b-form-group>
                                                                    </b-col>

                                                                    <!-- Note -->
                                                                    <b-col cols="12" md="3">
                                                                        <b-form-group label="Note " label-for="register-montant">
                                                                            <validation-provider #default="{ errors }" name="montant" rules="">
                                                                                <b-form-input id="register-montant" v-model="item.note" name="register-montant" :state="errors.length > 0 ? false:null" placeholder="" />
                                                                            </validation-provider>
                                                                        </b-form-group>
                                                                    </b-col>
                                                                </b-row>

                                                                <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                                                                    <feather-icon size="16" icon="XIcon" class="cursor-pointer" @click="removeItem(index)" />
                                                                </div>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                </div>
                                                <b-row>
                                                    <b-col cols="12" style="top: -50px;">
                                                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="md" variant="primary" @click="addNewItemInItemForm">
                                                            Ajouter un règlement
                                                        </b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <!-- Form Actions -->
                            <div class="text-center mt-2">
                                <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mr-2">
                                    Annuler
                                </b-button>
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit" @click="save">
                                    Ajouter
                                </b-button>
                            </div>
                        </section>

                        <!-- FORMULAIRE POUR AJOUTER UN NOUVEAU COMPTE -->
                        <b-sidebar id="sidebar-invoice-add-new-customers-a" sidebar-class="sidebar-lg" ref="sidebarCompte" bg-variant="white" shadow backdrop no-header right>
                            <template #default="{  }">
                                <!-- Header -->
                                <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                                    <h5 class="mb-0">
                                        Ajouter un compte
                                    </h5>

                                    <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" />
                                </div>

                                <!-- Body -->
                                <b-form class="p-2" @submit.prevent>
                                    <!-- Numero compte -->
                                    <b-form-group label="" label-for="customer-name">
                                         <label for="">Numero de compte <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="nom" rules="required">
                                            <b-form-input id="register-nom" @input="validateNumeroCompte" v-model="compte.numero_compte" name="register-numeroCompte" :state="errors.length > 0 ? false:null" placeholder="AZ000000EH09" />
                                         <small :class="valideNumeroCompte ? 'block' : 'none'" class="text-danger">
                                              Vous devez renseigner le numero du compte
                                        </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Libelle -->

                                    <b-form-group label="" label-for="customer-name">
                                     <label for="">Libelle <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="libelle" rules="required">
                                            <b-form-input id="register-libelle" @input="validateLibelleCompte" v-model="compte.libelle" name="register-libelle" :state="errors.length > 0 ? false:null" placeholder="NSIA, ECOBANK" />
                                         <small :class="valideLibelleCompte ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le libelle
                                        </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Solde -->
                                    <b-form-group label="" label-for="solde">
                                      <label for="">Solde <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="solde" rules="required">
                                            <b-form-input id="register-solde" @input="validateSoldeCompte"  v-model="compte.solde" type="text" name="register-solde" :state="errors.length > 0 ? false:null" placeholder="1000000000" />
                                        <small :class="valideSoldeCompte ? 'block' : 'none'" class="text-danger">
                                             Vous devez renseigner le solde
                                         </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Description -->
                                    <b-form-group>
                                        <label for="Description">Description (facultatif):</label>
                                        <b-form-textarea id="textarea" v-model="compte.description" placeholder="Entrer les details du compte" rows="5" max-rows="6"> </b-form-textarea>
                                    </b-form-group>

                                    <!-- Form Actions -->
                                    <div class="d-flex mt-2">
                                        <b-button v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="saveCompte">
                                            Ajouter
                                        </b-button>
                                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" >
                                            Annuler
                                        </b-button>
                                    </div>
                                </b-form>
                            </template>
                        </b-sidebar>
                        <!-- end sidebar add compte -->

                        <!-- FORMULAIRE POUR AJOUTER UN FOURNISSEUR -->
                        <b-sidebar id="sidebar-invoice-add-new-customers-fournisseur" sidebar-class="sidebar-lg" ref="sidebarFournisseur" bg-variant="white" shadow backdrop no-header right>                            <template #default="{ }">
                                <!-- Header -->
                                <div id="saveFourniseur__id" class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                                    <h5 class="mb-0">
                                        Ajouter un fournisseur
                                    </h5>

                                    <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" />
                                </div>

                                <!-- Body -->
                                <b-form @submit.prevent class="p-2">
                                    <!-- nom -->
                                    <b-form-group label="" label-for="register-nom">
                                      <label for="">Nom <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="nom" rules="required">
                                            <b-form-input id="register-nom" @input="validateNom" v-model="nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                                            <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                                 Vous devez renseigner le nom du fournisseur
                                             </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- nom -->
                                    <b-form-group label="Prenom" label-for="register-nom">
                                        <validation-provider #default="{ errors }" name="nom" rules="">
                                            <b-form-input id="register-nom" v-model="prenoms" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                                            <!-- <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le prenom du fournisseur
                                            </small> -->
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Libelle -->

                                    <b-form-group label="" label-for="register-email">
                                    <label for="">Email</label>
                                        <validation-provider #default="{ errors }" name="Email" rules="required|email">
                                            <b-form-input id="register-email" v-model="email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                                            <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                            Veuillez entrer un email valide
                                                </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- contact -->
                                    <b-form-group label="" label-for="register-contact">
                                     <label for="">Contact <span class="p-0 text-danger h6">*</span></label>
                                        <validation-provider #default="{ errors }" name="contact" rules="required">
                                            <vue-tel-input
                                                id="register-contact"
                                                @country-changed="changer"
                                                @validate="contactEntier($event)"
                                                v-model="phone"
                                                @input="vider"
                                                name="register-contact"
                                                :state="errors.length > 0 ? false:null"
                                                placeholder="000-000-000-000"
                                            />
                                            <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                                                  Veuillez renseigner votre contact
                                              </small>
                                            <!-- <small :class="valideContactNumber ? 'block' : 'none'" class="text-danger">
                                                Ce numéro de téléphone n'est pas valide
                                            </small> -->
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- Localisation -->
                                    <b-form-group label-for="entreprise-localisation" class="localisation">
                        <validation-provider #default="{ }" name="localisation" rules="required">
                            <div id="custom-search-input" class="mb-1">
                                <div class="input-group">
                                    <input id="autocomplete_search" @input="initialize"  name="autocomplete_search" type="text" class="form-control" placeholder="Votre adresse" />
                                    <input type="hidden" name="lat">
                                    <input type="hidden" name="long">
                                </div>
                            </div>
                            <small :class="valideLocalisation ? 'block' : 'none'" class="text-danger">
                                Veuillez entrer la localisation du client
                            </small>
                        </validation-provider>
                    </b-form-group>

                     <b-form-group label="Description" label-for="register-description">
                      <b-form-textarea id="textarea" v-model="description" placeholder="Saisissez une description" rows="5" max-rows="6"></b-form-textarea>
                    </b-form-group>


                                    <b-form-group>
                                        <v-select v-model="selected" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option" />
                                        <!-- <small :class="valideStatus ? 'block' : 'none'" class="text-danger">
                        Vous devez renseigner le status du fournisseur
                    </small> -->
                                    </b-form-group>

                                    <!-- Form Actions -->
                                    <div class="d-flex mt-2">
                                        <b-button v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="saveFournisseur">
                                            Ajouter
                                        </b-button>
                                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" >
                                            Annuler
                                        </b-button>
                                    </div>
                                </b-form>
                            </template>
                        </b-sidebar>
                        <!-- end sidebar add fournisseur -->

                        <!-- FORMULAIRE POUR AJOUTER UN TYPE DEPENSE -->
                        <b-sidebar id="sidebar-invoice-add-new-customers-typeDepense" ref="sidebarTypeDepense" sidebar-class="sidebar-lg" bg-variant="white" shadow backdrop no-header right>
                            <template #default="{  }">
                                <!-- Header -->
                                <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                                    <h5 class="mb-0">
                                        Ajouter un type de depense
                                    </h5>

                                    <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16"/>
                                </div>

                                <!-- Body -->
                                <b-form class="p-2" @submit.prevent>
                                    <div>
                                        <h5 class="text-danger text-center">{{exist_text}}</h5>
                                    </div>
                                    <!-- libelle -->
                                    <b-form-group label="" label-for="register-nom">
                                         <label> Libelle <span class="p-0 text-danger h6">*</span> </label>
                                        <validation-provider #default="{ errors }" name="libelle" rules="required">
                                            <b-form-input id="register-nom" @input="validateLibelleDepense" v-model="libelle_depense" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                                            <small :class="valideLibelleDepense ? 'block' : 'none'" class="text-danger">
                                                Vous devez renseigner le libellé
                                            </small>
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- icône -->
                                    <b-form-group label="Icône" label-for="register-nom">
                                        <validation-provider #default="{ errors }" name="icone" rules="">
                                            <b-form-input id="register-nom" v-model="icone" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="" />
                                            <!-- <small :class="valideIcone ? 'block' : 'none'" class="text-danger">
                            Vous devez renseigner le libellé du projet
                        </small> -->
                                        </validation-provider>
                                    </b-form-group>

                                    <!-- description -->
                                    <b-form-group>
                                        <label for="Description">Description</label>
                                        <b-form-textarea id="textarea" v-model="description" placeholder="" rows="5" max-rows="6"></b-form-textarea>
                                    </b-form-group>

                                    <!-- Form Actions -->
                                    <div class="d-flex mt-2">
                                        <b-button v-b-toggle.sidebar-invoice-add-new-customers v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" @click="saveTypeDepense">
                                            Ajouter
                                        </b-button>
                                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary">
                                            Annuler
                                        </b-button>
                                    </div>
                                </b-form>
                            </template>
                        </b-sidebar>
                        <!-- end sidebar add type depense -->
                    </b-card>
                </b-col>
            </b-row>
        </b-form>
    </validation-observer>
</template>

<script>
    import { BRow, BCol, BModal, BFormInput, BFormGroup, BButton, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import { required, email } from "@validations";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import { heightTransition } from "@core/mixins/ui/transition";
    import URL from "@/views/pages/request";
    import axios from "axios";
    import 'animate.css';
    import flatPickr from "vue-flatpickr-component";
    import { BFormFile } from "bootstrap-vue";

    export default {
        components: {
            flatPickr,
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
            BFormFile,
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
        mixins: [heightTransition],
        data() {
            return {
                icone: "",
                selectedFournisseur: "Selectionnez un fournisseur",
                fournisseurList: [],
                selectedTypeDepense: "",
                TypeDepenseList: [],
                file: null,
                picture: "",
                depenses: [],
                projets: [],
                projetItem: "",
                agences: [],
                agenceItem: "",
                employes: [],
                employeItem: "",
                departementItem: "",
                departements: [],
                comptes: [],
                selectedCompte: "",
                facture_fournisseur: "",
                libelle: "",
                libelle_depense: "",
                valideTypeDepense:false,
                // valideLibelle:"",
                valideLibelle: false,
                valideLibelleDepense: false,
                valideNumeroCompte: false,
                valideLibelleCompte: false,
                valideSoldeCompte: false,

                montant: "",
                valideMontant: "",
                montant_reglement: "",
                date_emission: "",
                valideDateEmission:false,
                fournisseur: "",
                description: "",
                date_reglement: "",
                note: "",
                valeurGood: false,
                valeurSup: false,

                date_remboursement: "",
                compte: "",
                creancier: "",
                // ValideCompte:"",
                valideMontant: "",
                valideTaux: "",
                valideEmprunt: "",
                valideDelai: "",
                valideEmail:false,

                valideContactNumber: "",
                valideRemboursement: "",
                valideContact:false,

                valideNom: false,
                valeur: "",
                valideValeur: false,
                // clientUpOption:
                newTaxeName: "",
                newTaxeValue: "",
                taxes: [],
                updateIndex: "",
                valideEditValeur: false,
                valideEditNom: false,
                edit_nom: "",
                edit_valeur: "",
                taxeUp: "",
                indexUp: "",
                valideExist: false,
                exist_text: "",
                valeurGood: false,
                valeurGoodR: false,
                valeurEditGood: false,

                date: null,
                dateDebut: null,
                valideDateDebut: false,

                ValideCreancier: false,
                compteList: [],
                creancierList: [],
                reglements: [],
                clients: [],

                reglementItem: {
                    date_reglement: "",
                    montant_reglement: "",
                    selectedCompte: "",
                    selectedCompteId: "",
                    note: "",
                },

                compte: {
                    solde: "",
                    numero_compte: "",
                    libelle: "",
                    description: "",
                },
                reglementStatus: [{ status: "Soldé" }, { status: "Partiel" }, { status: "A payer" }],

                option: [{ title: "Particulier" }, { title: "Entreprise" }],

                // clientUpOption: [{ title: "Particulier" }, { title: "Entreprise" }],

                montantValidation: false,

                nom: "",
                prenoms: "",
                email: "",
                localisation: "",
                contact: "",
                phone: "",
                edit_phone: "",
                contactFinal: "",
                indicatifFinal: "",
                selected: "Quel est votre status",
            };
        },
        async mounted() {

         document.title = 'Création d\'une depense'
            google.maps.event.addDomListener(window, 'load', initialize);

         
              	this.initTrHeight();
            try {
                const config = {
                    headers: {
                        Accept: "application/json",
                    },
                };


                const paramId = localStorage.getItem("paramItem");
                const param_id = {
                    item: paramId,
                };

                const typeParamId = localStorage.getItem("param_id");
                const type_param_id = {
                    id: typeParamId,
                };

                // const config = {
                //   headers: {
                //     'Accept': 'application/json'
                //   },
                // }

                await axios
                    .get(URL.COMPTE_LIST, config)
                    .then((response) => {
                        this.compteList = response.data[0];
                    })
                    .catch((error) => {
                        console.log(error);
                    }),
                    await axios
                        .get(URL.FOURNISSEUR_LIST, config)
                        .then((response) => {
                            this.fournisseurList = response.data[0];
                        })
                        .catch((error) => {
                            console.log(error);
                        }),
                    await axios
                        .get(URL.PARAMETRE_ITEM, config)
                        .then((response) => {
                            this.TypeDepenseList.push(response.data.type_depense_entreprise.concat(response.data.type_depense));
                            console.log(this.TypeDepenseList);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
            } catch (error) {
                console.log("ok");
                console.log(error);
            }
        },
        
created() {
		window.addEventListener('resize', this.initTrHeight);
	},
	destroyed() {
		window.removeEventListener('resize', this.initTrHeight);
	},
        methods: {

             initialize() {
                var input = document.getElementById('autocomplete_search');
                var autocomplete = new google.maps.places.Autocomplete(input);
               
                autocomplete.addListener('place_changed', function () {
                    var place = autocomplete.getPlace();
                    // place variable will have all the information you are looking for.
                    $('#lat').val(place.geometry['location'].lat());
                    $('#long').val(place.geometry['location'].lng());
                    localStorage.setItem('place', JSON.stringify(place)) 
                });
             },

            TypeParamId(id) {
                localStorage.setItem("param_id", id);
            },

            processFile(event) {
                this.picture = event.target.files[0];

                if (event.target.files.length !== 0) {
                    console.log(this.picture);
                }
            },

            updateItemForm(index, val) {
                const { id } = val;
                this.reglements[index].selectedCompteId = id;
                console.log(this.reglements);
            },

            isDigit(str) {
                return /^\d+$/.test(str);
            },

            isFloat(str) {
                return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
            },

            validateLibelle() {
                if (!this.libelle) {
                    this.valideLibelle = true;
                } else {
                    this.valideLibelle = false;
                }
            },
            validateLibelleDepense() {
                if (!this.libelle_depense) {
                    this.valideLibelleDepense = true;
                } else {
                    this.valideLibelleDepense = false;
                }
            },

              validateTypeDepense() {
                if (!this.selectedTypeDepense) {
                    this.valideTypeDepense= true;
                } else {
                    this.valideTypeDepense = false;
                }
            },
            valideMontantTotal() {
                let sum = parseFloat(this.montant);
                const montantTotal = sum.toFixed(2);
                let element = 0;
                for (let i = 0; i < this.reglements.length; i++) {
                    element += Number(this.reglements[i].montant_reglement);
                }
                if (montantTotal < element) {
                    this.montantValidation = true;
                    this.$swal({
                        icon: "error",
                        title: "Oops...",
                        text: "La somme des montants de remboursement est plus élévé que le montant total de l'emprunt !",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                        buttonsStyling: false,
                    }).then((result) => {
                        if (result.value) {
                            this.reglements.splice(this.reglements.length - 1, 1);
                            this.trTrimHeight(this.$refs.row[0].offsetHeight);
                        }
                    });
                } else {
                    this.montantValidation = false;
                }
            },

            validateDateEmission(){
                 if (!this.date_emission) {
                    this.valideDateEmission = true;
                } else {
                    this.valideDateEmission = false;
                }
            },

            validateDate(date, index) {
               
                if (date >= this.date_emission) {
                    return;
                } else {
                    this.dateAlert();
                    this.reglements.splice(index, 1);
                    this.trTrimHeight(this.$refs.row[0].offsetHeight);
                }
            },

            validateMontant() {
                if (!this.montant) {
                    this.valideMontant = true;
                } else {
                    this.valideMontant = false;
                }

                if (this.montant && this.isFloat(this.montant) === false) {
                    if (this.isDigit(this.montant) === false) {
                        this.valeurGood = true;
                    } else {
                        this.valeurGood = false;
                    }
                } else {
                    this.valeurGood = false;
                }
            },

            dateAlert() {
                this.$swal({
                    icon: "error",
                    title: "Oops...",
                    text: "La date de de remboursement doit etre une date qui vient après la date d'emprunt!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            if_exist() {
                for (let index = 0; index < this.parametres.length; index++) {
                    if (this.libelle == this.parametres[index].libelle) {
                        this.valideExist = true;
                        this.exist_text = "Ce nom existe déjà !";
                        index = this.parametres.length;
                    } else {
                        this.valideExist = false;
                    }
                }
            },
            //store type depense
            async saveTypeDepense(bvModalEvt) {
                try {
                    const config = {
                        headers: {
                            Accept: "application/json",
                        },
                    };

                    this.validateLibelleDepense();
                    this.if_exist();
                    if (this.valideLibelleDepense || this.valideExist) {
                        bvModalEvt.preventDefault();
                        // this.handleSubmit();
                    } else {
                        const data = {
                            libelle: this.libelle_depense,
                            icone: this.icone,
                            description: this.description,
                            // id: localStorage.getItem('param_id')
                        };
                        console.log(data);
                        await axios.post(URL.PARAMETRE_CREATE, data, config).then((response) => {
                            this.topEndTypeDepense();
                            this.$refs.sidebarTypeDepense.hide();
                            this.parametreData = response.data;
                            this.TypeDepenseList[0].push(data);
                            this.libelle_depense = "";
                            this.icone = "";
                            this.description = "";
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            //save compte reglement
            async saveCompte() {
                try {
                        this.validateNumeroCompte();
                     this.validateLibelleCompte();
                     this.validateSoldeCompte();
                    const data = this.compte;
                    const config = {
                        headers: {
                            Accept: "application/json",
                        },
                    };

                    await axios.post(URL.COMPTE_CREATE, data, config).then((response) => {
                        console.log(response.data);
                        this.topEndCompte();
                        this.$refs.sidebarCompte.hide();

                        axios
                            .get(URL.COMPTE_LIST, config)
                            .then((response) => {
                                this.compteList = response.data[0];
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
                } catch (error) {
                    console.log("trycatch error", error);
                }
            },

            //save fournisseur

            contactEntier(e) {
                this.contact = e;
                //    console.log(this.phone)
            },
            changer(e) {
                console.log(this.phone);
                this.contact.country.name = e.name;
            },


//   validateEmail() {
//                 // valid email regex pattern
//                 const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//                 if (!this.email.match(emailPattern) && this.email !== "") {
//                     this.valideEmail = true;
//                     this.erreur = true;
//                 } else {
//                     this.valideEmail = false;
//                     this.erreur = false;
//                 }
//             },
vider(){
    this.valideContact = false;
},
  validateContact() {
                this.contactFinal=this.contact.formatted
                if (!this.contactFinal) {
                    this.valideContact = true;
                   
                } else {
                    this.valideContact = false;
                   
                }

                if (this.contactFinal && this.contactFinal.length<8) {
                    this.valideContactNumber = true;
                    this.erreur = true;
                } else {
                    this.valideContactNumber = false;
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


               validateNumeroCompte() {
                if (!this.compte.numero_compte) {
                    this.valideNumeroCompte = true;
                } else {
                    this.valideNumeroCompte = false;
                }
            },

            validateLibelleCompte() {
                if (!this.compte.libelle) {
                    this.valideLibelleCompte = true;
                } else {
                    this.valideLibelleCompte = false;
                }
            },

              validateSoldeCompte() {
                if (!this.compte.solde) {
                    this.valideSoldeCompte = true;
                } else {
                    this.valideSoldeCompte = false;
                }
            },

            async saveFournisseur(bvModalEvt) {
                try {
                    // this.validateStatus();
                    // this.validateEmail();
                    this.validateNom();
                    // // this.validatePrenom();
                    this.validateContact();
                    // this.if_exist();
                    // Prevent modal from closing

                    if (!this.nom  ||  !this.contact ) {
                        bvModalEvt.preventDefault();
                        this.handleSubmit();
                    } else {
                        this.indicatifFinal = "+" + "" + this.contact.country.dialCode;
                        console.log(this.indicatifFinal);
                        if (this.selected.title == "Particulier") {
                            this.status_id = 1;
                        } else {
                            this.status_id = 2;
                        }
                        const newClient = {
                            nom: this.nom,
                            prenoms: this.prenoms,
                            contact: this.contact.formatted,
                            indicateur: this.indicatifFinal,
                             localisation: JSON.parse(localStorage.getItem('place')),
                            email: this.email,
                            type_client: this.status_id,
                        };
                        const config = {
                            headers: {
                                Accept: "application/json",
                            },
                        };
                          localStorage.removeItem('place')
                        await axios.post(URL.FOURNISSEUR_CREATE, newClient, config).then((response) => {
                            this.userData = response.data;
                            this.fournisseurList.push(newClient);
                            this.$refs.sidebarFournisseur.hide();
                        });
                        this.topEndFournisseur();
                        this.nom = "";
                        this.prenoms = "";
                        this.email = "";
                        this.phone = "";
                        this.localisation = "";
                        this.selected = "Quel est votre status";
                    }
                } catch (error) {
                    console.log(error.type);
                }
            },

            // hide() {
            //   // this.$router.push('#/depense-simple')
            //   this.$router.push("/depense-simple", () => {});
            // },

            addNewItemInItemForm() {
                this.valideMontantTotal();

                if (this.montantValidation) {
                    return;
                } else {
                    this.$refs.form.style.overflow = "hidden";
                    this.reglements.push(JSON.parse(JSON.stringify(this.reglementItem)));

                    this.$nextTick(() => {
                        this.trAddHeight(this.$refs.row[0].offsetHeight);
                        setTimeout(() => {
                            this.$refs.form.style.overflow = null;
                        }, 350);
                    });
                }
                
            },



            removeItem(index) {
                this.reglements.splice(index, 1);
                this.trTrimHeight(this.$refs.row[0].offsetHeight);
            },

            initTrHeight() {
            this.trSetHeight(null)
            this.$nextTick(() => {
            this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },

            async getParams(item) {
                localStorage.setItem("paramItem", item);

                const param_id = {
                    item: item,
                };

                const config = {
                    headers: {
                        Accept: "application/json",
                    },
                };

                await axios
                    .post(URL.DEPENSE_ITEM, param_id, config)
                    .then((response) => {
                        this.projets = response.data.projet;
                        this.employes = response.data.employe;
                        this.departements = response.data.departement;
                        this.agences = response.data.agence;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            projetId(id) {
                localStorage.setItem("projet_id", id);
            },

            //    projetId(id) {
            //   localStorage.setItem('projet_id', id)
            // },

            // save depense
            async save() {
                console.log(this.projetItem);

                try {
                    this.validateLibelle();
                    this.validateMontant();
                    this.valideMontantTotal();
                    this.validateDateEmission();
                    this.validateTypeDepense();

                    if (this.montantValidation) {
                        return;
                    } else {
                        if (this.erreur !== true) {
                            const data = {
                                libelle: this.libelle,
                                facture_fournisseur: this.facture_fournisseur,
                                compte_id: this.selectedCompte.id,
                                compte_libelle: this.selectedCompte.libelle,
                                type_depense: this.selectedTypeDepense.libelle,
                                montant_depense: this.montant,
                                // fournisseur: this.fournisseur,
                                fournisseur: this.selectedFournisseur.nom,

                                description: this.description,
                                date_emission: this.date_emission,
                                date_reglement: this.date_reglement,
                                montant_reglement: this.montant_reglement,
                                note: this.note,
                                count: this.reglements.length,
                                item: this.reglements,

                                projet_id: this.projetItem.id,
                                agence_id: this.agenceItem.id,
                                departement_id: this.departementItem.id,
                                employe_id: this.employeItem.id,

                                projet: this.projetItem.libelle,
                                agence: this.agenceItem.libelle,
                                departement: this.departementItem.libelle,
                                employe: this.employeItem.nom,
                            };
                            console.log(data);

                            this.marche = true;
                            const config = {
                                headers: {
                                    Accept: "application/json",
                                },
                            };

                            await axios.post(URL.DEPENSE_CREATE, data, config).then((response) => {
                                this.dataReturn = response.data;
                                this.topEndD();
                                this.$router.push("/liste-depense-simple");
                            });
                            this.marche = false;
                        } else {
                            this.error_global = true;
                            setTimeout(() => {
                                this.marche = false;
                            }, 300);
                        }
                    }
                } catch (error) {
                    console.log("trycatch error", error);
                    this.error_global = true;

                    setTimeout(() => {
                        this.marche = false;
                    }, 300);
                }
            },

            topEndCompte() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Compte enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            topEndFournisseur() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Fournisseur enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            topEndD() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Depense enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            topEndTypeDepense() {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Type depense enregistrée avec succès",
                    showConfirmButton: false,
                    timer: 1000,
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    buttonsStyling: false,
                });
            },

            if_exist() {
                for (let index = 0; index < this.taxes.length; index++) {
                    if (this.nom == this.taxes[index].libelle) {
                        this.valideExist = true;
                        this.exist_text = "Cette taxe existe déjà !";
                        index = this.taxes.length;
                    } else {
                        this.valideExist = false;
                    }
                }
            },
        },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";

    .add-new-client-header {
        padding: $options-padding-y $options-padding-x;
        color: $success;
        &:hover {
            background-color: rgba($success, 0.12);
        }
    }

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
