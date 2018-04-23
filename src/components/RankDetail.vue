<template>
	<div id="rankDetail">
		
	</div>
</template>

<script>
	export default {
		name:"RankDefault",
		data(){
			return{
				name:""
			}
		},
		mounted(){
			this.name==this.$route.params.id;
			this.$axios({
				method:"get",
				url:"/get_user_info",
				params:{
					username:name
				}
			}).then((res)=>{
				console.log(res)
			}).catch((error)=>{
				console.log(error)
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">

</style>