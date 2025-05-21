import { TYPES_ROLES } from "./TypesRoles";

export const ButtonsApp = [
    { 
        icon: require("@/assets/images/nav/home-icon.png"), 
        name: "Inicio",
        namePath: "Dashboard",
        isActive: true,
        showTo: 'all'
    },
    {
        icon: require("@/assets/images/nav/home-icon.png"), 
        name: "Pendientes",
        namePath: "CitasPendingCont",
        isActive: true,
        showTo: TYPES_ROLES.PROFESIONAL
    },
    { 
        icon: require("@/assets/images/nav/profile-icon.png"), 
        name: "Mis citas",
        namePath: "CitasUser",
        isActive: true,
        showTo: TYPES_ROLES.USER
    },
    { 
        icon: require("@/assets/images/nav/profile-icon.png"), 
        name: "Usuarios",
        namePath: "Admin",
        isActive: true,
        showTo: TYPES_ROLES.ADMIN
    },
    { 
        icon: require("@/assets/images/nav/citas-icon.png"), 
        name: "Citas",
        namePath: "Citas",
        isActive: true,
        showTo: 'all'
    },
    {
        icon: require("@/assets/images/nav/notification-icon.png"),
        name: "Notis",
        namePath: "Notifications",
        isActive: true,
        showTo: 'all'
    },
    { 
        icon: require("@/assets/images/nav/profile-icon.png"), 
        name: "Perfil",
        namePath: "UserProfile",
        isActive: true,
        showTo: 'all'
    },
];