<template>
    <button class="btn bg-primary shadow" @click="search">
        조회
    </button>
</template>

<script>
import { useSearchStore } from '@/stores/searchStore';

export default {
    name: 'SearchButton',
    methods: {
        search() {
            const searchStore = useSearchStore(); 
            searchStore.setSearchQuery(searchStore.searchQuery); 
        }
    }
};
</script>

<style>
button {
    width: 100%;
}
</style>