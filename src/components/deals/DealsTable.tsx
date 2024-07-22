import { Deal } from "@/store/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface DealsTableProps {
  deals: Deal[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  return <DataTable columns={columns} data={deals} />;
};
