import moment from "moment";
import { ValdUtil } from '@/utils/ValdUtil.js'
import { CmonUtil } from '@/utils/CmonUtil.js'

export const TODAY   = 'TODAY';
export const WEEK_1  = 'WEEK_1';
export const MONTH_1 = 'MONTH_1';
export const MONTH_3 = 'MONTH_3';
export const MONTH_6 = 'MONTH_6';
export const YEAR_1  = 'YEAR_1';
export const YEAR_3  = 'YEAR_3';
export const YEAR_5  = 'YEAR_5';

export const YEAR_FORMAT = 'YYYY';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATETIME_FORMAT = DATE_FORMAT + '. ' + 'HH:mm';
export const SHORT_DATETIME_FORMAT = 'YY-MM-DD' + '. ' + 'HH:mm';

export const DATE_FORMAT_WITHOUT_DELIMETER = 'YYYYMMDD';
export const TIME_FORMAT_WITHOUT_DELIMETER = 'HHmmss';
export const DATETIME_FORMAT_WITHOUT_DELIMETER = DATE_FORMAT_WITHOUT_DELIMETER + ' ' + TIME_FORMAT_WITHOUT_DELIMETER;

export const DateUtil = {
    
    getDate: function(date, format) {

        if ( ValdUtil.isNull(date) ) {
            return '';
        } else {

            if ( ValdUtil.isNull(format) ) {
                format = DATE_FORMAT;
            }

            if ( typeof date == 'string' ) {
                if ( date.length == 8 ) {
                    return moment(date, DATE_FORMAT_WITHOUT_DELIMETER).format(format);
                } else if ( date.length == 10 ) {
                    return moment(date, DATE_FORMAT).format(format);
                } else {
                    return date;
                }
            } else {
                return moment(date).format(format);
            }            
        }
    },

    getCurrDateTime : function(format) {
        if ( ValdUtil.isNull(format) ) {
            format = DATETIME_FORMAT;
        }
        return moment().format(format);
    },

    getShortCurrDateTime : function(format) {
        if ( ValdUtil.isNull(format) ) {
            format = SHORT_DATETIME_FORMAT;
        }
        return moment().format(format);
    },

    getCurrDate : function(format) {
        if ( ValdUtil.isNull(format) ) {
            format = DATE_FORMAT;
        }
        return moment().format(format);
    },

    getCurrTime : function(format) {
        if ( ValdUtil.isNull(format) ) {
            format = TIME_FORMAT;
        }
        return moment().format(format);
    },

    convertDateFormat : function(date) {
        if ( ValdUtil.isNull(date) ) {
            return '';
        } else {
            if ( date.length === 8 ) {
                return moment(date, DATE_FORMAT_WITHOUT_DELIMETER).format(DATE_FORMAT);
            } else if ( date.length === 10 ) {
                return moment(date, DATE_FORMAT).format(DATE_FORMAT_WITHOUT_DELIMETER);
            } else {
                return date;
            }
        }
    },

    convertTimeFormat : function(time) {
        if ( ValdUtil.isNull(time) ) {
            return '';
        } else {
            if ( time.length === 6 ) {
                return moment(time, TIME_FORMAT_WITHOUT_DELIMETER).format(TIME_FORMAT);
            } else if ( time.length === 8 ) {
                return moment(time, TIME_FORMAT).format(TIME_FORMAT_WITHOUT_DELIMETER);
            } else {
                return time;
            }
        }
    },

    getFormatDate: function(date, format) {
        if ( ValdUtil.isNull(date) ) {
            return '';
        } else {
            if ( ValdUtil.isNull(format) ) {
                format = DATE_FORMAT;
            }

            if ( date.length === 10 ) {
                date = this.convertDateFormat(date);
            }

            return moment(date, DATE_FORMAT_WITHOUT_DELIMETER).format(format);
        }
    },

    getFormatTime: function(time, format) {
        if ( ValdUtil.isNull(time) ) {
            return '';
        } else {
            if ( ValdUtil.isNull(format) ) {
                format = TIME_FORMAT;
            }

            if ( time.length === 8 ) {
                time = this.convertTimeFormat(time);
            }
            return moment(time, TIME_FORMAT_WITHOUT_DELIMETER).format(format);
        }
    },

    getFormatDateTime: function(dateTime) {
        if ( ValdUtil.isNull(dateTime) ) {
            return '';
        } else {
            if ( dateTime.length === 14 ) {
                return moment(dateTime, DATETIME_FORMAT_WITHOUT_DELIMETER).format(DATETIME_FORMAT);
            }
        }
    },

    addDay: function(date, addDate, format) {
        if ( ValdUtil.isNull(date) ) {
            return '';
        } else {
            if ( ValdUtil.isNull(format) ) {
                format = DATE_FORMAT;
            }

            if ( date.length === 8 ) {
                date = this.convertDateFormat(date);
            }

            return moment(date, DATE_FORMAT_WITHOUT_DELIMETER).add(addDate, 'days').format(format);
        }
    },

    addMonth: function(date, addMonth, format) {
        if ( ValdUtil.isNull(date) ) {
            return '';
        } else {
            if ( ValdUtil.isNull(format) ) {
                format = DATE_FORMAT;
            }

            if ( date.length === 8 ) {
                date = this.convertDateFormat(date);
            }

            return moment(date, DATE_FORMAT_WITHOUT_DELIMETER).add(addMonth, 'months').format(format);
        }
    },

    isValidTerm: function(frDt, toDt) {
        if ( ValdUtil.isNull(frDt) ) {
            return false;
        }
        if ( ValdUtil.isNull(toDt) ) {
            return false;
        }

        let strtDt = moment(frDt);
        let endDt  = moment(toDt);

        let diffDay = moment.duration(endDt.diff(strtDt)).days();
        
        if ( diffDay >= 0 ) {
            return true;
        } else {
            return false;
        }
    },

    isValid: function(dt) {
        if ( ValdUtil.isNull(dt) ) {
            return false;
        } else {
            if ( dt.length === 8 ) {
                return moment(dt, DATE_FORMAT_WITHOUT_DELIMETER).isValid();
            } else if ( dt.length === 10 ) {
                return moment(dt, DATE_FORMAT).isValid();
            } else {
                return false;
            }
        }
    }

    ,getStndDt: function(div) {

        let fr = this.getCurrDate();
        let to = this.getCurrDate();

        if ( div === WEEK_1 ) {
            fr = this.addDay(to, -7);
        } else if ( div === MONTH_1 ) {
            fr = this.addMonth(to, -1);
        } else if ( div === MONTH_3 ) {
            fr = this.addMonth(to, -3);
        } else if ( div === MONTH_6 ) {
            fr = this.addMonth(to, -6);
        } else if ( div === YEAR_1 ) {
            fr = this.addMonth(to, -12);
        } else if ( div === YEAR_3 ) {
            fr = this.addMonth(to, -36);
        } else if ( div === YEAR_5 ) {
            fr = this.addMonth(to, -60);
        }else {
        }

        return {
            'fr': fr,
            'to': to
        }
    }
    ,isBetween: function(frDt, toDt) {

        if ( ValdUtil.isNull(frDt) || ValdUtil.isNull(toDt) ) {
            return false;
        }

        let currDt = this.getCurrDate(DATE_FORMAT_WITHOUT_DELIMETER);
        let _frDt  = frDt;
        let _toDt  = toDt;
        if ( frDt.length === 10 ) {
            _frDt = this.convertDateFormat(frDt.trim());
        }

        if ( toDt.length === 10 ) {
            _toDt = this.convertDateFormat(toDt.trim());
        }

        if ( currDt >= _frDt && currDt <= _toDt ) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 날짜 형식 변환 
     * 8자리 'YYYYMMDD' -> 'YYYY-MM-DD'
     * 14자리 'YYYYMMDDHH24MISS' -> 'YYYY-MM-DD, HH24:MI:SS'
     * 6자리 'HH24MISS' -> 'HH24:MI:SS'
     * 4자리 'HH24MI' -> 'HH24:MI'
     * @param {*} inputDate 
     * @returns 
     */
    dateToDash(inputDate) {
        if (typeof inputDate !== 'string') {
            return inputDate; // 문자열이 아닌 경우 그대로 반환
        }

        inputDate = CmonUtil.extractNumbers(inputDate);

        if(inputDate.length === 2) {
            // 'HH24' 를 'HH24'로 변환
            const hh24 = inputDate.slice(0, 2);
            return `${hh24}`;
        } else if(inputDate.length === 4) {
            // 'HH24MI' 를 'HH24:MI'로 변환
            const hh24 = inputDate.slice(0, 2);
            const mi = inputDate.slice(2, 4);
            return `${hh24}:${mi}`;
        } else if(inputDate.length === 6) {
            // 'HH24MISS' 를 'HH24:MI:SS'로 변환
            const hh24 = inputDate.slice(0, 2);
            const mi = inputDate.slice(2, 4);
            const ss = inputDate.slice(4, 6);
            return `${hh24}:${mi}:${ss}`;
        } else if (inputDate.length === 8) {
            // 'YYYYMMDD'를 'YYYY-MM-DD'로 변환
            return `${inputDate.slice(0, 4)}-${inputDate.slice(4, 6)}-${inputDate.slice(6, 8)}`;
        } else if (inputDate.length === 14) {
            // 'YYYYMMDDHH24MISS'를 'YYYY-MM-DD, HH24:MI:SS'로 변환
            const yyyyMMdd = inputDate.slice(0, 8);
            const hh24 = inputDate.slice(8, 10);
            const mi = inputDate.slice(10, 12);
            const ss = inputDate.slice(12, 14);
            return `${yyyyMMdd.slice(0, 4)}-${yyyyMMdd.slice(4, 6)}-${yyyyMMdd.slice(6, 8)}, ${hh24}:${mi}:${ss}`;
        } else {
            return inputDate; // 다른 형식의 입력이면 그대로 반환
        }
    },
    
    /**
     * 날짜 형식 변환
     * 'YYYY-MM-DD' -> 'YYYYMMDD'
     * @param {*} dateString 
     * @returns 
     */
    dateToYYYYMMDD(dateString) {
        let val = dateString;
        if(ValdUtil.isNotNull(dateString)){
            val = dateString.replace(/-/g, '');
        }
        return val;
    },

    piqdToDbDate(inputDate, includeTime = true) {

        if (!inputDate) {
            return inputDate;
        }

        const date = new Date(inputDate);

        if (isNaN(date.getTime())) {
            return inputDate;
        }
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
      
        let formattedDate = `${year}${month}${day}`;
      
        if (includeTime) {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
      
          formattedDate += `${hours}${minutes}${seconds}`;
        }
      
        return formattedDate;
    }

}