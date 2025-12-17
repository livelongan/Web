export type RouterProps = {
  id?: string
  index?: boolean

  path: string
  url: string
  name: string
  title: string
  children?: RouterProps[]
  showInMenu?: boolean
}
export type MenuProps = Omit<RouterProps, 'id' | 'children'> & {
  id: string
  children?: MenuProps[]
}
