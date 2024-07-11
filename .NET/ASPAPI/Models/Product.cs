﻿using System;
using System.Collections.Generic;

namespace ASPAPI.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? CategoryId { get; set; }

    public virtual Category? Category { get; set; }
}
