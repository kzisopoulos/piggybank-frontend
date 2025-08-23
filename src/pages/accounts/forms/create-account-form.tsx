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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import {
  createAccountSchema,
  type CreateAccountPayload,
} from "@/api/accounts/create-account.schema";

export default function CreateAccountForm() {
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
    onCreateAccount(values);
    form.reset();
  };

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardDescription>
            Create a new account to start managing your finances
          </CardDescription>
        </CardHeader>

        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
