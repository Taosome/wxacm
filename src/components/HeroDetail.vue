<template>
	<div id="heroDetail">
		<h2>题目详细信息</h2>
		<table border="1" cellspacing="0" cellpadding="0" bordercolor="#bdbdbd">
			<tr>
				<td class="left">题目：</td>
				<td class="right">{{title}}</td>
			</tr>
			<tr>
				<td class="left">具体要求：</td>
				<td class="right">{{content}}</td>
			</tr>
			<tr>
				<td class="left">浏览次数：</td>
				<td class="right">{{view}}</td>
			</tr>
			<tr>
				<td class="left">报名人数：</td>
				<td class="right">{{join_number}}</td>
			</tr>
			<tr>
				<td class="left">出题人：</td>
				<td class="right">{{author}}</td>
			</tr>
			<tr>
				<td class="left">联系QQ：</td>
				<td class="right">{{author_qq}}</td>
			</tr>
			<tr>
				<td class="left">出题时间：</td>
				<td class="right">{{time}}</td>
			</tr><tr>
				<td class="left">出题单位：</td>
				<td class="right">{{lab}}</td>
			</tr>
		</table>
		<button @click="back">返回</button>
	</div>
</template>

<script>
	export default{
		name:"HeroDetail",
		data(){
			return{
				heroID:0,
				title:"",
				content:"",
				view:0,
				join_number:0,
				author:"",
				author_qq:0,
				time:"",
				lab:""
			}
		},
		methods:{
			back(){
				this.$router.push("/");
			}
		},
		mounted(){
			this.heroID=this.$route.params.heroid;
			this.$axios({
				method:"get",
				url:"/wxsoft/heroPostInfo",
				params:{hero_post_id:this.heroID}
			}).then((res)=>{
				if(res.data.status==200){
					var sdata=res.data.data;
					this.title=sdata.title;
					this.content=sdata.content;
					this.view=sdata.view;
					this.join_number=sdata.join_number;
					this.author=sdata.author;
					this.author_qq=sdata.author_qq;
					this.time=sdata.time;
					this.lab=sdata.lab;
				}
			}).catch((error)=>{
				console.log(error)
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#heroDetail{
		height: 100%;
		background: url("/static/img/wxbg6.jpg") no-repeat;
		background-size: cover;
		overflow: hidden;
		h2{
			text-align: center;
			font-size: 1.3rem;
			color: #FEFEFE;
			font-weight: normal;
			margin-top: 1rem;
		}
		table{
			width: 16.65rem;
			margin: 0 auto;
			height: auto;
			margin-top: 2rem;
			color: #111;
			tr{
				td{
					text-align: center;
					padding: 0.5rem 0;
					font-size: 0.75rem;
					line-height: 1.2;
				}
				.left{
					width: 5rem;
				}
				.right{
					width: 11.65rem;
				}
			}
		}
		button{
			display: block;
			width: 16.65rem;
			margin: 0 auto;
			margin-top: 2rem;
			height: 2rem;
			font-size: 0.8rem;
			background: #f0f0f0;
			color: #111;
			border: none;
			border-radius: 0.25rem;
		}
	}
</style>