<template>
  <div>
    <input
      style="display: block"
      type="file"
      id="inputImage"
      name="inputImage"
      @change="changeEvent"
    />
    <img
      id="preview-image"
      src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
      alt=""
      style="width: 200px"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    readImage(input) {
      // input 태그에 파일이 있는 경우
      if (input.files && input.files[0]) {
        // FileReader 인스턴스 생성
        const reader = new FileReader();

        // 이미지라 로드된 경우
        reader.onload = (e) => {
          const previewImage = document.getElementById("preview-image");
          previewImage.src = e.target.result;
        };

        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0]);
      }
    },
    changeEvent(e) {
      this.readImage(e.target);
      const fd = new FormData();
      fd.append("inputImage", document.getElementById("inputImage").files[0]);

      this.$http.post("api/image", fd).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
