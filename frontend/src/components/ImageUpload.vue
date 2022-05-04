<template>
    <div>
            <v-file-input
            type="file"
            ref="image"
            @change="uploadImg"
            accept="image/*"
            max-width="200px"
            label="이미지를 등록하세요"
            prepend-icon="mdi-camera"
            ></v-file-input>
        <v-img max-width="180px" :src="imageurl" alt="image"></v-img>
    </div>
</template>
<script>
export default {
    data() {
        return {
            image: '',
            imageurl: '', // 업로드한 이미지의 미리보기 기능을 위해 url 저장하는 객체
        }
    },
    methods: {
        uploadImg(file) {
            if (!file) {
                return;
            }
            this.image = this.$refs['image'].files
            console.log('이미지가 들어왔습니다');

            const formData = new FormData(); //파일 전송할 때 FormData 형식으로 전송
            this.imageurl = ''; // url은 미리보기용으로 사용
            file.find((item) => {
                formData.append('upLoadImage', item); // formData의 key: 'upLoadImage', value: 이미지
                const reader = new FileReader();
                reader.onload = (e) => {
                    // e.target.result를 통해 이미지 url을 가져와서 url 객체에 저장
                    this.imageurl.push({url: e.target.result});
                };
                reader.readAsDataURL(item);
            });
            this.$http.post('/api/image', {
                headers: {'Content-Type': 'multipart/form-data'},
                data: formData
            }).then((response) => {
                console.log(response.data.message);
                this.imagecnt = file.length;
            });
        }
    },
}
</script>