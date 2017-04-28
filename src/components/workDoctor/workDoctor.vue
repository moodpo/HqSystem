<style scoped lang="stylus">

</style>
<template lang="html">
	<div class="workDoctor">
        {{callerID}}
	</div>
</template>
<script>
	export default {
		name: 'workDoctor',
        data() {
            return {
            }
        },
        computed: {
            callerID() {
                return Number(this.$route.query.callerID);
            }
        }
	}
</script>








