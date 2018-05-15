<template>
	<div id="heroDetail">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>{{title}}</h2>
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
		<table border="1" cellspacing="0" cellpadding="0" bordercolor="#bdbdbd">
			<tr>
				<td class="left">题目</td>
				<td class="right">{{title}}</td>
			</tr>
			<tr>
				<td class="left">具体要求</td>
				<td class="right">{{content}}</td>
			</tr>
			<tr>
				<td class="left">浏览次数</td>
				<td class="right">{{view}}</td>
			</tr>
			<tr>
				<td class="left">报名人数</td>
				<td class="right">{{join_number}}</td>
			</tr>
			<tr>
				<td class="left">出题人</td>
				<td class="right">{{author}}</td>
			</tr>
			<tr>
				<td class="left">联系QQ</td>
				<td class="right">{{author_qq}}</td>
			</tr>
			<tr>
				<td class="left">出题时间</td>
				<td class="right">{{time}}</td>
			</tr>
		</table>
		<p>示例图片</p>
		<div class="galery" v-for="(info,index) in imgList">
			<img :src="baseUrl+'upload/heropost/'+info.pic_name" />
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		name:"HeroDetail",
		data(){
			return{
				heroID:0,
				title:"",
				content:"",
				view:0,
				join:0,
				signed:0,
				join_number:0,
				author:"",
				author_qq:0,
				time:"",
				lab:"",
				imgList:[],
				baseUrl:"http://cf.swustacm.cn:8080/",
				popupVisible1:false,
				popupVisible2:false
			}
		},
		methods:{
			back(){
				this.$emit("backhero","tab2")
				this.$router.go(-1)
			}
		},
		mounted(){
			this.heroID=this.$route.params.heroid;
			this.$axios({
				method:"get",
				url:"/wxsoft/heroPostInfo",
				params:{hero_post_id:this.heroID}
			}).then((res)=>{
				if(res.data.status==200){
					var sdata=res.data.data;
					this.title=sdata.title;
					this.content=sdata.content;
					this.view=sdata.view;
					this.join_number=sdata.join_number;
					this.author=sdata.author;
					this.author_qq=sdata.author_qq;
					this.time=sdata.time;
					this.lab=sdata.lab;
					var imgs=sdata.pic_list;
					for(var i=0;i<imgs.length;i++){
						this.imgList.push(imgs[i])
					}
				}
			}).catch((error)=>{
				console.log(error)
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#heroDetail{
		height: 100%;
		//background: url("/static/img/wxbg5.jpg") no-repeat;
		//background-size: cover;
		padding-bottom: 0px;
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
		table{
			width: 16.65rem;
			margin: 0 auto;
			height: auto;
			margin-top: 2rem;
			color: #111;
			margin-bottom: 0.5rem;
			background: #fefefe;
			tr{
				td{
					text-align: center;
					padding: 0.5rem 0;
					font-size: 0.75rem;
					line-height: 1.2;
					button{
						width: 80%;
						height: 1.2rem;
						border: none;
						background: rgba(70,198,245,0.8);
						border-radius: 0.2rem;
						color: #fefefe;
					}
				}
				.left{
					width: 5rem;
					background: rgba(70,198,245,0.5);
				}
				.right{
					width: 11.65rem;
				}
			}
		}
		p{
			padding-left: 2rem;
			font-size: 0.8rem;
			color: #333;
			margin-bottom: 1rem;
		}
		.galery{
			width: 16rem;
			overflow: hidden;
			margin: 0 auto;
			text-align: center;
			border: 1px solid #03A9F4;
			margin-bottom: 0.5rem;
			img{
				display: block;
				width: 100%;
				
			}
		}
	}
</style>