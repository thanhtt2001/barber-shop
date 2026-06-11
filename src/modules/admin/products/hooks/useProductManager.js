import { useCallback } from "react";
import useProductAdminStore from "../store/productAdminStore";
import {
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../services/productAdminService";

export default function useProductManager() {
  const {
    products,
    loading,
    error,
    setProducts,
    setLoading,
    setError,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductAdminStore();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminProducts();
      setProducts(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading, setError]);

  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await createAdminProduct(productData);
      addProduct(newProduct);
      return newProduct;
    } catch (err) {
      setError(err?.message || "Tạo sản phẩm thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdminProduct(id, productData);
      updateProduct(updated);
      return updated;
    } catch (err) {
      setError(err?.message || "Cập nhật sản phẩm thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdminProduct(id);
      deleteProduct(id);
      return true;
    } catch (err) {
      setError(err?.message || "Xoá sản phẩm thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    editProduct,
    removeProduct,
  };
}
