import React, { useState, useEffect } from 'react';
import { UseFormSetValue, UseFormClearErrors } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { Role } from 'utils/types';

interface RoleFormProps {
  defaultValue: Role['id'];
  setValue?: UseFormSetValue<{ roleId: Role['id'] }>;
  onChange?: (roleId: Role['id']) => void;
  error?: boolean;
  clearErrors?: UseFormClearErrors<{ roleId: Role['id'] }>;
}

const RoleForm = (props: RoleFormProps) => {
  const [roleId, setRoleId] = useState(props.defaultValue);

  useEffect(() => {
    props.setValue?.('roleId', roleId);
  }, []);

  const handleChange = (event) => {
    const roleId: Role['id'] = event.target.value;
    setRoleId(roleId);
    props.setValue?.('roleId', roleId);
    props.clearErrors?.('roleId');
    props.onChange?.(roleId);
  };

  return (
    <FormControl fullWidth error={props.error}>
      <Select value={roleId} onChange={handleChange}>
        <MenuItem value="0">一般ユーザー</MenuItem>
        <MenuItem value="1">管理ユーザー</MenuItem>
      </Select>
      {props.error && (
        <FormHelperText>管理ユーザーが最低1人は必要です</FormHelperText>
      )}
    </FormControl>
  );
};

export default RoleForm;
