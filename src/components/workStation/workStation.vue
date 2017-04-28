<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.workStation-header
    height: 118px
    width:100%
    background: #f6f6f6
    box-shadow: 0 2px 0 0 #E5E5E5, inset 0 1px 4px 0 rgba(255,255,255,0.50);
    .header-logo
        width: 322px
        height: 118px
        line-height:118px
        &>div
            position: relative;
            top:50%;
            transform: translateY(-50%);
    .header-content
        margin-left:322px
        position: relative;
        top:50%;
        transform: translateY(-50%);
        &>div
            width:100%
.workStation-body
    .body-panel
        width:322px
    .body-content
        margin-left:322px
        .body-content-inner
            .list-card
                width:300px
                height:500px
                display:inline-block;
                margin:20px
                background: rgba(255,255,255,0.00);
                border: 1px solid #E5E5E5;
                box-shadow: 0 0 16px 0 rgba(138,138,138,0.14);
                .header
                    background: #FAFAFA;
                    box-shadow: 0 1px 0 0 #F5F5F5;
                    text-align:center
                    height:50px
                    line-height:50px
                .content
                    overflow:auto
                    height:200px
.manipulate
    cursor:pointer
.manipulate-waitinglist
    background: #fff   
    &>div
        cursor: pointer
        &:hover
            background:#109EFC
            color:#fff
