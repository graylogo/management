<template>
  <div class="container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <h3>登陆</h3>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="ruleForm.passwd" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button type="text"><a href="/register">去注册</a></el-button>
        </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {},
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      ruleForm: {
        email: '',
        passwd: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'bulr' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  created() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/api/users/login', this.ruleForm).then((res) => {
            const { token } = res.data;
            localStorage.setItem('eleToken', token);
            this.$router.push('/');
          });
        }
        return false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    .ruleForm{
        padding: 20px 40px 20px 20px;
        width: 300px;
        height: 400px;
        border: 4px solid gray;
        box-shadow: 0px 10px 5px #888888;
        h3{
            display: inline-block;
            border-bottom: 1px solid red;
            text-align: center;
            line-height: 30px;

        }
    }
}
</style>
