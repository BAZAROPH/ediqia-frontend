<template>
  <b-card>
    <b-container>
       <b-row>
          <!-- User Info: Left col -->
          <b-col
            cols="21"
            xl="6"
            class="d-flex justify-content-between flex-column"
          >
            <!-- User Avatar & Action Buttons -->
            <div class="d-flex justify-content-start">
              <b-avatar
                :src="userData.avatar"
                :text="avatarText(userData.name)"
                size="104px"
                rounded
              />
              <div class="d-flex flex-column ml-1">
                <div class="mb-1">
                  <h4 class="mb-0">
                    {{ userData.nom }} {{ userData.prenoms }}
                  </h4>
                  <span class="card-text">{{ userData.email }}</span>
                </div>
                
                <div class="d-flex flex-wrap">

                  <b-button
                    variant="primary"
                    v-b-modal.modal-update
                  
                  >
                    Modifier
                  </b-button>

                  <b-button
                    variant="outline-danger"
                    class="ml-1"
                    @click="deleteUser(userData.id)"
                  >
                    Supprimer
                  </b-button>
                </div>
              </div>
            </div> 
                   
          </b-col>

          <b-col lg="6">             
            <table class="mt-2 mt-xl-0 w-100">
              <tr>
                <th class="pb-50">
                  <feather-icon
                    icon="UserIcon"
                    class="mr-75"
                  />
                  <span class="font-weight-bold">Code</span>
                </th>
                <td class="pb-50">
                  {{ userData.code }}
                </td>
              </tr>
              <tr>
                <th class="pb-50">
                  <feather-icon
                    icon="CheckIcon"
                    class="mr-75"
                  />
                  <span class="font-weight-bold">Type</span>
                </th>
                <td class="pb-50 text-capitalize">
                  {{ userData.status_user }}
                </td>
              </tr>
              <tr>
                <th class="pb-50">
                  <feather-icon
                    icon="StarIcon"
                    class="mr-75"
                  />
                  <span class="font-weight-bold">Role</span>
                </th>
                <td class="pb-50 text-capitalize">
                  {{ userData.role }}
                </td>
              </tr>
              <tr>
                <th class="pb-50">
                  <feather-icon
                    icon="FlagIcon"
                    class="mr-75"
                  />
                  <span class="font-weight-bold">Adresse</span>
                </th>
                <td class="pb-50">
                  {{ userData.localisation }}
                </td>
              </tr>
              <tr>
                <th>
                  <feather-icon
                    icon="PhoneIcon"
                    class="mr-75"
                  />
                  <span class="font-weight-bold">Contact</span>
                </th>
                <td>
                  {{ userData.indicateur }} {{ userData.contact }}
                </td>
              </tr>
            </table>
          </b-col>

          <!-- debut Tab  -->
          <b-tabs  class="mt-50">

            <!-- tab detail employé -->
            <b-tab>
                <template #title>
                    <feather-icon icon="HomeIcon" />
                    <span>Détail sur l'employé</span>
                </template>   

                <b-row class="mt-50">
                  <b-col lg="12">
                    <b-row>
                        <b-col lg="4">
                          <!-- <feather-icon icon="LayersIcon" />
                          <span class="w-25 font-weight-bold">Paie</span> -->

                          <!-- <b-table-lite
                            stacked :items="item"
                            
                          /> -->

                            <div class="position-relative table-responsive table-base " >
                              <!-- Modal pour ajouter une nouvelle taxe -->
                              <feather-icon  icon="LayersIcon" />
                              <span class="w-25 font-weight-bold">Paie
                                  <feather-icon  variant="relief-secondary" v-b-modal.modal-login class="ml-50 dt" icon="EditIcon" />
                              </span>
                            

                              <b-modal id="modal-login" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="handleOk">
                                  <validation-observer ref="registerForm">
                                      <b-form class="auth-register-form mt-2">
                                          <!-- <div>
                                              <h5 class="text-danger text-center">{{permission_exist}}</h5>
                                          </div> -->

                                          <!-- Salaire -->
                                          <b-form-group label="Salaire" label-for="register-salaire">
                                            <validation-provider #default="{ errors }" name="salaire" rules="required">
                                                <b-form-input id="register-salaire" @input="validateSalaire" v-model="salaire" name="register-salaire" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideSalaire ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner le salaire
                                                </small>
                                            </validation-provider>
                                          </b-form-group>

                                            <!--No d'assurance-->
                                          <b-form-group label="No d'assurance" label-for="register-assurance">
                                            <validation-provider #default="{ errors }" name="numero_assurance" rules="required">
                                                <b-form-input id="register-assurance" @input="validateAssurance" v-model="assurance" name="register-assurance" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideAssurance ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner No d'assurance
                                                </small>
                                            </validation-provider>
                                          </b-form-group>

                                          <b-form-group label="Taux de renumeration" label-for="register-renumeration">
                                            <validation-provider #default="{ errors }" name="renumeration" rules="required">
                                                <b-form-input id="register-renumeration" @input="validateRenumeration" v-model="renumeration" name="renumeration" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideRenumeration ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner le taux de renumeration
                                                </small>
                                            </validation-provider>
                                          </b-form-group>

                                          <!-- <b-form-group label="Paie additionnelle" label-for="register-additionnelle">
                                            <validation-provider #default="{ errors }" name="additionnelle" rules="required">
                                                <b-form-input id="register-additionnelle" @input="validateAdditionnelle" v-model="paiAadditionnelle" name="paie-additionnelle" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideAdditionnelle ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner le paie additionnelle
                                                </small>
                                            </validation-provider>
                                          </b-form-group> -->

                                          <b-form-group label="Echéancier de paie" label-for="register-echeancier">
                                            <validation-provider #default="{ errors }" name="echeancier" rules="required">
                                                <b-form-input id="register-echeancier" @input="validateEcheancier" v-model="paieEcheancier" name="register-echeancier" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideEcheancier ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner l'echéancier de paie
                                                </small>
                                            </validation-provider>
                                          </b-form-group>                            
                                          
                                          <b-form-group label="Mode de paiemenet" label-for="register-mode-paiement">
                                            <validation-provider #default="{ errors }" name="mode-paiement" rules="required">
                                                <b-form-input id="register-mode-paiement" @input="validateModePaiment" v-model="modePaiment" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="validemodePaiment ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner le mode de paiement
                                                </small>
                                            </validation-provider>
                                          </b-form-group>
                                          

                                      </b-form>
                                  </validation-observer>
                              </b-modal>

                            </div>

                            <b-card>
                              <table class="table mt-50" >
                                <tbody class="text-align-left" >
                                  <tr>
                                    <td class="font-weight-bold ">Salaire</td>
                                    <td>100000</td>
                                  </tr>

                                  <tr>
                                    <td class="font-weight-bold">No d'assurance</td>
                                    <td>Otto</td>
                                  </tr>

                                  <tr>
                                    <td class="font-weight-bold">Taux de renumeration</td>
                                    <td>25000 FCFA/Heure</td>
                                  </tr>

                                  <tr>
                                    <td class="font-weight-bold">Paie additionnelle</td>
                                    <td></td>
                                  </tr>

                                  <tr>
                                    <td class="font-weight-bold">Echéancier de paie</td>
                                    <td>Otto</td>
                                  </tr>

                                  <tr>
                                    <td class="font-weight-bold">Mode de paiemenet</td>
                                    <td>Otto</td>
                                  </tr>
                                  
                                </tbody>
                            </table>
                            </b-card>
                            

                        </b-col>

                        <b-col lg="4">
                            <!-- <feather-icon icon="UserIcon" />
                            <span>Profil</span>
                              <b-table-lite
                              stacked :items="item1"
                          /> -->
                          
                          <div class="position-relative table-responsive table-base">
                              
                          <feather-icon icon="UserIcon" />
                            <span  class="font-weight-bold">Profil</span>
                            <feather-icon  variant="relief-secondary" v-b-modal.modal-login1 class="ml-50 dt" icon="EditIcon" />
                              <b-table-lite
                          />
                              <b-modal id="modal-login1" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="handleOk">
                                  <validation-observer ref="registerForm">
                                      <b-form class="auth-register-form mt-2">
                                          <!-- <div>
                                              <h5 class="text-danger text-center">{{permission_exist}}</h5>
                                          </div> -->

                                          <!-- Adresse -->
                                          <b-form-group label="Adresse" label-for="register-adresse">
                                            <validation-provider #default="{ errors }" name="adresse" rules="required">
                                                <b-form-input id="register-adresse" @input="validateAdresse" v-model="adresse" name="register-adresse" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideAdresse? 'block' : 'none'" class="text-danger">
                                                    Vous entrer l'adresse de l'employé
                                                </small>
                                            </validation-provider>
                                          </b-form-group>

                                          <b-form-group label="Email" label-for="register-mail">
                                            <validation-provider #default="{ errors }" name="mail" rules="required">
                                                <b-form-input id="register-mail" @input="validateEmail" v-model="Email" name="register-mail" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideEmail ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner l' email de l'employé
                                                </small>
                                            </validation-provider>
                                          </b-form-group>

                                          <b-form-group>
                                                  <label>
                                                      Date de naissance
                                                  </label>
                                                  <validation-provider #default="{  }" name="taux" rules="required">
                                                    <flat-pickr
                                                      v-model="date_naissance"
                                                      class="form-control"
                                                    />
                                                    <small :class="valideNaissance ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner la date de naissance de l'employé
                                                    </small>
                                                  </validation-provider>
                                          </b-form-group>

                                          <b-form-group label="Sexe" label-for="register-sexe">
                                            <validation-provider #default="{ errors }" name="sexe" rules="required">
                                                <b-form-input id="register-sexe" @input="validateSexe" v-model="sexe" name="register-sexe" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideSexe ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner le sexe
                                                </small>
                                            </validation-provider>
                                          </b-form-group>

                                          <b-form-group label="Situation matrimoniale" label-for="register-prenom">
                                            <validation-provider #default="{ errors }" name="prenom" rules="required">
                                                <b-form-input id="register-prenom" @input="validateSituationMatrimoniale" v-model="situation_matrimoniale" name="register-situation-matrimoniale" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideSituationMatrimoniale ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner la situation matrimoniale
                                                </small>
                                            </validation-provider>
                                          </b-form-group>                            
                                          
                                          <b-form-group label="Nombre d'enfant" label-for="register-prenom">
                                            <validation-provider #default="{ errors }" name="nombre-enfant" rules="required">
                                                <b-form-input id="register-prenom" @input="validateNombreEnfant" v-model="nombreEnfant" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                <small :class="valideNombreEnfant ? 'block' : 'none'" class="text-danger">
                                                    Vous devez renseigner le nombre d'enfant
                                                </small>
                                            </validation-provider>
                                          </b-form-group>
                                          

                                      </b-form>
                                  </validation-observer>
                              </b-modal>

                          </div>

                          <b-card>
                            <table class="table mt-50">
                            <tbody>
                              <tr>
                                <td class="font-weight-bold">Adresse</td>
                                <td></td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Email</td>
                                <td>Otto</td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Date de naissance</td>
                                <td>Otto</td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Sexe</td>
                                <td></td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Situation matrimoniale</td>
                                <td>Otto</td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Nombre d'enfant</td>
                                <td>Otto</td>
                              </tr>

                              <!-- <tr>
                                <td class="font-weight-bold">Contact</td>
                                <td>Otto</td>
                              </tr> -->

                              <!-- <tr>
                                <td class="font-weight-bold">téléphone</td>
                                <td>Otto</td>
                              </tr> -->
                              
                            </tbody>
                            </table>
                          </b-card>

                        </b-col>

                        <b-col lg="4">
                            <!-- <feather-icon icon="Edit2Icon" />
                            <span>Emploi</span>

                            <b-table-lite
                            stacked :items="item2"
                          /> -->
                          <!-- <feather-icon icon="Edit2Icon" />
                            <span  class="font-weight-bold">Emploi</span>

                            <b-table-lite
                          /> -->

                          <div class="position-relative table-responsive table-base">                           
                              <feather-icon icon="Edit2Icon" />
                              <span  class="font-weight-bold">Emploi</span>
                              <feather-icon  variant="relief-secondary" v-b-modal.modal-login2 class="ml-50 dt" icon="EditIcon" />
                              <b-table-lite/>  

                              <b-modal id="modal-login2" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="handleOk">
                                      <validation-observer ref="registerForm">
                                          <b-form class="auth-register-form mt-2">
                                              <!-- <div>
                                                  <h5 class="text-danger text-center">{{permission_exist}}</h5>
                                              </div> -->

                                              <!-- Identifiant -->
                                              <b-form-group label="Identifiant" label-for="register-Identifiant">
                                                <validation-provider #default="{ errors }" name="Identifiant" rules="required">
                                                    <b-form-input id="register-Identifiant" @input="validateIdentifiant" v-model="identifiant" name="register-Identifiant" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                    <small :class="valideIdentifiant ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner l'identifiant du l'employé 
                                                    </small>
                                                </validation-provider>
                                              </b-form-group>

                                              <b-form-group label="Etat" label-for="register-etat">
                                                <validation-provider #default="{ errors }" name="etat" rules="required">
                                                    <b-form-input id="register-etat" @input="validateEtat" v-model="etat" name="register-etat" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                    <small :class="valideEtat ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner l'etat de l'employé
                                                    </small>
                                                </validation-provider>
                                              </b-form-group>

                                              <b-form-group>
                                                  <label>
                                                      Date d'embauche
                                                  </label>
                                                  <validation-provider #default="{  }" name="date" rules="required">
                                                    <flat-pickr
                                                      v-model="date_embauche"
                                                      class="form-control"
                                                    />
                                                    <small :class="valideEmbauche ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner la date d'embauche de l'employé
                                                    </small>
                                                  </validation-provider>
                                              </b-form-group> 

                                              <b-form-group label="Lieu de travail" label-for="register-Lieu-travail">
                                                <validation-provider #default="{ errors }" name="travail" rules="required">
                                                    <b-form-input id="register-travail" @input="validateLieuTravail" v-model="travail" name="register-travail" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                    <small :class="valideLieuTravail ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le lieu de travail de l'employé
                                                    </small>
                                                </validation-provider>
                                              </b-form-group>

                                              <b-form-group label="Departement" label-for="register-departement">
                                                <validation-provider #default="{ errors }" name="departement" rules="required">
                                                    <b-form-input id="register-departement" @input="validateDepartement" v-model="departement" name="register-departement" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                    <small :class="valideDepartement ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le departement de l'employé
                                                    </small>
                                                </validation-provider>
                                              </b-form-group>                            
                                              
                                              <b-form-group label="Poste" label-for="register-poste">
                                                <validation-provider #default="{ errors }" name="poste" rules="required">
                                                    <b-form-input id="register-poste" @input="validatePoste" v-model="poste" name="register-poste" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                                    <small :class="validePoste ? 'block' : 'none'" class="text-danger">
                                                        Vous devez renseigner le poste de l'employé
                                                    </small>
                                                </validation-provider>
                                              </b-form-group>

                                              

                                          </b-form>
                                      </validation-observer>
                              </b-modal>

                              <!-- Tableau pour afficher les taxes -->
                              <!-- <div class="tableau">
                                  <table class="table position-relative table-card table-bordered mt-5 pt-3"> -->
                                      <!-- <b-button variant="relief-primary" v-b-modal.modal-login2 class="add-btn position-absolute">
                                          Modifier
                                      </b-button> -->

                                      <!-- <feather-icon  variant="relief-secondary" v-b-modal.modal-login2 class="add-btn position-absolute color-success" icon="EditIcon"/> -->
                                  <!-- </table>
                              </div> -->
                          </div>

                          <b-card>
                            <table class="table mt-50">
                              <tbody>
                                <tr>
                                  <td class="font-weight-bold">Identifiant</td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td class="font-weight-bold">Etat</td>
                                  <td>Otto</td>
                                </tr>

                                <tr>
                                  <td class="font-weight-bold">Date d'embauche</td>
                                  <td>Otto</td>
                                </tr>

                                <tr>
                                  <td class="font-weight-bold">Lieu de travail</td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td class="font-weight-bold">Departement</td>
                                  <td>Otto</td>
                                </tr>

                                <tr>
                                  <td class="font-weight-bold">Poste</td>
                                  <td>Otto</td>
                                </tr>

                                
                                
                              </tbody>
                            </table>
                          </b-card>
                          

                        </b-col>                     
                    </b-row>
                  </b-col>
                </b-row>
              
            </b-tab>

            <!-- end tab detail employé -->


            <!-- Tab liste de chèque de paie -->
            <b-tab>
                <template #title>
                    <feather-icon icon="LayersIcon" />
                    <span>Liste de paiement</span>
                </template>

                  <table class="table">

                            <thead>
                              <tr>
                                  <th>Libelle</th>
                                  <th>Montant</th>
                                  <th>Date</th>
                              </tr>
                            </thead>

                            <tbody>
                                <tr>
                                  <td class="font-weight-bold">Identifiant</td>
                                  <td>1 000000</td>
                                  <td>31/12/2021</td>
                                </tr>

                                                          
                            </tbody>
                  </table>
                  
            </b-tab>

            <!-- End tab Liste de chèque de paie -->

            <!-- tab coordonnée d'urgence -->
            <b-tab >
                <template #title>
                    <feather-icon icon="PhoneCallIcon" />
                    <span>Coordonnée d'urgence</span>
                </template>
                  <b-row>
                    
                    <b-col lg='6'>

                      
                        <div class="position-relative table-responsive table-base">
                            <!-- Modal pour ajouter une nouvelle taxe -->
                            <!-- <feather-icon  icon="LayersIcon" />
                            <span class="w-25 font-weight-bold">Paie</span> -->

                            <b-modal id="modal-login3" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="handleOk">
                                <validation-observer ref="registerForm">
                                    <b-form class="auth-register-form mt-2">
                                        <!-- <div>
                                            <h5 class="text-danger text-center">{{permission_exist}}</h5>
                                        </div> -->

                                        <!-- Nom complet 1 -->
                                        <b-form-group label="Nom complet 1" label-for="register-prenom">
                                          <validation-provider #default="{ errors }" name="nom" rules="required">
                                              <b-form-input id="register-prenom" @input="validateNomCompet1" v-model="NomComplet1" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                              <small :class="valideComplet1 ? 'block' : 'none'" class="text-danger">
                                                  Vous devez renseigner un nom
                                              </small>
                                          </validation-provider>
                                        </b-form-group>

                                          <b-form-group label="Relation" label-for="register-prenom">
                                          <validation-provider #default="{ errors }" name="prenom" rules="required">
                                              <b-form-input id="register-prenom" @input="validateRelation" v-model="relation" name="register-relation" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                              <small :class="valideRelation ? 'block' : 'none'" class="text-danger">
                                                  Vous devez renseigner une relation
                                              </small>
                                          </validation-provider>
                                        </b-form-group>

                                        <!-- <b-form-group label="Contact 1" label-for="register-prenom">
                                          <validation-provider #default="{ errors }" name="prenom" rules="required">
                                              <b-form-input id="register-prenom" @input="validateContact1" v-model="contact1" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                              <small :class="valideContact1 ? 'block' : 'none'" class="text-danger">
                                                  Vous devez renseigner un contact
                                              </small>
                                          </validation-provider>
                                        </b-form-group>

                                        <b-form-group label="Contact 2" label-for="register-prenom">
                                          <validation-provider #default="{ errors }" name="prenom" rules="required">
                                              <b-form-input id="register-prenom" @input="validateContact2" v-model="contact2" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                              <small :class="valideContact2 ? 'block' : 'none'" class="text-danger">
                                                  Vous devez renseigner un contact
                                              </small>
                                          </validation-provider>
                                        </b-form-group> -->

                                          <!-- contact -->
                                        <b-form-group label="Contact" label-for="register-contact">
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


                                         <!-- contact -->
                                        <b-form-group label="Contact" label-for="register-contact">
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

                            <!-- Tableau pour afficher les taxes -->
                            <div class="tableau">
                                <table class="table position-relative table-card table-bordered mt-5 pt-3">                                  
                                    <!-- <feather-icon  variant="relief-secondary" v-b-modal.modal-login class="add-btn position-absolute success" icon="EditIcon" /> -->
                                <!-- <feather-icon icon="EditIcon" class="bg-success" /> -->
                                      <!-- <feather-icon icon="HomeIcon" variant="relief-secondary" v-b-modal.modal-login class="add-btn position-absolute" /> -->

                                </table>
                            </div>
                          </div>




                          <b-card>
                            <table class="table">
                                <tbody>
                                    <tr>
                                      <td class="font-weight-bold">Nom complet 1</td>
                                      <td>Koffi jacques</td>
                                      <!-- <feather-icon icon="EditIcon" class="bg-success" /> -->
                                      <feather-icon  variant="relief-secondary" v-b-modal.modal-login3 class="add position-absolute dt" icon="EditIcon" />
                                    </tr>

                                    <tr>
                                      <td class="font-weight-bold">Contact 1</td>
                                      <td>Otto</td>
                                    </tr>

                                    <tr>
                                      <td class="font-weight-bold">Contact 2</td>
                                      <td></td>
                                    </tr>

                                    <tr>
                                      <td class="font-weight-bold">Relation</td>
                                      <td>Otto</td>
                                    </tr>                        
                                </tbody>
                          </table>
                          </b-card>
                          
                    </b-col>


                     <b-col lg='6'>

                        <div class="position-relative table-responsive table-base">
                            <!-- Modal pour ajouter une nouvelle taxe -->
                            <!-- <feather-icon  icon="LayersIcon" />
                            <span class="w-25 font-weight-bold">Paie</span> -->

                            <b-modal id="modal-login4" cancel-variant="outline-secondary" ok-title="Créer" cancel-title="Annuler" centered title="Modifier" @ok="handleOk">
                                <validation-observer ref="registerForm">
                                  
                                    <b-form class="auth-register-form mt-2">
                                        <!-- <div>
                                            <h5 class="text-danger text-center">{{permission_exist}}</h5>
                                        </div> -->

                                        <!-- Nom complet 2 -->
                                        <b-form-group label="Nom complet 2" label-for="register-prenom">
                                          <validation-provider #default="{ errors }" name="prenom" rules="required">
                                              <b-form-input id="register-prenom" @input="validateComplet2" v-model="nomComplet2" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                              <small :class="valideNomComplet2 ? 'block' : 'none'" class="text-danger">
                                                  Vous devez renseigner un nom
                                              </small>
                                          </validation-provider>
                                        </b-form-group>

                                        <b-form-group label="Relation" label-for="register-prenom">
                                          <validation-provider #default="{ errors }" name="prenom" rules="required">
                                              <b-form-input id="register-prenom" @input="validateEditPrenom" v-model="edit_prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                              <small :class="valideEditPrenom ? 'block' : 'none'" class="text-danger">
                                                  Vous devez renseigner le paie additionnelle
                                              </small>
                                          </validation-provider>
                                        </b-form-group> 

                                         <!-- contact -->
                                        <b-form-group label="Contact" label-for="register-contact">
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

                                         <!-- contact -->
                                        <b-form-group label="Contact" label-for="register-contact">
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

                            <!-- Tableau pour afficher les taxes -->
                            <div class="tableau">
                                <table class="table position-relative table-card table-bordered mt-5 pt-3">                                  
                                    <!-- <feather-icon  variant="relief-secondary" v-b-modal.modal-login class="add-btn position-absolute success" icon="EditIcon" /> -->
                                <!-- <feather-icon icon="EditIcon" class="bg-success" /> -->
                                      <!-- <feather-icon icon="HomeIcon" variant="relief-secondary" v-b-modal.modal-login class="add-btn position-absolute" /> -->
                                      

                                </table>
                            </div>
                          </div>

                      <b-card>
                        <table class="table">
                          <tbody>
                              <tr>
                                <td class="font-weight-bold">Nom complet 2</td>
                                <td>Otto</td>
                                <!-- <feather-icon icon="EditIcon" class="bg-success" /> -->

                                <feather-icon  variant="relief-secondary" v-b-modal.modal-login4 class="add position-absolute dt" icon="EditIcon" />

                              </tr> 
                              <tr>
                                <td class="font-weight-bold">Téléphone 1</td>
                                <td>Otto</td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Téléphone 2</td>
                                <td></td>
                              </tr>

                              <tr>
                                <td class="font-weight-bold">Relation</td>
                                <td>Otto</td>
                              </tr>                             
                            
                          </tbody>
                        </table>
                      </b-card>
                      

                    </b-col>
                  </b-row>

            </b-tab>
            <!-- End tab coordonnée d'urgence -->

            <!-- Tab temps de travail -->
            <b-tab>
                <template #title>
                    <feather-icon icon="UserIcon" />
                    <span>Temps de travail</span>
                </template>

                <b-card-text>
                    Chocolate croissant cupcake croissant jelly donut. Cheesecake toffee apple pie chocolate bar biscuit tart croissant. Lemon drops danish cookie. Oat cake macaroon icing tart lollipop cookie sweet bear claw.
                </b-card-text>
                <b-card-text>
                    Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake cookie chupa chups marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream powder tootsie roll cake.
                </b-card-text>
            </b-tab>
            <!-- End tab temps de travail -->

            <!-- Tab congés et Abscence -->
            <b-tab>
                <template #title>
                    <feather-icon icon="LogOutIcon" />
                    <span>Congés et Abscence</span>
                </template>

                <b-card-text>
                    Chocolate croissant cupcake croissant jelly donut. Cheesecake toffee apple pie chocolate bar biscuit tart croissant. Lemon drops danish cookie. Oat cake macaroon icing tart lollipop cookie sweet bear claw.
                </b-card-text>
                <b-card-text>
                    Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake cookie chupa chups marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream powder tootsie roll cake.
                </b-card-text>
            </b-tab>

            <!-- End tab congés et Abscence -->


          </b-tabs>
          <!-- Fin tab -->



      </b-row>
    </b-container>
   



    <!-- Modal pour mettre à jour un employe -->
    
    <b-modal id="modal-update" cancel-variant="outline-secondary" ok-title="Modifier" cancel-title="Annuler" centered title="Modifier mon employe" @ok="updateUsers(userData.id)">
      <b-form class="auth-register-form mt-2">

          <!-- Role -->
          <b-form-group label="Role" label-for="entreprise-domaine">
              <validation-provider #default="{  }" name="nom" rules="required">
                  <v-select v-model="selectedEditRole" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name" :options="roles" placeholder="Selectionner un role" multiple/>

                  <small :class="valideEditRole ? 'block' : 'none'" class="text-danger">
                      Veuillez entrer le role de l'employe
                  </small>
              </validation-provider>
          </b-form-group>

          <!-- nom -->
          <b-form-group label="Nom" label-for="register-nom">
              <validation-provider #default="{ errors }" name="nom" rules="required">
                  <b-form-input id="register-nom" @input="validateEditNom" v-model="edit_nom" name="register-nom" :state="errors.length > 0 ? false:null" placeholder="Bazaroph" />
                  <small :class="valideEditNom ? 'block' : 'none'" class="text-danger">
                      Vous devez renseigner le nom de l'employé
                  </small>
              </validation-provider>
          </b-form-group>

          <!-- prenom -->
          <b-form-group label="Prénom" label-for="register-prenom">
              <validation-provider #default="{ errors }" name="prenom" rules="required">
                  <b-form-input id="register-prenom" @input="validateEditPrenom" v-model="edit_prenom" name="register-prenom" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                  <small :class="valideEditPrenom ? 'block' : 'none'" class="text-danger">
                      Vous devez renseigner le prénom de l'employé
                  </small>
              </validation-provider>
          </b-form-group>

          <!-- email -->
          <b-form-group label="Email" label-for="register-email">
              <validation-provider #default="{ errors }" name="Email" rules="required">
                  <b-form-input id="register-email" @input="validateEditEmail" v-model="edit_email" type="email" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                  <small :class="valideEditEmail ? 'block' : 'none'" class="text-danger">
                      Veuillez entrer l'email de l'employé
                  </small>
              </validation-provider>
          </b-form-group>


           <!-- password -->
                    <b-form-group label-for="register-password" label="Mot de passe">
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
          <b-form-group label="Contact" label-for="register-contact">
              <validation-provider #default="{ errors }" name="contact" rules="required">
                  <vue-tel-input id="register-contact" @country-changed="edit_changer" @validate="edit_contactEntier($event)" v-model="edit_phone" name="register-contact" :state="errors.length > 0 ? false:null" placeholder="000-000-000-000" />
                  <small :class="edit_valideContact ? 'block' : 'none'" class="text-danger">
                      Veuillez renseigner le contact de l'employé
                  </small>
                  <small :class="edit_valideContactNumber ? 'block' : 'none'" class="text-danger">
                      Ce numéro de téléphone n'est pas valide
                  </small>
              </validation-provider>
          </b-form-group>
      </b-form>
    </b-modal>



    
  </b-card>
