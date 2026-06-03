import * as XLSX from "xlsx";

export const exportUsersToExcel = (users) => {
  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return createdAt;

    const pad = (value) => String(value).padStart(2, "0");
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const rows = (users || []).map((user) => ({
    fullName: `${user.lastName || ""} ${user.firstName || ""}`.trim(),
    email: user.email || "",
    subscriptionPlan: user.subscriptionPlan || "Basic",
    createdAt: formatCreatedAt(user.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: ["fullName", "email", "subscriptionPlan", "createdAt"],
  });
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const fileName = `users_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}.xlsx`;

  XLSX.writeFile(workbook, fileName);
};
