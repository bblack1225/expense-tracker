import { RefreshCw } from "lucide-react";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  onDelete: () => void;
  isDeleting: boolean;
};

export function DeleteRecordAlertDialog({ onDelete, isDeleting }: Props) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>刪除</AlertDialogTitle>
        <AlertDialogDescription>
          請問您確定要刪除此筆紀錄?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <Button onClick={onDelete}>
          {isDeleting ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          確認
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
