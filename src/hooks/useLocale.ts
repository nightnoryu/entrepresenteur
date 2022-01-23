import { Locale } from '../model/types';
import { useSelector } from 'react-redux';
import { RootState } from '../state/reducers';

function useLocale(): Locale {
  return useSelector((editor: RootState) => editor.locale);
}

export default useLocale;
