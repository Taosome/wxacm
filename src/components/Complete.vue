<template>
	<div id="complete">
		<!--学院选择弹出层-->
		<div class="outer" v-if="chooseCollege">
			<div class="colleges">
				<mt-radio 
				  v-model="college"
				  :options="options"
				  @change="collChange">
				</mt-radio>
			</div>
		</div>
		<!--实验室选择弹出层-->
		<div class="outer" v-if="chooseLab">
			<div class="labs">
				<mt-radio 
				  v-model="lab"
				  :options="options1"
				  @change="labChange">
				</mt-radio>
			</div>
		</div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  请先登录
		</mt-popup>
		<mt-popup
		  v-model="popupVisible2"
		  
		  popup-transition="popup-fade">
		  信息上传成功
		</mt-popup>
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>信息完善</h2>
		</div>
		<div style="height: 2.2rem;"></div>
		<p><span>提示</span>请认真填写你的个人资料！</p>
		<div class="msg">
			<span>姓名</span>
			<input type="text" v-model="name"/>
		</div>
		<div class="msg">
			<span>学号</span>
			<input type="text" v-model="stu_id"/>
		</div>
		<div class="msg">
			<span>学院</span>
			<input type="text" v-model="college" @focus="showCollege"/>
			<i class="iconfont icon-jiantou"></i>
		</div>
		<div class="msg">
			<span>班级</span>
			<input type="text" v-model="major_class" placeholder="如：电子1303"/>
		</div>
		<div class="msg">
			<span>入学年份</span>
			<input type="number" v-model="admission_year" placeholder="如：2014"/>
		</div>
		<div class="msg">
			<span>电话</span>
			<input type="text" v-model="phone_number" placeholder="手机号码（不会公开）"/>
		</div>
		<div class="msg">
			<span>QQ</span>
			<input type="text" v-model="qq_number" placeholder="QQ号码（不会公开）"/>
		</div>
		<div class="msg">
			<span>邮箱</span>
			<input type="text" v-model="email" placeholder="邮箱（不会公开）"/>
		</div>
		<div class="msg">
			<span>实验室</span>
			<input type="text" v-model="labw" @focus="showLab"/>
			<i class="iconfont icon-jiantou"></i>
		</div>
		<mt-radio 
		  v-model="gender"
		  :options="[{label:'男',value:'1'}, {label:'女',value:'0'}]">
		</mt-radio>
		<button @click="save">提交保存</button>
	</div>
</template>

<script>
	export default{
		name:"Complete",
		data(){
			return{
				popupVisible:false,
				popupVisible2:false,
				name:"",
				stu_id:"",
				college:"",
				major_class:"",
				admission_year:"",
				phone_number:"",
				qq_number:"",
				email:"",
				gender:"1",
				lab:"0",
				options:[],
				chooseCollege:false,
				options1:[
					{
		            label:'暂未加入实验室',  
		            value:"0"
		            },
		            {  
		            label:'软件开发实验室',  
		            value:"1" 
		            },
		            {  
		            label:'ACM实验室',  
		            value:"2"
		            }
	            ],  
				chooseLab:false
			}
		},
		methods:{
			back(){
				this.$emit("backhero","tab2")
				this.$router.go(-1)
			},
			save(){
				var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
				this.$axios({
					method:"post",
					url:"/wxuser/fillUserInfo",
					params:{token:token},
					data:{
						name:this.name,
						stu_id:this.stu_id,
						admission_year:this.admission_year,
						college:this.college,
						major_class:this.major_class,
						gender:this.gender,
						phone_number:this.phone_number,
						qq_number:this.qq_number,
						email:this.email,
						lab:this.lab
					}
				}).then((res)=>{
					if(res.data.status==200){
						this.popupVisible2=true;
						var interval = window.setTimeout(()=>{
				        	this.$router.push("/self")
				        }, 1000);
					}
				}).catch((error)=>{
					console.log(error)
				})
			},
			//学院变化
			collChange(){
				this.$nextTick(()=>{
					console.log(this.college);
					this.chooseCollege=false;
				})
			},
			//显示学院
			showCollege(){
				this.chooseCollege=true;
			},
			//实验室变化
			labChange(){
				this.$nextTick(()=>{
					console.log(this.lab);
					this.chooseLab=false;
				})
			},
			//显示实验室
			showLab(){
				this.chooseLab=true;
			}
		},
		mounted(){
			this.$axios({
				method:"get",
				url:"/wxuser/collegeList"
			}).then((res)=>{
				if(res.data.status==200){
					var sdata=res.data.data;
					for(var i=0;i<sdata.length;i++){
						this.options.push(sdata[i].college)
					}
				}
			}).catch((error)=>{
				
			})
		},
		created(){
			if(sessionStorage.getItem("loginMsg")){
				var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
		  		this.$axios({
		  			method:"get",
		  			url:"/wxuser/getUserInfo",
		  			params:{token:token}
		  		}).then((res)=>{
		  			if(res.data.status==200){
		  				var sdata=res.data.data;
		  				this.name=sdata.name;
		  				this.stu_id=sdata.stu_id;
		  				this.college=sdata.college;
		  				this.major_class=sdata.major_class;
		  				this.admission_year=sdata.admission_year;
		  				this.phone_number=sdata.phone_number;
		  				this.qq_number=sdata.qq_number;
		  				this.email=sdata.email;
		  				this.lab=sdata.lab.toString();
		  				this.gender=sdata.gender.toString();
		  			}
		  		}).catch((error)=>{
		  			
		  		})
			}else{
				this.popupVisible=true;
				var interval = window.setTimeout(()=>{
		        	this.$router.push("/self")
		        }, 1000);
			}
		},
		computed:{
			labw(){
				if(this.lab=="0"){
					return "暂未加入实验室"
				}else if(this.lab=="1"){
					return "软件开发实验室"
				}else{
					return "ACM实验室"
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#complete{
		width: 100%;
		height: 100%;
		//background: url("/static/img/wxbg7.jpg") no-repeat center center;
		//background-attachment: fixed;
		//background-size: cover;
	}
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
		background: #f0f0f0;
		height:2.2rem;
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
			line-height: 2.2rem;
		}
	}
	p{
		margin-top: 1rem;
		font-size: 0.8rem;
		padding: 0 1.3rem;
		span{
			color: #fefefe;
			background: #029ce2;
			display: inline-block;
			padding: 0.1rem 0.2rem;
			border-radius: 0.2rem;
		}
	}
	.msg{
		width: 16rem;
		margin: 0 auto;
		margin-top: 0.8rem;
		overflow: hidden;
		position: relative;
		span{
			display: block;
			height: 1rem;
			width: 3rem;
			color: #333;
			padding: 0.2rem 0;
			font-size: 0.7rem;
			line-height: 1rem;
		}
		//输入框
		input{
			width: 100%;
			height: 2rem;
			border: 1px solid #ccc;
			border-radius: 0.1rem;
			font-size: 0.6rem;
			padding-left: 0.5rem;
			color: #333;
			background: none;
		}
		i{
			position: absolute;
			right: 0.2rem;
			top:2rem;
			color: #666;
		}
	}
	//单选组
	.mint-radiolist{
		display: flex;
		background: none;
	}
	button{
		display: block;
		width: 16rem;
		height: 1.8rem;
		border: none;
		background: #03a9f4;
		margin: 0 auto;
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
		color: #fefefe;
		border-radius:0.2rem;
	}
	//学院选择弹出层
	.outer{
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(56,55,81,0.5);
		z-index: 999;
		.colleges{
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
	}
	//实验室选择弹出层
	.outer{
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
	}
</style>