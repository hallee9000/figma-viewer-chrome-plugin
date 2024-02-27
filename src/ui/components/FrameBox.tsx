import React from 'react';
import styled from 'styled-components';

const OuterBox = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin: 6px 0;
  background: gray;
  border-radius: 15px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MidBox = styled.div`
  position: absolute;
  width: 75%;
  height: 90px;
  background: steelblue;
  border: 1px solid white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const InnerBox = styled.div`
  position: absolute;
  width: 55%;
  height: 30px;
  background: gray;
  border: 1px dashed white;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.span`
  position: absolute;
  color: white;
  font-size: 10px;
  text-align: center;
`

const Line = styled.div`
    position: absolute;
    background: whitesmoke;
`

interface Props {
  data?: any
}

function normalizeValue(value: string) {
  return value.replace(/px|pt|pc|in|Q|mm|cm/, '') || '-'
}

export function FrameBox({ data }: Props) {
  const {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    width,
    height,
  } = data || {}
  return (
    <OuterBox>
      {/*BoxType*/}
      {/*{!!box && <span>{box}</span>}*/}

      {/*Margin*/}
      <Text style={{ top: '4.6%' }}>{normalizeValue(marginTop)}</Text>
      <Text style={{ right: '6%', transform: 'translateX(50%)' }}>{normalizeValue(marginRight)}</Text>
      <Text style={{ bottom: '4.6%' }}>{normalizeValue(marginBottom)}</Text>
      <Text style={{ left: '6%', transform: 'translateX(-50%)' }}>{normalizeValue(marginLeft)}</Text>

      {/*BorderRadius*/}
      {/*<Text style={{ top: '4.6%' }}>Border</Text>*/}
      <Text style={{ top: '4.6%', left: '6%', transform: 'translateX(-50%)' }}>{normalizeValue(borderTopLeftRadius)}</Text>
      <Text style={{ top: '4.6%', right: '6%', transform: 'translateX(50%)' }}>{normalizeValue(borderTopRightRadius)}</Text>
      <Text style={{ bottom: '4.6%', right: '6%', transform: 'translateX(50%)' }}>{normalizeValue(borderBottomRightRadius)}</Text>
      <Text style={{ bottom: '4.6%', left: '6%', transform: 'translateX(-50%)' }}>{normalizeValue(borderBottomLeftRadius)}</Text>
      <Line style={{ top: '-1px', width: '80%', height: '1px' }}/>
      <Line style={{ bottom: '-1px', width: '80%', height: '1px' }}/>
      <Line style={{ left: '-1px', height: '80%', width: '1px' }}/>
      <Line style={{ right: '-1px', height: '80%', width: '1px' }}/>

      <MidBox>
        {/*Padding*/}
        <Text style={{ top: '6.6%', left: '7%' }}>Padding</Text>
        <Text style={{ top: '6.6%' }}>{normalizeValue(paddingTop)}</Text>
        <Text style={{ right: '11%', transform: 'translateX(50%)' }}>{normalizeValue(paddingRight)}</Text>
        <Text style={{ bottom: '6.6%' }}>{normalizeValue(paddingBottom)}</Text>
        <Text style={{ left: '11%', transform: 'translateX(-50%)' }}>{normalizeValue(paddingLeft)}</Text>

        <InnerBox>
          {(width || height) ? <Text>{normalizeValue(width)}×{normalizeValue(height)}</Text> : <Text>-</Text>}
        </InnerBox>

      </MidBox>
    </OuterBox>
  )
}
