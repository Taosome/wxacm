<template>
  <div id="home">
  	<div class="head">
  		<span><i class="iconfont icon-wode"></i>{{username}}</span>
  		<div>
	  		<button @click="exchange1" :class="choose">ACM</button>
	  		<button @click="exchange2" :class="choose2">软件开发</button>
	  	</div>
  		<button @click="loginout" class="loginout">注销</button>
  	</div>
  	<div style="height: 2.2rem;"></div>
  	<mt-popup
		  v-model="popupVisible1"
		  
		  popup-transition="popup-fade">
		  报名成功
		</mt-popup>
		<mt-popup
		  v-model="popupVisible2"
		  
		  popup-transition="popup-fade">
		  已报名，请尽快完成你的题目
		</mt-popup>
  	<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab1">
		  	<mt-popup
			  v-model="popupVisible"
			  
			  popup-transition="popup-fade">
			  抱歉，您暂未获得管理员权限或未登录
			</mt-popup>
		   	<h1>OJ平台排行榜</h1>
		   	<p>
		   		<i class="iconfont icon-wodebangzhuzhongxin"></i>
		   		点击姓名查看详细信息(需管理员)
		   		<span><b class="male"></b>男生<b class="female"></b>女生</span>
		   	</p>
		   	<ul class="ranking">
		   		<li class="rankHead">
		   			<span class="rank">排名</span>
		   			<span class="name">姓名</span>
		   			<span class="major">班级</span>
		   			<span class="solved">AC</span>
		   			<span class="acrate">AC率</span>
		   		</li>
		   		<li v-for="(info,index) in datalist" :class="info.gender? '':'girl'">
		   			<span class="rank">{{info.rank}}</span>
		   			<span class="name" @click="goDetail(info.user_id)">{{info.name}}</span>
		   			<span class="major">{{info.major_class}}</span>
		   			<span class="solved">{{info.solved}}</span>
		   			<span class="acrate">{{info.acRate}}</span>
		   		</li>
		   	</ul>
		   	<!--<p class="tip">
		   		红色代表女同学，蓝色代表男同学
		   	</p>-->
		   	<div class="pagination">
		   		<i class="iconfont icon-jiantou2" @click="prev" :disabled="disabled"></i>
		   		<span v-for="n in pages" @click="pageData(n)" :class="now(n)">{{n}}</span>
		   		<i class="iconfont icon-jiantou" @click="next"></i>
		   	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		   	<h1>软件开发英雄帖</h1>
		   	<dl class="hero">
		   		<div class="question" v-for="(item,index) in datalist2">
		   			<h3 @click="heroDetail(item.hero_post_id)" >{{item.title}}</h3>
		   			<div class="questionM">
		   				<span class="view">{{item.view}}次浏览</span>
		   				<span class="number">{{item.join_number}}人报名</span>
		   				<span class="join"><button @click="sign(item.hero_post_id)" v-if="!signed(item.join)" :disabled="disabled1">报名</button><button @click="cannot" v-if="signed(item.join)">已报名</button></span>
		   			</div>
		   		</div>
		   	</dl>
		  </mt-tab-container-item>
		</mt-tab-container>
    <div style="height: 2.6rem;"></div>
		<footer>
			<ul>
				<router-link to="/" class="currLi"><i class="iconfont icon-weibiaoti1"></i><span>招新</span></router-link>
				<router-link to="/project"><i class="iconfont icon-linedesign-13"></i><span>项目</span></router-link>
				<router-link to="/team"><i class="iconfont icon-guanyuwomen"></i><span>成员</span></router-link>
				<router-link to="/self"><i class="iconfont icon-wode"></i><span>我的</span></router-link>
			</ul>
		</footer>
  </div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
