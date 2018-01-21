<template>
<div class="fabric">
  <h5>面料信息</h5>
<el-form label-width="25%">
  <div v-for="(item, index) in computedDoneFabric" :key="index">
    <el-form-item :label="labels[index]" class="bg">
      <el-input v-model="item.name" placeholder="请填写您的面料名称" class="padding-right"></el-input>
      <i  v-if="index > 0" class="el-icon-delete" @click.stop="deleteFabric(index)"></i>
    </el-form-item>
    <el-row :gutter="10"  class="space padding-bottom  uploadimgs" >    
        <el-col :span="6" class="text-right text-style-sm">
          面料图片: 
        </el-col> 
        <el-col :span="14">
          <Uploadfiles 
            :getUploadUrl="getUploadUrl"
            :defaultImg  ="image"
            :getImgList  ="item.picture"
          ></Uploadfiles>
        </el-col>
    </el-row>
      <el-form-item label="面料成分: " class="padding-right">
          <el-select v-model="item.component_id"  placeholder="请输入您的面料成分" style="width:100%">
             <el-option 
              v-for="(item1, index1) in component"
              :key="'component'+index"
              :label="item1.component_name" :value="item1.component_id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="面料克重:" class="padding-right">
        <el-input v-model="item.weight"  placeholder="请输入克重">  </el-input>
        <div class="after"> 克/平方米 </div>
      </el-form-item>
      <el-form-item label="面料米重:" class="padding-right">
        <el-input v-model="item.grammage"  placeholder="请输入克重">  </el-input>
        <div class="after"> 克/米 </div>
      </el-form-item>
      <el-form-item label="门幅宽度:" class="padding-right">
        <el-input v-model="item.width"  placeholder="请输入克重"  style="width: 70%;">  </el-input>
        <el-radio-group v-model="item.units" style="padding-left:18px">
            <el-radio  label="厘米" value="厘米">厘米</el-radio>
            <el-radio  label="英寸" value="英寸">英寸</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
</el-form>
  <div class="middle-line">
      <el-button type="primary" icon="el-icon-plus" @click="addFabric" class="circle-btn"></el-button>
  </div>
</div> 
</template>

<script>

import { mapGetters } from 'vuex'
import Uploadfiles from "@/components/uploadfiles"
export default {
    // props:['receiptContent','submitReceipt'],
    components: { Uploadfiles},
    props:{
      component:{
        type: Array,
        default(){ return [] }
      },
      doneFabric: {},
      submitReceiptFabric:{
        type: Array,
        default(){ return [] }
      }
    },
    data() {
      return {
        list: [{
                name: '',
                component_id: '',
                grammage:'',
                width:'',  
                units: "厘米", 
                weight:'',
                picture:[],
                is_main: 1
            }],
        labels: ['面料A'],
        startCode: 65,
        image :  require('../assets/fabric-pic.jpg'),
      }
    },
    computed:{
      ...mapGetters([
        'getUploadUrl'
      ]),
      actionUrl(){
        return this.getUploadUrl +'/picture/upload'
      },
      computedDoneFabric(){
        if(this.doneFabric && Array.isArray(this.doneFabric) && this.doneFabric.length){
          this.list = this.doneFabric
        }
        return this.list 
      }
    },
    watch:{
      list:{
        handler(curVal){
          this.$emit( 'update:submitReceiptFabric',  curVal.map( (item, index)=>{ 
                        // let obj = Object.assign({}, item)
                        let obj = JSON.parse( JSON.stringify(item) )
                        obj.picture =  this.removeDomain( obj.picture )
                        return obj
                      })
                    )
        },
        deep: true
      }
    },
    methods: {
      addFabric(){
        let fabric = {
              name: '',
              component: '',
              grammage:'',
              width:'',
              units: "厘米", 
              weight:'',
              picture:[],
              is_main: 0
            }
        this.list.push(fabric)
        this.labels.push( "面料" + String.fromCharCode( this.labels.length +this.startCode ))
      },
      deleteFabric(index){
          this.list.splice(index,1)
          this.labels.pop()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.after{
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 1.1em;
}
.bg{
  background: rgb(204,204,204);
  padding: 10px;
  padding-top: 15px;
}
 .el-icon-delete{
  position: absolute;
  margin-left: 10px;
  right: 0;
  top: 10px;
}
.el-icon-delete:hover{
  color: #C44DDC;
}
  .show-demo1{
    border:1px solid #e0e0e0;
    height: 145px;
    width: 145px;
  }
  .floatleft{
    float: left;
    margin-right: 10px;
  }
</style>