<template>
  <div id="home">
  	<div class="head">
  		<button @click="exchange1" :class="choose">ACM</button>
  		<button @click="exchange2" :class="choose2">软件开发</button>
  	</div>
  	<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab1">
		   	<h1>OJ平台排行榜</h1>
		   	<p><i class="iconfont icon-wodebangzhuzhongxin"></i>点击姓名以查看详细信息</p>
		   	<ul class="ranking">
		   		<li class="rankHead">
		   			<span class="rank">排名</span>
		   			<span class="name">姓名</span>
		   			<span class="major">班级</span>
		   			<span class="solved">AC</span>
		   			<span class="acrate">AC率</span>
		   		</li>
		   		<li v-for="(info,index) in datalist" :class="join(info.lab)">
		   			<span class="rank">{{info.rank}}</span>
		   			<span class="name">{{info.name}}</span>
		   			<span class="major">{{info.major_class}}</span>
		   			<span class="solved">{{info.solved}}</span>
		   			<span class="acrate">{{info.acRate}}</span>
		   		</li>
		   	</ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab2">
		   	<h1>软件开发英雄帖</h1>
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
export default {
  name: 'Home',
  data () {
    return {
     active:"tab1",
     choose:"curr",
     choose2:"",
     datalist:[],
     num:1
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
  	//根据lab确定人员归属团队
  	join(val){
  		if(val=="1"){
  			return "software"
  		}else if(val=="2"){
  			return "acm"
  		}
  	}
  },
  mounted(){
  	this.$axios({
  		method:"get",
  		url:"/showFreshmanRank",
  		params:{
  			pageNum:this.num,
  			pageSize:10
  		}
  	}).then((res)=>{
  		var list=res.data.data
  		
  		this.datalist=[];
  		for(var i=0;i<list.length;i++){
  			this.datalist.push(list[i])
  		}
  		console.log(this.datalist)
  	}).catch((error)=>{
  		console.log(error)
  	})
  }
}
</script>

<style scoped="scoped" lang="scss">
	#home{
		width: 100%;
		h1{
			text-align: center;
			font-size: 1rem;
			margin-top: 0.5rem;
			color: #029ce2;
		}
		p{
			width: 16.65rem;
			margin: 0 auto;
			font-size: 0.4rem;
			margin-top: 0.3rem;
			color: #333;
			i{
				color: #029CE2;
			}
		}
		.ranking{
			width: 16.65rem;
			margin: 0 auto;
			height: 22rem;
			margin-top: 0.5rem;
			li{
				height: 1.97rem;
				border-bottom: 1px solid #d6d6d6;
				font-size: 0.7rem;
				line-height: 1.97rem;
				span{
					display: inline-block;
					text-align: center;
					
				}
				.rank{
					width: 1.9rem;
					height: 1.9rem;
					background: #f5f5f5;
				}
				.name{
					width: 3.85rem;
				}
				.major{
					width: 4.8rem;
				}
				.solved{
					width: 2.5rem;
				}
				.acrate{
					width: 2.82rem;
				}
			}
			.rankHead{
				background: #333;
				color: #fefefe;
				.rank{
					background: #333;
				}
			}
			.acm{
				color: #029ce2;
				.rank{
					color: #666;
				}
			}
			.software{
				color: #ff4456;
				.rank{
					color: #666;
				}
			}
		}
	}
</style>
