<template>
  <div id="app">
    <router-view @backhero="lisbh" :msg="msg"/>
  </div>
</template>

<script>
	import Home from "@/components/Home"
	export default {
	  name: 'App',
	  data(){
	  	return{
	  		msg:"tab1"
	  	}
	  },
	  methods:{
	  	lisbh(data){
	  		this.msg=data
	  	}
	  }
	}
</script>

<style lang="scss">
#app{
		height: 100%;
	}
	//类别切换
	.head{
		height: 2.2rem;
		width: 100%;
		background: #f0f0f0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 0.8rem;
		font-size: 0.6rem;
		box-shadow: 2px 2px 2px #bdbdbd;
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 9999;
		span{
			i{
				margin-right: 0.25rem;
			}
		}
		div{
			border-radius: 0.8rem;
			overflow: hidden;
			position: absolute;
			width: 6.2rem;
			height: 1.2rem;
			margin: auto;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			button{
				border: none;
				width: 3rem;
				height: 1.2rem;
				background: #fdfdfd;
				color: #029ce2;
				font-size: 0.6rem;
			}
			.curr{
				background: #029ce2;
				color: #fefefe;
			}
		}
		.loginout{
			padding: 0.2rem 0.5rem;
			background: #fefefe;
			color: #029ce2;
			border:1px solid #029ce2;
		}
		
	}
	/*尾部*/
	footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		background: #f0f0f0;
	}
	footer ul{
		width: 100%;
		height: 2.6rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		a{
			display: flex;
			font-size: 0.7rem;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			color: #666;
			i{
				margin-bottom: 0.25rem;
				font-size: 0.95rem !important;
			}
		}
		.currLi{
			color: #029ce2;
		}
	}
	//单选框按钮背景
	.mint-cell{
		background: none;
	}
</style>
