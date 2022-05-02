<template>
    <div>
        <!--리스트 형식으로 정렬-->
        <v-container>
            <v-card >
                <v-list v-for="n in 9" :key="n">
                    <button style="width: 100%;" @click="$router.push(`/page/${n}`)">
                        <v-list-item>
                            <v-img 
                            :src="'https://picsum.photos/500/300?image'+n"
                            aspect-ratio="1"
                            class=" .float-left ml-5 mt-5"
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
                            </v-list-item-content>
                        </v-list-item>
                    </button>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'SubList',
    data: function() {
        return {
            show: true,
            dialog:false,
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

        this.$EventBus.$on('toggle', () => {
            this.show = !this.show;
        });
    },
    methods: {
        addWrite () {
            this.dialog=true;
            this.$EventBus.$emit('click');
        },
    },
}
</script>