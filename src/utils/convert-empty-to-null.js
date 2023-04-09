export function convertEmptyToNull(object) {
  return Object.entries(object).reduce((acc, [key, val]) => ({...acc, [key]: val === '' ? null : val}), {});
}
