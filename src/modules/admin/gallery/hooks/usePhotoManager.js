import { useState, useEffect, useCallback } from "react";
import { fetchAdminPhotos, deleteAdminPhoto, uploadAdminPhoto, saveAdminPhoto } from "../services/galleryAdminService";

export default function usePhotoManager() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminPhotos();
      setPhotos(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách ảnh");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const removePhoto = async (id) => {
    try {
      await deleteAdminPhoto(id);
      setPhotos((prev) => prev.filter((p) => String(p.id) !== String(id)));
      return true;
    } catch (err) {
      setError(err?.message || "Xoá ảnh thất bại");
      return false;
    }
  };

  const addPhoto = async (file) => {
    try {
      const photo = await uploadAdminPhoto(file);
      setPhotos((prev) => [...prev, photo]);
      return photo;
    } catch (err) {
      setError(err?.message || "Upload ảnh thất bại");
      return null;
    }
  };

  const createPhoto = async (photoData) => {
    try {
      const photo = await saveAdminPhoto(photoData);
      setPhotos((prev) => [...prev, photo]);
      return photo;
    } catch (err) {
      setError(err?.message || "Thêm mẫu tóc thất bại");
      return null;
    }
  };

  const editPhoto = async (photoData) => {
    try {
      const photo = await saveAdminPhoto(photoData);
      setPhotos((prev) =>
        prev.map((p) => (String(p.id) === String(photo.id) ? photo : p))
      );
      return photo;
    } catch (err) {
      setError(err?.message || "Cập nhật mẫu tóc thất bại");
      return null;
    }
  };

  return {
    photos,
    loading,
    error,
    removePhoto,
    addPhoto,
    createPhoto,
    editPhoto,
    refetch: loadPhotos
  };
}
