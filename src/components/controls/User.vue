<template>
	<div id="user">
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  更改权限成功
		</mt-popup>
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>用户信息</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<div class="filter">
			<input type="text" v-model="name" placeholder="姓名"/>
			<input type="number" v-model="year" placeholder="入学年份"/>
			<button @click="filt">筛选</button>
		</div>
		<p>
	   		<i class="iconfont icon-wodebangzhuzhongxin"></i>
	   		点击姓名查看详细信息
	   		<span><b class="male"></b>男生<b class="female"></b>女生</span>
	   	</p>
	   	<h3 v-if="!living">暂无数据</h3>
		<ul class="userlist" v-if="living">
	   		<li class="listhead">
	   			<span class="number">序号</span>
	   			<span class="name">姓名</span>
	   			<span class="stu_id">学号</span>
	   			<span class="major">班级</span>
	   			<span class="rights">权限</span>
	   		</li>
	   		<li v-for="(info,index) in datalist" :class="info.gender? '':'girl'">
	   			<span class="number">{{info.number}}</span>
	   			<span class="name" @click="goDetail(info.user_id)">{{info.name}}</span>
	   			<span class="stu_id">{{info.stu_id}}</span>
	   			<span class="major">{{info.major_class}}</span>
	   			<span class="rights">
	   				<select v-model="info.role" @change="changeRole($event,info.user_id)" :disabled="banned">
	   					<option value="0">ROOT</option>
	   					<option value="1">Admin</option>
	   					<option value="2">User</option>
	   				</select>
	   			</span>
	   		</li>
	   	</ul>
	   	<div class="pagination" v-if="living">
	   		<i class="iconfont icon-jiantou2" @click="prev" :disabled="disabled"></i>
	   		<span v-for="n in pages" @click="pageData(n)" :class="now(n)">{{n}}</span>
	   		<i class="iconfont icon-jiantou" @click="next"></i>
	   	</div>
	</div>
</template>

<script>
	export default{
		name:"User",
		data(){
			return{
				popupVisible:false,
				name:"",
				year:"",
				datalist:[],
				num:1,
				pages:0,
				disabled:false,
				living:true,
				role:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			//筛选
			filt(){
				this.getData();
			},
			//获取数据
			getData(){
				var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
		  		this.$axios({
			  		method:"get",
			  		url:"/wxuser_admin/showUsers",
			  		params:{
			  			name:this.name,
			  			admission_year:this.year,
			  			token:token,
			  			pageNum:this.num,
			  			pageSize:10
			  		}
			  	}).then((res)=>{
			  		if(res.data.status==200){
				  		var list=res.data.data;
				  		this.pages=list.totalPage
				  		if(list.userSize==0){
				  			this.living=false
				  		}else{
				  			this.living=true
				  		}
				  		this.datalist=[];
				  		for(var i=0;i<list.userList.length;i++){
				  			this.datalist.push(list.userList[i])
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
		  	//查看详情
		  	goDetail(id){
		  		this.$router.push({name:'RankDetail',params:{id:id}})
		  	},
		  	
		  	//修改权限
		  	changeRole(e,id){
		  		var newRole=e.target.value;
		  		var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
		  		this.$axios({
		  			method:"get",
		  			url:"/wxuser_admin/updateUserRole",
		  			params:{
		  				user_id:id,
		  				role:newRole,
		  				token:token
		  			}
		  		}).then((res)=>{
		  			if(res.data.status==200){
		  				this.popupVisible=true;
		  				var interval = window.setTimeout(()=>{
				        	this.popupVisible=false;
				        }, 1000);
		  				this.getData();
		  			}
		  		})
		  	}
		},
		mounted(){
			this.getData();
			this.role=JSON.parse(sessionStorage.getItem("roleFirst")).role
		},
		computed:{
			//是否具备修改权限资格
		  	banned(){
		  		if(this.role==0){
		  			return false;
		  		}else{
		  			return true;
		  		}
		  	}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#user{
		.mint-popup{
			background: rgba(240,240,240,0.8);
			color: #029CE2;
			line-height: 2.5;
			width: 100%;
			text-align: center;
			font-size: 0.8rem;
		}
		.head{
			display: block;
			padding: 0 1rem;
			position: fixed;
			background: #fefefe;
			i{
				position: absolute;
				top: 30%;
				font-size: 1rem;
				color: #029CE2;
				font-weight: bold;
			}
			h2{
				font-size: 0.9rem;
				color: #029CE2;
				font-weight: normal;
				text-align: center;
				line-height: 2.6rem;
			}
		}
		.filter{
			height: 2rem;
			display: flex;
			align-items: center;
			padding: 0 1rem;
			justify-content: flex-end;
			input{
				display: inline-block;
				width: 5rem;
				height: 1.5rem;
				margin-right: 0.4rem;
				border: 1px solid #aaa;
				border-radius: 0.75rem;
				font-size: 0.7rem;
				color: #333;
				padding-left: 0.5rem;
			}
			button{
				display: inline-block;
				width: 3rem;
				height: 1.5rem;
				background: #03A9F4;
				border: none;
				border-radius: 0.75rem;
				font-size: 0.8rem;
				color: #fefefe;
			}
		}
		p{
			width: 18rem;
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
		h3{
			text-align: center;
			margin-top: 2rem;
			font-weight: normal;
			height: 22rem;
			line-height: 18rem;
		}
		.userlist{
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
				.number{
					width: 1.9rem;
					
				}
				.name{
					width: 4.2rem;
				}
				.stu_id{
					width: 4.4rem;
				}
				.major{
					width: 3.4rem;
				}
				.rights{
					width: 3.2rem;
					select{
						width: 3.2rem;
						height: 1rem;
						background: none;
						color: #666;
						border: none;
					}
				}
				//选择弹出层
				/*.outer{
					width: 100%;
					height: 100%;
					position: fixed;
					background: rgba(56,55,81,0.5);
					z-index: 999;
					.labs{
						width: 14rem;
						height: 26rem;
						overflow: auto;
						background: #f0f0f0;
						margin: 0 auto;
						margin-top: 4rem;
						border-radius: 0.2rem;
						.mint-radiolist{
							display: block;
							background: none;
						}
					}
				}*/
			}
			.listhead{
				background: #aaa;
				color: #fefefe;
			}
			.girl{
				background-color: rgba(255,68,86,0.2);
				.rank{
					color: #666;
				}
			}
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
	}
</style>