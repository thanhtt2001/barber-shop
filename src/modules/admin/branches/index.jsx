import { useEffect, useState } from "react";
import useBranchManager from "./hooks/useBranchManager";
import BranchTable from "./components/BranchTable";
import BranchFormModal from "./components/BranchFormModal";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";

export default function BranchesAdminPage() {
  const {
    branches,
    loading,
    error,
    loadBranches,
    createBranch,
    editBranch,
    removeBranch,
  } = useBranchManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    loadBranches();
  }, [loadBranches]);

  const handleCreateTrigger = () => {
    setSelectedBranch(null);
    setIsModalOpen(true);
  };

  const handleEditTrigger = (branch) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá chi nhánh này không?")) {
      await removeBranch(id);
    }
  };

  const handleSubmit = async (data) => {
    let result;
    if (selectedBranch) {
      result = await editBranch(selectedBranch.id, data);
    } else {
      result = await createBranch(data);
    }
    return !!result;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý chi nhánh</h1>
          <p className="text-sm text-gray-500 mt-1">
            Xem và cấu hình thông tin liên hệ, giờ mở cửa và bản đồ định vị của các salon trong chuỗi.
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
            Thêm chi nhánh
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      <Card className="p-6">
        <BranchTable
          branches={branches}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
        />
      </Card>

      <BranchFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branch={selectedBranch}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
