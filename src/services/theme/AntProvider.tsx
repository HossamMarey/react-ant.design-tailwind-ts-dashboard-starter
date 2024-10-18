

import type { FC, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import antAr from 'antd/lib/locale/ar_EG';
import antEn from 'antd/lib/locale/en_US';
import { useState } from 'react'
import { createCache, StyleProvider } from '@ant-design/cssinjs'
import { useDarkMode } from "./DarkModeProvider";
import { useColorsContext } from "./ColorsContext";

interface UiProviderProps {
  children: ReactNode;
  lang?: string;
  dark?: boolean;
}
export const UiProvider: FC<UiProviderProps> = ({ children, lang = 'en', dark }) => {

  const [cache] = useState(() => createCache())
  const { AntTheme } = useColorsContext()

  return (
    <ConfigProvider locale={lang === 'ar' ? antAr : antEn} theme={AntTheme}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};