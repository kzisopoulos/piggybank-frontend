import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Subcategory } from "../../types/category";
import { useSubcategories } from "../../hooks/use-subcategories";

interface SubcategoryFormProps {
  categoryId: string;
  subcategory?: Subcategory;
  onSuccess: () => void;
}

export function SubcategoryForm({
  categoryId,
  subcategory,
  onSuccess,
}: SubcategoryFormProps) {
  const {
    createSubcategoryMutation: { mutate: addSubcategory },
    updateSubcategoryMutation: { mutate: updateSubcategory },
  } = useSubcategories();
  const [formData, setFormData] = useState({
    name: subcategory?.name || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (subcategory) {
        updateSubcategory({
          id: subcategory.id,
          categoryId,
          ...formData,
        });
      } else {
        addSubcategory({
          categoryId,
          ...formData,
        });
      }
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subcategory-name">Subcategory Name</Label>
        <Input
          id="subcategory-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Restaurants, Groceries"
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting || !formData.name.trim()}>
          {isSubmitting
            ? "Saving..."
            : subcategory
            ? "Update Subcategory"
            : "Create Subcategory"}
        </Button>
      </div>
    </form>
  );
}
