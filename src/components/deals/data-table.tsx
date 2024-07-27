import {
  SortingState,
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ExportIcon } from "@/assets/icons/ExportIcon";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { companies, useDealStore } from "@/store/store";
import { useToast } from "../ui/use-toast";
import { NewDeal } from "../NewDeal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const deals = useDealStore((state) => state.deals);
  const { removeDeals } = useDealStore();
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /* get all objects from data */
  const objectsFromDeals = deals.map((deal) => {
    return deal.object;
  });

  const uniqueObjectValues = [...new Set(objectsFromDeals)];

  /*   const companiesFromDeals = deals.map((deal) => {
    return deal.company;
  }); */

  const statues = [
    /*     { label: "bg-[#344054]", value: "All" },
     */ { label: "bg-[#ECB30A]", value: "Pending" },
    { label: "bg-[#EC0A0A]", value: "Cancelled" },
    { label: "bg-[#2AD730]", value: "Ongoing" },
    { label: "bg-[#960AEC]", value: "Waiting for confirmation" },
    { label: "bg-[#0085FF]", value: "Completed" },
  ];
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="w-full max-h-[500px] md:max-h-[700px] no-scrollbar overflow-auto">
      <div className="w-full h-[750px]">
        <div className="w-full flex flex-col items-center py-4 sticky top-0 z-10 bg-[#FFFF]">
          <div className="flex w-full h-[40px] ml-2 items-center">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <>
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} deal(s) selected.
                </div>
                <div className="flex items-center gap-2 mr-9">
                  <Button
                    className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      const ids = table
                        .getSelectedRowModel()
                        .flatRows.map((row) => row.index);
                      removeDeals(ids);
                      toast({
                        title: "Deal(s) deleted",
                        description: "Deal(s) deleted successfully",
                        duration: 3000,
                        variant: "default",
                      });
                      table.resetRowSelection();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] bg-blue-400 hover:bg-blue-500"
                    onClick={() => {
                      table.resetRowSelection();
                    }}
                  >
                    Reset Selection
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="w-full flex flex-row flex-wrap md:flex-nowrap justify-between gap-[20px] items-center">
            <div className="flex gap-[12px]">
              <div
                className="max-w-24 xl:max-w-48 h-8 border flex items-center border-b py-[4px] px-[16px] bg-[#ffffff] text-card-foreground rounded-[8px]"
                cmdk-input-wrapper=""
              >
                <Search className="mr-2 shrink-0 h-[13px] w-[13px]" />
                <Input
                  value={
                    (table.getColumn("object")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("object")
                      ?.setFilterValue(event.target.value)
                  }
                  className={cn(
                    "h-6 ring-0 border-0 flex rounded-md text-sm outline-none bg-[#ffffff] placeholder:text-card-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="Search"
                />
              </div>

              <Select
                value={
                  (table.getColumn("object")?.getFilterValue() as string) ?? ""
                }
                onValueChange={(event: string) =>
                  table.getColumn("object")?.setFilterValue(event)
                }
              >
                <SelectTrigger className="w-24 h-8 bg-white">
                  <SelectValue placeholder="Object" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueObjectValues.map((object, index) => (
                    <SelectItem key={`${object}-${index}`} value={object}>
                      {object}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={
                  (table.getColumn("company")?.getFilterValue() as string) ?? ""
                }
                onValueChange={(event: string) => {
                  table.getColumn("company")?.setFilterValue(event);
                }}
              >
                <SelectTrigger className="w-[102px] h-8 bg-white">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company, index) => (
                    <SelectItem
                      key={`${company.name}-${index}`}
                      value={company.name}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={
                  (table.getColumn("statue")?.getFilterValue() as string) ?? ""
                }
                onValueChange={(event: string) => {
                  const selectedValue = event.toString();

                  if (selectedValue === "All") {
                    table.getColumn("statue")?.setFilterValue("");
                  } else {
                    table.getColumn("statue")?.setFilterValue(selectedValue);
                  }
                  /*                 table.getColumn("statue")?.setFilterValue(event)
                   */
                }}
              >
                <SelectTrigger className="w-24 h-8 bg-white">
                  <SelectValue placeholder="Statue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"all"} value={"All"}>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "bg-[#344054]",
                          "h-[6px] rounded-full w-[6px]"
                        )}
                      ></span>
                      <span>All</span>
                    </div>
                  </SelectItem>
                  {statues.map((statue, index) => (
                    <SelectItem
                      key={`${statue.value}-${index}`}
                      value={statue.value}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            statue.label,
                            "h-[6px] rounded-full w-[6px]"
                          )}
                        ></span>
                        <span>{statue.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* hidden reset button if no filters are applied */}
              {isFiltered && (
                <Button
                  className="h-8"
                  onClick={() => {
                    table.setColumnFilters([]);
                  }}
                >
                  Reset Filters
                </Button>
              )}
            </div>
            <div className="mr-8 flex gap-[8px]">
              <Button
                onClick={() => {
                  toast({
                    title: "Deals exported successfully !",
                    description: new Date(Date.now()).toDateString(),
                  });
                }}
                className="hover:bg-[#E8E7EA] text-[12px] flex gap-[5px] px-[16px] py-[4px] w-[50px] lg:w-[89px] h-[32px] border border-[#E8E7EA] bg-white text-[#101828]"
              >
                <ExportIcon />
                <span className="hidden lg:block">Export</span>
              </Button>
              <NewDeal />
              {/* <Button className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px]  shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
              <FolderIcon />
              <span>New Deal</span>
            </Button> */}
            </div>
          </div>
        </div>
        <Table className="relative">
          <TableHeader className="sticky top-[100px] z-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-[#F9FAFB]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-fit">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
