/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const diacriticSensitiveRegex = (string: string): string => {
  return string
    .replace(/a|á|à/gi, '[a,á,à,A,Á,À]')
    .replace(/b|v/gi, '[b,B,v,V]')
    .replace(/c|k|s|z/gi, '[c,C,k,K,s,S,z,Z]')
    .replace(/e|é|è/gi, '[e,é,è,E,É,È]')
    .replace(/g|h|j/gi, '[g,G,h,H,j,J]')
    .replace(/i|í|ì/gi, '[i,í,ì,I,Í,Ì]')
    .replace(/n|ñ/gi, '[n,N,ñ,Ñ]')
    .replace(/o|ó|ò/gi, '[o,ó,ò,O,Ó,Ò]')
    .replace(/u|ú|ü|ù/gi, '[u,ú,ü,ù,U,Ú,Ü,Ù]')
};
