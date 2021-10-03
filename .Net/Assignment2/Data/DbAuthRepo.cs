using Assignment2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Assignment2.Data
{
    public class DbAuthRepo : IAuthRepo
    {
        private readonly AuthDbContext _dbContext;

        public DbAuthRepo(AuthDbContext d)
        {
            _dbContext = d;
        }

        public void AddOrder(Order o)
        {
            _dbContext.Orders.Add(o);
            _dbContext.SaveChanges();
        }

        public void AddUser(User u)
        {
            _dbContext.Users.Add(u);
            _dbContext.SaveChanges();
        }

        public Order GetOrderByID(int id)
        {
            Order c = _dbContext.Orders.FirstOrDefault(e => e.Id == id);
            if (c == null)
                return null;
            else
                return c;
        }

        public bool GetProductByID(int id)
        {
            Product c = _dbContext.Products.FirstOrDefault(e => e.Id == id);
            if (c == null)
                return false;
            else
                return true;
        }

        public User GetUser(string userName)
        {
            User c = _dbContext.Users.FirstOrDefault(e => e.UserName == userName);
            if (c == null)
                return null;
            else
                return c;
        }

        public bool ValidLogin(string userName, string password)
        {
            User c = _dbContext.Users.FirstOrDefault(e => e.UserName == userName && e.Password == password);
            if (c == null)
                return false;
            else
                return true;
        }
    }
}
