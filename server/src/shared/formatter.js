export const reduceProps = (data, props) =>
  props.reduce((obj, key) => {
    return {
      ...obj,
      [key]: data[key]
    }
  }, {})

export const mapProps = (data, props) =>
  data.map(d => {
    return props.reduce((prev, prop) => ({ ...prev, [prop]: d[prop] }), {})
  })

export const sortDesc = prop => (a, b) => b[prop] - a[prop]
