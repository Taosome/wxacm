<template>
	<div id="complete">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>信息完善</h2>
		</div>
		<div style="height: 2.2rem;"></div>
		<p><span>提示</span>请认真填写你的个人资料！</p>
		<div class="msg">
			<span>姓名</span>
			<input type="text" v-model="name"/>
		</div>
		<div class="msg">
			<span>学号</span>
			<input type="text" v-model="stu_id"/>
		</div>
		<div class="msg">
			<span>学院</span>
			<input type="text" v-model="college"/>
			<i class="iconfont icon-jiantou"></i>
		</div>
		<div class="msg">
			<span>班级</span>
			<input type="text" v-model="major_class" placeholder="如：电子1303"/>
		</div>
		<!--<div class="msg">
			<span>性别</span>
				
			<input type="text" v-model="gender"/>
		</div>-->
		<div class="msg">
			<span>电话</span>
			<input type="text" v-model="phone_number" placeholder="手机号码（不会公开）"/>
		</div>
		<div class="msg">
			<span>QQ</span>
			<input type="text" v-model="qq_number" placeholder="QQ号码（不会公开）"/>
		</div>
		<div class="msg">
			<span>邮箱</span>
			<input type="text" v-model="email" placeholder="邮箱（不会公开）"/>
		</div>
		<div class="msg">
			<span>实验室</span>
			<input type="text" v-model="lab"/>
			<i class="iconfont icon-jiantou"></i>
		</div>
		<mt-radio 
		  v-model="sex"
		  :options="['男', '女']">
		</mt-radio>
		<button @click="save">提交保存</button>
	</div>
</template>

<script>
	export default{
		name:"Complete",
		data(){
			return{
				name:"",
				stu_id:"",
				college:"",
				major_class:"",
				phone_number:"",
				qq_number:"",
				email:"",
				sex:"男",
				lab:"暂未加入实验室",
				colleges:[]
			}
		},
		methods:{
			back(){
				this.$emit("backhero","tab2")
				this.$router.go(-1)
			},
			save(){
				
			}
		},
		mounted(){
			this.$axios({
				method:"get",
				url:"/wxuser/collegeList"
			}).then((res)=>{
				if(res.data.status==200){
					var sdata=res.data.data;
					for(var i=0;i<sdata.length;i++){
						this.colleges.push(sdata[i].college)
					}
				}
			}).catch((error)=>{
				
			})
		},
		created(){
	  		var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
	  		this.$axios({
	  			method:"get",
	  			url:"/wxuser/getUserInfo",
	  			params:{token:token}
	  		}).then((res)=>{
	  			if(res.data.status==200){
	  				var sdata=res.data.data;
	  				this.name=sdata.name;
	  				this.stu_id=sdata.stu_id;
	  				this.college=sdata.college;
	  				this.major_class=sdata.major_class;
	  				this.phone_number=sdata.phone_number;
	  				this.qq_number=sdata.qq_number;
	  				this.email=sdata.email;
	  				if(sdata.gender==0){
	  					this.sex="女"
	  				}else{
	  					this.sex="男"
	  				}
	  			}
	  		}).catch((error)=>{
	  			
	  		})
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#complete{
		width: 100%;
		height: 100%;
		background: url("/static/img/wxbg7.jpg") no-repeat center center;
		background-attachment: fixed;
		background-size: cover;
	}
	.head{
		display: block;
		padding: 0 1rem;
		position: fixed;
		background: #f0f0f0;
		height:2.2rem;
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
			line-height: 2.2rem;
		}
	}
	p{
		margin-top: 1rem;
		font-size: 0.8rem;
		padding: 0 1.3rem;
		span{
			color: #fefefe;
			background: #029ce2;
			display: inline-block;
			padding: 0.1rem 0.2rem;
			border-radius: 0.2rem;
		}
	}
	.msg{
		width: 16rem;
		margin: 0 auto;
		margin-top: 0.8rem;
		display: flex;
		align-items: center;	
		border: 1px solid #ccc;
		border-radius: 0.2rem;
		overflow: hidden;
		position: relative;
		span{
			display: block;
			height: 1rem;
			width: 3rem;
			background: #f0f0f0;
			color: #333;
			border-right: 1px solid #ccc;
			text-align: center;
			padding: 0.2rem 0;
			font-size: 0.7rem;
			line-height: 1rem;
		}
		//输入框
		input{
			width: 13rem;
			border: none;
			height: 1rem;
			font-size: 0.6rem;
			padding-left: 0.5rem;
			color: #666;
			background: none;
		}
		i{
			position: absolute;
			right: 0.2rem;
			color: #fefefe;
		}
	}
	//单选组
	.mint-radiolist{
		display: flex;
		background: none;
	}
	button{
		display: block;
		width: 16rem;
		height: 1.8rem;
		border: none;
		background: #03a9f4;
		margin: 0 auto;
		font-size: 0.8rem;
		color: #fefefe;
		border-radius:0.2rem;
	}
</style>