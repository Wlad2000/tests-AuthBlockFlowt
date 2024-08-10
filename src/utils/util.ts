/** Func Returns mask for the mobile 
 * @param value number
 * 
 * 
 */
export const formatPhoneNumber = (value: string) => {
    value = value.replace(/\D/g, '');

    let formattedValue = '+';
    if (value.length > 0) {
        formattedValue += value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += ' ' + value.substring(2, 5);
    }
    if (value.length > 5) {
        formattedValue += ' ' + value.substring(5, 8);
    }
    if (value.length > 8) {
        formattedValue += ' ' + value.substring(8, 12);
    }

    return formattedValue.trim();
};