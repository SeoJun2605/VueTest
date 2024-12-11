<template>
    <div class="pt-5">
        <div class="container rounded-2 bg-info text-center p-3 w-50">
            <div class="fw-bold fs-1 col-12 pb-4">{{ isEditMode ? '수정' : '등록' }}</div>
            <div class="container rounded-5 bg-light">
                <div class="row p-3">
                    <div class="col-md-7 mb-2 mb-md-0">
                        <input v-model="author" class="form-control" type="text" placeholder="작성자">
                    </div>
                    <div class="col-md-5">
                        <!-- 날짜 입력 필드 -->
                        <input v-model="formattedDate" class="form-control" type="text" maxlength="10"
                            :placeholder="todayDate" @input="handleDateInput" @blur="validateDate" ref="dateInput">
                    </div>
                    <div class="pt-3">
                        <input v-model="title" class="form-control" type="text" placeholder="제목">
                    </div>
                    <div class="pt-3">
                        <textarea v-model="content" class="form-control rounded-5" rows="5" placeholder="내용"></textarea>
                    </div>
                </div>
                <div class="text-end">
                    <div class="btn m-3 px-4 bg-primary" @click="goToHome">목록</div>
                    <div class="btn m-3 px-4 bg-primary" @click="savePost">{{ isEditMode ? '수정' : '등록' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DateUtils from '@/utils/DateUtils';

export default {
    name: 'WriteTd',
    data() {
        return {
            author: '',
            title: '',
            content: '',
            formattedDate: '',
            todayDate: '',
            isEditMode: false,
            postId: null
        };
    },
    mounted() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.todayDate = `${year}${month}${day}`;

        if (this.$route.query.post) {
            const post = JSON.parse(this.$route.query.post);
            this.author = post.author;
            this.title = post.title;
            this.content = post.content;
            this.formattedDate = post.date;
            this.postId = post.id;
            this.isEditMode = true;
        }
    },
    methods: {
        goToHome() {
            this.$router.push('/');
        },
        handleDateInput() {
            this.formattedDate = DateUtils.formatDateWithHyphen(this.formattedDate);
        },
        validateDate() {


            // 잘못된 날짜 형식일 때는 알림 후 초기화
            if (!DateUtils.validateDateFormat(this.formattedDate)) {
                alert('올바른 날짜 형식을 입력해주세요');
                this.formattedDate = '';
                this.$refs.dateInput.focus();
                return false;
            }
            return true;
        },
        savePost() {
            if (!this.author) {
                alert('작성자를 입력하세요.');
                return;
            }
            if (!this.title) {
                alert('제목을 입력하세요.');
                return;
            }
            if (!this.content) {
                alert('내용을 입력하세요.');
                return;
            }
            if (!this.formattedDate) {
                alert('날짜를 입력하세요.');
                return;
            }

            const action = this.isEditMode ? '수정' : '등록';
            if (!confirm(`글을 ${action}하시겠습니까?`)) {
                return;
            }

            const post = {
                id: this.postId || Date.now(),
                author: this.author,
                date: this.formattedDate,
                title: this.title,
                content: this.content
            };

            const posts = JSON.parse(localStorage.getItem('posts')) || [];

            if (this.isEditMode) {
                const postIndex = posts.findIndex(p => p.id == this.postId);
                if (postIndex != -1) {
                    posts[postIndex] = post;
                }
            } else {
                posts.push(post);
            }

            localStorage.setItem('posts', JSON.stringify(posts));

            this.author = '';
            this.title = '';
            this.content = '';
            this.formattedDate = '';

            this.goToHome();
        }
    }
};
</script>

<style></style>