import { AccountManager } from "./forms/account-form/account-manager";
import { CategoryManager } from "./forms/category-form/category-manager";

export default function AccountsPage() {
  return (
    <section className="flex flex-col h-full space-y-4 ">
      <AccountManager />
      <CategoryManager />
    </section>
  );
}
