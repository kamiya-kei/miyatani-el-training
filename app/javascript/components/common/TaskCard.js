import { styled } from '@mui/system';
import Card from '@mui/material/Card';

const TaskCard = styled(Card)(
  () => `
  max-width: 600px;
  margin: 15px;
`
);

export default TaskCard;
