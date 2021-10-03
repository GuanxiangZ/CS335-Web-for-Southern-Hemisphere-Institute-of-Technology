using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Assignment2.Dto;
using Assignment2.Data;
using Assignment2.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Assignment2.Controllers
{
    [Route("api")]
    [ApiController]
    public class MyController : ControllerBase
    {
        private readonly IAuthRepo _repository;

        public MyController(IAuthRepo repository)
        {
            _repository = repository;
        }

        [HttpPost("Register")]
        public ActionResult Register(UserInputDto u)
        {
            User user = _repository.GetUser(u.UserName);
            if (user == null)
            {
                User new_user = new User
                {
                    UserName = u.UserName,
                    Password = u.Password,
                    Address = u.Address
                };
                _repository.AddUser(new_user);
                return Ok("\"User successfully registered.\"");
            } 
            else
            {
                return Ok("\"Username not available.\"");
            }
        }

       
        [Authorize(AuthenticationSchemes = "MyAuthentication")]
        [Authorize(Policy = "UserOnly")]
        [HttpGet("GetVersionA")]

        public ActionResult GetVersionA()
        {
            return Ok("v1");
        }

        [Authorize(AuthenticationSchemes = "MyAuthentication")]
        [Authorize(Policy = "UserOnly")]
        [HttpGet("PurchaseItem")]

        public ActionResult PurchaseItem(OrderInputDto o)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            Claim c = ci.FindFirst("userName");
            string username = c.Value;
            Order new_order = new Order
            {
                UserName = username,
                Quantity = o.Quantity,
                ProductID = o.ProductID
            };
            _repository.AddOrder(new_order);
            return CreatedAtAction(nameof(GetById), new { id = new_order.Id }, new_order);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Order> GetById(int id)
        {
            return _repository.GetOrderByID(id);
        }

        [Authorize(AuthenticationSchemes = "MyAuthentication")]
        [Authorize(Policy = "UserOnly")]
        [HttpGet("PurchaseSingleItem/{id}")]
        public ActionResult PurchaseSingleItem(int id)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            Claim c = ci.FindFirst("userName");
            string username = c.Value;
            Order new_order = new Order
            {
                UserName = username,
                Quantity = 1,
                ProductID = id
            };
            _repository.AddOrder(new_order);
            return CreatedAtAction(nameof(GetById), new { id = new_order.Id }, new_order);
        }
    }
}
