import { PrisciptionData } from "@/lib/types";
import { useState } from "react";
import { useSubmitFeedBackMutation } from "./mutations";

import { Loader2, SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface FeedBackInputProps {
  presciton: PrisciptionData;
}

export default function FeedBackInput({ presciton }: FeedBackInputProps) {
  const [input, setInput] = useState("");

  const mutation = useSubmitFeedBackMutation(presciton.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        presciption: presciton,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Textarea
        placeholder="Write a feedback..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        className="max-h-36 resize-none"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
