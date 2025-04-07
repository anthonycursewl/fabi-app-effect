export const formatTimeUntil = (dateString: string): string => {
    // 1. Parsear la fecha de entrada y obtener la fecha actual
    const targetDate = new Date(dateString);
    const currentDate = new Date();

    if (isNaN(targetDate.getTime())) {
        return 'BRD | Fecha inválida';
    }

    const diffTime = targetDate.getTime() - currentDate.getTime();

    if (diffTime <= 0) {
        if (diffTime > -1000 * 60) {
             return 'Justo ahora / Ya pasó';
        }
        return 'La fecha ya ha pasado';
    }

    const secondsUntil = Math.ceil(diffTime / 1000);
    const minutesUntil = Math.ceil(diffTime / (1000 * 60));
    const hoursUntil = Math.ceil(diffTime / (1000 * 60 * 60));
    const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksUntil = Math.ceil(daysUntil / 7);
    const monthsUntil = Math.ceil(daysUntil / 30.4375);
    const yearsUntil = Math.ceil(daysUntil / 365);


    if (yearsUntil > 1) return `en ${yearsUntil} años`;
    if (yearsUntil === 1) return `en 1 año`;

    if (monthsUntil > 1) return `en ${monthsUntil} meses`;
    if (monthsUntil === 1) return `en 1 mes`;

    if (weeksUntil > 1) return `en ${weeksUntil} semanas`;
    if (weeksUntil === 1) return `en 1 semana`;

    if (daysUntil > 1) return `en ${daysUntil} días`;
    if (daysUntil === 1) return `en 1 día`;

    if (hoursUntil > 1) return `en ${hoursUntil} horas`;
    if (hoursUntil === 1) return `en 1 hora`;

    if (minutesUntil > 1) return `en ${minutesUntil} minutos`;
    if (minutesUntil === 1) return `en 1 minuto`;

    if (secondsUntil > 1) return `en ${secondsUntil} segundos`;
    if (secondsUntil === 1) return `en 1 segundo`;

    return 'Próximamente';
};