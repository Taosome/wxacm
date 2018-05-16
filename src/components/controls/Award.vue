<template>
	<div id="award">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>添加ACM获奖记录</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  添加成功
		</mt-popup>
		<p>比赛名称</p>
		<input type="text" placeholder="如ACM/ICPC沈阳赛区、EC Final上海站" v-model="title" name="contest_name"/>
		<p>比赛届数</p>
		<input type="number" placeholder="如36" v-model="numb" name="contest_number"/>
		<p>队名</p>
		<input type="text" placeholder="" v-model="team_name" name="team_name"/>
		<p>队员</p>
		<input type="text" placeholder="用空格隔开" v-model="teamer" name="team_member"/>
		<div class="medals">
			<span>奖牌：</span>
			<mt-radio 
			  v-model="medal"
			  :options="[{label:'金牌',value:'0'},{label:'银牌',value:'1'},{label:'铜牌',value:'2'} ]">
			</mt-radio>
		</div>
		<div class="upfile">
			<span>上传图片</span>
			<input type="file" name="file" accept="image/png,image/jpg,image/jpeg" @change="getFile($event)"/>
		</div>
		<button @click="add">确认添加</button>
	</div>
</template>

<script>
	export default{
		name:"Award",
		data(){
			return{
				popupVisible:false,
				title:"",
				numb:"",
				team_name:"",
				teamer:"",
				medal:"0",
				files:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
//			isContain(file) {
//            return this.files.find((item) => item.name === file.name && item.size === file.size)
//          },
//          // 将图片文件转成BASE64格式
//          html5Reader(file, item){
//              const reader = new FileReader()
//              reader.onload = (e) => {
//                  this.$set(item, 'src', e.target.result)
//              }
//              reader.readAsDataURL(file)
//          },
//			//选择图片
//			fileChanged() {
//              const list = this.$refs.file.files
//              for (let i = 0; i < list.length; i++) {
//                  if (!this.isContain(list[i])) {
//                      const item = {
//                          name: list[i].name,
//                          size: list[i].size,
//                          file: list[i]
//                      }
//                      this.html5Reader(list[i], item)
//                      this.files.push(item)
//                  }
//              }
//              this.$refs.file.value = ''
//          },
			getFile(e){
				this.files=e.target.files[0];
				//console.log(this.files)
			},
            add(){
//          	const formData = new FormData()
//              this.files.forEach((item) => {
//                  formData.append(item.name, item.file)
//              })
				var token=JSON.parse(sessionStorage.getItem("loginMsg")).token;
				let formData = new FormData();
	            formData.append('team_name',this.team_name);
	            formData.append('contest_name',this.title);
	            formData.append('team_member',this.teamer);
	            formData.append('medal',Number(this.medal));
	            formData.append('contest_number',this.numb);
	            formData.append('file',this.files);
                this.$axios({
                	method:"post",
                	url:"/wxacm_admin/addAcmHonor",
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
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#award{
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
		.medals{
			width: 18rem;
			margin: 0 auto;
			margin-top: 0.5rem;
			position: relative;
			span{
				position: absolute;
				font-size: 0.9rem;
				top: 0.7rem;
			}
			.mint-radiolist{
				flex: 1;
				margin-left: 1.5rem;
				display: flex;
				background: none;
			}
		}
		.upfile{
			display: flex;
			margin-top: 0.5rem;
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