import { create } from "zustand";

const useBranchAdminStore = create((set) => ({
  branches: [],
  loading: false,
  error: null,

  setBranches: (branches) => set({ branches }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addBranch: (branch) =>
    set((state) => ({ branches: [...state.branches, branch] })),

  updateBranch: (updated) =>
    set((state) => ({
      branches: state.branches.map((b) => (b.id === updated.id ? updated : b)),
    })),

  deleteBranch: (id) =>
    set((state) => ({
      branches: state.branches.filter((b) => b.id !== id),
    })),
}));

export default useBranchAdminStore;
