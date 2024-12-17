<template>

    <div :id="wrapperId">
        <table ref="gridObj" :id="gridId"></table>
        <div v-if="paging" :id="pagerId"></div>
    </div>

</template>

<script>

import { ref, reactive } from 'vue'
import { GridUtil } from '@/utils/GridUtil';
import { ValdUtil } from '@/utils/ValdUtil';
import { CmonUtil } from '@/utils/CmonUtil';

export default {
    props: {
        paging: {
            type: Boolean,
            default: false
        },
        dataParams: {
            type: Object,
            default: {}
        },
        sortable: {
            type: Boolean,
            default: false
        },
    },
    setup(props, context) {

        let gridId = reactive({});
        let pagerId = reactive({});
        let wrapperId = reactive({});
        const gridObj = ref(null);

        let objectId = Math.random().toString(36);
        objectId = objectId.replaceAll('.', '');
        gridId = 'grid_list_' + objectId;
        pagerId = 'pager_list_' + objectId;
        wrapperId = 'list_wrapper_' + objectId;

        return {
            gridObj,
            gridId,
            pagerId,
            wrapperId
        }
    },
    data: function () {
        return {
            url: '',
            params: {
                rowCount: 30,
                currentPage: 1,
                currentIndex: 0,
                totalCount: 0,
                pagingYn: 'Y'
            },
            resTotalCount: 0,
        }
    },
    methods: {
        init: function (gridObj) {
            const $this = this;
            $this.url = process.env.VUE_APP_API_URL + gridObj.url;
            // 외부 통신 위함

            if (!this.$props.paging && this.$props.sortable) {
                gridObj.colModels.forEach(col => { Object.assign(col, { sortable: true }); });
                gridObj.options.loadonce = true;
            }

            let options = $.extend(true, {}, GridUtil.gridOptions(), {
                datatype: 'local',
                mtype: 'GET',
                // url: gridObj.url,
                url: $this.url,
                colModel: gridObj.colModels,
            });
            //기타 옵션 추가
            $.extend(true, options, gridObj.options);

            if (this.$props.paging) {
                options['pager'] = '#' + this.pagerId;
                options['onPaging'] = function (data) {
                    GridUtil.onPagingCommon(data, this, function (response) {
                        $this.params.rowCount = response.rowCount;
                        $this.params.currentPage = response.currentPage;
                        $this.params.currentIndex = response.currentIndex;
                        $this.params.totalCount = response.totalCount;
                        $this.selectList(false);
                    })
                }
                options['height'] = !!gridObj.options && gridObj.options.height > 0 ? gridObj.options.height : options['height'] - 30;
            } else {
                if (options.rowNum == 30) {
                    options.rowNum = 1000000;
                };
            }
            $(this.$refs.gridObj).jqGrid(options);

            if (gridObj["options"] && gridObj["options"]["sortableRows"] == true) {
                $(this.$refs.gridObj).jqGrid('sortableRows', options);
            }
            GridUtil.resizeJqGridWidth(this.gridId, this.wrapperId);
        },

        getGridObj() {
            return $(this.$refs.gridObj);
        },
        getGridId() {
            return this.gridId;
        },
        gridUnload: function () {
            //$(this.$refs.gridObj).gridUnload();
            $.jgrid.gridUnload(this.gridId);
        },
        gridReload: function () {
            //$(this.$refs.gridObj).gridUnload();
            $(this.$refs.gridObj).reload();
        },
        gridDestroy: function () {
            //$(this.$refs.gridObj).jqGrid('GridDestroy');
            $.jgrid.gridDestroy(this.gridId);
            // $(this.$refs.gridObj).GridDestroy(this.gridId).argument;
            // $(this.gridId).GridDestroy(this.gridId).argument;
        },

        clearGridData: function () {
            $(this.$refs.gridObj).jqGrid('clearGridData');
        },

        remove: function () {
            $(this.$refs.gridObj).remove();
        },

        reload: function (colModel) {
            $(this.$refs.gridObj).jqGrid('setGridParam', colModel)
            $(this.$refs.gridObj).trigger("reloadGrid");
        },
        getTotalCount() {
            return this.resTotalCount;
        },
        selectList: function (isSearch, isAlert, isIgnoreLoading) {
            const $this = this;

            if (ValdUtil.isNull(isAlert)) {
                isAlert = true;
            }
            if (ValdUtil.isNull(isIgnoreLoading)) {
                isIgnoreLoading = false;
            }

            if ($this.url == null || $this.url == '') {
                $this.alert('url을 지정하지 않았습니다.');
                return false;
            }
            if (this.$props.paging) {
                if (isSearch) {
                    $this.params.currentPage = 1;
                    $this.params.currentIndex = 0;
                }

                $.extend(true, $this.params, $this.$props.dataParams);
            } else {
                $this.params = $this.$props.dataParams;
            }

            let params = $this.params;

            if (CmonUtil.isLoading() && !isIgnoreLoading) {
                return false;
            }
            CmonUtil.processLoading(true);
            $($this.$refs.gridObj).setGridParam({
                datatype: "json",
                // postData: JSON.stringify(params),
                postData: params,
                page: 1,
                loadComplete: function (response) {
                    CmonUtil.processLoading(false);
                    $this.emitter.emit('onDismissAlert');
                    if (response.code == 200) {
                        $this.resTotalCount = response.data.totalCount;
                        if (response.data.result == 0 && isAlert) {
                            // $this.alert('조회할 내용이 없습니다.');
                        }
                    } else {
                        $this.alert(response.message);
                    }
                }
            }).trigger("reloadGrid");
            // this.$emit("select", selectedValue);
        },
        selectListAsync: function (isSearch, isAlert, isIgnoreLoading) {
            const $this = this;

            if (ValdUtil.isNull(isAlert)) {
                isAlert = true;
            }
            if (ValdUtil.isNull(isIgnoreLoading)) {
                isIgnoreLoading = false;
            }

            return new Promise((resolve, reject) => {
                let params = $this.$props.dataParams;

                if ($this.url == null || $this.url == '') {
                    $this.alert('url을 지정하지 않았습니다.');
                    return false;
                }
                if (this.$props.paging) {
                    $.extend(true, $this.$props.dataParams, $this.params);

                    if (isSearch) {
                        params.currentPage = 1;
                        params.currentIndex = 0;
                    }
                }

                if (CmonUtil.isLoading() && !isIgnoreLoading) {
                    return false;
                }
                CmonUtil.processLoading(true);

                $($this.$refs.gridObj).setGridParam({
                    datatype: "json",
                    postData: JSON.stringify(params),
                    page: 1,
                    loadComplete: function (response) {
                        CmonUtil.processLoading(false);
                        if (response.code == 200) {
                            resolve(response);
                            $this.resTotalCount = response.totalCount;
                            if (response.data.result == 0 && isAlert) {
                                // $this.alert('조회할 내용이 없습니다.');
                            }
                        } else {
                            reject(response);
                            $this.alert(response.message);
                        }
                    }
                }).trigger("reloadGrid");
                // this.$emit("select", selectedValue);
            });
        },
        getSelectData() {
            const $this = this;
            var rowIdList = [];
            var rowValList = [];
            var i = 0;

            rowIdList = $($this.$refs.gridObj).jqGrid("getGridParam", "selarrrow");

            if (rowIdList.length == 0) {
                $this.alert('데이터를 선택 해주세요');
                return false;
            }
            rowIdList.forEach(id => {
                rowValList[i] = $($this.$refs.gridObj).getRowData(id);
                rowValList[i]['rowMark'] = id;
                i = i + 1;
            });
            this.$emit('getSelectData', rowValList);
        },

        /*
          rowValList : 리스트에 넣을 값
          isNotDupl  : 중복여부(null,true(불허), false(허용) )
        */

        setGridData(rowValList, isNotDupl) {
            const $this = this;
            var rowIdList = [];
            var rowValList = rowValList;
            rowIdList = $($this.$refs.gridObj).jqGrid("getDataIDs");
            isNotDupl = isNotDupl.toString();

            if (ValdUtil.isNull(isNotDupl) || (ValdUtil.isNotNull(isNotDupl) && isNotDupl.indexOf('true') != -1)) {
                if (!rowIdList.length == 0) {
                    rowIdList.forEach(data => {
                        rowValList = rowValList.filter(item => item.rowMark != data);
                    });
                }
            }

            rowValList.forEach(val => {
                $($this.$refs.gridObj).jqGrid("addRowData", val.rowMark, val, 'last'); // 마지막 행에 Row 추가
            });
        }
    },
    mounted: function () {
        let $this = this;
    }
}
</script>