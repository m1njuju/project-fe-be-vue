<template>
    <v-container class="mt-16">
        <v-card class="pa-10">
            <v-text-field label="id" v-model="user"></v-text-field>
            <v-text-field label="password" type="password"></v-text-field>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-btn @click="loginUser">로그인</v-btn>
                <v-btn @click="$router.go(-1)">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'LoginView',
    data: () => ({
        user: '',
    }),
    methods: {
        loginUser: function() {
            this.$EventBus.$emit('login-user',this.user)
            this.$router.push('/')
        }
    }
}
</script>