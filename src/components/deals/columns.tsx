import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Deals = {
  id: string;
  add: Date;
  amount: number;
  object: string;
  statue: "pending" | "cancelled" | "ongoing" | "waiting" | "completed";
  company: {
    name: string;
    logo: JSX.Element;
  };
};

export const columns: ColumnDef<Deals>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="gap-[12px] px-[24px] py-[12px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="gap-[12px] px-[24px] py-[12px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "add",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex text-[#344054] font-medium text-[12px] leading-[18px] gap-[12px] px-[24px] py-[12px] items-center"
        >
          Add
          <ArrowDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.add;
      const formattedDate = date.toLocaleDateString("en-EN", {
        month: "short",
        year: "2-digit",
      });
      return (
        <div className="flex text-[#344054] font-medium text-[14px] gap-[12px] px-[24px] py-[12px] items-center">
          <span>{`${formattedDate.split(" ")[0]}. ${
            formattedDate.split(" ")[1]
          }`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "object",
    header: () => <div className="px-[24px] py-[12px]">Object</div>,
    cell: ({ row }) => {
      const object = row.original.object;

      return (
        <div className="flex text-[#344054] font-medium text-[12px] leading-[18px] gap-[12px] px-[24px] py-[12px] items-center">
          <span>{object}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: () => (
      <div className="font-medium text-[12px] leading-[18px] px-[24px] py-[12px]">
        Company
      </div>
    ),
    cell: ({ row }) => {
      const companyName = row.original.company.name;
      const companyLogo = row.original.company.logo;

      return (
        <div className="flex text-[#344054] font-medium text-[14px] gap-[12px] px-[24px] py-[12px] items-center">
          <span>{companyLogo}</span> <span>{companyName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "statue",
    header: () => (
      <div className="font-medium text-[12px] leading-[18px] px-[24px] py-[12px]">
        Statue
      </div>
    ),
    cell: ({ row }) => {
      const statue = row.original.statue;
      let colorClass = "";
      let statueFormatted = "";
      switch (statue) {
        case "pending":
          colorClass = "bg-[#ECB30A]";
          statueFormatted = "Pending";
          break;
        case "cancelled":
          colorClass = "bg-[#EC0A0A]";
          statueFormatted = "Cancelled";
          break;
        case "ongoing":
          colorClass = "bg-[#2AD730]";
          statueFormatted = "Ongoing";
          break;
        case "waiting":
          colorClass = "bg-[#960AEC]";
          statueFormatted = "Waiting for confirmation";
          break;
        default:
          colorClass = "bg-[#0085FF]";
          statueFormatted = "Completed";
      }

      return (
        <div className="flex text-[#344054] font-medium text-[14px] gap-[12px] px-[24px] py-[12px] items-center">
          <span
            className={cn(colorClass, "h-[6px] rounded-full w-[6px]")}
          ></span>
          <span>{statueFormatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="font-medium text-[12px] leading-[18px] px-[24px] py-[12px]">
        Amount
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      function addThousandsSeparator(amount: number) {
        // Convertir le montant en chaîne de caractères
        const amountStr = amount.toString();

        // Vérifier si le montant contient plus de trois chiffres
        if (amountStr.length > 3) {
          // Séparer les chiffres avant et après le point
          const beforePoint = amountStr.slice(0, -3);
          const afterPoint = amountStr.slice(-3);

          // Ajouter le point et concaténer les chiffres
          return beforePoint + "." + afterPoint;
        } else {
          return amountStr;
        }
      }

      const formattedAmount = addThousandsSeparator(amount);
      const formatted = formattedAmount + " $USD";

      return (
        <div className="px-[24px] py-[12px] text-[#344054] font-medium">
          {formatted}
        </div>
      );
    },
  },
];
