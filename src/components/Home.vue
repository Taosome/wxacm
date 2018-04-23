<template>
  <div id="home">
  	<div class="head">
  		<button @click="exchange1" :class="choose">ACM</button>
  		<button @click="exchange2" :class="choose2">软件开发</button>
  	</div>
  	<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab1">
		   	<h1>OJ平台排行榜</h1>
		   	<p><i class="iconfont icon-wodebangzhuzhongxin"></i>点击姓名以查看详细信息(需管理员权限)</p>
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
		   			<span class="name" @click="goDetail(info.stu_id)">{{info.name}}</span>
		   			<span class="major">{{info.major_class}}</span>
		   			<span class="solved">{{info.solved}}</span>
		   			<span class="acrate">{{info.acRate}}</span>
		   		</li>
		   	</ul>
		   	<p class="tip">
		   		红色代表软件开发实验室人员，绿色代表ACM实验室人员
		   	</p>
		   	<div class="pagination">
		   		<i class="iconfont icon-jiantou2" @click="prev" :disabled="disabled"></i>
		   		<span v-for="n in pages" @click="pageData(n)">{{n}}</span>
		   		<i class="iconfont icon-jiantou" @click="next"></i>
		   	</div>
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
     num:1,
     pages:0,
     disabled:false
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
  	},
  	//请求排行版数据
  	getData(){
  		this.$axios({
	  		method:"get",
	  		url:"/showFreshmanRank",
	  		params:{
	  			pageNum:this.num,
	  			pageSize:10
	  		}
	  	}).then((res)=>{
	  		var list=res.data.data
	  		this.pages=res.data.totalPage
	  		this.datalist=[];
	  		for(var i=0;i<list.length;i++){
	  			this.datalist.push(list[i])
	  		}
	  		console.log(this.datalist)
	  	}).catch((error)=>{
	  		console.log(error)
	  	})
  	},
  	//点击页码跳转
  	pageData(n){
  		this.num=n;
  		this.getData()
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
  	//点击姓名查看详情
  	goDetail(id){
  		this.$router.push({name:'RankDetail',params:{id:id}})
  	}
  },
  mounted(){
  	this.getData();
  },
  computed:{

  }
}
</script>

<style scoped="scoped" lang="scss">
	#home{
		width: 100%;
		background: url("/static/img/wxbg2.jpg") no-repeat;
		background-size: cover;
		h1{
			text-align: center;
			font-size: 1rem;
			margin-top: 0.5rem;
			color: #eee;
		}
		p{
			width: 16.65rem;
			margin: 0 auto;
			font-size: 0.4rem;
			margin-top: 0.3rem;
			color: #333;
			i{
				color: #131313;
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
				color: #f0f0f0;
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
				background-color: rgba(68,210,151,0.5);
				.rank{
					color: #666;
				}
			}
			.software{
				background-color: rgba(255,68,86,0.5);
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
			margin-top: 0.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			span{
				font-size:0.8rem;
				display: block;
				margin: 0 0.25rem;
			}
		}
	}
</style>
