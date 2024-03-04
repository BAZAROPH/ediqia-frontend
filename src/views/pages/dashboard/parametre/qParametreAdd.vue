<template>
  <b-modal
    :id="actionModal"
    cancel-variant="outline-secondary"
    ok-only
    ok-title="Ajouter"
    cancel-title="Annuler"
    centered
    :title="
      actionModal === 'e-add-parametre'
        ? 'Ajouter un nouveau parametre'
        : 'Modification du parametre'
    "
    @ok="AddNewParametre(actionModal)"
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
          @input="__Icone"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="iconList"
          input-id="invoice-data-client"
          :clearable="false"
          placeholder="Choisir une icone"
          v-model="cos"
        >
          <template v-slot:option="option">
            {{ option.label }}
            <feather-icon :icon="option.label" class="mx-auto" />
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
        @click.stop.prevent="AddNewParametre(actionModal)"
      >
        <span v-if="state.loading === false">Ajouter</span>
        <b-spinner v-if="state.loading === true" label="Spinning"></b-spinner>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { reactive, ref, computed } from "@vue/composition-api";
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
    actionModal: String,
    dataParamsEdit: Object,
  },
  directives: {
    Ripple,
  },
  setup(props, { root }) {
    const state = reactive({
      loading: false,
    });

    const iconList = ["ToolIcon", "UserIcon"];

    const cos = props.dataParamsEdit.icone;

    const __Icone = (e) => {
      newParametre.value.icone = e;
    };

    const newParametre = computed(() => {
      console.log(props.dataParamsEdit.icone);
      return {
        libelle:
          props.actionModal === "e-add-parametre" ? "" : props.dataParamsEdit.libelle,
        icone: props.dataParamsEdit.icone,
        description:
          props.actionModal === "e-add-parametre" ? "" : props.dataParamsEdit.description,
      };
    });

    const errorInput = reactive({
      path: "",
      message: "",
    });

    // *****
    // ****
    // FUNCTION POUR AJOUT D'ARTICLE
    // ****
    // *****
    const AddNewParametre = async (mode) => {
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

        const newData = {
          id: props.uidParams,
          libelle: newParametre.value.libelle,
          icone: newParametre.value.icone,
          description: newParametre.value.description,
        };

        const editData = {
          id: props.dataParamsEdit.id,
          libelle: newParametre.value.libelle,
          icone: newParametre.value.icone,
          description: newParametre.value.description,
        };

        let response = null;

        try {
          if (mode === "e-add-parametre") {
            response = await axios.post(URL.PARAMETRE_CREATEADMIN, newData, config);
          } else {
            response = await axios.post(URL.PARAMETRE_UPDATE, editData, config);
          }

          const data = response.data;

          if (response.data) {
            state.loading = false;
            const dataParams = root.$store.state.qParametre.dataParametre;
            mode === "e-add-parametre"
              ? dataParams.unshift({
                  id: data.infos.id,
                  id_type: data.infos.type_parametre_id,
                  line: "#",
                  icone: data.infos.icone,
                  libelle: data.infos.libelle,
                  created_at: moment(String(data.infos.created_at)).format("DD-MM-YYYY"),
                })
              : dataParams.forEach((el) => {
                  if (el.id === props.dataParamsEdit.id) {
                    el.libelle = newParametre.value.libelle;
                    el.description = newParametre.value.description;
                    el.icone = newParametre.value.icone;
                  }
                });

            for (let i = 0; i < dataParams.length; i++) {
              const params = dataParams[i];
              params.line = i + 1;
            }

            root.$bvModal.hide(mode);
            toast_sucess(
              root,
              "success",
              "top-right",
              mode === "e-add-parametre"
                ? "Parametre créer avec sucéss !"
                : "Parametre modifier avec sucéss"
            );

            root.$store.commit("qParametre/LIST_PARAMETRES_DATA", dataParams, {
              root: true,
            });

            newParametre.value.libelle = "";
            newParametre.value.icone = "";
            newParametre.value.description = "";
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
      cos,

      state,
      newParametre,
      AddNewParametre,
      __Icone,
    };
  },
};
</script>

<style scoped></style>
