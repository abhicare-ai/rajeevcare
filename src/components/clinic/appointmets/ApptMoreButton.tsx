import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppoinmentData } from "@/lib/types";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import DeletApptDialog from "./DeletApptDialog";


interface ApptMoreButtonProps {
  appt: AppoinmentData;
}
export default function ApptMoreButton({ appt }: ApptMoreButtonProps) {
  const [showDeletDailog, setShowDeletDialog] = useState(false);


  

  return (
    <>
      <DeletApptDialog
        onclose={() => setShowDeletDialog(false)}
        appt={appt}
        open={showDeletDailog}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="text-muted-foreground size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeletDialog(true)}>
            <span className="text-destructive flex items-center gap-3">
              <Trash2 className="size-4" /> Delete
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="text-muted-foreground flex items-center gap-3">
              <Edit className="size-4" /> Edit
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
     
    </>
  );
}
