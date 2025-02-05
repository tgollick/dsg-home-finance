"use client";
import React from "react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  currentState: boolean;
};

const ContactedButton = (props: Props) => {
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate, isPending } = trpc.contactRouter.setContacted.useMutation({
    onSuccess: () => {
      console.log("Success!");
      utils.contactRouter.getContacts.invalidate();
      utils.contactRouter.getContact.invalidate({
        id: props.id,
      });

      if (window.location.pathname.startsWith("/admin/applications/edit")) {
        router.push("/admin/applications");
      }

      toast({
        title: "Contact contacted!",
        description: "Your contact has been marked as contacted.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Contact contacted function failed",
        description: error.toString(),
      });
    },
  });

  return (
    <Button
      onClick={() => mutate({ contactId: props.id })}
      className={`bg-red-600 font-white hover:bg-red-400 w-full ${
        props.currentState
          ? "bg-blue-700 hover:bg-blue-500 text-white"
          : "bg-green-700 hover:bg-green-500 text-white"
      }`}
      disabled={isPending}
      aria-label="Delete blog post"
    >
      {}
      {isPending
        ? "Changing contact..."
        : props.currentState
        ? "Set as not-contacted"
        : "Set as contacted"}
    </Button>
  );
};

export default ContactedButton;
