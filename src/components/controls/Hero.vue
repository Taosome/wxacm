<template>
	<div id="hero">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>英雄帖</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<router-link to="addHero" class="add">+ 添加</router-link>
		<ul>
			<li v-for="(item,index) in datalist">
				{{item.title}}
				<i class="iconfont icon-jiantou"></i>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"Hero",
		data(){
			return{
				datalist:[]
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
		},
		mounted(){
			this.$axios({
				method:"get",
				url:"/wxsoft/heroPost"
			}).then((res)=>{
				var sdata=res.data.data
				for(var i=0;i<sdata.length;i++){
					this.datalist.push(sdata[i])
				}
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#hero{
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
		.add{
			display: block;
			width: 4rem;
			height: 2rem;
			border: 1px solid #029CE2;
			margin-top: 1rem;
			margin-left: 0.5rem;
			text-align: center;
			line-height: 2rem;
			color: #666;
		}
		ul{
			width: 18rem;
			margin: 0 auto;
			margin-top: 2rem;
			border-top:1px solid #aaa;
			li{
				display: block;
				width: 100%;
				height: 2.5rem;
				font-size: 0.9rem;
				line-height: 2.5rem;
				border-bottom:1px solid #aaa;
				i{
					float: right;
					font-size: 1.4rem;
				}
			}
		}
	}
</style>