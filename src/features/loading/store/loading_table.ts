import { defineStore } from 'pinia'

export const useLoadingTableStore = defineStore({
  id: 'loadingTable',
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoading(value:boolean) {
      this.isLoading = value
    }
  }
})
