using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Assignment2.Models
{
    public class CommentModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Time { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string IP { get; set; }
    }
}
