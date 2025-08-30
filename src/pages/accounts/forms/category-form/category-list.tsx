import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useCategories } from "../../hooks/use-categories";
import { SubcategoryList } from "./subcategory-list";
import { CategoryForm } from "./category-form";
import type { Category } from "../../types/category";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  const {
    deleteCategoryMutation: { mutate: deleteCategory },
  } = useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDelete = (categoryId: string, categoryName: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${categoryName}"? This will also delete all its subcategories.`
      )
    ) {
      deleteCategory({ id: categoryId });
    }
  };

  return (
    <>
      <div className="grid gap-4">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);

          return (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {category.type.toLowerCase()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.subcategories.length} subs
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpanded(category.id)}
                      className="flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      {isExpanded ? "Hide" : "Show"} subcategories
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingCategory(category)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toggleExpanded(category.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Subcategory
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(category.id, category.name)
                          }
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <SubcategoryList
                    categoryId={category.id}
                    subcategories={category.subcategories}
                  />
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Dialog
        open={!!editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              category={editingCategory}
              onSuccess={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
