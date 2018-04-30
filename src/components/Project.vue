<template>
  <div id="project">
  	<div class="head">
  		<span><i class="iconfont icon-wode"></i>{{username}}</span>
  		<div>
	  		<button @click="exchange1" :class="choose">ACM</button>
	  		<button @click="exchange2" :class="choose2">软件开发</button>
	  	</div>
  		<button @click="loginout" class="loginout">注销</button>
  	</div>
  	<div style="height: 2.2rem;"></div>
  	<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab1">
		   	ACM团队成果展示
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		   	项目组成果展示
		  </mt-tab-container-item>
		</mt-tab-container>
    <div style="height: 2.6rem;"></div>
		<footer>
			<ul>
				<router-link to="/"><i class="iconfont icon-weibiaoti1"></i><span>招新</span></router-link>
				<router-link to="/project" class="currLi"><i class="iconfont icon-linedesign-13"></i><span>项目</span></router-link>
				<router-link to="/team"><i class="iconfont icon-guanyuwomen"></i><span>成员</span></router-link>
				<router-link to="/self"><i class="iconfont icon-wode"></i><span>我的</span></router-link>
			</ul>
		</footer>
  </div>
</template>

<script>
export default {
  name: 'Project',
   data () {
    return {
     active:"tab1",
     choose:"curr",
     choose2:""
    }
  },
  methods:{
  	exchange1(){
  		this.active="tab1"
  		this.choose="curr",
      this.choose2=""
  	},
  	exchange2(){
  		this.active="tab2"
  		this.choose2="curr",
      this.choose=""
  	},
  	//退出登录
  	loginout(){
  		sessionStorage.clear();
  		window.location.reload();
  	}
  },
  created(){
  	if(sessionStorage.getItem("loginMsg")){
  		var loginMsg=JSON.parse(sessionStorage.getItem("loginMsg"));
  		this.ifUser=true;
  		this.username=loginMsg.name
  	}
  }
}
</script>

<style scoped="scoped" lang="scss">

</style>

