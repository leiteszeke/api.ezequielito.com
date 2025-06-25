export const isEmptyOrNull = (
  value?: string | null
): value is null | undefined | '' => {
  if (!value || value === null || value.trim() === '') {
    return true;
  }

  return false;
};
