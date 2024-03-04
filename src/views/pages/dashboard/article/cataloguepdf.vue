<template>
  <div>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="catalogue"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <div style="background-image: url('https://image.freepik.com/free-vector/wavy-background-with-copy-space_52683-65230.jpg'); background-repeat: no-repeat;
            background-size: 100% 100%;">
                <div class="row text-center m-auto">
                    <div class="col-4 mt-2" v-for="item in catalogue" :key="item.id">
                        <div class="row">
                            <div class="col-12">
                                <img :src="item.avatar" height="170px" width="260px;" class="rounded">
                            </div>
                        </div>
                        <div class="row mt-1 mb-1">
                            <div class="col-12">
                                <span class="badge badge-indigo font-weight-bold">{{item.libelle}}</span>
                            </div>
                        </div>
                        <div class="row pb-2">
                            <div class="col-12">
                                <span class="badge badge-success" style="font-size:19px;" > {{item.prix_vente}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </vue-html2pdf>
      <div class="row mr-2">
          <div class="col-12 text-right mb-2">
              <button  @click="generateReport" class="btn btn-success">Générer</button>
          </div>
      </div>
      <div id="test">
        <div class="row text-center m-auto" style="background-image: url('https://image.freepik.com/free-vector/wavy-background-with-copy-space_52683-65230.jpg'); background-repeat: no-repeat;
    background-size: 100% 100%;">
            <div class="col-4 mt-2" v-for="item in catalogue" :key="item.id">
                <div class="row">
                    <div class="col-12">
                        <img :src="item.avatar" height="170px" width="260px;" class="rounded">
                    </div>
                </div>
                <div class="row mt-1 mb-1">
                    <div class="col-12">
                        <span class="font-weight-bold badge badge-indigo">{{item.libelle}}</span>
                    </div>
                </div>
                <div class="row pb-2">
                    <div class="col-12">
                        <span class="badge badge-success" style="font-size:19px;" > {{item.prix_vente}}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {
  BTable, BFormCheckbox, BButton, BCard, BRow, BCol, BAvatar, BBadge,
} from 'bootstrap-vue'
import URL from '@/views/pages/request'
import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'
import Ripple from 'vue-ripple-directive'
import CryptoJS from 'crypto-js'
import VueHtml2pdf from 'vue-html2pdf'


export default {
  components: {
    CryptoJS,
    VueHtml2pdf,
    numeral,
    moment,
    axios,
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
        catalogue:'',
    }
  },

  async mounted() {
      try {
            var ciphertext = localStorage.getItem('cata')
            var bytes  = CryptoJS.AES.decrypt(ciphertext, 'qenium 123')
            this.catalogue  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        } catch (error) {
            console.log(error);
        }
    },
    methods:{
        generateReport(){
            // window.print()
            this.$refs.html2Pdf.generatePdf()
        }
    }
}
</script>
