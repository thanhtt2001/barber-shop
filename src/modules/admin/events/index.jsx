import { useEffect, useState } from "react";
import useEventManager from "./hooks/useEventManager";
import EventTable from "./components/EventTable";
import EventFormModal from "./components/EventFormModal";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";
import Select from "@/shared/components/ui/Select";
import { Plus, Search } from "lucide-react";

export default function EventsAdminPage() {
  const {
    events,
    loading,
    error,
    loadEvents,
    createEvent,
    editEvent,
    removeEvent,
  } = useEventManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleCreateTrigger = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEditTrigger = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sự kiện này không?")) {
      await removeEvent(id);
    }
  };

  const handleSubmit = async (data) => {
    let result;
    if (selectedEvent) {
      result = await editEvent(selectedEvent.id, data);
    } else {
      result = await createEvent(data);
    }
    return !!result;
  };

  // Filter events by type (hot, upcoming, all), status (active, inactive) and search query
  const filteredEvents = events.filter((event) => {
    // Status filter
    const matchesStatus =
      selectedStatus === "all" || event.status === selectedStatus;

    // Type filter
    let matchesType = true;
    if (selectedFilter === "hot") {
      matchesType = !!event.isHot;
    } else if (selectedFilter === "upcoming") {
      matchesType = !!event.isUpcoming;
    }

    // Search query filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.timeText && event.timeText.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Quản lý sự kiện</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các chương trình ưu đãi, khuyến mãi, sự kiện sắp diễn ra hoặc đang hot của tiệm tóc.
          </p>
        </div>
        <div>
          <Button
            onClick={handleCreateTrigger}
            variant="brand"
            className="inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Thêm sự kiện
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Panel */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Left: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFilter("all")}
            className={[
              "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150",
              selectedFilter === "all"
                ? "bg-brand text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
            ].join(" ")}
          >
            Tất cả loại
          </button>
          <button
            onClick={() => setSelectedFilter("hot")}
            className={[
              "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150",
              selectedFilter === "hot"
                ? "bg-red-500 text-white shadow-sm"
                : "text-gray-500 hover:text-red-500 hover:bg-red-50/50",
            ].join(" ")}
          >
            🔥 Đang Hot
          </button>
          <button
            onClick={() => setSelectedFilter("upcoming")}
            className={[
              "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150",
              selectedFilter === "upcoming"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-gray-500 hover:text-sky-500 hover:bg-sky-50/50",
            ].join(" ")}
          >
            ⏳ Sắp diễn ra
          </button>

          <span className="h-4 w-px bg-gray-200 mx-1 hidden sm:block" />

          <div className="w-full sm:w-44">
            <Select
              placeholder=""
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "active", label: "Hoạt động" },
                { value: "inactive", label: "Tạm ngưng" },
              ]}
              className="py-1.5 px-3 text-xs rounded-lg border-gray-200 text-gray-600 bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        {/* Right: Search Input */}
        <div className="relative w-full md:max-w-xs flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50/70 border border-gray-250 rounded-full focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 transition-all outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Events Table Card */}
      <Card className="p-6">
        <EventTable
          events={filteredEvents}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
        />
      </Card>

      {/* Event Form Modal */}
      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
