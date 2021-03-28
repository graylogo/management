import AddDialog from '../../components/addDialog.vue';

export default {
  name: 'Profile',
  components: { AddDialog },
  data() {
    return {
      tableData: [],
      dialog: {
        show: false,
        title: '',
        operation: 'edit'
      },
      form: {
        name: '',
        type: '',
        income: '',
        cash: '',
        remark: '',
        expend: ''
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios.get('/api/profile').then((res) => {
        if (res.data.length === 0) {
          this.$message({
            type: 'warning',
            message: '没有查询到数据！'
          });
          return;
        }
        this.tableData = res.data;
      });
    },
    handleDelete(id) {
      this.axios.delete(`/api/profile/delete/${id}`).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }
        this.fetchData();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: '新增',
        operation: 'add'
      };
      this.form = {
        name: '',
        type: '',
        income: '',
        cash: '',
        remark: '',
        expend: ''
      };
    },
    handleEdit(row) {
      this.dialog.title = '修改';
      this.dialog.show = true;
      this.dialog.operation = 'edit';
      this.form = row;
    }
  }
};
