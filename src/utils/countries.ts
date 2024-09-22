type Country = {
  value: string;
  label: string;
};

export const getCountries = (
  t: (key: string) => string,
  i18n: any,
): Country[] => {
  const countryKeys = Object.keys(
    i18n.getResourceBundle(i18n.language, "translation").COUNTRIES,
  );

  return countryKeys.map((key) => ({
    value: key,
    label: t(`COUNTRIES.${key}`),
  }));
};
