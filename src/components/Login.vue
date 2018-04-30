<template>
	<div id="login">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>登&nbsp;&nbsp;录</h2>
		</div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  登录成功
		</mt-popup>
		<div class="top">
			<img src="/static/img/school.png"/>
		</div>
		<div class="main">
			<p>帐号</p>
			<input type="text" placeholder="请输入帐号" v-model="user"/>
			<p>密码</p>
			<input type="password" placeholder="请输入密码" v-model="psw"/>
			<div class="auto">
				<label class="custom-checkbox"><input type="checkbox" v-model="remem"><i></i><span>记住密码</span></label>
			</div>
			<button @click="login" :class="followed ? 'activeL' : '' ">登录</button>
			<a href="https://www.oj.swust.edu.cn/signup">注册</a>
		</div>
		
	</div>
</template>

<script>
	
	export default{
		name:"Login",
		data(){
			return{
				user:"",
				psw:"",
				remem:1,
				popupVisible:false
			}
		},
		methods:{
			//返回按钮
			back(){
				window.history.back()
			},
			login(){
				this.$axios({
					method:"post",
					url:"/wxuser/login",
					data:{
						username:this.user,
						password:this.psw
					}
				}).then((res)=>{
					if(res.data.status=200){
						var sdata=res.data.data;
						var info={username:this.user,name:sdata.name,token:sdata.token}
						var rinfo={username:this.user,password:this.psw}
						if(this.remem==0){
							//未勾选记住密码存入sessionStorage
							localStorage.removeItem("loginMsg")
							var sinfo=JSON.stringify(info);
							sessionStorage.setItem("loginMsg",sinfo);
						}else if(this.remem==1){
							//勾选记住密码存入localStorage和sessionStorage
							var sinfo=JSON.stringify(info);
							var srinfo=JSON.stringify(rinfo);
							sessionStorage.setItem("loginMsg",sinfo);
							localStorage.setItem("loginMsg",srinfo);
						}
						var roleFirst={role:sdata.role,first:sdata.firstlogin}
						sessionStorage.setItem("roleFirst",JSON.stringify(roleFirst));
						this.popupVisible=true;
						var interval = window.setTimeout(()=>{
				        	this.$router.push("/self")
				        }, 1000);
						
					}
					
				}).catch((error)=>{
					console.log(error)
				})
			}
		},
		created(){
			if(localStorage.getItem("loginMsg")){
				var msg=JSON.parse(localStorage.getItem("loginMsg"));
				this.user=msg.username;
				this.psw=msg.password;
			}
		},
		computed:{
			followed(){
				if((this.user!="")&&(this.psw!="")){
					return true;
				}else{
					return false;
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#login{
		height: 100%;
		background: url("/static/img/wxbg4.jpg") no-repeat;
		background-size: cover;
	}
	.head{
		display: block;
		padding: 0 1rem;
		position: relative;
		background: none;
		i{
			position: absolute;
			top: 30%;
			font-size: 1rem;
			color: #fefefe;
			font-weight: bold;
		}
		h2{
			font-size: 0.9rem;
			color: #fefefe;
			font-weight: normal;
			text-align: center;
			line-height: 2.6rem;
		}
	}
	.mint-popup{
		background: rgba(240,240,240,0.8);
		color: #029CE2;
		line-height: 2.5;
		width: 100%;
		text-align: center;
		font-size: 0.8rem;
	}
	.top{
		height: 5.5rem;
		text-align: center;
		margin-top: 1rem;
		margin-bottom: 2rem;
		img{
			height: 100%;
		}
	}
	.main{
		padding: 0 2rem;
		p{
			color: #029CE2;
			font-size: 1.2rem;
			margin-bottom: 1rem;
		}
		input{
			width: 100%;
			border: none;
			background: none;
			border-bottom: 1px solid #fff;
			font-size: 0.8rem;
			margin-bottom: 1rem;
			color: #fefefe;
			height: 2rem;
		}
		input::-webkit-input-placeholder{
		    color:#bdbdbd;
		}
		input::-moz-placeholder{   /* Mozilla Firefox 19+ */
		    color:#bdbdbd;
		}
		input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
		    color:#bdbdbd;
		}
		input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
		    color:#bdbdbd;
		}
		.auto{
			color: #fefefe;
			.custom-checkbox input[type="checkbox"] {
			    appearance: none;
			    -webkit-appearance: none;
			    outline: none;
			    display: none
		    }
		    .custom-checkbox {
		        display: block;
		        margin-top: 0.7rem;
		        cursor: pointer;
		        float: left;
		    }
		    .custom-checkbox input[type="checkbox"] + i {
		        width: 0.6rem;
		        height: 0.6rem;
		        display: inline-block;
		        margin-right: 0.5rem;
		        background: url("/static/img/autoLogin.png") no-repeat center center;
		    }
		    .custom-checkbox input[type="checkbox"]:checked + i {
		        background-image: url("/static/img/autoLogin2.png");
		    }
		}
		button{
			margin-top: 2rem;
			width: 100%;
			height: 2rem;
			background: #b9caec;
			border: none;
			border-radius: 1rem;
			color: #fefefe;
			font-size: 0.9rem;
		}
		.activeL{
			background: #03a9f4;
		}
		a{
			display: block;
			margin-top: 1rem;
			width: 100%;
			height: 2rem;
			background: none;
			border: 1px solid #ccc;
			border-radius: 1rem;
			color: #fefefe;
			font-size: 0.9rem;
			text-align: center;
			line-height: 2rem;
		}
	}
	
</style>