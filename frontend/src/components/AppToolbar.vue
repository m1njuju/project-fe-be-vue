<template>
    <div>
    <!-- 상단 툴바 -->
        <v-app-bar app color="info lighten-2" dark class="mb-10">
            <v-app-bar-nav-icon @click="ndrawer = true"></v-app-bar-nav-icon>
            <a>
                <v-toolbar-title @click="$router.push('/')"
                class="headline white--text"
                >Today's Frame</v-toolbar-title>
            </a>

            <v-spacer></v-spacer>

            <v-toolbar-title v-model="user"
            v-if="login" class="caption">{{user}}님 환영합니다</v-toolbar-title>

        <div v-if="login">
            <!-- 날짜 선택으로 검색할 수 있게 -->

            <v-menu bottom left :close-on-content-click="closeOnContentClick"
            class="position:relative;overflow-x:hidden;">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-calendar-month-outline</v-icon>
                    </v-btn>
                </template>

                <!-- 캘린더 부분 -->
                <div>
                    <v-date-picker v-model="date1" :events="arrayEvents"
                    color="info lighten-2" event-color="pink lighten-4"
                    no-title></v-date-picker>
                    </div>
                    <!-- 캘린더 끝 -->
                </v-menu>

                <!--사진만 보일 시 나타날 아이콘-->
                <v-btn icon @click="toggleShow1" v-if="toggle">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>

                <!-- 리스트가 보일 시 나타날 아이콘-->
                <v-btn icon @click="toggleShow2" v-else>
                    <v-icon>mdi-apps</v-icon>
                </v-btn>
            

                <!-- 버튼 클릭 시 일기 작성 칸 나오게-->
                <v-btn icon @click="addWrite">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>


                <!-- 설정 버튼 -->
                <v-menu
                bottom
                left
                >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
            
            <!-- 로그인 버튼 -->
            <v-btn icon v-else @click="$router.push('/login')">
                <v-icon>mdi-login</v-icon>
            </v-btn>

            </v-app-bar>

            

            <!--내비게이션 서랍 시작 -->
            <v-navigation-drawer absolute temporary v-model="ndrawer"
            class="pr-2">
                <v-toolbar flat>
                    <v-list >
                        <v-list-item >
                            <v-list-item-avatar>
                                <v-icon class="grey white--text">mdi-account</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title > {{user}} </v-list-item-title>
                                <v-list-item-subtitle> {{new Date().toLocaleString()}} </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-toolbar>

                <v-divider></v-divider>
                <!-- 내비게이션 서랍 메뉴 리스트 -->
                <v-list >
                    <v-list-item
                    v-for="(menu,i) in menuList" :key="i"
                    :to="menu.to">
                        <v-list-item-action>
                            <v-icon>{{menu.icon}}</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{menu.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'AppToolbar',
    data: function(){
        return {
            user: '',
            login: false,
            ndrawer: false,
            items: [
                { title: '설정', to: {path: '/setting'}},
                { title: '버전확인', to: {path:'/' }},
                { title: '문의', to: {path:'/' } },
            ],
            menuList: [
                {
                    title : '내 정보',
                    icon : 'mdi-information-outline',
                    to:{
                        path: ""
                    },
                },
                {
                    title : '설정',
                    icon : 'mdi-cog-outline',
                    to:{
                        path:'/setting'
                    }   
                },
                {
                    title : '커뮤니티',
                    icon : 'mdi-comment-processing-outline',
                    to:{
                        path:'/'
                    }   
                }
            ],
            focus: '',
            type: 'month',
            closeOnContentClick: false,
            toggle:true,
            dialog:false,
            show:true,
            arrayEvents: null,
            date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
    },
    mounted () {
        this.arrayEvents = [...Array(6)].map(() => {
            const day = Math.floor(Math.random() * 30)
            const d = new Date()
            d.setDate(day)
            return d.toISOString().substr(0, 10)
        })
    },
    created() {
        this.$EventBus.$on('login-user', (user) => {
        this.user = user;
        this.login = true;
        })
    },  
    methods: {
        addWrite () {
            this.dialog=true;
            this.$EventBus.$emit('click');
            console.log(this.dialog);
        },
        toggleShow1 () {
            this.toggle= !this.toggle;
            this.$router.push('/sub');
        },
        toggleShow2 () {
            this.toggle= !this.toggle;
            this.$router.push('/');
        },
        functionEvents (date) {
            const [,, day] = date.split('-')
            if ([12, 17, 28].includes(parseInt(day, 10))) return true
            if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
            return false
        },
        path() {
            this.menuList[0].to.path = `/about/${this.user}`
        }
    },
    updated() {
        this.path()
    }
}
</script>