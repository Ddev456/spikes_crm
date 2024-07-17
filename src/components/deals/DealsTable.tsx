import { columns, Deals } from "./columns";
import { DataTable } from "./data-table";

interface DealsTableProps {
  deals: Deals[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  return <DataTable columns={columns} data={deals} />;
};
