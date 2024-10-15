import iconDictionary from "@/constants/iconList";
import { CategoryRes } from "@/types/category";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Icon from "./Icon";

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  categories: CategoryRes[];
  onSelectCategory: (category: CategoryRes) => void;
};

export default function CategoryDialog({
  open,
  onClose,
  categories,
  onSelectCategory,
}: Props) {
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [emojiVal, setEmojiVal] = useState("utensils");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-screen w-screen">
        <VisuallyHidden.Root>
          <DialogTitle />
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription />
        </VisuallyHidden.Root>
        <div className="h-fit grid grid-cols-3 gap-4  overflow-auto py-4 px-1">
          {categories.map((category) => (
            <div
              key={category.id}
              className="h-20 bg-card flex flex-col justify-center items-center  rounded-md text-sm font-bold cursor-pointer"
              onClick={() => onSelectCategory(category)}
            >
              <div>
                <Icon name={category.icon} />
              </div>
              <div>{category.name}</div>
            </div>
          ))}
          <div
            className="h-20 bg-card flex flex-col justify-center items-center  rounded-md text-sm font-bold cursor-pointer"
            onClick={() => setIsAddCategoryDialogOpen(true)}
          >
            <p>
              <Plus />
            </p>
            <div>新增類別</div>
          </div>
        </div>
      </DialogContent>

      <Dialog
        open={isAddCategoryDialogOpen}
        onOpenChange={setIsAddCategoryDialogOpen}
      >
        <DialogContent
          className="h-screen w-screen flex flex-col px-0 py-0 "
          enableDefaultCloseBtn={false}
        >
          <VisuallyHidden.Root>
            <DialogTitle />
          </VisuallyHidden.Root>
          <VisuallyHidden.Root>
            <DialogDescription />
          </VisuallyHidden.Root>
          <div className="flex justify-between items-center border-b p-2 bg-primary">
            <DialogClose asChild>
              <Button className="text-md bg-primary">取消</Button>
            </DialogClose>
            <div className="text-lg font-bold text-white">新增類別</div>
            <div>
              <Button className="text-md bg-primary">儲存</Button>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="mb-4 px-3">
              <div
                className={`flex items-center border rounded-lg p-2 transition-all duration-300 mb-4
              }`}
              >
                <Icon name={emojiVal} />
                <Input
                  type="text"
                  placeholder="輸入類別名稱"
                  className="border-0 outline-none flex-grow text-base"
                  enableFocusRing={false}
                  onChange={(e) => {
                    // 處理輸入變化
                  }}
                />
              </div>
            </div>
            <div className="flex-1  px-3">
              <div className="h-5/6 border rounded-md p-2">
                <div className="h-full overflow-y-auto">
                  <div className="grid grid-cols-4  gap-4 p-2">
                    {Object.keys(iconDictionary).map((key) => (
                      <div
                        key={key}
                        className=" p-2 my-0 mx-auto cursor-pointer"
                        onClick={() => setEmojiVal(key)}
                      >
                        <Icon name={key} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
