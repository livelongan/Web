import { Box, ListSubheader, MenuItem, MenuList, styled } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { HEADER_HEIGHT, MENU_WIDTH } from '../../../config/constant'
import { useAppRouter, useAppPosition, type MenuProps } from '../../../router'
import { useCallback, useState } from 'react'
import { TextNormal } from '../../../components'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { useStores } from '../../../mobx/use-stores'

const Root = styled(Box)(() => ({
  position: 'sticky',
  borderRight: '1px solid var(--border-color)',
  overflow: 'hidden',
  overflowY: 'auto',
  paddingLeft: '2px',
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ['.menu-group']: {
    paddingRight: '12px',
  },
  ['.submenus']: {
    marginLeft: '16px',
    borderLeft: '1px solid var(--border-color)',
  },
  '&.collapse': {
    width: 0,
    borderRight: 'none',
  },
}))

export const Navigation = observer(() => {
  const { menus } = useAppRouter()
  const { navigate } = useAppPosition()
  const { baseStore } = useStores()
  const [selected, setSelected] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])

  const handleSelection = useCallback(
    (menu: MenuProps) => {
      setSelected(menu.id)
      navigate(menu.path)
    },
    [navigate],
  )

  const handleToggleSubmenu = useCallback((menu: MenuProps) => {
    setExpanded((prev) =>
      prev.includes(menu.id)
        ? prev.filter((id) => id !== menu.id)
        : [...prev, menu.id],
    )
  }, [])

  const handleRenderSubmenu = useCallback(
    (menus: MenuProps[]): React.ReactNode[] => {
      return menus.flatMap((it) => {
        if (!it.showInMenu) {
          return [null]
        }
        const children = it.children ?? []
        if (children.length > 0) {
          const items = [
            <MenuItem
              key={it.id}
              className='menu-group'
              onClick={() => handleToggleSubmenu(it)}
            >
              <TextNormal sx={{ flex: 1 }}>{it.title}</TextNormal>
              {expanded.includes(it.id) ? (
                <KeyboardArrowDown />
              ) : (
                <KeyboardArrowRight />
              )}
            </MenuItem>,
          ]

          if (expanded.includes(it.id)) {
            items.push(
              <MenuList key={`${it.id}-submenus`} dense className='submenus'>
                {handleRenderSubmenu(children)}
              </MenuList>,
            )
          }
          return items
        }

        return [
          <MenuItem
            key={it.id}
            onClick={() => handleSelection(it)}
            selected={selected === it.id}
            className={selected === it.id ? 'Mui-selected' : ''}
          >
            <TextNormal>{it.title}</TextNormal>
          </MenuItem>,
        ]
      })
    },
    [expanded, selected, handleSelection, handleToggleSubmenu],
  )

  return (
    <Root
      sx={{
        width: `${MENU_WIDTH}px`,
        top: `${HEADER_HEIGHT}px`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
      className={`app-menu ${!baseStore.openMenu ? 'collapse' : ''}`}
    >
      <MenuList dense>
        {menus.map((it) => {
          if (!it.showInMenu) {
            return null
          }
          const children = it.children ?? []
          if (children.length > 0) {
            return [
              <ListSubheader key={`${it.id}-header`}>{it.title}</ListSubheader>,
              ...handleRenderSubmenu(children),
            ]
          }
          return (
            <MenuItem
              key={it.id}
              onClick={() => handleSelection(it)}
              className={selected === it.id ? 'Mui-selected' : ''}
            >
              <TextNormal>{it.title}</TextNormal>
            </MenuItem>
          )
        })}
      </MenuList>
    </Root>
  )
})
