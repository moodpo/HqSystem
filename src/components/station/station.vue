<style scoped>
.settings {
	text-align: center;
	height:140px;
	position: static;
	line-height: 140px
}
/* .settings>div {
 	position: absolute;
 	color:#fff;
 	display: inline-block;
 	margin-left:20px;
 	margin-right:20px;
 	position: relative;
 	height:58px;
 	width:112px;
    line-height: 58px;
    padding:0;
 }*/
 .station-content {
 	width:100%;
 }
 .station-content .nav-bar {
    width:200px;
    float: left;
    background: #109EFC;
    color:#fff;
    heigth:100%;
    min-height:980px;
    text-align: center;
 }
 .station-content .nav-bar .station-name {
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #FFFFFF;
    border-bottom: 1px solid rgba(241,241,241,.5);
    padding:10px 0;
 }
 .station-content .nav-bar>.tab:hover {
    background: #4DB8FF; 
 }
 .station-content .nav-info {
    margin-left:220px;
 }
 .btn.btn-success{
 		width:150px;
 	    padding:10px 20px;
 	    text-align: center;
 	    margin: 0 auto;
 	    background: -webkit-linear-gradient(left,#0097FB,#00CBFB);
 	    /* todo 渐变色 兼容性问题*/
 	    /*background: -moz-linear-gradient(left,#0097FB,#00CBFB);*/
 	    /*background: -o-linear-gradient(left,#0097FB,#00CBFB);*/
 	    color:#fff;
 	    position: relative;
 	    border:0;
 }
 .nav-info-content {
 	 padding:37px 35px;
 }
 .nav-info-content {

 }


 
</style>
<template lang="html">
	<div class="station">
               <div class="settings">
                  <div v-if="showInfoNumber == 0">
   	               	<div class="btn btn-success" @click="add('addWorker')">添加医生</div>
   	               	<div class="btn btn-success" @click="add('batchAddWorker')">批量添加医生</div>
                  </div>
                 <div v-if="showInfoNumber == 1">
  	               	<div class="btn btn-success" @click="add('addQueue')">添加队列</div>
                 </div>
                 <div v-if="showInfoNumber == 2">
  	               	<div class="btn btn-success" @click="add('addCaller')">添加叫号器</div>
                 </div>
               </div>
               <middleLine height='20'></middleLine>
               <div class="station-content clearfix">
	               <div class="nav-bar">
	               	     <div class="station-name ">{{stationName}}</div>
	               	     <div class="tab  text-center" @click="showInfo(0)">医生信息</div>
	               	     <div class="tab text-center" @click="showInfo(1)">队列</div>
	               	     <div class="tab text-center" @click="showInfo(2)">叫号器</div>
	               	     <div class="tab text-center" @click="edit('editStation', {'stationID':stationID} )">配置分诊台</div>
	               </div>
	               <div class="nav-info">
	               	   <div class="workList nav-info-content" v-if="showInfoNumber == 0">
	               	   	   <table class="table">
	               	   	        <thead>
	               	   	           <tr>
	               	   	        	    <th>序号</th>
	               	   	        	    <th>名称</th>
	               	   	        	    <th>IP</th>
	               	   	        	    <th>类型</th>
	               	   	        		<th>所属医生</th>
	               	   	        		<th>操作</th>
	               	   	           </tr>
	               	   	        </thead>
	               	   	   	    <tbody>
	               	   	   	        <div class="noData" v-if="workerList.length == 0">没有医生</div>
	               	   	   	        <tr v-for="worker in workerList">
	               	   	   	            <td>{{worker.name}}</td>
	               	   	   	            <td>{{worker.name}}</td>
	               	   	   	        	<td>{{worker.ip}}</td>
	               	   	   	        	<td>{{worker.type}}</td>
	               	   	   	        	<td>{{worker.title}}</td>
	               	   	   	        	<td @click="edit('editWorker', worker)">编辑</td>
	               	   	   	        </tr>	
	               	   	   	    </tbody>
	               	   	   </table>
	               	   </div>
	               	   <div class="callerList nav-info-content" v-if="showInfoNumber == 1">
		               	   <table class="table">
		               	        <tr>
		               	        	<th>队列名字</th>
		               	        	<th>队列id</th>
		               	        	<th>操作</th>
		               	        </tr>
		               	   	    <tbody>
		               	   	        <div class="noData" v-if="queueList.length == 0">没有队列</div>
		               	   	        <tr v-for="queue in queueList">
		               	   	        	<td>{{queue.name}}</td>
		               	   	        	<td>{{queue.id}}</td>
		               	   	        	<td @click="edit('editQueue', queue)">编辑</td>
		               	   	        </tr>	
		               	   	    	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
	               	   <div class="queueList nav-info-content" v-if="showInfoNumber == 2">
		               	   <table class="table">
		               	        <tr>
		               	        	<th>叫号器name</th>
		               	        	<th>叫号器pos</th>
		               	        	<th>操作</th>
		               	        </tr>
		               	   	    <tbody>
		               	   	         <div class="noData" v-if="callerList.length == 0">没有叫号器</div>
		               	   	        <tr v-for="caller in callerList">
		               	   	        	<td>{{caller.name}}</td>
		               	   	        	<td>{{caller.pos}}</td>
		               	   	        	<td @click="edit('editCaller', caller)">编辑</td>
		               	   	        </tr>	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
	               </div>
               </div>
	</div>
</template>
<script >
    import middleLine from '../../common/middleLine/middleLine'
	export default {
		name: 'station',
		data() {
			return {
				showInfoNumber: 0,
				stationInfo: '',
				workerList: '',
				queueList: '',
				callerList: ''
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('station')
			},
			workerUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			},
			queueInfoUrl() {
				return this.$store.getters.postUrl('manager', 'queueInfo')
			},
			callerUrl() {
				return this.$store.getters.postUrl('manager', 'caller')
			},
			stationID() {
				return this.$route.query.id;
			},
			stationName() {
				return decodeURIComponent(this.$route.query.name);
			}
		},
		components: {
			middleLine
		},
		created() {
           this._init()
		},
		mounted() {
		},
		methods: {
			_init() {
				this.getWorkerList()
				this.getQueueList()
				this.getCallerList()
			},
			getWorkerList() {
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
			},
			getQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
					this.queueList = res.list;
				}, (res) => {
					console.log('failed ')
				})
			},
			getCallerList() {
				this.axios.post(this.callerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.callerList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			// 显示右侧内容
			showInfo(num) {
				this.showInfoNumber = num;
			},
			add(stateName) {
				this.$router.push({
					name: stateName,
					query: {
						stationID: this.stationID
					}
				})
			},
			edit(stateName, info) {
                this.$router.push({
                	name: stateName,
                	query: info
                })
			}
		}
	}
</script>

