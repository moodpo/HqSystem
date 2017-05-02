<template lang="html">
	<div class="addQueue">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>{{stationName}}</span>/新建列队
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="addQueue">保存</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
			<middleLine height='13.4'></middleLine>
		</div>
		<div class="container info">
	     	<div class="baseinfo">
	     		<h3>基础信息</h3>
	     		<vue-form :state="formstate"  class="form-horizontal">
	     			<validate class="form-group flex-container">
	     		      	<label class="control-label">队列名字</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.name" required name="name" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      	<label  class="control-label">队列描述</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.descText" required name="descText" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <div class="form-group flex-container">
	     		      	<label class="control-label">系统拼接队列关键字</label>
	     		      	<div class="input-bar">
	     		      		<select class="btn-select btn btn-default dropdown-toggle" v-model="form.filter">
	     		      			<option v-for="sourceQueue in form.sourceQueueList">{{sourceQueue}}
	     		      			</option>
	     		      		</select>
	     		      	</div>
	     		    </div>
	     		    <middleLine height='6.6'></middleLine>
         		    <h3>策略配置</h3>
         		    <div class="form-group form-flex-container">
	         		    <div class="form-group form-item flex-container" v-for="(sceneSupport, index) in form.sceneSupportList">
		         			<input class="control-label input-btn" type="radio" :id="sceneSupport"  v-model="form.sceneSupportRadio"  :value="sceneSupport.name" >
	         		        <div class="input-bar">&nbsp;{{sceneSupport.name}}</div>
	         		    </div>
         		    </div>
         		    <middleLine height='6.6'></middleLine>
         		    <h3>所属医生</h3>
         		    <div class="form-group form-flex-container footer-space">
	         		    <div class="form-group form-item flex-container" v-for="worker in form.workerList">
		         		    <input class="control-label input-btn" type="checkbox" :id="worker.id" v-model="form.workerListCheckbox"  :value="worker.id" >
	         		        <div  class="input-bar">{{worker.name}}</div>
	         		    </div>
         		    </div>
	     		</vue-form>
	     	</div>
	     	<modal v-if="modal.modalShow" @close="modal.modalShow = false" >
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
		name: 'addQueue',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: '',
					workerList: '',
					workerListCheckbox: [],
					sceneSupportList: '',
					sceneSupportRadio: '',
					sourceQueueList: '',
					filter: '',
					password: '123456'
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
			workerUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			},
			stationName() {
				return this.$route.query.stationName;
			},
			queueInfoUrl() {
				return this.$store.getters.postUrl('manager', 'queueInfo')
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
			console.log(this.$route.name)
		},
		methods: {
			_init() {
				this.getWorkerList()
				this.getSceneSupportList()
				this.getSourceQueueList()
			},
			addQueue() {
				if (this.formstate.$invalid) {
					this.modal.modalShow = true;
					this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.name;
					this.axios.post(this.queueInfoUrl, {
						action: 'add',
						stationID: Number(this.stationID),
						name: this.form.name,
						scene: this.form.sceneSupportRadio,
						descText: this.form.descText,
						// filter: 'queue=\'' + this.form.filter + '\'',
						filter: `queue='${this.form.filter}'`,
						workerLimit: this.form.workerListCheckbox
					}).then((res) => {
                       alert('保存成功')
                       this.cancel()
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			},
			getWorkerList() {
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.form.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
			},
			// 策略列表
			getSceneSupportList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getSceneSupportList',
					stationID: this.stationID
				}).then((res) => {
					this.form.sceneSupportList = res.list;
					// 默认选择第一个
					this.form.sceneSupportRadio = this.form.sceneSupportList[0].name
				}, (res) => {
					console.log('failed')
				})
			},
			getSourceQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getSourceQueueList',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
					this.form.sourceQueueList = res.list;
				}, (res) => {
					console.log('failed ')
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

<style lang="stylus" scoped>
h2
	padding-bottom: 24px
	border-bottom: 1px solid #f1f1f1

h3
	font-size: 20px
	line-height: 60px
	border-bottom: 1px solid #f1f1f1
	margin-bottom: 15px

// 去掉button等默认点击效果
a, button, input, select, select:active, select:visited
	webkit-tap-highlight-color: rgba(0,0,0,0)
	webkit-user-modify: read-write-plaintext-only
	outline: none

.form-group
	margin: 0 

.btn-select
	width: 10em
	margin-left: 15px
	
.input-bar
	line-height: 60px

.footer-space
	margin-bottom: 40.6px

	
</style>