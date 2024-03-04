<script>
import { reactive } from "@vue/composition-api";
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";
export default {
  components: { FeatherIcon },
  props: ['b_getInfo'],
  setup(props) {
    const iconeBillPayments = reactive([
      {
        name: "Modifier",
        icon: "EditIcon",
      },
      {
        name: "Suprimer",
        icon: "TrashIcon",
      },
    ]);

   

    /********** @STRAT BILL PAYEMENTS ******** */

    /*
    ADD BILL PAYMENTS - OF USER
    @Method > Put
    @variable > [none]
    @send message > Success or Error
    @return > Array<Object>
  */
    const AddBillPayments = () => {};

    /*
    EDIT SELF BILL PAYMENTS - OF USER
    @Method > Put
    @variable > [none]
    @send message > Success or Error
    @return > Array<Object>
  */
    const EditBillPayments = () => {};

    /*
    REMOVE SELF BILL PAYMENTS - OF USER
    @Method > Delete
    @variable > [none]
    @return > Array<Object>
  */
    const RemoveBillPayments = () => {};

    /**********  @END BILL PAYEMENTS ******** */

    return {
      iconeBillPayments,
    };
  },
};
</script>

<template>
  <div>
    <div class="text-nowrap ">
      <!-- Dropdown -->
      <b-dropdown variant="link" toggle-class="p-0" no-caret>
        <template @click="b_getInfo" #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="16"
            class="align-middle text-body"
          />
        </template>
        
          <b-dropdown-item  v-b-modal.modal-editBillPaymant>
            <feather-icon :icon="iconeBillPayments[0].icon" />

            <span class="align-middle ml-50">{{ iconeBillPayments[0].name }}</span>
          </b-dropdown-item>
        
      </b-dropdown>
    </div>
  </div>
</template>

<style scoped></style>
