import { GroupCategories, CategoryRes } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { RecordRes } from "@/types/record";
import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";
// import Icon from "./icon";
import { Button } from "../ui/button";
import { useState } from "react";
import EditForm from "./EditForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  item: RecordRes;
  categories: GroupCategories;
  members: MemberQuery[];
  borderStyle?: string;
};

const getCategoryById = (categories: CategoryRes[], categoryId: string) => {
  const category = categories.find(
    (category) => category.id === categoryId
  ) as CategoryRes;

  return { name: category.name, icon: category.icon };
};
const getMemberNameById = (members: MemberQuery[], memberId: string) => {
  const member = members.find((member) => member.id === memberId);
  return member?.name;
};

async function deleteRecord(recordId: string) {
  return await axios.delete(`/api/records/${recordId}`);
}

export default function RecordItem({
  item,
  members,
  categories,
  borderStyle,
}: Props) {
  const { inCategories, outCategories } = categories;
  const selectedCategories = item.type === "IN" ? inCategories : outCategories;
  const { name: categoryName, icon: categoryIcon } = getCategoryById(
    selectedCategories,
    item.categoryId
  );
  const memberName = getMemberNameById(members, item.memberId);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteRec } = useMutation({
    mutationFn: (recordId: string) => deleteRecord(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });

  const handleDelete = (): void => {
    deleteRec(item.id);
  };
  return (
    <>
      <div
        // key={item.id}
        className={clsx("p-2 flex justify-between  border-b cursor-pointer")}
      >
        <div className="flex items-center">
          {/* <Icon name={categoryIcon} /> */}
        </div>
        <div className="flex justify-between flex-1 items-center	">
          <div className="flex flex-col">
            <div className="pl-2 flex gap-1">
              <div>{categoryName}</div>
            </div>
            <div
              className="max-w-48 min-[500px]:max-w-72 min-[600px]:max-w-96 
            min-[768px]:max-w-72 min-[900px]:max-w-80 lg:max-w-none   
            pl-2 font-light text-sm flex gap-1 flex-1"
            >
              <div> {memberName} </div>|
              <div className=" truncate">{item.description}</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {item.type === "IN" ? (
              <div className="bg-[rgb(94,156,115)] rounded-xl px-1">
                <span className="text-white font-bold">
                  ${item.amount.toLocaleString("en-US")}
                </span>
              </div>
            ) : (
              <div className="pr-1">
                <span className="font-bold">
                  ${item.amount.toLocaleString("en-US")}
                </span>
              </div>
            )}
            <Button
              variant={"outline"}
              size={"icon-sm"}
              className="px-2 rounded-full"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="mt-0 px-2 rounded-full"
                  variant={"outline"}
                  size={"icon-sm"}
                >
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>刪除</AlertDialogTitle>
                  <AlertDialogDescription>
                    請問您確定要刪除此筆紀錄?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button onClick={handleDelete}>確認</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <EditForm
        item={item}
        categories={categories}
        members={members}
        isOpen={isEditing}
        setIsOpen={setIsEditing}
      />
    </>
  );
}
