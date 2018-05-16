<template>
	<div id="lib">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<div>
		  		<button @click="exchange1" :class="choose">ACM</button>
		  		<button @click="exchange2" :class="choose2">软件开发</button>
		  	</div>
		</div>
		<div style="height: 2.6rem;"></div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  添加成功
		</mt-popup>
		<mt-tab-container v-model="active">
		  <mt-tab-container-item id="tab3">
		  	<div class="aidenty">
			  	<mt-radio 
				  v-model="identy"
				  :options="[{label:'成员',value:'0'},{label:'队长',value:'1'}]">
				</mt-radio>
			</div>
			<div class="anameMonitor">
				<div class="aname">
					<span>姓名</span>
					<input type="text" v-model="acmName"/>
				</div>
				<div class="amonitor" v-if="isMonitor">
					<span>第</span>
					<input type="text" v-model="moniLevel"/>
					<span>任队长</span>
				</div>
			</div>
			<div class="aclass">
				<span>班级</span>
				<input type="text" placeholder="如：电子1303" v-model="aClass"/>
			</div>
			<div class="ayear">
				<span>入学年份</span>
				<input type="text" placeholder="如：2014" v-model="aYear"/>
			</div>
			<div class="afile">
				<span>上传头像</span>
				<input type="file" name="afile" accept="image/png,image/jpg,image/jpeg" ref="file" @change="getFile1($event)" />
			</div>
			<div class="sex">
				<mt-radio 
				  v-model="agender"
				  :options="[{label:'男',value:'1'}, {label:'女',value:'0'}]">
				</mt-radio>
			</div>
			<button class="qrtj" @click="aconfirm">确认添加</button>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab4">
			<div class="part2">   	
			   	<p>姓名</p>
			   	<input type="text" v-model="softName"/>
			   	<div class="master">
			   		<span>是否研究生</span>
			   		<mt-radio 
					  v-model="master"
					  :options="[{label:'是',value:'1'}, {label:'否',value:'0'}]">
					</mt-radio>
			   	</div>
			   	<p>班级</p>
			   	<input type="text" v-model="sClass" placeholder="如：电子2013"/>
			   	<p>入学年份</p>
			   	<input type="text" v-model="sYear" placeholder="如：2014"/>
			   	<p>研究方向</p>
			   	<input type="text" v-model="direction" placeholder="如：前端，后台"/>
			   	<p>编程语言</p>
			   	<input type="text" v-model="lang" placeholder="最多两种，空格隔开"/>
			   	<div class="sfile">
					<span>上传头像</span>
					<input type="file" name="sfile" accept="image/png,image/jpg,image/jpeg" ref="file" @change="getFile2($event)" />
				</div>
				<div class="sex">
					<mt-radio 
					  v-model="sgender"
					  :options="[{label:'男',value:'1'}, {label:'女',value:'0'}]">
					</mt-radio>
				</div>
				<button class="qrtj" @click="sconfirm">确认添加</button>
			</div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	export default{
		name:"Lib",
		data(){
			return{
				active:"tab3",
			    choose:"curr",
			    choose2:"",
			    popupVisible:false,
			    identy:"0",
			    acmName:"",
			    moniLevel:"",
			    aClass:"",
			    agender:"1",
			    aYear:"",
			    softName:"",
			    master:"1",
			    sClass:"",
			    sYear:"",
			    direction:"",
			    lang:"",
			    sgender:"1",
			    afiles:"",
			    sfiles:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			exchange1(){
		  		this.active="tab3"
		  		this.choose="curr",
		      	this.choose2=""
		  	},
		  	exchange2(){
		  		this.active="tab4"
		  		this.choose2="curr",
		      	this.choose=""
		  	},
		  	//acm头像改变
		  	getFile1(e){
		  		this.afiles=e.target.files[0];
		  	},
		  	//添加acm
		  	aconfirm(){
		  		var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
		  		if(this.identy==0){
		  			this.moniLevel=0
		  		}
				let formData = new FormData();
	            formData.append('name',this.acmName);
	            formData.append('admission_year',this.aYear);
	            formData.append('role',this.moniLevel);
	            formData.append('major_class',this.aClass);
	            formData.append('gender',Number(this.agender));
	            formData.append('file',this.afiles);
                this.$axios({
                	method:"post",
                	url:"/wxacm_admin/addAcmMember",
                	headers:{
                		 'Content-Type': 'multipart/form-data'
                	},
                	data:formData,
                	params:{
                		token:token
                	}
                }).then((res)=>{
                	this.popupVisible=true;
					var interval = window.setTimeout(()=>{
			        	this.popupVisible=false;
			        	Object.assign(this.$data, this.$options.data())
			        }, 1000);
                })
		  	},
		  	//soft头像改变
		  	getFile2(e){
		  		this.sfiles=e.target.files[0];
		  	},
		  	//添加soft
		  	sconfirm(){
		  		var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
				let formData = new FormData();
	            formData.append('name',this.softName);
	            formData.append('admission_year',this.sYear);
	            formData.append('study_direction',this.direction);
	            formData.append('programing_language',this.lang);
	            formData.append('master',this.master);
	            formData.append('major_class',this.sClass);
	            formData.append('gender',Number(this.sgender));
	            formData.append('file',this.sfiles);
                this.$axios({
                	method:"post",
                	url:"/wxsoft_admin/addSoftMember",
                	headers:{
                		 'Content-Type': 'multipart/form-data'
                	},
                	data:formData,
                	params:{
                		token:token
                	}
                }).then((res)=>{
                	this.popupVisible=true;
					var interval = window.setTimeout(()=>{
			        	this.popupVisible=false;
			        	Object.assign(this.$data, this.$options.data())
			        }, 1000);
                })
		  	}
		},
		computed:{
			isMonitor(){
				if(this.identy==0){
					return false;
				}else{
					return true;
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#lib{
		.mint-popup{
			background: rgba(240,240,240,0.8);
			color: #029CE2;
			line-height: 2.5;
			width: 100%;
			text-align: center;
			font-size: 0.8rem;
		}
		//acm样式
		.aidenty{
			border-bottom: 1px solid #f1f1f1;
			padding:0 3rem;
			.mint-radiolist{
				display: flex;
				justify-content:center;
				background: none;
			}
		}
		.anameMonitor{
			display: flex;
			margin-top: 1.4rem;
			padding: 0 0.5rem;
			.aname{
				display: flex;
				align-items:center;
				span{
					width: 2rem;
				}
				input{
					display: block;
					font-size: 0.8rem;
					height: 1.6rem;
					margin-left: 0.5rem;
					width: 8rem;
					padding-left: 0.2rem;
				}
			}
			.amonitor{
				display: flex;
				margin-left: 1rem;
				align-items:center;
				input{
					display: block;
					font-size: 0.8rem;
					height: 1.6rem;
					width: 1.6rem;
					padding-left: 0.2rem;
				}
			}
		}
		.aclass{
			display: flex;
			margin-top: 1.4rem;
			padding: 0 0.5rem;
			align-items: center;
			input{
				display: block;
				font-size: 0.8rem;
				height: 1.6rem;
				margin-left: 0.5rem;
				padding-left: 0.2rem;
				width: 15rem;
			}
		}
		.ayear{
			@extend .aclass;
			input{
				width: 13rem;
			}
		}
		.afile{
			display: flex;
			margin-top: 1.4rem;
			padding: 0 0.5rem;
			align-items: center;
			span{
				display: block;
				width: 4rem;
			}
			input{
				margin-left: 0.5rem;
				width: 13rem;
				font-size: 0.8rem;
			}
		}
		.qrtj{
			display: block;
			margin: 0 auto;
			margin-top: 1rem;
			width: 18rem;
			height: 2rem;
			border: none;
			background: #029CE2;
			color: #fefefe;
			font-size: 0.8rem;
			border-radius: 0.2rem;
		}
		//软件开发样式
		.part2{
			p{
				margin-top: 0.5rem;
				margin-left: 0.5rem;
				font-size: 0.8rem;
				color: #333;
				.chooseFile{
					display: inline-block;
					width: 14rem;
				}
			}
			input{
				display: block;
				margin: 0 auto;
				margin-top: 0.3rem;
				width: 18rem;
				height: 1.6rem;
				font-size: 0.8rem;
				padding-left: 0.3rem;
			}
			.master{
				width: 18rem;
				margin: 0 auto;
				position: relative;
				span{
					position: absolute;
					font-size: 0.9rem;
					top: 0.7rem;
				}
				.mint-radiolist{
					flex: 1;
					margin-left: 4rem;
					display: flex;
					background: none;
				}
			}
			.sfile{
				@extend .afile;
				margin-top: 0.5rem;
			}
		}
	}
</style>