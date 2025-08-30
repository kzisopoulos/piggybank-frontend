import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import type { Subcategory } from "../../types/category";
import { SubcategoryForm } from "./subcategory-form";
import { useSubcategories } from "../../hooks/use-subcategories";

interface SubcategoryListProps {
  categoryId: string;
  subcategories: Subcategory[];
}

export function SubcategoryList({
  categoryId,
  subcategories,
}: SubcategoryListProps) {
  const {
    deleteSubcategoryMutation: { mutate: deleteSubcategory },
  } = useSubcategories();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);

  const handleDelete = (subcategoryId: string, subcategoryName: string) => {
    if (confirm(`Are you sure you want to delete "${subcategoryName}"?`)) {
      deleteSubcategory({ id: subcategoryId });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground">
          Subcategories
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Subcategory
        </Button>
      </div>

      {subcategories.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-muted rounded-md">
          <p className="text-sm text-muted-foreground mb-2">
            No subcategories yet
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add first subcategory
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-md border"
            >
              <div className="flex-1">
                <h5 className="font-medium text-sm">{subcategory.name}</h5>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setEditingSubcategory(subcategory)}
                  >
                    <Edit className="h-3 w-3 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleDelete(subcategory.id, subcategory.name)
                    }
                    className="text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {/* Add Subcategory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Subcategory</DialogTitle>
          </DialogHeader>
          <SubcategoryForm
            categoryId={categoryId}
            onSuccess={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Subcategory Dialog */}
      <Dialog
        open={!!editingSubcategory}
        onOpenChange={() => setEditingSubcategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          {editingSubcategory && (
            <SubcategoryForm
              categoryId={categoryId}
              subcategory={editingSubcategory}
              onSuccess={() => setEditingSubcategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
