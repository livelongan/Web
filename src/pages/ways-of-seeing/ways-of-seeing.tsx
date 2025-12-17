import { Box, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import VerticalAlignTop from '@mui/icons-material/VerticalAlignTop'
import {
  ButtonBaseIcon,
  Expansion,
  TabsVertical,
  TextNormal,
  TextSmall,
  TitleLevel2,
} from '../../components'
import { useEffect, useRef, useState } from 'react'
import { HEADER_HEIGHT } from '../../config/constant'
import { useScreenQuery } from '../../hooks'
import { CHAPTER1 } from '../../resources'

const ARTICLE_GAP = 28
const CATALOGUE_OFFSET = 10
const SECTIONS = [
  {
    id: 'chapter-1',
    title: 'chapter 1',
    sections: CHAPTER1,
  },
]
export const WaysOfSeeing = observer(() => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const catalogueRef = useRef<HTMLDivElement>(null)
  const { isMiddle, pagePaddingY } = useScreenQuery()
  const [articleId, setArticleId] = useState<string>()

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && SECTIONS.some((it) => it.id === hash)) {
        setArticleId(hash)
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const offsetTop = element.offsetTop - HEADER_HEIGHT
            window.scrollTo({
              top: Math.max(0, offsetTop),
              behavior: 'smooth',
            })
          }
        }, 100)
      }
    }
    // initial
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      SECTIONS.forEach((it) => {
        const article = document.getElementById(it.id)
        const rect = article?.getBoundingClientRect()
        if (rect) {
          const top = HEADER_HEIGHT
          if (rect.top <= top && Math.abs(rect.top) <= rect.height - top) {
            setArticleId(it.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Stack
      flexDirection={isMiddle ? 'row-reverse' : 'column'}
      sx={{
        mb: '36px',
        gap: isMiddle ? '20px' : 0,
        flexGrow: 1,
        alignItems: 'flex-start',
      }}
    >
      <Box
        className={'catalogue'}
        ref={catalogueRef}
        sx={{
          position: 'sticky',
          top: `${HEADER_HEIGHT + (isMiddle ? CATALOGUE_OFFSET : 0) + (!isMiddle ? pagePaddingY : 0)}px`,
          zIndex: (theme) => theme.zIndex.appBar - 1,
          minWidth: isMiddle ? '180px' : '100%',
          maxWidth: '100%',
          background: 'var(--background-secondary)',
          paddingBottom: '8px',
        }}
      >
        <Expansion
          title='On this Page'
          expanded={isMiddle}
          delivery={!isMiddle}
          secondaryTitle={
            <ButtonBaseIcon
              component={'span'}
              ref={buttonRef}
              title={'Jump to top'}
              onClick={(event) => {
                event.stopPropagation()
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
                window.history.pushState(
                  '',
                  document.title,
                  window.location.pathname + window.location.search,
                )
                setArticleId(undefined)
              }}
            >
              <VerticalAlignTop />
            </ButtonBaseIcon>
          }
        >
          <TabsVertical
            value={articleId}
            sources={SECTIONS}
            valueKey='id'
            labelKey='title'
            onChange={(_event, value) => {
              setArticleId(value)
            }}
          />
        </Expansion>
      </Box>
      <Stack
        component={'section'}
        alignItems={'center'}
        gap={0}
        sx={{ flex: 1 }}
      >
        {SECTIONS.map((it) => (
          <Stack
            key={it.id}
            id={it.id}
            component={'article'}
            sx={{
              maxWidth: '800px',
              scrollMarginTop: `${HEADER_HEIGHT}px`,
            }}
          >
            <Box component={'header'} sx={{ mt: `${ARTICLE_GAP}px` }}>
              <TitleLevel2 displayIcon>{it.title}</TitleLevel2>
            </Box>
            <Stack
              sx={{
                '--line-height': '2',
                blockquote: { fontStyle: 'italic', padding: '0 2em' },
                '.MuiTypography-root': {
                  textIndent: '3em',
                },
                '.translate': {
                  // background: '#dbffd5',
                  // borderLeft: '4px solid var(--primary-color)',
                  padding: '8px 1em',
                },
              }}
              gap={'30px'}
            >
              {it.sections.map((paragraph, index) => (
                <Stack
                  key={index}
                  sx={{
                    flexFlow: 'column',
                    ...paragraph.styled,
                  }}
                  gap={'30px'}
                >
                  {paragraph.content && (
                    <TextNormal>{paragraph.content}</TextNormal>
                  )}
                  {paragraph.translate && (
                    <TextNormal className='translate'>
                      {paragraph.translate}
                    </TextNormal>
                  )}
                  {paragraph.blockquote && (
                    <>
                      <TextSmall component={'blockquote'}>
                        {paragraph.blockquote.content}
                      </TextSmall>
                      <TextSmall component={'blockquote'} className='translate'>
                        {paragraph.blockquote.translate}
                      </TextSmall>
                    </>
                  )}

                  {paragraph.image && (
                    <Stack
                      flexDirection={'row'}
                      justifyContent={'space-around'}
                      alignSelf={'center'}
                      flexWrap={'wrap'}
                      sx={{
                        img: {
                          maxWidth: '80%',
                          maxHeight: '90vh',
                        },
                      }}
                    >
                      {Array.isArray(paragraph.image) ? (
                        paragraph.image.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={'#'}
                            alt={img.alt}
                            title={img.title}
                            style={{ ...((img as any).styled ?? {}) }}
                          />
                        ))
                      ) : (
                        <img
                          src={'#'}
                          alt={paragraph.image.alt}
                          title={paragraph.image.title}
                          style={{ ...paragraph.image.styled }}
                        />
                      )}
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
})
