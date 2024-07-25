import axios from 'axios';
import { SearchVisual } from './../../components/BoardCommon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';

// svg
import {ReactComponent as IconStar} from "../../svg/icon-star.svg";

// css
import 'swiper/css/pagination';
import "../../css/board/review.css"

export default function Review() {
  return (
    <div className="board_page">
      <SearchVisual title="수강후기"/>
      <div className="board_review narrow_page">
        <div className="min_inner">
          <ReviewSwiper />
          <BoardUtils />
          <ReviewList />
        </div>
      </div>
    </div>
  );
}

function ReviewSwiper() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/board/review/hits";

    axios.get(url)
      .then(result => setList(result.data))
  },[])

  const linkHandler = (id) => {
    navigate("/board/review/" + id);
  }

  return list.length > 0 && (
    <div className="review_swiper">
      <div className="swiper_wrapper">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={25}
          pagination = {
            {
              el : '.review_swiper .pagination ',
              type : "progressbar"
            }
          }
          navigation={
            {
              nextEl : '.review_swiper .next_btn',
              prevEl : '.review_swiper .prev_btn'
            }
          }
        >
          {
            list.map(v => (
              <SwiperSlide className='review_item' onClick={()=>linkHandler(v.rid)}>
                <div className="img_box">
                  <img src={`//localhost:8080/${v.course_img}`} alt="" />
                </div>
                <div className="txt_box">
                  <div className="tags">
                    <p className='location'>{v.name}</p>
                    <p className="stars">
                      {
                        Array.from(Array(v.star), (_, i) => i).map((_,i) => (
                          <span key={i}><IconStar/></span>
                        ))
                      }
                    </p>
                  </div>
                  <div className='title'>
                    <h3>{v.title}</h3>
                    <p>{v.course_name}</p>
                  </div>
                  <div className="info">
                    <span>{v.user_name}</span>
                    <span>{v.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
          {
            list.map(v => (
              <SwiperSlide className='review_item'>
                <div className="img_box">
                  <img src={`//localhost:8080/${v.course_img}`} alt="" />
                </div>
                <div className="txt_box">
                  <div className="tags">
                    <p className='location'>{v.name}</p>
                    <p className="stars">
                      {
                        Array.from(Array(v.star), (_, i) => i).map((_,i) => (
                          <span key={i}><IconStar/></span>
                        ))
                      }
                    </p>
                  </div>
                  <div className='title'>
                    <h3>{v.title}</h3>
                    <p>{v.course_name}</p>
                  </div>
                  <div className="info">
                    <span>{v.user_name}</span>
                    <span>{v.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="prev_btn"></div>
        <div className="next_btn"></div>
      </div>
      <div className="pagination"></div>
    </div>
  );
}

function BoardUtils() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const location = "전체지점"
  const locationList = useSelector(state => state.menu.locationList);

  const listHandler = (e) => {
    let name = e.target.textContent;
    setActive(false);
  }

  const activeHandler = () => {
    setActive(prev => !prev);
  }

  return (
    <div className="board_utils">
      <p className="board_count">전체 <b>0개</b></p>
      <div className={active ? "custom_select_wrap on" : "custom_select_wrap"}>
        <p onClick={activeHandler}><span>{location}</span></p>
        <div className="custom_select">
          <ul>
            <li className={location === "전체지점" ? "on" : ""} onClick={listHandler}>전체지점</li>
            {
              locationList.map(v => (
                <li className={location === v.name ? "on" : ""} key={v.loc_id} onClick={listHandler}>{v.name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

function ReviewList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/board/review/hits";

    axios.get(url)
      .then(result => setList(result.data))
  },[])

  const linkHandler = (id) => {
    navigate("/board/review/" + id);
  }

  return (
    <>
      <div className="review_list">
        <ul>
          {
            list.map(v => (
              <li className='item'>
                <div className="img_box">
                  <img src={`//localhost:8080/${v.course_img}`} alt="" />
                </div>
                <div className="txt_box">
                  <span className='tag'>{v.name}</span>
                  <h3>{v.title}</h3>
                  <p>{v.course_name}</p>
                </div>
                <div className="etc_box">
                  <p className="stars">
                    {
                      Array.from(Array(v.star), (_, i) => i).map((_,i) => (
                        <span key={i}><IconStar/></span>
                      ))
                    }
                  </p>
                  <p className='etc'>
                    <span>{v.user_name}</span>
                    <span>{v.date}</span>
                  </p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="btns">
        <button type="button" className='more_btn'>더보기</button>
      </div>
    </>
  );
}