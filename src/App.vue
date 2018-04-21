<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	import Home from "@/components/Home"
	export default {
	  name: 'App'
	}
</script>

<style lang="scss">
#app{
		height: 100%;
	}
	//类别切换
	.head{
		height: 2.6rem;
		background: #f0f0f0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 2.5rem;
		justify-content: space-around;
		button{
			border: none;
			width: 4rem;
			height: 1.6rem;
			background: #fdfdfd;
			border-radius: 0.2rem;
			color: #029ce2;
			font-size: 0.8rem;
		}
		.curr{
			background: #029ce2;
			color: #fefefe;
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

</style>
