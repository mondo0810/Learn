using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPMVC.Models
{
    public class Category : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture {  get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();

    }
}
