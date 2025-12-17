import { observer } from 'mobx-react-lite'
import { Checkbox } from '@progress/kendo-react-inputs'
import { useState } from 'react'
import { StackLayout } from '@progress/kendo-react-layout'
import { BaseButton, BaseButtonProps, ButtonLayout, IconButton, PageLayout } from '../../components'
import { editToolsIcon, fileAddIcon, searchIcon } from '@progress/kendo-svg-icons'
import { ROUNDED } from '../../constants'

const data: Array<BaseButtonProps> = [
    {
        label: 'Search',
        themeColor: 'primary',
        svgIcon: searchIcon,
    },
    {
        mode: 'reset',
    },
    {
        mode: 'submit',
    },
    {
        mode: 'confirm',
    },
    {
        mode: 'cancel',
    },
    {
        mode: 'add',
        svgIcon: fileAddIcon,
    },
    {
        mode: 'edit',
        svgIcon: editToolsIcon,
    },
    {
        mode: 'submit',
        label: 'Submit Code',
        loading: true,
    },
    {
        mode: 'add',
        label: 'Add Code',
        loading: true,
    },
    {
        mode: 'reset',
        label: 'Reset Code',
        loading: true,
    },
]
export const Buttons = observer(() => {
    const [disabled, setDisabled] = useState(false)

    const handleChange = () => {
        setDisabled(!disabled)
    }

    return (
        <PageLayout>
            <StackLayout orientation={'vertical'}>
                <ButtonLayout>
                    <Checkbox label={'Disabled'} onChange={handleChange} />
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <BaseButton
                            rounded={ROUNDED}
                            {...it}
                            key={`${it.label}_${index}`}
                            disabled={disabled}
                            label={it.label}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <BaseButton
                            rounded={ROUNDED}
                            {...it}
                            disabled
                            key={`${it.label}_${index}`}
                            label={it.label}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <IconButton
                            size={'small'}
                            {...it}
                            key={`${it.label}_${index}`}
                            label={it.label}
                            disabled={disabled}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <IconButton
                            {...it}
                            key={`${it.label}_${index}`}
                            label={it.label}
                            disabled={disabled}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <IconButton
                            size={'large'}
                            {...it}
                            key={`${it.label}_${index}`}
                            label={it.label}
                            disabled={disabled}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <IconButton
                            {...it}
                            fillMode={'clear'}
                            size={'small'}
                            key={`${it.label}_${index}`}
                            label={it.label}
                            disabled={disabled}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <IconButton
                            {...it}
                            fillMode={'clear'}
                            key={`${it.label}_${index}`}
                            label={it.label}
                            disabled={disabled}
                        />
                    ))}
                </ButtonLayout>
                <ButtonLayout>
                    {data.map((it, index) => (
                        <IconButton
                            {...it}
                            fillMode={'clear'}
                            size={'large'}
                            key={`${it.label}_${index}`}
                            label={it.label}
                            disabled={disabled}
                        />
                    ))}
                </ButtonLayout>
            </StackLayout>
        </PageLayout>
    )
})
