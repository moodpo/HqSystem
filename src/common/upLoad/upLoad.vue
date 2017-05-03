<style scoped>
.chooseBtn {
	display: none;
}
a:hover {
	text-decoration: none
}
</style>
<template lang="html">
	<div class="upload">
		<input type="file"  ref="chooseBtn" class="chooseBtn" @change="change">
		<a class="" @click="chooseFile" ref="upLoadBtn" class="upLoadBtn custom-cursor-pointer">上传</a>
	</div>
</div>

</template>
<script >
	export default {
		// 上传组件
		name: 'upload',
		data() {
		},
		props: ['upLoadUrl'],
		methods: {
            chooseFile() {
            	this.$refs.chooseBtn.click()
            },
            change() {
            	this.upLoad()
            },
            upLoad() {
            	// this 指向问题，会指向XHR
            	let self = this
                let uploadImg = this.$refs.chooseBtn
                let formData = new FormData();
                // 普通上传
                formData.append('action', 'normal');
				formData.append('file', uploadImg.files[0])
				// formData.append('type', 'normal')
				let request = new XMLHttpRequest();
				request.open('POST', self.upLoadUrl, true);
				request.onreadystatechange = function(response) {
					if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
						// emit 文件上传成功
						self.$emit('upLoadInfo', request.responseText)
					} else {
						console.log('failed')
					}
				};
				request.send(formData);
            }
		}
	}
</script>

