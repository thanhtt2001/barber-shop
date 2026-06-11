const LOCAL_STORAGE_KEY = "barberpro_admin_gallery";

const defaultPhotos = [
  {
    id: 1,
    title: "Classic Undercut",
    description: "Kiểu tóc undercut cổ điển lịch lãm với phần tóc hai bên cắt ngắn gọn gàng, mái vuốt ngược bảnh bao.",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    stylist: "Alex Barber",
    faceShape: "Mặt vuông",
    hairType: "Tóc dày",
    uploadDate: "2026-06-01",
    source: "upload"
  },
  {
    id: 2,
    title: "Modern Fade Crop",
    description: "Sự kết hợp hoàn hảo giữa kỹ thuật Fade hai bên sắc nét và mái bằng cắt ngắn ngố tỉa Layer trẻ trung.",
    url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80",
    stylist: "Huy Barber",
    faceShape: "Mặt tròn",
    hairType: "Tóc mỏng",
    uploadDate: "2026-06-02",
    source: "upload"
  },
  {
    id: 3,
    title: "Korean Side Part",
    description: "Mẫu tóc Side Part rủ 7/3 được uốn phồng chân tóc tạo độ lãng tử tự nhiên mang phong cách Hàn Quốc.",
    url: "https://images.unsplash.com/photo-1605497746444-ac9dbd39f69c?w=600&auto=format&fit=crop&q=80",
    stylist: "Alex Barber",
    faceShape: "Mặt trái xoan",
    hairType: "Tóc mềm",
    uploadDate: "2026-06-03",
    source: "facebook"
  },
  {
    id: 4,
    title: "Textured Fringe",
    description: "Mái ngố tỉa nhọn tạo nếp Textured phá cách, mang đến vẻ ngoài năng động cho học sinh, sinh viên.",
    url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
    stylist: "Hùng Barber",
    faceShape: "Mặt dài",
    hairType: "Tóc mềm",
    uploadDate: "2026-06-03",
    source: "upload"
  },
  {
    id: 5,
    title: "Buzz Cut Skin Fade",
    description: "Mẫu tóc cua ngắn cắt sát mạnh mẽ kết hợp kỹ thuật cạo trắng chân tóc (Skin Fade) mát mẻ đầy cá tính.",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    stylist: "Huy Barber",
    faceShape: "Mặt trái xoan",
    hairType: "Tất cả",
    uploadDate: "2026-06-04",
    source: "upload"
  }
];

// Read from LocalStorage
function getPhotosFromStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultPhotos));
    return defaultPhotos;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultPhotos;
  }
}

// Write to LocalStorage
function savePhotosToStorage(photos) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
}

// Helper to convert File to Base64
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/** GET /api/admin/photos */
export async function fetchAdminPhotos() {
  await new Promise((r) => setTimeout(r, 400));
  return getPhotosFromStorage();
}

/** DELETE /api/admin/photos/:id */
export async function deleteAdminPhoto(id) {
  await new Promise((r) => setTimeout(r, 300));
  const photos = getPhotosFromStorage();
  const filtered = photos.filter((p) => String(p.id) !== String(id));
  savePhotosToStorage(filtered);
  return { success: true };
}

/** POST or PUT /api/admin/photos */
export async function saveAdminPhoto(photoData) {
  await new Promise((r) => setTimeout(r, 500));
  const photos = getPhotosFromStorage();

  if (photoData.id) {
    // Edit existing photo
    const index = photos.findIndex((p) => String(p.id) === String(photoData.id));
    if (index !== -1) {
      photos[index] = {
        ...photos[index],
        ...photoData,
        uploadDate: photos[index].uploadDate || new Date().toISOString().split("T")[0]
      };
      savePhotosToStorage(photos);
      return photos[index];
    }
  }

  // Create new photo
  const newPhoto = {
    ...photoData,
    id: photoData.id || Date.now(),
    uploadDate: new Date().toISOString().split("T")[0],
    source: photoData.source || "upload"
  };
  photos.push(newPhoto);
  savePhotosToStorage(photos);
  return newPhoto;
}

/** POST /api/admin/photos (Batch upload compatibility) */
export async function uploadAdminPhoto(file) {
  await new Promise((r) => setTimeout(r, 600));
  const base64Url = await fileToBase64(file);
  const newPhoto = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: file.name.split(".")[0].replace(/[-_]/g, " "),
    description: `Mẫu tóc đăng tải ngày ${new Date().toLocaleDateString("vi-VN")}`,
    url: base64Url,
    stylist: "Alex Barber", // default
    faceShape: "Tất cả",
    hairType: "Tất cả",
    uploadDate: new Date().toISOString().split("T")[0],
    source: "upload"
  };

  const photos = getPhotosFromStorage();
  photos.push(newPhoto);
  savePhotosToStorage(photos);
  return newPhoto;
}
