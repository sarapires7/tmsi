export const dateFormatToDDMMYYYY = (isoString: string):string => {
    const date = new Date(isoString)
    return `${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth() + 1).padStart(2,'0')}.${String(date.getFullYear())}`
}