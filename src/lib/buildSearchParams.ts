interface Data {
  [key: string]: string | number;
}

export const buildSearchParams = (data: Data) => {
  const params = new URLSearchParams(
    Object.entries(data).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = String(value);
      }

      return acc;
    }, {} as Record<string, string>)
  );

  return params;
};
