import { services as defaultServices } from "@/modules/public/services/data/services.data";

const LOCAL_STORAGE_KEY = "barberpro_admin_services";

// Helper to initialize data from public services if localStorage is empty
const getStoredServices = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultServices));
    return defaultServices;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultServices;
  }
};

const saveServices = (services) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services));
};

export async function fetchAdminServices() {
  await new Promise((r) => setTimeout(r, 400));
  return getStoredServices();
}

export async function createAdminService(serviceData) {
  await new Promise((r) => setTimeout(r, 500));
  const services = getStoredServices();

  const newService = {
    ...serviceData,
    id: serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    price: Number(serviceData.price),
    duration: Number(serviceData.duration),
    popular: !!serviceData.popular,
  };

  // Avoid duplicate ID
  if (services.some((s) => s.id === newService.id)) {
    newService.id = `${newService.id}-${Date.now()}`;
  }

  services.push(newService);
  saveServices(services);
  return newService;
}

export async function updateAdminService(id, serviceData) {
  await new Promise((r) => setTimeout(r, 500));
  const services = getStoredServices();
  const index = services.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy dịch vụ");
  }

  const updatedService = {
    ...services[index],
    ...serviceData,
    price: Number(serviceData.price),
    duration: Number(serviceData.duration),
    popular: !!serviceData.popular,
  };

  services[index] = updatedService;
  saveServices(services);
  return updatedService;
}

export async function deleteAdminService(id) {
  await new Promise((r) => setTimeout(r, 400));
  const services = getStoredServices();
  const filtered = services.filter((s) => s.id !== id);
  saveServices(filtered);
  return { success: true };
}
