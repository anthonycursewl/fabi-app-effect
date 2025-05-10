export const parseRole = (role: string): string => {
    if (role === "Admin") return "Administrador";
    if (role === "Contdr") return "Contador";
    if (role === "Default") return "Usuario";

    return ""
}