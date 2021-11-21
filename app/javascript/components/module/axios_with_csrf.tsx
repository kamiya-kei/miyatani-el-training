import axios from 'axios';

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': (
    document.getElementsByName('csrf-token')[0] as HTMLMetaElement
  )?.content,
};

export default axios;
