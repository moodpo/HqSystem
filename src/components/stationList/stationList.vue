<template lang="html">
	<div class="">
	       <div class="addstation-container">

		       	<button class="addstation"  @click="goToState('addStation')"><h3>新建分诊台</h3></button>

	       </div>
	       <middleLine height='13.4'></middleLine>
		   	<div class="card-container">
   				<div v-for="station in stationList" class="card-box" @click="goToStationDetail(station)">
   					<div class="card">
   						<div class="card-bg" :style="{'backgroundImage':'url('+stationLogo+')'}"></div>
   						<h3>{{station.name}}</h3>
   					</div>
   				</div>
		   	</div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
	</div>
</template>
<script>
    import Vue from 'vue'
    import stationLogo from 'img/Shape.png'
    import middleLine from '../../common/middleLine/middleLine'

	export default {
		name: 'station',
		data() {
			return {
				stationList: '',
				stationLogo: stationLogo
				// length: ''
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'station')
			}
		},
		components: {
			middleLine
		},
		created() {
			this._init()
		},
		mounted() {
			console.log(this.$route.name)
		},
		methods: {
			_init() {
				console.log('_init')
				this.axios.post(this.serverUrl, {
					action: 'getList'
				}).then((res) => {
                    this.stationList = res.stationList
                    // this.length = res.stationList.length
				}, (res) => {
					console.log('failed')
				})
			},
			goToStationDetail(station) {
				// todo
				// 参数传递有点怪异
				this.$router.push(
					{ name: 'station',
					query: {
						id: station.id,
						name: encodeURIComponent(station.name)
					}
				})
			},
			goToState(state) {
				this.$router.push({name: state})
			}
		}
	}
</script>

<style lang="stylus" scoped>
h2,h3
	font-family: PingFangSC-Light
	font-weight: 100
	margin: 0
	padding: 0

h2
	font-size: 24px

h3
	font-size: 20px

label,ul
	margin: 0

button
	border: none

// 去掉button等默认点击效果 
a, button, input
	webkit-tap-highlight-color: rgba(0,0,0,0)
	webkit-user-modify: read-write-plaintext-only
	outline: none
	
.card-container
	margin: 50px auto
	display: -webkit-flex
	flex-wrap: wrap
	six2(num)
		if (num%6 == 0)
			justify-content: flex-start
			.card-box
			.card-box:nth-of-type(4n)
			.card-box:nth-of-type(5n)
				margin-right: 66.7px
			.card-box:nth-of-type(6n)
				margin-right: 0
		else
			justify-content: space-between
	six(num)
		if (num%6 == 0)
			justify-content: flex-start
			.card-box
			.card-box:nth-of-type(4n)
			.card-box:nth-of-type(5n)
				margin-right: calc((85vw - 799.8px)/5)
			.card-box:nth-of-type(6n)
				margin-right: 0
		else
			justify-content: space-between
	five(num)
		if (num%5 == 0)
			justify-content: flex-start
			.card-box
			.card-box:nth-of-type(4n)
				margin-right: calc((85vw - 666.5px)/4)
			.card-box:nth-of-type(5n)
				margin-right: 0
		else
			justify-content: space-between
	four(num)
		if (num%4 == 0)
			justify-content: flex-start
			.card-box
				margin-right: 35.6px
			.card-box:nth-of-type(4n)
				margin-right: 0
		else
			justify-content: space-between
			
	@media (max-width: 772px)
		justify-content: space-between
		width:80%
	
	@media (min-width: 773px)
		width:640px
		four(4)
	@media (min-width: 933.38px)
		width: 85vw
		five(5)
	@media (min-width: 1066.72px)
		width: 85vw
		six(6)
	@media (min-width: 1280px)
		width: 1133.4px
		six2(6)
		
	
.card-box
	width: 133.3px

.card-box:hover
	cursor: pointer
	
.card
	h3
		font-family: PingFangSC-Light
		text-align: center
		margin-top: 0.67em
		margin-bottom: 1.33em

.card-bg
	height: 173.3px
	background:no-repeat center center
	border:1px solid #d7d7d7

.addstation-container
	display: flex
	align-items: center
	justify-content: center
	height: 93.3px
	margin-top: 80px

.addstation
	width: 4.73em
	height: 1.3em
	box-shadow: 0 5px 10px rgba(8,181,254, 0.2)
	background: -webkit-gradient(45deg, #109EFC, #00C8FF) //chrome/Safari
	background: -moz-linear-gradient(45deg, #109EFC, #00C8FF) //Firefox
	background: -o-linear-gradient(45deg, #109EFC, #00C8FF)
	background: linear-gradient(45deg, #109EFC, #00C8FF)
	border-radius: 5px
	color:#fff
	font-size: 30px
	border: none

</style>