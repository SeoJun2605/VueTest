<template>
    <div class="pt-5">
        <div class="container rounded-2 bg-info-subtle text-center p-3 w-50 border shadow-lg">
            <div class="fw-bold fs-1 col-12 pb-4">Todo List</div>
            <div class="row pb-4 container">
                <div class="col-md-10">
                    <input v-model="searchStore.searchQuery" class="form-control" type="text" placeholder="검색"
                        @keyup.enter="searchPosts" />
                </div>
                <div class="col-md-2">
                    <SearchButton @click="searchPosts" />
                </div>
            </div>
            <div class="container rounded-5 bg-light">
                <div v-if="!filteredPosts.length" class="pt-5 fw-bold fs-5 text-secondary">
                    {{ posts.length ? '일치하는 ToDo가 없습니다.' : '등록된 ToDo가 없습니다. 새로운 ToDo를 등록해보세요.' }}
                </div>
                <div v-else>
                    <TodoList v-model="filteredPosts" @update:modelValue="updateAndSearch" />
                </div>
                <div class="text-end">
                    <div class="btn m-3 px-4 bg-primary shadow" @click="goToWrite">등록</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TodoList from '@/components/tdBoard/TodoList.vue'
import SearchButton from '@/components/SearchButton.vue'
import { useSearchStore } from '@/stores/searchStore'

export default {
    name: 'HomeView',
    components: {
        TodoList,
        SearchButton
    },
    setup() {
        const searchStore = useSearchStore()
        return { searchStore }
    },
    data() {
        return {
            posts: [],
            filteredPosts: []
        };
    },
    methods: {
        goToWrite() {
            this.$router.push('/write');
        },
        searchPosts() {
            if (this.searchStore.searchQuery === '') {
                this.filteredPosts = this.posts;
            } else {
                this.filteredPosts = this.posts.filter(post =>
                    post.title.toLowerCase().includes(this.searchStore.searchQuery.toLowerCase())
                );
            }
        },
        updateAndSearch(updatedPosts) {
            this.posts = updatedPosts;
            this.searchPosts();
        }
    },
    mounted() {
        this.posts = JSON.parse(localStorage.getItem('posts')) || [];
        this.searchPosts();
    }
};
</script>