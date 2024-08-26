"use client";
import { RecordFormInput, RecordFormSchema } from "@/schema/recordSchema";
import { CategoryRes, GroupCategories } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronRight, X } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import CategoryDialog from "./CategoryDialog";
import { Textarea } from "../ui/textarea";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
type Props = {
  categories: GroupCategories;
  members: MemberQuery[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function CreateForm({
  categories,
  members,
  isOpen,
  setIsOpen,
}: Props) {
  const { inCategories, outCategories } = categories;
  //   const {
  //     control,
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //   } = useForm<RecordFormInput>({
  //     resolver: zodResolver(RecordFormSchema),
  //     defaultValues: {
  //       transactionDate: new Date().toISOString().split("T")[0],
  //       category: "",
  //       member: "",
  //       amount: "",
  //       description: "",
  //     },
  //   });
  const form = useForm<RecordFormInput>({
    resolver: zodResolver(RecordFormSchema),
    defaultValues: {
      transactionDate: new Date().toISOString().split("T")[0],
      category: "",
      member: "",
      amount: "",
      description: "",
    },
  });
  const [recordType, setRecordType] = useState<"IN" | "OUT">("OUT");
  const currentCategories = recordType === "IN" ? inCategories : outCategories;
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    id: "",
  });
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  const handleCategorySelect = (category: CategoryRes) => {
    setSelectedCategory({
      id: category.id,
      name: category.name,
    });
    setIsCategoryDrawerOpen(false);
  };
  const onSubmit = (data: RecordFormInput) => {
    console.log(data);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Form {...form}>
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetContent
            className="w-full sm:w-[540px] px-0 py-1"
            enableDefaultClose={false}
          >
            <VisuallyHidden.Root>
              <SheetTitle />
            </VisuallyHidden.Root>
            <SheetHeader className="flex flex-row justify-between items-center pr-2  py-1">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                <X size={24} />
              </Button>
              <div className="flex bg-muted rounded-lg p-1 mt-0">
                <button
                  className={clsx(
                    "px-6 py-2 rounded-lg font-medium text-sm",
                    recordType === "OUT" ? "bg-background" : "bg-transparent"
                  )}
                  onClick={() => setRecordType("OUT")}
                >
                  支出
                </button>
                <button
                  className={clsx(
                    "px-6 py-2 rounded-lg font-medium text-sm",
                    recordType === "IN" ? "bg-background" : "bg-transparent"
                  )}
                  onClick={() => setRecordType("IN")}
                >
                  收入
                </button>
              </div>
              <Button variant={"default"} size={"default"}>
                儲存
              </Button>
            </SheetHeader>
            <div className="rounded-md bg-card p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-xl sm:text-lg font-medium"
                  >
                    日期
                  </label>
                  <input
                    {...form.register("transactionDate")}
                    placeholder="選擇日期"
                    type="date"
                    id="date"
                    className="mt-1 px-3 border border-gray-300 bg-background rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl  sm:text-lg"
                    style={{
                      width: "100%",
                      minWidth: "intrinsic",
                    }}
                  />
                  <div id="date-error" aria-live="polite" aria-atomic="true">
                    {form.formState.errors?.transactionDate?.message && (
                      <p className="mt-2 text-sm text-red-500 font-bold">
                        {form.formState.errors.transactionDate.message}
                      </p>
                    )}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {recordType === "IN" ? "收入類別" : "支出類別"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-0 focus:bg-slate-300 w-full"
                          id="category"
                          placeholder={
                            recordType === "IN"
                              ? "選擇收入類別"
                              : "選擇支出類別"
                          }
                          type="text"
                          readOnly
                          value={selectedCategory.name}
                          onClick={() => setIsCategoryDrawerOpen(true)}
                        />
                      </FormControl>
                      <CategoryDialog
                        open={isCategoryDrawerOpen}
                        onClose={setIsCategoryDrawerOpen}
                        categories={currentCategories}
                        onSelectCategory={handleCategorySelect}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div>
                  <label
                    htmlFor="category"
                    className="text-xl sm:text-lg font-medium"
                  >
                    {recordType === "IN" ? "收入類別" : "支出類別"}
                  </label>
                  <div>
                    <div className="relative">
                      <ChevronRight className="absolute right-2 top-2 " />
                      <Input
                        {...register("category")}
                        className="focus-visible:ring-0 focus:bg-slate-300 w-full"
                        id="category"
                        placeholder={
                          recordType === "IN" ? "選擇收入類別" : "選擇支出類別"
                        }
                        type="text"
                        readOnly
                        value={selectedCategory.name}
                        onClick={() => setIsCategoryDrawerOpen(true)}
                      />
                    </div>
                    <CategoryDialog
                      open={isCategoryDrawerOpen}
                      onClose={setIsCategoryDrawerOpen}
                      categories={currentCategories}
                      onSelectCategory={handleCategorySelect}
                    />

                    <div
                      id="category-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {errors?.category?.message && (
                        <p className="mt-2 text-sm text-red-500 font-bold">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div> */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-xl sm:text-lg font-medium"
                  >
                    金額
                  </label>
                  <Input
                    type="text"
                    {...form.register("amount")}
                    inputMode="numeric"
                    id="amount"
                    className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl sm:text-lg"
                  />
                  <div id="amount-error" aria-live="polite" aria-atomic="true">
                    {form.formState.errors?.amount?.message && (
                      <p className="mt-2 text-sm text-red-500 font-bold">
                        {form.formState.errors.amount.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* <div>
                  <label
                    htmlFor="member"
                    className="text-xl sm:text-lg font-medium"
                  >
                    成員
                  </label>
                  <Controller
                    name="member"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectGroup className="mt-1">
                          <SelectTrigger id="member">
                            <SelectValue placeholder="選擇成員" />
                          </SelectTrigger>
                          <SelectContent>
                            {members.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectGroup>
                      </Select>
                    )}
                  />

                  <div id="member-error" aria-live="polite" aria-atomic="true">
                    {form.formState.errors?.member?.message && (
                      <p className="mt-2 text-sm text-red-500 font-bold">
                        {form.formState.errors.member.message}
                      </p>
                    )}
                  </div>
                </div> */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-xl sm:text-lg font-medium"
                  >
                    描述
                  </label>
                  <Textarea name="description" id="description" />
                </div>
                {/* <div>
                <label htmlFor="picture">Picture</label>
                <Input name="image" id="picture" type="file" accept="image/*" />
              </div> */}
              </div>

              <div className="flex justify-end mt-3 gap-5">
                <Button
                  className="flex h-10 items-center bg-primary text-white px-4 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  取消
                </Button>
                {/* <SubmitButton text="儲存" /> */}
                <Button onClick={form.handleSubmit(onSubmit)}>儲存</Button>
              </div>
            </div>
          </SheetContent>
        </form>
      </Form>
    </Sheet>
  );
}
