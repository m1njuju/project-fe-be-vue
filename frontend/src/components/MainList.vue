<template>
    <div>
        <!-- 갤러리 형식으로 정렬 -->
        <v-container>
            <v-row>
                <v-col 
                v-for="n in 9"
                :key="n"
                class="d-flex child-flex"
                cols="6"
                sm="3"
                >
                    <button @click="$router.push(`/page/${n}`)">
                        <v-img :src="'https://picsum.photos/500?image='+n" max-width="200px">
                            <!--이미지 로딩 진행 써클 -->
                            <template v-slot:placeholder>
                                <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                                >
                                    <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </button>
                </v-col>
            </v-row>
        </v-container>
        
        <div >
            <label for="">할 일</label>
            <input type="text" v-model='memo.todo'>
            <label for="">식단</label>
            <input type="text" v-model='memo.meal'>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'MainList',
    data: function() {
        return {
            tags: [
                    'mdi-emoticon-excited-outline',
                    'mdi-emoticon-happy-outline',
                    'mdi-emoticon-neutral-outline',
                    'mdi-emoticon-sad-outline',
                    'mdi-emoticon-angry-outline',
                ],
            memo: {}
        }
    },
    created () {
        this.$http.get('/api/memo')
        .then((response) => {
            console.log(response.data);
            this.memo = response.data
        });
    },
}
</script>