import * as React from 'react'
import {
    Grid,
    GridColumn as Column,
    GridPageChangeEvent,
    GridCellProps,
} from '@progress/kendo-react-grid'
import { Skeleton } from '@progress/kendo-react-indicators'
import { Order } from './types'
const init = {
    method: 'GET',
    accept: 'application/json',
    headers: {},
}
export const Table = () => {
    const requestInProgress = React.useRef(false)
    const pageSize = 25
    const total = 830
    const baseUrl = `https://demos.telerik.com/kendo-ui/service-v4/odata/Orders?$count=true&$top=60&$skip=`

    const [orders, setOrders] = React.useState<Order[]>([])
    const [page, setPage] = React.useState({
        skip: 0,
        take: pageSize,
    })

    const requestData = React.useCallback(
        (skipParameter: number) => {
            if (requestInProgress.current) {
                // perform only one request at a time
                return
            }
            requestInProgress.current = true
            const skip = Math.max(skipParameter - pageSize, 0) // request the prev page as well
            fetch(baseUrl + skip, init)
                .then((response) => response.json())
                .then((json) => {
                    requestInProgress.current = false
                    const data: any[] = json['value']
                    const newOrders: any[] =
                        orders.length === total
                            ? [...orders]
                            : new Array(total).fill({}).map((e, i) => ({
                                  Index: i,
                              }))
                    data.forEach((order, i) => {
                        newOrders[i + skip] = {
                            Index: i + skip,
                            ...order,
                        }
                    })
                    setOrders(newOrders)
                })
        },
        [baseUrl, orders],
    )

    const requestIfNeeded = React.useCallback(
        (skip: number) => {
            for (let i = skip; i < skip + pageSize && i < orders.length; i++) {
                if (orders[i].OrderID === undefined) {
                    // request data only if not already fetched
                    requestData(skip)
                    return
                }
            }
        },
        [orders, requestData],
    )

    React.useEffect(() => {
        requestIfNeeded(page.skip)
    }, [orders, page.skip, requestIfNeeded])

    React.useEffect(() => {
        // request the first page on initial load
        requestData(0)
    }, [requestData])

    const pageChange = (event: GridPageChangeEvent) => {
        console.log(total, event.page.take, event.page.skip)
        requestIfNeeded(event.page.skip)
        setPage(event.page)
    }

    const loadingCell = (tdElement: any, props: GridCellProps) => {
        const field = props.field ?? ''

        if (props.dataItem[field] === undefined) {
            // shows loading cell if no data
            return (
                <td>
                    <Skeleton
                        shape={'text'}
                        style={{
                            width: '100%',
                        }}
                    />
                </td>
            )
        } // default rendering for this cell

        return tdElement
    }
    return (
        <Grid
            style={{
                height: '440px',
            }}
            rowHeight={50}
            data={orders.slice(page.skip, page.skip + pageSize)}
            pageSize={pageSize}
            total={total}
            skip={page.skip}
            scrollable={'virtual'}
            onPageChange={pageChange}
            cellRender={loadingCell}
            dataItemKey={'OrderID'}
            pageable={true}
        >
            <Column field="Index" title="Index" width="100px" />
            <Column field="OrderID" title="Order Id" width="100px" />
            <Column field="ShipCountry" title="Ship Country" />
            <Column field="ShipName" title="Ship Name" />
        </Grid>
    )
}
