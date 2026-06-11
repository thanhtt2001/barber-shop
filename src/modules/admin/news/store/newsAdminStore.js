import { create } from "zustand";

const useNewsAdminStore = create((set) => ({
  news: [],
  loading: false,
  error: null,

  setNews: (news) => set({ news }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addPost: (post) =>
    set((state) => ({ news: [...state.news, post] })),

  updatePost: (updated) =>
    set((state) => ({
      news: state.news.map((n) => (n.id === updated.id ? updated : n)),
    })),

  deletePost: (id) =>
    set((state) => ({
      news: state.news.filter((n) => n.id !== id),
    })),
}));

export default useNewsAdminStore;
