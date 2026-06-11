import { useEffect, useState } from "react";
import useServiceManager from "./hooks/useServiceManager";
import ServiceTable from "./components/ServiceTable";
import ServiceFormModal from "./components/ServiceFormModal";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";

export default function ServicesAdminPage() {
  const {
    services,
    loading,
    error,
    loadServices,
    createService,
    editService,
    removeService,
  } = useServiceManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleCreateTrigger = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEditTrigger = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá dịch vụ này không?")) {
      await removeService(id);
    }
  };

  const handleSubmit = async (data) => {
    let result;
    if (selectedService) {
      result = await editService(selectedService.id, data);
    } else {
      result = await createService(data);
    }
    return !!result;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ</h1>
          <p className="text-sm text-gray-500 mt-1">
            Xem, thêm mới, sửa đổi hoặc xóa các dịch vụ cắt, uốn, nhuộm của salon.
          </p>
        </div>
        <div>
          <Button
            onClick={handleCreateTrigger}
            variant="brand"
            className="inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm dịch vụ
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      <Card className="p-6">
        <ServiceTable
          services={services}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
        />
      </Card>

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
