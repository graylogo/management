<template>
  <div class="container">
  <el-button type="text" class="fold-button" :style="{left: isCollapse?'60px':'200px'}" @click="$emit('setCollapse')">
      <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"/>
  </el-button>
<el-menu default-active="/index" router :style="{width:sideWidth}" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
   <el-menu-item index="/index" >
    <i class="el-icon-menu"></i>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">资金管理</span>
    </template>
      <el-menu-item index="/profile" >资金流动</el-menu-item>
  </el-submenu>
  <el-menu-item index="/other" >
    <i class="el-icon-document" ></i>
    <span slot="title">其它信息</span>
  </el-menu-item>
  <el-menu-item index="/userDetail" >
    <i class="el-icon-setting"></i>
    <span slot="title">个人信息</span>
  </el-menu-item>
</el-menu>
  </div>
</template>

<script>
export default {
  name: 'HeadNav',
  props: {
    sideWidth: String,
    isCollapse: Boolean
  },
  data() {
    return {
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    // min-height: 400px;
  }
.container{
    // position: relative;
    .fold-button{
        position: absolute;
        // left: 200px;
    }
}
</style>
