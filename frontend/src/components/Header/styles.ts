import styled from 'styled-components';

export const Container = styled.header`
  background: #D73035;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-details {
    h1 {
      color: #FFF;
      font-size: 32px;
    }

    h2{
      color: #FFF;
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #fff;
  color: #D73035;
  font-weight: 700;
  margin-top: 8px;
`;
