import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function deleteRecord(recordId: string) {
  return await axios.delete(`/api/records/${recordId}`);
}

export function useDeleteRecord(onSuccess?: () => void) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteRec, isPending: isDeleting } = useMutation({
    mutationFn: (recordId: string) => deleteRecord(recordId),
    onSuccess: () => {
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["records"] });
      if (onSuccess) onSuccess();
    },
  });

  const handleDelete = (recordId: string) => {
    deleteRec(recordId);
  };

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    isDeleting,
    handleDelete,
  };
}
