<template lang="html">
	<div class="addStation">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>分诊台</span>/新建分诊台
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="addStation">提交</div>
			     	<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
			
		</div>
		<middleLine height='8' class="middleline-topbar"></middleLine>
	    <div class="container info">
	     	<div class="baseinfo">
	     		<h3>基础信息</h3>
	     		<vue-form :state="formstate.form3"  class="form-horizontal" @submit.prevent.stop="testDB">
	     		    <validate  class="form-group flex-container">
	     		    	<label class="control-label">分诊台名称</label>
	     		    	<div class="input-bar">
	     		      		<input v-model="form.name" required name="name"  class="form-control" />
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      	<label  class="control-label">分诊台描述</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.descText" required name="descText"   class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		</vue-form>
	     	</div>
	     	<middleLine height='6.6'></middleLine>
	     	<div class="datainfo">
	     		<h3>数据库信息</h3>
	     		<vue-form :state="formstate.form1"  class="form-horizontal form-flex-container" @submit.prevent.stop="testDB">
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">数据库地址</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.host" required name="host"  :class="[fieldClassName(formstate.form1.host)]" class="form-control" />
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">用户名</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.user" required name="user"  :class="[fieldClassName(formstate.form1.user)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">密码</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.passwd" required name="passwd"  :class="[fieldClassName(formstate.form1.passwd)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">端口</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.port" required name="port"  :class="[fieldClassName(formstate.form1.port)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">字符集</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.charset" required name="charset"  :class="[fieldClassName(formstate.form1.charset)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">数据库名</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.DBName" required name="DBName"  :class="[fieldClassName(formstate.form1.DBName)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">数据库类型</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.DBType" required name="DBType"  :class="[fieldClassName(formstate.form1.DBType)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      	<label  class="control-label">数据库表名</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.tableName" required name="table"  :class="[fieldClassName(formstate.form1.tableName)]" class="form-control"/>
	     		      	</div>
	     		    </validate>
	     		    <button type="submit" class="center-block test-btn">连接测试</button>
	     		  </vue-form>
	     	</div>
	     	<middleLine height='6.6'></middleLine>
	     	<div class="connectinfo">
	     		<h3>SQL连接信息</h3>
	     		<vue-form :state="formstate.form2"   @submit.prevent="testSQL">
		     		<div class="form-horizontal form-flex-container">
			     		<validate class="form-item form-group flex-container">
			     		  	<label  class="control-label">病人编号(ID)</label>
			     		  	<div class="input-bar">
			     		  		<input v-model="form.aliasID" required name="aliasID"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
			     		  	</div>
			     		</validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">病人姓名(Name)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasName" required name="aliasName"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">挂号科室或队列(Queue)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasQueue" required name="aliasQueue"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">挂号类型-预约或门诊(OrderType)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasOrderType" required name="aliasOrderType"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">挂号日期(RegistDate)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasRegistDate" required name="aliasRegistDate"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">挂号时间(RegistTime)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasRegistTime" required name="aliasRegistTime"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">病人描述(DescText)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasDescText" required name="aliasDescText"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">病人年纪(Age)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasAge" required name="aliasAge"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">是否VIP用户(VIP)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasVIP" required name="aliasVIP"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		    <validate class="form-item form-group flex-container">
		     		      	<label  class="control-label">病人状态(Status)</label>
		     		      	<div class="input-bar">
		     		      		<input v-model="form.aliasStatus" required name="aliasStatus"  :class="[fieldClassName(formstate.form2.aliasStatus)]" class="form-control"/>
		     		      	</div>
		     		    </validate>
		     		</div>
	     		    <div class="splite-line "></div>
	     		    <div class="form-horizontal form-flex-container">
	     		    	<validate class="form-item form-group flex-container">
	     		    	  	<label  class="control-label">病人在队列中的序号(Number)</label>
	     		    	  	<div class="input-bar">
	     		    	  		<input v-model="form.aliasSnumber" required name="aliasSnumber"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
	     		    	  	</div>
	     		    	</validate>
	     		    	<validate class="form-item form-group flex-container">
	     		    	  	<label  class="control-label">科室名称(Department)</label>
	     		    	  	<div class="input-bar">
	     		    	  		<input v-model="form.aliasDepartment" required name="aliasDepartment"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
	     		    	  	</div>
	     		    	</validate>
	     		    	<validate class="form-item form-group flex-container">
	     		    	  	<label  class="control-label">预约看病日期(OrderDate)</label>
	     		    	  	<div class="input-bar">
	     		    	  		<input v-model="form.aliasOrderDate" required name="aliasOrderDate"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
	     		    	  	</div>
	     		    	</validate>
	     		    	<validate class="form-item form-group flex-container">
	     		    	  	<label  class="control-label">预约看病时间(OrderTime)</label>
	     		    	  	<div class="input-bar">
	     		    	  		<input v-model="form.aliasOrderTime" required name="aliasOrderTime"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
	     		    	  	</div>
	     		    	</validate>
	     		    	<validate class="form-item form-group flex-container">
	     		    	  	<label  class="control-label">医生编号(WorkerID)</label>
	     		    	  	<div class="input-bar">
	     		    	  		<input v-model="form.aliasWorkerID" required name="aliasWorkerID"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
	     		    	  	</div>
	     		    	</validate>
	     		    	<validate class="form-item form-group flex-container">
	     		    	  	<label  class="control-label">医生姓名(WorkerName)</label>
	     		    	  	<div class="input-bar">
	     		    	  		<input v-model="form.aliasWorkerName" required name="aliasWorkerName"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
	     		    	  	</div>
	     		    	</validate>
	     		    </div>
                    <div class="splite-line "></div>
                    <div class="form-horizontal form-flex-container">
                    	<validate class="form-item form-group flex-container">
                    	  	<label  class="control-label">刷新时间(ms)</label>
                    	  	<div class="input-bar">
                    	  		<input v-model="form.renewPeriod" required name="renewPeriod"  :class="[fieldClassName(formstate.form2.passwd)]" class="form-control"/>
                    	  	</div>
                    	</validate>
                    	<div class="fform-item form-group flex-container">
                    		<label for="" class="control-label">生成SQL语句</label>
                    		<div class="input-bar">
                    			<textarea  :class="{'form-control':formControlObj.formControl}" v-model="form.sqlLang"></textarea>
                    		</div>
                    	</div>
                    </div>
	     		    <button type="submit" class="center-block test-btn">连接测试</button>
	     		 </vue-form>
	     	</div>
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
    import utils from 'common/utils/utils.js'
    Vue.use(VueForm)
	export default {
		name: 'addStation',
		data() {
			return {
				formstate: {
					form1: {},
					form2: {},
					form3: {}
				},
				form: {
					name: 'name',
					descText: 'descText',
					DBType: 'mysql',
					host: '192.168.17.184',
					port: '3306',
					charset: 'utf8',
					user: 'root',
					passwd: '123456',
					DBName: 'HisQueue',
					tableName: 'visitors',
					aliasName: 'name',
					aliasAge: 'age',
					aliasQueue: 'queue',
					aliasID: 'ID',
					aliasOrderDate: 'orderDate',
					aliasOrderTime: 'orderTime',
					aliasRegistDate: 'registDate',
					aliasRegistTime: 'registTime',
					aliasVIP: 'emergency',
					aliasSnumber: 'snumber',
					aliasOrderType: 'orderType',
					aliasWorkerID: 'workerID',
					aliasWorkerName: 'workerName',
					aliasDepartment: 'department',
					aliasDescText: 'descText',
					aliasStatus: 'status',
					renewPeriod: '10',
					sqlLang: ''
				},
				formControlObj: {
					formControl: true,
					form1BtnVal: '',
					form2BtnVal: ''
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'station')
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
			console.log(this.$route.name, this.$route)
		},
		methods: {
			_init() {
				this.formControlObj.form1BtnVal = this.formBtnVal[1]
				this.formControlObj.form2BtnVal = this.formBtnVal[1]
			},
			// 测试工作站数据源
			testDB() {
				if (this.formstate.form1.$invalid) {
					console.log('invalid')
					return
					// // todo 表单需要优化
					// this.modal.modalContent = '请填写完整数据';
					// this.modal.modalShow = true;
				} else {
					this.axios.post(this.serverUrl, {
						action: 'sourceTest',
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						tableName: this.form.tableName
					}).then((res) => {
						if (res.testResult === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form1.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form1BtnVal = this.formBtnVal[0]
						} else {
							this.formstate.form1.linkTest = true;
							this.formControlObj.form1BtnVal = this.formBtnVal[2];
							this.modal.modalContent = '连接成功';
							this.modal.modalShow = true;
						}
					}, (res) => {
						console.log('failed')
					})
				}
			},
			// SQL 连接测试   测试工作站数据源配置
			testSQL() {
				if (!this.formstate.form1.linkTest) {
                   this.modal.modalContent = '请先测试数据库信息';
                   this.modal.modalShow = true;
                   return;
				}
				if (this.formstate.form2.$invalid) {
					this.modal.modalContent = '请填写完整数据';
					this.modal.modalShow = true;
					return;
				} else {
					this.axios.post(this.serverUrl, {
						action: 'sourceConfigTest',
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						tableName: this.form.tableName,
						aliasName: this.form.aliasName,
					    aliasAge: this.form.aliasAge,
					    aliasQueue: this.form.aliasQueue,
					    aliasID: this.form.aliasID,
					    aliasOrderDate: this.form.aliasOrderDate,
					    aliasOrderTime: this.form.aliasOrderTime,
					    aliasRegistDate: this.form.aliasRegistDate,
					    aliasRegistTime: this.form.aliasRegistTime,
					    aliasVIP: this.form.aliasVIP,
					    aliasSnumber: this.form.aliasSnumber,
					    aliasOrderType: this.form.aliasOrderType,
					    aliasWorkerID: this.form.aliasWorkerID,
					    aliasWorkerName: this.form.aliasWorkerName,
					    aliasDepartment: this.form.aliasDepartment,
					    aliasDescText: this.form.aliasDescText,
					    aliasStatus: this.form.aliasStatus,
					    renewPeriod: this.form.renewPeriod
					}).then((res) => {
						if (res.testResult === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form2.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[0]
						} else {
							this.modal.modalContent = '连接成功';
							this.modal.modalShow = true;
							this.form.sqlLang = res.testSql
						}
					}, (res) => {
						console.log('failed')
					})
				}
                console.log('testSQL')
			},
			// 添加工作站
			addStation() {
				console.log('addStation')
				if (!this.formstate.form1.linkTest) {
                   this.modal.modalContent = '请先测试数据库信息';
                   this.modal.modalShow = true;
                   return;
				}
				if (this.formstate.form2.$invalid) {
					this.modal.modalContent = '请填写完整数据';
					this.modal.modalShow = true;
					return;
				} else {
					this.axios.post(this.serverUrl, {
						action: 'add',
						name: this.form.name,
						descText: this.form.descText,
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						tableName: this.form.tableName,
						aliasName: this.form.aliasName,
					    aliasAge: this.form.aliasAge,
					    aliasQueue: this.form.aliasQueue,
					    aliasID: this.form.aliasID,
					    aliasOrderDate: this.form.aliasOrderDate,
					    aliasOrderTime: this.form.aliasOrderTime,
					    aliasRegistDate: this.form.aliasRegistDate,
					    aliasRegistTime: this.form.aliasRegistTime,
					    aliasVIP: this.form.aliasVIP,
					    aliasSnumber: this.form.aliasSnumber,
					    aliasOrderType: this.form.aliasOrderType,
					    aliasWorkerID: this.form.aliasWorkerID,
					    aliasWorkerName: this.form.aliasWorkerName,
					    aliasDepartment: this.form.aliasDepartment,
					    aliasDescText: this.form.aliasDescText,
					    aliasStatus: this.form.aliasStatus,
					    renewPeriod: this.form.renewPeriod
					}).then((res) => {
						console.log(res)
						if (res.testResult === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form2.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
						} else {
							this.$router.push({name: 'stationList'})
							alert('保存成功')
							this.formstate.form2.linkTest = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[2]
						}
					}, (res) => {
						console.log('failed')
					})
				}
                console.log('testSQL')
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.go(-1)
			},
			// 验证是否必填
			fieldClassName(field) {
	           return utils.fieldClassName(field)
			}
		}
	}
</script>

<style lang="stylus" scoped>
h2,h3,ul,label
	margin: 0
	padding: 0

h2
	font-size: 24px


input
	border:0px
	box-shadow: 0 0
	border-bottom: 1px solid #f1f1f1
	font-size: 14px
	padding-bottom: 0

	
// 去掉button等默认点击效果 
a, button, input
	webkit-tap-highlight-color: rgba(0,0,0,0)
	webkit-user-modify: read-write-plaintext-only
	outline: none

.datainfo, connectinfo
	height: auto
.splite-line 
	border-bottom:1px solid #f1f1f1
	margin-top:20px
	
</style>