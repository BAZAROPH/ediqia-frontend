<template>
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
					v-model="currentPage"
					:total-rows="invoiceDataLength"
					:per-page="perPage"
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

	props: ['currentPage', 'perPage', 'invoiceDataLength'],
	setup(props, { root }) {
		return {};
	},
};
</script>

<style scoped></style>
