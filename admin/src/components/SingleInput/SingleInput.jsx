import { PrimereactThemeProvider } from '@snitsweb/strapi-plugin-helper/dist/components';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/vela-blue/theme.css';
import './style.css';

import PropTypes from 'prop-types';
import { Typography, Box } from '@strapi/design-system';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { CountriesApiService } from '../../api/CountriesApiService';
import getTrad from '../../utils/getTrad';
import { sortCountries } from '../../utils/sortString';

const SingleInput = ({
  value,
  onChange,
  name,
  attribute,
  disabled,
  required,
}) => {
  const { formatMessage } = useIntl();
  const [countries, setCountries] = useState([]);

  const setValue = (value) => {
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

  const countryTemplate = (option) => {
    if (option) {
      return (
        <div>
          {option.flag}
          {' '}
          {option.name.common}
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

      <Dropdown
        className={ `SingleInput ${isInvalid ? 'p-invalid' : ''}` }
        value={ localValue }
        onChange={ (e) => setValue(e.value) }
        options={ countries }
        itemTemplate={ countryTemplate }
        valueTemplate={ countryTemplate }
        disabled={ disabled }
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
