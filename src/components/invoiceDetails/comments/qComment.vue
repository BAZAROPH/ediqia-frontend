<template>
    <div class="qComments pt-8">
          <!-- ADD A NEW COMMENTAIRE -->

          <q-comment-sender/>
          <q-comment-listing/>
         
        </div>
</template>

<script>
import QCommentListing from './qCommentListing.vue';
import qCommentSender from './qCommentSender.vue';
export default{
    components: { qCommentSender, QCommentListing },
}
</script>

<style scoped>

</style>