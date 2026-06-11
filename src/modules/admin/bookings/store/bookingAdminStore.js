import { create } from "zustand";

const useBookingAdminStore = create((set) => ({
  bookings: [],
  filters: {
    branch: "",
    date: "",
    status: "all",
  },
  loading: false,
  error: null,

  setBookings: (bookings) => set({ bookings }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () =>
    set({
      filters: { branch: "", date: "", status: "all" },
    }),

  updateBookingInList: (id, updates) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),
}));

export default useBookingAdminStore;
