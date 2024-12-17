<template>
    <div class="row">
        <div style="width:100%; height:40px;">
            <button @click="prevWeek" style="float:left">전주</button>
            <div style="width: 60%; float:left">
                <table>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                    <tr v-for="week in weekList" v-bind:key="week">
                        <th v-for="day in week" v-bind:key="day"
                            @click="selectDay(day.stndDt)">
                            <div :class="{blue: fillDay(day.stndDt)}">
                                <p :class="{red: selectedDay(day.stndDt)}">{{day.stndDay}}</p>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>
            <button @click="nextWeek" style="float:right">다음주</button>
        </div>
    </div>
</template>
<script>

import moment from 'moment'
import { DateUtil } from '@/utils/DateUtil.js'

import baseMixins from '@/views/mixins/baseMixins.vue'

export default {
    name: 'week-datepicker',
    props: {
        stndDt: {
            type: String,
            require: false
        },
        fillList: {
            type: Array,
            require: false
        }
    },
    mixins: [baseMixins],
    data() {
        return {
            dt: '',
            weekSeq: -1,
            dayList: [],
            weekList: [],
        }
    },
    components: {
        DateUtil        
    },
    methods: {
        init: function() {
            let $this = this;
            $this.searchWeekDay();  
        }
        ,prevWeek: function() {
            let $this = this;
            $this.weekSeq = $this.weekSeq - 1;
            $this.searchWeekDay();
        }
        ,nextWeek: function() {
            let $this = this;
            $this.weekSeq = $this.weekSeq + 1;
            $this.searchWeekDay();   
        }
        ,searchWeekDay: function() {
            let $this = this;

            let params = {
                'weekSeq' : $this.weekSeq
            };

            // $this.doPost({
            //     url: '/cmon/cal/searchWeekDay.ab',
            //     param: params,
            //     success: function(response) {
            //         // console.log(response);
            //         $this.weekList = [];
            //         $this.dayList = response.rtnData.result;
            //         $this.weekSeq = $this.dayList[$this.dayList.length - 1].weekSeq;
            //         let weekList = _.filter($this.dayList, function(day) {
            //             return day.weekSeq == $this.weekSeq - 1;
            //         });
            //         $this.weekList.push(weekList);
            //         weekList = _.filter($this.dayList, function(day) {
            //             return day.weekSeq == $this.weekSeq;
            //         });
            //         $this.weekList.push(weekList);                    
            //     }
            // });
        }
        ,selectDay: function(selectDt) {
            // console.log(selectDt);
            this.dt = selectDt;
            this.$emit('onSelected', DateUtil.getFormatDate(selectDt));
        }
        ,selectedDay: function(dt) {
            if ( this.dt === dt ) {
                return true;
            } else {
                return false;
            }
        }
        ,fillDay: function(dt) {
            const item = _.find(this.fillList, function(day) {
                return day === dt;
            });
            
            if ( !!item ) {
                return true;
            } else {
                return false;
            }
        }
        ,change: function(selectedDate) {
            if ( moment(selectedDate).isValid() ) {
                this.$emit('onSelected', DateUtil.getFormatDate(selectedDate));
            }
        },
        
    },
    updated: function () {
        
    },
    computed: {
        
    },
    watch: {
        stndDt: function(newVal, oldVal) {
            this.dt = DateUtil.getDate(this.stndDt, "YYYYMMDD");
        },
        fillList: function(val) {
            // console.log(val);
        }
    },
    mounted: function() {
        let $this = this;
        $this.init();
    }
}
</script>

<style scoped>
    .red {
        color: red;
    }
    .blue {
        background-color: yellow;
    }
</style>