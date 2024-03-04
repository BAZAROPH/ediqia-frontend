<template>
	<section class="invoice-add-wrapper">
		<b-row class="invoice-add">
			<!-- Col: Left (Invoice Container) -->
			<b-col cols="12" xl="9" md="8">
				<b-form @submit.prevent>
					<b-card no-body class="invoice-preview-card">
						<!-- Header -->
						<b-card-body class="invoice-padding pb-0 px-3">
							<div
								class="d-flex align-items-center justify-content-between flex-md-row flex-column invoice-spacing mt-0"
							>
								<!-- Header: Left Content -->
								<div>
									<div class="logo-wrapper">
										<div class="upload-logo">
											<img id="logo-img" :src="entreprise_logo" alt="" />
										</div>
									</div>
								</div>

								<!-- Header: Right Content -->
								<div class="invoice-number-date mt-md-0 mt-2 pr-2">
									<div
										class="d-flex align-items-center justify-content-md-end mb-1"
									>
										<h2 class="font-weight-bold">
											Devis
										</h2>
										<!-- <b-input-group
                      class="input-group-merge invoice-edit-input-group disabled"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="invoice-data-id"
                        v-model="invoiceData.id"
                        disabled
                      />
                    </b-input-group> -->
									</div>
								</div>
							</div>
						</b-card-body>

						<b-row class="container mx-auto px-3">
							<b-col cols="12" xl="6">
								<b-form-group>
									<h5 class="font-weight-bold">
										Date d'émission
									</h5>
									<flat-pickr
										@input="validateDate"
										v-model="dateDefault"
										class="form-control"
									/>
								</b-form-group>
							</b-col>
							<b-col cols="12" xl="6">
								<b-form-group>
									<h5 class="font-weight-bold">
										Date d'échéance
									</h5>
									<flat-pickr
										@input="validateDate"
										v-model="dueDate"
										class="form-control"
									/>
								</b-form-group>
							</b-col>
						</b-row>
						<div
							v-if="date_alert"
							class="d-flex align-items-center justify-content-center"
						>
							<p class="text-danger">{{ date_alert }}</p>
						</div>

						<!-- Spacer -->
						<hr class="invoice-spacing" />

						<!-- Invoice Client & Payment Details -->
						<b-card-body class="invoice-padding pt-0">
							<b-row class="invoice-spacing">
								<!-- Col: Invoice To -->
								<b-col cols="12" xl="6" class="mb-lg-1">
									<h6 class="mb-2 text-uppercase font-weight-bold">
										Facture à:
									</h6>

									<!-- Select Client -->
									<v-select
										v-model="factureClient"
										:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
										:options="clientList"
										label="nom"
										input-id="invoice-data-client"
										:clearable="false"
										placeholder="Choisir un client"
									>
										<template #list-header>
											<li
												v-b-modal.add-new-client
												class="add-new-client-header d-flex align-items-center my-50"
											>
												<feather-icon icon="PlusIcon" size="16" />
												<span class="align-middle ml-25"
													>Ajouter un nouveau client</span
												>
											</li>
										</template>
									</v-select>

									<!-- Selected Client -->
									<div v-if="factureClient" class="mt-2">
										<h6 class="mb-2 text-uppercase font-weight-bold">
											Client :
										</h6>
										<h6 class="mb-25">
											Nom : {{ factureClient.nom }} {{ factureClient.prenoms }}
										</h6>
										<b-card-text class="mb-25">
											Adresse : {{ factureClient.adresse }}
										</b-card-text>
										<b-card-text class="mb-25">
											Contact : {{ factureClient.contact }}
										</b-card-text>
										<b-card-text class="mb-0">
											Email : {{ factureClient.email }}
										</b-card-text>
									</div>
								</b-col>

								<!-- Col: Payment Details -->
								<b-col
									xl="6"
									cols="12"
									class="mt-xl-0 mt-2 justify-content-end d-xl-flex d-block"
								>
									<div>
										<h6 class="mb-2 text-uppercase font-weight-bold">
											Entreprise:
										</h6>
										<table>
											<tbody>
												<tr>
													<td class="pr-1 font-weight-bolder">
														Nom:
													</td>
													<td>
														<span class="font-weight-bold">{{
															entrerpiseData.libelle
														}}</span>
													</td>
												</tr>
												<tr>
													<td class="pr-1 font-weight-bolder">
														Adresse:
													</td>
													<td>{{ entrerpiseData.adresse }}</td>
												</tr>
												<tr>
													<td class="pr-1 font-weight-bolder">
														Email:
													</td>
													<td>{{ entrerpiseData.email }}</td>
												</tr>
												<tr>
													<td class="pr-1 font-weight-bolder">
														Téléphone:
													</td>
													<td>{{ entrerpiseData.contact }}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</b-col>
							</b-row>
						</b-card-body>

						<!-- Items Section -->
						<b-card-body class="invoice-padding form-item-section">
							<div
								ref="form"
								class="repeater-form"
								:style="{ height: trHeight }"
							>
								<b-row
									v-for="(item, index) in invoiceData.items"
									:key="index"
									ref="row"
									class="pb-2"
								>
									<!-- Item Form -->
									<!-- ? This will be in loop => So consider below markup for single item -->
									<b-col cols="12">
										<!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
										<div class="d-none d-lg-flex">
											<b-row class="flex-grow-1 px-1">
												<!-- Single Item Form Headers -->
												<b-col cols="12" lg="5">
													Article
												</b-col>
												<b-col cols="12" lg="3">
													Cout
												</b-col>
												<b-col cols="12" lg="2">
													Qté
												</b-col>
												<b-col cols="12" lg="2">
													Prix
												</b-col>
											</b-row>
											<div class="form-item-action-col" />
										</div>

										<!-- Form Input Fields OR content inside bordered area  -->
										<!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
										<div class="d-flex border rounded">
											<b-row class="flex-grow-1 p-2">
												<!-- Single Item Form Headers -->
												<b-col cols="12" lg="5">
													<label class="d-inline d-lg-none">Article</label>
													<v-select
														v-model="item.itemTitle"
														:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
														:options="articlesList"
														label="libelle"
														:clearable="false"
														class="mb-2 item-selector-title"
														placeholder="Selectionner un article"
														@input="(val) => updateItemForm(index, val)"
													>
														<template #list-header>
															<li
																v-b-modal.add-new-article
																class="add-new-client-header d-flex align-items-center my-50"
															>
																<feather-icon icon="PlusIcon" size="16" />
																<span class="align-middle ml-25"
																	>Ajouter un nouvel article</span
																>
															</li>
														</template>
													</v-select>
												</b-col>
												<b-col cols="12" lg="3">
													<label class="d-inline d-lg-none">Cout</label>
													<b-form-input
														v-model="item.cout"
														type="number"
														class="mb-2"
														readonly
													/>
												</b-col>
												<b-col cols="12" lg="2">
													<label class="d-inline d-lg-none">Qté</label>
													<b-form-input
														v-model="item.qte"
														type="number"
														class="mb-2"
													/>
												</b-col>
												<b-col cols="12" lg="2">
													<label class="d-inline d-lg-none">Prix</label>
													<p class="mb-1">
														{{
															formatter.format(
																(item.prix = item.cout * item.qte)
															)
														}}
													</p>
												</b-col>
											</b-row>
											<div
												class="d-flex flex-column justify-content-between border-left py-50 px-25"
											>
												<feather-icon
													size="16"
													icon="XIcon"
													class="cursor-pointer"
													@click="removeItem(index)"
												/>
											</div>
										</div>
									</b-col>
								</b-row>
							</div>
							<b-row>
								<b-col cols="8">
									<b-button
										v-ripple.400="'rgba(255, 255, 255, 0.15)'"
										size="md"
										variant="primary"
										@click="addNewItemInItemForm"
									>
										Ajouter un article
									</b-button>
								</b-col>

								<b-col cols="4">
									<b-button
										id="form-item-settings-icon"
										v-ripple.400="'rgba(255, 255, 255, 0.15)'"
										variant="primary"
									>
										<div class="cursor-pointer">Remise / Taxe</div>

										<!-- Setting Item Form -->
										<b-popover
											ref="form-item-settings-popover"
											target="form-item-settings-icon"
											triggers="click"
											placement="lefttop"
										>
											<b-form @submit.prevent>
												<b-row>
													<!-- Field: Remise -->
													<b-col cols="12">
														<b-form-group
															label="Remise (%)"
															label-for="setting-item-discount"
														>
															<b-form-input
																id="setting-item-discount"
																value="null"
																type="number"
																v-model="invoiceRemise"
															/>
														</b-form-group>
													</b-col>

													<!-- Field: Tax 1 -->
													<b-col cols="12">
														<b-form-group
															label="Taxe (%)"
															label-for="setting-item-tax-1"
														>
															<v-select
																v-model="invoiceTaxe"
																:dir="
																	$store.state.appConfig.isRTL ? 'rtl' : 'ltr'
																"
																label="libelle"
																:options="taxesList"
																input-id="setting-item-tax-1"
																:clearable="true"
															/>
														</b-form-group>
													</b-col>

													<b-col
														cols="12"
														class="d-flex justify-content-between mt-1"
													>
														<b-button
															variant="outline-primary"
															@click="
																() => {
																	if (this.invoiceTaxe) {
																		this.invoiceData.taxe = this.invoiceTaxe;
																	}
																	if (this.invoiceRemise) {
																		this.invoiceData.remise = this.invoiceRemise;
																	}
																	$refs[`form-item-settings-popover`].$emit(
																		'close'
																	);
																}
															"
														>
															Appliquer
														</b-button>
														<b-button
															variant="outline-secondary"
															@click="
																() => {
																	$refs[`form-item-settings-popover`].$emit(
																		'close'
																	);
																}
															"
														>
															Annuler
														</b-button>
													</b-col>
												</b-row>
											</b-form>
										</b-popover>
									</b-button>
								</b-col>
							</b-row>
						</b-card-body>

						<!-- Invoice Description: Total -->
						<b-card-body class="invoice-padding pb-0">
							<b-row>
								<!-- Col: Sales Persion -->
								<b-col
									cols="12"
									md="4"
									class="mt-md-0 mt-3 d-flex align-items-center"
									order="2"
									order-md="1"
								>
								</b-col>

								<!-- Col: Total -->
								<b-col
									cols="12"
									md="8"
									class="mt-md-6 d-flex justify-content-end"
									order="1"
									order-md="2"
								>
									<div class="invoice-total-wrapper">
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Sous total:
											</p>
											<p
												v-if="invoiceData.items.length !== 0"
												class="invoice-total-amount"
											>
												{{ formatter.format(getSousTotal(invoiceData.items)) }}
											</p>
										</div>
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Remise:
											</p>
											<p class="invoice-total-amount">
												{{ invoiceData.remise }} %
											</p>
										</div>
										<div class="invoice-total-item">
											<p class="invoice-total-title">
												Taxe:
											</p>
											<p v-if="invoiceData.taxe" class="invoice-total-amount">
												{{ invoiceData.taxe.valeur }} %
											</p>
											<p v-if="!invoiceData.taxe" class="invoice-total-amount">
												0 %
											</p>
										</div>
										<hr class="my-50" />
										<div
											v-if="invoiceData.items.length !== 0"
											class="invoice-total-item"
										>
											<h5 class="invoice-total-title font-weight-bold">
												Total :
											</h5>
											<h4 class="invoice-total-amount">
												{{ formatter.format(sumArticles()) }}
											</h4>
										</div>
									</div>
								</b-col>
							</b-row>
						</b-card-body>

						<!-- Spacer -->
						<hr class="invoice-spacing" />

						<!-- Note -->
						<b-card-body class="invoice-padding pt-0">
							<span class="font-weight-bold">Note: </span>
							<b-form-textarea v-model="invoiceData.note" class="mt-1" />
						</b-card-body>
					</b-card>
				</b-form>
			</b-col>

			<!-- Right Col: Card -->
			<b-col cols="12" md="4" xl="3" class="invoice-actions mt-md-0 mt-2">
				<!-- Action Buttons -->
				<b-card>
					<!-- Button: Send Invoice -->
					<b-button
						v-ripple.400="'rgba(255, 255, 255, 0.15)'"
						variant="primary"
						class="mb-75"
						block
						@click="sendFactureEmail"
					>
						Envoyer
					</b-button>

					<!-- Button: DOwnload -->
					<b-button
						v-ripple.400="'rgba(113, 102, 240, 0.15)'"
						variant="outline-primary"
						class="mb-75"
						block
						@click="PreviewFacture"
					>
						Previsualiser
					</b-button>

					<!-- Button: Print -->
					<b-button
						v-ripple.400="'rgba(113, 102, 240, 0.15)'"
						variant="outline-primary"
						block
						@click="saveFacture"
					>
						Enregistrer
					</b-button>
				</b-card>
			</b-col>
		</b-row>

		<!-- ====== AJOUTER UN NOUVEAU CLIENT ======== -->
		<!-- select 2 demo -->
		<b-modal
			id="add-new-client"
			title="Ajouter un nouveau client"
			cancel-title="Annuler"
			ok-title="Ajouter"
			centered
			cancel-variant="outline-secondary"
			@ok="AddNewClient"
		>
			<b-form>
				<!-- Nom -->
				<b-form-group label="Nom" label-for="name">
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="name"
							v-model="newUser.nom"
							:state="errors.length > 0 ? false : null"
							placeholder="Enter votre nom"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Prénoms -->
				<b-form-group label="Prénoms" label-for="prenoms">
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="prenoms"
							v-model="newUser.prenoms"
							:state="errors.length > 0 ? false : null"
							placeholder="Enter vos prénoms"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Email -->
				<b-form-group label="Email" label-for="email">
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<b-form-input
							id="email"
							type="email"
							v-model="newUser.email"
							:state="errors.length > 0 ? false : null"
							placeholder="john@example.com"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Contact -->
				<b-form-group label="Zip Code" label-for="zip-code">
					<validation-provider
						#default="{ errors }"
						name="nom"
						rules="required"
					>
						<vue-tel-input
							id="contact"
							@country-changed="changer"
							@validate="contactEntier($event)"
							v-model="phone"
							:state="errors.length > 0 ? false : null"
							placeholder="000-000-000-000"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Localisation -->
				<b-form-group label="Localisation" label-for="localisation">
					<validation-provider
						#default="{ errors }"
						name="localisation"
						rules="required"
					>
						<b-form-input
							id="localisation"
							name="localisation"
							v-model="newUser.localisation"
							:state="errors.length > 0 ? false : null"
							class="text-center"
							placeholder="Abidjan, Angré RCI 0089 BP 00225"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Status -->
				<b-form-group>
					<v-select
						v-model="newUser.statut"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="title"
						:options="clientUpOption"
						placeholder="Choisir un statut pour le client"
					/>
				</b-form-group>
			</b-form>
		</b-modal>

		<!-- ====== AJOUTER UN NOUVEL ARTICLE ======== -->
		<!-- modal login-->
		<b-modal
			id="add-new-article"
			cancel-variant="outline-secondary"
			ok-only
			ok-title="Ajouter"
			cancel-title="Annuler"
			centered
			title="Ajouter un nouveau produit"
			@ok="AddNewArticle"
		>
			<b-form>
				<!-- Libellé -->
				<b-form-group label="Libellé">
					<validation-provider
						#default="{ errors }"
						name="libelle"
						rules="required"
					>
						<b-form-input
							id="libelle"
							v-model="newArticle.libelle"
							name="libelle"
							:state="errors.length > 0 ? false : null"
							placeholder="Libellé de l'article"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Categorie du produit -->
				<b-form-group label="Catégorie de l'article">
					<v-select
						v-model="newArticle.categorie"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						:options="categories"
						input-id="invoice-data-client"
						:clearable="false"
						label="libelle"
						placeholder="Choisir la catégorie du produit"
					>
						<template #list-header>
							<li
								v-b-toggle.sidebar-invoice-add-new-customer
								class="add-new-client-header d-flex align-items-center my-50"
							>
								<feather-icon icon="PlusIcon" size="16" />
								<span class="align-middle ml-25 addcat"
									>Ajouter une nouvelle catégorie</span
								>
							</li>
						</template>
					</v-select>
				</b-form-group>

				<!-- Type de produit -->
				<b-form-group label="Type de produit">
					<v-select
						v-model="newArticle.type"
						:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
						label="title"
						:options="optionType"
						placeholder="Renseigner le type du produit"
					/>
				</b-form-group>

				<!-- Poids et unité -->
				<b-row>
					<b-col>
						<!-- Poids -->
						<b-form-group label="Poids" label-for="register-nom">
							<validation-provider #default="{ errors }" name="poids" rules="">
								<b-form-input
									id="register-nom"
									v-model="newArticle.poids"
									name="register-nom"
									:state="errors.length > 0 ? false : null"
									placeholder="Poids du produit"
								/>
							</validation-provider>
						</b-form-group>
					</b-col>
					<b-col>
						<!-- Unité -->
						<b-form-group label="Unité de mesure">
							<v-select
								v-model="newArticle.unite"
								:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
								label="title"
								:options="optionUnite"
							/>
						</b-form-group>
					</b-col>
				</b-row>

				<!-- Prix achat et Prix de vente -->
				<b-row>
					<b-col>
						<b-form-group label="Prix d'achat">
							<validation-provider
								#default="{ errors }"
								name="prix_achat"
								rules="required"
							>
								<b-form-input
									id="prix_achat"
									v-model="newArticle.prix_achat"
									name="prix_achat"
									:state="errors.length > 0 ? false : null"
									placeholder="Prix d'achat"
								/>
							</validation-provider>
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group label-for="prix_vente" label="Prix de vente">
							<validation-provider
								#default="{ errors }"
								name="prix_ventet"
								rules="required"
							>
								<b-form-input
									id="prix_vente"
									v-model="newArticle.prix_vente"
									name="prix_vente"
									:state="errors.length > 0 ? false : null"
									placeholder="Prix de vente"
								/>
							</validation-provider>
						</b-form-group>
					</b-col>
				</b-row>

				<!-- lien video -->
				<b-form-group label-for="movie" label="Lien de vidéo">
					<validation-provider #default="{ errors }" name="movie">
						<b-form-input
							id="movie"
							v-model="newArticle.movie"
							name="movie"
							:state="errors.length > 0 ? false : null"
							placeholder="Lien d'une vidéo"
						/>
					</validation-provider>
				</b-form-group>

				<!-- Image du produit -->
				<div>
					<label for="">Image du produit</label>
					<b-form-file
						class="text-center mb-1"
						v-model="newArticle.file"
						@change="processFile2($event)"
						:state="Boolean(newArticle.file)"
						placeholder="Images du produit"
						drop-placeholder="Glisser un fichier ici..."
						multiple
					/>
				</div>

				<!-- Description du produit -->
				<b-form-group>
					<label for="taxeValue">Description </label>
					<b-form-textarea
						id="textarea"
						v-model="newArticle.description"
						placeholder="Entrer les details de l'article ici"
						rows="5"
						max-rows="6"
					>
					</b-form-textarea>
				</b-form-group>
			</b-form>
		</b-modal>
	</section>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api';
