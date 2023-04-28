
export const navbarData  = [
    {
        routeLink: 'home',              
        icon: 'fal fa-home',
        label: 'Home'
    },
    {
        routeLink: 'upload',
        icon: 'far fa-arrow-alt-circle-up',
        label: 'Upload'
    },

    {
        routeLink: 'documentos',              
        icon: 'fal fa-file',
        label: 'Documentos',
       /*  items : [
            {
                routeLink : 'gestiondocumentos/documentos',
                label: 'Documentos'
            },
            {
                routeLink : 'gestiondocumentos/plantillas',
                label : 'Plantillas'
            },
            {
                routeLink : 'gestiondocumentos/logos',
                label: 'Logos'
            },
            {
                routeLink : 'gestiondocumentos/manuales',
                label: 'Manuales y Guias'
            },
        ] */
    },

    {
        routeLink: 'calendario',
        icon: 'fal fa-calendar',
        label: 'Calendario'
    },

    {
        routeLink: 'solicitudes',
        icon: 'fal fa-book',
        label: 'Solicitudes'
    },
    {
        href: "http://172.16.1.248/moodle/",
        icon: 'fal fa-graduation-cap',
        label: 'UniFresmar',
        external: true
    },
    {
        href: "http://172.16.1.249:4244/home",
        icon: 'fal fa-university',   
        label: 'Cuadre Caja',
        external:true
    },

    {
        routeLink: 'login',
        icon: 'fal fa-sign-in',
        label: 'Login'
    }
];

