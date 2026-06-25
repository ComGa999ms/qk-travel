import React, { useEffect, useMemo, useState } from "react";
import crawlJobService from "../../services/crawlJobService";

const statusStyles = {
  Pending: "bg-gray-100 text-gray-700",
  Running: "bg-blue-100 text-blue-700",
  Success: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
  PartialSuccess: "bg-yellow-100 text-yellow-700",
};

const logStyles = {
  Info: "text-gray-700",
  Warning: "text-yellow-700",
  Error: "text-red-700",
};

const sourceOptions = [
  { value: "VietnamTravel", label: "Vietnam Travel" },
  { value: "Wikivoyage", label: "Wikivoyage" },
];

const typeOptions = [
  { value: "Destination", label: "Điểm tham quan" },
  { value: "Hotel", label: "Khách sạn" },
  { value: "Restaurant", label: "Nhà hàng" },
  { value: "Activity", label: "Trải nghiệm" },
  { value: "Tour", label: "Tour" },
];

const AdminCrawlJobs = () => {
  const [formData, setFormData] = useState({
    source: "VietnamTravel",
    locationName: "Da Nang",
    itemType: "Destination",
    maxItems: 10,
  });
  const [jobs, setJobs] = useState([]);
  const [items, setItems] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const runningJobIds = useMemo(
    () =>
      jobs
        .filter((job) => job.status === "Pending" || job.status === "Running")
        .map((job) => job.id),
    [jobs],
  );

  const loadJobs = async () => {
    const result = await crawlJobService.getJobs(1, 10);
    setJobs(result.items || []);
  };

  const loadItems = async (jobId = selectedJob?.id) => {
    const result = await crawlJobService.getItems({
      jobId,
      page: 1,
      pageSize: 20,
    });
    setItems(result.items || []);
  };

  const loadLogs = async (jobId = selectedJob?.id) => {
    if (!jobId) {
      setLogs([]);
      return;
    }
    const result = await crawlJobService.getLogs(jobId);
    setLogs(result || []);
  };

  const refreshAll = async () => {
    try {
      setLoading(true);
      await loadJobs();
      await Promise.all([loadItems(), loadLogs()]);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải dữ liệu crawl");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  useEffect(() => {
    if (runningJobIds.length === 0) return;
    const timer = setInterval(() => {
      refreshAll();
    }, 3000);
    return () => clearInterval(timer);
  }, [runningJobIds.join(",")]);

  const handleCreateJob = async (event) => {
    event.preventDefault();
    setError("");
    setCreating(true);

    try {
      const job = await crawlJobService.createJob({
        ...formData,
        maxItems: Number(formData.maxItems),
      });
      setSelectedJob(job);
      await refreshAll();
    } catch (err) {
      setError(err.response?.data?.message || "Tạo crawl job thất bại");
    } finally {
      setCreating(false);
    }
  };

  const handleSelectJob = async (job) => {
    setSelectedJob(job);
    await Promise.all([loadLogs(job.id), loadItems(job.id)]);
  };

  const handleToggleApproval = async (item) => {
    await crawlJobService.updateApproval(item.id, !item.isApproved);
    await loadItems();
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Xóa dữ liệu "${item.title}"?`)) return;
    await crawlJobService.deleteItem(item.id);
    await loadItems();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Data Crawling Center
          </h1>
          <p className="text-gray-600 mt-1">
            Thu thập dữ liệu du lịch bằng Selenium để làm nguồn cho AI Planner
          </p>
        </div>
        <button
          onClick={refreshAll}
          className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          disabled={loading}
        >
          <i className={`fas fa-sync-alt mr-2 ${loading ? "fa-spin" : ""}`}></i>
          Làm mới
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Tạo crawl job
          </h2>

          <form className="space-y-4" onSubmit={handleCreateJob}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nguồn dữ liệu
              </label>
              <select
                value={formData.source}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, source: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tỉnh/thành hoặc từ khóa
              </label>
              <input
                value={formData.locationName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    locationName: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Da Nang, Ha Noi, Can Tho..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loại dữ liệu
              </label>
              <select
                value={formData.itemType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    itemType: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số item tối đa
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.maxItems}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxItems: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full rounded-lg bg-primary-600 text-white py-3 font-semibold hover:bg-primary-700 disabled:opacity-60"
            >
              {creating ? "Đang tạo job..." : "Bắt đầu crawl"}
            </button>
          </form>
        </section>

        <section className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Lịch sử crawl
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Nguồn</th>
                  <th className="py-3 pr-4">Địa điểm</th>
                  <th className="py-3 pr-4">Trạng thái</th>
                  <th className="py-3 pr-4">Items</th>
                  <th className="py-3 pr-4">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => handleSelectJob(job)}
                    className={`border-b cursor-pointer hover:bg-gray-50 ${
                      selectedJob?.id === job.id ? "bg-primary-50" : ""
                    }`}
                  >
                    <td className="py-3 pr-4 font-semibold">#{job.id}</td>
                    <td className="py-3 pr-4">{job.source}</td>
                    <td className="py-3 pr-4">{job.locationName}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[job.status] || statusStyles.Pending
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {job.successItems}/{job.totalItems || job.maxItems}
                    </td>
                    <td className="py-3 pr-4 text-gray-500">
                      {new Date(job.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Chưa có crawl job nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Log job {selectedJob ? `#${selectedJob.id}` : ""}
          </h2>
          <div className="h-[420px] overflow-y-auto rounded-lg bg-gray-950 p-4 text-sm font-mono">
            {logs.map((log) => (
              <div key={log.id} className="mb-3">
                <span className="text-gray-500">
                  {new Date(log.createdAt).toLocaleTimeString("vi-VN")}
                </span>{" "}
                <span className={logStyles[log.level] || "text-gray-300"}>
                  [{log.level}]
                </span>{" "}
                <span className="text-gray-100">{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-gray-400">Chọn một job để xem log.</p>
            )}
          </div>
        </section>

        <section className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Dữ liệu đã crawl
          </h2>
          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {items.map((item) => (
              <article
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex gap-4"
              >
                <div className="w-28 h-24 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <i className="fas fa-image text-2xl"></i>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.sourceName} · {item.type} ·{" "}
                        {new Date(item.fetchedAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.isApproved ? "Approved" : "Rejected"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.description || "Chưa có mô tả"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      Xem nguồn
                    </a>
                    <button
                      onClick={() => handleToggleApproval(item)}
                      className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      {item.isApproved ? "Reject" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {items.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                Chưa có dữ liệu cho job đang chọn
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminCrawlJobs;
