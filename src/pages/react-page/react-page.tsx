import { observer } from 'mobx-react-lite'

import {
    Button,
    ButtonGroup,
    DropDownButton,
    DropDownButtonItem,
    FloatingActionButton,
    SplitButton,
    SplitButtonItem,
    Toolbar,
    ToolbarSeparator,
    ChipList,
} from '@progress/kendo-react-buttons'

import {
    gearIcon,
    clipboardIcon,
    clipboardTextIcon,
    clipboardHtmlIcon,
    clipboardMarkdownIcon,
    boldIcon,
    italicIcon,
    underlineIcon,
    cutIcon,
    copyIcon,
    alignLeftIcon,
    alignRightIcon,
    alignCenterIcon,
    alignJustifyIcon,
    checkIcon,
} from '@progress/kendo-svg-icons'
import { PageLayout } from '../../components'

export const ReactPage = observer(() => {
    return (
        <PageLayout>
            <div className="example-col">
                <p>Button</p>
                <Button>Default</Button>
                <Button themeColor={'primary'}>Primary</Button>
                <Button disabled={true}>Disabled</Button>
            </div>
            <div className="example-col">
                <p>ButtonGroup</p>
                <ButtonGroup>
                    <Button togglable={true}>Option A</Button>
                    <Button togglable={true}>Option B</Button>
                    <Button togglable={true}>Option C</Button>
                </ButtonGroup>
            </div>
            <div className="example-col">
                <p>DropDownButton</p>
                <DropDownButton text="User Settings" svgIcon={gearIcon}>
                    <DropDownButtonItem text="My Profile" />
                    <DropDownButtonItem text="Friend Requests" />
                    <DropDownButtonItem text="Account Settings" />
                    <DropDownButtonItem text="Support" />
                    <DropDownButtonItem text="Log Out" />
                </DropDownButton>
            </div>
            <div className="example-col">
                <p>SplitButton</p>
                <SplitButton text="Paste" svgIcon={clipboardIcon}>
                    <SplitButtonItem text="Keep Text Only" svgIcon={clipboardTextIcon} />
                    <SplitButtonItem text="Paste as HTML" svgIcon={clipboardHtmlIcon} />
                    <SplitButtonItem text="Paste Markdown" svgIcon={clipboardMarkdownIcon} />
                    <SplitButtonItem text="Set Default Paste" />
                </SplitButton>
            </div>
            <div className="example-col">
                <p>Toolbar</p>
                <Toolbar>
                    <ButtonGroup>
                        <Button
                            className="k-toolbar-button"
                            svgIcon={boldIcon}
                            title="Bold"
                            togglable={true}
                        />
                        <Button
                            className="k-toolbar-button"
                            svgIcon={italicIcon}
                            title="Italic"
                            togglable={true}
                        />
                        <Button
                            className="k-toolbar-button"
                            svgIcon={underlineIcon}
                            title="Underline"
                            togglable={true}
                        />
                    </ButtonGroup>
                    <ToolbarSeparator />
                    <ButtonGroup>
                        <Button
                            className="k-toolbar-button"
                            svgIcon={alignLeftIcon}
                            title="Align Left"
                            togglable={true}
                        />
                        <Button
                            className="k-toolbar-button"
                            svgIcon={alignCenterIcon}
                            title="Align Center"
                            togglable={true}
                        />
                        <Button
                            className="k-toolbar-button"
                            svgIcon={alignRightIcon}
                            title="Align Right"
                            togglable={true}
                        />
                        <Button
                            className="k-toolbar-button"
                            svgIcon={alignJustifyIcon}
                            title="Align Justify"
                            togglable={true}
                        />
                    </ButtonGroup>
                    <ToolbarSeparator />
                    <Button className="k-toolbar-button" svgIcon={cutIcon} title="Cut">
                        Cut
                    </Button>
                    <ToolbarSeparator />
                    <Button className="k-toolbar-button" svgIcon={copyIcon} title="Copy">
                        Copy
                    </Button>
                    <ToolbarSeparator />
                    <Button className="k-toolbar-button" svgIcon={clipboardIcon} title="Paste">
                        Paste
                    </Button>
                </Toolbar>
                <p>Chip and ChipList</p>
                <ChipList
                    dir="rtl"
                    selection="single"
                    data={[
                        { text: 'Berry', value: 'berry' },
                        { text: 'Apple', value: 'apple' },
                        { text: 'Kiwi', value: 'kiwi' },
                        { text: 'Banana', value: 'banana' },
                    ]}
                />
            </div>
            <div className="example-col">
                <FloatingActionButton svgIcon={checkIcon} text="Floating Action Button" />
            </div>
        </PageLayout>
    )
})
