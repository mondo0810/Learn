import CreateEmployee from "@/components/CreateEmployee";
import Employees from "@/components/Employees";

export default async function Create({ params }) {
  const employeeId = await params.id;
  console.log(employeeId);
  return (
    <div>
      <CreateEmployee employeeId={employeeId} />
    </div>
  );
}
