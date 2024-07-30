import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import axios from 'axios';


export default function PayBottom({cname, next, stepOrder,checkPrice, checkNum, cartItemList,
    isChecked, setIsChecked, orderPriceAllPay, inputPoint}) {
  const navigate = useNavigate();
  const currentPos = useSelector(state => state.cart.currentPos);
  const [allIsChecked, setAllIsChecked] = useState(false); // 결제 체크박스



  // 장바구니 결제버튼
  const handleNext = () => {
    if(cartItemList.length === 0){
      alert('1개 이상 강좌를 선택해주세요')
    }else{
      navigate('/order', { state: {cartItemList} })
    }
  }

  // 결제 체크여부
  const handleChange = (checked) => {
    if(checked){
      setAllIsChecked(!allIsChecked)
      setIsChecked(true)
    }else{
      setIsChecked(false)
    }
  }

  // 결제 이전버튼
  const handlePrev = () => {
    navigate('/cart')
  }


  // 최종 결제버튼
  const handlePay = () => {
    if(allIsChecked === true && isChecked === true){
      alert('선택한 강좌를 결제하시겠습니까?')
      next(stepOrder);
    }else{
      alert('구매동의에 동의하셔야 결제가 가능합니다. 구매 동의하시겠습니까?')
      
    // 서버전송
    const url = 'http://127.0.0.1:8080/order/pointset'    
    axios({
      method: 'post',
      url : url,
      data: {
        orderPriceAllPay : orderPriceAllPay,
        inputPoint : inputPoint
      }
    })
    .then(res => res.data)
    .catch(error=> console.log(error))
    
    }
  }

  return(
    <div className='bottom-fix '>
    {
    currentPos === cname ?  (
      <div className='min_inner'>
        <div className='total_price'>
            <span className='num'>{checkNum}<span>건</span></span>
            <span className='txt'>결제 예정금액</span>
            <span className='price'>{checkPrice}<span>원</span></span>
          </div>
        <div className='basic_btn'>
        <button type='button' className='btn btn_black large' onClick={handleNext}>{`${checkPrice}원 결제`}</button>
        </div> 
      </div>   
      ):
      (
        <div className='min_inner'>
          <div className='total_price'>
            <div className="form_checkbox">
              <input type="checkbox"
                    id='orderPay'
                    name='orderPay'
                    value='orderPay'
                    onChange={(e)=>handleChange(e.target.checked)}
              />
              <label htmlFor='orderPay'>위 내용을 모두 확인하였으며, 결제에 동의합니다.</label>
            </div>
        </div>  
          <div className='basic_btn'>
            <button type='button' className='btn btn_white medium' onClick={handlePrev}>이전</button>
            <button type='button' className='btn btn_black large' onClick={handlePay}>결제하기</button>
          </div>
        </div>   
      )
      }
    </div>
  );
}