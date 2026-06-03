using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QkTravelApi.Common.Constants;
using QkTravelApi.Common.Extensions;
using QkTravelApi.DTOs.Common;
using QkTravelApi.DTOs.Audit;
using QkTravelApi.Services.Audit;

namespace QkTravelApi.Controllers
{
    [Route("api/audit-logs")]
    [ApiController]
    [Authorize(Roles = AppRoles.Admin)]
    public class AuditLogsController : ControllerBase
    {
        private readonly IAuditLogService _auditLogService;

        public AuditLogsController(IAuditLogService auditLogService)
        {
            _auditLogService = auditLogService;
        }

        /// <summary>
        /// Get audit logs with filtering and pagination
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAuditLogs(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? userId = null,
            [FromQuery] string? action = null,
            [FromQuery] string? entityName = null,
            [FromQuery] DateTime? fromDate = null,
            [FromQuery] DateTime? toDate = null)
        {
            var result = await _auditLogService.GetAuditLogsAsync(page, pageSize, userId, action, entityName, fromDate, toDate);
            return this.Success(result, "Audit logs retrieved successfully");
        }
    }
}
