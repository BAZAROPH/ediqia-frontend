<template>
    <section>
        <b-row>
            <b-col lg="12">
                <div class="position-relative table-responsive table-base">
                    <b-card>
                        <b-row>
                            <!-- User Info: Left col -->
                            <b-col lg="6" class="d-flex justify-content-between flex-column">
                                <!-- User Avatar & Action Buttons -->
                                <div class="d-flex justify-content-start">
                                    <b-avatar size="104px" rounded />
                                    <div class="d-flex flex-column ml-1">
                                        <div class="mb-1">
                                            <h4 class="mb-0" v-if="infos">
                                                <span class="h2 p-0">
                                                    {{infos.nom | capitalize}}
                                                </span>
                                                <span class="p-0"> {{infos.prenoms}}</span>
                                            </h4>
                                            <h4 class="mb-0" v-else>
                                                <b-skeleton class="pr-2 pl-2 pt-2 mt-0" width="50%"></b-skeleton>
                                            </h4>

                                            <span class="card-text text-primary mt-2" v-if="infos">
                                                {{infos.email}}
                                            </span>
                                            <span class="card-text text-primary mt-2" v-else>
                                                <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                            </span>
                                        </div>
                                        <div class="d-flex flex-wrap" v-if="infos">
                                            <div v-if="!updateUser">
                                                <b-button v-if="user_role.toLowerCase()=='gestionnaire'" variant="primary" @click="update('oui')">
                                                    Modifier
                                                </b-button>
                                            </div>
                                            <div v-else>
                                                <b-button variant="success" @click="saveUpdate">
                                                    <span class="p-0 m-0" v-if="!updating">
                                                        Enregistrer
                                                    </span>
                                                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                </b-button>
                                                <b-button class="ml-1" variant="danger" @click="update('non')">
                                                    Annuler
                                                </b-button>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-wrap" v-else>
                                            <span class="mr-1">
                                                <b-skeleton class="pr-4 pl-4 pt-3 mt-0"></b-skeleton>
                                            </span>

                                            <!-- <span class="mr-1">
                                                <b-skeleton class="pr-4 pl-4 pt-3 mt-0"></b-skeleton>
                                            </span> -->
                                        </div>
                                    </div>
                                </div>

                                <!-- User Stats -->
                                <div class="d-flex align-items-center mt-3">
                                    <div>
                                        <h3 class="font-weight-bold">Coordonnées</h3>
                                        <hr />
                                        <table class="mt-2 mt-xl-0 w-100">
                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="MailIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Email</span>
                                                </th>
                                                <td class="pb-50 pl-4 text-capitalize">
                                                    {{infos.email}}
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </th>
                                                <td class="pb-50 text-capitalize">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="HomeIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Adresse</span>
                                                </th>
                                                <td class="pb-50 pl-4" v-if="!updateUser">
                                                    {{localisation}}
                                                </td>
                                                <td class="pb-50 pl-4" v-else>
                                                    <!-- <b-form-group class="p-0 m-0">
                                                        <b-form-input size="sm" class="m-0" id="basicInput" v-model="updateAdress" />
                                                    </b-form-group> -->
                                                    <small :class="valideAdress ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner une adresse valide
                                                    </small>
                                                    <div id="custom-search-input" class="mb-1">
                                                        <div class="input-group">
                                                            <input id="autocomplete_search" @input="initialize" name="autocomplete_search" :value="updateAdress" type="text" class="form-control" placeholder="Votre adresse" />
                                                            <input type="hidden" name="lat" />
                                                            <input type="hidden" name="long" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </th>
                                                <td class="pb-50 text-capitalize">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th>
                                                    <feather-icon icon="PhoneIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Indicatif</span>
                                                </th>
                                                <td class="pl-4" v-if="!updateUser">
                                                    {{infos.indicateur}}
                                                </td>
                                                <td class="pb-50 pl-4" v-else>
                                                    <small :class="valideIndicateur ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner l'indicatif
                                                    </small>
                                                    <b-form-group class="p-0 m-0">
                                                        <b-form-input size="sm" class="m-0" id="basicInput" v-model="updateIndicateur" />
                                                    </b-form-group>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th>
                                                    <feather-icon icon="PhoneIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Contact</span>
                                                </th>
                                                <td class="pl-4" v-if="!updateUser">
                                                    {{infos.contact}}
                                                </td>
                                                <td class="pb-50 pl-4" v-else>
                                                    <small :class="valideContact ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le contact
                                                    </small>
                                                    <b-form-group class="p-0 m-0">
                                                        <b-form-input size="sm" class="m-0" id="basicInput" v-model="updateContact" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </th>
                                                <td class="pb-50 text-capitalize">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50" v-if="user_role.toLowerCase()=='gestionnaire'">
                                                    <feather-icon icon="StarIcon" class="mr-75 text-jaune" />
                                                    <span class="font-weight-bold">Role</span>
                                                </th>
                                                <th class="pb-50" v-else>
                                                    <feather-icon icon="StarIcon" class="mr-75 text-success" />
                                                    <span class="font-weight-bold">Rôle</span>
                                                </th>
                                                <td class="pb-50 pl-4 text-capitalize" v-if="!updateUser">
                                                    {{user_role|capitalize}}
                                                </td>
                                                <td v-else class="pb-50 pl-4 pt-1">
                                                    <small :class="valideRole ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le role
                                                    </small>
                                                    <b-form-group>
                                                        <v-select v-model="selectedRole" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="roles" class="select-size-sm" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </th>
                                                <td class="pb-50 text-capitalize">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    <!-- </div> -->
                                </div>
                            </b-col>

                            <!-- Right Col: Table -->
                            <b-col lg="6">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <table class="mt-2 mt-xl-0 w-100">
                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="MenuIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Nom</span>
                                                </th>
                                                <td class="pb-50" v-if="!updateUser">
                                                    {{infos.nom | capitalize}}
                                                </td>
                                                <td class="pb-50" v-else>
                                                    <small :class="valideNom ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le nom
                                                    </small>
                                                    <b-form-group class="p-0 m-0">
                                                        <b-form-input size="sm" class="m-0" id="basicInput" v-model="updateNom" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="50%"></b-skeleton>
                                                </th>
                                                <td class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="LayersIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Prénom(s) </span>
                                                </th>
                                                <td class="pb-50" v-if="!updateUser">
                                                    {{infos.prenoms | capitalize}}
                                                </td>
                                                <td class="pb-50" v-else>
                                                    <small :class="validePrenom ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le prénom
                                                    </small>
                                                    <b-form-group class="p-0 m-0">
                                                        <b-form-input size="sm" class="m-0" id="basicInput" v-model="updatePrenom" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="50%"></b-skeleton>
                                                </th>
                                                <td class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="ListIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Sexe</span>
                                                </th>
                                                <td class="pb-50" v-if="!updateUser">
                                                    {{infos.sexe | capitalize}}
                                                </td>
                                                <td class="pb-50" v-else>
                                                    <small :class="valideSexe ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le sexe
                                                    </small>
                                                    <v-select v-model="selectedSexe" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="sexes" class="select-size-sm" />
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="50%"></b-skeleton>
                                                </th>
                                                <td class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="LoaderIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Poste</span>
                                                </th>
                                                <td class="pb-50" v-if="!updateUser">
                                                    {{infos.profession | capitalize}}
                                                </td>
                                                <td class="pb-50" v-else>
                                                    <small :class="validePoste ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le poste
                                                    </small>
                                                    <b-form-group class="p-0 m-0">
                                                        <b-form-input size="sm" class="m-0" id="basicInput" v-model="updatePoste" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="50%"></b-skeleton>
                                                </th>
                                                <td class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="CopyIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Date de naissance</span>
                                                </th>
                                                <td class="pb-50" v-if="!updateUser">
                                                    {{format_date(infos.date_naissance)}}
                                                </td>
                                                <td class="pb-50" v-else>
                                                    <b-form-group class="p-0 m-0">
                                                        <flat-pickr size="sm" v-model="updateDateNaissance" class="form-control" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="50%"></b-skeleton>
                                                </th>
                                                <td class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>

                                            <tr v-if="infos">
                                                <th class="pb-50">
                                                    <feather-icon icon="DollarSignIcon" class="mr-75" />
                                                    <span class="font-weight-bold">Date d'embauche</span>
                                                </th>
                                                <td class="pb-50" v-if="!updateUser">
                                                    <b-badge variant="light-success">
                                                        {{format_date(infos.date_embauche)}}
                                                    </b-badge>
                                                </td>
                                                <td class="pb-50" v-else>
                                                    <b-form-group class="p-0 m-0">
                                                        <flat-pickr size="sm" v-model="updateDateEmbauche" class="form-control" />
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0" width="50%"></b-skeleton>
                                                </th>
                                                <td class="pb-50">
                                                    <b-skeleton class="pr-2 pl-2 pt-0 mt-0"></b-skeleton>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="row mt-3" v-if="user_role.toLowerCase()=='gestionnaire'">
                                    <div class="col-lg-12">
                                        <b-card v-if="abonnement && user_createur" no-body :class="gratuit ? 'border-jaune m-auto pb-2' : 'border-primary m-auto pb-2'">
                                            <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
                                                <h5 class="mb-0">
                                                    Votre abonnement
                                                </h5>
                                                <b-badge :variant="gratuit ? 'light-jaune' : 'light-primary'">
                                                    {{ abonnement.libelle.toUpperCase()}}
                                                </b-badge>
                                                <small class="text-muted w-100">Souscrit le : {{ date_souscription}}</small>
                                            </b-card-header>

                                            <b-card-body class="mt-1">
                                                <ul class="list-unstyled my-1">
                                                    <li>
                                                        <span class="align-middle">Il vous reste : {{ duree_restante_abonnement }} Jour(s)</span>
                                                    </li>
                                                </ul>
                                                <b-button class="mt-1 p-1" v-if="gratuit" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" block>
                                                    {{faire}}
                                                </b-button>
                                                <b-button v-if="premium" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="mt-1" variant="primary" block>
                                                    Description
                                                </b-button>
                                            </b-card-body>
                                        </b-card>
                                        <b-skeleton-img class="h-100" v-else></b-skeleton-img>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>

                    <b-card>
                        <b-tabs class="text-center justified">
                            <b-tab>
                                <template #title>
                                    <feather-icon icon="KeyIcon" />
                                    <span>Sécurité</span>
                                </template>

                                <div class="m-2">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="row mt-1">
                                                <div class="col-lg-12">
                                                    <span class="h3">Modifiez votre mot de passe.</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <hr />
                                                </div>
                                            </div>

                                            <div class="row">
                                                <b-col cols="6" class="text-left m-auto">
                                                    <small :class="valideOld ? 'block alert-danger pl-2 pr-2 pt-1 pb-1 mb-1 rounded' : 'none'" class="text-danger text-center font-weight-bold">
                                                        Saisissez votre ancien mot de passe
                                                    </small>
                                                    <small :class="valideOldIncorrect ? 'block alert-danger pl-2 pr-2 pt-1 pb-1 mb-1 rounded' : 'none'" class="text-danger text-center font-weight-bold">
                                                        Mot de passe incorrecte
                                                    </small>
                                                    <b-form-group>
                                                        <b-input-group>
                                                            <b-form-input id="basic-password" :type="passwordFieldType" placeholder="Veuillez saisir votre mot de passe actuel" v-model="oldmdp" />
                                                            <b-input-group-append is-text>
                                                                <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <hr />

                                                    <small :class="valideVide ? 'block alert-danger pl-2 pr-2 pt-1 pb-1 rounded mb-1' : 'none'" class="text-danger text-center font-weight-bold">
                                                        Les deux champs sont obligatoires
                                                    </small>

                                                    <small :class="valideTaille ? 'block alert-danger pl-2 pr-2 pt-1 pb-1 rounded mb-1' : 'none'" class="text-danger text-center font-weight-bold">
                                                        Votre mot de passe doit contenir au moins 8 caractères
                                                    </small>

                                                    <b-form-group>
                                                        <b-input-group>
                                                            <b-form-input id="basic-password" :type="passwordFieldType" placeholder="Saisissez votre nouveau mot de passe" v-model="newmdp" />
                                                            <b-input-group-append is-text>
                                                                <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                    </b-form-group>

                                                    <div class="row mt-2">
                                                        <div class="col-lg-12 text-center">
                                                            <b-button type="submit" class="bg-indigo" block v-if="marche" disabled>
                                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            </b-button>

                                                            <b-button v-else type="submit" class="bg-indigo" block @click="reset">
                                                                Enregistrer
                                                            </b-button>
                                                        </div>
                                                    </div>
                                                </b-col>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>

                            <!--  -->
                            <b-tab>
                                <template #title>
                                    <feather-icon icon="RotateCcwIcon" />
                                    <span>Historiques</span>
                                </template>

                                <div class="m-2">
                                    <div class="row">
                                        <div class="col-lg-12 m-auto">
                                            <table class="responsive-table border rounded m-auto" style="border-collapse: separate;">
                                                <tr stye="" class="p-2" v-for="historique in historiques" :key="historique.id">
                                                    <td class="col-2 text-center">
                                                        <feather-icon :icon="historique.icon" size="16" class="mr-2" />
                                                    </td>

                                                    <td class="col-2 text-left">
                                                        <b-badge :variant="'light-'+historique.action_color" class="text-left">
                                                            <span class="text-left">{{historique.action}}</span>
                                                        </b-badge>
                                                    </td>

                                                    <td class="text-left col-2">
                                                        <span class="h5 p-0 m-0">{{historique.model}}</span>
                                                    </td>

                                                    <td class="text-left col-2">
                                                        <b-badge :variant="'light-'+historique.action_color" class="">
                                                            <span> ( {{historique.intitule}} )</span>
                                                        </b-badge>
                                                    </td>

                                                    <td class="text-left col-3">
                                                        <span class="">{{historique.date}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- <b-list-group >
                                                <b-list-group-item class="d-flex" v-for="historique in historiques" :key='historique.id'>
                                                    <span class="mr-1">
                                                        <feather-icon
                                                        :icon="historique.icon"
                                                        size="16"
                                                        />
                                                        <span class="pl-2">Vous avez effetué un(e)
                                                            <b-badge :variant="'light-'+historique.action_color" class="ml-1 mr-1">
                                                                <span>{{historique.action}}</span>
                                                            </b-badge>
                                                             sur
                                                             <span class="ml-1 h5">{{historique.model}}</span>
                                                            <b-badge  :variant="'light-'+historique.color" class="ml-1">
                                                                <span> ({{historique.intitule}})</span>
                                                            </b-badge>
                                                            <span class="ml-2">{{historique.date}}</span>
                                                        </span>
                                                    </span>
                                                </b-list-group-item>
                                            </b-list-group> -->
                                        </div>
                                    </div>
                                </div>
                            </b-tab>
                            <b-tab>
                                <template #title>
                                    <feather-icon icon="CpuIcon" />
                                    <span>Sessions</span>
                                </template>
                                <table class="table table-bordered" style="border-radius: 32px;">
                                    <thead class="">
                                        <tr>
                                            <th class="align-middle" scope="col">#</th>
                                            <th class="align-middle" scope="col">Navigateur</th>
                                            <th class="align-middle" scope="col">Système d'exploitation</th>
                                            <th class="align-middle" scope="col">Adresse IP</th>
                                            <th class="align-middle" scope="col">Dernière connexion</th>
                                            <!-- <th class="align-middle" scope="col">Action</th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="" v-for="(item, index) in items" :key="item.id">
                                            <!-- {{item}} -->
                                            <th scope="row">{{index+1}}</th>

                                            <td class="text-left col-lg-3">
                                                <div class="row">
                                                    <div class="col-lg-3">
                                                        <img :src="item.browser.image" width="20" height="20" alt="" class="d-flex" />
                                                    </div>
                                                    <div class="col-lg-9">
                                                        {{item.browser.name}}
                                                    </div>
                                                </div>
                                            </td>

                                            <td>{{ item.os }}</td>

                                            <td>
                                                <b-badge variant="light-success">
                                                    {{ item.ip.adresse }}
                                                </b-badge>
                                            </td>

                                            <td>
                                                {{item.date}}
                                            </td>

                                            <!-- <td v-if="item.session_id != session_connected.id">
                                                <b-button v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant="flat-danger" class="btn-icon">
                                                    <feather-icon icon="TrashIcon" />
                                                </b-button>
                                            </td> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </section>
</template>

<script>
    import {
        BCard,
        BTable,
        BProgress,
        BFormGroup,
        BButton,
        BListGroup,
        BInputGroupPrepend,
        BAvatar,
        BRow,
        BCol,
        BModal,
        BListGroupItem,
        BFormInput,
        VBModal,
        BForm,
        BLink,
        BFormCheckbox,
        BInputGroup,
        BInputGroupAppend,
        BImg,
        BFormFile,
    } from "bootstrap-vue";
    import { avatarText } from "@core/utils/filter";
    import Ripple from "vue-ripple-directive";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import vSelect from "vue-select";
    import URL from "@/views/pages/request";
    import axios from "axios";
    import moment from "moment";
    import { VueTelInput } from "vue-tel-input";
    import flatPickr from "vue-flatpickr-component";
    import { togglePasswordVisibility } from "@core/mixins/ui/forms";

    export default {
        components: {
            moment,
            BProgress,
            BTable,
            flatPickr,
            ToastificationContent,
            BFormFile,
            BCard,
            BButton,
            BRow,
            BCol,
            BInputGroupPrepend,
            BAvatar,
            VueTelInput,
            vSelect,
            BListGroupItem,
            BListGroup,
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

            // factureTotal,
        },
        mixins: [togglePasswordVisibility],
        computed: {
            passwordToggleIcon() {
                return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
            },
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                gratuit:false,
                premium:false,
                loading: true,
                abonnement:'',
                date_souscription:'',
                duree_restante_abonnement:'',
                faire:'',


                sessions: "",
                items: [],
                updating: false,
                selectedSexe: "",
                sexes: ["M", "F"],
                valideUser: false,
                valideNom: false,
                validePrenom: false,
                valideSexe: false,
                validePoste: false,
                valideAdress: false,
                valideContact: false,
                valideIndicateur: false,
                valideAdress: false,
                valideRole: false,

                updateNom: "",
                updatePrenom: "",
                updatePoste: "",
                updateDateNaissance: "",
                updateDateEmbauche: "",
                updateAdress: "",
                updateContact: "",
                updateIndicateur: "",

                updateUser: false,
                historiques: [],
                infos: "",
                localisation: "",
                user_role: "",
                valideVide: false,
                valideTaille: false,
                valideConform: false,
                newmdp: "",
                marche: false,
                oldmdp: "",
                valideOld: false,
                valideOldIncorrect: false,
                intitule: "",
                selectedRole: "",
                roles: [],
                locali: "",
                ini: false,
                updateID: "",
                location: "",
                session_connected: "",
            };
        },

        async mounted() {
            google.maps.event.addDomListener(window, "load", initialize);
            try {
                await axios.get(URL.CREATED_USER).then((res) => {
                    this.user_createur = res.data[0][0];
                });
                await axios.get(URL.CONNECTED_USER).then((res) => {
                    this.user_connecte = res.data[0].user_connecte;
                });
                await axios
                .get(URL.ENTREPRISE_INFO)
                .then((response) => {
                    this.returnData = response;
                })
                .catch((error) => {
                    console.log(error);
                });
                if (this.returnData.data) {
                    this.afficher = false;
                    this.entreprise = this.returnData.data[0].entreprise;
                    this.dateDeCreation = this.format_date(this.entreprise.created_at);
                    this.duree_restante_abonnement=this.returnData.data[0].nombre_jour_restant
                    this.abonnement=this.returnData.data[0].abonnement_info
                    this.date_souscription = this.format_date(this.returnData.data[0].abonnement_entreprise_pivot.created_at)
                    this.dateDeCreation_user_connecte = this.format_date(this.user_connecte.created_at);
                    if(this.abonnement.libelle=="gratuit"){
                        this.faire="Passer à la version premium"
                        this.gratuit = true
                        this.premium = false
                    }else{
                        this.faire="Renouveller l'abonnement"
                        this.gratuit = false
                        this.premium = true
                    }
                    console.log(this.faire)
                }


                let link = window.location.href;
                let data = {
                    id: "",
                };
                if (link.indexOf("?") > -1) {
                    link = link.split("?");
                    link = link[link.length - 1];
                    this.updateID = parseInt(link);
                    data = {
                        id: link,
                    };
                }
                // console.log(data.id)
                axios.post(URL.USER_CONNECTED_INFO_PROFILE, data).then((response) => {
                    this.returnData = response.data;
                    for (let elt of this.returnData.roles) {
                        this.roles.push({ title: elt.name, id: elt.id });
                    }
                    this.infos = this.returnData.utilisateur[0];
                    if (!this.updateID) {
                        this.updateID = this.infos.id;
                    }
                    this.selectedRole = { title: this.returnData.role.name, id: this.returnData.role.id };
                    this.sessions = this.returnData.session;
                    this.session_connected = this.returnData.session_connected[0];
                    // console.log(this.session_connected)
                    let cpt = 1;
                    this.sessions.forEach((element) => {
                        let browser = "";
                        let os = "";
                        let bimage = "";
                        bimage = require("@/assets/images/browsers/default.png");
                        let ip = element.ip_address;
                        let last_activity = new Date(element.last_activity * 1000);
                        // console.log(last_activity.toLocaleDateString("fr-FR"))
                        element.user_agent = element.user_agent.toLowerCase();
                        if (element.user_agent.indexOf("firefox") > -1) {
                            browser = "Mozilla Firefox";
                            bimage = require("@/assets/images/browsers/firefox.png");
                        } else if (element.user_agent.indexOf("chrome") > -1) {
                            browser = "Google Chrome";
                            bimage = require("@/assets/images/browsers/chrome.png");
                        } else if (element.user_agent.indexOf("explorer") > -1) {
                            browser = "Internet Explorer";
                            bimage = require("@/assets/images/browsers/ie.png");
                        } else if (element.user_agent.indexOf("safari") > -1) {
                            browser = "Safari";
                            bimage = require("@/assets/images/browsers/safari.png");
                        } else {
                            browser = "Inconnu";
                        }

                        if (element.user_agent.indexOf("iphone") > -1) {
                            os = "IOS IPhone";
                        } else if (element.user_agent.indexOf("mac") > -1) {
                            os = "Mac OSX";
                        } else if (element.user_agent.indexOf("windows") > -1) {
                            os = "Microsoft Windows";
                        } else if (element.user_agent.indexOf("ubuntu") > -1) {
                            os = "Ubuntu";
                        } else {
                            os = "Inconnu";
                        }
                        this.items.push({
                            id: cpt,
                            session_id: element.id,
                            browser: { name: browser, image: bimage },
                            os: os,
                            ip: { adresse: ip, variant: "success" },
                            date: this.format_date_with_H(last_activity),
                        });
                        cpt++;
                    });
                    this.gestionLocalisation();
                    let icon = "CastIcon";
                    let color = "primary";
                    let action_color = "primary";
                    let intitule = "Model";
                    this.returnData.historique.forEach((element) => {
                        let model = element.subject_type.replace("App\\Models\\", "");
                        if (model.toLowerCase() == "user") {
                            icon = "UserCheckIcon";
                            color = "info";
                        } else if (model.toLowerCase() == "Article") {
                            icon = "ArchiveIcon";
                            color = "warning";
                        }

                        if (element.subject[0]) {
                            if (model.toLowerCase() == "user") {
                                intitule = element.subject[0].nom + " " + element.subject[0].prenoms;
                            } else {
                                intitule = element.subject[0].libelle;
                            }
                        }

                        if (element.description.toLowerCase() == "updated") {
                            action_color = "warning";
                        } else if (element.description.toLowerCase() == "deleted") {
                            action_color = "danger";
                        } else if (element.description.toLowerCase() == "created") {
                            action_color = "success";
                        }

                        this.historiques.push({
                            color: color,
                            icon: icon,
                            model: model,
                            date: this.format_date_with_H(element.created_at),
                            id: element.id,
                            action: element.description,
                            action_color: action_color,
                            intitule: intitule,
                        });
                    });
                });
                this.user_role = localStorage.getItem("user_role");
            } catch (error) {
                console.log(error);
            }
        },

        methods: {
            gestionLocalisation() {
                if (typeof this.infos.localisation === "string") {
                    this.locate = JSON.parse(this.infos.localisation);
                    if (typeof this.locate != "object") {
                        this.locate = JSON.parse(this.locate)
                    }
                }
                // console.log(this.infos.localisation)
                // this.locate = this.infos.localisation
                this.infos.localisation = this.locate;
                // console.log(this.infos.localisation)
                this.localisation = this.infos.localisation.adr_address.replace(/<\/?[^>]+>/g, "");
                String.fromHtmlEntities = function (string) {
                    return (string + "").replace(/&#\d+;/gm, function (s) {
                        return String.fromCharCode(s.match(/\d+/gm)[0]);
                    });
                };
                this.localisation = String.fromHtmlEntities(this.localisation);
            },
            saveUpdate() {
                this.updating = true;
                this.validateNom();
                this.validatePrenom();
                this.validateSexe();
                this.validatePoste();
                this.validateAdress();
                this.validateContact();
                this.validateRole();
                this.validateIndicateur();
                if (!this.valideNom && !this.validePrenom && !this.valideSexe && !this.valideAdress && !this.validePoste && !this.valideContact && !this.valideRole) {
                    const data = {
                        user_id: this.updateID,
                        nom: this.updateNom,
                        prenoms: this.updatePrenom,
                        sexe: this.selectedSexe,
                        // 'indicateur' : this.,
                        contact: this.updateContact,
                        profession: this.updatePoste,
                        localisation: this.locali,
                        role: this.selectedRole.title,
                        date_naissance: this.updateDateNaissance,
                        date_embauche: this.updateDateEmbauche,
                        indicateur: this.updateIndicateur,
                    };
                    // console.log(data)
                    let message = "";
                    try {
                        axios.post(URL.USER_CONNECTED_OR_PERSONAL_UPDATE, data).then((response) => {
                            this.returnData = response.data;
                            message = this.returnData.message;
                            if (message) {
                                this.showToast("info", "top-right", message);
                                this.infos.nom = data.nom;
                                this.infos.prenomstePrenom = data.prenoms;
                                this.infos.sexe = this.selectedSexe;
                                this.infos.profession = data.profession;
                                this.infos.date_naissance = data.date_naissance;
                                this.infos.date_embauche = data.date_embauche;
                                this.infos.localisation = data.localisation;
                                this.gestionLocalisation();
                                this.infos.contact = data.contact;
                                this.infos.indicateur = data.indicateur;
                                this.updateUser = false;
                            } else {
                                this.showToast("danger", "top-right", "Une erreur est survenue");
                            }
                        });
                        if (!message) {
                            this.updating = false;
                        }
                    } catch (error) {
                        this.updating = false;
                        console.log(error);
                    }

                    // console.log(data)
                } else {
                    this.updating = false;
                }
            },
            validateNom() {
                if (!this.updateNom) {
                    this.valideNom = true;
                } else {
                    this.valideNom = false;
                }
            },
            validatePrenom() {
                if (!this.updatePrenom) {
                    this.validePrenom = true;
                } else {
                    this.validePrenom = false;
                }
            },
            validateSexe() {
                if (!this.selectedSexe) {
                    this.valideSexe = true;
                } else {
                    this.valideSexe = false;
                }
            },
            validatePoste() {
                if (!this.updatePoste) {
                    this.validePoste = true;
                } else {
                    this.validePoste = false;
                }
            },
            validateAdress() {
                this.locali = localStorage.getItem("locali");
                if (this.ini === true) {
                    if (this.locali === null) {
                        this.valideAdress = true;
                    } else {
                        this.valideAdress = false;
                        localStorage.removeItem("locali");
                    }
                } else {
                    this.locali = this.infos.localisation;
                }
            },
            validateContact() {
                if (!this.updateContact) {
                    this.valideContact = true;
                } else {
                    this.valideContact = false;
                }
            },
            validateIndicateur() {
                if (!this.updateIndicateur) {
                    this.valideIndicateur = true;
                } else {
                    this.valideIndicateur = false;
                }
            },
            validateRole() {
                if (!this.selectedRole) {
                    this.valideRole = true;
                } else {
                    this.valideRole = false;
                }
            },
            initialize() {
                this.ini = true;
                var input = document.getElementById("autocomplete_search");
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.addListener("place_changed", function () {
                    var place = autocomplete.getPlace();
                    // place variable will have all the information you are looking for.
                    $("#lat").val(place.geometry["location"].lat());
                    $("#long").val(place.geometry["location"].lng());
                    // this.localisation = place
                    localStorage.setItem("locali", JSON.stringify(place));
                });
            },
            update(parametre) {
                if (parametre == "oui") {
                    this.updateUser = true;
                    this.updateNom = this.infos.nom;
                    this.updatePrenom = this.infos.prenoms;
                    this.selectedSexe = this.infos.sexe;
                    this.updatePoste = this.infos.profession;
                    this.updateDateNaissance = this.infos.date_naissance;
                    this.updateDateEmbauche = this.infos.date_embauche;
                    this.updateAdress = this.localisation;
                    this.updateContact = this.infos.contact;
                    this.updateIndicateur = this.infos.indicateur;
                } else {
                    this.updateUser = false;
                }
            },
            showToast(variant, position, text) {
                this.$toast(
                    {
                        component: ToastificationContent,
                        props: {
                            title: "Mise à jour",
                            icon: "InfoIcon",
                            text: text,
                            variant,
                        },
                    },
                    {
                        position,
                    }
                );
            },
            format_date(value) {
                if (value) {
                    return moment(String(value)).format("DD - MM - YYYY");
                }
            },
            format_date_with_H(value) {
                if (value) {
                    return moment(String(value)).format("HH:mm:ss  /  DD-MM-YYYY");
                }
            },
            reset() {
                this.marche = true;
                if (!this.oldmdp) {
                    this.valideOld = true;
                    this.marche = false;
                } else {
                    this.valideOld = false;
                }
                if (!this.newmdp && !this.valideOld) {
                    this.valideVide = true;
                    this.marche = false;
                } else {
                    this.valideVide = false;
                    this.marche = false;
                }

                if (this.newmdp.length < 8 && !this.valideVide) {
                    this.valideTaille = true;
                    this.marche = false;
                } else {
                    this.valideTaille = false;
                }

                if (!this.valideVide && !this.valideTaille && !this.valideConform && !this.valideOld) {
                    const data = {
                        password: this.newmdp,
                        oldPassword: this.oldmdp,
                    };
                    try {
                        axios.post(URL.RESET_USER_CONNECT_PASSWORD, data).then((response) => {
                            this.returnData = response;
                            if (this.returnData.data.error) {
                                this.valideOldIncorrect = true;
                            } else {
                                this.valideOldIncorrect = false;
                                this.showToast("info", "top-right", "Mot de passe modifié avec succès !");
                                this.marche = false;
                                this.newmdp = "";
                                this.oldmdp = "";
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        // this.marche = false;
                    }
                }
            },
        },
        filters: {
            capitalize: function (value) {
                if (!value) return "";
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            },
        },
        setup() {
            return {
                avatarText,
            };
        },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-flatpicker.scss";

    .st {
        font-size: 10px;
    }
    .none {
        display: none;
    }
    .block {
        display: inline-block;
    }
</style>
