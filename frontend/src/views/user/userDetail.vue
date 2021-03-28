<template>
  <div class="container">
       <el-row type="flex" align="middle" justify="center" >
           <el-col :span="8" :push="4">
               <el-image :src='user.avatar' style="width:100px;height:100px"/>
           </el-col>
           <el-col :span="16">
               <i class="el-icon-user"/>
               <span>{{user.name}}</span>
               <br/>
               <i class="el-icon-setting"/>
               <span>{{user.identity===0?'普通用户':'管理员'}}</span>
           </el-col>
       </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserDetail',
  data() {
    return {

    };
  },
  created() {

  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
.container{
    height: 100%;
    .el-row{
        height: 100%;
    }
}
</style>
