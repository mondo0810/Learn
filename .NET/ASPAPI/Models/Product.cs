using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ASPAPI.Models;

public partial class Product
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }
    public string Price { get; set; }
    public int? CategoryId { get; set; }

    public virtual Category? Category { get; set; }
    public ICollection<Transaction> Transaction { get; set; } = new List<Transaction>();
}
