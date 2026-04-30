using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SmartPlanner.DTO;
using SmartPlanner.Services;
using System.Security.Claims;

namespace SmartPlanner.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _service;

        public TaskController(ITaskService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Leader")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leaderId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(leaderId))
                return Unauthorized();

            var tasks = await _service.GetByLeaderIdAsync(Guid.Parse(leaderId));

            return Ok(tasks);
        }

        [Authorize(Roles = "Leader")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskRequest request)
        {
            var leaderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var id = await _service.Create(request.Title, request.StoryPoints, Guid.Parse(leaderId));
            return Ok(id);
        }

        [Authorize(Roles = "Leader")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _service.DeleteAsync(id);

            if (!result)
                return NotFound(new { message = "Task not found" });

            return Ok(new { message = "Task deleted successfully" });
        }
    }
}
