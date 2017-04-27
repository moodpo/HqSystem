<template lang="html">
	<div class="manage">
	    <div class="manage-header container-fluid">
            <ul class="row clearfix">
	            <li @click="goToState('stationList')" id="fenzhentai" class="manage-tab">
		            <input id="tag1" type="radio" name="tags"/><label for="tag1"><i class="iconfont icon-fenzhentai"></i><h2>分诊台</h2></label>
				</li>
				<li @click="goToState('stationList')" id="fenzhentai" class="manage-tab">
					<input id="tag2" type="radio" name="tags"/><label for="tag2"><i class="iconfont icon-shujufenxi"></i><h2>数据分析</h2></label>
				</li>
				<li @click="goToState('stationList')" id="fenzhentai" class="manage-tab">
					<input id="tag3" type="radio" name="tags"/><label for="tag3"><i class="iconfont icon-paibanguanli"></i><h2>排班管理</h2></label>
				</li>
				<li @click="goToState('stationList')" id="fenzhentai" class="manage-tab">
					<input id="tag4" type="radio" name="tags"/><label for="tag4"><i class="iconfont icon-weixinguanli"></i><h2>微信管理</h2></label>
				</li> 
            </ul>
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
		methods: {
			goToState(state) {
                this.$router.push({name: state})
			}
		}
	}
</script>

<style lang="stylus" scoped>

.manage .manage-header 
	height: 80px
	background-image: linear-gradient(45deg, #2A82F3 0%, #00B0FF 100%)
	display: flex
	align-items: center
	
.clearfix
	width: 768px
	
	@media screen and (max-width: 850px)
		margin: 0 auto
		padding: 0
    	
.iconfont
	font-size: 34px
	margin-right: 15px
	
.manage-tab
	float: left
	color:#fff
	padding: 0
	margin-right: 1em
	input
		display: none
	label
		opacity: 0.5
		display: flex
		align-items: center
		font-weight: normal
		
	label:hover
		opacity: 1
		font-weight: medium
		i
			font-weight: normal
			
input[type=radio]:checked + label {
    opacity: 1
}

	
</style>