<template>
	<b-card>
		<div v-if="invoiceData.amountPaid">
			<span class="font-weight-bold">Montant payé :</span>
			{{ formatter.format(invoiceData.amountPaid) }}
		</div>
		<div v-if="invoiceData.amountPaid === '0' || invoiceData.amountPaid === 0">
			<span class="font-weight-bold">Montant payé :</span>
			{{ formatter.format(invoiceData.amountPaid) }}
		</div>

		<hr />

		<div class="" v-if="Math.abs(parseInt(invoiceData.amountToPaid)) > 0">
			<span class="font-weight-bold">Reste à payer :</span>
			{{ formatter.format(invoiceData.amountToPaid) }}
		</div>

		<div v-if="Math.abs(parseInt(invoiceData.amountToPaid)) <= 0">
			<b-button variant="success" size="sm" pill>
				Facture réglée
			</b-button>
		</div>
	</b-card>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api';

export default {
	props: ['invoiceData'],
	setup(props, { root }) {
		const formatter = new Intl.NumberFormat('ci-CI', {
			style: 'currency',
			currency: 'XOF',
			minimumFractionDigits: 2,
		});

		onMounted(() => {});

		return {
			formatter,
		};
	},
};
</script>

<style scoped></style>
