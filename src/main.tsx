import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { App } from './app'
import { fetchConfig } from './config'
import 'handsontable/styles/handsontable.min.css'
import 'handsontable/styles/ht-theme-main.min.css'

// import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

// 导入 Open Sans 字体
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'

// 保留 Roboto 作为备用字体
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { env } from './env'

fetchConfig().then(() => {
  createRoot(document.getElementById('root')!).render(
    env.NODE_ENV === 'development' ? (
      <StrictMode>
        <App />
      </StrictMode>
    ) : (
      <App />
    ),
  )
})
