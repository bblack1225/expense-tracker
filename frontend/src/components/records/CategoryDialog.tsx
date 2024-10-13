import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CategoryRes } from "@/types/category";
import { DynamicIcon } from "./Icon";
import EmojiPicker, { Emoji, Categories } from "emoji-picker-react";
import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  categories: CategoryRes[];
  onSelectCategory: (category: CategoryRes) => void;
};
const ICON_LIST = ["beef", "house", "piggy-bank", "utensils", "credit-card"];

export default function CategoryDialog({
  open,
  onClose,
  categories,
  onSelectCategory,
}: Props) {
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [emojiVal, setEmojiVal] = useState("");

  console.log("categories", categories);

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
              {/* <div>
                <DynamicIcon name={category.icon} />
              </div> */}
              <div>{category.name}</div>
            </div>
          ))}
          <div
            className="h-20 bg-card flex flex-col justify-center items-center  rounded-md text-sm font-bold cursor-pointer"
            onClick={() => setIsAddCategoryDialogOpen(true)}
          >
            <p>
              <Emoji unified="2795" size={20} />
            </p>
            <div>新增類別</div>
          </div>
        </div>
      </DialogContent>

      {/* 新增類別的 Dialog */}
      <Dialog
        open={isAddCategoryDialogOpen}
        onOpenChange={setIsAddCategoryDialogOpen}
      >
        <DialogContent className="h-screen w-screen flex flex-col p-4">
          <DialogHeader className="p-4 shrink-0">
            <DialogTitle>新增類別</DialogTitle>
            <VisuallyHidden.Root>
              <DialogDescription />
            </VisuallyHidden.Root>
          </DialogHeader>
          <div className="overflow-auto">
            <div
              className={`flex items-center border rounded-lg p-2 transition-all duration-300 mb-4
              }`}
            >
              {/* <DynamicIcon name={emojiVal} size={24} /> */}
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
            {/* <div className="grid grid-cols-4 border rounded-md gap-4 p-2">
              {ICON_LIST.map((item) => (
                <div
                  key={item}
                  className=" p-2 my-0 mx-auto"
                  onClick={() => setEmojiVal(item)}
                >
                  <DynamicIcon name={item} />
                </div>
              ))}
            </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
