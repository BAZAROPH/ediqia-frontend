<template>
	<div>
		<!-- Loader -->
		<div class="loader">
			<b-skeleton-table
				v-if="success === false && empty === false && warring === false"
				:rows="5"
				:columns="4"
				:table-props="{ bordered: true, striped: true }"
			></b-skeleton-table>

			<span class="" v-if="empty === true">
				Aucune donnée, n'a été trouvé
			</span>
			<span class="" v-if="warring === true">
				Oups, erreur serveur, recharge la page
			</span>
		</div>
	</div>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
	props: ['empty', 'warring', 'success'],
	setup(props, {}) {
		return {};
	},
};
</script>
<style lang="scss" scoped>
.loader {
	padding-top: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
