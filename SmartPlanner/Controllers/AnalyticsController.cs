using Microsoft.AspNetCore.Mvc;
using SmartPlanner.Services;

namespace SmartPlanner.Controllers
{
    [ApiController]
    [Route("api/analytics")]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analytics;
        public AnalyticsController(IAnalyticsService analytics)
        {
            _analytics = analytics;
        }

        [HttpGet("{id}/eta")]
        public async Task<IActionResult> GetEta(Guid id)
        {
            var eta = await _analytics.GetEta(id);
            return Ok(eta);
        }

        [HttpGet("velocity")]
        public async Task<IActionResult> Velocity()
        {
            var velocity = await _analytics.GetVelocityAsync();
            return Ok(velocity);
        }
    }
}
