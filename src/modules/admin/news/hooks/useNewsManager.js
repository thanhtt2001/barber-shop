import { useCallback } from "react";
import useNewsAdminStore from "../store/newsAdminStore";
import {
  fetchAdminNews,
  createAdminNews,
  updateAdminNews,
  deleteAdminNews,
} from "../services/newsAdminService";

export default function useNewsManager() {
  const {
    news,
    loading,
    error,
    setNews,
    setLoading,
    setError,
    addPost,
    updatePost,
    deletePost,
  } = useNewsAdminStore();

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminNews();
      setNews(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  }, [setNews, setLoading, setError]);

  const createPost = async (newsData) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await createAdminNews(newsData);
      addPost(newPost);
      return newPost;
    } catch (err) {
      setError(err?.message || "Tạo bài viết thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id, newsData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdminNews(id, newsData);
      updatePost(updated);
      return updated;
    } catch (err) {
      setError(err?.message || "Cập nhật bài viết thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdminNews(id);
      deletePost(id);
      return true;
    } catch (err) {
      setError(err?.message || "Xoá bài viết thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
    loadNews,
    createPost,
    editPost,
    removePost,
  };
}
