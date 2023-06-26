import { Loader, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import pluginMeta from '../../../plugin-meta';
import { CountriesApiService } from '../api/CountriesApiService';

const Input = ({
  value,
  onChange,
  name,
  attribute,
  ...props
}) => {
  const { formatMessage } = useIntl();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortCountries = (countries = []) => countries.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });

  const setValue = (value) => onChange({ target: { name, value, type: attribute.type } });

  useEffect(() => {
    const setCountriesData = async () => {
      setIsLoading(true);
      const response = await CountriesApiService.findAll();

      if (!response || !Array.isArray(response)) throw new Error('Oops, something went wrong when fetching countries');

      setCountries(sortCountries(response));
      setIsLoading(false);
    };
    setCountriesData();
  }, []);

  const customizeContent = (value) => {
    if (!value) return '';
    const valueObj = JSON.parse(value);
    return `${valueObj.flag} ${valueObj.name.common}`;
  };

  return (
    <SingleSelect
      label={ formatMessage({ id: `${pluginMeta.name}.Country` }) }
      placeholder="Ukraine..."
      onClear={ () => setValue('null') }
      value={ value === 'null' ? undefined : value }
      customizeContent={ customizeContent }
      onChange={ setValue }
      { ...props }
    >
      {
        countries.map((item) => (
          <SingleSelectOption
            value={ JSON.stringify(item) }
            key={ item.name.common }
          >
            {item.flag}
            {' '}
            {item.name.common}
          </SingleSelectOption>
        ))
      }
      {
        isLoading && <Loader small>Loading content...</Loader>
      }
    </SingleSelect>
  );
};

Input.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  required: false,
  labelAction: null,
  error: '',
  disabled: false,
  description: null,
};

export default Input;
