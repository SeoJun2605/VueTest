<template>
    <div class="pt-5">
        <div class="container rounded-2 bg-info-subtle text-center p-3 w-50 border shadow-lg">
            <div class="fw-bold fs-1 col-12 pb-4">상세화면</div>
            <div class="container rounded-5 bg-light">
                <div class="row p-3">
                    <div class="col-md-7 mb-2 mb-md-0">
                        <input v-model="post.author" class="form-control" type="text" placeholder="작성자" disabled>
                    </div>
                    <div class="col-md-5">
                        <input v-model="post.date" class="form-control" type="text" disabled>
                    </div>
                    <div class="pt-3">
                        <input v-model="post.title" class="form-control" type="text" placeholder="제목" disabled>
                    </div>
                    <div class="pt-3">
                        <textarea v-model="post.content" class="form-control rounded-5" rows="5" placeholder="내용"
                            disabled></textarea>
                    </div>
                </div>
                <div class="text-end">
                    <div class="btn m-3 px-4 bg-primary shadow" @click="goToWrite">수정</div>
                    <div class="btn m-3 px-4 bg-primary shadow" @click="goToHome">목록</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailTd',
    data() {
        return {
            post: JSON.parse(this.$route.query.post) || {}
        };
    },
    methods: {
        goToHome() {
            this.$router.push('/');
        },
        goToWrite() {
            this.$router.push({
                name: 'write',
                query: { post: JSON.stringify(this.post) }
            });
        }
    }
};
</script>

<style>
.btn:hover {
    opacity: 0.8;
}
</style>