export default {
  name: 'Home',
  props:["msg"],
  data () {
    return {
     active:"tab1",
     choose:"curr",
     choose2:"",
     datalist:[],
     num:1,
     pages:0,
     disabled:false,
     datalist2:[],
     popupVisible:false,
     ifUser:false,
     username:"ACMer",
     join:"",
     popupVisible1:false,
     popupVisible2:false,
     disabled1:false
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
  	},
  	//请求排行榜数据
  	getData(){
  		this.$axios({
	  		method:"get",
	  		url:"/wxacm/showFreshmanRank",
	  		params:{
	  			pageNum:this.num,
	  			pageSize:10
	  		}
	  	}).then((res)=>{
	  		if(res.data.status==200){
		  		var list=res.data.data
		  		this.pages=res.data.totalPage
		  		this.datalist=[];
		  		for(var i=0;i<list.length;i++){
		  			this.datalist.push(list[i])
		  		}
	  		}
	  	}).catch((error)=>{
	  		console.log(error)
	  	})
  	},
  	//点击页码跳转
  	pageData(n){
  		if(this.num!=n){
  			this.num=n;
  			this.getData()
  		}
  	},
  	//前一页
  	prev(){
  		if(this.num==1){
  			this.disabled=true
  		}else{
  			this.num=this.num-1
  			this.disabled=false
  			this.getData()
  		}
  	},
  	//后一页
  	next(){
  		if(this.num==this.pages){
  			this.disabled=true
  		}else{
  			this.num=this.num+1
  			this.disabled=false
  			this.getData()
  		}
  	},
  	//当前页页码
  	now(n){
  		if(this.num==n){
  			return "nowpage"
  		}else{
  			return ""
  		}
  	},
  	//点击姓名查看详情
  	goDetail(id){
  		if(sessionStorage.getItem("roleFirst")){
	  		var roleFirst=JSON.parse(sessionStorage.getItem("roleFirst"));
	  		if(roleFirst.role==1||roleFirst.role==0){
	  			this.$router.push({name:'RankDetail',params:{id:id}})
	  		}else{
	  			this.popupVisible=true;
					var interval = window.setTimeout(()=>{
	        	this.popupVisible=false;
	        }, 1000);
	  		}
	  	}else{
	  		this.popupVisible=true;
	  		var interval = window.setTimeout(()=>{
        	this.popupVisible=false;
        }, 1000);
	  	}
  	},
  	//请求英雄帖数据
  	getHero(){
  		var token;
	  	if(sessionStorage.getItem("loginMsg")){
	  		token=JSON.parse(sessionStorage.getItem("loginMsg")).token
	  	}else{
	  		token=""
	  	}
	  	this.$axios({
	  		method:"post",
	  		url:"/wxsoft/heroPost",
	  		params:{
	  			token:token
	  		}
	  	}).then((res)=>{
	  		if(res.data.status==200){
	  			var list2=res.data.data
		  		for(var i=0;i<list2.length;i++){
		  			this.datalist2.push(list2[i])
		  		}
	  		}
	  	}).catch((error)=>{
	  		console.log(error)
	  	})
	  },
  	//查看题目详情
  	heroDetail(heroid){
  		this.$router.push({name:'HeroDetail',params:{heroid:heroid}})
  	},
  	//判断是否已经报名
  	signed(join){
  		if(join==1){
  			//只要有出现报名的情况，则报名按钮都禁用
  			this.disabled1=true;
  			return true;
  		}else{
  			return false;
  		}
  	},
  	//报名
  	sign(id){
  		if(sessionStorage.getItem("loginMsg")){
  			var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
  			this.$axios({
  				method:"post",
  				url:"/wxsoft/joinHeroPost",
  				params:{
  					hero_post_id:id,
  					token:token
  				}
  			}).then((res)=>{
  				if(res.data.status==200){
  					this.popupVisible1=true;
						var interval = window.setTimeout(()=>{
		        	this.popupVisible1=false;
		        }, 1000);
		        window.location.reload();
		        this.exchange2();
  				}
  			}).catch((error)=>{
  				console.log(error)
  			})
  		}else{
  			MessageBox.confirm('', {
		        message: '登录后才可报名',
		        title: '提示',
		        confirmButtonText: '登录',
		        cancelButtonText: '取消'
		    }).then(action => {
		        if (action == 'confirm') {
		            this.$router.push("/login")
		        }
		    }).catch(err => {
		    	
		    });
  		}
  	},
  	//已报名时
  	cannot(){
  		this.popupVisible2=true;
				var interval = window.setTimeout(()=>{
	    	this.popupVisible2=false;
	    }, 1000);
  	}
  },
  mounted(){
  	if(this.msg=="tab1"){
  		this.exchange1();
  	}else if(this.msg=="tab2"){
  		this.exchange2();
  	}
  	this.getData();
  	this.getHero();
  },
  created(){
  	if(sessionStorage.getItem("loginMsg")){
  		var loginMsg=JSON.parse(sessionStorage.getItem("loginMsg"));
  		this.ifUser=true;
  		this.username=loginMsg.name
  	}
  },
  computed:{

  }
}
</script>

