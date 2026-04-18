using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SmartPlanner.Services;

namespace SmartPlanner.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _auth;

        public AuthController(AuthService auth)
        {
            _auth = auth;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest req)
        {
            var token = _auth.Login(req.Email, req.Password);

            if (token == null)
                return Unauthorized();

            return Ok(new { token });
        }
    }
}
