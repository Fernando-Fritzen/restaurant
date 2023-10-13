import styled from 'styled-components';


export const Container = styled.div`
  margin-top: 0;
  flex: 1;
  background: #fafafa;
  padding: 20px 30px 0 30px;
  display: flex;
  gap: 15px;
  color: #666;
  width: 100vw;
  max-width: 100vw;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ItemContainer = styled.div`
  background: #fff;
  width: max(200px, 20vw);
  border-radius: 10px;
  padding: 10px;
  position: relative;
  min-height: 160px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  div {
    margin-bottom: 10px;
    max-height: 120px;
    overflow: hidden;
  }

  div:last-child {
    text-align: end;
    margin: 0;
    padding: 5px 10px;
    position: absolute;
    bottom: 0;
    right: 0px;
    width: 100%;
    background: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 5px 10px;
      border-radius: 10px;
      background: #fff;
      border: 1px solid #D73035;
      color: #D73035;
      font-weight: 700;
    }
  }
`;

export const ItemTitle = styled.div`
  text-align: center;
`;

export const ShoppingCartInfo = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #D73035;
    position: absolute;
    bottom: 30px;
    color: #fff;
    border-radius: 10px;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
`;
