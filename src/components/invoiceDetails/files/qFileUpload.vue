<script>
import { reactive, ref } from "@vue/composition-api";
import { methods } from "vue-echarts";
import axios from "axios";
import URL from "@/views/pages/request";

export default {
  props: [""],
  data() {
    return {
      describle: "",
      filesAvatar: "",
      err: null,
      loadingForAddfile: false,
      errorInputForm: {
        path: "",
        message: "",
      },
    };
  },
  methods: {
    /***
    SEND ATTACHEMENTS FILES
    @Method > Post
    @variable > [Files]
    @return > Array<Object>
  */
    reqFileToInvoiceDetails(event) {
      this.filesAvatar = event.target.files[0];
    },

     sendFileToInvoiceDetails() {
      const facture = JSON.parse(localStorage.getItem("facture"));
      const fileElements = this.filesAvatar;

      if (this.filesAvatar.length === 0) {
        this.errorInputForm.path = "file";
        this.errorInputForm.message = "veillez svp ajoute un files a ce champs";
        return { error: true };
      } else if (this.describle === "") {
        this.errorInputForm.path = "describle";
        this.errorInputForm.message = "veillez svp ajoute un files a ce champs";
        return { error: true };
      } else if (this.describle.length < 3) {
        this.errorInputForm.path = "describle";
        this.errorInputForm.message = "Ce champs requis 3 charactere";
        return { error: true };
      } else {
        this.errorInputForm.path = "none";
        this.errorInputForm.message = "";
        this.loadingForAddfile = true;
        //   const files_input = document.querySelector('#file-sendFilesBillPayments__id')
        const formData = new FormData();
        formData.append("id", facture.id);
        formData.append("message", this.describle);
        formData.append("avatar[0]", fileElements);
         axios
          .post(URL.INVOICE_SEND_FILES, formData)
          .then(({ data }) => {
           
            this.$bvModal.hide("modal-sendFilesBillPayments");
            this.loadingForAddfile = false;
            console.log("sucess", data);
          })
          
      }
    },
  },
};
</script>

<template>
  <div>
    <b-modal
      centered
      id="modal-sendFilesBillPayments"
      scrollable
      @ok="sendFileToInvoiceDetails"
      title="Ajouter des files assoccier a la facture"
    >
      <b-card-text>
        <!-- first name -->
        <b-col cols="12">
          <form ref="form" @submit.stop.prevent>
            <!-- Files Input -->
            <b-form-group label="" label-cols-sm="0">
              <b-form-file
                @change="reqFileToInvoiceDetails"
                id="file-sendFilesBillPayments__id"
              ></b-form-file>
              <small class="text-danger" v-if="errorInputForm.path === 'file'">
                {{ errorInputForm.message }}
              </small>
            </b-form-group>

            <!-- Describle Input -->
            <b-form-group label="" label-for="fh-describle">
              <b-form-input
                id="fh-describle"
                type="text"
                v-model="describle"
                placeholder="Entre un descriptif du file"
              />
              <small
                class="text-danger"
                v-if="errorInputForm.path === 'describle'"
              >
                {{ errorInputForm.message }}
              </small>
            </b-form-group>
          </form>
        </b-col>
      </b-card-text>

      <template #modal-footer="{ cancel }">
        <b-button
          :disabled="loadingForAddfile === true ? true : false"
          variant="primary"
          @click="sendFileToInvoiceDetails"
        >
          <span v-if="loadingForAddfile === false">Ajouter</span>
          <b-spinner
            v-if="loadingForAddfile === true"
            label="Spinning"
          ></b-spinner>
        </b-button>
        <b-button
          v-if="loadingForAddfile === false"
          variant=""
          @click="cancel()"
        >
          Annuler
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<style scoped></style>
