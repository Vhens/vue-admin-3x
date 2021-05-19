<template>
  <div class="login-container">
    <div class="login">
      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            placeholder="admin"
            v-model.trim="ruleForm.username"
            autocomplete="off"
          >
            <template #prepend>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="123456"
            v-model.trim="ruleForm.password"
            autocomplete="off"
          >
            <template #prepend>
              <i class="el-icon-unlock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, getCurrentInstance, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  export default defineComponent({
    setup(props, context) {
      /************************数据区************************************ */
      const loginForm: any = ref(null);

      const router = useRouter();
      const state = reactive({
        ruleForm: {
          username: '',
          password: '',
        },
        checked: true,
        rules: {
          username: [{ required: 'true', message: '账户不能为空', trigger: 'blur' }],
          password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }],
        },
      });
      /****************************函数区******************************************** */
      const submitForm = async () => {
        loginForm.value.validate((valid: boolean) => {
          if (valid) {
            console.log(1111);
            if (state.ruleForm.username === 'admin' && state.ruleForm.password === '123456') {
              router.push('/dashboard');
            } else {
              ElMessage.warning('账户或者密码不正确！');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      };
      const resetForm = () => {
        loginForm.value.resetFields();
      };
      onMounted(() => {});
      return {
        ...toRefs(state),
        loginForm,
        submitForm,
        resetForm,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url('../../assets/images/bg.jpg') no-repeat center;
    background-size: cover;
    .login {
      width: 420px;
      // height: 500px;
      padding: 20px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
    }
  }
  @media screen and (max-width: 765px) {
    .login {
      width: 300px !important;
    }
  }
</style>
