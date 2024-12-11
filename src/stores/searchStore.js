import { defineStore } from 'pinia';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchQuery: ''
  }),
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    }
  }
});