</style>
<template lang="html">
	<div class="workStation">
        <div class="workStation-header clearfix">
        	<div class="header-logo pull-left clearfix">
                <div>
                    <span>HQMS</span>
                    <span>排队叫号管理系统</span>
                </div>
        	</div>
        	<div class="header-content">
                <div class="clearfix">
                    <div class="contents pull-left">
                        <input type="search" v-model="visitorID"><span @click="getVisitorInfo" class="btn">搜索</span>
                    </div>
                   <div class="settings pull-right">
                       <button @click="getQueueListInfo">刷新</button>
                       <button>用户</button>
                   </div> 
                </div>
        	</div>
        </div>
        <div class="workStation-body clearfix">
            <div class="body-panel pull-left">
                <div class="choose-tab">
                    <div class="btn btn-primary" @click="detailShow = 1">简略</div>
                    <div class="btn btn-primary" @click="detailShow = 2">详细</div>
                </div>
                <div class="panel-content">
                    <span v-if="detailShow == 1">简略</span>   <span v-if="detailShow == 2">详细</span> 
                    <div>
                        <div v-for="(queue, index) in queueListInfo" v-if="detailShow == 2" @click="showWorker(index)">
                            {{queue.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="body-content" @dblclick="getVisitorInfoDelegate($event)"  @click="manipulateDelegate($event)" >
                <div class="body-content-inner" v-if="detailShow == 1" >
                    <div class="nodata" v-if="queueListLength == 0">
                        暂时无数据
                    </div>
                    <div v-for="(queueInfo, index) in queueListInfo" class="list-card" @click="getVisitorInfoDelegate($event)">
                        <div class="header">{{queueInfo.name}} <span v-if="queueInfo.workerOnline != 0">({{queueInfo.workerOnline}})</span> </div>
                        <div class="tab">
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==1}" @click="$set(queueCardTabNum, index, 1)">正在排队</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==2}" @click="$set(queueCardTabNum, index, 2)">已完成</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==3}" @click="$set(queueCardTabNum, index, 3)">未激活</div>
                        </div>
                        <div class="info">排队：0 过号：0 已叫：0</div>
                        <div class="content">
                            <div class="waitingList" v-if="queueCardTabNum[index] == 1" >
                                <table class="table">
                                    <thead>
                                            <td>序号</td>
                                            <td>年龄</td>
                                            <td>姓名</td>
                                            <td>操作</td>
                                    </thead>
                                    <tbody>
                                        <tr  v-for="wait in queueListAll[index].waitingList" :id="wait.id" :queueID="wait.queueID">
                                            <td>{{wait.snumber}}</td>
                                            <td>{{wait.age}}</td>
                                            <td>{{wait.name}}</td>
                                            <td v-if="wait.localStatus == 'doing'">进行中</td>
                                            <td v-else class="manipulate">更多</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="finishList" v-if="queueCardTabNum[index] == 2">
                                <table class="table">
                                    <thead>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>操作</td>
                                    </thead>
                                    <tbody>
                                        <tr v-for="finish in queueListAll[index].finishList" :id="finish.id" :queueID="finish.queueID">
                                            <td>{{finish.id}}</td>
                                            <td>{{finish.name}}</td>
                                            <td>{{finish.orderTime}}</td>
                                            <td v-if="finish.localStatus == 'doing'">进行中</td>
                                            <td v-else class="manipulate">更多</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="unactive" v-if="queueCardTabNum[index] == 3"></div>
                        </div>
                    </div>
                </div>
                <div class="body-content-inner" v-if="detailShow == 2">
                    <div class="nodata" v-if="queueListLength == 0">
                        暂时无数据
                    </div>
                    <div v-for="(queueInfo, index) in queueListInfo"   v-if="workNum == index" >
                        <div class="tab">
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==1}" @click="$set(queueCardTabNum, index, 1)">正在排队</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==2}" @click="$set(queueCardTabNum, index, 2)">已完成</div>
                            <div class="btn" :class="{'active':queueCardTabNum[index] ==3}" @click="$set(queueCardTabNum, index, 3)">未激活</div>
                        </div>
                        <div class="content">
                            <div class="waitingList" v-if="queueCardTabNum[index] == 1" >
                               <table class="table">
                                   <thead>
                                           <td>序号</td>
                                           <td>年龄</td>
                                           <td>姓名</td>
                                           <td>操作</td>
                                   </thead>
                                   <tbody>
                                         <tr v-for="wait in queueListAll[index].waitingList" :id="wait.id" :queueID="wait.queueID">
                                             <td>{{wait.snumber}}</td>
                                             <td>{{wait.age}}</td>
                                             <td>{{wait.name}}</td>
                                             <td v-if="wait.localStatus == 'doing'">进行中</td>
                                             <td v-else class="manipulate">更多</td>
                                         </tr> 
                                   </tbody>
                               </table>
                            </div>
                            <div class="finishList" v-if="queueCardTabNum[index] == 2">
                                <table class="table">
                                    <thead>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>序号</td>
                                            <td>操作</td>
                                    </thead>
                                    <tbody>
                                        <tr  v-for="finish in queueListAll[index].finishList" :id="finish.id" :queueID="finish.queueID">
                                            <td>{{finish.id}}</td>
                                            <td>{{finish.name}}</td>
                                            <td>{{finish.orderTime}}</td>
                                            <td v-if="finish.localStatus == 'doing'">进行中</td>
                                             <td v-else class="manipulate">更多</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="unactive" v-if="queueCardTabNum[index] == 3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 弹出框 -->
            <modal @close="modal.modalShow = false" v-if="modal.modalShow" >
                <div slot="body">
                    {{visitorInfo.name}}<br>
                    {{visitorInfo.status}}<br>
                    {{visitorInfo.workerName}}<br>
                </div>
            </modal>
            <moveMan @close="modal.modalShow2 = false" v-if="modal.modalShow2" :whichFooter="whichFooter" @saveChoose="visitorMoveto">
                
                <div slot="body">
                移动到：
               <!--  {{queueListInfo[moveMan.queueListIndex].id}}<br>
                moveMan.toId:{{moveMan.toId}}<br>
                queueListAll[moveMan.queueListIndex][chooseMoveType]:_{{queueListAll[moveMan.queueListIndex][chooseMoveType].length}} -->
                    <br>
                    <select v-model="moveMan.queueListIndex">
                        <option v-for="(queueList, index) in queueListInfo" :value="index">{{queueList.name}}</option>
                    </select>
                    <br>
                    <select v-model="moveMan.Type">
                        <option v-for="type in queueListInfo[moveMan.queueListIndex].tab" :value="type">{{type}}</option>
                    </select>
                    <br>
                    <select v-model="moveMan.toId">
                        <option v-for="man in queueListAll[moveMan.queueListIndex][chooseMoveType]" :value="man.id">{{man.name}}</option>
                    </select>
                </div>
            </moveMan>
            <dropDownBox :left="dropDownBox.left" :top="dropDownBox.top" v-if="dropDownBox.dropDownBoxShow" @close="dropDownBox.dropDownBoxShow = false">
                <div slot="body">
                    <div class="manipulate-waitinglist">
                      <div @click="manipulate('move', -1)">前进</div>
                      <div @click="manipulate('move', 1)">后退</div>
                      <div @click="manipulate('vip')">优先</div>
                      <div @click="manipulate('visitorLockSet')">锁定</div>
                      <div @click="manipulate('moveTo')">转移</div>  
                    </div>
                </div>
            </dropDownBox>
        </div>
	</div>
