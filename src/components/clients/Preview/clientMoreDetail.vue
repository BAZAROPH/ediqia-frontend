<template>
	<section class="">       
		<b-tabs class="flex justify-end justify-content-md-between">
			<b-tab>
				<!-- Add component -->
				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="CreditCardIcon"
						class="cursor-pointer"
						size="16"
					/>
					<span class="d-none d-md-flex"
						>Liste des facture </span                        
					>
				</template>

			</b-tab>

            <b-tab>
				<!-- Add component -->
				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="ArchiveIcon"
						class="cursor-pointer"
						size="16"
					/>
					<span class="d-none d-md-flex"
						>Dévis()</span
					>
				</template>
                
			</b-tab>


			<b-tab>
				<!-- Add component -->

				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="ArchiveIcon"
						class="cursor-pointer"
						size="16"
					/>
					<span class="d-none d-md-flex"
						>Bon de commandes ()</span
					>

				</template>
                
			</b-tab>

			<b-tab>
				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="FileIcon"
						class="cursor-pointer"
						size="16"
					/>
					<span class="d-none d-md-flex"
						>Commentaires ()</span
					>
				</template>
			</b-tab>


			<b-tab>
				<!-- Add component -->

				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="MessageCircleIcon"
						class="cursor-pointer"
						size="16"
					/>
					<span class="d-none d-md-flex">Email ()</span>
				</template>
			</b-tab>

            <b-tab>
				<!-- Add component -->
				<template #title class="flex">
					<feather-icon
						:id="`invoice-row-1-send-icon`"
						icon="MessageCircleIcon"
						class="cursor-pointer"
						size="16"
					/>
					<span class="d-none d-md-flex">Historiques ()</span>
				</template>
			</b-tab>

		</b-tabs>
	</section>
</template>


<script>
import {
	BRow,
	BCol,
	BCard,
	BCardBody,
	BTableLite,
	BCardText,
	BButton,
	VBToggle,
	BModal,
	BFormInput,
	BFormGroup,
	VBModal,
	BForm,
	BLink,
	BFormCheckbox,
	BInputGroup,
	BInputGroupAppend,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import Ripple from 'vue-ripple-directive';
// import { computed, onMounted, reactive, ref, watch, watchEffect } from '@vue/composition-api';


export default {
	directives: {
		Ripple,
		'b-toggle': VBToggle,
	},
	components: {
		vSelect,
		BRow,
		BCol,
		BCard,
		BCardBody,
		BTableLite,
		BCardText,
		BButton,
		VBToggle,
		BModal,
		BFormInput,
		BFormGroup,
		VBModal,
		BForm,
		BLink,
		BFormCheckbox,
		BInputGroup,
		BInputGroupAppend,
// QFilesInvoiceDestroy,
	},

	setup() {
		/**** @START VARIABLE
    This variable inclus all value of compoment
    @State
    */
		// const state = reactive({
		// 	// Primitive value
		// 	qUser: null,
		// 	printInvoice: false,
		// 	linksMenuInvoice: [
		// 		{
		// 			name: 'Reglements',
		// 			active: true,
		// 		},
		// 		{
		// 			name: 'Historiques',
		// 			active: false,
		// 		},
		// 		{
		// 			name: 'Liste des fichers',
		// 			active: false,
		// 		},
		// 	],
			
		// });


		return {
		};
	},
};
</script>

<style lang="scss" scoped>
.qComments {
	display: flex;
	flex-direction: column;
	padding: 2rem 1rem;

	// column-gap: 15rem;
	.qComments-avatar {
		display: flex;
		flex-direction: row;
		/* padding: 5em 56em; */
		/* justify-content: center; */
		align-content: center;
	}

	.qComments-avatar-name {
		display: flex;
		flex-direction: column;
		padding-left: 6px;
	}

	.qComments-name-message {
		font-size: 14px;
		padding-bottom: 0.2em;
	}

	.qComments-avatar-name-owner {
		font-size: 14px;
	}
	.qComments-avatar-name-role {
		font-size: 12px;
	}
}
.qArchives_actions {
	border-radius: 5px !important;
	padding: 0.1rem 1rem;
}

.isUser__class{
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: end !important;
	position: relative;
}
.noUser__class{
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: start !important;
}

.isUser__class__item{
display: flex;
	flex-direction: row;
	width: 80%;
	justify-content: end !important;
}
</style>
