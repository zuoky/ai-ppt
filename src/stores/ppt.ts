import { defineStore } from 'pinia'

interface PPTRecord {
  id: string
  content: string
  url: string
  createdAt: string
}

interface PPTState {
  history: PPTRecord[]
  currentPPT: PPTRecord | null
}

export const usePPTStore = defineStore('ppt', {
  state: (): PPTState => ({
    history: [],
    currentPPT: null,
  }),

  actions: {
    addRecord(content: string, url: string) {
      const record: PPTRecord = {
        id: Date.now().toString(),
        content,
        url,
        createdAt: new Date().toISOString(),
      };
      this.history.unshift(record);
      this.currentPPT = record;

      if (this.history.length > 20) {
        this.history = this.history.slice(0, 20);
      }
    },

    clearHistory() {
      this.history = []
      this.currentPPT = null
    },

    setCurrentPPT(record: PPTRecord | null) {
      this.currentPPT = record
    },
  },

  persist: {
    key: 'ppt-history',
    storage: window.localStorage,
    paths: ['history', 'currentPPT'],
  },
})
