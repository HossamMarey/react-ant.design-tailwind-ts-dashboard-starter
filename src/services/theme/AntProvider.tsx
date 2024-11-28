

import type { FC, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useState } from 'react'
import { createCache, StyleProvider } from '@ant-design/cssinjs'
import { useColorsContext } from "./ColorsContext";
import { useLanguage } from "../hooks";

interface UiProviderProps {
  children: ReactNode;
  lang?: string;
  dark?: boolean;
}
export const UiProvider: FC<UiProviderProps> = ({ children, lang = 'en', dark }) => {

  const [cache] = useState(() => createCache())
  const { AntTheme } = useColorsContext()
  const { activeLangInfo } = useLanguage()

  return (
    <ConfigProvider locale={activeLangInfo.antLocale} theme={AntTheme}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};