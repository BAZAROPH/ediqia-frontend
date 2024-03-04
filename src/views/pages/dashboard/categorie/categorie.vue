<template>
  <div>
    <b-card no-body class="px-1 py-2">
      <div class="mx-1 mb-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Entrées</label>
            <v-select
              v-model="state.perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            />
            <div class="" v-if="state.loading">
              <button class="btn btn-primary" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
            <div class="" v-else>
              <button class="btn btn-primary" v-b-modal.e-add-new-categorie>
                <feather-icon icon="PlusIcon" class="mx-auto" />
                Nouvelle categorie
              </button>
            </div>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="state.filter"
                class="d-inline-block mr-1"
                placeholder="Rechercher par : Libelle, nombre, date, description"
              />
            </div>
          </b-col>
        </b-row>
      </div>

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
        :items="dataCategorie"
        :currentPage="state.currentPage"
        :perPage="state.perPage"
        :fields="tableColumns"
        :filter="state.filter"
        v-if="state.success === true"
      >
        <template #cell(nombres)="data">
          <div class="my-50">
            {{ data.item.nombres }}
            <span style="font-size: 12px">{{
              data.item.nombres > 1 ? "Articles" : "Article"
            }}</span>
          </div>
        </template>
        <template #cell(date)="data">
          <div class="my-50">
            {{ format_date(data.item.created_at) }}
          </div>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <div class="text-nowrap">
            <feather-icon
              v-b-modal.e-edit-categorie
              :id="`invoice-row-${data.item.id}-send-icon`"
              icon="EditIcon"
              class="cursor-pointer"
              size="16"
              @click="editCategorie__req(data.item)"
            />
            <b-tooltip
              title="Modifier la categorie"
              class="cursor-pointer"
              :target="`invoice-row-${data.item.id}-send-icon`"
            />

            <feather-icon
              :id="`invoice-row-${data.item.id}-preview-icon`"
              :disabled="true"
              icon="EyeIcon"
              size="16"
              class="mx-1"
            />
            <b-tooltip
              title="Voir les articles"
              :target="`invoice-row-${data.item.id}-preview-icon`"
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
              <b-dropdown-item :disabled="true">
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
              :total-rows="dataCategorie.length"
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
    </b-card>
    <!-- {{ dataCategorie__data }} -->
    <e-add-categorie />
    <e-edit-categorie
      :dataCategorie="editCategorie__data"
      v-if="editCategorie__data !== null"
    />
  </div>
</template>

<script>
import {
  BTable,
  BFormCheckbox,
  BButton,
  BCard,
  BRow,
  BCol,
  BAvatar,
  BBadge,
  BFormGroup,
} from "bootstrap-vue";
import URL from "@/views/pages/request";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import CryptoJS from "crypto-js";
import { computed, onMounted, reactive, ref } from "@vue/composition-api";
import QLoaderTable from "@/components/__partials/loaders/qLoaderTable.vue";
import EAddCategorie from "./eAddCategorie.vue";
import EEditCategorie from "./eEditCategorie.vue";

export default {
  components: {
    BFormGroup,
    vSelect,
    CryptoJS,
    numeral,
    moment,
    axios,
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
    QLoaderTable,
    EAddCategorie,
    EEditCategorie,
  },
  name: "CategorieArticles",
  directives: {
    Ripple,
  },
  filters: {
    toSubtr(value) {
      if (!value) return "";
      value = value.toString();
      if (value.length > 10) {
        return value.substring(0, 10) + "...";
      } else {
        return value;
      }
    },
    toUpper(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  setup(props, { root }) {
    const state = reactive({
      perPage: 30,
      filter: "",
      currentPage: 1,
      success: false,
      empty: false,
      warring: false,
      countArticle: 0,
      countSelected: 0,
      loading: false,
    });
    const editCategorie__data = ref(null);
    const status__check = ref("not_accepted");
    const tableColumns = ref([
      {
        key: "libelle",
        label: "Libelle",
      },
      {
        key: "nombres",
        label: "Nombre Articles",
      },
      {
        key: "description",
        label: "description",
      },
      {
        key: "date",
        label: "Date d'ajout",
      },
      {
        key: "actions",
        label: "Actions",
      },
    ]);
    const dataCategorie = ref([]);
    const perPageOptions = ref([30, 50, 100, 150, 200]);

    const formatter = new Intl.NumberFormat("de-DE", {
      currency: "XOF",
      style: "currency",
      minimumFractionDigits: 2,
    });

    onMounted(async () => {
      await getCategory();
      console.log(editCategorie__data.value);
    });

    const getCategory = async () => {
      try {
        const { data } = await axios.get(URL.ARTICLE_LIST);
        if (data) {
          for (let i = 0; i < data[2].length; i++) {
            const el = data[2][i];

            dataCategorie.value.push({
              id: el.id,
              libelle: el.libelle,
              nombres: el.article.length,
              description:
                el.description === "" || el.description === null
                  ? "non defini..."
                  : el.description,
              created_at: el.created_at,
            });
          }
          dataCategorie.value.reverse();
          console.log(dataCategorie.value);
          root.$store.commit("qCategory/LIST_DATA_CATEGORY", dataCategorie.value, {
            root: true,
          });
          dataCategorie.value.length === 0
            ? (state.empty = true)
            : (state.success = true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const dataCategorie__data = computed(() => {
      dataCategorie.value = root.$store.state.qCategory.dataCategory;
    });

    const editCategorie__req = (data) => {
      editCategorie__data.value = data;
      console.log(editCategorie__data.value);
    };

    const format_date = (value) => {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    };

    return {
      state,
      perPageOptions,
      tableColumns,
      status__check,
      format_date,
      dataCategorie__data,
      editCategorie__data,

      dataCategorie,
      formatter,
      editCategorie__req,
    };
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.none {
  display: none;
}
.block {
  display: inline-block;
}
</style>
