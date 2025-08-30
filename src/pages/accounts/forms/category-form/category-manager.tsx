import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategories } from "../../hooks/use-categories";
import { CategoryForm } from "./category-form";
import { CategoryList } from "./category-list";

export function CategoryManager() {
  const {
    categoriesQuery: { data: categories, isLoading },
  } = useCategories();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  console.log(categories);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground">
            {categories?.length} categories,{" "}
            {/* {categories.reduce((acc, cat) => acc + cat.subcategories.length, 0)}{" "} */}
            subcategories
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {categories?.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
          <div className="text-muted-foreground mb-4">No categories yet</div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create your first category
          </Button>
        </div>
      ) : (
        <CategoryList categories={categories || []} />
      )}
    </div>
  );
}
