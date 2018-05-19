<template>
	<div id="proj">
		<div class="head">
			<i class="iconfont icon-jiantou2" @click="back"></i>
			<h2>添加软件开发成果</h2>
		</div>
		<div style="height: 2.6rem;"></div>
		<mt-popup
		  v-model="popupVisible"
		  
		  popup-transition="popup-fade">
		  添加成功
		</mt-popup>
		<Ue :value="ueditor.value" :config="ueditor.config" ref="ue"></Ue>
		<input type="button" value="显示编辑器内容（从控制台查看）" @click="returnContent">
	</div>
</template>

<script>

	import Ue from '@/components/Ue.vue'
	export default{
		name:"Proj",
		components:{
			Ue
		},
		data(){
			return{
				popupVisible:false,
				content:"",
				ueditor: {
		          	value: '编写项目成果详情',
		          	config: {
		          		initialFrameWidth: null,
         				initialFrameHeight: 300
		          	}
		        },
				editor: null
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			returnContent(){
		        this.content = this.$refs.ue.getUEContent()
		        console.log(this.content)
		    },
		    gettext() {
	                　　	console.log(this.editor.getContent())
	           　　	}
		},
		mounted(){
			
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#proj{
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
	}
</style>