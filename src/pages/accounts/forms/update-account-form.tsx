import { useState } from "react";
import { useUpdateAccount } from "@/hooks/account/use-update-account";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle, Edit } from "lucide-react";
import {
  updateAccountSchema,
  type UpdateAccountPayload,
} from "@/api/accounts/update-account.schema";
import type { Account } from "@/api/accounts/get-accounts.schema";

interface UpdateAccountFormProps {
  account: Account;
}

export default function UpdateAccountForm({ account }: UpdateAccountFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: onUpdateAccount, isPending } = useUpdateAccount();

  const form = useForm<UpdateAccountPayload>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      id: account.id,
      name: account.name,
      type: account.type || "",
      currency: account.currency || "",
      balance: account.balance,
    },
  });

  // Reset form when dialog opens with current account data
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      form.reset({
        id: account.id,
        name: account.name,
        type: account.type || "",
        currency: account.currency || "",
        balance: account.balance,
      });
    }
  };

  const handleSubmit = (values: UpdateAccountPayload) => {
    onUpdateAccount(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-6"
          tabIndex={0}
          aria-label={`Edit ${account.name} account`}
        >
          <Edit className="text-amber-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
          <DialogDescription>
            Update your account information.
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
                    <input type="hidden" {...field} value={account.id} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter account name"
                      type="text"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account balance (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter starting account balance"
                      autoComplete="off"
                      type="number"
                      {...field}
                      {...form.register("balance", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Checking, Savings, Investment"
                      type="text"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. USD, EUR, GBP"
                      type="text"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending && <LoaderCircle className="size-4 animate-spin" />}
              Update Account
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
