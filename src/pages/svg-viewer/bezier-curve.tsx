import { observer } from 'mobx-react-lite'
import { PageLayout, SVG } from '../../components'
const pageName = 'bezier-curve'

export const BezierCurve = observer(() => {
    return (
        <PageLayout id={pageName} direction="row">
            <SVG>
                <symbol id="cuber2" width="200" height="200" viewBox="0 0 100 100">
                    <g stroke="#ff0000" fontSize={6} strokeWidth={0.4}>
                        <g fill="currentColor">
                            <path d="M 10,90 C 30,90 25,10 50,10 S 70,90 90,90" fill="none" />
                            <circle cx="10" cy="90" r="1.5" />
                            <text x="10" y="90" stroke="none" dx="-10" dy="10">
                                Start
                            </text>
                        </g>
                        <g fill="#10d912">
                            <circle cx="30" cy="90" r="1.5" />
                            <text x="30" y="90" stroke="none" dx="-4" dy="10">
                                C1
                            </text>
                            <circle cx="25" cy="10" r="1.5" />
                            <text x="25" y="10" stroke="none" dx="-4" dy="10">
                                C2
                            </text>
                            <circle cx="50" cy="10" r="1.5" />
                            <text x="50" y="10" stroke="none" dx="-4" dy="10">
                                C3
                            </text>
                        </g>

                        <g fill="#e230f1">
                            <text x="50" y="10" stroke="none" dx="5" dy="-4">
                                Start
                            </text>
                            <circle cx="70" cy="90" r="1.5" />
                            <text x="70" y="90" stroke="none" dx="-4" dy="10">
                                S2
                            </text>
                            <circle cx="90" cy="90" r="1.5" />
                            <text x="90" y="90" stroke="none" dx="-4" dy="10">
                                S3
                            </text>
                        </g>
                    </g>
                </symbol>
                <symbol id="cuber3" width="200" height="200" viewBox="0 0 100 100">
                    <g stroke="#ff0000" fontSize={6} strokeWidth={0.4}>
                        <g fill="currentColor">
                            <path fill="none" d="M 10,50 Q 25,25 40,50 t 30,0 20,0" />
                            <circle cx="10" cy="50" r="1.5" />
                            <text x="10" y="50" stroke="none" dx="-10" dy="10">
                                Start
                            </text>
                        </g>

                        <g fill="#10d912">
                            <circle cx="25" cy="25" r="1.5" />
                            <text x="25" y="25" stroke="none" dx="5" dy="-4">
                                Q1
                            </text>
                            <circle cx="40" cy="50" r="1.5" />
                            <text x="40" y="50" stroke="none" dx="-4" dy="10">
                                Q2
                            </text>
                        </g>
                        <g fill="#e230f1">
                            <circle cx="70" cy="50" r="1.5" />
                            <text x="70" y="50" stroke="none" dx="-9" dy="-4">
                                T1
                            </text>
                            <circle cx="90" cy="50" r="1.5" />
                            <text x="90" y="50" stroke="none" dx="-2" dy="10">
                                T2
                            </text>
                        </g>
                    </g>
                </symbol>
                <symbol id="cuber1" width="200" height="200" viewBox="0 0 100 100">
                    <g stroke="#ff0000" fontSize={6} strokeWidth={0.4}>
                        <path d="M 10,90 C 10,90 10,10 50,10 S 70,90 90,90" fill="none" />
                        <path d="M 50 48 C 30,30 51,12 56,16 S 70,30 56 48" fill="none" />
                        <path d="M 50 48 ,56 48, 56 53, 51 56, 48 50z" fill="none" />
                    </g>
                </symbol>

                <use href="#cuber1" y="0" x="0" style={{ outline: '1px solid' }} />
                <use href="#cuber2" y="0" x="300" />
                <use href="#cuber3" y="0" x="500" />

                <text x="300" y="250" fill="currentColor">
                    M 10, 90 C 30, 90 25, 10 50, 10 S 70, 90 90, 90
                </text>
                <text x="500" y="200" fill="currentColor">
                    M 10, 50 Q 25, 25 40, 50 t 30, 0 20, 0
                </text>
            </SVG>
        </PageLayout>
    )
})
