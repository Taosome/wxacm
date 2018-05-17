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
		<VueUEditor></VueUEditor>
	</div>
</template>

<script>
	import VueUEditor from 'vue-ueditor'
	export default{
		name:"Proj",
		components:{
			VueUEditor
		},
		data(){
			return{
				popupVisible:false
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
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