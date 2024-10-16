export const parseEmptyString = (value: string | undefined): string => {
  if (!value) {
    return "";
  }

  return value.toString();
};

export const parseString = (value: string | undefined): string => {
  return (value ?? "").toString();
};

export const parseNumber = (value: string | undefined): number => {
  return Number(value ?? 0);
};

export const parseBoolean = (value: string | boolean | undefined): boolean => {
  if (!value) {
    return false;
  }

  if (value === "true" || value === true) {
    return true;
  }

  return false;
};
