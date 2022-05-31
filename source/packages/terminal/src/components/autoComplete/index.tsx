import { LazyQueryHookOptions } from '@apollo/client';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from 'formik';
import * as React from 'react';

interface TextFieldProps {
  name: string;
  filterOptions?: (options: any[], { inputValue }: any) => any[];
  label: string;
  serverName: string;
  queryHook: () => [
    (an: LazyQueryHookOptions) => void,
    { data: any; loading: boolean }
  ];
}

const AutoComTextField: React.FunctionComponent<TextFieldProps> = (props) => {
  const [field, _, helpers] = useField(props.name);
  const [loadData, { data, loading }] = props.queryHook();
  return (
    <Autocomplete
      value={field.value}
      loading={loading}
      disableClearable
      onBlur={() => helpers.setTouched(true)}
      onChange={(e, value) => helpers.setValue(value)}
      onTouchStart={() => helpers.setTouched(true)}
      onError={(err) => helpers.setError(`error at ${props.label}`)}
      isOptionEqualToValue={(option: any, value: any) =>
        option.value === value.value
      }
      onOpen={() =>
        loadData({
          variables: {
            limit: 3000,
          },
        })
      }
      onInputChange={(_: any, v: any) => {
        loadData({
          variables: {
            where: {
              name: {
                _like: `%${v}%`,
              },
            },
            limit: 3000,
          },
        });
      }}
      filterOptions={
        props.filterOptions ? props.filterOptions : (options) => options
      }
      options={data ? data[props.serverName] : []}
      renderInput={(params: any) => (
        <TextField {...params} label={props.label} />
      )}
      sx={{
        margin: 2,
        width: '90%',
      }}
    />
  );
};

export default AutoComTextField;
