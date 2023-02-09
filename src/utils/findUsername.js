
export const findUsername = (arr, property, value) => {
    return arr.some((object) => {
        return object[property] === value
    })
}