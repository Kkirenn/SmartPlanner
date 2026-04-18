using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartPlanner.Services;
using System.Security.Claims;

namespace SmartPlanner.Controllers
{
    [ApiController]
    [Route("api/assignment")]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentService _assignment;

        public AssignmentController(IAssignmentService assignment)
        {
            _assignment = assignment;
        }

        [Authorize(Roles = "Leader")]
        [HttpGet("developer/{devId}")]
        public async Task<IActionResult> GetByDeveloper(Guid devId)
        {
            var tasks = await _assignment.GetTasksByDeveloperAsync(devId);
            return Ok(tasks);
        }

        [Authorize(Roles = "Leader")]
        [HttpGet("unassigned")]
        public async Task<IActionResult> GetUnassigned()
        {
            var tasks = await _assignment.GetUnassignedTasksAsync();
            return Ok(tasks);
        }

        [Authorize(Roles = "Leader")]
        [HttpPost("{taskId}/assign/{devId}")]
        public async Task<IActionResult> AssignToDeveloper(Guid taskId, Guid devId)
        {
            var result = await _assignment.AssignToDeveloperAsync(taskId, devId);

            if (!result)
                return NotFound(new { message = "Task or Developer not found" });

            return Ok(new { message = "Task assigned successfully" });
        }

        [Authorize(Roles = "Leader")]
        [HttpPost("{taskId}/unassign")]
        public async Task<IActionResult> UnassignTask(Guid taskId)
        {
            var result = await _assignment.UnassignTaskAsync(taskId);

            if (!result)
                return NotFound(new { message = "Task not found" });

            return Ok(new { message = "Task unassigned successfully" });
        }

        [Authorize(Roles = "Developer")]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var tasks = await _assignment.GetTasksByDeveloperAsync(Guid.Parse(userId));
            return Ok(tasks);
        }
    }
}
