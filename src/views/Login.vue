<template>
  <div v-loading="loading"  element-loading-spinner="el-icon-loading"
       element-loading-background="#ccffff90" :element-loading-text="loadingText" class="jss1">
    <div class="MuiPaper-root jss2 MuiPaper-elevation1 MuiPaper-rounded">
      <div class="jss6">
        <div class="jss48"><h5 class="jss49">Simple-DNS</h5>
          <div class="jss50">请填写ScerteKey进行登录</div>
        </div>
        <v-form
            style="width: 85%;"
            ref="form"
            v-model="valid"
        >
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="ScerteKey"
              type="password"
              required
          ></v-text-field>

        </v-form>
        <v-btn
            style="margin-top: 40px"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login"
        >
          Login
        </v-btn>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "First",
  data: () => ({
    loadingText:"登录中",
    loading:false,
    valid: true,
    password: '',
    passwordRules: [
      v => !!v || 'key为空',
    ],


  }),
  methods: {

    login () {
      let that=this
      this.$refs.form.validate()
      if (this.valid){
        that.loading=true
        // this.$http({
        //   url:'/WebLogin',
        //   method:'post',
        //   headers:{
        //     'Content-Type':'application/json',
        //     'token':that.password
        //   },
        // })
        //     .then((res)=>{
        //       console.log(res)
        //       let temp=res.data
        //       that.loading=false
        //       if(temp.err_code==403){
        //         this.$message({
        //           message: '用户不存在,请检查用户名！',
        //           type: 'error',
        //         });
        //       }else if(temp.err_code==405){
        //         this.$message({
        //           message: '错咯！',
        //           type: 'error',
        //         });
        //       }else if (temp.err_code==200){
        //
        //         that.$router.push({path:'/Home'});
        //         that.$message({
        //           message: '登录成功~',
        //           type: 'success',
        //         });
        //       }
        //       // eslint-disable-next-line no-unused-vars
        //     }).catch((error)=>{
        //   that.loading=false
        //   this.$message({
        //     message: '哦吼服务器炸了~',
        //     type: 'error',
        //   });
        // })
        that.$router.push({path:'/Home'});
    }else {
        this.$alert('ScerteKey 不正确', '出错了', {
          confirmButtonText: '确定',
          type: 'error',
          center: true,
          callback: () => {
            this.$message({
              type: 'error',
              message: `登录失败！`
            });
          }
        });
      }



    },
  }
}
</script>

<style scoped>
.jss1 {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  min-width: 520px;
  min-height: 646px;
  align-items: center;
  background-size: cover;
  justify-content: center;
  background-image: url("http://180.96.8.140/_next/static/images/backgroundImage-74da743af46fcbebed76860ab2ae3a47.png");
  background-repeat: no-repeat;
}


.jss2 {
  width: 400px;
  display: flex;
  position: relative;
  box-shadow: 0px 5px 6px -3px rgb(247 247 247 / 20%), 0px 9px 12px 1px rgb(241 227 227 / 14%), 0px 16px 22px 15px rgb(96 96 96 / 12%);
  min-height: 450px;
  align-items: center;
  padding-top: 48px;
  flex-direction: column;
}

.MuiPaper-elevation1 {
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
}

.MuiPaper-rounded {
  border-radius: 4px;
}

.MuiPaper-root {
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
}

.jss6 {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.jss28 {
  color: #666;
  display: flex;
  margin-top: 24px;
}

.jss30 {
  font-size: 14px;
  user-select: none;
}

.jss31 {
  color: #666;
  text-decoration: none;
}

.jss48 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.jss49 {
  color: #333;
  margin: 0;
  font-size: 22px;
  font-weight: 500;
}

.jss50 {
  color: #737373;
  margin: 12px 0 26px 0;
  font-size: 18px;
  font-weight: 400;
}
</style>