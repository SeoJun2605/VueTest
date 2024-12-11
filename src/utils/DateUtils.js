export default {
    formatDateWithHyphen(value) {
        let val = value.replace(/[^0-9]/g, '');
        let len = val.length;
        let result = '';

        if (len <= 4) {
            result = val;
        }
        else if (len <= 6) {
            result += val.substring(0, 4);
            result += "-";
            result += val.substring(4);
        }
        else if (len <= 8) {
            result += val.substring(0, 4);
            result += "-";
            result += val.substring(4, 6);
            result += "-";
            result += val.substring(6);
        }

        return result;
    },

    validateDateFormat(dateString) {
        // 빈 문자열이면 true 반환하여 포커스 이동 허용
        if (!dateString) return true;

        const dateParts = dateString.split('-');

        if (dateParts.length !== 3) return false;

        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);

        const d_len = dateParts[2].toString().length;

        if (d_len !== 2) return false;
        if (month < 1 || month > 12) return false;

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) return false;

        return true;
    }
}