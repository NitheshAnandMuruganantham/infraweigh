import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import * as React from 'react';

interface TextFieldProps {
  name: string;
  sx?: any;
  queryVariables?: any;
  filterOptions?: (options: any[], { inputValue }: any) => any[];
  label: string;
  serverName: string;
  queryHook: any;
}

const AutoComTextField: React.FunctionComponent<TextFieldProps> = (props) => {
  const [field, _, helpers] = useField(props.name);
  const [loadData, { data, loading }] = props.queryHook({
    variables: props?.queryVariables || [],
  });
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
      onInputChange={(_: any, v: string) => {
        let where = {};
        if (typeof v === 'string' && v.length > 0) {
          where = {
            _and: [
              {
                name: {
                  _ilike: `%${v}%`,
                },
              },
            ],
          };
        }

        loadData({
          variables: {
            where,
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
      sx={
        props.sx
          ? props.sx
          : {
              margin: 2,
              width: '90%',
            }
      }
    />
  );
};

export default AutoComTextField;
