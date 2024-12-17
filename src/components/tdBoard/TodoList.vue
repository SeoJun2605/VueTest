<template>
    <div>
        <table id="jqGrid"></table>
        <div id="jqGridPager"></div>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
    props: {
        modelValue: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.initGrid();
        this.loadData(this.modelValue);
    },
    watch: {
        modelValue: {
            handler(newValue) {
                this.loadData(newValue);
            },
            deep: true
        }
    },
    methods: {
        initGrid() {
            $("#jqGrid").jqGrid({
                colNames: ['ID', '제목', '작성자', '날짜', '삭제'],
                datatype: "local",
                data: this.modelValue,
                colModel: [
                    {
                        name: 'id',
                        hidden: true,
                        key: true,
                    },
                    {
                        name: 'title',
                        align: 'center',
                        sortable: false,
                    },
                    {
                        name: 'author',
                        align: 'center',
                        sortable: false,
                    },
                    {
                        name: 'date',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        name: 'actions',
                        width: 50,
                        align: 'center',
                        sortable: false,
                        formatter: function () {
                            return 'X';
                        }
                    }
                ],
                autowidth: true,
                height: 'auto',
                rowNum: 5,
                pager: "#jqGridPager",
                sortorder: "asc",
                sortname: 'date',
                onSelectRow: (rowid, status, e) => {
                    if ($(e.target).closest('td').attr('aria-describedby') === 'jqGrid_actions') {
                        const rowData = $("#jqGrid").jqGrid('getLocalRow', rowid);
                        this.deletePost(rowData);
                    } else {
                        const rowData = $("#jqGrid").jqGrid('getLocalRow', rowid);
                        this.goToDetail(rowData);
                    }
                }
            });
        },
        deletePost(rowData) {
            if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
                
                // 전체 데이터에서 해당 항목 삭제
                const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
                const updatedPosts = allPosts.filter(post => post.id !== rowData.id);
                // localStorage 업데이트
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
                // 부모 컴포넌트에 변경 알림
                this.$emit('update:modelValue', updatedPosts);
            }
        },
        loadData(data) {
            $("#jqGrid").jqGrid('clearGridData');
            $("#jqGrid").jqGrid('setGridParam', {
                data: data,
                datatype: 'local'
            }).trigger('reloadGrid');
        },
        goToDetail(rowData) {
            this.$router.push({
                name: 'detail',
                query: { post: JSON.stringify(rowData) }
            });
        }
    }
};
</script>

<style>
.ui-jqgrid td {
    background-color: white;
    cursor: pointer;
}
.ui-jqgrid-btable .jqgrow:hover {
    background-color: #42c9db !important;
}
</style>