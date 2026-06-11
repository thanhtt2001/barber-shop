const LOCAL_STORAGE_KEY = "barberpro_admin_news";

const defaultNews = [
  {
    id: "top-5-kieu-toc-nam-undercut-dep-nhat-2026",
    title: "Top 5 Kiểu Tóc Nam Undercut Đẹp Nhất Xu Hướng 2026",
    category: "Xu hướng tóc",
    summary: "Tổng hợp những biến thể tóc undercut thời thượng, lịch lãm và dễ tạo kiểu nhất mà bạn không thể bỏ qua trong năm nay.",
    content: "Kiểu tóc Undercut chưa bao giờ hạ nhiệt và tiếp tục thống trị xu hướng tóc nam 2026. Điểm cộng lớn nhất của Undercut là phần gáy và hai bên được cắt sát gọn gàng giúp tôn lên đường nét nam tính trên khuôn mặt, trong khi phần tóc phía trên có thể biến tấu đa dạng từ Pompadour cổ điển, Slick Back bóng bẩy cho đến những kiểu Messy Quiff hiện đại trẻ trung.\n\nTại BarberPro, chúng tôi gợi ý cho bạn 5 biến thể Undercut cực hot sau đây:\n1. Disconnected Undercut: Sự tương phản rõ rệt giữa phần tóc dài phía trên và phần cạo sát xung quanh tạo nên vẻ cá tính độc đáo.\n2. Pompadour Undercut: Tăng thêm độ phồng và chiều cao cho tóc, mang lại phong thái quý ông lịch lãm quý phái.\n3. Textured Undercut: Cắt tỉa nhiều lớp tạo hiệu ứng tự nhiên, phù hợp với các bạn trẻ năng động thích tạo kiểu hàng ngày.\n4. Short Quiff Undercut: Kiểu tóc ngắn gọn nhẹ, mát mẻ cho mùa hè nhưng vẫn giữ được nét thanh lịch.\n5. Side Part Undercut: Chia ngôi 7/3 kết hợp undercut mang lại diện mạo chín chắn, công sở sang trọng.\n\nĐể giữ nếp hoàn hảo cho các kiểu tóc này, bạn nên chọn các dòng sáp Matte Clay có độ giữ nếp từ High trở lên và sấy định hình trước khi vuốt.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80",
    author: "Minh Trí Barber",
    publishedAt: "2026-06-01",
    isFeatured: true,
    status: "active",
  },
  {
    id: "cach-cham-soc-va-giu-nep-toc-nam-khi-dung-sap-pomade",
    title: "Cách Chăm Sóc Và Giữ Nếp Tóc Nam Khi Sử Dụng Sáp Pomade",
    category: "Bí quyết tóc",
    summary: "Hướng dẫn chi tiết từ các chuyên gia BarberPro giúp bạn lựa chọn, vuốt sáp Pomade đúng cách và gội rửa sạch sẽ bảo vệ da đầu.",
    content: "Pomade là dòng sản phẩm tạo kiểu tóc kinh đoán dành cho những quý ông yêu thích sự bóng bẩy và lịch lãm. Tuy nhiên, không phải ai cũng biết cách sử dụng và gội rửa sạch sẽ để tóc không bị bết rít hay rụng tóc.\n\nDưới đây là cẩm nang hướng dẫn chi tiết từ các thợ cắt chính tại BarberPro:\n\nBước 1: Chọn đúng loại Pomade. Nếu bạn thích bóng cao và dễ gội rửa, hãy ưu tiên các dòng Pomade gốc nước (Water-based). Nếu bạn cần độ giữ nếp cực cao chống chọi gió bụi, Pomade gốc dầu (Oil-based) là lựa chọn tối ưu nhưng sẽ khó gội sạch hơn một chút.\n\nBước 2: Lấy lượng sáp vừa đủ. Lấy khoảng nửa đốt ngón tay sáp Pomade, xoa đều hai lòng bàn tay cho đến khi sáp ấm lên và tan hoàn toàn.\n\nBước 3: Vuốt đều lên tóc từ gáy ra phía trước, sau đó từ trên xuống dưới. Dùng lược chuyên dụng (lược răng thưa hoặc lược răng khít) để chải tạo nếp theo phom mong muốn.\n\nBước 4: Cách gội sạch Pomade gốc dầu. Đừng gội bằng nước ấm ngay. Hãy thoa dầu xả lên tóc khô trước để các chất dầu trong dầu xả hòa tan lớp pomade gốc dầu, massage nhẹ nhàng trong 3 phút rồi xả nước. Sau đó mới dùng dầu gội thường để gội lại sạch hoàn toàn.\n\nHãy chăm sóc tóc bằng dầu dưỡng chuyên sâu mỗi tuần 1-2 lần để duy trì độ ẩm tự nhiên cho mái tóc luôn bồng bềnh khỏe mạnh!",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    author: "Hoàng Nam Stylist",
    publishedAt: "2026-06-04",
    isFeatured: false,
    status: "active",
  },
  {
    id: "xu-huong-nhuom-toc-nam-lay-mau-khoi-va-bach-kim-nam-nay",
    title: "Xu Hướng Nhuộm Tóc Nam Tông Màu Khói Và Bạch Kim Siêu Hot",
    category: "Xu hướng tóc",
    summary: "Nổi bật phong cách cá tính mạnh mẽ với những tông màu nhuộm tẩy hot nhất hiện nay tại các salon tóc nam.",
    content: "Nếu những tông màu trầm như nâu hạt dẻ, nâu đồng đã quá quen thuộc, thì màu xám khói, xanh đen khói và bạch kim chính là tuyên ngôn cá tính mạnh mẽ nhất của phái mạnh trong năm nay.\n\nTuy nhiên, để có một mái tóc màu khói rực rỡ và bền màu, bạn cần lưu ý một số điểm cực kỳ quan trọng:\n- Bắt buộc phải tẩy tóc: Tông màu sáng yêu cầu tẩy tóc từ 2 đến 3 lần tùy vào chất tóc khỏe hay yếu để nền tóc đạt level 9-10. Quá trình này có thể gây xót da đầu nhẹ, hãy thông báo ngay với barber nếu bạn có da đầu quá nhạy cảm.\n- Sử dụng dầu gội tím: Để tránh tóc bị xỉn màu vàng đồng sau vài lần gội, việc dùng dầu gội tím khử vàng chuyên dụng là bắt buộc. Dầu gội tím giúp duy trì ánh khói sang chảnh lâu hơn.\n- Dưỡng tóc phục hồi: Việc tẩy nhuộm làm mất đi lớp sừng bảo vệ tóc. Hãy bổ sung tinh dầu dưỡng tóc (Argan oil) sau khi sấy tóc để giữ độ ẩm, tránh tình trạng tóc xơ rối như rơm.\n\nĐến với BarberPro, bạn sẽ được tư vấn kỹ lưỡng về chất tóc trước khi nhuộm tẩy để đảm bảo phom dáng tóc vẫn giữ được sự chắc khỏe sau khi hoàn thiện màu nhuộm trong mơ!",
    image: "https://images.unsplash.com/photo-1605497746444-ac9dbd324ce8?w=800&auto=format&fit=crop&q=80",
    author: "Khánh Duy Barber",
    publishedAt: "2026-06-05",
    isFeatured: true,
    status: "active",
  }
];

