<template>
	<div class="sendphoto">
	    <div class="vue-uploader">
	        <div class="file-list">
	            <section v-for="(file, index) of files" class="file-item draggable-item">
	                <img :src="file.src" alt="" ondragstart="return false;">
	                <span class="file-remove" @click="remove(index)">+</span>
	            </section>
	            <section class="file-item" v-show="isShow">
	                <div @click="add" class="add">
	                    <span>+</span>
	                </div>
	            </section>
	        </div>
	        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
	    </div>
	    <div class="sendphoto_submit">
	    	<span v-if="status == 'ready'" @click="submit">上传</span>
	    	<!--loading-->
	         <mt-spinner type="triple-bounce" v-show="loading"></mt-spinner>
   		</div>
	   	<div class="err_num" v-show="errbox">请上传截图</div>
	</div>
</template>
<script>
	import { Spinner } from 'mint-ui';
    export default {
        components:{
        	Spinner
        },
        data() {
            return {
                status: 'ready',
                files: [],
                point: {},
                percent: 0,
                isShow:true,
                loading:false,
                errbox:false
            }
        },
        methods: {


            add() {
                this.$refs.file.click()
            },
            submit() {
            	//判断是否上传
                if (this.files.length === 0) {
                    console.warn('no file!');
                    this.errbox = true
                    var that = this;
						 clearInterval(timer)
						var timer = setInterval(function(){
							that.errbox =false;
						},3000)
						clearInterval();
                    return
                }else{
                const formData = new FormData()
                this.files.forEach((item) => {
                    formData.append(item.name, item.file)
                })
                this.files.forEach(function(i,index,arr){
//                  console.log(i.src)
                })
//点击上传按钮， 请求将图片传递给后端，   后期该接口的话 传递值再做改变
			this.status = 'load'
			this.loading = true;
			
                this.$http({
						method:'POST',
						url:"http://192.168.2.112:8099/user/test",
						headers: {
   							 "content-type": "application/json"
						 },
						responseType:'text/plain',
						 data:this.files
					}).then((response)=>{
						console.log(response.status)
						if (response.status == 200) {
							this.loading = false;
							this.$router.push('/makemoney/jisu/fromRegister/formMessionList/sendPhoto/applyRecord')
						}
                		
						
					})

          }      
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1)
            },
            fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
              return this.files.find((item) => item.name === file.name && item.size === file.size)
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        },
        updated(){
        	if(this.files.length<3){
        		this.isShow = true;
        	}else{       		
        		this.isShow = false;
        	}
        }
    }
</script>
<style scoped lang="scss">
.sendphoto{
		width: 100%;
		height: 100%;
		background: #f1f1f1;
 	 	.sendphoto_submit{
 	 		width: 100%;
 	 		height: 2.21rem;
 	 		padding: 0 0.62rem;
 	 		span{
 	 			display: block;
 	 			width: 100%;
 	 			height: 100%;
 	 			background: #f94b4b;
 	 			text-align: center;
 	 			line-height: 2.21rem;
 	 			border-radius: 5px;
 	 			color: #ffffff;
 	 		}
 	 	}
	}
.vue-uploader {
	width: 95%;
	background: #ffffff;
	margin: 0 auto;
    border: 1px solid #e5e5e5;
}
.vue-uploader .file-list {
    padding: 10px 0px;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    position: relative;
    width: 100px;
    text-align: center;
}
.vue-uploader .file-list .file-item img{
    width: 80px;
    height: 80px;
    border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 12px;
    display: none;
    top: 4px;
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: 40px;
    word-break: break-all;
    font-size: 0.56rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.vue-uploader .add {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    border: 1px dashed #ececec;
    font-size: 30px;
    cursor: pointer;
}
.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center; 
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}
.err_num{
	  position: absolute;
	  top: 9rem;
	  left: 7rem;
	  height: 3.3375rem;
	  line-height: 3.3375rem;
	  text-align: center;
	  font-size: 0.3rem;
	  border-radius: .4125rem;
	  width: 9.5625rem;
	  background: rgba(0, 0, 0, .8);
	  color: #ffffff;
	  
  }
</style>