import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CategoryRes } from "@/types/category";
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
