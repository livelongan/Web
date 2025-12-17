import { Tab, Tabs, type TabsProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState, type ReactNode } from 'react'
import { LinkNormal } from '../link'
type TabSourceProps = {
  value: string
  label: string | ReactNode
}
type TabsVerticalProps = TabsProps & {
  sources: TabSourceProps[] | any[]
  valueKey?: string
  labelKey?: string
}

export const TabsVertical = observer(
  ({
    sources,
    className = '',
    valueKey = 'value',
    labelKey = 'label',
    value,
    onChange,
    ...others
  }: TabsVerticalProps) => {
    const [selected, setSelected] = useState<string>()

    useEffect(() => {
      if (value !== undefined) {
        setSelected(value)
      }
    }, [value, sources, valueKey])

    return (
      <Tabs
        className={`tab-vertical ${className}`.trim()}
        value={selected ? selected : false}
        orientation='vertical'
        indicatorColor='primary'
        onChange={(_, newValue) => {
          window.location.hash = `#${newValue}`
          setSelected(newValue)
          if (onChange) {
            onChange(_, newValue)
          }
        }}
        slotProps={{
          indicator: {
            sx: {
              left: 0,
              right: 'unset',
              width: '4px',
            },
          },
          list: {
            sx: {
              borderLeft: '1px solid var(--border-color)',
            },
          },
        }}
        {...others}
      >
        {sources.map((source) => (
          <Tab
            sx={{
              alignItems: 'start',
              position: 'relative',
            }}
            disableRipple
            key={source[valueKey]}
            value={source[valueKey]}
            aria-controls={source[valueKey]}
            label={
              source[labelKey] && typeof source[labelKey] === 'string' ? (
                <LinkNormal
                  href={`#${source[valueKey]}`}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {source[labelKey]}
                </LinkNormal>
              ) : (
                source[labelKey]
              )
            }
          />
        ))}
      </Tabs>
    )
  },
)
