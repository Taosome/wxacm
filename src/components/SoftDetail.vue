<template>
	<div id="softDetail">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>项目详情</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<h1>{{title}}</h1>
		<h3><span class="team">西科信息ACM</span><span class="time">{{time}}</span><span class="views">{{view}}次浏览</span></h3>
		
		<div class="pic">
			<img :src="address"/>
		</div>
		<div class="text" v-html="content">
			
		</div>
		<h4>编者<span>{{editor}}</span></h4>
	</div>
</template>

<script>
	export default {
		name:"SoftDetail",
		data(){
			return{
				proID:"",
				title:"",
				time:"",
				view:"",
				editor:"",
				address:"",
				content:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
		},
		mounted(){
			this.proID=this.$route.params.softid;
			this.$axios({
				method:"get",
				url:"/wxsoft/showProjectInfo",
				params:{project_id:this.proID}
			}).then((res)=>{
				var sdata=res.data.data;
				
				this.title=sdata.project_title;
				this.time=sdata.time;
				this.view=sdata.view;
				this.editor=sdata.editor;
				this.address="http://cf.swustacm.cn:8080/upload/member/"+sdata.project_head_pic;
				this.content=sdata.project_content;
			})
		}
	}
</script>

<style lang="scss">
	#softDetail{
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
		h1{
			font-size: 1.2rem;
			font-weight: normal;
			color: #333;
			text-align: center;
			padding: 0 1rem;
			margin-top: 1rem;
		}
		h3{
			padding: 0 1rem;
			color: #999;
			margin-top: 0.5rem;
			font-weight: normal;
			.team{
				font-size: 0.8rem;
				color: #029CE2;
				margin-right: 0.5rem;
			}
			.time{
				font-size: 0.8rem;
				margin-right: 0.5rem;
			}
			.views{
				font-size: 0.8rem;
			}
		}
		h4{
			padding: 0 1rem;
			color: #999;
			font-size: 0.8rem;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			font-weight: normal;
			text-align: right;
			span{
				margin-left: 0.5rem;
			}
		}
		.pic{
			padding: 0 0.5rem;
			height: 10rem;
			margin-top: 2rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			box-sizing: border-box;
			padding: 0 0.5rem;
			margin-top: 1rem;
			width: 100%;
			line-height: 1.4;
			font-size: 0.8rem;
			overflow: hidden;
			img{
				width: 100%;
				height: 10rem;
				margin: 0.5rem 0;
			}
		}
	}
</style>