import { CmonUtil } from '@/utils/CmonUtil.js'
import moment from 'moment'

export const ValdUtil = {
    
    checkNumber : function (event){
        return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0);
    },

    checkNumAndEng : function (str){
        var err = 0;
        for (var i=0; i<str.length; i++)  {
            var chk = str.substring(i,i+1);
            if(!chk.match(/[0-9]|[a-z]|[A-Z]/)) {
                err = err + 1;
            }
        }
        return err;
    },

    valid : function(f) {
        f.value = removeEmoji(f.value);
    },

    checkPrice : function(_this, divId)  {
        var temp = _this.value; // .toLowerCase();
        if(!/^\d*(\.\d{0,2|)?$/.test(temp)){
            alert("형식이 올바르지 않습니다.");
            return;
        }
    },

    validCurrency : function(value){
        var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
        if (regex.test(value))
        {
            var twoDecimalPlaces = /\.\d{2}$/g;
            var oneDecimalPlace = /\.\d{1}$/g;
            var noDecimalPlacesWithDecimal = /\.\d{0}$/g;

            if(value.match(twoDecimalPlaces ))
            {
                return value;
            }
            if(value.match(noDecimalPlacesWithDecimal))
            {
                return value+'00';
            }
            if(value.match(oneDecimalPlace ))
            {
                return value+'0';
            }
            return value+".00";
        }
        return null;
    },

    limitCharSize : function(valueStr, limitLen) {
        if (String(valueStr).length > limitLen) {
            this.alert(limitLen + '자 이내로 작성해 주세요.');
            valueStr = String(valueStr).substring(0, limitLen);
        }
        return valueStr;
    },

    limitByteSize : function(valueStr, limitByte) {
        // console.log(valueStr.value);
        var mbytes = 0;
        for(i=0; i < String(valueStr.value).length ; i++) {
            var ch = String(valueStr.value).charAt(i)
            if(escape(ch).length > 4) {
                mbytes += 2;
            } else if(ch == '\n') {
                if(String(valueStr.value).charAt(i-1) != '\r') {
                    mbytes += 1;
                }
            } else {
                mbytes += 1;
            }
            if(mbytes > limitByte) {
                valueStr.value = String(valueStr.value).substr(0,i);
                this.alert('최대 입력바이트가 넘었습니다.');
                break;
            }
        }
        return valueStr.value;
    },

    onlyNumCheck : function(valueStr) {
        var re = /^[0-9\r\n]+$/;
        if (!re.test(valueStr)) {
            valueStr = String(valueStr).replace(/[^0-9]/g,'');
        }

        // if(valueStr == '') {
        //     valueStr = 0;
        // }
        return valueStr;
    },
    
    /**
     * 숫자 값 input 사용 시 문자열 입력 값 제거 및 최대 최소 값 적용
     * str : 문자열
     * min : 최소 값 
     * max : 최대 값
     */
    onlyStayNum(str,min,max){
        if(str != null && str != ''){
            str = str.replace(/^0+/, '');
            if(str.substr(0,1)==0){
                
            }
            let regex = /[^0-9]/gi;		 		// 숫자가 아닌 문자열을 매칭하는 정규식
            str = str.replace(regex,"");	
        }
        //최대 최소 값 비교
        if(str < min){
            str = min;
        }else if(str > max){
            str = max
        }

        if(str == null || str == ''){
            str = 0;
        }
        return  str;
    },
    onlyNumCheck : function(valueStr, option) {
        var re = /^[0-9\r\n]+$/;
        var reg = /^[+\-]?\d+(?:[.]\d+)?$/g;
        //Option(1) : 오직 숫자만 허용 시
        if(!option || option == 1) {
            if (!re.test(valueStr)) {
                this.alert('숫자만 입력가능합니다.');
                valueStr = String(valueStr).replace(/[^0-9]/g,'');
            }
        }
        //Option(2) : +- 기호를 제외한 수숫점까지 허용 시
        if(option && option == 2) {
            re = /^[0-9.\r\n]+$/;
            if (!re.test(valueStr)) {
                this.alert('숫자형식이 잘못되었습니다.');
                valueStr = String(valueStr).replace(/[^0-9.]/g,'');
            }
        }

        if(String(valueStr).startsWith('.')) {
            valueStr = '0'+String(valueStr);
        }
        //console.log($.isNumeric(valueStr));

        //if (!reg.test(valueStr)) {
        if (!$.isNumeric(valueStr)) {
            this.alert('숫자형식이 잘못되었습니다.');
        //Option(3) : +-, 소숫점 까지 모두 허용
        if(option && option == 3) {
            valueStr = String(valueStr).replace(/[^0-9.]/g,'');
        }
        reg = /^[+\-]?\d+(?:[.]\d+)?/g;
        var matches = reg.exec(valueStr);
        //console.log(matches);
        if(matches && matches.length > 0) {
            valueStr = matches[0];
        } else {
            valueStr = '';
        }
        }

        return valueStr;
    },

    checkNum : function(checkTxt) {
        var isContain = false,
            pattern = /^[0-9\r\n]+$/;

        if (pattern.test(checkTxt)) {
            isContain = true;
        }
        return isContain;
    },


    isValidUrl : function(strUrl) {
        var expUrl = /^http[s]?\:\/\//i;
        return expUrl.test(strUrl);
    },

    isValidEmail : function(email) {
        //var re = /^(([^<>()[]\\.,;:\s@\"]+(\.[^<>()[]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\??.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //alert(re.test(email));

        //return email.match(re);
        // if(!re.test(email)) {
        //     return false
        // }
        // return true;
        return re.test(email);
    },

    isValidPhoneNumber : function(number) {
        var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        return re.test(number);
    },

    isValidTelNumber: function(number) {
        var re = /^(0(2|[3-6][1-5]))-?\d{3,4}-?\d{4}$/;
        return re.test(number);
    },

    isValidAccountNumber: function(number) {
        var re = /^[0-9,-]{3,6}-[0-9,-]{2,6}-[0-9,-]+$/;
        return re.test(number);
    },

    isValidPassword : function(str) {
        // /^[a-zA-Z0-9]{10,15}$/
        //var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+]).{8,15}$/;
        return re.test(str);
    },

    isValidId : function(str) {
        var re = /^\w+$/;
        return re.test(str);
    },

    checkPassword : function(fromName) {
        var tmpform = eval("document.frm."+fromName);
        var pwd = tmpform.value;
        if(!/^[a-zA-Z0-9]{10,15}$/.test(pwd)) {
            alert('Passwords must use a combination of letters and numbers 6 ~ 15 characters.');
            return tmpform.focus;
        }

        var chk_num = pwd.search(/[0-9]/g);
        var chk_eng = pwd.search(/[a-z]/ig);

        if(chk_num < 0 || chk_eng < 0) {
            alert('Passwords must use a combination of letters and numbers 6 ~ 15 characters.');
            return tmpform.focus;
        }
    },

    engNumCheck : function(fieldValue) {
        var re = /^[A-Za-z0-9+]*$/;
        if (!re.test(fieldValue)) {
            this.alert('영문, 숫자만 입력 가능합니다.');
            fieldValue = String(fieldValue).replace(/[^A-Za-z0-9]/g,'');
        }

        return fieldValue;
    },

    checkInputValue : function(fieldValue) {
        var pattern = /(^[a-zA-Z0-9 -/:-@\[-\`\{-\~]+$)/;
        if(fieldValue != "" && !pattern.test(fieldValue)){
            this.alert("Please enter alphabet, number and symbol only", "warning");
            return false;
        }
    },

    isValidBizRegNo : function(val) {
        var result = false;

        if(this.onlyNumCheck(val).length == 10) result = true;
        return result;
    },


    isValidCorpNo : function(val) {
        var result = false;

        if(this.onlyNumCheck(val).length == 13) result = true;
        return result;
    },

    validChecker : function(val, type, size) {
        var result = false;

        if(this.isNotNull(val)) {
            switch (type) {
            case 'email' :
                return this.isValidEmail(val);
            case 'phone' :
                return this.isValidPhoneNumber(val);
            case 'bizno' :
                return this.isValidBizRegNo(val);
            case 'mxlen' :
                if(size > 0) return val == this.limitCharSize(val, size);
                break;
            default :
                break;
            }
        }

        return result;
    },

    numberTypeMaxLengCheck : function(obj) {
        if (obj.value.length > obj.maxLength){
            obj.value = obj.value.slice(0, obj.maxLength);
        }
    },
    
    isNull: function(str) {
        var type = typeof str;

        if (str === undefined || str === "undefined" || str === null) {
            return true;
        }

        if (type === undefined || type === "undefined" || type === null) {
            return true;
        }

        if (type === "string" && CmonUtil.trim(str) == "") {
            return true;
        }

        return false;
    },

    isNotNull: function(str) {
        return !this.isNull(str);
    },

    isObject: function(obj) {
        if ( obj !== null && typeof obj === "object" ) {
            return true;
        }

        return false;
    },


    isNumber: function(num) {
        var regex = /^[0-9]+$/;
        return regex.test(num);
    },

    isValidEmailPmsVer: function(str) {
        if (typeof str === "string") {
            var pattern = /^[0-9a-z]([-_\.]?[0-9a-z])*@[0-9a-z]([-_\.]?[0-9a-z])*\.[a-z]{2,3}$/i;

            if (pattern.test(str)) {
                return true;
            }
        }

        return false;
    },

    isEmptyList: function(arr) {
        var type = typeof arr;

        if (!arr || type === "undefined" || arr === null) {
            return true;
        }

        if (type !== 'object') {
            return true;
        }

        if (arr.length > 0) {
            return false;
        }

        return true;
    },

    //Json 타입 data NULL 여부 체크
    isEmptyJson(data){
        if ((data === undefined || data === null || data === '' || (data === undefined & data.length === 0))) {
            return true;
        }else{
            let key = Object.keys(data);
            let val = '';
            key.forEach(el=>{
                if(data[el] != undefined && CmonUtil.trim(data[el]).length > 0){
                    val = data[el];
                }
            });
            if(val != ''){
                return false;
            }
        }
        return true;
    },
    // 데이터객체 문자열 trim
    trimDataObject(dataObject) {
        for (const key in dataObject) {
            if (typeof dataObject[key] === "string") {
                dataObject[key] = dataObject[key].trim();
            }
        }
        return dataObject;
    },
    
    // null 체크 및 길이 체크 (data / 길이 / msg / null 체크 여부=디폴트 true)
    valdLenNull(data, maxLen, msg, chkIsNull) {
        debugger; 
        if(ValdUtil.isNull(chkIsNull)) {
            chkIsNull = true;
        }
        if (chkIsNull && ValdUtil.isNull(data)) {
            CmonUtil.alert(`${msg} 필수 입력입니다.`);
            return false;
        }
        if(ValdUtil.isNotNull(data)) {
            let bytes = CmonUtil.getBytesUTF8(data);
            if (ValdUtil.isNotNull(maxLen) && bytes > maxLen) {
                CmonUtil.alert(`${msg} 최대 ${maxLen}자리 입력 가능합니다.`);
                return false;
            }
        }
        
        return true;
    },

    isValdDt(dt) {
        let isVald = false;
        
        if (ValdUtil.isNull(dt)) {
            return isVald;
        }

        return moment(dt, "YYYY-MM-DD").isValid();
    },

    // 시분초(HH24MISS) 값에 대한 유효성 체크
    isValdTm(tm) {
        let isVald = false;
        
        if (ValdUtil.isNull(tm)) {
            return isVald;
        }

        const tmPattern = /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9]){2}$/;
        if (tmPattern.test(tm)) {
            isVald = true;
        }
        
        return isVald;
    },
}