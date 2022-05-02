<template>
    <div>
        <v-container>
            <v-card class="mt-4">
                <v-list>
                    <v-list-item>
                        <v-img 
                            :src="'https://picsum.photos/500/300?image'+n"
                            aspect-ratio="1"
                            class=" .float-left ml-4 mt-5"
                            max-width="180px">

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

                            <v-list-item-content>
                                <v-card-text>
                                    <h2>{{memo.date}}</h2>
                                </v-card-text>
                                <v-card-text>오늘의 기분
                                    <v-row justify="space-around">
                                        <v-col
                                        cols="12"
                                        sm="10"
                                        md="8"
                                        >
                                            <v-chip-group
                                            mandatory
                                            active-class="pink--text"
                                            >
                                                <v-chip
                                                v-for="tag in tags"
                                                :key="tag"
                                                >
                                                    <v-icon>
                                                        {{ tag }}
                                                    </v-icon>
                                                    </v-chip>
                                                </v-chip-group>
                                            </v-col>
                                        </v-row>
                                </v-card-text>

                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                            v-model="memo.todo"
                                            readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                        
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                            v-model="memo.meal"
                                            readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-divider class="mx-4"></v-divider>

                                <v-textarea
                                outlined
                                auto-grow
                                v-model="memo.memo"
                                ></v-textarea>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                <v-card-actions>
                    <v-btn @click="$router.go(-1)">뒤로 가기</v-btn>
                    <v-btn>수정</v-btn>
                    <v-btn>삭제</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return ({
            memo: {}
        })
    },
    created() {
        this.$http.get(`/api/memo/${this.$route.params.id}`)
        .then((response)=>{
            this.memo = response.data
        })
    }
}
</script>