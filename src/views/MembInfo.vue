<template>
    <div class="pt-5 container center">
        <div class="non-search-section pt-5">
            <div class="part1 vw-9 m-b-9 ib">
                <div class="vw-9 ib">
                    <div class="line1">
                        <div class="content-container">
                            <div class="title vw-1">
                                <span>구성원명</span>
                            </div>
                            <div class="content vw-1">
                                <input id="membName" name="membName" v-model="params.membName" />
                            </div>
                        </div>
                        <div class="content-container">
                            <div class="title vw-1">
                                <span>구성원유형</span>
                            </div>
                            <div class="content vw-1">
                                <select v-model="params.membType">
                                    <option value="">전체</option>
                                    <option value="직원">직원</option>
                                    <option value="프리랜서">프리랜서</option>
                                    <option value="협력업체직원">협력업체직원</option>
                                    <option value="기타">기타</option>
                                </select>
                            </div>
                        </div>
                        <div class="content-container">
                            <div class="title vw-1">
                                <span>상태</span>
                            </div>
                            <div class="content vw-3">
                                <div class="radio-container">
                                    <input id="state-all" name="membState" value="" type="radio"
                                        v-model="params.membState"/>
                                    <label for="state-all">전체</label>
                                    <input id="state-working" name="membState" value="근무" type="radio"
                                        v-model="params.membState" />
                                    <label for="state-working">근무</label>
                                    <input id="state-dispatched" name="membState" value="파견" type="radio"
                                        v-model="params.membState" />
                                    <label for="state-dispatched">파견</label>
                                    <input id="state-resigned" name="membState" value="퇴사" type="radio"
                                        v-model="params.membState" />
                                    <label for="state-resigned">퇴사</label>
                                    <input id="state-other" name="membState" value="기타" type="radio"
                                        v-model="params.membState" />
                                    <label for="state-other">기타</label>
                                </div>
                            </div>
                        </div>
                        <div class="content-container">
                            <div class="content vw-1 border-white" style="padding: 0px 0px 0px 10px">
                                <div class="btn vw-1 bg-danger" style="
                    height: 39px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    " @click="searchMembers">
                                    조회
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vw-9 m-b-9 pt-5">
            <div class="w-100 h-30">
                <h2 class="w-80 ib fs-4 fw-bold">구성원 리스트</h2>
                <div class="w-20 t-a-r ib">
                    <button class="btn-normal fw-bold wd-70 m-r-5" @click="addRow">
                        행추가
                    </button>
                    <button class="btn-normal fw-bold wd-70 m-r-5" @click="deleteRow">
                        행삭제
                    </button>
                    <button class="btn-normal fw-bold wd-70" @click="saveRow">
                        저장
                    </button>
                </div>
            </div>
            <div class="wrapper-content">
                <Grid ref="gridObj" class="pt-2" :dataParams="gridData"> </Grid>
            </div>
        </div>
    </div>
</template>

<script>
import Grid from "@/components/grid/Grid.vue";
import DatePicker from "@/components/datepicker/Datepicker.vue";

