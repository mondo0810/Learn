using System;
using System.Collections.Generic;

namespace ASPAPI.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public int? CategoryId { get; set; }

    public int? UnitPrice { get; set; }

    public virtual Category? Category { get; set; }
}
