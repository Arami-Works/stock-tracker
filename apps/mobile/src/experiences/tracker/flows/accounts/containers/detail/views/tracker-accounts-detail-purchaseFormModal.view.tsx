import { memo, useCallback, useEffect } from "react";
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
        title={isEdit ? "구매 수정" : "구매 추가"}
        submitLabel={isEdit ? "수정" : "추가"}
        onSubmit={handleSubmit(handleFormSubmit)}
        onClose={handleClose}
      >
        <TextInputField
          control={control}
          name="itemName"
          label="상품명"
          placeholder="트리니티 링"
          error={errors.itemName?.message}
        />
        <TextInputField
          control={control}
          name="amount"
          label="금액"
          placeholder="3200000"
          keyboardType="numeric"
          error={errors.amount?.message}
        />
        <TextInputField
          control={control}
          name="purchaseDate"
          label="구매일 (YYYY-MM-DD)"
          placeholder="2024-03-15"
          error={errors.purchaseDate?.message}
        />
        <TextInputField
          control={control}
          name="itemCategory"
          label="카테고리 (선택)"
          placeholder="주얼리"
          error={errors.itemCategory?.message}
        />
        <TextInputField
          control={control}
          name="storeLocation"
          label="매장 (선택)"
          placeholder="청담 부티크"
          error={errors.storeLocation?.message}
        />
        <TextInputField
          control={control}
          name="notes"
          label="메모 (선택)"
          placeholder="메모를 입력하세요"
          multiline
          error={errors.notes?.message}
        />
      </FormModal>
    );
  },
);

TrackerAccountsDetailPurchaseFormModalView.displayName =
  "TrackerAccountsDetailPurchaseFormModalView";
