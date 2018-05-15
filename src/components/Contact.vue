<template>
	<div id="contact">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>联系我们</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<h3>ACM实验室</h3>
		<p><span>联系人：</span>{{acm_header}}</p>
		<p><span>联系电话：</span>{{acm_phone}}</p>
		<p><span>邮箱：</span>{{acm_email}}</p>
		<p><span>地址：</span>{{acm_address}}</p>
		<h3>软件开发实验室</h3>
		<p><span>联系人：</span>{{soft_header}}</p>
		<p><span>联系电话：</span>{{soft_phone}}</p>
		<p><span>邮箱：</span>{{soft_email}}</p>
		<p><span>地址：</span>{{soft_address}}</p>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		name:"Contact",
		data(){
			return{
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
			}
		},
		mounted(){
			if(!sessionStorage.getItem("loginMsg")){
				MessageBox({
	                title: '温馨提示',
	                message: '请先登录本平台',
	                confirmButtonText: '确定'
	            }).then(action => {
	                 this.$router.push("/login");
	            });
			}else{
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
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#contact{
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
		h3{
			padding-left: 0.4rem;
			color: #029CE2;
			background: #f1f1f1;
			height: 2rem;
			line-height: 2rem;
			margin-top: 1rem;
			font-size: 1rem;
		}
		p{
			padding-left: 0.4rem;
			line-height: 0.8rem;
			line-height: 1.5;
		}
	}
</style>