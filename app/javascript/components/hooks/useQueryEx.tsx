import { useEffect, useContext } from 'react';
import { UtilContext } from 'utils/contexts';
import { useQuery } from '@apollo/client';

type useQueryEx = typeof useQuery;

const useQueryEx: useQueryEx = (query, options) => {
  const args = useQuery(query, options);
  const { loading, error } = args;

  const { util } = useContext(UtilContext);
  useEffect(() => util.setBackdrop(loading), [loading]);
  useEffect(() => {
    if (!error) return;
    console.error(error);
    util.flashMessage(
      '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。',
      'error'
    );
  }, [error]);

  return { ...args, data: args.data || {} } as typeof args;
};

export default useQueryEx;
