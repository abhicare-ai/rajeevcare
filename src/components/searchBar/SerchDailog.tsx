"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import SearchFeed from "./SearchFeed";

interface SerchDailogProps {
  open: boolean;
  onclose: () => void;
}
export default function SerchDailog({ onclose, open }: SerchDailogProps) {
  function handlerOpenChange() {
    onclose();
  }

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    //24
    <Dialog open={open} onOpenChange={handlerOpenChange}>
      <DialogContent className="!max-w-[calc(100%-2rem)] !gap-0 !space-y-0 !p-0">
        <DialogHeader className="hidden">
          <DialogTitle className="text-center"></DialogTitle>
        </DialogHeader>

        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
          <input
            className="w-full rounded-none border-0 border-b-2 py-3 pr-12 pl-9 text-sm outline-0"
            placeholder="Search Patient ID or Case History Id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          className="scrollbar-hide hover:scrollbar-default overflow-x-auto"
          style={{
            scrollbarColor: "#6b7280 transparent", // thumb color + transparent track
            scrollbarWidth: "thin", // for Firefox
          }}
        >
          <SearchFeed query={debouncedSearchTerm} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
