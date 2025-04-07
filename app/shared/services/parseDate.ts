export const parseDate = (date: string): string => {
    const currentDate = new Date()
    const parsedDate = new Date(date)

    const diffTime = Math.abs(currentDate.getTime() - parsedDate.getTime())
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))

    if (diffYears > 0) return `${diffYears} años`
    if (diffMonths > 0) return `${diffMonths} meses`
    if (diffWeeks > 0) return `${diffWeeks} semanas`
    if (diffDays > 0) return `${diffDays} días`
    if (diffMinutes > 0) return `${diffMinutes} minutos`

    return 'Justo ahora'
}