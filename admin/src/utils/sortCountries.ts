import type { ICountry } from '../../../types/country.interface';


export const sortCountries = (countries = [] as ICountry[]) => countries.sort((a, b) => {
  if (a.name.common < b.name.common) {
    return -1;
  }
  if (a.name.common > b.name.common) {
    return 1;
  }
  return 0;
});
