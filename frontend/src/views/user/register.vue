<template>
  <div class="container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <h3>用户注册</h3>
        <el-form-item label="用户名" prop="name">
            <el-input  v-model="ruleForm.name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
           <el-select v-model="ruleForm.identity">
               <el-option label="普通用户" :value="0"></el-option>
               <el-option label="管理员" :value="1"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button type="text"><a href="/login">返回登陆</a></el-button>
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
      } else if (value.length < 6) {
        callback(new Error('密码至少为六位'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        email: '',
        pass: '',
        checkPass: '',
        identity: 0
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '用户名为必填' },
          {
            min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur'
          }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'bulr' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
          console.log('submit!');
          console.log(this.ruleForm);
          return false;
        }
        console.log('error submit!!');
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
