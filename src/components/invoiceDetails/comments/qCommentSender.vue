<script>
import { computed, defineComponent, reactive } from '@vue/composition-api';
import Ripple from 'vue-ripple-directive';
import { VBToggle } from 'bootstrap-vue';
import axios from 'axios';
import URL from '@/views/pages/request';

export default defineComponent({
	directives: {
		Ripple,
		'b-toggle': VBToggle,
	},
	setup(props, { root }) {
		const state = reactive({
			loadingForAddComment: false,
			message: '',
			errorInputForm: {
				path: '',
				message: '',
			},
			config: {
				headers: {
					Accept: 'application/json',
				},
			},
		});
		/***
    GET ALL HISTORIQUEs 
    @Method => Get
    @Function => [addComments]
    @return => Array<Object>
  */
		const addComments = () => {
			const facture = JSON.parse(localStorage.getItem('facture'));

			if (state.message === '') {
				state.errorInputForm.path = 'message';
				state.errorInputForm.message = 'Ce champs est requis !';
			} else if (state.message.length <= 3) {
				state.errorInputForm.path = 'message';
				state.errorInputForm.message = 'Ce champs requis 3 charactere';
			} else {
				state.errorInputForm.path = 'none';
				state.errorInputForm.message = '';

				state.loadingForAddComment = true;
				axios
					.post(
						URL.INVOICE_ADD_COMMENTS,
						{
							id: facture.id,
							commentaire: state.message,
						},
						state.config
					)
					.then(({ data }) => {
						const newData = root.$store.state.qInvoice.dataComments;
						data = data.commentaire;

						newData.unshift({
							id: data.comment_id,
							user_id: data.user_id,
							avatar: data.photo_user,
							fullname: data.user_nom + ' ' + data.user_prenoms,
							role: data.user_role[0].name,
							commentaire: data.commentaire,
						});

						root.$store.commit('qInvoice/ADD_COMMENTS', newData, {
							root: true,
						});
						state.message = '';
						state.loadingForAddComment = false;
					});
			}
		};

		const getData = computed(() => {
			return root.$store.state.qInvoice.dataComments;
		});

		return {
			addComments,
			state,
			getData,
		};
	},
});
</script>

<template>
	<div>
		<b-row>
			<b-col sm="12">
				<!-- <div class="qComments-avatar">
        <b-avatar
            src="https://placekitten.com/300/300"
            size="2.5rem"
        ></b-avatar>
        <div class="qComments-avatar-name">
            <span class="qComments-avatar-name-owner"
                >Diomande Emmanuel</span
            >
            <span class="qComments-avatar-name-role">Employer</span>
        </div>
    </div> -->
			</b-col>
			<b-col sm="12" class="">
				<b-form-group>
					<b-form-textarea
						v-model="state.message"
						id="textarea-default"
						placeholder="Entrez votre commentaire..."
					></b-form-textarea>
					<small
						class="text-danger"
						v-if="state.errorInputForm.path === 'message'"
					>
						{{ state.errorInputForm.message }}
					</small>
				</b-form-group>

				<div class="d-flex flex-row justify-content-end mt-1 w-100">
					<b-button
						v-ripple.400="'rgba(255, 255, 255, 0.15)'"
						:disabled="state.loadingForAddComment === true ? true : false"
						variant="primary"
						@click="addComments"
					>
						<span v-if="state.loadingForAddComment === false">Envoyer</span>
						<b-spinner
							v-if="state.loadingForAddComment === true"
							label="Spinning"
						></b-spinner>
					</b-button>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
