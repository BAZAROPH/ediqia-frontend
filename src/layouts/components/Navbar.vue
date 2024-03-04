<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />

    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{user_connecte.nom | capitalize }} {{user_connecte.prenoms | capitalize }}
            </p>
            <span class="user-status">{{user_role | capitalize }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/customers.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
      <div class="alert-primary rounded codepadding">
          <span class="text-primary font-weight-bold small ">
            {{entreprise_code}}
          </span>
      </div>
      <div v-if="copy_success">
        <button class="btn p-0 pl-1" @click='copier'><feather-icon icon="CheckCircleIcon" class="copy text-success" /></button>
      </div>
      <div v-else>
        <button class="btn p-0 pl-1" @click='copier'><feather-icon icon="CopyIcon" class="copy text-indigo" /></button>
      </div>

      <div v-if="copy_success_link">
        <button class="btn p-0 pl-1" @click='copierLien'><feather-icon icon="CheckCircleIcon" class="copylink text-warning" /></button>
      </div>
      <div v-else>
        <button class="btn p-0 pl-1" @click='copierLien'><feather-icon icon="Share2Icon" class="copylink text-indigo" /></button>
      </div>
        </b-dropdown-item>
        
        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center" @click="voirProfile">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profil</span>
        </b-dropdown-item>

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MailIcon"
            class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item> -->

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="CheckSquareIcon"
            class="mr-50"
          />
          <span>Task</span>
        </b-dropdown-item> -->

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MessageSquareIcon"
            class="mr-50"
          />
          <span>Chat</span>
        </b-dropdown-item> -->

        <!-- Profil Entreprise -->

        <b-dropdown-divider />
        
        <b-dropdown-item link-class="d-flex align-items-center" @click="profileEntreprise">
          <feather-icon
            size="16"
            icon="HomeIcon"
            class="mr-50"
          />
          <span>Votre entreprise</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="FilePlusIcon"
            class="mr-50"
          />
          <span>Entête de Facture</span>
        </b-dropdown-item>
      



        <!--  -->



        <b-dropdown-divider />
        <b-dropdown-item link-class="d-flex align-items-center" class="man" @click="modules">
          <feather-icon
            size="16"
            icon="AwardIcon"
            class="mr-50 font-white"
          />
          <span>Mise à niveau</span>
        </b-dropdown-item>

        <b-dropdown-divider />
        

        <b-dropdown-item link-class="d-flex align-items-center" @click="deconnecter">
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Déconnexion</span>
        </b-dropdown-item>




      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import axios from 'axios';
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import URL from '@/views/pages/request'

export default {
  components: {
    ToastificationContent,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data() {
    return {
      user_connecte:'',
      user_role:'',
      entreprise_code:'',
      copy_success:false,
      copy_success_link:false,
    }
  },
  async mounted(){
    try{
      const config = {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
          },
      }
      await axios.get(URL.CONNECTED_USER,config).then((res) => {
        this.user_connecte = res.data[0].user_connecte;
        this.user_role = res.data[0].user_role
        this.entreprise_code = res.data[0].entreprise_code
        localStorage.setItem('user_role',this.user_role)
      });
    } catch (error) {
          console.log(error);
    }
  },
  methods:{
    copierLien(){
      navigator.clipboard.writeText('https://ediqia.com/#/login?'+this.entreprise_code)
        this.copy_success_link = true
        this.$toast({
            component: ToastificationContent,
            props: {
                title: "Lien de connexion copié !",
                icon: "EditIcon",
                variant: "success",
            },
        });
        setTimeout(() => { 
            this.copy_success_link=false
          }, 10000);
    },
    copier(){
        navigator.clipboard.writeText(this.entreprise_code)
        this.copy_success = true
        this.$toast({
            component: ToastificationContent,
            props: {
                title: "Code copié !",
                icon: "EditIcon",
                variant: "success",
            },
        });
        setTimeout(() => { 
            this.copy_success=false
          }, 10000);
    },
    modules(e){
      e.preventDefault();
      this.$router.push('/modules/add');
      localStorage.setItem('refresh','1');
    },
    deconnecter(){
      localStorage.removeItem("modia");
      localStorage.removeItem("token");
      localStorage.removeItem("sidebar");
      this.$router.push('/login');
    },
    voirProfile(){
      this.$router.push('/profile')
    },
    profileEntreprise(){
      this.$router.push('/profile/entreprise')
    }
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
