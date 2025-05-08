import { AppoinmentData } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LodingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useDeleteApptMutation } from "./mutaions";

interface DeletApptDialogProps {
  appt: AppoinmentData;
  open: boolean;
  onclose: () => void;
}
export default function DeletApptDialog({
  appt,
  onclose,
  open,
}: DeletApptDialogProps) {
  const mutaion = useDeleteApptMutation();

  function handlerOpenChange() {
    onclose();
  }
  return (
    <Dialog open={open} onOpenChange={handlerOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this appointment? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <LodingButton
            variant="destructive"
            onClick={() => mutaion.mutate(appt.id, { onSuccess: onclose })}
            loading={mutaion.isPending}
          >
            Delete
          </LodingButton>
          <Button
            variant="outline"
            onClick={onclose}
            disabled={mutaion.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
