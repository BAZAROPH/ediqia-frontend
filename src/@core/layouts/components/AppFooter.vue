<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://www.qenium.com"
        target="_blank"
      >Qenium</b-link>
      <span class="d-none d-sm-inline-block">, Tous droits réservés</span>
    </span>

    <span class="float-md-right d-none d-md-block">Conçu avec soins &amp; conçu avec
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
