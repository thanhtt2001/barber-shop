import { create } from "zustand";

const useEventAdminStore = create((set) => ({
  events: [],
  loading: false,
  error: null,

  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addEvent: (event) =>
    set((state) => ({ events: [...state.events, event] })),

  updateEvent: (updated) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === updated.id ? updated : e)),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));

export default useEventAdminStore;
