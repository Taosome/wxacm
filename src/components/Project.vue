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
		   	<div class="total">
		   		<dl>
		   			<dt><img src="/static/img/jin.png"/></dt>
		   			<dd>{{goldSize}}块</dd>
		   		</dl>
		   		<dl>
		   			<dt><img src="/static/img/yin.png"/></dt>
		   			<dd>{{silverSize}}块</dd>
		   		</dl>
		   		<dl>
		   			<dt><img src="/static/img/tong.png"/></dt>
		   			<dd>{{bronzeSize}}块</dd>
		   		</dl>
		   	</div>
		   	<h3 class="gold">——————金牌——————</h3>
		   	<ul class="awardList">
		   		<li v-for="(item,index) in datalistG">
		   			<img :src="baseUrl+'upload/honor/'+item.picture" />
		   			<p>{{item.contest_name}}<span :class="awards(item.medal)">{{medals(item.medal)}}</span></p>
		   			<p>{{item.team_name}}</p>
		   			<p>{{item.team_member}}</p>
		   		</li>
		   	</ul>
		   	<h3 class="silver">——————银牌——————</h3>
		   	<ul class="awardList">
		   		<li v-for="(item,index) in datalistS">
		   			<img :src="baseUrl+'upload/honor/'+item.picture" />
		   			<p>{{item.contest_name}}<span :class="awards(item.medal)">{{medals(item.medal)}}</span></p>
		   			<p>{{item.team_name}}</p>
		   			<p>{{item.team_member}}</p>
		   		</li>
		   	</ul>
		   	<h3 class="bronze">——————铜牌——————</h3>
		   	<ul class="awardList">
		   		<li v-for="(item,index) in datalistB">
		   			<img :src="baseUrl+'upload/honor/'+item.picture" />
		   			<p>{{item.contest_name}}<span :class="awards(item.medal)">{{medals(item.medal)}}</span></p>
		   			<p>{{item.team_name}}</p>
		   			<p>{{item.team_member}}</p>
		   		</li>
		   	</ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		  	<h2>我们的项目案例</h2>
		   	<ul class="proList">
		   		<li v-for="(item,index) in datalist" @click="toprodetail(item.project_id)">
		   			<img :src="baseUrl+'upload/project/'+item.project_head_pic" />
		   			<p>{{item.project_title}}</p>
		   		</li>
		   	</ul>
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
     choose2:"",
     username:"ACMer",
     baseUrl:"http://cf.swustacm.cn:8080/",
     datalist:[],
     datalistG:[],
     datalistS:[],
     datalistB:[],
     goldSize:0,
     silverSize:0,
     bronzeSize:0
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
  	//奖牌种类
  	medals(medal){
  		if(medal==0){
  			return "金牌"
  		}else if(medal==1){
  			return "银牌"
  		}else if(medal==2){
  			return "铜牌"
  		}
  	},
  	awards(medal){
  		if(medal==0){
  			return "golden"
  		}else if(medal==1){
  			return "silveren"
  		}else if(medal==2){
  			return "bronzen"
  		}
  	},
  	//查看项目详情
  	toprodetail(softid){
  		this.$router.push({name:'SoftDetail',params:{softid:softid}})
  	}
  },
  created(){
  	if(sessionStorage.getItem("loginMsg")){
  		var loginMsg=JSON.parse(sessionStorage.getItem("loginMsg"));
  		this.ifUser=true;
  		this.username=loginMsg.name
  	}
  },
  mounted(){
  	//获取ACM成果
  	this.$axios({
  		method:"get",
  		url:"/wxacm/showAcmHonor"
  	}).then((res)=>{
  		var sdata=res.data.data;
  		this.goldSize=sdata.goldMedalSize;
  		this.silverSize=sdata.silverMedalSize;
  		this.bronzeSize=sdata.bronzeMedalSize;
  		var sdataG=sdata.goldMedalList;
  		var sdataS=sdata.silverMedalList;
  		var sdataB=sdata.bronzeMedalList;
  		for(var i=0;i<sdataG.length;i++){
  			this.datalistG.push(sdataG[i])
  		}
  		for(var i=0;i<sdataS.length;i++){
  			this.datalistS.push(sdataS[i])
  		}
  		for(var i=0;i<sdataB.length;i++){
  			this.datalistB.push(sdataB[i])
  		}
  	})
  	//获取软件开发成果
  	this.$axios({
  		method:"get",
  		url:"/wxsoft/showProjectList"
  	}).then((res)=>{
  		var sdata=res.data.data;
  		for(var i=0;i<sdata.length;i++){
  			this.datalist.push(sdata[i])
  		}
  	})
  },
  computed:{
  	
  }
}
</script>

<style scoped="scoped" lang="scss">
	.mint-tab-container-item{
		background: #f1f1f1;
		.total{
			margin-top: 1rem;
			padding: 0 1.5rem;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			dl{
				width: 2.87rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 6rem;
				dt{
					img{
						width: 100%;
					}
				}
			}
		}
		h3{
			text-align: center;
			font-size: 1rem;
			color: #f3db92;
			margin: 0.6rem 0;
		}
		.silver{
			color: #a9a9a9;
		}
		.bronze{
			color: #dd833c;
		}
		.awardList{
			padding: 0.2rem;
			height: auto;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			li{
				width: 8.9rem;
				margin: 0.1rem;
				margin-bottom: 1rem;
				border: 1px solid #eee;
				text-align: center;
				height: 15rem;
				box-shadow: 3px 3px 8px #999;
				img{
					margin-top: 0.5rem;
					width: 96%;
					height: 9rem;
				}
				p{
					margin-top: 0.5rem;
					font-size: 0.8rem;
					color: #333;
					span{
						display: inline-block;
						width: 2rem;
						height: 1rem;
						border: 2px solid #ccc;
						margin-left: 0.2rem;
						line-height: 1rem;
					}
					.golden{
						color: #f3db92;
						border-color: #f3db92;
					}
					.silveren{
						color: #a9a9a9;
						border-color: #a9a9a9;
					}
					.bronzen{
						color: #dd833c;
						border-color: #dd833c;
					}
				}
			}
		}
		h2{
			text-align: center;
			margin-top: 0.3rem;
			margin-bottom: 0.2rem;
			font-size: 1.2rem;
			color: #666;
		}
		.proList{
			padding: 0.2rem;
			height: auto;
			li{
				width: 8.9rem;
				float: left;
				margin: 0.1rem;
				border: 1px solid #eee;
				text-align: center;
				height: 12rem;
				box-shadow: 3px 3px 8px #999;
				img{
					margin-top: 0.5rem;
					width: 96%;
					height: 9rem;
				}
				p{
					margin-top: 1rem;
					font-size: 0.8rem;
					color: #333;
				}
			}
		}
	}
	
</style>

