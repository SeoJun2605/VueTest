<template>
    <div class="container rounded-5 bg-light">
        <div v-for="post in sortedPosts" :key="post.id" class="p-3">
            <div class="container text-center border border-secondary border-2 rounded-2 position-relative post-item"
                @click="onTodoClick(post)">
                <div class="btn row align-items-center">
                    <div class="col-md-3 border-end border-1 border-grey text-truncate">
                        {{ post.title }}
                    </div>
                    <div class="col-md-3 border-end border-1 border-grey text-truncate">
                        {{ post.author }}
                    </div>
                    <div class="col-md-4 border-end border-1 border-grey text-truncate">
                        {{ post.date }}
                    </div>
                    <div class="btn col-md-2 position-absolute top-50 end-0 translate-middle-y trash"
                        @click.stop="onDeleteClick(post.id)">
                        <img alt="삭제" src="@/assets/img1.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
    props: {
        modelValue: {
            type: Array,
            required: true
        }
    },
    computed: {
        sortedPosts() {
            return [...this.modelValue].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });
        }
    },
    methods: {
        onTodoClick(post) {
            this.$router.push({
                name: 'detail',
                query: { post: JSON.stringify(post) }
            });
        },
        onDeleteClick(id) {
            const confirmed = confirm("정말로 이 게시물을 삭제하시겠습니까?");
            if (confirmed) {
                const posts = JSON.parse(localStorage.getItem('posts')) || [];
                const updatedPosts = posts.filter(post => post.id !== id);
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
                this.$emit('update:modelValue', updatedPosts);
            }
        }
    }
};
</script>

<style>
.row.align-items-center {
    display: flex;
    align-items: center;
}

.post-item:hover {
    background-color: #e0f7fa;
}

.trash:hover {
    background-color: #f1dce7;
}

.post-item {
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.trash {
    overflow: hidden;
}
</style>