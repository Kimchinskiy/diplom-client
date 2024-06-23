// YooMoneyForm.js
import React from 'react';
import { Button } from 'react-bootstrap';

const YooMoneyForm = ({ totalPrice, isAgreed }) => {
  return (
    <form className="yoomoney-payment-form" action="https://yookassa.ru/integration/simplepay/payment" method="post" acceptCharset="utf-8">
      <input name="shopId" type="hidden" value="338048" />
      <input name="sum" type="hidden" value={totalPrice} />
      <input name="scid" type="hidden" value="57331" />
      <input name="shopSuccessURL" type="hidden" value="https://your-success-url.com" />
      <input name="shopFailURL" type="hidden" value="https://your-fail-url.com" />
      <input name="customerNumber" type="hidden" value="123456789" />
      <input name="cps_email" type="hidden" value="user@example.com" />
      <input name="cps_phone" type="hidden" value="79991234567" />
      <Button
        type="submit"
        
        className="ym-button"
        style={{
          fontFamily: 'montserrat',
          backgroundColor: isAgreed ? '#1d6fe0' : 'gray', 
          borderRadius: '10px',
          padding: '10px 20px',
          fontSize: '20px',
          width: '100%',
          border: "none",
          marginTop: '1rem'
        }}
        disabled={!isAgreed} 
      >
        Оплатить
      </Button>
    </form>
  );
};

export default YooMoneyForm;