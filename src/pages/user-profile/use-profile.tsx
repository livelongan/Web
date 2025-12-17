import { observer } from 'mobx-react-lite'
import {
    TextBox,
    MaskedTextBox,
    NumericTextBox,
    Slider,
    RangeSlider,
    Rating,
    Switch,
    Checkbox,
    RadioButton,
    RadioGroup,
} from '@progress/kendo-react-inputs'
import { useMemo } from 'react'
import { PageLayout } from '../../components'

export const UserProfile = observer(() => {
    const data = useMemo(
        () => [
            { label: 'Option 1', value: 'one' },
            { label: 'Option 2', value: 'two' },
            { label: 'Option 3', value: 'three' },
        ],
        [],
    )

    return (
        <PageLayout style={{ minHeight: 450 }}>
            <div className="col-12 col-md-6 example-col">
                <p>TextBox</p>
                <TextBox placeholder="John Smith" />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>MaskedTextBox</p>
                <MaskedTextBox mask="9-000" defaultValue="_-___" />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>NumericTextBox</p>
                <NumericTextBox defaultValue={123.45} format="c2" />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>Slider</p>
                <Slider min={1} max={10} step={1} defaultValue={4} />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>RangeSlider</p>
                <RangeSlider min={1} max={100} step={1} defaultValue={{ start: 30, end: 70 }} />
            </div>
            {/* <div className="col-12 col-md-6 example-col">
                <p>ColorPicker</p>
                <ColorPicker />
            </div> */}
            <div className="col-12 col-md-6 example-col">
                <p>Switch</p>
                <Switch />
            </div>
            {/* <div className="col-12 col-md-6 example-col">
                <p>ColorGradient</p>
                <ColorGradient />
            </div> */}
            {/* <div className="col-12 col-md-6 example-col">
                <p>ColorPalette</p>
                <ColorPalette palette="office" tileSize={30} />
            </div> */}
            <div className="col-12 col-md-6 example-col">
                <p>Checkbox</p>
                <Checkbox label="Checkbox Option 1" defaultChecked={true} />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>RadioButton</p>
                <RadioButton
                    label="Radio Option 1"
                    name="group1"
                    value="option 1"
                    defaultChecked={true}
                />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>RadioGroup</p>
                <RadioGroup defaultValue={data[2].value} data={data} />
            </div>
            <div className="col-12 col-md-6 example-col">
                <p>Rating</p>
                <Rating defaultValue={2.5} precision={'half'} />
            </div>
        </PageLayout>
    )
})
