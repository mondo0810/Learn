import UITableHead from "./UITableHead";
import UITableHeadCell from "./UITableHeadCell";
import UITableBody from "./UITableBody";
import UITableBodyRow from "./UITableBodyRow";
import UITableBodyCell from "./UITableBodyCell";

interface IProps {
  children: React.ReactNode;
}

export default function UITable({ children }: IProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-lg border dark:border-zinc-600 table-auto">{children}</table>
    </div>
  );
}

export { UITableHead, UITableHeadCell, UITableBody, UITableBodyRow, UITableBodyCell };
