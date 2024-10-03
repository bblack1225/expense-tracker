import { CategoryRes, GroupCategories } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { MutateRecordRequest, RecordRes } from "@/types/record";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CategoryDialog from "./CategoryDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RefreshCw, Trash2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RecordFormInput, RecordFormSchema } from "@/schema/recordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { useDeleteRecord } from "@/hooks/useDeleteRecord";
import { DeleteRecordAlertDialog } from "./DeleteRecordAlertDialog";

type Props = {
  categories: GroupCategories;
  members: MemberQuery[];
  item: RecordRes;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

async function updateRecord(
  recordId: string,
  data: MutateRecordRequest
): Promise<RecordRes> {
  const res = await axios.put(`/api/records/${recordId}`, data);
  return res.data;
}

const findCategory = (categories: CategoryRes[], categoryId: string) => {
  return categories.find((category) => category.id === categoryId) || null;
};

export default function EditForm({
  categories,
  members,
  item,
  isOpen,
  setIsOpen,
}: Props) {
  const { inCategories, outCategories } = categories;
  const currentCategories = item.type === "IN" ? inCategories : outCategories;
  const initialCategory = findCategory(currentCategories, item.categoryId);

  const [recordType, setRecordType] = useState<"IN" | "OUT">(item.type);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: initialCategory?.name || "",
    id: initialCategory?.id || "",
  });
  const { deleteDialogOpen, setDeleteDialogOpen, isDeleting, handleDelete } =
    useDeleteRecord(() => setIsOpen(false));

  const queryClient = useQueryClient();

  const form = useForm<RecordFormInput>({
    resolver: zodResolver(RecordFormSchema),
    defaultValues: {
      transactionDate: item.transactionDate,
      category: selectedCategory.name,
      member: item.memberId,
      amount: item.amount.toString(),
      description: item.description,
    },
  });

  const handleCategorySelect = (category: CategoryRes) => {
    setSelectedCategory({
      id: category.id,
      name: category.name,
    });
    form.setValue("category", category.name);
    form.trigger("category");
    setIsCategoryDrawerOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: MutateRecordRequest) => updateRecord(item.id, data),
    onSuccess: (updateRecord) => {
      setIsOpen(false);
      const category = findCategory(
        currentCategories,
        updateRecord.categoryId
      ) as CategoryRes;
      setSelectedCategory({ name: category.name, id: category.id });
      form.reset({
        transactionDate: updateRecord.transactionDate,
        category: category.name,
        member: updateRecord.memberId,
        amount: updateRecord.amount.toString(),
        description: updateRecord.description,
      });
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });

  const onSubmit = async (data: RecordFormInput) => {
    const payload = {
      memberId: data.member,
      amount: Number(data.amount),
      description: data.description,
      transactionDate: data.transactionDate,
      bookId: item.bookId,
      type: recordType,
      categoryId: selectedCategory.id,
    };
    mutate(payload);
  };

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        if (!val) {
          form.reset();
        }
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetContent
            className="w-full sm:max-w-[500px] px-0 py-1"
            // 自己定義的屬性，是否需要啟用預設的關閉按鈕
            enableDefaultCloseBtn={false}
          >
            <VisuallyHidden.Root>
              <SheetTitle />
            </VisuallyHidden.Root>
            <VisuallyHidden.Root>
              <SheetDescription />
            </VisuallyHidden.Root>
            <SheetHeader className="flex flex-row justify-between items-center px-1 py-1">
              <Button
                className="mt-0"
                variant={"ghost"}
                size={"icon"}
                onClick={handleClose}
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
              <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button className="mt-0" variant={"ghost"} size={"icon"}>
                    <Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <DeleteRecordAlertDialog
                  onDelete={() => handleDelete(item.id)}
                  isDeleting={isDeleting}
                />
              </AlertDialog>
            </SheetHeader>
            <div className="rounded-md bg-card p-4 md:p-6 ">
              <div className="flex flex-col gap-4 ">
                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl sm:text-lg font-medium">
                        日期
                      </FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="選擇日期"
                          type="date"
                          className="mt-1 px-3 border border-input  bg-background rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-xl  sm:text-lg"
                          style={{ width: "100%", minWidth: "intrinsic" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl sm:text-lg font-medium">
                        {recordType === "IN" ? "收入類別" : "支出類別"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-0 focus:bg-slate-300 w-full"
                          placeholder={
                            recordType === "IN"
                              ? "選擇收入類別"
                              : "選擇支出類別"
                          }
                          type="text"
                          readOnly
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

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl sm:text-lg font-medium">
                        金額
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          className="rounded-md shadow-sm text-xl sm:text-lg focus:ring-sky-500 focus:border-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="member"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl sm:text-lg font-medium">
                        成員
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="選擇成員" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl sm:text-lg font-medium">
                        描述
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="rounded-md shadow-sm text-xl sm:text-lg focus:ring-sky-500 focus:border-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div>
                <label htmlFor="picture">Picture</label>
                <Input name="image" id="picture" type="file" accept="image/*" />
              </div> */}
              </div>

              <div className="flex justify-end mt-3 gap-5">
                <Button
                  className="flex h-10 items-center bg-primary text-white px-4 rounded-lg"
                  onClick={handleClose}
                >
                  取消
                </Button>
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  儲存
                </Button>
              </div>
            </div>
          </SheetContent>
        </form>
      </Form>
    </Sheet>
  );
}
