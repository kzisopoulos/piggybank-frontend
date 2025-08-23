import { useState } from "react";
import { useCreateAccount } from "@/hooks/account/use-create-account";
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
import { LoaderCircle, Plus } from "lucide-react";
import {
  createAccountSchema,
  type CreateAccountPayload,
} from "@/api/accounts/create-account.schema";

export default function CreateAccountForm() {
  const [open, setOpen] = useState(false);
  const { mutate: onCreateAccount, isPending } = useCreateAccount();

  const form = useForm<CreateAccountPayload>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: "",
      currency: "",
      balance: 0,
    },
  });

  const handleSubmit = (values: CreateAccountPayload) => {
    onCreateAccount(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Create a new account to start tracking your finances.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
              Create Account
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
