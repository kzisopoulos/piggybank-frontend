import { useState } from "react";
import { useDeleteAccount } from "@/hooks/account/use-delete-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle, X } from "lucide-react";
import { deleteAccountSchema, type DeleteAccountPayload } from "@/api/accounts";

interface DeleteAccountFormProps {
  id: string;
  accountName: string;
  trigger?: React.ReactNode;
}

export function DeleteAccountForm({ id, accountName }: DeleteAccountFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: onDeleteAccount, isPending } = useDeleteAccount();

  const form = useForm<DeleteAccountPayload>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      id,
    },
  });

  const handleSubmit = (values: DeleteAccountPayload) => {
    onDeleteAccount(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-6"
          tabIndex={0}
          aria-label={`Delete ${accountName} account`}
        >
          <X className="text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{accountName}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending && <LoaderCircle className="size-4 animate-spin" />}
                Delete Account
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
