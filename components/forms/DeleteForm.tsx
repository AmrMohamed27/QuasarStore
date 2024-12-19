import { Models } from "node-appwrite";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteFile } from "@/actions/file.actions";
import { usePathname } from "next/navigation";

const DeleteForm = ({
  file,
  setIsOpen,
}: {
  file: Models.Document;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // Toast
  const { toast } = useToast();
  // Path
  const path = usePathname();
  // Handle delete function
  const handleDelete = async () => {
    try {
      const result = await deleteFile({ file, path });
      console.log(result);
      toast({
        title: "File deleted successfully",
        description: "Your file has been deleted",
      });
    } catch (error) {
      toast({
        title: "Error deleting file",
        description:
          error?.toString() || "An error occurred while deleting the file",
        variant: "destructive",
      });
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 items-center text-center">
      {/* Header */}
      <h2 className="text-xl font-bold">
        Are you sure you want to Delete {file.name}?
      </h2>
      {/* Buttons */}
      <div className="flex flex-col gap-2 *:w-full w-full">
        {/* Delete Button */}
        <Button
          className="rounded-full p-6 bg-brand-red-1 hover:bg-brand-red-1 text-white w-full"
          onClick={handleDelete}
        >
          Delete
        </Button>
        {/* Cancel Button */}
        <Button className="rounded-full p-6" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteForm;
