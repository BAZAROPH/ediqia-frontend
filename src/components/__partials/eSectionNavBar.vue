<template>
	<div class="mx-1">
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
					v-model="perPage"
					:dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
					:options="perPageOptions"
					:clearable="false"
					class="per-page-selector d-inline-block ml-50 mr-1"
				/>
				<!-- <b-button v-if="links === true" variant="primary" :to="{ name: 'FactureAdd' }">
					<feather-icon icon="PlusIcon" class="mx-auto" />
					{{createName}}
				</b-button> -->
				<slot></slot>
			</b-col>

			<!-- Search -->
			<b-col cols="12" md="6">
				<div class="d-flex align-items-center justify-content-end">
					<b-form-input
						v-model="filter"
						class="d-inline-block mr-1"
						:placeholder="'Rechercher par : ' + placeholder"
					/>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import {
	onMounted,
	onUpdated,
	reactive,
	computed,
	ref,
} from '@vue/composition-api';
import vSelect from 'vue-select';
import URL from '@/views/pages/request/index';
import axios from 'axios';
import { VueTelInput } from 'vue-tel-input';

export default {
	components: {
		vSelect,
	},

	props: ['perPageOptions', 'perPage', 'filter', 'placeholder'],
	setup(props, { root }) {
		return {};
	},
};
</script>

<style scoped></style>
