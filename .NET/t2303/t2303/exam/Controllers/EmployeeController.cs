using exam.Data;
using exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace exam.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext dbContext)
        {

            _context = dbContext;
        }
        public IActionResult Index()
        {
            var persons = _context.Employees.Include(p => p.Department).ToList();
            return View(persons);
        }
        public IActionResult Details(int id)
        {
            var person = _context.Employees.SingleOrDefault(a => a.Id == id);
            if (person == null)
            {
                return NotFound();
            }
            return View(person);
        }
        public IActionResult Create() 
        {
            ViewData["Id"] = new SelectList(_context.Departments, "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,EmployeeCode,Rank,DepartmentId")]  Employee employee)
        {
            Console.WriteLine(employee);
            if (ModelState.IsValid)
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }


            ViewData["DepartmentId"] = new SelectList(_context.Departments, "Id", "Name", employee.DepartmentId);
            
            return View(employee);
        }

        public IActionResult Edit(long id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var person = _context.Employees.Find(id);
            if (person == null)
            {
                return NotFound();
            }
            ViewBag.DepartmentId = new SelectList(_context.Departments, "Id", "Name", person.DepartmentId);
            return View(person);
        }
        [HttpPost]
        public IActionResult Edit(long id, [Bind("Id,Name,EmployeeCode,Rank,DepartmentId")] Employee employee)
        {
            if (ModelState.IsValid)
            {
                _context.Update(employee);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.DepartmentId = new SelectList(_context.Departments, "Id", "Name", employee.DepartmentId);
            return View();
        }

        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees.Include(e => e.Department)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            return View(employee);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
