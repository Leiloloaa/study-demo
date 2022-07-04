<template>
  <el-form
    :model="userForm"
    :rules="rules"
    status-icon
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input
        v-model="userForm.userName"
        autocomplete="off"
        placeholder="Enter userName..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="userForm.password"
        autocomplete="off"
        placeholder="Enter password..."
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="repeat_password" v-if="!flag">
      <el-input
        type="password"
        v-model="userForm.repeat_password"
        autocomplete="off"
        placeholder="Place repeat your password..."
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(userForm)" class="submit-btn"
        >确定</el-button
      >
    </el-form-item>
    <div class="tiparea">
      <p v-if="flag">没有账号 <a @click="changeFlag">立即注册</a></p>
      <p v-if="!flag">已有账号 <a @click="changeFlag">立即登录</a></p>
    </div>
  </el-form>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    userForm: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const flag = ref<boolean>(true);
    const router = useRouter();
    const submitForm = (userForm: Object) => {
      console.log(userForm);
      // @ts-ignore
      if (userForm || userForm.password.length < 6) {
        alert("您的密码有无，请重新输入");
        return;
      }
      router.push("/home");
    };

    const changeFlag = () => {
      flag.value = !flag.value;
      flag.value === true ? router.push("/login") : router.push("/register");
    };

    return { flag, submitForm, changeFlag };
  },
};
</script>
<style lang="scss" scoped>
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
