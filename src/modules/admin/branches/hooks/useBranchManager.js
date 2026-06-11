import { useCallback } from "react";
import useBranchAdminStore from "../store/branchAdminStore";
import {
  fetchAdminBranches,
  createAdminBranch,
  updateAdminBranch,
  deleteAdminBranch,
} from "../services/branchAdminService";

export default function useBranchManager() {
  const {
    branches,
    loading,
    error,
    setBranches,
    setLoading,
    setError,
    addBranch,
    updateBranch,
    deleteBranch,
  } = useBranchAdminStore();

  const loadBranches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminBranches();
      setBranches(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách chi nhánh");
    } finally {
      setLoading(false);
    }
  }, [setBranches, setLoading, setError]);

  const createBranch = async (branchData) => {
    setLoading(true);
    setError(null);
    try {
      const newBranch = await createAdminBranch(branchData);
      addBranch(newBranch);
      return newBranch;
    } catch (err) {
      setError(err?.message || "Tạo chi nhánh thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editBranch = async (id, branchData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdminBranch(id, branchData);
      updateBranch(updated);
      return updated;
    } catch (err) {
      setError(err?.message || "Cập nhật chi nhánh thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeBranch = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdminBranch(id);
      deleteBranch(id);
      return true;
    } catch (err) {
      setError(err?.message || "Xoá chi nhánh thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    branches,
    loading,
    error,
    loadBranches,
    createBranch,
    editBranch,
    removeBranch,
  };
}
