<template>
  <div class="bv-example-row mb-3">
    <b-card>
      <!-- 
        -
        -
        - HEADER MENU
        -
        -
       -->
      <div class="mx-1">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label
              class="text-bold"
              style="margin: 0px 1em 0px 0px; font-size: 16px; font-weight: 700"
              >{{ paramsHeader }} | {{ paramsSubHeader }} ({{ paramsData__data.count }})
            </label>

            <b-button
              variant="primary"
              @click="actionModal = 'e-add-parametre'"
              v-b-modal.e-add-parametre
            >
              <feather-icon icon="PlusIcon" class="mx-auto" />
              Ajouter
            </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="state.filter"
                class="d-inline-block mr-1"
                placeholder="Rechercher par : client, montant, numero de facture"
              />
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- 
        -
        -
        - CONTENT
        -
        -
       -->
      <b-row>
        <!-- 
        -  MENU - VERTICAL OPTIONS
       -->
        <b-col
          class="accordion border border-bottom-0 border-top-0 border-left-0 mt-2"
          cols="3"
          role="tablist"
        >
          <div v-for="route in routeParams" :key="route.id">
            <span
              block
              v-b-toggle="'accordion-' + route.id"
              class="d-flex justify-content-between pr-1 py-1"
              variant="info"
            >
              <!-- <b-button variant="light"></b-button> -->
              <span>
                <feather-icon :icon="route.icon" size="16" class="mx-1 cursor-pointer" />
                <span>{{ route.name }}</span>
              </span>
              <span>
                <feather-icon
                  icon="ChevronDownIcon"
                  size="16"
                  class="mr- cursor-pointer"
                />
              </span>
            </span>
            <b-collapse
              :id="'accordion-' + route.id"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <div class="d-flex flex-column px-1">
                <b-button
                  class="p-50 text-left"
                  :variant="child.active === true ? 'primary' : 'light'"
                  style="margin-bottom: 10px; border-radius: 5px; font-size: 12px"
                  v-for="child in route.children"
                  :key="child.id"
                  @click="getParams(child.id, route.name, child.name)"
                  :disabled="child.id >= 100 ? true : false"
                  :class="child.id >= 100 ? '' : 'cursor-pointer'"
                >
                  <span class="text-left">{{ child.name }} </span>
                </b-button>
              </div>
            </b-collapse>
            <hr />
          </div>
        </b-col>

        <!-- 
        -  CONTENT LIST  - INFO
       -->
        <b-col cols="9">
          <div class="">
            <b-card-text>
              <!-- Loader -->
              <q-loader-table
                :success="state.success"
                :empty="state.empty"
                :warring="state.warring"
              />

              <b-table
                responsive
                primary-key="line"
                show-empty
                :items="paramsData"
                :currentPage="state.currentPage"
                :perPage="state.perPage"
                :fields="tableColumns"
                :filter="state.filter"
                v-if="state.success === true"
              >
                <template #cell(libelle)="data">
                  <feather-icon
                    :icon="
                      data.item.icone === null || data.item.icone === ''
                        ? 'ToolIcon'
                        : data.item.icone
                    "
                    class="cursor-pointer"
                    size="16"
                  />
                  <span class="ml-50"> {{ data.item.libelle }} </span>
                </template>

                <!-- Column: Actions -->
                <template #cell(actions)="data">
                  <div class="text-nowrap py-50">
                    <feather-icon
                      @click="
                        [(actionModal = 'e-edit-parametre'), (dataParamsEdit = data.item)]
                      "
                      v-b-modal.e-edit-parametre
                      :id="`invoice-row-${data.item.id}-preview-icon`"
                      icon="Edit3Icon"
                      size="16"
                      class="cursor-pointer"
                    />

                    <feather-icon
                      @click="paramsDestroy(data.item.id)"
                      :id="`invoice-row-${data.item.id}-send-icon`"
                      icon="TrashIcon"
                      class="mx-1 cursor-pointer"
                      size="16"
                    />

                    <!-- Dropdown -->
                    <b-dropdown
                      variant="link"
                      toggle-class="p-0"
                      no-caret
                      :right="$store.state.appConfig.isRTL"
                    >
                      <template #button-content>
                        <feather-icon
                          icon="MoreVerticalIcon"
                          size="16"
                          class="align-middle text-body"
                        />
                      </template>
                      <!-- <b-dropdown-item @click="editFac(data.item.id)">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Modifier</span>
            </b-dropdown-item> -->
                      <b-dropdown-item disabled>
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50"> Supprimer</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </template>
              </b-table>

              <!-- Paginator -->
              <div class="mx-2 mb-2">
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
                      v-model="state.currentPage"
                      :total-rows="paramsData.length"
                      :per-page="state.perPage"
                      first-number
                      last-number
                      class="mb-0 mt-1 mt-sm-0"
                      prev-class="prev-item"
                      next-class="next-item"
                      align="right"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </b-col>
                </b-row>
              </div>
            </b-card-text>
          </div>
        </b-col>
      </b-row>
    </b-card>

    <q-parametre-add
      :dataParamsEdit="dataParamsEdit"
      :actionModal="actionModal"
      :uidParams="uidParams"
    />
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted } from "@vue/composition-api";
import vSelect from "vue-select";
import axios from "axios";
import URL from "@/views/pages/request";
import Ripple from "vue-ripple-directive";
import qToast, { toast_error, toast_sucess } from "@/utils/qToast";
import Devis from "../devis/Devis.vue";
import QLoaderTable from "@/components/__partials/loaders/qLoaderTable.vue";
import QParametreAdd from "./qParametreAdd.vue";
import moment from "moment";

