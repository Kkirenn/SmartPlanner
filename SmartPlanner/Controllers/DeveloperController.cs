using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartPlanner.DTO;
using SmartPlanner.Services;
using System.Security.Claims;

namespace SmartPlanner.Controllers
{
    [ApiController]
    [Route("api/developers")]
    public class DeveloperController : ControllerBase
    {
        private readonly IDeveloperService _developerService;

        public DeveloperController(IDeveloperService developerService)
        {
            _developerService = developerService;
        }

        [Authorize(Roles = "Leader")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDeveloperRequest request)
        {
            var leaderId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(leaderId))
                return Unauthorized("Leader ID not found");

            var developer = await _developerService.CreateAsync(
                request.Name,
                request.Email,
                request.Password,
                request.Role,
                Guid.Parse(leaderId)
            );

            return Ok(developer);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leaderId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(leaderId))
                return Unauthorized("User ID not found");

            var developers = await _developerService.GetByLeaderIdAsync(Guid.Parse(leaderId));
            return Ok(developers);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var developer = await _developerService.GetByIdAsync(id);
            if (developer == null)
                return NotFound();

            return Ok(developer);
        }
    }
}