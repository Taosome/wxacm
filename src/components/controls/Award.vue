<template>
	<div id="award">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>添加ACM获奖记录</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<p>比赛名称</p>
		<input type="text" placeholder="如ACM/ICPC沈阳赛区、EC Final上海站" v-model="title"/>
		<p>比赛届数</p>
		<input type="number" placeholder="如36" v-model="numb"/>
		<p>队名</p>
		<input type="text" placeholder="" v-model="team_name"/>
		<p>队员</p>
		<input type="text" placeholder="用空格隔开" v-model="teamer"/>
		<div class="medals">
			<span>奖牌：</span>
			<mt-radio 
			  v-model="medal"
			  :options="[{label:'金牌',value:'0'},{label:'银牌',value:'1'},{label:'铜牌',value:'2'} ]">
			</mt-radio>
		</div>
		<div class="upfile">
			<span>上传图片</span>
			<input type="file" name="awardpic" />
		</div>
		<button>确认添加</button>
	</div>
</template>

<script>
	export default{
		name:"Award",
		data(){
			return{
				title:"",
				numb:"",
				team_name:"",
				teamer:"",
				medal:"0"
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
	#award{
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
		.medals{
			width: 18rem;
			margin: 0 auto;
			margin-top: 0.5rem;
			position: relative;
			span{
				position: absolute;
				font-size: 0.9rem;
				top: 0.7rem;
			}
			.mint-radiolist{
				flex: 1;
				margin-left: 1.5rem;
				display: flex;
				background: none;
			}
		}
		.upfile{
			display: flex;
			margin-top: 0.5rem;
			padding: 0 0.5rem;
			align-items: center;
			span{
				display: block;
				width: 4rem;
			}
			input{
				margin-left: 0.5rem;
				width: 13rem;
				font-size: 0.8rem;
			}
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