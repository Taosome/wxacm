<template>
	<div id="rankDetail">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>详细信息</h2>
		</div>
		<div style="height: 2.2rem;"></div>
		<table border="0" cellspacing="0" cellpadding="0" bordercolor="#bdbdbd">
			<tr>
				<td class="left">帐号</td>
				<td class="right">{{username}}</td>
			</tr>
			<tr>
				<td class="left">姓名</td>
				<td class="right">{{name}}</td>
			</tr>
			<tr>
				<td class="left">权限</td>
				<td class="right">{{roles}}</td>
			</tr>
			<tr>
				<td class="left">学号</td>
				<td class="right">{{stu_id}}</td>
			</tr>
			<tr>
				<td class="left">性别</td>
				<td class="right">{{sex}}</td>
			</tr>
			<tr>
				<td class="left">实验室</td>
				<td class="right">{{labs}}</td>
			</tr>
			<tr>
				<td class="left">学院</td>
				<td class="right">{{college}}</td>
			</tr>
			<tr>
				<td class="left">班级</td>
				<td class="right">{{major_class}}</td>
			</tr>
			<tr>
				<td class="left">入学年份</td>
				<td class="right">{{admission_year}}</td>
			</tr>
			<tr>
				<td class="left">联系QQ</td>
				<td class="right">{{qq_number}}</td>
			</tr>
			<tr>
				<td class="left">电话号码</td>
				<td class="right">{{phone_number}}</td>
			</tr>
			<tr>
				<td class="left">邮箱</td>
				<td class="right">{{email}}</td>
			</tr>
			<tr>
				<td class="left">解题数</td>
				<td class="right">{{solved}}</td>
			</tr>
			<tr>
				<td class="left">提交总数</td>
				<td class="right">{{submission}}</td>
			</tr>
			<tr>
				<td class="left">通过率</td>
				<td class="right">{{acRate}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		name:"RankDefault",
		data(){
			return{
				user_id:"",
				username:"",
				name:"",
				role:"",
				stu_id:"",
				gender:"",
				lab:"",
				college:"",
				major_class:"",
				admission_year:"",
				qq_number:"",
				phone_number:"",
				email:"",
				solved:"",
				submission:"",
				acRate:""
			}
		},
		methods:{
			back(){
				this.$emit("backhero","tab1")
				this.$router.go(-1)
			}
		},
		mounted(){
			this.user_id=this.$route.params.id;	
			var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
			this.$axios({
				method:"get",
				url:"/wxuser_admin/getUserDetailInfo",
				params:{
					user_id:this.user_id,
					token:token
				}
			}).then((res)=>{
				if(res.data.status==200){
					var sdata=res.data.data
					this.username=sdata.username
					this.name=sdata.name
					this.role=sdata.role
					this.stu_id=sdata.stu_id
					this.gender=sdata.gender
					this.lab=sdata.lab
					this.college=sdata.college
					this.major_class=sdata.major_class
					this.admission_year=sdata.admission_year
					this.qq_number=sdata.qq_number
					this.phone_number=sdata.phone_number
					this.email=sdata.email
					this.solved=sdata.solved
					this.submission=sdata.submission
					this.acRate=sdata.acRate
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		computed:{
			sex(){
				if(this.gender==0){
					return "女"
				}else{
					return "男"
				}
			},
			roles(){
				if(this.role==0){
					return "超级管理员"
				}else if(this.role==1){
					return "管理员"
				}else{
					return "普通成员"
				}
			},
			labs(){
				if(this.lab==0){
					return "暂未加入实验室"
				}else if(this.lab==1){
					return "软件开发实验室"
				}else{
					return "ACM实验室"
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#rankDetail{
		height: 100%;
		background: url("/static/img/wxbg5.jpg") no-repeat;
		background-size: cover;
		padding-bottom: 0px;
	}
	.head{
		display: block;
		padding: 0 1rem;
		position: fixed;
		background: #f0f0f0;
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
	table{
		width: 16.65rem;
		margin: 0 auto;
		height: auto;
		margin-top: 1rem;
		color: #111;
		margin-bottom: 2rem;
		background: #fefefe;
		tr{
			border-bottom:1px solid #666;
			td{
				text-align: center;
				padding: 0.4rem 0;
				font-size: 0.75rem;
				line-height: 1.2;
			}
			.left{
				width: 5rem;
				background: rgba(70,198,245,0.5);
			}
			.right{
				width: 11.65rem;
			}
		}
	}
</style>
