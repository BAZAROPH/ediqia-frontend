<template>
  <b-card class="sticky top-0">
    <!-- Button: Send Invoice -->
    <b-button
      v-if="etatInvoice !== 'draft'"
      @click.stop.prevent="q_sendMail"
      v-b-modal.modal-mail-sender
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="mb-75"
      block
    >
      <!-- @click="sendFactureEmail" -->
      Envoyer
    </b-button>

    <!-- Button: Print -->
    <b-button
      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
      variant="outline-secondary"
      class="mb-75"
      block
      @click="printInvoice"
    >
      Imprimer
    </b-button>

    <!-- Button: Edit -->
    <!-- <b-button
						v-if="!invoiceData.code"
						v-ripple.400="'rgba(186, 191, 199, 0.15)'"
						variant="outline-secondary"
						block
						@click="editFacture"
					>
						Modifier
					</b-button> -->

    <!-- Button: enregistrer -->
    <b-button
      v-if="regler !== true && etatInvoice !== 'draft'"
      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
      variant="outline-success"
      class="mb-75"
      v-b-modal.modal-billPayment-add
      block
    >
      Règlement
    </b-button>

    <b-button
      v-if="etatInvoice === 'draft'"
      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
      variant="outline-secondary"
      class="mb-75"
      block
      @click="etatInvoiceFunctions"
    >
      Validate
    </b-button>
    <b-button
      v-if="status === 'facture'"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      block
      to="/lists/factures"
    >
      Liste des factures
    </b-button>
    <b-button
      v-if="status === 'devis'"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      block
      to="/lists/devis"
    >
      Liste des devis
    </b-button>
  </b-card>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import Ripple from "vue-ripple-directive";
import { VBToggle } from "bootstrap-vue";
import axios from "axios";
import URL from "@/views/pages/request";
export default {
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },
  components: {},

  props: ["q_sendMail", "etatInvoice", "etatInvoiceFunctions", "regler", "status"],

  setup(props, { root }) {
    /***
		 @BUTTON_PRINT
         @Type window
		 */
    const printInvoice = () => {
      root.$store.commit("qInvoice/HIDDEN_INVOICE_MORE_DETAIL", true, {
        root: true,
      });
      setTimeout(() => {
        window.print();
      }, 100);
    };
    window.onafterprint = () => {
      root.$store.commit("qInvoice/HIDDEN_INVOICE_MORE_DETAIL", false, {
        root: true,
      });
    };

    /***
		 @BUTTON_PRINT
         @Type Window
		 */

    return {
      printInvoice,
    };
  },
};
</script>

<style scoped></style>
