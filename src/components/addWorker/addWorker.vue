<style scoped>


</style>


<template lang="html">
	<div class="addWorker">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>分诊台</span>/新建医生
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="addWorker">保存</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
			<middleLine height='13.4'></middleLine>
		</div>

	     <div class="container info">
     			<h3>基础信息</h3>
	     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="testDB">
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">账号</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.id" required name="id" class="form-control" v-on:blur="verifyID"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">姓名</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.name" required name="name" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">职称</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.title" required name="title" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">科室</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.department" required name="department" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">简介</label>
	     		      <div class="input-bar">
	     		      	<textarea v-model="form.descText" required name="descText" class="form-control"></textarea>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">头像</label>
	     		      <div class="input-bar">
	     		      <!-- todo 上传 功能 -->
	     		      	<input type="file" id="uploadImg">
	     		      	上传
	     		      </div>
	     		    </validate>
	     		    <h3>账号信息</h3>
	     		    <div class="form-group flex-container">
	     		    	<label  class="control-label">账号</label>
	     		    	<div class="input-bar">
		     		    	<input  type="radio" checked  required name="user" class="not-allowed" />（和基础信息账号名一样）
	     		    	</div>
	     		    </div>
	     		    <div class="form-group flex-container">
	     		    	<label  class="control-label">密码</label>
	     		    	<div class="input-bar">
	     		    		<input v-model="form.password"   required name="user" class="form-control" />
	     		    	</div>
	     		    </div>
	     		  </vue-form>
	     	<modal v-if="modal.modalShow" @close="modal.modalShow = false">
	     		<p slot='body'>{{modal.modalContent}}</p>
	     	</modal>
	     </div>
	</div>
</template>
<script >
    import Vue from 'vue'
    import middleLine from '../../common/middleLine/middleLine'
    import VueForm from 'vue-form'
    import modal from '../../common/modal/modal'
    Vue.use(VueForm)
	export default {
		name: 'addWorker',
		data() {
			return {
				name: 'file',
				formstate: {
				},
				form: {
					id: '',
					name: '',
					title: '',
					department: '',
					descText: '',
					user: '',
                    password: '123456',
                    headPic: '',
                    verifyIDFlag: false
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			stationID() {
				return this.$route.query.stationID;
			},
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			}
		},
		components: {
			middleLine,
			modal
		},
		created() {
			this._init()
		},
		mounted() {
			console.log(this.$route.name, this.$route, this.$route.query)
		},
		watch: {
			'form.id': function(val, oldval) {
                this.form.verifyIDFlag = true;
			}
		},
		methods: {
			_init() {
			},
			addWorker() {
				if (this.formstate.$invalid) {
					this.modal.modalShow = true;
					this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.name;
					this.axios.post(this.serverUrl, {
						action: 'add',
						stationID: this.stationID,
						id: this.form.id,
						name: this.form.name,
						title: this.form.title,
						department: this.form.department,
						descText: this.form.descText,
						user: this.form.user,
	                    password: this.form.password,
	                    // headPic: this.form.headPic
	                    headPic: 'www.baidu.com'
					}).then((res) => {
                       console.log(res)
                       this.modal.modalShow = true;
                       this.modal.modalContent = '保存成功';
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			},
			// todo 上传做了一半
			// upload() {
   //              console.log('upload')
   //              let uploadImg = document.getElementById('uploadImg')
   //              let formData = new FormData();
			// 	formData.append('file', uploadImg.files[0])
			// 	// formData.append('type', 'normal')
			// 	let request = new XMLHttpRequest();
			// 	request.open('POST', 'http://192.168.17.187/hqueue/manager/upload');
			// 	request.onreadystatechange = function(response) {
   //                console.log('request', request)
   //                console.log('response', response)
   //                // if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
   //                //       console.log(request.responseText);
   //                //     if (JSON.parse(request.responseText).result !== 0) {
   //                //       console.log('failed')
   //                //     } else {
   //                //       console.log('success')
   //                //     }
   //                // } else if (request.status !== 200 && request.responseText) {
   //                //     console.log('2 failed')
   //                // }
			// 	};
			// 	request.send(formData);
			// },
			verifyID() {
				if (!this.form.verifyIDFlag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'checkID',
					stationID: this.stationID,
					id: this.form.id
				}).then((res) => {
					console.log(res)
					if (res.conflict === 0) {
                        this.form.verifyIDFlag = false;
					} else if (res.conflict === 1) {
						this.form.verifyIDFlag = false;
	                    this.modal.modalShow = true;
	                    this.modal.modalContent = '该账号已被占用';
					}
				}, (res) => {
				})
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.go(-1)
			}
		}
	}
</script>

