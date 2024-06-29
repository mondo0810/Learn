using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPMVC.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string SupplierId { get; set; }
        public int CategoryId { get; set; }
        public int QuantityPerUni { get; set; }
        public int UnitPrice { get; set; }
        public int UnitslnStock { get; set; }
        public int UnitsOnOrder { get; set ; }
        public int ReorderLevel { get; set; }
        public int Discontinued { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}
