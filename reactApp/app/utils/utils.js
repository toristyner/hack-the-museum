export const sortBy = (a, b, key = 'name') => {
  if (a[key] < b[key]) { return -1 }
  if (a[key] > b[key]) { return 1 }
  return 0
  a[key] > b[key]
}
