<template>
  <div id="self">
  	<p class="top">欢迎访问信息学院ACM团队微信公众号</p>
  	<!--<h1>个人中心</h1>-->
  	<div class="headcut">
  		<img :src="imgSrc" onerror="this.src='/static/img/default.jpg'"/>
  	</div>
  	<p>{{somebody}}</p>
  	<div class="main">
  		<transition appear name="bounce">
  		<div class="item login" v-if="show">
  			<router-link to="login" v-if="!someone">立即登录</router-link>
  			<a href="javascript:void(0)" v-if="someone" @click="quit">退出登录</a>
  		</div>
  		</transition>
  		<transition appear name="bounce">
  		<div class="item complete" v-if="show">
  			<router-link to="complete">信息完善</router-link>
  		</div>
  		</transition>
  		<transition appear name="bounce">
  		<div class="item apply" v-if="show">
  			<a href="https://www.oj.swust.edu.cn/ContestAdmin/">院赛报名</a>
  		</div>
  		</transition>
  		<transition appear name="bounce">
  		<div class="item contact" v-if="show">
  			<router-link to="contact" v-if="!rights">联系我们</router-link>
  			<router-link to="control" v-if="rights">管理信息</router-link>
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
      show:true,
      rights:0,
      someone:0,
      somebody:"未登录",
      imgSrc:"",
    }
  },
  methods:{
  	//退出登录
  	quit(){
  		sessionStorage.clear()
  		window.location.reload()
  	}
  },
  created(){
  	if(sessionStorage.getItem("loginMsg")){
  		var loginMsg=JSON.parse(sessionStorage.getItem("loginMsg"));
  		this.someone=1;
  		this.somebody=loginMsg.name;
  		this.imgSrc=loginMsg.imgUrl;
  		//console.log(this.imgSrc)
  	}
  	if(sessionStorage.getItem("roleFirst")){
  		var roleFirst=JSON.parse(sessionStorage.getItem("roleFirst"));
  		if(roleFirst.role==0||roleFirst.role==1){
  			this.rights=1
  		}else{
  			this.rights=0
  		}
  	}
  }
}
</script>

<style scoped="scoped" lang="scss">
	#self{
		width: 100%;
		background: url("/static/img/wxbg.jpg") no-repeat;
		background-size: cover;
		padding-top: 1px;
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
	.headcut{
		margin: 0 auto;
		margin-top: 2rem;
		width: 6.8rem;
		border-radius: 100%;
		overflow: hidden;
		img{
			width: 100%;
		}
	}
	p{
		text-align: center;
		margin-top: 1rem;
		color: #333;
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
			background: url("/static/img/gas.png") no-repeat;
			background-size: cover;
			text-align: center;
			line-height: 3.75rem;
			margin-bottom:2rem;
			a{
				display: block;
				color: #fefefe;
				border-radius: 100%;
			}
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

