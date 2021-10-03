using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Assignment2.Models;

namespace Assignment2.Data
{
    public interface IAuthRepo
    {
        public bool ValidLogin(string un, string p);

        public User GetUser(string un);

        public void AddUser(User u);

        public void AddOrder(Order o);

        public bool GetProductByID(int id);

        public Order GetOrderByID(int id);
    }
}
