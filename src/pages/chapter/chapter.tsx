import { Box, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import VerticalAlignTop from '@mui/icons-material/VerticalAlignTop'
import {
  ButtonBaseIcon,
  Expansion,
  LoadingIcon,
  TabsVertical,
  TextNormal,
  TitleLevel2,
} from '../../components'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { HEADER_HEIGHT } from '../../config/constant'
import { useScreenQuery } from '../../hooks'
import { CHAPTERS } from '../../resources'

const ARTICLE_GAP = 28
const CATALOGUE_OFFSET = 10

type ChapterProps = {
  id: string
  title: string
  sections?: typeof CHAPTERS
  fetched?: boolean
  loading?: boolean
}

export const ChapterPage = observer(() => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const catalogueRef = useRef<HTMLDivElement>(null)
  const { isMiddle, viewHeight, pagePaddingY } = useScreenQuery()
  const [hashed, setHashed] = useState(false)
  const [scrolled, setScrolled] = useState<string>()
  const [articleId, setArticleId] = useState<string>()
  const [currentId, setCurrentId] = useState<string>()
  const [chapterStatus, setChapterStatus] = useState<{
    [key: string]: ChapterProps
  }>({})
  const [sources] = useState<ChapterProps[]>([
    {
      id: 'chapter-1',
      title: 'chapter 1',
    },
    {
      id: 'chapter-2',
      title: 'chapter 2',
    },
    {
      id: 'chapter-3',
      title: 'chapter 3',
    },
    {
      id: 'chapter-4',
      title: 'chapter 4',
    },
    {
      id: 'chapter-5',
      title: 'chapter 5',
    },
    {
      id: 'chapter-6',
      title: 'chapter 6',
    },
    {
      id: 'chapter-7',
      title: 'chapter 7',
    },
  ])
  const [depandence] = useState<any>({})

  const fetchChapter = useCallback(
    (id: string) => {
      const chapter = sources.find((it) => id === it.id)
      if (chapter?.fetched) {
        return
      }
      if (chapter) {
        chapter.fetched = true
        const data = {
          ...chapter,
          sections: undefined,
          loading: true,
          fetched: true,
        }
        setChapterStatus({ [id]: data })
        setTimeout(() => {
          setChapterStatus({
            [id]: {
              ...data,
              loading: false,
            },
          })
          chapter.sections = CHAPTERS
        }, 1000)
      }
    },
    [sources],
  )
  depandence['fetchChapter'] = fetchChapter

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.slice(1)
    if (!hashed && hash && sources.some((it) => it.id === hash)) {
      setHashed(true)
      setArticleId(hash)
      depandence['fetchChapter'](hash)
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
  }, [depandence, hashed, sources])

  const handleScroll = useCallback(() => {
    sources.forEach((it) => {
      if (currentId) {
        setTimeout(() => {
          setCurrentId('')
        }, 500)
        return
      }
      const article = document.getElementById(it.id)
      const rect = article?.getBoundingClientRect()
      if (rect) {
        const top = HEADER_HEIGHT
        if (rect.top <= top && Math.abs(rect.top) <= rect.height - top) {
          if (scrolled !== it.id) {
            setScrolled(it.id)
          }
          setArticleId(it.id)
        }
        if (!currentId) {
          if (rect.top < viewHeight - HEADER_HEIGHT) {
            depandence['fetchChapter'](it.id)
          }
        }
      }
    })
  }, [currentId, depandence, scrolled, sources, viewHeight])

  depandence['handleHashChange'] = handleHashChange
  depandence['handleScroll'] = handleScroll

  useLayoutEffect(() => {
    setCurrentId(window.location.hash.slice(1))
    handleHashChange()
  }, [handleHashChange])

  useEffect(() => {
    const handleHashChange = depandence['handleHashChange']
    const handleScroll = depandence['handleScroll']
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [depandence])

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
            sources={sources}
            valueKey='id'
            labelKey='title'
            onChange={(_event, value) => {
              setArticleId(value)
              depandence['fetchChapter'](value)
            }}
          />
        </Expansion>
      </Box>
      <Stack component={'section'} alignItems={'center'} sx={{ flex: 1 }}>
        {sources.map((it) => (
          <Stack
            key={it.id}
            id={it.id}
            component={'article'}
            sx={{
              maxWidth: '800px',
              width: '100%',
              scrollMarginTop: `${HEADER_HEIGHT}px`,
              mb: '160px',
              border: '1px solid red',
            }}
          >
            {/* paragraphs */}
            <Stack
              sx={{
                '--line-height': '2',
                blockquote: { fontStyle: 'italic', padding: '0 2em' },

                '.translate': {
                  padding: '8px 1em',
                },
                width: '100%',
              }}
              gap={'30px'}
            >
              <Box component={'header'} sx={{ mt: `${ARTICLE_GAP}px` }}>
                <TitleLevel2 displayIcon>{it.title}</TitleLevel2>
              </Box>
              {chapterStatus[it.id] && chapterStatus[it.id].loading && (
                <LoadingIcon />
              )}

              {it.sections?.map((paragraph, index) => (
                <Stack
                  key={`${it.id}-${index}`}
                  sx={{
                    flexFlow: 'column',
                    '.MuiTypography-root': {
                      textIndent: '3em',
                    },
                  }}
                  gap={'30px'}
                >
                  {paragraph.content && (
                    <TextNormal>{paragraph.content}</TextNormal>
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
