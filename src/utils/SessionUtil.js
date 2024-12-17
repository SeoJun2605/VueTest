import { useCookies } from 'vue3-cookies'
import * as types from '@/store/mutation-types'
import { ValdUtil } from './ValdUtil';

export const SessionUtil = {

    // Cookies
    clearCookies : function(key) {
        useCookies().cookies.remove(key);
    },

    setCookies: function(key, val) {
        useCookies().cookies.set(key, val, '1y', '/', '', true, 'None');
    },

    getCookies: function(key) {
        return useCookies().cookies.get(key);
    },

    // SessionStorage
    setStorageData: function(key, obj, useCache){
        var expireTime = new Date();

        if (useCache === undefined || useCache != false) {
            expireTime.setMinutes(expireTime.getMinutes() + 240);

            obj['expireTime'] = expireTime.getTime();
        }

        window.sessionStorage.setItem(key, JSON.stringify(obj));
    },

    getStorageData: function(key, useCache) {
        var nowTime = new Date().getTime();
        var dataObj = JSON.parse(window.sessionStorage.getItem(key));

        if (dataObj == null) {
            return null;
        }

        if (useCache !== undefined && useCache == false) {
            return dataObj;
        } else {
            if (dataObj['expireTime'] != null && nowTime < dataObj['expireTime']) {
                return dataObj;
            } else {
                return null;
            }
        }
    },

    removeStorageData: function(key) {
        window.sessionStorage.removeItem(key);
    },
    
    clearStorageData: function() {
        window.sessionStorage.clear();
    },

    // LocalStorage
    setLocalStorageData: function(key, obj, useCache){
        var expireTime = new Date();
        
        if (useCache === undefined || useCache != false) {
            expireTime.setMinutes(expireTime.getMinutes() + 240);

            obj['expireTime'] = expireTime.getTime();
        }

        window.localStorage.setItem(key, JSON.stringify(obj));
    },

    getLocalStorageData: function(key, useCache) {
        var nowTime = new Date().getTime();
        let obj = window.localStorage.getItem(key);
        let dataObj = '';
        if ( ValdUtil.isNotNull(obj) ) {
            dataObj = JSON.parse(obj);
        }
        if (dataObj == null) {
            return null;
        }

        if (useCache !== undefined && useCache == false) {
            return dataObj;
        } else {
            if (dataObj['expireTime'] != null && nowTime < dataObj['expireTime']) {
                return dataObj;
            } else {
                return null;
            }
        }
    },

    removeLocalStorageData: function(key) {
        window.localStorage.removeItem(key);
    },
    
    clearLocalStorageData: function() {
        window.localStorage.clear();
    },
    
    
    setToknData: function(key, obj, useCache){
        var expireTime = new Date();
        
        if (useCache === undefined || useCache != false) {
            // 토큰 유효기간 설정 
            // 분 기준
            expireTime.setMinutes(expireTime.getMinutes() + 1440);

            obj['expireTime'] = expireTime.getTime();
        }

        window.localStorage.setItem(key, JSON.stringify(obj));
    },

    getToknData: function(key, useCache) {
        var nowTime = new Date().getTime();
        var dataObj = JSON.parse(window.localStorage.getItem(key));
        
        if (dataObj == null) {
            return null;
        }

        if (useCache !== undefined && useCache == false) {
            return dataObj;
        } else {
            if (dataObj['expireTime'] != null && nowTime < dataObj['expireTime']) {
                return dataObj;
            } else {
                return null;
            }
        }
    },

    setToken: function(token) {
        this.setToknData(types.TOKN, {'TOKN': token});
    },

    getToken: function() {
        const data = this.getToknData(types.TOKN);
        if ( !!data ) {
            return data['TOKN']
        } else {
            return '';
        }
    },

    clearToken: function() {
        this.removeLocalStorageData(types.TOKN);
    },

    setUserInfo: function(userInfo) {
        this.setLocalStorageData(types.USER_INFO, userInfo, false);
    },

    getUserInfo: function() {
        return this.getLocalStorageData(types.USER_INFO, false);
    },

    clearUserInfo: function() {
        this.removeLocalStorageData(types.USER_INFO);
    },
    
    getUserId: function() {
        if ( !!this.getUserInfo() ) {
            return this.getUserInfo().userId;
        } else {
            return '';
        }
        
    },

    setMenuAuthList: function(menuAuthList) {
        this.setLocalStorageData('MENU_AUTH_LIST', {'MENU_AUTH_LIST': menuAuthList})
    },

    getMenuAuthList: function() {
        const data = this.getLocalStorageData('MENU_AUTH_LIST');
        if ( !!data ) {
            return data['MENU_AUTH_LIST']
        } else {
            return '';
        }
    },

    clearMenuAuthList: function() {
        this.removeLocalStorageData('MENU_AUTH_LIST');
    },

    //09-21 UserRoleList 함수 추가 
    setUserRoleList: function(roleList) {
        this.setLocalStorageData(types.ROLE_CD, {'ROLE_CD': roleList}, false);
    },

    getUserRoleList: function() {
        const data = this.getLocalStorageData(types.ROLE_CD, false);
        if( !!data ) {
            return data['ROLE_CD']
        } else {
            return '';
        }
    },

    hasRole: function(roleCd) {
        const roleList = this.getUserRoleList();
        if ( !!roleList ) {
            const rIdx = roleList.findIndex(data => roleCd === data.roleCd);
            if ( rIdx > -1 ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    clearUserRoleList: function() {
        this.removeLocalStorageData(types.ROLE_CD);
    },

    setCmonCdList: function(cmonCdList){
        var expireTime = new Date();
        var userCache  = expireTime.getMinutes() + 1440;
        this.setLocalStorageData('CMON_CD_LIST', {'cmonCdList':cmonCdList},userCache);
    },
    getCmonCdList: function(){
        var cmonCdList = this.getLocalStorageData('CMON_CD_LIST', false);
        
        if(cmonCdList != null){
            return cmonCdList;
        }
    },
    clearCmonCdList: function(){
        this.removeLocalStorageData('CMON_CD_LIST');
    },
}