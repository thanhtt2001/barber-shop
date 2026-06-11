import { branches as defaultBranches } from "@/modules/public/branches/data/branches.data";

const LOCAL_STORAGE_KEY = "barberpro_admin_branches";

// Helper to initialize data from public branches if localStorage is empty
const getStoredBranches = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultBranches));
    return defaultBranches;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultBranches;
  }
};

const saveBranches = (branches) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(branches));
};

export async function fetchAdminBranches() {
  await new Promise((r) => setTimeout(r, 400));
  return getStoredBranches();
}

export async function createAdminBranch(branchData) {
  await new Promise((r) => setTimeout(r, 500));
  const branches = getStoredBranches();

  const newBranch = {
    ...branchData,
    id: branchData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  };

  // Avoid duplicate ID
  if (branches.some((b) => b.id === newBranch.id)) {
    newBranch.id = `${newBranch.id}-${Date.now()}`;
  }

  branches.push(newBranch);
  saveBranches(branches);
  return newBranch;
}

export async function updateAdminBranch(id, branchData) {
  await new Promise((r) => setTimeout(r, 500));
  const branches = getStoredBranches();
  const index = branches.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy chi nhánh");
  }

  const updatedBranch = {
    ...branches[index],
    ...branchData,
  };

  branches[index] = updatedBranch;
  saveBranches(branches);
  return updatedBranch;
}

export async function deleteAdminBranch(id) {
  await new Promise((r) => setTimeout(r, 400));
  const branches = getStoredBranches();
  const filtered = branches.filter((b) => b.id !== id);
  saveBranches(filtered);
  return { success: true };
}
