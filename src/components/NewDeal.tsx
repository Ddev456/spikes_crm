import * as React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { FolderIcon } from "@/assets/icons/FolderIcon";

import { companies, Statue, useDealStore } from "@/store/store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm, UseFormReturn } from "react-hook-form";

const formSchema = z.object({
  object: z.string().min(1, { message: "Required" }),
  amount: z.coerce.number().min(1, { message: "Required" }),
  company: z.string().min(1, { message: "Required" }),
  statue: z.string().min(1, { message: "Required" }),
});

export function NewDeal() {
  const [open, setOpen] = React.useState(false);
  const { addDeal, deals } = useDealStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      object: "Pitch Deck B2B",
      amount: 15000,
      company: companies[0].name,
      statue: Statue.ongoing,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (deals.length === 11) {
      return;
    }

    const { object, amount, company, statue } = values;

    const statueValue = statue as Statue;

    addDeal({
      id: Math.random().toString(16).slice(2),
      add: new Date(),
      object,
      amount,
      company,
      statue: statueValue,
    });

    /* close the dialog when the form is submitted */
    form.reset();
    setOpen(false);
  }

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px]  shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
            <FolderIcon />
            <span>New Deal</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {deals.length >= 11 && (
            <DialogHeader>
              <DialogTitle>Maximum deals reached 🚀</DialogTitle>
              <DialogDescription>Come back later !</DialogDescription>
            </DialogHeader>
          )}
          {deals.length < 11 && (
            <>
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
                <DialogDescription>Save a new deal.</DialogDescription>
              </DialogHeader>

              <NewDealForm handleSubmit={onSubmit} form={form} />
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px]  shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
          <FolderIcon />
          <span>New Deal</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {deals.length >= 11 && (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>Maximum deals reached 🚀</DrawerTitle>
              <DrawerDescription>Come back later !</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
            )
          </>
        )}
        {deals.length < 11 && (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>Add New Deal</DrawerTitle>
              <DrawerDescription>Save a new deal</DrawerDescription>
            </DrawerHeader>
            <NewDealForm className="px-4" handleSubmit={onSubmit} form={form} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

const statues = [
  { label: "bg-[#344054]", value: "All" },
  { label: "bg-[#ECB30A]", value: Statue.pending },
  { label: "bg-[#EC0A0A]", value: Statue.cancelled },
  { label: "bg-[#2AD730]", value: Statue.ongoing },
  { label: "bg-[#960AEC]", value: Statue.waiting },
  { label: "bg-[#0085FF]", value: Statue.completed },
];

interface NewDealFormProps {
  className?: string;
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

function NewDealForm({ className, handleSubmit, form }: NewDealFormProps) {
  /*   const [companyId, setCompanyId] = useState<number>(1);
  const [object, setObject] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [statue, setStatue] = useState<Statue>("pending"); */

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          {/* <Label htmlFor="object">Object</Label>
          <Input
            type="text"
            id="object"
            name="object"
            placeholder="Pitch Deck B2B"
          /> */}
          <FormField
            control={form.control}
            name="object"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Object</FormLabel>
                <FormControl>
                  <Input placeholder="Pitch Deck B2B" {...field} />
                </FormControl>
                <FormDescription>
                  This is the object of the deal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.name} value={company.name}>
                          <div className="flex items-center gap-2">
                            {company.logo()}
                            <span>{company.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select the company</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Amount"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the amount of the deal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="statue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statue</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Statue" />
                    </SelectTrigger>
                    <SelectContent>
                      {statues.map((statue) => (
                        <SelectItem key={statue.value} value={statue.value}>
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
                </FormControl>
                <FormDescription>Select the statue</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
