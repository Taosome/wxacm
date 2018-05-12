<template>
  <div id="team">
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
		  	<p class="text">————&nbsp;ACM实验室教练&nbsp;————</p>
		   	<div class="leader">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist1" :key=index :class="info.gender? '':'girl'">
					 	<div class="pic">
					 		<img :src="baseUrl+'upload/member/'+info.photo" />
					 	</div>
					 	<p>{{info.name}}</p>
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">———&nbsp;ACM实验室历届队长&nbsp;———</p>
		   	<div class="monitor">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist2" :key=index :class="info.gender? '':'girl'">
					 	<div class="pic">
					 		<img :src="baseUrl+'upload/member/'+info.photo" />
					 	</div>
					 	<p><span>{{info.major_class}}</span>&nbsp;&nbsp;<span>{{info.name}}</span></p>
					 	<b>第&nbsp;{{info.role}}&nbsp;届队长</b>
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">————&nbsp;ACM实验室队员&nbsp;————</p>
		   	<div class="teamer" v-for="(item,indexf) in datalist3" :key=indexf>
		   		<h3>第&nbsp;{{item[0].admission_year}}&nbsp;届成员</h3>
		   		<swiper :options="swiperOption2">
					 <swiper-slide v-for="(info,index) in item" :key=index :class="info.gender? '':'girl'">
					 	<div class="pic">
					 		<img :src="baseUrl+'upload/member/'+info.photo" />
					 	</div>
					 		<p><span>{{info.major_class}}</span>&nbsp;&nbsp;<span>{{info.name}}</span></p>
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		   	<p class="text">———软件开发实验室教练———</p>
		   	<div class="leader">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist4" :key=index :class="info.gender? '':'girl'">
					 	<div class="pic">
					 		<img :src="baseUrl+'upload/member/'+info.photo" />
					 	</div>
					 	<p>{{info.name}}</p>
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">———软件开发实验室研究生———</p>
		   	<div class="monitor">
		   		<swiper :options="swiperOption">
					 <swiper-slide v-for="(info,index) in datalist5" :key=index :class="info.gender? '':'girl'">
					 	<div class="pic">
					 		<img :src="baseUrl+'upload/member/'+info.photo" />
					 	</div>
					 	<p><span>{{info.major_class}}</span>&nbsp;&nbsp;<span>{{info.name}}</span></p>
					 	<b><span>{{info.study_direction}}</span>&nbsp;&nbsp;<span>{{info.programing_language}}</span></b>
					 </swiper-slide>
					 <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
		   	</div>
		   	<p class="text">———软件开发实验室本科生———</p>
		   	<div class="teamer" v-for="(item,indexf) in datalist6" :key=indexf>
		   		<h3>第&nbsp;{{item[0].admission_year}}&nbsp;届成员</h3>
		   		<swiper :options="swiperOption2">
					 <swiper-slide v-for="(info,index) in item" :key=index :class="info.gender? '':'girl'">
					 	<div class="pic">
					 		<img :src="baseUrl+'upload/member/'+info.photo" />
					 	</div>
					 	<p><span>{{info.major_class}}</span>&nbsp;&nbsp;<span>{{info.name}}</span></p>
					 	<b><span>{{info.study_direction}}</span>&nbsp;&nbsp;<span>{{info.programing_language}}</span></b>
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
     username:"ACMer",
     baseUrl:"http://cf.swustacm.cn:8080/",
     datalist1:[],
     swiperOption: {
      effect: 'cube',
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 1.2
      },
      observer:true,
      observeParents:true,
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
	      observer:true,
      	observeParents:true,
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
  	},
  	//退出登录
  	loginout(){
  		sessionStorage.clear();
  		window.location.reload();
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
	#team{
		height: 100%;
		//background: url("/static/img/wxbg5.jpg") no-repeat;
		//background-attachment: fixed;
		//background-size: cover;
		.text{
			text-align: center;
			font-size: 1.0rem;
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
		  	display: flex;
		  	flex-direction: column;
		  	align-items: center;
		  	background: rgba(180,226,241,0.8);
		    background-position: center;
		    background-size: cover;
		    
		    .pic{
		    	width: 8rem;
		    	height: 8rem;
		    	//border: 1px solid #029CE2;
		    	overflow: hidden;
		    	margin-top: 1rem;
		    	margin-bottom: 0.8rem;
		    	background: #fefefe;
		    	border-radius:100%;
		    	img{
		    		width: 100%;
		    	}
		    }
		    p{
			  	font-size: 0.9rem;
			  	margin-bottom: 0.2rem;
			  	color: #333;
			  }
		  }
		  .girl{
		  	background: rgba(252,89,208,0.5);
		  }
	  }
	  .monitor{
	  	@extend .leader;
	  	.pic{
	    	width: 8rem;
	    	height: 8rem;
	    	//border: 1px solid #029CE2;
	    	overflow: hidden;
	    	background: #fefefe;
	    	border-radius:100%;
	    	img{
	    		width: 100%;
	    	}
		  }
		  p{
		  	font-size: 0.9rem;
		  	color: #333;
		  }
		  b{
		  	font-size: 0.7rem;
		  	border: 1px solid #666;
		  }
	  }
	  .teamer{
	    width: 100%;
	    padding-top: 1.2rem;
	    padding-bottom: 1.2rem;
	    h3{
	    	text-align: center;
	    	font-size: 0.8rem;
	    	margin-bottom: 0.3rem;
	    }
	    .swiper-slide {
	    	display: flex;
		  	flex-direction: column;
		  	align-items: center;
	    	background: rgba(180,226,241,0.8);
		    background-position: center;
		    background-size: cover;
		    width: 9.37rem;
		    height: 9.37rem;
		    padding-bottom: 0.8rem;
		    .pic{
		    	width: 6rem;
		    	height: 6rem;
		    	margin-top: 0.6rem;
		    	margin-bottom: 0.4rem;
		    	//border: 1px solid #029CE2;
		    	overflow: hidden;
		    	background: #fefefe;
		    	border-radius:100%;
		    	img{
		    		width: 100%;
		    	}
		    }
		    p{
			  	font-size: 0.9rem;
			  	margin-bottom: 0.2rem;
			  	color: #333;
			  	
			  }
			  b{
			  	font-size: 0.7rem;
			  	border: 1px solid #666;
			  }
		  }
		  .girl{
		  	background: rgba(252,89,208,0.5);
		  }
	  }
	}
</style>