import { heightTransition } from '@core/mixins/ui/transition';
import Ripple from 'vue-ripple-directive';
import {
	BRow,
	BCol,
	BCard,
	BCardBody,
	BButton,
	BModal,
	BForm,
	BFormGroup,
	BFormInput,
	BInputGroup,
	BInputGroupPrepend,
	BFormTextarea,
	VBToggle,
	VBModal,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import flatPickr from 'vue-flatpickr-component';
import store from '@/store';
import URL from '@/views/pages/request';
import axios from 'axios';
import { VueTelInput } from 'vue-tel-input';
import 'animate.css';

export default {
	components: {
		BRow,
		BCol,
		BCard,
		BCardBody,
		BButton,
		BForm,
		BFormGroup,
		BFormInput,
		BInputGroup,
		BInputGroupPrepend,
		BFormTextarea,
		BModal,
		flatPickr,
		vSelect,
		VBModal,
		VueTelInput,
	},
	directives: {
		Ripple,
		'b-modal': VBModal,
		'b-toggle': VBToggle,
	},
	mixins: [heightTransition],
	async mounted() {
		document.title = 'Devis';
		this.initTrHeight();
		await axios
			.get(URL.ENTREPRISE_INFO)
			.then((res) => {
				this.entrerpiseData = res.data[0].entreprise;
				this.entreprise_logo = res.data[0].logo_entreprise;
				console.log('entrerpise', this.entrerpiseData);
				console.log('entrerpise logo', res.data[0].logo_entreprise);
			})
			.catch((error) => {
				console.log(error);
			});
		await axios
			.get(URL.CLIENT_LIST)
			.then((res) => {
				this.clientList = res.data[0];
				console.log('clients ', this.clientList);
			})
			.catch((error) => {
				console.log(error);
			});
		await axios
			.get(URL.ARTICLE_LIST)
			.then((res) => {
				this.articlesList = res.data[0];
				console.log('articles', this.articlesList);
			})
			.catch((error) => {
				console.log(error);
			});
		await axios
			.get(URL.TAXE_LIST)
			.then((res) => {
				this.taxesList = res.data[0];
				console.log('taxes', this.taxesList);
			})
			.catch((error) => {
				console.log(error);
			});
		await axios
			.get(URL.CATEGORIE_LIST)
			.then((response) => {
				this.categories = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	created() {
		window.addEventListener('resize', this.initTrHeight);
	},
	destroyed() {
		window.removeEventListener('resize', this.initTrHeight);
	},
	methods: {
		async sendFactureEmail() {
			const config = {
				headers: {
					Accept: 'application/json',
				},
			};
			const data = {
				client: this.factureClient.id,
				date_emission: this.dateDefault,
				date_echeance: this.dueDate,
				entreprise: this.entrerpiseData.id,
				items: this.invoiceData.items,
				vendeur: this.invoiceData.vendeur,
				description: this.invoiceData.note,
				total_ttc: this.invoiceData.facturePrixTotal,
				total_ht: this.invoiceData.facturePrixTotalHt,
				total_taxe: this.invoiceData.factureTotalTaxe,
				nombre_article: this.invoiceData.items.length,
				articles_id: this.invoiceData.articles_id,
				taxes_id: this.invoiceData.taxes_id,
				remise: this.invoiceData.remise,
			};
			console.log(data);
			await axios
				.post(URL.FACTURE_CREATE, data, config)
				.then((res) => {
					console.log('facture enregistré', res.data);
					this.saved_facture = res.data.factures[0];
					if (res.data) {
					}
				})
				.catch((error) => {
					console.log('api error', error.messagae);
				});
			setTimeout(async () => {
				const data2 = {
					client: this.factureClient.email,
					client_id: this.factureClient.id,
					id: this.saved_facture.id,
					entreprise_id: this.entrerpiseData.id,
				};
				console.log('information envoyé au backend', data2);
				await axios
					.post(URL.FACTURE_SENDEMAIL, data2)
					.then((res) => {
						console.log(res.data);
						console.log('response header', res.headers['content-type']);
					})
					.catch((error) => {
						console.log(error);
					});
			}, 500);
		},
		validateDate() {
			const date_creation = this.dateDefault;
			const date_fin = this.dueDate;
			if (date_creation > date_fin) {
				this.date_alert =
					"La date d'émission ne peut pas etre supérieur à la date d'écheance";
				console.log('changer la date de fin');
			} else {
				this.date_alert = null;
			}
		},
		addNewItemInItemForm() {
			this.$refs.form.style.overflow = 'hidden';
			this.invoiceData.items.push(
				JSON.parse(JSON.stringify(this.itemFormBlankItem))
			);
			// this.invoiceData.taxes_id.push(0)
			// console.log(this.invoiceData.taxes_id)

			this.$nextTick(() => {
				this.trAddHeight(this.$refs.row[0].offsetHeight);
				setTimeout(() => {
					this.$refs.form.style.overflow = null;
				}, 350);
			});
		},
		removeItem(index) {
			this.invoiceData.items.splice(index, 1);
			// this.invoiceData.totalTaxe.splice(index, 1)
			// this.invoiceData.taxes_id.splice(index, 1)
			this.trTrimHeight(this.$refs.row[0].offsetHeight);
		},
		initTrHeight() {
			this.trSetHeight(null);
			this.$nextTick(() => {
				this.trSetHeight(this.$refs.form.scrollHeight);
			});
		},
		// ***
		// FUNCTION TO UPLOAD LOGO
		// **
		chooseFile() {
			const input = document.querySelector('#input-file');
			input.click();
		},
		processFile(event) {
			this.choose = true;
			this.picture = event.target.files[0];
			if (event.target.files.length !== 0) {
				const picturePath = URL.createObjectURL(this.picture);
				const picture = document.querySelector('#logo-img');
				picture.src = picturePath;
			} else {
				const picture = document.querySelector('#logo-img');
				picture.src = '';
			}
		},
		deletePicture() {
			this.choose = false;
			this.picture = '';
			const picture = document.querySelector('#logo-img');
			picture.src = '';
		},
		// *****
		// ***
		// FUNCTION POUR AVOIR LE TOTAL DE TOUS LES ARTICLES AJOUTEES
		// ***
		sumArticles() {
			let price = '';

			for (let i = 0; i < this.invoiceData.items.length; i++) {
				price = this.invoiceData.items;
			}

			Array.prototype.sum = function(prop) {
				let total = 0;
				for (let i = 0, _len = this.length; i < _len; i++) {
					total += this[i][prop];
				}
				return parseFloat(total);
			};

			if (this.invoiceData.remise && this.invoiceData.taxe) {
				let totalWithRemise =
					price.sum('prix') -
					price.sum('prix') * (this.invoiceData.remise / 100);
				let num = parseFloat(
					totalWithRemise * (1 + this.invoiceData.taxe.valeur / 100)
				);
				this.invoiceData.facturePrixTotal = num.toFixed(2);
				return num.toFixed(2);
			} else if (this.invoiceData.remise && !this.invoiceData.taxe) {
				let totalWithRemise =
					price.sum('prix') -
					price.sum('prix') * (this.invoiceData.remise / 100);
				let num = parseFloat(totalWithRemise);
				this.invoiceData.facturePrixTotal = num.toFixed(2);
				return num.toFixed(2);
			} else if (!this.invoiceData.remise && this.invoiceData.taxe) {
				let totalWithoutRemise = price.sum('prix');
				let num = parseFloat(
					totalWithoutRemise * (1 + this.invoiceData.taxe.valeur / 100)
				);
				this.invoiceData.facturePrixTotal = num.toFixed(2);
				return num.toFixed(2);
			} else {
				this.invoiceData.facturePrixTotal = price.sum('prix');
				return parseFloat(price.sum('prix'));
			}

			// return parseFloat(price.sum('prix'))
		},

		// ***
		// **
		// FAIRE LA SOMME DES PRODUITS SANS LES TAXES NI LA REMISE
		// **
		// ***
		getSousTotal(arr) {
			let price = '';

			for (let i = 0; i < arr.length; i++) {
				price = arr;
			}

			Array.prototype.sum = function(prop, top) {
				let total = 0;
				for (let i = 0, _len = this.length; i < _len; i++) {
					total += this[i][prop] * this[i][top];
				}
				return total;
			};

			this.invoiceData.facturePrixTotalHt = price.sum('cout', 'qte');
			return price.sum('cout', 'qte');
		},

		// ***
		// **
		// FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
		// **
		async saveFacture() {
			if (!this.dateDefault) {
				// shake alert quand le champ date d'émission n'est pas rempli
				this.$swal({
					title: "Ajouter une date d'émission",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.dueDate) {
				// shake alert quand le champ date d'échéance n'est pas rempli
				this.$swal({
					title: "Ajouter une date d'échéance",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.factureClient) {
				// shake alert quand le champ client n'est pas rempli
				this.$swal({
					title: 'Ajouter un client',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.invoiceData.items[0]) {
				// shake alert quand le champ article n'est pas rempli
				this.$swal({
					title: 'Ajouter un article',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.invoiceData.items[0].itemTitle) {
				// shake alert quand le champ article n'est pas rempli
				this.$swal({
					title: 'Ajouter un article',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else {
				const config = {
					headers: {
						Accept: 'application/json',
					},
				};
				if (
					this.invoiceData.remise === null &&
					this.invoiceData.taxe === null
				) {
					const data = {
						client: this.factureClient.id,
						date_emission: this.dateDefault,
						date_echeance: this.dueDate,
						entreprise: this.factureClient.id,
						items: this.invoiceData.items,
						vendeur: this.invoiceData.vendeur,
						description: this.invoiceData.note,
						total_ttc: this.invoiceData.facturePrixTotal,
						total_ht: this.invoiceData.facturePrixTotalHt,
						nombre_article: this.invoiceData.items.length,
						articles_id: this.invoiceData.articles_id,
						type_facture: 'devis',
					};
					console.log(data);
					await axios
						.post(URL.FACTURE_CREATE, data, config)
						.then((res) => {
							console.log('facture enregistré', res.data);
							if (res.data) {
								this.confirmText();
							}
						})
						.catch((error) => {
							console.log('api error', error.messagae);
							this.errorText();
						});
				} else if (
					this.invoiceData.remise !== null &&
					this.invoiceData.taxe === null
				) {
					const data = {
						client: this.factureClient.id,
						date_emission: this.dateDefault,
						date_echeance: this.dueDate,
						entreprise: this.factureClient.id,
						items: this.invoiceData.items,
						vendeur: this.invoiceData.vendeur,
						description: this.invoiceData.note,
						total_ttc: this.invoiceData.facturePrixTotal,
						total_ht: this.invoiceData.facturePrixTotalHt,
						remise: this.invoiceData.remise,
						nombre_article: this.invoiceData.items.length,
						articles_id: this.invoiceData.articles_id,
						type_facture: 'devis',
					};
					console.log(data);
					await axios
						.post(URL.FACTURE_CREATE, data, config)
						.then((res) => {
							console.log('facture enregistré', res.data);
							if (res.data) {
								this.confirmText();
							}
						})
						.catch((error) => {
							console.log('api error', error.messagae);
							this.errorText();
						});
				} else if (
					this.invoiceData.remise === null &&
					this.invoiceData.taxe !== null
				) {
					const data = {
						client: this.factureClient.id,
						date_emission: this.dateDefault,
						date_echeance: this.dueDate,
						entreprise: this.factureClient.id,
						items: this.invoiceData.items,
						vendeur: this.invoiceData.vendeur,
						description: this.invoiceData.note,
						remise: this.invoiceData.remise,
						total_ttc: this.invoiceData.facturePrixTotal,
						total_ht: this.invoiceData.facturePrixTotalHt,
						total_taxe: this.invoiceData.taxe.valeur,
						nombre_article: this.invoiceData.items.length,
						articles_id: this.invoiceData.articles_id,
						taxes_id: this.invoiceData.taxe.id,
						type_facture: 'devis',
					};
					console.log(data);
					await axios
						.post(URL.FACTURE_CREATE, data, config)
						.then((res) => {
							console.log('facture enregistré', res.data);
							if (res.data) {
								this.confirmText();
							}
						})
						.catch((error) => {
							console.log('api error', error.messagae);
							this.errorText();
						});
				} else {
					const data = {
						client: this.factureClient.id,
						date_emission: this.dateDefault,
						date_echeance: this.dueDate,
						entreprise: this.factureClient.id,
						items: this.invoiceData.items,
						vendeur: this.invoiceData.vendeur,
						description: this.invoiceData.note,
						total_ttc: this.invoiceData.facturePrixTotal,
						total_ht: this.invoiceData.facturePrixTotalHt,
						total_taxe: this.invoiceData.taxe.valeur,
						remise: this.invoiceData.remise,
						nombre_article: this.invoiceData.items.length,
						articles_id: this.invoiceData.articles_id,
						taxes_id: this.invoiceData.taxe.id,
						type_facture: 'devis',
					};
					console.log(data);
					await axios
						.post(URL.FACTURE_CREATE, data, config)
						.then((res) => {
							console.log('facture enregistré', res.data);
							if (res.data) {
								this.confirmText();
							}
						})
						.catch((error) => {
							console.log('api error', error.messagae);
							this.errorText();
						});
				}
			}
		},
		// Alerte quand facture enregistré avec succès
		confirmText() {
			this.$swal({
				title: 'Succès',
				text: 'Votre facture a été enregistré avec succès',
				icon: 'success',
				showCancelButton: true,
				confirmButtonText: 'Nouveau devis',
				cancelButtonText: 'Liste des devis',
				customClass: {
					confirmButton: 'btn btn-primary',
					cancelButton: 'btn btn-outline-primary ml-1',
				},
				buttonsStyling: false,
			}).then((result) => {
				if (result.value) {
					this.trTrimHeight(this.$refs.row[0].offsetHeight);
					this.factureClient = null;
					this.dateDefault = null;
					this.dueDate = null;
					this.invoiceData.client = null;
					this.invoiceData.items = [];
					this.invoiceData.taxes_id = [];
					this.invoiceData.articles_id = [];
					this.invoiceData.date_emission = null;
					this.invoiceData.dateDefault = null;
					this.invoiceData.nombre_article = 0;
					this.invoiceData.note = 'Taper une note ici';
					this.invoiceData.facturePrixTotal = 0;
				} else {
					this.$router.push('/devis');
				}
			});
		},
		// Alerte quand facture non enregistré
		errorText() {
			this.$swal({
				title: 'Erreur',
				text: "Votre devis n'est pas enregistré, veillez rééssayer",
				icon: 'error',
				showCancelButton: true,
				confirmButtonText: 'Rééssayer',
				cancelButtonText: 'Annuler',
				customClass: {
					confirmButton: 'btn btn-primary',
					cancelButton: 'btn btn-outline-primary ml-1',
				},
				buttonsStyling: false,
			}).then((result) => {
				if (result.value) {
					this.saveFacture();
				} else {
					this.$router.push('/devis');
				}
			});
		},
		// ***
		// **
		// FUNTION QUI MONTRE TOUTES LES INFOS RECEUILLI DANS LA FACTURE
		// **
		sendFacture() {
			if (!this.dateDefault) {
				// shake alert quand le champ date d'émission n'est pas rempli
				this.$swal({
					title: "Ajouter une date d'émission",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.dueDate) {
				// shake alert quand le champ date d'échéance n'est pas rempli
				this.$swal({
					title: "Ajouter une date d'échéance",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.factureClient) {
				// shake alert quand le champ client n'est pas rempli
				this.$swal({
					title: 'Ajouter un client',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.invoiceData.items[0]) {
				// shake alert quand le champ article n'est pas rempli
				this.$swal({
					title: 'Ajouter un article',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.invoiceData.items[0].itemTitle) {
				// shake alert quand le champ article n'est pas rempli
				this.$swal({
					title: 'Ajouter un article',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else {
				this.invoiceData.client = this.factureClient;
				this.invoiceData.date_emission = this.dateDefault;
				this.invoiceData.date_echeance = this.dueDate;
				this.invoiceData.entreprise = this.entrerpiseData;
				this.invoiceData.logoEntreprise = this.picture;
				console.log('Facture envoyée ', this.invoiceData);
			}
		},
		// ***
		// **
		// FUNTION POUR PREVISUALISER LA FACTURE
		// **
		PreviewFacture() {
			if (!this.dateDefault) {
				// shake alert quand le champ date d'émission n'est pas rempli
				this.$swal({
					title: "Ajouter une date d'émission",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.dueDate) {
				// shake alert quand le champ date d'échéance n'est pas rempli
				this.$swal({
					title: "Ajouter une date d'échéance",
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.factureClient) {
				// shake alert quand le champ client n'est pas rempli
				this.$swal({
					title: 'Ajouter un client',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.invoiceData.items[0]) {
				// shake alert quand le champ article n'est pas rempli
				this.$swal({
					title: 'Ajouter un article',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else if (!this.invoiceData.items[0].itemTitle) {
				// shake alert quand le champ article n'est pas rempli
				this.$swal({
					title: 'Ajouter un article',
					customClass: {
						confirmButton: 'btn btn-primary',
					},
					showClass: {
						popup: 'animate__animated animate__shakeX',
					},
					buttonsStyling: false,
				});
			} else {
				this.invoiceData.client = this.factureClient;
				this.invoiceData.date_emission = this.dateDefault;
				this.invoiceData.date_echeance = this.dueDate;
				this.invoiceData.entreprise = this.entrerpiseData;
				this.invoiceData.logoEntreprise = this.picture;
				console.log(this.invoiceData);
				localStorage.setItem('facture', JSON.stringify(this.invoiceData));
				this.$router.push('/devis/view');
			}
		},

		// *****
		// ****
		// FUNCTION POUR AJOUT D'ARTICLE
		// ****
		// *****
		async AddNewArticle(bvModalEvt) {
			console.log('AddNewArticle');
			try {
				if (
					!this.newArticle.libelle ||
					!this.newArticle.type ||
					!this.newArticle.poids ||
					!this.newArticle.unite ||
					!this.newArticle.prix_achat ||
					!this.newArticle.prix_vente ||
					!this.newArticle.movie ||
					!this.newArticle.file ||
					!this.newArticle.description
				) {
					bvModalEvt.preventDefault();
				} else {
					const config = {
						headers: {
							Accept: 'application/json',
						},
					};
					const data = new FormData();
					data.append('image', this.newArticle.file);
					data.append('libelle', this.newArticle.libelle);
					data.append('action', 'nouveau');
					data.append('categorie', this.newArticle.categorie.id);
					data.append('category_id', this.newArticle.categorie.id);
					data.append('type', this.newArticle.type);
					data.append('prix_vente', this.newArticle.prix_vente);
					data.append('description', this.newArticle.description);
					data.append('prix_achat', this.newArticle.prix_achat);
					data.append('poids', this.newArticle.poids);
					data.append('lien_video', this.newArticle.movie);
					await axios
						.post(URL.ARTICLE_CREATE, data, config)
						.then((response) => {
							if (response.data) {
								axios
									.get(URL.ARTICLE_LIST)
									.then((res) => {
										if (res.data) {
											this.showAlert();
											console.log('article ajouté');
										}
										this.articlesList = res.data[0];
										console.log('articles', this.articlesList);
									})
									.catch((error) => {
										console.log(error);
									});
							}
							this.newArticle.libelle = '';
							this.newArticle.categorie = '';
							this.newArticle.type = '';
							this.newArticle.prix_vente = '';
							this.newArticle.description = '';
							this.newArticle.prix_achat = '';
							this.newArticle.poids = '';
							this.newArticle.movie = '';
							this.newArticle.unite = '';
						})
						.catch((error) => {
							console.log(error.message);
						});
				}
			} catch (error) {
				console.log('error:', error);
			}
		},

		// *****
		// ****
		// FUNCTION POUR AJOUT DE CLIENT
		// ****
		// *****
		async AddNewClient(bvModalEvt) {
			try {
				if (
					!this.newUser.nom ||
					!this.newUser.prenoms ||
					!this.newUser.email ||
					!this.newUser.contact ||
					!this.newUser.statut
				) {
					bvModalEvt.preventDefault();
				} else {
					this.indicatifFinal =
						'+' + '' + this.newUser.contact.country.dialCode;
					if (this.newUser.statut.title == 'Particulier') {
						this.status_id = 1;
					} else {
						this.status_id = 2;
					}
					const newClient = {
						nom: this.newUser.nom,
						prenoms: this.newUser.prenoms,
						contact: this.newUser.contact.formatted,
						indicateur: this.indicatifFinal,
						localisation: this.newUser.localisation,
						email: this.newUser.email,
						type_client: this.status_id,
					};
					await axios.post(URL.CLIENT_CREATE, newClient).then((response) => {
						this.clientList.push(response.data.client);
						this.$swal({
							title: 'Client ajouté avec succès',
							customClass: {
								confirmButton: 'btn btn-primary',
							},
							buttonsStyling: false,
						});
						this.newUser.nom = '';
						this.newUser.prenoms = '';
						this.newUser.email = '';
						this.newUser.contact = '';
						this.newUser.localisation = '';
						this.newUser.statut = '';
					});
				}
			} catch (error) {
				console.log('error:', error);
			}
		},

		// Alert When added new article
		showAlert() {
			this.$swal({
				title: 'Article ajouté avec succès',
				customClass: {
					confirmButton: 'btn btn-primary',
				},
				buttonsStyling: false,
			});
		},
	},
	setup() {
		const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice';

		// UnRegister on leave
		onUnmounted(() => {
			if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
				store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
		});

		const clients = ref([]);

		const itemFormBlankItem = {
			nom: null,
			cout: 0,
			taxe: 0,
			qte: 1,
			prix: 0,
		};

		const invoiceData = ref({
			id: 5037,
			client: null,
			entreprise: null,
			logoEntreprise: null,
			date_emission: null,
			date_echeance: null,

			// ? Set single Item in form for adding data
			items: [],
			articles_id: [],
			taxe: null,
			remise: null,
			taxes_id: null,
			// totalTaxe: [],
			nombre_article: 0,

			vendeur: '',
			facturePrixTotal: 0,
			facturePrixTotalHt: 0,
			factureTotalTaxe: 0,
			note: '50% à la livraison, 50% à la commande.\nNous vous remercions.',
			paiement: null,
		});

		// LISTE DES INFOS DE L'ENTREPRISE
		const entrerpiseData = ref('');
		const entreprise_logo = ref('');

		const updateItemForm = (index, val) => {
			const { prix_vente, id } = val;
			invoiceData.value.items[index].cout = prix_vente;
			invoiceData.value.items[index].qte = 1;
			invoiceData.value.articles_id[index] = id;
		};

		// ***
		// RECUPERE LA TAXE ET LA MODIFIE
		// **
		const updateItemTaxe = (index, val) => {
			const { valeur, id } = val;
			invoiceData.value.items[index].taxe = valeur;
			invoiceData.value.totalTaxe[index] = valeur;
			invoiceData.value.taxes_id[index] = valeur;
		};

		// *****
		// ***
		// VARIABLES DECLAREES PAR MOI - AIME
		// ***
		// *****
		// LISTE DES ARTICLES
		const articlesList = ref('');
		// LISTE DES TAXES
		const taxesList = ref('');
		// VARIABLES POUR UPLOAD LE LOGO
		const picture = ref('');
		const choose = ref('');
		// VARIABLES POUR LA LISTE DES CLIENTS
		const clientList = ref([]);
		const factureClient = ref(null);
		// VARIABLES POUR LES DATES
		const dateDefault = ref(0);
		const dueDate = ref(0);
		// VARIABLES POUR LES ARTICLES
		const articleBlank = ref({
			nom: null,
			cout: 0,
			taxe: 0,
			qte: 1,
			prix: 0,
		});

		const invoiceTaxe = ref(null);
		const invoiceRemise = ref(null);

		const date_alert = ref(null);

		const saved_facture = ref(null);

		const clientUpOption = ref([
			{ title: 'Particulier' },
			{ title: 'Entreprise' },
		]);

		// FUNCTION TO CONVERT NUMBER INTO CURRENCY
		const formatter = new Intl.NumberFormat('ci-CI', {
			style: 'currency',
			currency: 'XOF',
			minimumFractionDigits: 2,
		});

		const contactEntier = (e) => {
			newUser.value.contact = e;
		};

		const changer = (e) => {
			if (e.name) {
				newUser.value.contact.country.name = e.name;
			}
		};

		const processFile2 = (event) => {
			newArticle.value.file = event.target.files[0];
			if (event.target.files.length !== 0) {
				console.log(newArticle.value.file);
			}
		};

		// NEW USER DETAIL
		const newUser = ref({
			nom: '',
			prenoms: '',
			email: '',
			contact: '',
			localisation: '',
			statut: '',
		});

		// DATA FOR NEW USER CREATION
		const phone = ref('');
		const indicatifFinal = ref('');
		const status_id = ref(null);

		// NEW ARTICLE DETAILS
		const newArticle = ref({
			libelle: '',
			categorie: '',
			type: '',
			poids: '',
			unite: '',
			prix_achat: '',
			prix_vente: '',
			movie: '',
			file: null,
			description: '',
		});

		// DATA FOR NEW ARTICLE CREATION
		const optionUnite = ref(['Kg', 'Unité', 'Litre']);
		const optionType = ref(['Service', 'Produit']);
		const categories = ref([]);

		return {
			invoiceData,
			clients,
			updateItemForm,
			itemFormBlankItem,
			invoiceTaxe,
			invoiceRemise,
			entreprise_logo,
			// ***
			// VARIABLE QUE JAI AJOUTE
			// ***
			categories,
			processFile2,
			optionType,
			optionUnite,
			newArticle,
			status_id,
			indicatifFinal,
			phone,
			newUser,
			contactEntier,
			changer,
			clientUpOption,
			entrerpiseData,
			picture,
			choose,
			articleBlank,
			dateDefault,
			dueDate,
			clientList,
			factureClient,
			updateItemTaxe,
			articlesList,
			taxesList,
			date_alert,
			saved_facture,
			formatter,
		};
	},
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.invoice-add-wrapper {
	.add-new-client-header {
		padding: $options-padding-y $options-padding-x;
		color: $success;

		&:hover {
			background-color: rgba($success, 0.12);
		}
	}
}

.invoice-total-wrapper {
	max-width: 15rem !important;
}
</style>

<style lang="scss" scoped>
@import '~@core/scss/base/pages/app-invoice.scss';
@import '~@core/scss/base/components/variables-dark';

.invoice-total-wrapper {
	max-width: 15rem !important;
}

.form-item-section {
	background-color: $product-details-bg;
}

.form-item-action-col {
	width: 27px;
}

.repeater-form {
	// overflow: hidden;
	transition: 0.35s height;
}

.v-select {
	&.item-selector-title,
	&.payment-selector {
		background-color: #fff;

		.dark-layout & {
			background-color: unset;
		}
	}
}

.dark-layout {
	.form-item-section {
		background-color: $theme-dark-body-bg;

		.row .border {
			background-color: $theme-dark-card-bg;
		}
	}
}

.upload-logo {
	position: relative;
	border: 1px solid #6e6b7b;
	width: 100px;
	height: 100px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.upload-logo .upload {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.upload-logo .upload .upload-icon {
	width: 80%;
	height: 40px;
	margin: 15px auto 0;
}

.upload-logo .upload p {
	text-align: center;
	color: #6e6b7b;
	font-weight: 600;
}

.upload-logo #logo-img {
	width: 100%;
	height: 100%;
	border-radius: 10px;
	object-fit: cover;
	display: block;
}

.upload-logo #logo-img.visible {
	display: block;
}

.upload-logo #logo-img.invisible {
	display: none;
}

.upload-logo button {
	position: absolute;
	top: 0;
	right: 0;
	outline: none;
	background-color: #450077;
	color: white;
	border-radius: 8px;
	border: none;
	font-size: 12px;
	padding: 5px 10px;
}
</style>
