<template>
  <div class="container">
      <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="400px">
    <el-form :model="form" style="width: 300px" :rules="rule" ref="addForm">
       <el-form-item label="类型" :label-width="formLabelWidth" prop='tpye'>
      <el-select v-model="form.type" placeholder="请选择收支类型">
        <el-option
        v-for="item of selsctArr"
        :key="item.id"
        :label="item.label"
        :value="item.type"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="收入" :label-width="formLabelWidth" prop='income'>
      <el-input v-model="form.income"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="支出" :label-width="formLabelWidth" prop='expend'>
      <el-input v-model="form.expend" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="现金" :label-width="formLabelWidth" prop='cash'>
      <el-input v-model="form.cash" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.describe" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="form.remark" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog.show = false">取 消</el-button>
    <el-button type="primary" @click="submitItem">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
const arr = [
  {
    id: '0',
    type: 0,
    label: '餐饮☕️'
  },
  {
    id: '1',
    type: 1,
    label: '玩具🪀'
  },
  {
    id: '2',
    type: 2,
    label: '零食'
  },
  {
    id: '3',
    type: 3,
    label: '购物⏫'
  },
  {
    id: '4',
    type: 4,
    label: '交通🚴‍♀️'
  }
];
const ruleObj = {
  income: [{ required: true, message: '收入为必填项！', trigger: 'blur' }],
  expend: [{ required: true, message: '支出为必填项！', trigger: 'blur' }],
  cash: [{ required: true, message: '现金为必填项！', trigger: 'blur' }],
  type: [{ required: true, message: '类型为必选项！', trigger: 'blur' }]
};
export default {
  name: 'AddDialog',
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      formLabelWidth: '60px',
      rule: ruleObj,
      selsctArr: arr
    };
  },
  methods: {
    addProfile() {
      this.axios.post('/api/profile/add', this.form).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '新增成功！'
          });
          this.dialog.show = false;
        }
        this.$emit('update');
      });
    },
    editProfile(id) {
      this.axios.post(`/api/profile/edit/${id}`, this.form).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          this.dialog.show = false;
        }
        this.$emit('update');
      });
    },
    submitItem() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          switch (this.dialog.operation) {
            case 'add':
              this.addProfile();
              break;
            case 'edit':
              this.editProfile(this.form._id);
              break;
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请完善表单！'
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">

</style>