export default {
    name: "MembInfo",
    components: {
        Grid,
        DatePicker,
    },
    data: function () {
        return {
            params: {
                membName: "",
                membType: "",
                membState: "",
            },
            gridData: [],
        };
    },
    mounted() {
        const $this = this;
        this.init();
    },
    methods: {
        init() {
            this.initData();
            this.initInfoGrid();
        },
        initData() {
            // 로컬 스토리지에서 gridData 가져오기
            const savedData = localStorage.getItem("gridData");

            // 데이터가 있으면 JSON 파싱, 없으면 빈 배열 할당
            this.gridData = savedData ? JSON.parse(savedData) : [];

            console.log(this.gridData);
        },
        initInfoGrid() {
            const $this = this;

            let gridOptions = {
                data: this.gridData,
                colModels: [
                    {
                        label: "구성원번호",
                        name: "membNo",
                        width: 80,
                        key: true,
                        editable: false,
                        align: "center",
                    },
                    {
                        label: "구성원명",
                        name: "membNm",
                        width: 100,
                        editable: true,
                        align: "center",
                    },
                    {
                        label: "구성원유형",
                        name: "membTypeCd",
                        width: 80,
                        editable: true,
                        formatter: "select",
                        edittype: "select",
                        align: "center",
                        autoResizable: true,
                        editoptions: {
                            value: "직원:직원;프리랜서:프리랜서;협력업체직원:협력업체직원;기타:기타",
                            style: "width: 100%;",
                        },
                    },
                    {
                        label: "직위",
                        name: "posiCd",
                        width: 80,
                        editable: true,
                        formatter: "select",
                        edittype: "select",
                        align: "center",
                        autoResizable: true,
                        editoptions: {
                            value:
                                "사원:사원;주임:주임;대리:대리;차장:차장;부장:부장;사장:사장",
                            style: "width: 100%;",
                        },
                    },
                    {
                        label: "기술등급",
                        name: "techRankCd",
                        width: 80,
                        editable: true,
                        formatter: "select",
                        edittype: "select",
                        align: "center",
                        autoResizable: true,
                        editoptions: {
                            value: "초급:초급;중급:중급;고급:고급;특급:특급",
                            style: "width: 100%;",
                        },
                    },
                    {
                        label: "전화번호",
                        name: "mphnNo",
                        width: 100,
                        editable: true,
                        align: "center",
                        formatter: (cellValue) => { return $this.CmonUtil.getFormatPhnNo(cellValue)},
                    },
                    {
                        label: "이메일",
                        name: "mailAddr",
                        width: 150,
                        editable: true,
                        align: "center",
                        formatter: (cellValue) => { return $this.CmonUtil.getFormatEmail(cellValue) }
                    },
                    {
                        label: "부서",
                        name: "deptCd",
                        width: 80,
                        editable: true,
                        formatter: "select",
                        edittype: "select",
                        align: "center",
                        autoResizable: true,
                        editoptions: {
                            value:
                                "si사업부:SI사업부;sm사업부:SM사업부;경영지원부:경영지원부;전력기획부:전력기획부",
                            style: "width: 100%;",
                        },
                    },
                    {
                        label: "생년월일",
                        name: "bithDt",
                        width: 100,
                        align: "center",
                        editable: true,
                        editoptions: {
                            dataInit: (e) =>
                                $this.CmonUtil.formatGridDatePicker(e, "yyyy-mm-dd"),
                        },
                    },
                    {
                        label: "입사일",
                        name: "entrDt",
                        width: 100,
                        align: "center",
                        editable: true,
                        editoptions: {
                            dataInit: (e) =>
                                $this.CmonUtil.formatGridDatePicker(e, "yyyy-mm-dd"),
                        },
                    },
                    {
                        label: "상태",
                        name: "membStatCd",
                        width: 80,
                        editable: true,
                        formatter: "select",
                        edittype: "select",
                        align: "center",
                        autoResizable: true,
                        editoptions: {
                            value: "근무:근무;파견:파견;퇴사:퇴사;기타:기타",
                            style: "width: 100%;",
                        },
                    },
                ],

                options: {
                    multiselect: true,
                    pager: "#jqGridPager",
                    cellEdit: true,
                    height: "auto",
                    autowidth: true,
                    loadonce: true,
                    cellsubmit: "clientArray",
                    autoresizeOnLoad: true,
                    autoResizing: {
                        compact: true,
                    },
                    loadComplete: function () {
                        // 그리드 로드 완료 후 포커스 제거
                        $this.$nextTick(() => {
                            gridObj.jqGrid("resetSelection");
                            $('td[tabindex="-1"]').attr("tabindex", "0");
                        });
                    },
                },
            };

            this.$refs.gridObj.init(gridOptions);
            const gridObj = this.$refs.gridObj.getGridObj();
            gridObj.jqGrid("clearGridData"); // 기존 데이터 초기화
            gridObj
                .jqGrid("setGridParam", { data: this.gridData })
                .trigger("reloadGrid");
        },
        addRow() {
            // 새로운 membNo 생성
            const maxMembNo = Math.max(
                ...this.gridData.map((row) => Number(row.membNo)),
                0
            );
            const newMembNo = maxMembNo + 1;

            let emptyRow = {
                membNo: newMembNo,
                membNm: "",
                membTypeCd: "",
                posiCd: "",
                techRankCd: "",
                mphnNo: "",
                mailAddr: "",
                deptCd: "",
                bithDt: "",
                entrDt: "",
                membStatCd: "",
            };

            // gridData에만 추가
            this.gridData.push(emptyRow);

            // 그리드에 새로운 행 추가
            let gridObj = this.$refs.gridObj.getGridObj();
            gridObj.jqGrid("addRowData", undefined, emptyRow);
        },

        deleteRow() {
            const gridObj = this.$refs.gridObj.getGridObj();
            const selectedIds = gridObj.jqGrid("getGridParam", "selarrrow");

            if (!selectedIds.length) {
                alert("삭제할 행을 선택해주십시요.");
                return;
            }

            // 사용자 확인
            if (!confirm(`선택한 ${selectedIds.length}개의 행을 삭제하시겠습니까?`)) {
                return;
            }

            // 선택된 ID를 내림차순으로 정렬
            const sortedIds = [...selectedIds].sort((a, b) => b - a);

            // 높은 인덱스부터 삭제
            sortedIds.forEach((id) => {
                gridObj.jqGrid("delRowData", id);
            });

            // 남은 데이터 가져오기
            this.gridData = gridObj.jqGrid("getRowData");

            // membNo 재정렬
            this.gridData = this.gridData.map((item, index) => ({
                ...item,
                membNo: (index + 1).toString(),
            }));

            // 그리드 데이터 갱신
            gridObj.jqGrid("setGridParam", { data: this.gridData });
            gridObj.trigger("reloadGrid");
        },
        saveRow() {
            const $this = this;
            let gridObj = $this.$refs.gridObj.getGridObj();

            // 현재 편집 모드 종료
            if (gridObj.jqGrid("getGridParam", "cellEdit")) {
                gridObj.jqGrid("editCell", 0, 0, false);
            }

            // 현재 그리드의 모든 데이터 가져오기
            let allData = gridObj.jqGrid("getRowData");

            for (let i = 0; i < allData.length; i++) {
                const row = allData[i];
                if (
                    !row.membNm ||
                    !row.membTypeCd ||
                    !row.posiCd ||
                    !row.techRankCd ||
                    !row.mphnNo ||
                    !row.mailAddr ||
                    !row.deptCd ||
                    !row.bithDt ||
                    !row.entrDt ||
                    !row.membStatCd
                ) {
                    alert(`${i + 1}번 행의 모든 필드를 입력해주세요.`);
                    return;
                }
            }

            // 로컬스토리지에 데이터 저장
            localStorage.setItem("gridData", JSON.stringify(allData));

            alert("저장되었습니다.");
        },
        searchMembers() {
            const gridObj = this.$refs.gridObj.getGridObj();
            const filteredData = this.gridData.filter((member) => {
                return (
                    (!this.params.membName ||
                        member.membNm.includes(this.params.membName)) &&
                    (!this.params.membType ||
                        member.membTypeCd === this.params.membType) &&
                    (!this.params.membState ||
                        member.membStatCd === this.params.membState)
                );
            });

            gridObj.jqGrid("clearGridData");
            gridObj
                .jqGrid("setGridParam", { data: filteredData })
                .trigger("reloadGrid");
        },
        
    },
};
</script>

<style>
.container {
    width: 1250px; /* 고정 너비 */
    margin: 0 auto; /* 가운데 정렬 */
    overflow-x: auto; /* 창 크기가 작아지면 수평 스크롤 생성 */
    white-space: nowrap; /* 내부 콘텐츠 줄바꿈 방지 */
}

</style>