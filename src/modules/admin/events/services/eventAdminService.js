const LOCAL_STORAGE_KEY = "barberpro_admin_events";

const defaultEvents = [
  {
    id: "cuoi-tuan-ron-rang",
    title: "Giảm Ngay 20% Tổng Hóa Đơn Khi Đặt Lịch Online Cuối Tuần",
    description: "Chuẩn bị cho một tuần mới đầy hứng khởi! Nhận ngay ưu đãi giảm giá 20% cho tất cả các dịch vụ (bao gồm cả Combo VIP và các dịch vụ hóa chất uốn/nhuộm) khi quý khách đặt lịch trước trên website. Hệ thống sẽ tự động áp dụng chiết khấu tại quầy thanh toán.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    badgeText: "Khuyến Mãi Hot",
    isHot: true,
    isUpcoming: false,
    timeText: "Thứ Bảy - Chủ Nhật tuần này",
    status: "active",
  },
  {
    id: "khai-truong-co-so-moi",
    title: "Khai Trương Cơ Sở Quận 3 - Tặng Combo Chăm Sóc Da Mặt VIP",
    description: "BarberPro chính thức khai trương cơ sở thứ 4 tại Quận 3! Trong tuần lễ khai trương, mọi khách hàng sử dụng dịch vụ cắt tóc đều được tặng kèm gói combo chăm sóc da mặt bằng đá nóng và đắp mặt nạ đất sét hoàn toàn miễn phí.",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80",
    badgeText: "Sắp Diễn Ra",
    isHot: false,
    isUpcoming: true,
    timeText: "Từ ngày 15/06 đến 22/06",
    status: "active",
  }
];

const getStoredEvents = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultEvents;
  }
};

const saveEvents = (events) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
};

export async function fetchAdminEvents() {
  await new Promise((r) => setTimeout(r, 400));
  return getStoredEvents();
}

export async function createAdminEvent(eventData) {
  await new Promise((r) => setTimeout(r, 500));
  const eventsList = getStoredEvents();

  const newEvent = {
    ...eventData,
    id: eventData.title.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, ""),
    isHot: !!eventData.isHot,
    isUpcoming: !!eventData.isUpcoming,
  };

  // Avoid duplicate ID
  if (eventsList.some((e) => e.id === newEvent.id) || !newEvent.id) {
    newEvent.id = `${newEvent.id || "event"}-${Date.now()}`;
  }

  eventsList.push(newEvent);
  saveEvents(eventsList);
  return newEvent;
}

export async function updateAdminEvent(id, eventData) {
  await new Promise((r) => setTimeout(r, 500));
  const eventsList = getStoredEvents();
  const index = eventsList.findIndex((e) => e.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy sự kiện");
  }

  const updatedEvent = {
    ...eventsList[index],
    ...eventData,
    isHot: !!eventData.isHot,
    isUpcoming: !!eventData.isUpcoming,
  };

  eventsList[index] = updatedEvent;
  saveEvents(eventsList);
  return updatedEvent;
}

export async function deleteAdminEvent(id) {
  await new Promise((r) => setTimeout(r, 400));
  const eventsList = getStoredEvents();
  const filtered = eventsList.filter((e) => e.id !== id);
  saveEvents(filtered);
  return { success: true };
}
