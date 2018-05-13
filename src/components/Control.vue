<template>
	<div id="control">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>后台管理</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<div class="control">
			<router-link to="/user">用户</router-link>
			<router-link to="/hero">英雄帖</router-link>
			<router-link to="/award">ACM荣誉</router-link>
			<router-link to="/proj">软件开发项目</router-link>
			<router-link to="/lib">实验室成员</router-link>
			<router-link to="/we">联系我们</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Control",
		data(){
			return{
				
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
	#control{
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
		.control{
			margin: 0 auto;
			width: 18rem;
			margin-top: 1.4rem;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			a{
				display: inline-block;
				width: 8.8rem;
				height: 6rem;
				background: #ddd;
				text-align: center;
				line-height: 6rem;
				margin-bottom: 0.3rem;
				color: #029CE2;
			}
		}
	}
</style>