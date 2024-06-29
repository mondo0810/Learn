using System.ComponentModel.DataAnnotations;

namespace ASPMVC.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture {  get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
