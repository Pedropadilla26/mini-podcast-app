export const dateStringIsOlderThanADay = (dateString: string) => {
    return new Date(dateString) > new Date(Date.now() - 1000 * 60 * 60)
}