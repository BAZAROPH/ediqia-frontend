<template>
	<section class=""></section>
</template>

<script>
import vSelect from 'vue-select';
import Ripple from 'vue-ripple-directive';
import {
	computed,
	onMounted,
	reactive,
	ref,
	watch,
	watchEffect,
} from '@vue/composition-api';

export default {
	directives: {
		Ripple,
		'b-toggle': VBToggle,
	},
	components: {
		vSelect,
	},

	setup() {
		/**** @START VARIABLE
    This variable inclus all value of compoment
    @State
  */

		return {};
	},
};
</script>

<style lang="scss" scoped></style>
