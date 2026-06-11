import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Auth store (Zustand + persist to localStorage).
 * Lưu token, user info, thời gian login, và trạng thái đăng nhập.
 */

// Token hết hạn sau 24 giờ (ms)
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loginTime: null,

      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
          loginTime: Date.now(),
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          loginTime: null,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      /**
       * Kiểm tra token còn hợp lệ không (dựa trên thời gian login).
       * @returns {boolean}
       */
      isTokenValid: () => {
        const state = get();
        if (!state.isAuthenticated || !state.token || !state.loginTime) {
          return false;
        }
        return Date.now() - state.loginTime < TOKEN_EXPIRY_MS;
      },

      /**
       * Kiểm tra và tự động logout nếu token hết hạn.
       * Gọi khi load app hoặc trước mỗi API call.
       */
      checkAndRefresh: () => {
        const state = get();
        if (state.isAuthenticated && !state.isTokenValid()) {
          state.logout();
          return false;
        }
        return state.isAuthenticated;
      },
    }),
    {
      name: "barberpro-auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loginTime: state.loginTime,
      }),
    }
  )
);

export default useAuthStore;
