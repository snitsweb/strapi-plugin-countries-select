import type { IInputProps } from '@snitsweb/strapi-plugin-helper/types';
import type { ICountry } from '../../../../types/country.interface';

import { CountriesApiService } from '../../api/CountriesApiService';
import getTrad from '../../utils/getTrad';
import { sortCountries } from '../../utils/sortCountries';

import { Dropdown } from 'primereact/dropdown';
import { PrimereactThemeProvider } from '@snitsweb/strapi-plugin-helper/dist/components';
import { Box, Typography } from '@strapi/design-system';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/vela-blue/theme.css';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './style.css';


interface IInputPropsLocal extends IInputProps{
  attribute: {
    type: string,
    options?: {
      apiFields?: string,
    },
  },
}

const SingleInput = ({
  value,
  onChange,
  name,
  attribute,
  disabled,
  required,
}: IInputPropsLocal) => {
  const { formatMessage } = useIntl();
  const [countries, setCountries] = useState<ICountry[]>([]);

  const setValue = (value: ICountry | null) => {
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

  const label = formatMessage({ id: getTrad('country.singular') });
  const isInvalid = required ? !localValue : false;
  const requiredMessage = formatMessage({ id: getTrad('validation.required') });
  const placeholder = formatMessage({ id: getTrad('input.placeholder') });

  const countryTemplate = (country: ICountry) => {
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
      <Dropdown
        className={ `SingleInput ${ isInvalid ? 'p-invalid' : '' }` }
        value={ localValue }
        onChange={ (e) => setValue(e.value) }
        options={ countries }
        itemTemplate={ countryTemplate }
        valueTemplate={ countryTemplate }
        disabled={ disabled }
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

SingleInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};

SingleInput.defaultProps = {
  required: false,
  disabled: false,
  value: null,
};

export default SingleInput;
