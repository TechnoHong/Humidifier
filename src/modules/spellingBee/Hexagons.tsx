import React, {useEffect, useState} from 'react'
import '../../theme/css/hexagons.css'
import styled from 'styled-components'
import {HexaKey} from './SpellingBeeContainer'

interface HexagonsProps {
  spells: HexaKey[]
  hexagonClickHandler: (key: HexaKey) => void
}

const Hexagons = ({spells, hexagonClickHandler}: HexagonsProps) => {
  const [hexaKeys, setHexaKeys] = useState(spells)

  useEffect(() => {
    setHexaKeys(movePrimeCenter(spells, getPrimeIdx(spells)))
  }, [spells])

  const getPrimeIdx = (spells: HexaKey[]): number => {
    for (let i = 0; i < spells.length; i++) {
      if (spells[i].isPrime) return i
    }
    return -1
  }

  const movePrimeCenter = (list: HexaKey[], primeIdx: number) => {
    if (list.length < 0) return

    const listCpy = JSON.parse(JSON.stringify(list))

    const target = listCpy.splice(primeIdx, 1)[0]

    listCpy.splice(3, 0, target)
    return listCpy
  }

  const oneHexagon = (key: HexaKey, index: number) => {
    return (
      <li
        key={index + key.key}
        className='hex'
        onClick={() => hexagonClick(key)}
      >
        <div className='hexIn'>
          <a className='hexLink'>
            <HexagonContainer id='hexBg' isPrime={key.isPrime}>
              {key.key}
            </HexagonContainer>
          </a>
        </div>
      </li>
    )
  }

  const hexagonClick = (key: HexaKey) => {
    hexagonClickHandler(key)
  }

  return (
    <div>
      <ul id='hexGrid'>
        {hexaKeys.map((value, index) => oneHexagon(value, index))}
      </ul>
    </div>
  )
}

const HexagonContainer = styled.div<{isPrime: boolean}>`
  background-color: ${props => (props.isPrime ? `#FFDE00` : `#EFEFEF`)};
`

export default Hexagons
