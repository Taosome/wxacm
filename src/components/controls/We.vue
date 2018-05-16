<template>
	<div id="we">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>修改联系方式</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  修改成功
		</mt-popup>
		<h3>ACM实验室</h3>
		<div class="msg">
			<span>联系人：</span>
			<input type="text" v-model="acm_header"/>
		</div>
		<div class="msg">
			<span>联系电话：</span>
			<input type="text" v-model="acm_phone"/>
		</div>
		<div class="msg">
			<span>邮箱：</span>
			<input type="text" v-model="acm_email"/>
		</div>
		<div class="msg">
			<span>地址：</span>
			<input type="text" v-model="acm_address"/>
		</div>
		<h3>软件开发实验室</h3>
		<div class="msg">
			<span>联系人：</span>
			<input type="text" v-model="soft_header"/>
		</div>
		<div class="msg">
			<span>联系电话：</span>
			<input type="text" v-model="soft_phone"/>
		</div>
		<div class="msg">
			<span>邮箱：</span>
			<input type="text" v-model="soft_email"/>
		</div>
		<div class="msg">
			<span>地址：</span>
			<input type="text" v-model="soft_address"/>
		</div>
		<button @click="change">确认更改</button>
	</div>
</template>

<script>
	export default{
		name:"We",
		data(){
			return{
				popupVisible:false,
				token:"",
				acm_header:"",
				acm_phone:"",
				acm_email:"",
				acm_address:"",
				soft_header:"",
				soft_phone:"",
				soft_email:"",
				soft_address:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			getInfo(){
				this.token=JSON.parse(sessionStorage.getItem("loginMsg")).token
				this.$axios({
					method:"get",
					url:"/wxuser/contactUs",
					params:{token:this.token}
				}).then((res)=>{
					if(res.data.status==200){
						var sdata=res.data.data;
						this.acm_header=sdata.acm_header;
						this.acm_phone=sdata.acm_phone;
						this.acm_email=sdata.acm_email;
						this.acm_address=sdata.acm_address;
						this.soft_header=sdata.soft_header;
						this.soft_phone=sdata.soft_phone;
						this.soft_email=sdata.soft_email;
						this.soft_address=sdata.soft_address;
					}
				})
			},
			change(){
				this.$axios({
					method:"post",
					url:"/wxuser_admin/contactUsInfo",
					params:{token:this.token},
					data:{
						acm_header:this.acm_header,
						acm_phone:this.acm_phone,
						acm_email:this.acm_email,
						acm_address:this.acm_address,
						soft_header:this.soft_header,
						soft_phone:this.soft_phone,
						soft_email:this.soft_email,
						soft_address:this.soft_address
					}
				}).then((res)=>{
					if(res.data.status==200){
						this.popupVisible=true;
						var interval = window.setTimeout(()=>{
				        	this.popupVisible=false;
				        	this.getInfo();
				        }, 1000);
					}
				})
			}
		},
		mounted(){
			this.getInfo();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#we{
		.head{
			display: block;
			padding: 0 1rem;
			position: fixed;
			background: #fefefe;
			i{
				position: absolute;
				top: 30%;
				font-size: 1rem;
				color: #029CE2;
				font-weight: bold;
			}
			h2{
				font-size: 0.9rem;
				color: #029CE2;
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
		h3{
			padding-left: 0.4rem;
			color: #029CE2;
			background: #f1f1f1;
			height: 2rem;
			line-height: 2rem;
			margin-top: 1rem;
			font-size: 1rem;
		}
		.msg{
			width: 18rem;
			margin: 0 auto;
			margin-top: 0.2rem;
			overflow: hidden;
			position: relative;
			span{
				display: block;
				height: 1rem;
				width: 4rem;
				color: #333;
				padding: 0.2rem 0;
				font-size: 0.7rem;
				line-height: 1rem;
			}
			//输入框
			input{
				width: 100%;
				height: 2rem;
				border: 1px solid #ccc;
				border-radius: 0.1rem;
				font-size: 0.6rem;
				padding-left: 0.5rem;
				color: #333;
				background: none;
			}
		}
		button{
			display: block;
			margin: 0 auto;
			margin-top: 1rem;
			margin-bottom: 1rem;
			width: 18rem;
			height: 2rem;
			border: none;
			background: #029CE2;
			color: #fefefe;
			font-size: 0.8rem;
			border-radius: 0.2rem;
		}
	}
</style>