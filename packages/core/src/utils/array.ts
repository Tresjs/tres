/**
 * Like Array.filter, but modifies the array in place.
 * @param array - Array to modify
 * @param callbackFn - A function called for each element of the array. It should return a truthy value to keep the element in the array.
 */
export const filterInPlace = <T>(array: T[], callbackFn: (element: T, index: number) => unknown) => {
  let i = 0
  for (let ii = 0; ii < array.length; ii++) {
    if (callbackFn(array[ii], ii)) {
      array[i] = array[ii]
      i++
    }
  }
  array.length = i
  return array
}
