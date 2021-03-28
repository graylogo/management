<template>
  <div >
      <el-row type="flex" justify="space-between" style="padding: 10px;background: white;">
          <el-col>
              查找
          </el-col>
          <el-col :span="2">
              <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-col>
      </el-row>
    <el-row>
         <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            height="500px"
            style="width: 100%">
            <el-table-column
            label="序号"
            align="center"
            width="60">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="日期"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{new Date( scope.row.date) | dateFormate }}</span>
            </template>
            </el-table-column>
            <el-table-column label="描述" width="200" prop="describe" align="center"/>
            <el-table-column label="收入" width="80" prop="income" align="center" style="color: pink"/>
            <el-table-column label="支出" width="80" prop="expend" align="center"/>
            <el-table-column label="现金" width="80" prop="cash" align="center"/>
            <el-table-column label="分类" width="80" prop="type" align="center"/>
            <el-table-column label="备注"  prop="remark" align="center"/>
            <el-table-column label="操作" align="center" fixed="right" width="200">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit( scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete( scope.row._id)">删除</el-button>
            </template>
            </el-table-column>
     </el-table>
    </el-row>
    <AddDialog :dialog='dialog' :form='form' @update='fetchData'></AddDialog>
  </div>
</template>

<script src='./index'>
</script>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 100%;
    // background-color: gray;
}
</style>
