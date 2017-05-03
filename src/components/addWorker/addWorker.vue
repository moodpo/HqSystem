<style scoped>
.input-bar {
	margin-left: 15px;
}

</style>
<template lang="html">
	<div class="addWorker">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>分诊台</span>/{{stationName}}/添加医生
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="invokeAddWorker">保存</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
			
		</div>
		<middleLine height='8' class="middleline-topbar"></middleLine>
	     <div class="container info">
     			<h3>基础信息</h3>
	     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="addWorker" >

	     			<div class="form-flex-container">
	     				<validate  class="form-item form-group flex-container">
		     		      <label  class="control-label">编号</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.id" required name="id" class="form-control" :class="[fieldClassName(formstate.id)]" v-on:blur="verifyID"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-item form-group flex-container">
		     		      <label  class="control-label">姓名</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.name" required name="name" class="form-control" :class="[fieldClassName(formstate.name)]"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-item form-group flex-container">
		     		      <label  class="control-label">职称</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.title" required name="title" class="form-control" :class="[fieldClassName(formstate.title)]"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-item form-group flex-container">
		     		      <label  class="control-label">科室</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.department" required name="department" class="form-control" :class="[fieldClassName(formstate.department)]"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-item form-group flex-container">
		     		      <label  class="control-label">简介</label>
		     		      <div class="input-bar">
		     		      	<textarea v-model="form.descText"  name="descText" class="form-control"></textarea>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-item form-group flex-container">
		     		      <label  class="control-label">头像</label>
		     		      <div class="input-bar">
	     		      <!-- todo 上传 功能 -->
	     		      	<!-- <input type="url" id="" class="form-control" v-model="form.headPic"> -->
	     		      	<input type="file" id="uploadImg">
	     		      	<button @click.prevent.stop="upload">upload</button>
	     		      </div>
		     		    </validate>
	     			</div>

	     		    <h3>账号信息</h3>
	     		    <div class="form-group flex-container">
	     		    	<label  class="control-label">账号</label>
	     		    	<div class="input-bar">
	     		    	&nbsp;&nbsp;
		     		    	<input  type="radio" checked   name="user" class="not-allowed" />&nbsp;&nbsp;{{form.id}}（和基础信息编号一样）
	     		    	</div>
	     		    </div>
	     		    <div class="form-group flex-container">
	     		    	<label  class="control-label">密码</label>
	     		    	<div class="input-bar">
	     		    		<input v-model="form.password"   required name="password" class="form-control" :class="[fieldClassName(formstate.password)]"/>
	     		    	</div>
	     		    </div>
	     		    <button type="submit" style="display:none" id="btn1">提交</button>
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
    import utils from 'common/utils/utils'
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
                    verifyIDFlag: false,
                    idValid: false
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
			stationName() {
				return this.$route.query.stationName;
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
			invokeAddWorker() {
                document.getElementById('btn1').click()
			},
			addWorker() {
				if (!this.form.idValid) {
					alert('编号只能是数字和字母')
					return;
				}
				if (this.formstate.$invalid) {
					console.log('invalid')
					return;
					// this.modal.modalShow = true;
					// this.modal.modalContent = '请填写完整数据';
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
	                    headPic: this.form.headPic
	                    // headPic: 'www.baidu.com'
					}).then((res) => {
                       alert('保存成功')
                       // 返回上一步
                       this.cancel()
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			},
			// todo 上传做了一半
			upload() {
                console.log('upload')
                let uploadImg = document.getElementById('uploadImg')
                let formData = new FormData();
                // 普通上传
                formData.append('action', 'normal');
				formData.append('file', uploadImg.files[0])
				// formData.append('type', 'normal')
				let request = new XMLHttpRequest();
				request.open('POST', 'http://192.168.17.187/hqueue/manager/upload', true);
				request.onreadystatechange = function(response) {
					if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
						console.log(request.responseText)
						console.log('success')
					} else {
						console.log('failed')
					}
				};
				request.send(formData);
			},
			verifyID() {
				if (this.form.id.length === 0) return
				let reg = /^[A-Za-z0-9]+$/g
				if (!reg.test(this.form.id)) {
                   alert('编号只能是数字和字母')
                   this.form.idValid = false
                   return
				} else {
					this.form.idValid = true
				}
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
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			}
		}
	}
</script>

