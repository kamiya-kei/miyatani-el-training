import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import TaskCard from "common/TaskCard";
import FormItem from "common/FormItem";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

const TaskForm = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleAction = data => {
    props.onAction(data);
  };

  return (
    <form>
      <TaskCard>
        <CardHeader title={props.title} />
        <CardContent>
          <FormItem>
            <TextField name="title"
              fullWidth
              label="タスクタイトル"
              defaultValue={props.task.title || ''}
              {...register('title', { required: true })}
              error={!!errors.title}
              helperText={errors.title && 'タイトルを入力してください'}
            />
          </FormItem>
          <FormItem>
            <TextField name="description"
              fullWidth
              multiline
              minRows={3}
              label="タスクの内容"
              defaultValue={props.task.description || ''}
              {...register('description')}
            />
          </FormItem>
        </CardContent>
        <CardActions>
          <Stack spacing={2} direction="row">
            <Button variant="contained" size="small" color="primary" onClick={handleSubmit(handleAction)}>{props.buttonText}</Button>
            <Button variant="contained" size="small" color="secondary" component={Link} to="/" >キャンセル</Button>
          </Stack>
        </CardActions>
      </TaskCard>
    </form>
  );
};

TaskForm.propTypes = {
  title: PropTypes.string,
  task:  PropTypes.object,
  buttonText: PropTypes.string,
  onAction: PropTypes.func,
};

export default TaskForm;
