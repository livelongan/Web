import { observer } from 'mobx-react-lite'

import {
  CardAction,
  CardNormal,
  LayoutGrid,
  LayoutPage,
  TextNormal,
} from '../../components'
import { useState } from 'react'

const cards = [
  {
    id: 1,
    title: 'Plants',
    description: 'Plants are essential for all life.',
  },
  {
    id: 2,
    title: 'Animals',
    description: 'Animals are a part of nature.',
  },
  {
    id: 3,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
]

export const WelcomePage = observer(() => {
  const [selectedCard, setSelectedCard] = useState(0)
  return (
    <LayoutPage>
      <LayoutGrid>
        {cards.map((card, index) => (
          <CardAction
            key={card.id}
            title={card.title}
            secondaryTitle={2000}
            selected={selectedCard === index}
            onClick={() => setSelectedCard(index)}
          >
            <TextNormal>{'2024/02/28'}</TextNormal>
            <TextNormal>{card.description}</TextNormal>
          </CardAction>
        ))}
      </LayoutGrid>
      <LayoutGrid>
        {cards.map((card) => (
          <CardNormal key={card.id} title={card.title} secondaryTitle={2000}>
            <TextNormal color='success'>{'2024/02/28'}</TextNormal>
            <TextNormal>{card.description}</TextNormal>
          </CardNormal>
        ))}
      </LayoutGrid>
    </LayoutPage>
  )
})
