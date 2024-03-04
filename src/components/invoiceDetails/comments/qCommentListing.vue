<script>
import qLoader from '@/components/__partials/loaders/qLoader.vue';
import URL from '@/views/pages/request';
import {
	defineComponent,
	reactive,
	computed,
	onBeforeMount,
	onMounted,
} from '@vue/composition-api';
import axios from 'axios';

export default {
	components: { qLoader },

	/***
    GET ALL COMMENTS 
    @Method > Post
    @variable > [COMMENTS]
    @return > Array<Object>
  */

	setup(props, { root, expose }) {
		const state = reactive({
			success: false,
			empty: false,
			warring: false,
			qUser: null,
			count: 0,
		});
		const getData = reactive({
			comments: [],
		});

		const getComments = async () => {
			const __reserveComments = [];
			const facture = JSON.parse(localStorage.getItem('facture'));

			axios
				.post(URL.INVOICE_COLLECT_COMMENTS, {
					facture_id: facture.id,
				})
				.then(({ data }) => {
					__reserveComments.push(data.commentaire[0]);
					state.count = __reserveComments[0].length;
					// // //Verifications

					__reserveComments[0].length > 0
						? (state.success = true)
						: (state.empty = true);

					for (let i = 0; i < __reserveComments[0].length; i++) {
						const comment = __reserveComments[0][i];

						getData.comments.push({
							id: comment.comment_id,
							user_id: comment.user_id,
							avatar: comment.photo_user,
							fullname: comment.user_nom + ' ' + comment.user_prenoms,
							role: comment.user_role[0].name,
							commentaire: comment.commentaire,
						});
					}
					const Comments = getData.comments.reverse();
					root.$store.commit('qInvoice/DATA_COMMENTS', Comments, {
						root: true,
					});
				})
				.catch((error) => {
					console.error(error);
					state.success = false;
					state.warring = true;
				});
		};

		onMounted(async () => {
			await getComments();
		});

		const qComments = computed(() => {
			if (getData.comments.length > 0) {
				state.success = true;
				state.empty = false;
			}
			return {
				data: root.$store.state.qInvoice.dataComments,
				count: root.$store.state.qInvoice.countComments,
			};
		});

		return {
			state,
			getData,

			qComments,
		};
	},
};
</script>

<template>
	<div>
		<!-- Loading -->
		<q-loader
			:warring="state.warring"
			:empty="state.empty"
			:success="state.success"
		/>
		<span class="" style="font-size: 24px; position: relative; bottom: 24px"
			>Commentaire ({{ qComments.count }})
		</span>
		<div v-if="state.success === true" class="">
			<div
				v-for="comment in qComments.data"
				:key="comment.id"
				class="d-flex flex-row mb-1 px-1 border-4 border-top"
				style="padding-top: 16px"
			>
				<!--  -->
				<b-avatar :src="comment.avatar" size="2.5rem"></b-avatar>

				<div class="d-flex flex-column ml-1">
					<div class="d-flex flex-column">
						<span> {{ comment.fullname }} </span>
						<span
							class=" badge badge-pill badge-primary d-flex justify-content-center"
							style="font-size: 8px; max-width: 70px; position: relative; top: 2px"
							>{{ comment.role }}</span
						>
					</div>

					<div class="mt-1">
						<span> {{ comment.commentaire }} </span>
					</div>
				</div>
			</div>
		</div>

		<!-- ADD A NEW COMMENTAIRE -->
		<div v-if="state.success === null" class="border boder-4 w-100 mt-3 ">
			<div
				class="mb-2"
				:class="
					comment.user_id === state.qUser ? 'isUser__class' : 'noUser__class'
				"
				v-for="comment in getAllComments"
				:key="comment.id"
			>
				<div
					class="d-flex w-100 w-sm-25 shadow-lg bg-primary rounded "
					variant=""
				>
					<b-col>
						<div
							class="d-flex flex-row justify-content-end mt-2 h-100 animate__animated animate__slideInDown"
						>
							<!-- If message not poster by user -->
							<div
								v-if="comment.user_id !== state.qUser"
								class="d-flex flex-column justify-content-center rounded mr-1"
							>
								<b-avatar
									src="https://placekitten.com/300/300"
									size="2.5rem"
								></b-avatar>
							</div>
							<div class="d-flex flex-column container-fuild px-1 pb-2">
								<span
									:class="
										comment.user_id === state.qUser
											? 'd-flex justify-content-end text-white'
											: ''
									"
									class="qComments-name-message"
									style="font-size: 1rem important"
									>{{ comment.fullname }}, {{ comment.role }}
								</span>
								<span
									:class="
										comment.user_id === state.qUser
											? 'd-flex justify-content-end text-right text-white'
											: ''
									"
									class="opacity-50"
								>
									{{ comment.commentaire }}
								</span>
							</div>

							<!-- If user is connected -->
							<div
								v-if="comment.user_id === state.qUser"
								class="d-sm-flex flex-column rounded mr-1 d-none"
							>
								<b-avatar
									src="https://placekitten.com/300/300"
									size="2.5rem"
								></b-avatar>
							</div>
						</div>
					</b-col>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
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

.isUser__class {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: end !important;
	position: relative;
}
.noUser__class {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: start !important;
}

.isUser__class__item {
	display: flex;
	flex-direction: row;
	width: 80%;
	justify-content: end !important;
}
</style>
