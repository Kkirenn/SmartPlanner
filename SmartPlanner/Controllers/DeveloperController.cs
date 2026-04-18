using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartPlanner.DTO;
using SmartPlanner.Services;

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
            var developer = await _developerService.CreateAsync(
                request.Name,
                request.Email,
                request.Password,
                request.Role
                );

            return Ok(developer);
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var developers = await _developerService.GetAllAsync();
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