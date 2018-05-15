<template>
	<div id="addHero">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>添加英雄帖</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<p>英雄帖标题</p>
		<input type="text" placeholder="不能超过20字" v-model="title"/>
		<p>英雄贴要求</p>
		<textarea placeholder="题目要求" v-model="req"></textarea>
		<p>示例图片<input type="file" multiple="multiple" class="chooseFile"/></p>
		<p>出题人</p>
		<input type="text" v-model="author"/>
		<p>出题人QQ</p>
		<input type="text" v-model="qq_num"/>
		<button>添加题目</button>
	</div>
</template>

<script>
	export default{
		name:"AddHero",
		data(){
			return{
				title:"",
				req:"",
				author:"",
				qq_num:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#addHero{
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
		p{
			margin-top: 0.5rem;
			margin-left: 0.5rem;
			font-size: 0.8rem;
			color: #333;
			.chooseFile{
				display: inline-block;
				width: 14rem;
			}
		}
		input{
			display: block;
			margin: 0 auto;
			margin-top: 0.3rem;
			width: 18rem;
			height: 1.6rem;
			font-size: 0.8rem;
			padding-left: 0.3rem;
		}
		textarea{
			display: block;
			margin: 0 auto;
			margin-top: 0.3rem;
			width: 18rem;
			height: 5rem;
			font-size: 0.8rem;
			padding: 0.3rem;
		}
		button{
			display: block;
			margin: 0 auto;
			margin-top: 1rem;
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