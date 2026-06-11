import { useCallback } from "react";
import useServiceAdminStore from "../store/serviceAdminStore";
import {
  fetchAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from "../services/serviceAdminService";

export default function useServiceManager() {
  const {
    services,
    loading,
    error,
    setServices,
    setLoading,
    setError,
    addService,
    updateService,
    deleteService,
  } = useServiceAdminStore();

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminServices();
      setServices(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  }, [setServices, setLoading, setError]);

  const createService = async (serviceData) => {
    setLoading(true);
    setError(null);
    try {
      const newService = await createAdminService(serviceData);
      addService(newService);
      return newService;
    } catch (err) {
      setError(err?.message || "Tạo dịch vụ thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editService = async (id, serviceData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdminService(id, serviceData);
      updateService(updated);
      return updated;
    } catch (err) {
      setError(err?.message || "Cập nhật dịch vụ thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeService = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdminService(id);
      deleteService(id);
      return true;
    } catch (err) {
      setError(err?.message || "Xoá dịch vụ thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    loading,
    error,
    loadServices,
    createService,
    editService,
    removeService,
  };
}
