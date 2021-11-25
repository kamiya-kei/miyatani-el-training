import React, { useState, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Role } from 'utils/types';

interface Inputs {
  roleId: Role['id'];
}

interface RoleFormProps {
  defaultValue: Role['id'];
  setValue: UseFormSetValue<Inputs>;
}

const RoleForm = (props: RoleFormProps) => {
  const [roleId, setRoleId] = useState(props.defaultValue);

  useEffect(() => {
    props.setValue('roleId', roleId);
  }, []);

  const handleChange = (event) => {
    const roleId: Role['id'] = event.target.value;
    setRoleId(roleId);
    props.setValue('roleId', roleId);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="role-label">ユーザータイプ</InputLabel>
      <Select
        labelId="role-label"
        value={roleId}
        label="ユーザータイプ"
        onChange={handleChange}
      >
        <MenuItem value="0">一般ユーザー</MenuItem>
        <MenuItem value="1">管理ユーザー</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RoleForm;
