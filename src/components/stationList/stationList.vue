<template lang="html">
	<div class="">
	       <div class="addstation-container">
		       	<button class="addstation"  @click="goToState('addStation')">新建分诊台</button>
	       </div>
	       <middleLine height='20'></middleLine>
		   	<div class="station-list">
		   		<div v-for="station in stationList" class="card" @click="goToStationDetail(station)">
		   		    <div class="card-box" :style="{'backgroundImage':'url('+stationLogo+')'}"></div>
		   			{{station.name}}
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
                    this.stationList = res.stationList;
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
.card
	width:230px
	height:300px
	display: inline-block
	margin:40px 10px
	text-align:center
	
.card-box 
	margin:0 auto
	height:260px
	width:200px
	background:no-repeat center center
	border:1px solid #d7d7d7
	margin-bottom: 20px
	
.addstation-container
	display: flex
	align-items: center
	justify-content: center
	height: 140px

.addstation
	width: 212px
	height: 58px
	box-shadow: 0 5px 10px rgba(8,181,254, 0.2)
	background: -webkit-gradient(45deg, #109EFC, #00C8FF) //chrome/Safari
	background: -moz-linear-gradient(45deg, #109EFC, #00C8FF) //Firefox
	background: -o-linear-gradient(45deg, #109EFC, #00C8FF)
	background: linear-gradient(45deg, #109EFC, #00C8FF)
	border-radius: 5px
	color:#fff
	font-size: 30px

.station-list 
	padding-left: 20px

</style>