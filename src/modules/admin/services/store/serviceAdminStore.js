import { create } from "zustand";

const useServiceAdminStore = create((set) => ({
  services: [],
  loading: false,
  error: null,

  setServices: (services) => set({ services }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),

  updateService: (updated) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === updated.id ? updated : s)),
    })),

  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),
}));

export default useServiceAdminStore;
