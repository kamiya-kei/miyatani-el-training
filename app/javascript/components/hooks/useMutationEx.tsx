import { useEffect, useContext } from 'react';
import { UtilContext } from 'utils/contexts';
import { useMutation } from '@apollo/client';

type useMutationEx = typeof useMutation;

const useMutationEx: useMutationEx = (mutation, options) => {
  const [mutateFunction, args] = useMutation(mutation, options);
  const { loading, error } = args;

  const { util } = useContext(UtilContext);
  useEffect(() => util.setBackdrop(loading), [loading]);
  useEffect(() => {
    if (options.onError) return;
    if (!error) return;
    console.error(error);
    util.flashMessage(
      '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。',
      'error'
    );
  }, [error]);

  return [mutateFunction, args];
};

export default useMutationEx;
