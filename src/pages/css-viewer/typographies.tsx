import { observer } from 'mobx-react-lite'
import { PageLayout, Typography, TypographyProps } from '../../components'

const pageName = 'typographies'
const types: TypographyProps['type'][] = ['large', 'h1', 'h2', 'p', 'code', 'pre', 'span']
const themeColors: TypographyProps['themeColor'][] = [
    'primary',
    'info',
    'success',
    'warning',
    'error',
]
const textTransforms: TypographyProps['textTransform'][] = ['lowercase', 'capitalize']
const sizes: TypographyProps['fontSize'][] = ['xsmall', 'small', 'medium', 'large', 'xlarge']
const weights: TypographyProps['fontWeight'][] = ['light', 'normal', 'bold']
export const Typographies = observer(() => {
    return (
        <PageLayout id={pageName} direction="row" gap={20}>
            {themeColors.map((theme) => (
                <div key={theme}>
                    {types.map((type) => (
                        <Typography type={type} themeColor={theme} key={type}>
                            Theme Color {type !== 'large' ? 'Typography' : theme}
                        </Typography>
                    ))}
                </div>
            ))}
            {textTransforms.map((trans) => (
                <div key={trans}>
                    {types.map((type) => (
                        <Typography type={type} textTransform={trans} key={type}>
                            Transform {type !== 'large' ? 'Typography' : trans}
                        </Typography>
                    ))}
                </div>
            ))}
            <div>
                {sizes.map((it) => (
                    <Typography type={'p'} fontSize={it} key={`${it}`}>
                        p Font Size {it}
                    </Typography>
                ))}
            </div>
            <div>
                {weights.map((it) => (
                    <Typography type={'p'} fontWeight={it} key={`${it}`}>
                        p Font Weight {it}
                    </Typography>
                ))}
            </div>
        </PageLayout>
    )
})
