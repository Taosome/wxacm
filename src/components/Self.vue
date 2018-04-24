<template>
  <div id="self">
  	<p class="top">欢迎来到信息学院ACM团队微信公众号</p>
  	<h1>个人中心</h1>
  	<div class="main">
  		<transition appear name="bounce">
  		<div class="item register" v-if="show">
  			<a href="https://www.oj.swust.edu.cn/signup">点我注册</a>
  		</div>
  		</transition>
  		<transition appear name="bounce">
  		<div class="item login" v-if="show">
  			<router-link to="login">点我登录</router-link>
  		</div>
  		</transition>
  		<transition appear name="bounce">
  		<div class="item complete" v-if="show">
  			<router-link to="complete">信息完善</router-link>
  		</div>
  		</transition>
  		<transition appear name="bounce">
  		<div class="item apply" v-if="show">
  			<router-link to="apply">院赛报名</router-link>
  		</div>
  		</transition>
  	</div>
    <div style="height: 2.6rem;"></div>
		<footer>
			<ul>
				<router-link to="/"><i class="iconfont icon-weibiaoti1"></i><span>招新</span></router-link>
				<router-link to="/project"><i class="iconfont icon-linedesign-13"></i><span>项目</span></router-link>
				<router-link to="/team"><i class="iconfont icon-guanyuwomen"></i><span>成员</span></router-link>
				<router-link to="/self" class="currLi"><i class="iconfont icon-wode"></i><span>我的</span></router-link>
			</ul>
		</footer>
  </div>
</template>

<script>
export default {
  name: 'Self',
  data () {
    return {
      show:true
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
	#self{
		width: 100%;
		background: url("/static/img/wxbg.jpg");
		background-size: cover;
		overflow: hidden;
		height: 100%;
	}
	.top{
		text-align: center;
		font-size: 1rem;
		color: #029CE2;
		margin-top: 0.75rem;
	}
	h1{
		font-size: 1.5rem;
		color: #eee;
		text-align:center;
		margin-top: 1.75rem;
	}
	.main{
		margin-top: 3rem;
		padding: 0 0.5rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.item{
			width: 7.75rem;
			height: 4.75rem;
			background: #f0f0f0;
			text-align: center;
			line-height: 4.75rem;
			margin-bottom:2rem;
			a{
				display: block;
				color: #029CE2;
				border-radius: 100%;
			}
			border-radius: 100%;
		}
		.bounce-enter-active {
		  animation: bounce-in .5s;
		}
		.bounce-leave-active {
		  animation: bounce-in .5s reverse;
		}
		@keyframes bounce-in {
		  0% {
		    transform: scale(0);
		  }
		  50% {
		    transform: scale(1.2);
		  }
		  100% {
		    transform: scale(1);
		  }
		}
	}
</style>

