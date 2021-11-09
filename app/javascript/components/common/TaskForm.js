import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import TaskCard from "common/TaskCard";
import FormItem from "common/FormItem";

const TaskForm = forwardRef((props, formRef) => {
    return (
      <form ref={formRef}>
        <TaskCard>
          <CardHeader title={props.title} />
          <CardContent>
            <FormItem>
              <TextField name="title"
                required
                fullWidth
                label="タスクタイトル"
                defaultValue={props.task.title || ''}
              />
            </FormItem>
            <FormItem>
              <TextField name="description"
                fullWidth
                multiline
                minRows={3}
                label="タスクの内容"
                defaultValue={props.task.description || ''}
              />
            </FormItem>
          </CardContent>
          <CardActions>
            <Stack spacing={2} direction="row">
              {props.children}
            </Stack>
          </CardActions>
        </TaskCard>
      </form>
    );
});

TaskForm.propTypes = {
  title: PropTypes.string,
  task:  PropTypes.object,
};

export default TaskForm;
