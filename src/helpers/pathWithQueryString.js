/**
 *
 * @param {string} urlString
 * @param {Object} params
 * @param {'value'} params.key
 * @example getUrlWithParams('/address/streets', { cityCode: '1', districtCode: '4' })
 * @returns {String}
 */
export function pathWithQueryString(path, params) {
  params = params instanceof Object ? params : {};
  path = typeof path === "string" ? path : "";
  const paramKeys = Object.keys(params);

  const queryString = paramKeys
    .map((key) => {
      if (params[key] === "") {
        return null;
      } else {
        return `${key}=${params[key]}`;
      }
    })
    .filter((item) => item !== null)
    .join("&");
  return path.replace("?", "") + "?" + queryString;
}