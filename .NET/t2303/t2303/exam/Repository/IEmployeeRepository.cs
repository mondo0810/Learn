using exam.Models;
using System.Collections.ObjectModel;

namespace exam.Repository
{
    public interface IEmployeeRepository
    {
        Collection<Employee> GetAll();
        Employee GetById(long id);
        void Add(Employee employee);
        void Update(Employee employee);
        void Delete(Employee employee);

        bool Exists(long id);
    }
}