const getStoredNews = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultNews));
    return defaultNews;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultNews;
  }
};

const saveNews = (news) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(news));
};

export async function fetchAdminNews() {
  await new Promise((r) => setTimeout(r, 400));
  return getStoredNews();
}

export async function createAdminNews(newsData) {
  await new Promise((r) => setTimeout(r, 500));
  const newsList = getStoredNews();

  const newPost = {
    ...newsData,
    id: newsData.title.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, ""),
    publishedAt: new Date().toISOString().split("T")[0],
    isFeatured: !!newsData.isFeatured,
    author: newsData.author || "Admin BarberPro",
  };

  // Avoid duplicate ID
  if (newsList.some((n) => n.id === newPost.id) || !newPost.id) {
    newPost.id = `${newPost.id || "post"}-${Date.now()}`;
  }

  newsList.push(newPost);
  saveNews(newsList);
  return newPost;
}

export async function updateAdminNews(id, newsData) {
  await new Promise((r) => setTimeout(r, 500));
  const newsList = getStoredNews();
  const index = newsList.findIndex((n) => n.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy bài viết");
  }

  const updatedPost = {
    ...newsList[index],
    ...newsData,
    isFeatured: !!newsData.isFeatured,
  };

  newsList[index] = updatedPost;
  saveNews(newsList);
  return updatedPost;
}

export async function deleteAdminNews(id) {
  await new Promise((r) => setTimeout(r, 400));
  const newsList = getStoredNews();
  const filtered = newsList.filter((n) => n.id !== id);
  saveNews(filtered);
  return { success: true };
}
