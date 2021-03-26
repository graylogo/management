<template>
  <div class="container">
      <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="8" class="left-icon">
              <el-image :src="require('/src/assets/logo.png')"></el-image>
              <span>在线管理系统</span>
          </el-col>
          <el-col :span="6" class="right-icon">
                <el-image :src="user.avatar"></el-image>
              欢迎,{{user.name}}
              <el-dropdown @command="handleCommand" trigger='click'>
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logOut">注销</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'HeadNav',
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
    handleCommand(val) {
      switch (val) {
        case 'info':
          console.log('info');
          break;
        case 'logOut':
          localStorage.removeItem('eleToken');
          this.$store.dispatch('logOut');
          this.$message({
            type: 'warning',
            message: '注销成功！'
          });
          this.$router.push('/login');
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.el-row{
    height: 60px;
}
.left-icon,.right-icon{
    height: 60px;
    display: flex;
    align-items: center;
    .el-image{
        width: 60px;
        height: 60px;
    }
    span{
        font-size: 24px;
        padding-left: 20px;
    }
}
.right-icon{
    justify-content: flex-end;
    .el-image{
        border-radius: 50%;
    }
    .el-icon-arrow-down{
        color: #fff;
        cursor: pointer;
    }
}
</style>
