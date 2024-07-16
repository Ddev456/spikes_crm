import { columns, Deals } from "./columns";
import { DataTable } from "./data-table";

interface DealsTableProps {
  deals: Deals[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  return (
    <div className="">
      <DataTable columns={columns} data={deals} />
    </div>
  );
};
