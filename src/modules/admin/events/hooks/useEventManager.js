import { useCallback } from "react";
import useEventAdminStore from "../store/eventAdminStore";
import {
  fetchAdminEvents,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
} from "../services/eventAdminService";

export default function useEventManager() {
  const {
    events,
    loading,
    error,
    setEvents,
    setLoading,
    setError,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useEventAdminStore();

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminEvents();
      setEvents(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách sự kiện");
    } finally {
      setLoading(false);
    }
  }, [setEvents, setLoading, setError]);

  const createEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const newEvent = await createAdminEvent(eventData);
      addEvent(newEvent);
      return newEvent;
    } catch (err) {
      setError(err?.message || "Tạo sự kiện thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editEvent = async (id, eventData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdminEvent(id, eventData);
      updateEvent(updated);
      return updated;
    } catch (err) {
      setError(err?.message || "Cập nhật sự kiện thất bại");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdminEvent(id);
      deleteEvent(id);
      return true;
    } catch (err) {
      setError(err?.message || "Xoá sự kiện thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    loadEvents,
    createEvent,
    editEvent,
    removeEvent,
  };
}
