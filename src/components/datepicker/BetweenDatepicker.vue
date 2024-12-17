<template>
    <!-- <div> -->
        <div :class='width=="33" ? "w-33-m input-btn input-btn2" : (width=="25" ? "w-25 input-btn m-r-10" : "w-50-mr input-btn input-btn2 t-2")' style="margin-left:0px;">
            <Datepicker :inputBtn="isInputBtn" :stnd-dt="strtDt" ref="pickerFr" :disabled="disabled" @on-selected="onSelectedStrtDatepicker"></Datepicker>
        </div>
        <div :class='width=="33" ? "w-33-m input-btn input-btn2" : (width=="25" ? "w-25 input-btn" : "w-50-ml input-btn input-btn2 t-2")'>
            <Datepicker :inputBtn="isInputBtn" :stnd-dt="endDt" ref="pickerTo" :disabled="disabled" @on-selected="onSelectedEndDatepicker"></Datepicker>
        </div>
    <!-- </div> -->
</template>
<script>

import { DateUtil } from '@/utils/DateUtil.js'
import { ValdUtil } from '@/utils/ValdUtil.js'  
import moment from 'moment'

import Datepicker from '@/components/datepicker/Datepicker.vue'

export default {
    name: 'BetweenDatePicker',
    emits : {onSelected : null},
    components: {
        Datepicker
    },
    props: {
        isInputBtn: {
            type: Boolean,
            default: true,
            require: false
        },
        frDt: {
            type: String,
            require: false
        },
        toDt: {
            type: String,
            require: false
        },
        width: {
            type: Number,
        },
        disabled: {
            type: Boolean,
            default: false,
            require: false
        }
    },

    data() {
        return {
            strtDt: '',
            endDt: '',
            beforeStrtDt:'',
            beforeEndDt:'',
            params:{}
        }
    },

    methods: {
        init: function() {
            let $this = this;
            //$this.strtDt = DateUtil.getCurrDate();
            //$this.endDt = moment().add(10, 'days').format('YYYY-MM-DD');
            $this.strtDt = $this.frDt;
            $this.endDt = $this.toDt;
            $this.beforeStrtDt = $this.strtDt;
            $this.beforeEndDt = $this.endDt;
        },
        
        compareDt:function(){
            let $this = this;
            if( ValdUtil.isNotNull($this.strtDt) && ValdUtil.isNotNull($this.endDt)){
                if(moment($this.strtDt).isBefore($this.endDt)){
                    $this.params = { 
                        frDt: $this.strtDt,
                        toDt: $this.endDt            
                    }

                    $this.$emit('onSelected',$this.params); 
                } else if ($this.strtDt == $this.endDt) {
                    $this.params = { 
                        frDt: $this.strtDt,
                        toDt: $this.endDt            
                    }
                    $this.$emit('onSelected',$this.params);
                } else {
                    if($this.strtDt != $this.endDt){  
                    	//$this.$swal("다시 선택하셈");                      
                        $this.alert("종료일자가 시작일자보다 작을 수 없습니다. <br> 다시 선택하여 주시기 바랍니다.");                        
                    }
                    $this.params = { 
                        frDt: $this.beforeStrtDt,
                        toDt: $this.beforeEndDt            
                    }

                    $this.$emit('onSelected',$this.params);
                }
            } else {
                $this.strtDt = DateUtil.getCurrDate();
                $this.endDt = moment().add(10, 'days').format('YYYY-MM-DD');
            }
        }
        ,onSelectedStrtDatepicker: function(selectedDate) {
            let $this = this;
            if( ValdUtil.isNotNull(selectedDate)){
                $this.strtDt = selectedDate;
                $this.params = { frDt: $this.strtDt, toDt:$this.endDt}
                
                this.compareDt();
            } else if( ValdUtil.isNull(selectedDate)){
                $this.strtDt = selectedDate;
                $this.params = { frDt: $this.strtDt, toDt:$this.endDt}
                $this.$emit('onSelected',$this.params);
                // this.compareDt();
            }

            // if ( DateUtil.isValidTerm(selectedDate, $this.endDt) ) {
            //     console.log($this.strtDt + '/' + $this.endDt + '/' + selectedDate);
            //     $this.strtDt = selectedDate;
            //     const params = {
            //         frDt : selectedDate,
            //         toDt : $this.endDt
            //     };
                
            //     this.$emit('onSelected', params);
            // } else {
            //     this.$refs.picker.setDate($this.strtDt);
            //     this.alert('시작일자는 종료일자보다 미래이면 안됩니다.');
            // }
        }

        ,onSelectedEndDatepicker: function(selectedDate) {
            let $this = this;
            if( ValdUtil.isNotNull(selectedDate)){
                $this.endDt = selectedDate;
                $this.params = { frDt: $this.strtDt, toDt:$this.endDt }    
                this.compareDt();             
            } else if( ValdUtil.isNull(selectedDate)){
                $this.endDt = selectedDate;
                $this.params = { frDt: $this.strtDt, toDt:$this.endDt }
                $this.$emit('onSelected',$this.params);    
                // this.compareDt();        
            }

            // if ( DateUtil.isValidTerm($this.strtDt, selectedDate) ) {
            //     console.log($this.strtDt + '/' + $this.endDt + '/' + selectedDate);
            //     $this.endDt = selectedDate;
            //     const params = {
            //         frDt : $this.strtDt,
            //         toDt : selectedDate
            //     };
                
            //     this.$emit('onSelected', params);
            // } else {
            //     this.$refs.picker.setDate($this.endDt);
            //     this.alert('종료일자는 시작일자보다 과거이면 안됩니다.');
            // }
            // this.$emit('onSelected',params);
        }
    },
    watch: {
        frDt: function(newVal,oldVal) {
            this.beforeStrtDt = oldVal;
            this.strtDt = newVal;
        },
        toDt: function(newVal,oldVal) {
            this.beforeEndDt = oldVal;
            this.endDt = newVal;

        }
    },
    mounted: function() {
        let $this = this;
        this.init();
    }
}
</script>