import { useEffect, useMemo, useRef } from 'react'
import {
  HotTable,
  // HotColumn,
  type HotTableRef,
} from '@handsontable/react-wrapper'
import { registerAllModules } from 'handsontable/registry'
import { LayoutPage } from '../../../components'
import { MateData } from './constant'
import 'handsontable/styles/handsontable.css'
import 'handsontable/styles/ht-theme-main.css'
import 'handsontable/styles/ht-theme-horizon.css'
import type Handsontable from 'handsontable'

// register Handsontable's modules
registerAllModules()

const manufacturerData = [
  { name: 'BMW', country: 'Germany', owner: 'Bayerische Motoren Werke AG' },
  { name: 'Chrysler', country: 'USA', owner: 'Chrysler Group LLC' },
  { name: 'Nissan', country: 'Japan', owner: 'Nissan Motor Company Ltd' },
  { name: 'Suzuki', country: 'Japan', owner: 'Suzuki Motor Corporation' },
  { name: 'Toyota', country: 'Japan', owner: 'Toyota Motor Corporation' },
  { name: 'Volvo', country: 'Sweden', owner: 'Zhejiang Geely Holding Group' },
]
export const LearningPage = () => {
  const hotRef = useRef<HotTableRef>(null)

  const columns = useMemo(() => {
    const cols: Handsontable.ColumnSettings[] = [
      {
        data: 'CompanyName',
        minWidth: 180,
        type: 'handsontable',
        handsontable: {
          colHeaders: ['Marque', 'Country', 'Parent company'],
          autoColumnSize: true,
          data: manufacturerData,
        },
      },
      { data: 'Country', minWidth: 220 },
      { data: 'Name', minWidth: 200 },
      {
        data: 'SellDate',
        type: 'date',
        dateFormat: 'DD/MM/YYYY',
        allowInvalid: false,
        minWidth: 150,
      },
      {
        data: 'InStock',
        type: 'checkbox',
        className: 'htCenter',
        minWidth: 120,
      },
      { data: 'Quantity', type: 'numeric', minWidth: 120 },
      { data: 'Phone', minWidth: 140 },
      { data: 'OrderID', type: 'numeric', minWidth: 140 },
    ]
    return cols.map((it) => ({
      ...it,
      maxWith: 400,
    }))
  }, [])
  useEffect(() => {
    if (!hotRef.current?.hotInstance) {
      return
    }
    hotRef.current.hotInstance.useTheme('ht-theme-horizon')
    // ht-theme-main
    // ht-theme-horizon
    // ht-theme-main-dark
    // ht-theme-horizon-dark
    // ht-no-theme
  }, [])

  return (
    <LayoutPage>
      <style>{`
        .ht-theme-horizon {
          --ht-checkbox-border-radius: 4px;
          --ht-wrapper-border-radius: 8px; 
        }
      `}</style>
      <HotTable
        // key={'ht-theme-main'}
        columns={columns}
        className='grid-table'
        ref={hotRef}
        data={MateData}
        height={'100%'}
        width={'100%'}
        colHeaders={[
          'Company Name',
          'Country',
          'Name',
          'Sell date',
          'In stock',
          'Quantity',
          'Phone',
          'Order ID',
        ]}
        contextMenu={[
          'cut',
          'copy',
          '---------',
          'row_above',
          'row_below',
          'remove_row',
          '---------',
          'alignment',
          'make_read_only',
          'clear_column',
        ]}
        dropdownMenu={true}
        hiddenColumns={{
          indicators: true,
        }}
        multiColumnSorting={true}
        filters={true}
        rowHeaders={true}
        headerClassName='htLeft'
        manualRowMove={true}
        autoWrapRow={true}
        autoWrapCol={true}
        manualRowResize={true}
        manualColumnResize={true}
        navigableHeaders={true}
        stretchH='all'
        autoColumnSize={{
          samplingRatio: 10, // 降低采样比例提升性能
          allowSampleDuplicates: false,
          syncLimit: 30, //限制同步计算的列数
          useHeaders: true, // 包含标题计算宽度
        }}
        licenseKey='non-commercial-and-evaluation'
        afterLoadData={() => {
          setTimeout(() => {
            hotRef.current?.hotInstance
              ?.getPlugin('autoColumnSize')
              .recalculateAllColumnsWidth()
          }, 100)
        }}
      >
        {/* <HotColumn data={'CompanyName'} />
        <HotColumn data={'Country'} />
        <HotColumn data={'Name'} />
        <HotColumn data={'SellDate'} type='date' allowInvalid={false} />
        <HotColumn data={'InStock'} type='checkbox' className='htCenter' />
        <HotColumn data={'Quantity'} type='numeric' />
        <HotColumn data={'Phone'} />
        <HotColumn data={'Order ID'} /> */}
      </HotTable>
    </LayoutPage>
  )
}
