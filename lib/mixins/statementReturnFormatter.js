module.exports = (result, propertyNames, properties) => {
  let obj = Object.assign(...propertyNames.map(k => ({
    [properties[k].name || k]: this[k]
  })))
  let props = propertyNames.filter(key => (properties[key].pk))
  if (props.length === 1 && result.insertId) {
    obj[props[0]] = result.insertId
  }
  return [obj]
}