</template>
<script>
    import modal from '../../common/modal/modal'
    import moveMan from '../../common/moveMan/moveMan'
    import dropDownBox from '../../common/dropDownBox/dropDownBox'
	export default {
		name: 'workStation',
        data() {
            return {
                detailShow: 1,  // 显示详情或简略
                workNum: 0,    // 显示第几个专家  1 不显示   2  显示
                queueListInfo: [], // 工作站的队列列表
                queueListLength: 0,  // 工作站队列数目
                queueListAll: [], // 队列详情 组成的数组
                cachelist: '',
                queueCardTabNum: [],
                visitorID: '',
                queueID: '',
                modal: {
                    modalShow: false,
                    modalShow2: false
                },
                dropDownBox: {
                    dropDownBoxShow: false,
                    left: 0,
                    top: 0
                },
                moveMan: {       // 移动病人的操作
                    queueListIndex: 0,   // 选中 的是第几个队列
                    toId: 0,             // 移动到某位置的id
                    Type: ''
                },
                visitorInfo: '',
                poolRequest: '',
                poolFlag: false // 轮询标识
            }
        },
        computed: {
            stationID() {
                return Number(this.$route.query.stationID);
            },
            stationUrl() {
                return this.$store.getters.postUrl('main', 'station')
            },
            chooseMoveType() {
                return (this.moveMan.Type + 'List')
            }
        },
        created() {
            this._init()
        },
        mounted() {
            console.log(this.$route)
        },
        methods: {
            _init() {
                this.getQueueListInfo()
            },
            getQueueListInfo() {
                var self = this;
                this.axios.post(this.stationUrl, {
                    action: 'getQueueListInfo',
                    stationID: this.stationID
                }).then((res) => {
                    this.queueListInfo = res.list
                    this.queueListLength = this.queueListInfo.length
                    for (let i = 0; i < this.queueListLength; i++) {
                       this.getQueueListAll(this.queueListInfo[i].id, i)
                    }
                    // todo 轮询 停止不了？
                    // 轮询
                    let poolRequest = setTimeout(function() {
                        self.getQueueListInfo();
                    }, 1000)
                    if (!this.poolFlag) {
                        clearTimeout(poolRequest)
                    }
                }, (res) => {
                })
            },
            getQueueListAll(id, index) {
                this.axios.post(this.stationUrl, {
                    action: 'getQueueListAll',
                    queueID: id,
                    stationID: this.stationID
                }).then((res) => {
                    if (!this.queueCardTabNum[index]) {
                        this.$set(this.queueCardTabNum, index, 1)
                    }
                    this.$set(this.queueListAll, index, res)
                }, (res) => {
                })
            },
            // 事件委托 获取病人信息
            getVisitorInfoDelegate(event) {
                if (event.type === 'click') return
                let nodeEle = event.target
                if (nodeEle.nodeName === 'TD' && nodeEle.parentNode) {
                    let id = nodeEle.parentNode.id
                    this.visitorID = id
                    this.getVisitorInfo()
                } else {
                    return
                }
            },
            // 弹出操作框
            manipulateDelegate(event) {
                let nodeEle = event.target
                if (nodeEle.nodeName === 'TD' && (nodeEle.className.indexOf('manipulate') !== -1)) {
                    let id = nodeEle.parentNode.id
                    let queueID = Number(nodeEle.parentNode.getAttribute('queueid'))
                    this.visitorID = id
                    this.queueID = queueID
                    this.dropDownBox.left = event.clientX
                    this.dropDownBox.top = event.clientY
                    this.dropDownBox.dropDownBoxShow = true
                } else {
                    this.dropDownBox.dropDownBoxShow = false
                }
            },
            // 具体操作函数
            manipulate(...params) {
                let data = {
                    stationID: this.stationID,
                    id: this.visitorID,
                    queueID: this.queueID
                }
                if (params[0] === 'move') {
                    data.action = 'visitorMoveby'
                    data.value = params[1]
                   this.axios.post(this.stationUrl, data).then((res) => {
                       console.log(res)
                   }, (res) => {
                   })
                } else if (params[0] === 'vip') {
                    data.action = 'visitorProirSet'
                    data.prior = 1
                    this.axios.post(this.stationUrl, data).then((res) => {
                        console.log(res)
                    }, (res) => {
                    })
                } else if (params[0] === 'visitorLockSet') {
                    data.action = 'visitorLockSet'
                    data.locked = 1
                    this.axios.post(this.stationUrl, data).then((res) => {
                        console.log(res)
                    }, (res) => {
                    })
                } else if (params[0] === 'moveTo') {
                    this.modal.modalShow2 = true
                }
            },
            // 获取病人信息
            getVisitorInfo() {
                this.axios.post(this.stationUrl, {
                    action: 'getVisitorInfo',
                    stationID: this.stationID,
                    id: this.visitorID
                }).then((res) => {
                    this.visitorInfo = res
                    this.modal.modalShow = true
                })
            },
            visitorMoveto() {
                let data = {
                    stationID: this.stationID,
                    id: this.visitorID,
                    queueID: this.queueID,
                    action: 'visitorMoveto',
                    dest: {
                        queueID: this.queueListInfo[this.moveMan.queueListIndex].id,
                        id: this.moveMan.toId,
                        status: this.moveMan.Type
                    }
                }
               this.axios.post(this.stationUrl, data).then((res) => {
                   console.log(res)
               }, (res) => {
               })
            },
            showWorker(index) {
                this.workNum = index
            }
        },
        components: {
            modal,
            dropDownBox,
            moveMan
        }
	}
</script>








