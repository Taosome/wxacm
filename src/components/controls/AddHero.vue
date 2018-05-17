<template>
	<div id="addHero">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>添加英雄帖</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  添加成功
		</mt-popup>
		<p>英雄帖标题</p>
		<input type="text" placeholder="不能超过20字" v-model="title"/>
		<p>英雄贴要求</p>
		<textarea placeholder="题目要求" v-model="req"></textarea>
		<p>示例图片<input type="file" multiple="multiple" class="chooseFile" name="file" accept="image/png,image/jpg,image/jpeg" @change="getFile($event)"/></p>
		<p>出题人</p>
		<input type="text" v-model="author"/>
		<p>出题人QQ</p>
		<input type="text" v-model="qq_num"/>
		<button @click="add">添加题目</button>
	</div>
</template>

<script>
	export default{
		name:"AddHero",
		data(){
			return{
				popupVisible:false,
				title:"",
				req:"",
				author:"",
				qq_num:"",
				files:[],
				fd:new FormData()
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			getFile(e){
				for(var i=0;i<e.target.files.length;i++){
					this.fd.append('file[]',e.target.files[i]);
				}
			},
			add(){
				var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
				let formData = new FormData();
	            this.fd.append('title',this.title);
	            this.fd.append('content',this.req);
	            this.fd.append('author',this.author);
	            this.fd.append('author_qq',this.qq_num);
	            this.fd.append('file',this.files);
	            this.$axios({
	            	method:"post",
	            	url:"/wxsoft_admin/addHeroPost",
	            	headers:{
                		 'Content-Type': 'multipart/form-data'
                	},
                	data:this.fd,
	            	params:{token:token}
	            }).then((res)=>{
	            	console.log(res)
	            	if(res.data.status==200){
	            		this.popupVisible=true;
						var interval = window.setTimeout(()=>{
				        	this.popupVisible=false;
				        	Object.assign(this.$data, this.$options.data())
				        }, 1000);
	            	}
	            })
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#addHero{
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
		.mint-popup{
			background: rgba(240,240,240,0.8);
			color: #029CE2;
			line-height: 2.5;
			width: 100%;
			text-align: center;
			font-size: 0.8rem;
		}
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
		textarea{
			display: block;
			margin: 0 auto;
			margin-top: 0.3rem;
			width: 18rem;
			height: 5rem;
			font-size: 0.8rem;
			padding: 0.3rem;
		}
		button{
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
	}
</style>