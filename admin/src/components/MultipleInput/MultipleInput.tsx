import type { ICountry } from '../../../../types/country.interface';
import type { IInputProps } from '@snitsweb/strapi-plugin-helper/types';

import { CountriesApiService } from '../../api/CountriesApiService';
import getTrad from '../../utils/getTrad';
import { sortCountries } from '../../utils/sortCountries';

import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { Typography, Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { PrimereactThemeProvider } from '@snitsweb/strapi-plugin-helper';


interface IInputPropsLocal extends IInputProps{
  attribute: {
    type: string,
    options?: {
      apiFields?: string,
    },
  },
}

const MultipleInput = ({
  value,
  onChange,
  name,
  attribute,
  disabled,
  required,
}: IInputPropsLocal) => {
  const { formatMessage } = useIntl();
  const [countries, setCountries] = useState<ICountry[]>([]);

  const setValue = (value: ICountry[] | null) => {
    onChange({
      target:
        {
          name,
          value: !value ? 'null' : JSON.stringify(value),
          type: attribute.type,
        },
    });
  };

  useEffect(() => {
    const setCountriesData = async () => {
      const apiFields = attribute.options?.apiFields ? JSON.parse(attribute.options.apiFields) : [];
      const response = await CountriesApiService.findAll(apiFields);

      if (!response || !Array.isArray(response)) throw new Error('Oops, something went wrong when fetching countries');

      setCountries(sortCountries(response));
    };

    setCountriesData();
  }, []);

  const localValue = (value === 'null' || !value?.length) ? null : JSON.parse(value);

  const label = formatMessage({ id: getTrad('country.plural') });
  const isInvalid = required ? !localValue?.length : false;
  const requiredMessage = formatMessage({ id: getTrad('validation.required') });
  const placeholder = formatMessage({ id: getTrad('input.placeholder') });

  const countryTemplate = (country: ICountry | null) => {
    if (country) {
      return (
        <div>
          {country.flag}
          {' '}
          {country.name.common}
        </div>
      );
    }
    return <div style={ { visibility: 'visible' } }>{placeholder}</div>;
  };

  return (
    <PrimereactThemeProvider>
      <Box paddingBottom={ 1 }>
        <Typography
          variant="pi"
          fontWeight="bold"
        >
          {label}
        </Typography>
      </Box>

      {/*  @ts-ignore */}
      <MultiSelect
        className={ `MultipleInput ${ isInvalid ? 'p-invalid' : '' }` }
        value={ countries.length ? localValue : [] }
        onChange={ (e) => setValue(e.value) }
        options={ countries }
        itemTemplate={ countryTemplate }
        disabled={ disabled }
        dataKey="name.common"
        display="chip"
        optionLabel="flag"
        filterBy="name.common"
        required={ required }
        filter
        showClear
      />
      {isInvalid && (
        <Box paddingTop={ 1 }>
          <Typography
            variant="pi"
            textColor="danger700"
            fontWeight="bold"
          >
            {requiredMessage}
          </Typography>
        </Box>
      )}
    </PrimereactThemeProvider>
  );
};

MultipleInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
};

MultipleInput.defaultProps = {
  required: false,
  disabled: false,
  value: [],
};

export default MultipleInput;
