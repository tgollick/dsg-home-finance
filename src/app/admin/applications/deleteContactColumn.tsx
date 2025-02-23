import { LucideTrash2 } from "lucide-react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import { toast } from "@/hooks/use-toast";

const DeleteContactColumn = ({ id }: { id: string }) => {
  const utils = trpc.useUtils();

  const deleteContact = trpc.contactRouter.deleteContact.useMutation({
    onSuccess: () => {
      utils.contactRouter.getContacts.invalidate();

      toast({
        title: "Contact Deleted Successfully",
        description: "You have successfully deleted the contact.",
      });
    },
    onError: () => {
      toast({
        title: "Contact Deletion Error",
        description:
          "There has been an error deleting the contact. Please contact your system administrator",
        variant: "destructive",
      });
    },
  });

  return (
    <div
      className="flex items-center gap-2 text-red-500 hover:cursor-pointer"
      onClick={async () => {
        await deleteContact.mutate({
          contactId: id,
        });
      }}
    >
      <LucideTrash2 className="h-4 w-4" />
      <span>Delete Contact</span>
    </div>
  );
};

export default DeleteContactColumn;
