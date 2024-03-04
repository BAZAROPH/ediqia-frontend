import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue';
export default (root, variant, position, text) =>{
    root.$toast(
        {
            component: ToastificationContentVue,
            props: {
                title: 'Succès',
                icon: 'InfoIcon',
                text: text,
                variant,
            },
        },
        {
            position,
        }
    );
}


export const toast_sucess = (root, variant, position, text) =>{
    root.$toast(
        {
            component: ToastificationContentVue,
            props: {
                title: 'Succès',
                icon: 'CheckIcon',
                text: text,
                variant,
            },
        },
        {
            position,
        }
    );
}

export const toast_error = (root, variant, position, text) =>{
    root.$toast(
        {
            component: ToastificationContentVue,
            props: {
                title: 'Error',
                icon: 'InfoIcon',
                text: text,
                variant,
            },
        },
        {
            position,
        }
    );
}