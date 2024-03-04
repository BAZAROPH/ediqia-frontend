<template>
  <b-modal
    id="e-add-parametre"
    cancel-variant="outline-secondary"
    ok-only
    ok-title="Ajouter"
    cancel-title="Annuler"
    centered
    title="Ajouter un nouveau parametre"
    @ok="AddNewParametre"
  >
    <b-form>
      <!-- Libellé -->
      <b-form-group label="Libellé">
        <template #label> Libellé <span class="text-danger">*</span> </template>

        <b-form-input
          id="libelle"
          v-model="newParametre.libelle"
          name="libelle"
          placeholder="Libellé de l'article"
        />
        <span
          class="text-danger"
          style="font-size: 12px"
          v-if="errorInput.path === 'libelle'"
        >
          {{ errorInput.message }}
        </span>
      </b-form-group>

      <!-- Icon du parametre -->
      <b-form-group label="Icone du parametre">
        <v-select
          v-model="newParametre.icone"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="iconList"
          input-id="invoice-data-client"
          :clearable="false"
          label="preview"
          placeholder="Choisir une icone"
        >
          <template v-slot:option="option">
            <feather-icon :icon="option.preview" class="mx-auto" />
          </template>
        </v-select>
      </b-form-group>

      <!-- Description du produit -->
      <b-form-group>
        <label for="taxeValue">Description </label>
        <b-form-textarea
          id="textarea"
          v-model="newParametre.description"
          placeholder="Entrer les details de l'article ici"
          rows="5"
          max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>
    </b-form>

    <template #modal-footer>
      <b-button
        :disabled="state.loading === true ? true : false"
        variant="primary"
        @click.stop.prevent="AddNewParametre"
      >
        <span v-if="state.loading === false">Ajouter</span>
        <b-spinner v-if="state.loading === true" label="Spinning"></b-spinner>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import vSelect from "vue-select";
import axios from "axios";
import URL from "@/views/pages/request";
import Ripple from "vue-ripple-directive";
import qToast, { toast_sucess } from "@/utils/qToast";
import moment from "moment";

export default {
  components: {
    vSelect,
  },
  props: {
    uidParams: Number,
  },
  directives: {
    Ripple,
  },
  setup(props, { root }) {
    const state = reactive({
      loading: false,
    });
    const iconList = [{ name: "Setting", preview: "ToolIcon" }];
    const newParametre = reactive({
      libelle: "",
      icone: iconList[0].preview,
      description: "",
    });

    const errorInput = computed(() => {
      return {
        path: "",
        message: "",
      };
    });

    // *****
    // ****
    // FUNCTION POUR AJOUT D'ARTICLE
    // ****
    // *****
    const AddNewParametre = async () => {
      if (newParametre.libelle === "") {
        errorInput.path = "libelle";
        errorInput.message = "Veillez entrer un libellé";
      } else {
        state.loading = true;
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        console.log(newParametre.icone.preview);
        const newData = {
          id: props.uidParams,
          libelle: newParametre.libelle,
          icone: newParametre.icone.preview,
          description: newParametre.description,
        };

        try {
          const { data } = await axios.post(URL.PARAMETRE_CREATEADMIN, newData, config);

          if (data) {
            console.log(data);
            state.loading = false;
            const dataParams = root.$store.state.qParametre.dataParametre;
            dataParams.unshift({
              id: data.infos.id,
              id_type: data.infos.type_parametre_id,
              line: "#",
              libelle: data.infos.libelle,
              created_at: moment(String(data.infos.created_at)).format("DD-MM-YYYY"),
            });

            for (let i = 0; i < dataParams.length; i++) {
              const params = dataParams[i];
              params.line = i + 1;
            }

            root.$bvModal.hide("e-add-parametre");
            toast_sucess(root, "success", "top-right", "Categories creer avec sucess !");

            root.$bvModal.hide("e-add-new-categorie");
            root.$store.commit("qParametre/LIST_PARAMETRES_DATA", dataParams, {
              root: true,
            });

            newParametre.libelle = "";
            newParametre.icone = "";
            newParametre.description = "";
          }
        } catch (error) {
          state.loading = false;
          console.log(error.message);
        }
      }
    };

    return {
      errorInput,
      iconList,

      state,
      newParametre,
      AddNewParametre,
    };
  },
};
</script>

<style scoped></style>
