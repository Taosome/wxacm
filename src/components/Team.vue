<template>
  <div id="team">
  	<div class="head">
  		<button @click="exchange1" :class="choose">ACM</button>
  		<button @click="exchange2" :class="choose2">软件开发</button>
  	</div>
  	<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab1">
		   	ACM团队成员 
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		   	项目组成员
		  </mt-tab-container-item>
		</mt-tab-container>
    <div style="height: 2.6rem;"></div>
		<footer>
			<ul>
				<router-link to="/"><i class="iconfont icon-weibiaoti1"></i><span>招新</span></router-link>
				<router-link to="/project"><i class="iconfont icon-linedesign-13"></i><span>项目</span></router-link>
				<router-link to="/team" class="currLi"><i class="iconfont icon-guanyuwomen"></i><span>成员</span></router-link>
				<router-link to="/self"><i class="iconfont icon-wode"></i><span>我的</span></router-link>
			</ul>
		</footer>
  </div>
</template>

<script>
export default {
  name: 'Team',
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
  	}
  }
}
</script>

<style scoped="scoped" lang="scss">

</style>

