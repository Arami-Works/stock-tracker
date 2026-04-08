import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseCreateInputSchema } from "@stock-tracker/validation";
import { FormModal } from "@/shared/components/form-modal";
import { TextInputField } from "@/shared/components/text-input-field";
import type { z } from "zod";

type PurchaseFormData = z.infer<typeof purchaseCreateInputSchema>;

type PurchaseFormDefaultValues = {
  itemName?: string;
  amount?: number;
  purchaseDate?: string;
  itemCategory?: string;
  storeLocation?: string;
  notes?: string;
};

type TrackerAccountsDetailPurchaseFormModalViewProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: PurchaseFormData) => Promise<void>;
  defaultValues?: PurchaseFormDefaultValues;
};

export const TrackerAccountsDetailPurchaseFormModalView = memo(
  ({
    visible,
    onClose,
    onSubmit,
    defaultValues,
  }: TrackerAccountsDetailPurchaseFormModalViewProps) => {
    const { t } = useTranslation("tracker");
    const isEdit = !!defaultValues;

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<PurchaseFormData>({
      resolver: zodResolver(purchaseCreateInputSchema),
      defaultValues: {
        itemName: "",
        amount: undefined as unknown as number,
        purchaseDate: "",
        itemCategory: "",
        storeLocation: "",
        notes: "",
      },
    });

    useEffect(() => {
      if (visible && defaultValues) {
        reset({
          itemName: defaultValues.itemName ?? "",
          amount: defaultValues.amount ?? (undefined as unknown as number),
          purchaseDate: defaultValues.purchaseDate ?? "",
          itemCategory: defaultValues.itemCategory ?? "",
          storeLocation: defaultValues.storeLocation ?? "",
          notes: defaultValues.notes ?? "",
        });
      } else if (visible) {
        reset({
          itemName: "",
          amount: undefined as unknown as number,
          purchaseDate: "",
          itemCategory: "",
          storeLocation: "",
          notes: "",
        });
      }
    }, [visible, defaultValues, reset]);

    const handleClose = useCallback(() => {
      reset();
      onClose();
    }, [reset, onClose]);

    const handleFormSubmit = useCallback(
      async (data: PurchaseFormData) => {
        await onSubmit({
          itemName: data.itemName,
          amount: data.amount,
          purchaseDate: data.purchaseDate,
          itemCategory: data.itemCategory || undefined,
          storeLocation: data.storeLocation || undefined,
          notes: data.notes || undefined,
        });
        reset();
        onClose();
      },
      [onSubmit, reset, onClose],
    );

    return (
      <FormModal
        visible={visible}
        title={
          isEdit
            ? t("purchases.form.edit.title")
            : t("purchases.form.add.title")
        }
        submitLabel={
          isEdit
            ? t("purchases.form.edit.submit")
            : t("purchases.form.add.submit")
        }
        onSubmit={handleSubmit(handleFormSubmit)}
        onClose={handleClose}
      >
        <TextInputField
          control={control}
          name="itemName"
          label={t("purchases.form.fields.itemName.label")}
          placeholder={t("purchases.form.fields.itemName.placeholder")}
          error={errors.itemName?.message}
        />
        <TextInputField
          control={control}
          name="amount"
          label={t("purchases.form.fields.amount.label")}
          placeholder={t("purchases.form.fields.amount.placeholder")}
          keyboardType="numeric"
          error={errors.amount?.message}
        />
        <TextInputField
          control={control}
          name="purchaseDate"
          label={t("purchases.form.fields.purchaseDate.label")}
          placeholder={t("purchases.form.fields.purchaseDate.placeholder")}
          error={errors.purchaseDate?.message}
        />
        <TextInputField
          control={control}
          name="itemCategory"
          label={t("purchases.form.fields.itemCategory.label")}
          placeholder={t("purchases.form.fields.itemCategory.placeholder")}
          error={errors.itemCategory?.message}
        />
        <TextInputField
          control={control}
          name="storeLocation"
          label={t("purchases.form.fields.storeLocation.label")}
          placeholder={t("purchases.form.fields.storeLocation.placeholder")}
          error={errors.storeLocation?.message}
        />
        <TextInputField
          control={control}
          name="notes"
          label={t("purchases.form.fields.notes.label")}
          placeholder={t("purchases.form.fields.notes.placeholder")}
          multiline
          error={errors.notes?.message}
        />
      </FormModal>
    );
  },
);

TrackerAccountsDetailPurchaseFormModalView.displayName =
  "TrackerAccountsDetailPurchaseFormModalView";
