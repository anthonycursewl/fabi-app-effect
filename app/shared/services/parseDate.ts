export const parseDate = (date: string): string => {
    const currentDate = new Date()
    const parsedDate = new Date(date)

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
        return 'Fecha inválida'
    }

    const diffTime = Math.abs(currentDate.getTime() - parsedDate.getTime())
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30))
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))

    if (diffYears > 0) return `${diffYears}${diffYears === 1 ? 'año' : 'años'}`
    if (diffMonths > 0) return `${diffMonths}${diffMonths === 1 ? 'm' : 'm'}`
    if (diffWeeks > 0) return `${diffWeeks}${diffWeeks === 1 ? 'sm' : 'sm'}`
    if (diffDays > 0) return `${diffDays}${diffDays === 1 ? 'd' : 'd'}`
    if (diffHours > 0) return `${diffHours}${diffHours === 1 ? 'h' : 'h'}`
    if (diffMinutes > 0) return `${diffMinutes}${diffMinutes === 1 ? 'm' : 'm'}`

    return 'Justo ahora'
}