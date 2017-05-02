<template lang="html">
	<div class="manage">
		<div class="header-box">
			<div class="container manage-header">
	            <ul class="clearfix">
		            <li @click="goToState('stationList')" id="fenzhentai" class="manage-tab  custom-cursor-pointer">
			            <div class="label"><i class="iconfont icon-fenzhentai"></i><h2>分诊台</h2></div>
					</li>
					<li @click="goToState('stationList')" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label"><i class="iconfont icon-shujufenxi"></i><h2>数据分析</h2></div>
					</li>
					<li @click="goToState('stationList')" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label"><i class="iconfont icon-paibanguanli"></i><h2>排班管理</h2></div>
					</li>
					<li @click="goToState('stationList')" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label"><i class="iconfont icon-weixinguanli"></i><h2>微信管理</h2></div>
					</li> 
	            </ul>
	            <div class="logout pull-right cursor-pointer" @click="logout">退出</div>
		    </div>
		</div>
	    <keep-alive>
	      <router-view v-if="$route.meta.keepAlive"></router-view>
	    </keep-alive>
	    <router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
	export default {
		name: 'manage',
		created() {
            this._init()
		},
		methods: {
			_init() {
                this.goToState('stationList')
			},
			goToState(state) {
                this.$router.push({name: state})
			},
			logout() {
				this.$store.commit('logout');
				this.goToState('login')
			}
		}
	}
</script>

<style lang="stylus" scoped>
h2,h3,ul,label
	margin: 0
	padding: 0
	
h2, h3
	font-weight: 200

h2
	font-size: 24px

// h3
// 	font-size: 20px

.header-box
	width: 100%
	position: fixed
	top: 0
	background-image: linear-gradient(45deg, #2a82f3 0%, #00b0ff 100%)
	z-index: 666

.manage-header
	height: 80px
	display: flex
	align-items: center
	justify-content: space-between

.container:after, .container:before
	content: none
	
.clearfix
	display: flex
	width: 768px
	@media screen and (max-width: 850px)
		margin: 0 auto
		padding: 0
    	
.iconfont
	font-size: 34px
	margin-right: 15px
	
.manage-tab
	// float: left
	color:#fff
	padding: 0
	margin-right: 1em
	// input
	// 	display: none
	.label
		opacity: 0.5
		display: flex
		align-items: center
		font-weight: normal
		
	.label:hover
		opacity: 1
		font-weight: medium
		i
			font-weight: normal
	@media (max-width: 540px)
		width: 50%

	@media (max-width: 1078px)
		margin: 0
		padding: 0
		font-size: 20px
		
@media (min-width: 1078px)	
	.manage-tab:first-child
		margin-right: 1.2em
		
.logout
	float: right
	
// input[type=radio]:checked + label {
//     opacity: 1
// }
	
</style>