</template>

<script>
import {
  BCard, BFormGroup, BButton, BAvatar, BRow, BCol, BModal, BFormInput, VBModal, BForm, BLink, BFormCheckbox, BInputGroup, BInputGroupAppend, BImg, BTabs, BTab, BCardText
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import vSelect from "vue-select";
import URL from '@/views/pages/request'
import axios from 'axios'
import { VueTelInput } from 'vue-tel-input'
import flatPickr from 'vue-flatpickr-component'

import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTableLite } from 'bootstrap-vue'
// import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    flatPickr,
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
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
    BTabs, 
    BTab,
    BCardText,
    BCardCode,
    BTableLite,
    
  },
  directives: {
    Ripple,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  mixins: [togglePasswordVisibility],

  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      contact: "",
      phone:'',
      edit_phone:'',
      contactFinal:'',
      passwordEdit:"",
      indicatifFinal:'',
      edit_contactFinal:"",
      edit_indicatifFinal:"",
      valideEditPassword: false,



      valideContactNumber: false,

      valideEditNom: false,
      valideEditPrenom: false,
      edit_valideContact: false,
      valideEditEmail: false,
      edit_valideContactNumber: false,
      userUp: "",
      returnData: "",
      user_exist: "",
      // users: [],
      roles:[],
      valideExiste: "",
      edit_nom: "",
      edit_prenom: "",
      edit_email: "",
      edit_contact: "",
      edit_index: "",

      id: "",
      user_id:"",
      updateIndex: "",

      valideRole:"",
      selectedRole: "",
      
      valideEditRole:"",
      selectedEditRole: "",


      salaire:'',
      valideSalaire:false,

      assurance:'',
      valideAssurance:false,

      renumeration:'',
      valideRenumeration:false,

      paiAadditionnelle:'',
      valideAdditionnelle:false,

      paieEcheancier:'',
      valideEcheancier:false,

      modePaiment:'',
      validemodePaiment:false,


  

      // item: [
      //   {
      //     Salaire: 40, N_assurance_Social: '12', Taux_de_renumeration:'12',Paie_additionnelle:'Oui',Echéance_de_paie:'non', Mode_de_paiement:'Chèque',
      //   },
               
      // ],

      //  item1: [
      //   {
      //     Adresse: 40, Email: '12', Date_de_Naissance:'12',Sexe:'Oui',Situation_matrimoniale:'non', Contact:'Chèque', Tel:'Chèque',
      //   },
               
      // ],

      // item2: [
      //   {
      //     Indentifiant_Employé: 40, Etat: '12', Date_d_embauche:'12',Lieu_de_travail:'Oui', Departement_de_travail:'non', Poste:'Chèque', 
      //             },
               
      // ],
    }
  },

    async handleOk(bvModalEvt) {
        this.validateName()
        try {
            this. validateSalaire();
            this. validateAssurance();
            this. validateRenumeration();
            this. validateAdditionnelle();
            this. validateEcheancier();
            this. validateModePaiment();
            // this.if_exist();
          
            // if (this.valideName ) {
            //     bvModalEvt.preventDefault();
            //     this.handleSubmit();
            // } 
            
            // else {
              
            //     const newPermission= {
            //         name: this.name,
            //         // description:this.description
            //     };
            //     this.topEnd();
            //       console.log(newPermission)
            //     await axios.post("https://api.qenium.com/api/permission/store", newPermission,this.config).then((response) => {
            //         // this.userData = response.data;
            //         console.log(this.name)
            //     });
            //         this.allpermission.push(this.name);
            //           this.name = "";
            // }

        } catch (error) {
            console.log(error);
        }
    },






   async mounted() {
     document.title = 'Page détail employé'
    try {                
        await axios
            .get(URL.EMPLOYE_LIST)
            .then((response) => {
                // this.users = response.data.listeEmploye;
                this.roles = response.data.listeRole;
                console.log(this.returnData)
            })
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

      validateSalaire(){
        if(!this.salaire){
        this.valideSalaire =true
        }else{
        this.valideSalaire = false
        }
      },

      validateAssurance(){
        if(!this.assurance){
        this.valideAssurance =true
        }else{
        this.valideAssurance = false
        }
      },


      validateRenumeration(){
        if(!this.renumeration){
        this.valideRenumeration =true
        }else{
        this.valideRenumeration = false
        }
      },

      validateAdditionnelle(){
        if(!this.paiAadditionnelle){
        this.valideAdditionnelle =true
        }else{
        this.valideAdditionnelle = false
        }
      },

      validateEcheancier(){
        if(!this.paieEcheancier){
        this.valideEcheancier =true
        }else{
        this.valideEcheancier = false
        }
      },


      validateModePaiment(){
        if(!this.modePaiment){
        this.validemodePaiment =true
        }else{
        this.validemodePaiment = false
        }
      },











      deleteUser(id) {
        try {
          const data = {
            id: id,
          };
          const config = {
            headers: {
              'Accept': 'application/json'
            },
          }

          this.$swal({
            title: 'Etes-vous sur ?',
            text: "Supprimer cet employe de la liste!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1',
            },
            buttonsStyling: false,
          }).then(async (result) => {
            if (result.value) {
              await axios.post(URL.EMPLOYE_DETROY, data, config).then((response) => {
                if (response.data) {
                  this.$router.push('/employes')
                  localStorage.removeItem('employe')
                }
              }).catch((error) => {
                console.log('api error', error)
              })
              this.$swal({
                icon: 'success',
                title: 'Supprimé !',
                text: 'employé a été supprimé.',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            }
          })
        } catch (error) {
          console.log('trycatch error', error)
        }
      },

      // update(indice) {
      //   this.userUp = this.users[indice];
      //   this.edit_nom = this.userUp.nom;
      //   this.edit_prenom = this.userUp.prenoms;
      //   this.edit_email = this.userUp.email;
      //   this.edit_index = indice;
      //   this.user_id = this.userUp.id;
      // },


     validateEditPassword() {
        if (!this.passwordEdit || this.passwordEdit.length < 8) {
            this.valideEditPassword = true;
            this.erreur = true;
        } else {
            this.valideEditPassword = false;
            this.erreur = false;
        }
      },


      async updateUsers(user_id) {

        this.edit_contactFinal=this.edit_contact.formatted
        // const index = this.edit_index;
        const userId = user_id
        this.edit_validateContact();
        this.validateEditPrenom();
        this.validateEditNom();
        this.validateEditRole();
        this.validateEditPassword();
        
        if ( this.valideEditNom || this.valideEditPrenom  || this.edit_valideContactNumber || this.edit_valideContact || this.valideEditRole ||this.valideEditPassword) {
            // bvModalEvt.preventDefault();
        } else {
            {
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
                                user_id: user_id,
                                // id: userId,
                                nom: this.edit_nom,
                                prenoms: this.edit_prenom,
                                email: this.edit_email,
                                contact: this.edit_contactFinal,
                                indicateur:this.edit_indicatifFinal,
                                password:this.passwordEdit,
                                
                                
                            };
                            console.log(this.userId)
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
                            // this.users[index].nom = this.edit_nom;
                            // this.users[index].prenoms = this.edit_prenom;
                            // this.users[index].email = this.edit_email;
                            // this.users[index].contact =this.edit_contactFinal;
                            // this.users[index].indicateur=this.edit_indicatifFinal
                            // this.users[index].role = this.selectedRole;
                        } catch (error) {
                            console.log(error.type);
                        }
                    }
                });
                // this.selectedRole = "";
            }
        }
      },

    //   updateUsers(Id) {
    //       const userId = Id
    //       this.$swal({
    //         title: "Êtes vous sûr de vouloir enregistrer",
    //         text: "Les modificiations seront prises en compte",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: 'Oui, modifier !',
    //         cancelButtonText: 'Annuler',
    //       customClass: {
    //         confirmButton: "btn btn-primary",
    //         cancelButton: "btn btn-outline-danger ml-1",
    //       },
    //        buttonsStyling: false,
    //      }).then((result) => {
    //     if (result.value) {
    //       try {
  
    //         const data = {
    //           id: userId,
    //           role: this.selectedEditRole[0].name,
    //           nom: this.edit_nom,
    //           prenoms: this.edit_prenom,
    //           email: this.edit_email,
    //           contact: this.edit_contactFinal,
    //           indicateur:this.edit_indicatifFinal

              
    //         }
    //         console.log(this.edit_nom, 'fou')
    //         const config = {
    //           headers: {
    //             'Accept': 'application/json'
    //           },
    //         }
    //         axios.post("https://api.qenium.com/api/updateUser", data, config).then((response) => {
    //           if(response.data) {
    //             axios.get("https://api.qenium.com/api/employe/").then((response) => {
    //               const listeClient = response.data[0]
    //               this.userData = listeClient.filter(item => item.id === this.userData.id)
    //             }).catch((error) => {
    //               console.log(error.response.data.errors);
    //             })
    //           }
    //         }).catch((error) => {
    //           if (error.response) {
    //             console.log('api error', error)
    //           }
    //         })
    //       } catch (error) {
    //         console.log('trycatch error', error);
    //       }
    //     }
    //   })
    // },










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

      validateEditEmail() {
        // valid email regex pattern
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!this.edit_email.match(emailPattern) && this.edit_email !== "") {
            this.valideEditEmail = true;
        } else {
            this.valideEditEmail = false;
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

      validateEditNom() {
          if (!this.edit_nom) {
              this.valideEditNom = true;
          } else {
              this.valideEditNom = false;
          }
      },

      validateEditPrenom() {
        if (!this.edit_prenom) {
            this.valideEditPrenom = true;
        } else {
            this.valideEditPrenom = false;
        }
      },

      edit_changer(e){
        console.log(this.phone)
        this.edit_contact.country.name=e.name 
      },

      edit_contactEntier(e){
          this.edit_contact=e
      //    console.log(this.phone)
      },
       

        
  },
  
  setup() {
    return {
      avatarText,
    }
  },

}
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
    @import "@core/scss/vue/libs/vue-select.scss";
    @import '@core/scss/vue/libs/vue-flatpicker.scss';

    
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
    .dt{
      color: green;
    }
</style>
