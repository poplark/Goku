/*
 * 自动判断数值的精度
 * get precision automatically
 */
export function getPrecision(value) {
    const valueString = value.toString();
    if(valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if(valueString.indexOf('.') >=0) {
        precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
}
