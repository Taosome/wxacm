<template>
  <div id="team">
  	<div class="head">
  		<button @click="exchange1" :class="choose">ACM</button>
  		<button @click="exchange2" :class="choose2">软件开发</button>
  	</div>
  	<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab1">
		  	<p class="text">ACM实验室教练</p>
		   	<div class="leader">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist1" :key=index>
					 	{{info.name}}
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">ACM实验室历届队长</p>
		   	<div class="monitor">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist2" :key=index>
					 	{{info.name}}
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">ACM实验室队员</p>
		   	<div class="teamer">
		   		<swiper :options="swiperOption2">
					 <swiper-slide v-for="(info,index) in datalist3" :key=index>
					 	{{info.name}}
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		   	<p class="text">软件开发实验室教练</p>
		   	<div class="leader">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist4" :key=index>
					 	{{info.name}}
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">软件开发实验室研究生</p>
		   	<div class="monitor">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist5" :key=index>
					 	{{info.name}}
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">软件开发实验室本科生</p>
		   	<div class="teamer">
		   		<swiper :options="swiperOption2">
					 <swiper-slide v-for="(info,index) in datalist6" :key=index>
					 	{{info.name}}
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
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
	import 'swiper/dist/css/swiper.css'
	import {swiper,swiperSlide} from "vue-awesome-swiper"
export default {
  name: 'Team',
  components:{swiper,swiperSlide},
  data(){
    return {
     active:"tab1",
     choose:"curr",
     choose2:"",
     datalist1:[],
     swiperOption: {
      effect: 'cube',
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 1.2
      },
      pagination: {
        el:'.swiper-pagination'
      }
	   },
	   datalist2:[],
	   swiperOption2: {
	      effect: 'coverflow',
	      grabCursor: true,
	      centeredSlides: true,
	      slidesPerView: 2,
	      coverflowEffect: {
	        rotate: 30,
	        stretch: 10,
	        depth: 60,
	        modifier: 2,
	        slideShadows : true
	      },
	      pagination: {
	        el: '.swiper-pagination'
	      }
	   },
	   datalist3:[],
	   datalist4:[],
	   datalist5:[],
	   datalist6:[]
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
  },
  mounted(){
  	this.$axios({
  		method:"get",
  		url:"/wxacm/showAcmMembers"
  	}).then((res)=>{
  		if(res.data.status==200){
  			var sdata=res.data.data;
  			this.datalist1=sdata.coachList;
  			this.datalist2=sdata.captainList;
  			this.datalist3=sdata.memberList;
  		}
  	}).catch((error)=>{
			console.log(error)
		})
  	this.$axios({
  		method:"get",
  		url:"/wxsoft/showSoftMembers"
  	}).then((res)=>{
  		if(res.data.status==200){
  			var sdata=res.data.data;
  			this.datalist4=sdata.coachList;
  			this.datalist5=sdata.masterList;
  			this.datalist6=sdata.bachelorList;
  		}
  	}).catch((error)=>{
			console.log(error)
		})
  }
}
</script>

<style scoped="scoped" lang="scss">
	#team{
		height: 100%;
		//background: url("/static/img/wxbg5.jpg") no-repeat;
		//background-attachment: fixed;
		//background-size: cover;
		.text{
			text-align: center;
			font-size: 1.2rem;
			margin-top: 1rem;
			color: #029CE2;
		}
		.leader {
	    position: relative;
	    overflow: hidden;
	    height: 13.75rem;
	    padding: 0.62rem;
	    .swiper-container {
		    width: 12.5rem !important;
		    height: 12.5rem;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    margin-left: -6.25rem;
		    margin-top: -6.25rem;
		  }
		  .swiper-slide {
		  	background: rgba(180,226,241,0.8);
		    background-position: center;
		    background-size: cover;
		  }
	  }
	  .monitor{
	  	@extend .leader;
	  }
	  .teamer{
	    width: 100%;
	    height: 12.5rem;
	    padding-top: 1.62rem;
	    padding-bottom: 1.62rem;
	    .swiper-slide {
	    	background: rgba(180,226,241,0.8);
		    background-position: center;
		    background-size: cover;
		    width: 9.37rem;
		    height: 9.37rem;
		  }
	  }
	}
</style>

