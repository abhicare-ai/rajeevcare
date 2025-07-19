"use client";
import React, { useState } from "react";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import SerchDailog from "./SerchDailog";

export default function SearchBar() {
  const [showSearchDailog, setShowSearchDialog] = useState(false);
  return (
    <>
      <Button
        variant={"outline"}
        className="shrink-1 justify-start text-left font-normal"
        onClick={() => setShowSearchDialog(true)}
      >
        Search Patient ID, Number, Name
        <SearchIcon className="text-muted-foreground" />
      </Button>

      <SerchDailog
        onclose={() => setShowSearchDialog(false)}
        open={showSearchDailog}
      />
    </>
  );
}