export default {
  components: {
    vSelect,
    QLoaderTable,
    QParametreAdd,
  },
  props: {
    dataCategorie: Object,
  },
  directives: {
    Ripple,
  },
  setup(props, { root }) {
    const state = reactive({
      currentPage: 1,
      perPage: 10,
      filter: "",
      warring: false,
      empty: false,
      success: false,
    });
    const dataParamsEdit = ref({});
    const actionModal = "";
    const tableColumns = reactive([
      {
        key: "line",
        label: "N°",
      },
      {
        key: "libelle",
        label: "Libelle",
      },
      {
        key: "created_at",
        label: "Date d'ajout",
      },
      {
        key: "actions",
        label: "Actions",
      },
    ]);
    const uidParams = ref(13);
    const paramsData = ref([]);
    const routeParams = reactive([
      {
        id: 1,
        name: "Depense",
        icon: "CornerLeftUpIcon",
        children: [
          {
            id: 13,
            name: "Type de depense",
            active: true,
          },
        ],
      },
      {
        id: 2,
        name: "Factures",
        icon: "LayersIcon",
        children: [
          {
            id: 101,
            name: "Entete",
            active: false,
          },
          {
            id: 102,
            name: "taxe",
            active: false,
          },
        ],
      },
      {
        id: 3,
        name: "Emprumt",
        icon: "CornerRightDownIcon",
        children: [
          {
            id: 18,
            name: "Type de creancier",
            active: false,
          },
        ],
      },
      {
        id: 4,
        name: "Catalogues",
        icon: "ShoppingBagIcon",
        children: [
          {
            id: 10,
            name: "Categories",
            active: false,
          },
          {
            id: 102,
            name: "unité",
            active: false,
          },
        ],
      },

      {
        id: 5,
        name: "Inscriptions",
        icon: "UserIcon",
        children: [
          {
            id: 7,
            name: "Devise",
            active: false,
          },
          {
            id: 17,
            name: "projet",
            active: false,
          },
          {
            id: 8,
            name: "Domaine d'activité",
            active: false,
          },
          {
            id: 9,
            name: "Taille de l'entreprise",
            active: false,
          },
        ],
      },

      {
        id: 6,
        name: "Autres",
        icon: "GitMergeIcon",
        children: [
          {
            id: 103,
            name: "loading...",
            active: false,
          },
        ],
      },
    ]);
    const isDataMounted = ref(false);
    const paramsHeader = ref("Depense");
    const paramsSubHeader = ref("Type");

    onMounted(() => {
      getParams(13, "Depénse", "type");
    });

    const getParams = async (uid, header, subHeader) => {
      isDataMounted.value = false;
      state.success = false;
      try {
        const { data } = await axios.post("http://127.0.0.1:8000/api/parametre", {
          id: uid,
        });

        uidParams.value = uid;

        for (let i = 0; i < routeParams.length; i++) {
          state.currentPage = 1;

          const route = routeParams[i];
          const child = routeParams[i].children;
          for (let r = 0; r < child.length; r++) {
            const r_child = child[r];

            r_child.active = false;
            if (r_child.id === uid) {
              r_child.active = true;
            }
          }
        }

        if (data) {
          paramsHeader.value = header;
          paramsSubHeader.value = subHeader;

          for (let i = 0; i < data.parametre.length; i++) {
            data.parametre.reverse();
            const el = data.parametre[i];
            console.log(el.icone);

            paramsData.value.push({
              id: el.id,
              id_type: el.type_parametre_id,
              line: i + 1,
              icone: el.icone,
              description: el.description,
              libelle: el.libelle,
              created_at: format_date(el.created_at),
            });
          }

          root.$store.commit("qParametre/LIST_PARAMETRES_DATA", paramsData.value, {
            root: true,
          });
          isDataMounted.value = true;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const paramsData__data = computed((uid, header, subHeader) => {
      if (isDataMounted.value === true) {
        if (root.$store.state.qParametre.dataParametre === 0) {
          state.success = false;
          state.empty = true;
        } else {
          state.success = true;
          state.empty = false;
        }
      }

      paramsData.value = root.$store.state.qParametre.dataParametre.filter(
        (paramsData) => {
          return paramsData.id_type === uidParams.value;
        }
      );
      return {
        data: paramsData.value,
        count: paramsData.value.length,
      };
    });

    const paramsDestroy = async (id) => {
      root
        .$swal({
          title: `Êtes vous sûr de vouloir supprimé le parametre ${id}`,

          text: "Aucun retour en arriére de sera posible",

          icon: "warning",

          showCancelButton: true,

          confirmButtonText: "Oui",

          customClass: {
            confirmButton: "btn btn-primary",

            cancelButton: "btn btn-outline-danger ml-1",
          },

          buttonsStyling: false,
        })
        .then(async (response) => {
          if (response.isConfirmed === true) {
            await axios
              .post(URL.PARAMETRE_DESTROY, { id: id })
              .then(({ data }) => {
                if (data) {
                  const dataParams = root.$store.state.qParametre.dataParametre;
                  const paramsLists__data = dataParams.filter((params) => {
                    return params.id !== id;
                  });
                  for (let i = 0; i < paramsLists__data.length; i++) {
                    const params = paramsLists__data[i];
                    params.line = i + 1;
                  }
                  root.$store.commit(
                    "qParametre/LIST_PARAMETRES_DATA",
                    paramsLists__data,
                    {
                      root: true,
                    }
                  );
                }

                toast_sucess(
                  root,
                  "success",
                  "top-right",
                  "Parametre suprimer avec sucéss !"
                );
              })
              .catch((error) => {
                toast_error(
                  root,
                  "danger",
                  "top-right",
                  "Oups, un erreur est survenu veillez ressayer !"
                );

                console.log(error);
              });
          }
        });
    };

    const format_date = (value) => {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    };

    return {
      routeParams,
      tableColumns,
      state,
      paramsData,
      getParams,
      uidParams,
      paramsData__data,
      paramsHeader,
      paramsSubHeader,
      format_date,
      actionModal,
      dataParamsEdit,
      paramsDestroy,
    };
  },
};
</script>

<style scoped>
/* CSS used here will be applied after bootstrap.css */
.panel a {
  color: #777;
}

.panel-scroll {
  max-height: 320px;
  overflow: hidden;
  overflow-y: auto;
}

.panel a:hover {
  text-decoration: none;
  color: #222;
}

.panel .table td {
  border-color: #f3f3f3;
}
</style>
