import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAccounts } from "@/hooks/account/use-get-accounts";
import { Edit } from "lucide-react";
import CreateAccountForm from "./forms/create-account-form";
import DeleteAccountForm from "./forms/delete-account-form";

export default function AccountsPage() {
  const { data } = useGetAccounts();

  return (
    <section className="flex flex-col h-full space-y-4 ">
      {/* Accounts */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-muted-foreground font-bold">Accounts:</h2>
        <CreateAccountForm />
      </div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ">
        {data?.data.map((acc) => (
          <Card
            tabIndex={0}
            key={acc.id}
            className="w-full cursor-pointer group"
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{acc.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{acc.name}</CardTitle>
                  <CardDescription>{acc.type}</CardDescription>
                </div>
              </div>
              <CardAction className="hidden group-focus-within:flex group-hover:flex group-focus:flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-6"
                  tabIndex={0}
                  aria-label={`Edit ${acc.name} account`}
                >
                  <Edit className="text-amber-600" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-6"
                  tabIndex={0}
                  aria-label={`Delete ${acc.name} account`}
                >
                  <DeleteAccountForm
                    accountId={acc.id}
                    accountName={acc.name}
                  />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <div>Balance:</div>
                <div className="text-green-600 font-bold  ">
                  {Intl.NumberFormat("el", {
                    style: "currency",
                    currency: "EUR",
                  }).format(acc.balance)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
