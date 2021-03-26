<template>
  <el-container>
  <el-header>
      <HeadNav/>
  </el-header>
  <el-container>
    <el-aside :width="sideWidth">
        <Aside @setCollapse ='setCollapse' :isCollapse='isCollapse'/>
    </el-aside>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
    <el-footer>
        power by Gray
    </el-footer>
</el-container>
</template>

<script>
import HeadNav from '../components/HeadNav';
import Aside from '../components/Aside';

export default {
  name: 'Index',
  components: { HeadNav, Aside },
  data() {
    return {
      sideWidth: '200px',
      isCollapse: false
    };
  },
  created() {},
  methods: {
    setCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sideWidth = '60px';
      } else this.sideWidth = '200px';
    }
  }
};
</script>

<style scoped lang="scss">
body{
    padding:0;
    margin:0;
}
.el-container{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

}
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
.el-footer{
    background-color: #B3C0D1;
    height: 30px!important;
    line-height: 30px;
    text-align: center;
}
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 600px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    // margin-bottom: 40px;
  }
</style>