<style scoped="scoped" lang="scss">
	#home{
		width: 100%;
		height: 100%;
		//background: url("/static/img/wxbg2.jpg") no-repeat center center;
		//background-attachment: fixed;
		//background-size: cover;
		.mint-popup{
			background: rgba(240,240,240,0.8);
			color: #029CE2;
			line-height: 2.5;
			width: 100%;
			text-align: center;
			font-size: 0.8rem;
		}
		h1{
			text-align: center;
			font-size: 1rem;
			margin-top: 1.2rem;
			color: #333;
		}
		p{
			width: 16.65rem;
			margin: 0 auto;
			font-size: 0.4rem;
			margin-top: 0.5rem;
			color: #333;
			height: 1rem;
			line-height: 1rem;
			i{
				color: #131313;
			}
			span{
				float: right;
				line-height: 1.2rem;
				b{
					display: inline-block;
					width: 0.5rem;
					height: 0.5rem;
					margin-left: 0.3rem;
					margin-right: 0.1rem;
				}
				.male{
					background: rgba(70,198,245,0.5);
				}
				.female{
					background: rgba(255,68,86,0.2);
				}
			}
		}
		//排行榜
		.ranking{
			width: 18rem;
			margin: 0 auto;
			height: 22rem;
			margin-top: 0.3rem;
			li{
				height: 1.97rem;
				border-bottom: 1px solid #fefefe;
				font-size: 0.7rem;
				line-height: 1.97rem;
				color: #666;
				background-color: rgba(70,198,245,0.5);
				span{
					display: inline-block;
					text-align: center;
				}
				.rank{
					width: 1.9rem;
					height: 1.92rem;
					background: #f5f5f5;
				}
				.name{
					width: 4.2rem;
				}
				.major{
					width: 4.8rem;
				}
				.solved{
					width: 3.2rem;
				}
				.acrate{
					width: 3.1rem;
				}
			}
			.rankHead{
				background: #333;
				color: #fefefe;
				.rank{
					background: #333;
				}
			}
			.girl{
				background-color: rgba(255,68,86,0.2);
				.rank{
					color: #666;
				}
			}
		}
		.tip{
			margin-top: 0rem;
			font-size: 0.3rem;
			color: #333;
		}
		//分页器
		.pagination{
			margin-top: 0.4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			span{
				font-size:0.8rem;
				display: block;
				color: #666;
				margin: 0 0.25rem;
			}
			.nowpage{
				color: #03A9F4;
			}
		}
		//英雄帖
		.hero{
			height: auto;
			margin-top: 0.5rem;
			margin-bottom: 2px;
			.question{
				padding: 0.5rem 0.8rem;
				border-top: 1px solid #bdbdbd;
				&:last-child{
					border-bottom: 1px solid #bdbdbd;
				}
				h3{
					font-size: 0.9rem;
					color: #333;
					font-weight: normal;
				}
				.questionM{
					font-size: 0.8rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					span{
						display: block;
						margin-top: 0.5rem;
					}
					.view{
						width: 7rem;
					}
					.join{
						width: 2.5rem;
						height: 1.2rem;
						button{
							background: #029CE2;
							color: #fefefe;
							border: none;
							border-radius: 1rem;
							font-size: 0.6rem;
							width: 100%;
							height: 100%;
							&:disabled{
								background: #ccc;
							}
						}
					}
				}
			}
		}
	}
</style>
