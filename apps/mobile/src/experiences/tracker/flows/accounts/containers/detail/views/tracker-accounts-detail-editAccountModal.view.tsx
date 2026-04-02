import { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountUpdateInputSchema } from "@stock-tracker/validation";
import { FormModal } from "@/shared/components/form-modal";
import { TextInputField } from "@/shared/components/text-input-field";
import type { z } from "zod";

type AccountUpdateFormData = z.infer<typeof accountUpdateInputSchema>;

type TrackerAccountsDetailEditAccountModalViewProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    storeName?: string;
    saName?: string;
    notes?: string;
  }) => Promise<void>;
  currentValues: {
    id: string;
    storeName: string;
    saName: string;
    notes: string;
  };
};

export const TrackerAccountsDetailEditAccountModalView = memo(
  ({
    visible,
    onClose,
    onSubmit,
    currentValues,
  }: TrackerAccountsDetailEditAccountModalViewProps) => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<AccountUpdateFormData>({
      resolver: zodResolver(accountUpdateInputSchema),
      defaultValues: {
        id: currentValues.id,
        storeName: currentValues.storeName,
        saName: currentValues.saName,
        notes: currentValues.notes,
      },
    });

    useEffect(() => {
      if (visible) {
        reset({
          id: currentValues.id,
          storeName: currentValues.storeName,
          saName: currentValues.saName,
          notes: currentValues.notes,
        });
      }
    }, [visible, currentValues, reset]);

    const handleClose = useCallback(() => {
      reset();
      onClose();
    }, [reset, onClose]);

    const handleFormSubmit = useCallback(
      async (data: AccountUpdateFormData) => {
        await onSubmit({
          storeName: data.storeName || undefined,
          saName: data.saName || undefined,
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
        title="SA 계좌 수정"
        submitLabel="수정"
        onSubmit={handleSubmit(handleFormSubmit)}
        onClose={handleClose}
      >
        <TextInputField
          control={control}
          name="storeName"
          label="부티크 이름"
          placeholder="청담 부티크"
          error={errors.storeName?.message}
        />
        <TextInputField
          control={control}
          name="saName"
          label="SA 이름 (선택)"
          placeholder="김서연 SA"
          error={errors.saName?.message}
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

TrackerAccountsDetailEditAccountModalView.displayName =
  "TrackerAccountsDetailEditAccountModalView";
