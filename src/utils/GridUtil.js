import { ValdUtil } from '@/utils/ValdUtil.js'
import { CmonUtil } from '@/utils/CmonUtil.js'
import { SessionUtil } from '@/utils/SessionUtil.js'
import router from '@/router'

export const GridUtil = {

    /**
     * 신규 행아이디 구하기
     * gridId : 그리드 아이디
     */
    getNewRowId: function(gridId) {
        let rowList = $("#" + gridId).jqGrid("getDataIDs");
        let rowCnt = rowList.length;
        let rowId = 0;
        let m = 0;

        for (m = 0; m < rowCnt; m++) {
            if (CmonUtil.toInt(rowList[m]) > rowId) {
                rowId = CmonUtil.toInt(rowList[m]);
            }
        }

        return rowId + 1;
    },

    /**
     * 컬럼 인덱스 구하기
     * gridId  : 그리드 아이디
     * colName : 컬럼명
     */
    getColIndex: function(gridId, colName) {
        let modelList = $("#" + gridId).jqGrid("getGridParam", "colModel");
        let modelCnt = modelList.length;
        let m = 0;
        let colIndex = 0;

        for (m = 0; m < modelCnt; m++) {
            if (modelList[m].name == colName) {
                colIndex = m;
                break;
            }
        }

        return colIndex;
    },

    /**
     * 체크된 목록 구하기
     * gridObj : 그리드 객체
     */
    getCheckedList: function(gridObj) { 
        var selectedRowIds = gridObj.jqGrid('getGridParam', 'selarrrow');
        let selectedRowData = []; // 선택한 데이터를 담을 배열 초기화

        for (var i = 0; i < selectedRowIds.length; i++) {
            var rowData = gridObj.jqGrid('getRowData', selectedRowIds[i]);
            rowData['rowid'] = selectedRowIds[i];
            selectedRowData.push(rowData);
        }

        return selectedRowData;
    },

    /** 
     * 틀고정 행 높이 설정
     * grid : 그리드
     */
    setFixedRowHeight: function(grid) {
        if (grid.fbDiv != null && typeof grid.fbDiv !== "undefined") {
            let $rows = $("div > table.ui-jqgrid-btable > tbody > tr", grid.bDiv);

            $("table.ui-jqgrid-btable > tbody > tr", grid.fbDiv).each(function(idx) {
                if ($(this).hasClass("jqgrow")) {
                    let rowHight = $($rows[idx]).find("td:first-child").outerHeight();

                    $(this).find("td:first-child").innerHeight(rowHight);
                    $($rows[idx]).find("td:first-child").innerHeight(rowHight);
                }
            });

            $(grid.fbDiv).height(grid.bDiv.clientHeight);
        }
    },

    /**
     * 틀고정 스크롤 이벤트
     * grid : 그리드
     */
    onFixedScrollEvent: function(grid) {
        $(grid.fbDiv).on("mousewheel DOMMouseScroll", function(e) {
            let st = $(grid.bDiv).scrollTop();

            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                // up
                $(grid.bDiv).scrollTop(st - 25);
            } else {
                // down
                $(grid.bDiv).scrollTop(st + 25);
            }

            e.preventDefault();
        });
    },

    /**
     * 정렬 페이지 정보 수정
     * grid    : 그리드
     * resData : 응답 데이터
     */
    updateSortPager: function(gridId, resData) {
        let gridList = $("#" + gridId);

        if (gridList.jqGrid("getGridParam", "datatype") === "json") {
            let totCnt   = resData.data.totalCount;
            let currPage = resData.data.currentPage;
            let lastPage = Math.ceil(totCnt / resData.data.rowCount);

            // 페이지 정보
            gridList.data("totCnt", totCnt);
            gridList.data("currPage", currPage);
            gridList.data("lastPage", lastPage);

            // 페이지 설정
            gridList.jqGrid("setGridParam", {
                datatype: "local",
                records: totCnt,
                page: currPage,
                lastpage: lastPage
            });

            // 전체 건수 체크
            if (totCnt == 0) {
                this.$swal.fire("결과가 존재하지 않습니다.", "", "info");
            }
        } else {
            // 페이지 설정
            gridList.jqGrid("setGridParam", {
                records: gridList.data("totCnt"),
                page: gridList.data("currPage"),
                lastpage: gridList.data("lastPage")
            });
        }

        // 페이지 정보 수정
        gridList[0].updatepager(false, true);
    },

    /**
     * Function for resize the grid according to the width of the resized window
     * @param string grid_id - jqGrid id used in current page
     * @param string div_id - parent div_id according to whom it will need to resize
     * @param string width - width of the grid that has been set during initialize the grid setup
     * @returns void
     */
    resizeJqGridWidth: function(grid_id, div_id, width, shrinkToFit) {
        if (typeof(shrinkToFit) === 'undefined') {
            shrinkToFit = true;
        }
        $(window).bind('resize', function() {    
            if($('#' + div_id).width()>0){
                $('#' + grid_id).setGridWidth(width, shrinkToFit); //Back to original width
                $('#' + grid_id).setGridWidth($('#' + div_id).width(), shrinkToFit); //Resized to new width as per window            
            }
        }).trigger('resize');
    },

    /**
     * 넓이 리사이즈
     * gridId   : 그리드 아이디
     * wraperId : 부모DIV 아이디
     */
    resizeWidth: function(gridId, wraperId) {
        $(window).bind("resize", function() {
            let gridList = $("#"+ gridId);

            // 그리드 넓이 설정
            gridList.jqGrid("setGridWidth", $("#" + wraperId).width(), true);

            // 헤더 넓이 설정
            if (ValdUtil.isObject(gridList.jqGrid("getGridParam", "groupHeader"))) {
                // 데이터 첫번째 td 목록
                let firstTdList = $("#gview_" + gridId + " table.ui-jqgrid-btable tr.jqgfirstrow td");

                // 헤더 첫번째 th 넓이 설정
                $("#gview_" + gridId + " table.ui-jqgrid-htable tr.jqg-first-row-header th").each(function(idx) {
                    $(this).css("width", firstTdList.eq(idx).css("width"));
                });
            }
         }).trigger("resize");
    },

    /**
     * 헤더 리사이즈
     * gridId   : 그리드 아이디
     * wraperId : 부모DIV 아이디
     */
    resizeHeader: function(gridId, wraperId) {
        let gridList = $("#"+ gridId);

        // 그리드 넓이 설정
        gridList.jqGrid("setGridWidth", $("#" + wraperId).width(), true);

        // 헤더 넓이 설정
        if (gridList.jqGrid("getGridParam", "groupHeader") == null) {
            // 데이터 첫번째 td 목록
            let firstTdList = $("#gview_" + gridId + " table.ui-jqgrid-btable tr.jqgfirstrow td");

            // 헤더 첫번째 th 넓이 설정
            $("#gview_" + gridId + " table.ui-jqgrid-htable tr.ui-jqgrid-labels th").each(function(idx) {
                $(this).css("width", firstTdList.eq(idx).css("width"));
            });
        }
    },

    /**
     * 컬럼 헤더 리사이즈
     * gridId : 그리드 아이디
     * colIdx : 컬럼 인덱스
     * width  : 넓이
     */
    resizeColHeader: function(gridId, colIdx, width) {
        $("#gview_" + gridId + " table.ui-jqgrid-htable tr.jqg-first-row-header th").eq(colIdx).css("width", width);
    },

    /**
     * 정렬
     */
    sortable: function(gridId, actYn) {
        let gridList = $("#" + gridId);

        // 정렬 활성화
        if (actYn == true) {
            gridList.jqGrid("sortableRows", {
                disabled: false,
                start: function(e, ui) {
                    // tr hover 초기화
                    gridList.find("tr.ui-state-hover").each(function() {
                        $(this).removeClass("selected-row ui-state-hover");
                    });

                    // 아이템 hover 추가
                    ui.item.addClass("ui-state-hover");

                    // 빈 tr 높이 설정
                    ui.placeholder.css("height", ui.item.height() + "px");
                },
                stop: function(e, ui) {
                    // 아이템 hover 제거
                    ui.item.removeClass("ui-state-hover");
                }
            });

        // 정렬 비활성화
        } else {
            gridList.jqGrid("sortableRows", { disabled: true });
        }
    },

    gridOptions: function(rowNumParam, loadonceParam) {
        let rowNum = 30;
        let loadonce = false;
        if(rowNumParam != null) {
            rowNum = rowNumParam;
        }
    
        if(loadonceParam) {
            loadonce = loadonceParam;
        }
        
        return {
            ajaxGridOptions: { contentType: "application/json;charset=UTF-8" },
            datatype: "json",
            height: 580,
            autowidth: true,
            shrinkToFit: true,
            autoencode: false,
            rowNum: rowNum,
            rowList: [30, 50, 100, 300 ],
            //recordtext: "View {0} ~ {1} of {2}",
            recordtext: '총 {2} 중 {0} - {1} 보기',
            page: 0,
            // 정상 Server Response 일 경우 아래 옵션을 처리해야 jqgrid 내부에서 Model Mapping 일 정상 처리됨.
            jsonReader: {
                root: 'data.result',
                records: 'data.totalCount',
                total: function (obj) {
                    if ( obj.data ) {
                        let totalPage = Math.ceil(obj.data.totalCount / obj.data.rowCount);

                        if ( obj.data.totalCount > 0)
                            return totalPage
                    }
                },
                page: 'data.currentPage'
            },
            loadui: 'disable',
            loadBeforeSend: function(jqXHR) {
                if ( !SessionUtil.getToken() ) {
                    CmonUtil.clearSession();
                    router.push({ name: 'Login' });
                } else {
                    jqXHR.setRequestHeader("Authorization", "Bearer " + SessionUtil.getToken());
                }
            },
            beforeRequest: function() {
                
            },
            loadComplete: function(response) {
                CmonUtil.processLoading(false);
            },
            // Server Exception Handling
            loadError: function(xhr, status, error) {

                CmonUtil.processLoading(false);
                if ( xhr.status === 403 ) {
                    // 토큰 없을 시 Login 화면으로 이동
                    CmonUtil.clearSession();
                    router.push({name: 'Login'});
                    window.vueInstance.alert('세션이 종료되었습니다.<br>다시 로그인 해주세요.');
                } else {
                    if ( !!xhr.responseJSON && !!xhr.responseJSON.message ) {
                        window.vueInstance.alert(xhr.responseJSON.message);
                    } else {
                        window.vueInstance.alert('서버와 통신중 오류가 발생되었습니다.<br>다시 시도해 주시기 바랍니다.');
                    }
                }
            },
            cmTemplate: {sortable: false},
            pager: "#pager_list",
            viewrecords: true,
            hidegrid: false,
            loadonce: loadonce,
            gridview: true,	// true 설정 시 grid 속도 3~5배 향상됨. 단, treeGrid, subGrid 또는 afterInsertRow 이벤트를 사용할 수 없습니다.
        }
    },
    commonEditGridOptions (rowNumParam, loadonceParam) {
        var rowNum = 30;
        var loadonce = false;
        if(rowNumParam) {
            rowNum = rowNumParam;
        }
    
        if(loadonceParam) {
            loadonce = loadonceParam;
        }
    
        var header = {};
        var token = SessionUtil.getStorageData('jwtToken', false);
        
    
        return {
            ajaxGridOptions: { contentType: "application/json;charset=UTF-8" },
            datatype: "local",
            height: 588,
            autowidth: true,
            shrinkToFit: true,
            cellEdit : true,
            cellsubmit : "clientArray",
            autoencode: false,
            rowNum: rowNum,
            rowList: [30, 50, 100, 300 ],
            //recordtext: "View {0} ~ {1} of {2}",
            recordtext: '총 {2} 중 {0} - {1} 보기',
            page: 0,
            // 정상 Server Response 일 경우 아래 옵션을 처리해야 jqgrid 내부에서 Model Mapping 일 정상 처리됨.
            jsonReader: {
                root: 'rtnData.result',
                records: 'totalCount',
                total: function (obj) {
                    var totalPage = 0;
                    if(obj) {
                        totalPage = Math.ceil(obj.totalCount / obj.rowCount);
                    }
                    if(obj.totalCount > 0)
                        return totalPage
                },
                page: 'currentPage'
            },
            loadui: 'disable',
            loadBeforeSend: function(jqXHR) {
                let tokn = SessionUtil.getToken();
                jqXHR.setRequestHeader("Authorization", "Bearer " + tokn);
                // jqXHR.setRequestHeader("Authorization", "Bearer " + token.jwtToken);
            },
            beforeRequest: function() {
    //        	$(this).jqGrid('getGridParam', 'url')
                startTime = new Date().getTime();
                // console.log('startTime : ' + (startTime)/1000);
                if ($(this).jqGrid("getGridParam", "datatype") == "json") {
                    if (spinner == null) {
                        spinner = new Spinner(spinnerOpts).spin(spinner_div);
                    } else {
                        spinner.spin(spinner_div);
                    }
                }
            },
            loadComplete: function(response) {
                if ( !!response.rtnCd && response.rtnCd != '0000' ) {
                    Swal.alert([response.rtnMsg, 'info']);
                }
            },
            // Server Exception Handling
            loadError: function(xhr, status, error) {
                spinner.stop(spinner_div);
                ajaxErrorHandle(xhr);
            },
            cmTemplate: {sortable: false},
            pager: "#pager_list",
            viewrecords: true,
            hidegrid: false,
            loadonce: loadonce,
            gridview: true,	// true 설정 시 grid 속도 3~5배 향상됨. 단, treeGrid, subGrid 또는 afterInsertRow 이벤트를 사용할 수 없습니다.
        }
    },
    editGridOptions: function(rowNumParam, loadonceParam) {
        let rowNum = 30;
        let loadonce = false;
        if(rowNumParam) {
            rowNum = rowNumParam;
        }
    
        if(loadonceParam) {
            loadonce = loadonceParam;
        }
    
        return {
            ajaxGridOptions: { contentType: "application/json;charset=UTF-8" },
            datatype: "local",
            height: 588,
            autowidth: true,
            shrinkToFit: true,
            cellEdit : true,
            cellsubmit : "clientArray",
            autoencode: false,
            rowNum: rowNum,
            rowList: [30, 50, 100, 300 ],
            //recordtext: "View {0} ~ {1} of {2}",
            recordtext: '총 {2} 중 {0} - {1} 보기',
            page: 0,
            // 정상 Server Response 일 경우 아래 옵션을 처리해야 jqgrid 내부에서 Model Mapping 일 정상 처리됨.
            jsonReader: {
                root: 'rtnData.result',
                records: 'totalCount',
                total: function (obj) {
                    let totalPage = 0;
                    if(obj) {
                        totalPage = Math.ceil(obj.totalCount / obj.rowCount);
                    }
                    if(obj.totalCount > 0)
                        return totalPage
                },
                page: 'currentPage'
            },
            loadui: 'disable',
            loadBeforeSend: function(jqXHR) {
                let tokn = SessionUtil.getToken();
                jqXHR.setRequestHeader("Authorization", "Bearer " + tokn);
                // jqXHR.setRequestHeader("Authorization", "Bearer " + token.jwtToken);
            },
            beforeRequest: function() {
                if ($(this).jqGrid("getGridParam", "datatype") == "json") {
                    // if (spinner == null) {
                    //     spinner = new Spinner(spinnerOpts).spin(spinner_div);
                    // } else {
                    //     spinner.spin(spinner_div);
                    // }
                }
            },
            loadComplete: function(response) {
                // if ( !!response.rtnCd && response.rtnCd != '0000' ) {
                //     Swal.alert([response.rtnMsg, 'info']);
                // }
            },
            // Server Exception Handling
            loadError: function(xhr, status, error) {
                // spinner.stop(spinner_div);
                // ajaxErrorHandle(xhr);
            },
            cmTemplate: {sortable: false},
            pager: "#pager_list",
            viewrecords: true,
            hidegrid: false,
            loadonce: loadonce,
            gridview: true,	// true 설정 시 grid 속도 3~5배 향상됨. 단, treeGrid, subGrid 또는 afterInsertRow 이벤트를 사용할 수 없습니다.
        }
    },
    
    gridScrollOptions: function(rowNumParam, loadonceParam) {
        let rowNum = 30;
        let loadonce = false;
        if(rowNumParam) {
            rowNum = rowNumParam;
        }
    
        if(loadonceParam) {
            loadonce = loadonceParam;
        }
    
        return {
            ajaxGridOptions: { contentType: "application/json;charset=UTF-8" },
            datatype: "json",
            height: 576,
            autowidth: true,
            shrinkToFit: true,
            autoencode: false,
            rowNum: rowNum,
            rowList: [ 30, 50, 100, 300 ],
            recordtext: '총 {2} 중 {0} - {1} 보기',
            page: 1,
            scroll: true,
            // 정상 Server Response 일 경우 아래 옵션을 처리해야 jqgrid 내부에서 Model Mapping 일 정상 처리됨.
            jsonReader: {
                root: 'rtnData.result',
                records: 'totalCount',
                total: function (obj) {
                    let totalPage = 0;
                      if(obj) {
                        totalPage = Math.ceil(obj.totalCount / obj.rowCount);
                    }
                      if(obj.totalCount > 0)
                        return totalPage
                },
                page: 'currentPage',
                repeatitems: false
            },
            loadui: 'disable',
            loadBeforeSend: function(jqXHR) {
                if ( !SessionUtil.getToken() ) {
                    CmonUtil.clearSession();
                    router.push({ name: 'Login' });
                } else {
                    jqXHR.setRequestHeader("Authorization", "Bearer " + SessionUtil.getToken());
                }
            },
            beforeRequest: function() {
                
            },
            loadComplete: function(response) {
                CmonUtil.processLoading(false);
                console.log(response);
            },
            // Server Exception Handling
            loadError: function(xhr, status, error) {
                CmonUtil.processLoading(false);
                if ( xhr.status === 403 ) {
                    // 토큰 없을 시 Login 화면으로 이동
                    CmonUtil.clearSession();
                    router.push({name: 'Login'});
                    window.vueInstance.alert('세션이 종료되었습니다.<br>다시 로그인 해주세요.');
                } else {
                    window.vueInstance.alert('서버와 통신중 오류가 발생되었습니다.<br>다시 시도해 주시기 바랍니다.');
                }
            },
            cmTemplate: {sortable: false},
            pager: "#pager_list",
            viewrecords: true,
            hidegrid: false,
            loadonce: loadonce,
            gridview: true,	// true 설정 시 grid 속도 3~5배 향상됨. 단, treeGrid, subGrid 또는 afterInsertRow 이벤트를 사용할 수 없습니다.
        }
    },
    
    /**
     * 그리드 데이터를 얻는다 (multiselect + cellEdit)
     * @param gridObj
     * @param 신규/변경/삭제의 데이터만 넘긴다
     * @returns {Array}
     */
    gridModifiedGetData: function(gridObj)
    {
        let arr = [];
    
        this.gridCancelEdit(gridObj);
    
        let arrChg = gridObj.jqGrid('getRowData');
    
        for (let ix = 0, _max = arrChg.length ; ix < _max ; ix ++)
        {
            let data = arrChg[ix];
            let crud = data.crud;
    
            if(crud == "D" ||  crud == "U" || crud == "C"){
                arr.push(data);
            }
        }
        return arr;
    },
      /**
     * 그리드 데이터를 얻는다 
     * @param gridObj
     * @param rowid  없을 시 전체 데이터 return 
     */
    getGridRowData: function(gridObj,rowid)
    {
        let val = '';
        if(ValdUtil.isNotNull(gridObj)){
            if(ValdUtil.isNotNull(rowid)){
                val = gridObj.jqGrid('getRowData',rowid);
            }else{
                val = gridObj.jqGrid('getRowData');
            }
        }
        return val;
    },
    /**
     * rowid 와 colNm 으로 cell 데이터를 얻는다 
     * @param gridObj
     * @param rowid 
     * @param colNm 
     * return cellData
     */
    getGridCellData: function(gridObj,rowid,colNm)
    {
        let val = gridObj;
        if(ValdUtil.isNotNull(gridObj)){
            if(ValdUtil.isNotNull(colNm)){
                val = gridObj.getCell(rowid,colNm);
            }
        }
        return val;
    },

    gridCancelEdit: function(gridObj)
    {
        if (gridObj.jqGrid("getGridParam", "cellEdit") == true)
        {
            let rowId = gridObj.jqGrid("getGridParam", "selrow");
    
            if (rowId)
            {
                let colModel = gridObj.jqGrid("getGridParam", "colModel");
                let iRow = gridObj.jqGrid("getInd", rowId);
    
                for (let ix = 0, _max = colModel.length ; ix < _max ; ix++ )
                {
                    if (gridObj.find("tr#" + rowId).find("td:eq(" + (ix + 1) + ")").hasClass("edit-cell") == true)
                    {
                        gridObj.jqGrid("saveCell", iRow, ix + 1);
                    }
                }
            }
        }
    
        return gridObj;
    },
    
    onPagingCommon: function(pageData, gridObj, callback) {
        let currentPage  = $(gridObj).getGridParam("page");
        let endPage      = $(gridObj).getGridParam("lastpage");
        let rowCount     = $(gridObj).getGridParam("rowNum");
        let pager        = $(gridObj).getGridParam("pager");
        let currentIndex = 0;

        if(pageData == "user") {
            let num = $(pager + " .ui-pg-input").val().replace(/[^0-9]/g, '');
            if(num != 0 && num <= endPage) {
                currentPage = Number(num.replace(/^[0]+/g, ''));
            }
        } else if(pageData.startsWith('first')) {
            currentPage = 1;
        } else if(pageData.startsWith('prev')) {
            if(currentPage > 1) currentPage -= 1;
        } else if(pageData.startsWith('next')) {
            if(currentPage < endPage) currentPage += 1;
        } else if(pageData.startsWith('last')) {
            currentPage = endPage;
        } else if(pageData == "records") {
            rowCount = $(pager + " .ui-pg-selbox").val();
            currentPage = 1;
        }
        currentIndex = (currentPage - 1) * rowCount;
        let result = {"endPage": endPage, "currentPage": currentPage, "rowCount": rowCount, "currentIndex": currentIndex};
        callback(result);
    },
    
    /**
     * 그리드의 필수값 데이터를 검사한다.
     * @param gridObj
     * @param fieldNameArr 
     * @param keyArr 
     * return boolean
     */
    validGridCellData(gridData, fieldNameArr, keyArr) {
        const $this = this;

        if (gridData.length > 0) {
            for (let i = 0; i < gridData.length; i++) {
                const rowData = gridData[i];
                for (let j = 0; j < keyArr.length; j++) {
                    if (rowData[keyArr[j]] == '') {
                        CmonUtil.alert(`${fieldNameArr[j]} 필수값 입니다.`);

                        return false;   

                    }
                }
            }
        }
        return true;
    },

};