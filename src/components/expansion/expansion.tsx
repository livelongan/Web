import { styled } from '@mui/material/styles'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import MuiAccordion, { type AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import {
  memo,
  useEffect,
  useId,
  useMemo,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import { TextNormal, TextSmall, TitleLevel3 } from '../typography'

type ExpansionType = PropsWithChildren<
  Omit<AccordionProps, 'defaultExpanded'>
> & {
  expanded?: boolean
  border?: boolean
  delivery?: boolean
  disabledIcon?: boolean
  title?: string | ReactNode
  secondaryTitle?: string | ReactNode
  style?: 'normal' | 'block' | 'flat'
  onChange?: (expanded: boolean) => void
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

export const Expansion = memo(
  ({
    style,
    id = 'expansion',
    expanded = true,
    border,
    delivery = true,
    disabledIcon,
    title,
    secondaryTitle,
    children,
    onChange,
    sx,
    className = '',
    ...others
  }: ExpansionType) => {
    const uniqueId = useId()
    const unique = useMemo(() => (id ? id : uniqueId), [id, uniqueId])
    const [opened, setOpened] = useState<boolean | undefined>(expanded)

    const handleChange = () => {
      setOpened(!opened)
      if (onChange) {
        onChange(!opened)
      }
    }

    useEffect(() => {
      if (expanded !== undefined) {
        setOpened(expanded)
      }
    }, [expanded])

    return (
      <Accordion
        className={`expansion ${className}`.trim()}
        component={'section'}
        sx={{
          border: border ? '1px solid var(--border-color)' : 'none',
          // backgroundColor:
          //   style === 'block'
          //     ? 'color-mix(in srgb, var(--primary-color) 20%, transparent)'
          //     : 'transparent',
          backgroundColor:
            style === 'block'
              ? 'color-mix(in srgb, var(--primary-color) 10%, transparent)'
              : 'transparent',
          ...(style === 'block'
            ? {
                backgroundColor:
                  'color-mix(in srgb, var(--primary-color) 10%, transparent)',
              }
            : undefined),
          ...sx,
        }}
        {...others}
        expanded={opened}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={!disabledIcon ? <KeyboardArrowDown /> : null}
          aria-controls={`${unique}-content`}
          id={`${unique}-header`}
          sx={{
            borderBottom:
              delivery || border ? '1px solid var(--border-color)' : 'none',
            // backgroundColor:
            //   style === 'block'
            //     ? 'color-mix(in srgb, var(--secondary-color) 80%, white)'
            //     : 'transparent',

            ...(style === 'block'
              ? {
                  backgroundColor: 'var(--secondary-color)',
                  '--text-primary': 'var(--primary-color)',
                }
              : undefined),
          }}
        >
          {!title || typeof title === 'string' ? (
            <TitleLevel3>{title}</TitleLevel3>
          ) : (
            title
          )}
          {!secondaryTitle || typeof secondaryTitle === 'string' ? (
            <TextSmall>{secondaryTitle}</TextSmall>
          ) : (
            secondaryTitle
          )}
        </AccordionSummary>
        {children && (
          <AccordionDetails>
            {typeof children === 'string' ? (
              <TextNormal>{children}</TextNormal>
            ) : (
              children
            )}
          </AccordionDetails>
        )}
      </Accordion>
    )
  },
)
