import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules"
import axios from 'axios';

import 'swiper/css';
import "../css/main.css";

export default function Main() {
  return (
    <div className="main_page narrow_page">
      <MainVisual />
      <Recommend />
      <Category />
      <NewCourse />
      <NotiEvent />
    </div>
  );
}

function MainVisual() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/main/slide"

    axios.get(url)
      .then(result => setList(result.data));
  },[])

  const clickHandler = (id) => {
    navigate(`/board/notievent/${id}`)
  }

  return (
    <div className="main_visual">
      <div className="full_inner">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{delay : 5000}}
          loop={true}
          speed={2000}
        >
          {
            list.map((v, i) => (
              <SwiperSlide key={i} onClick={() => clickHandler(v.bid)}>
                <img className="bg" src={`//localhost:8080/${v.img_path}`} alt="" />
                <div className="txt_box">
                  <h2>{v.title}</h2>
                  {
                    v.summary && 
                    <p>
                      {v.summary}
                    </p>
                  }
                  <p>[자세히보기]</p>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

function Recommend() {
  return(
    <div className="main_recommend">
      <div className="inner">
        <div className="main_title">
          <b>추천강좌</b>
          <h3>
            엄선된 강좌를 <br />
            소개합니다
          </h3>
        </div>
      </div>
    </div>
  );
}

function Category() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState();
  const [list, setList] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/category/theme";

    axios.get(url)
      .then(result => {
        const ranNum = Math.floor(Math.random() * result.data.length);
        setActive(ranNum);
        setData(result.data);
        getCourseList(result.data[ranNum].cid);
      })
  },[])

  const changeHandler = (e) => {
    const idx = e.target.value;
    setActive(idx);
    getCourseList(data[idx].cid);
  }

  const getCourseList = (cid) => {
    const url = "//localhost:8080/course"
    const data = {
      cid,
    }
    axios.post(url, data)
      .then(result => setList(result.data.slice(0, 4)))
  }

  return data && (
    <div className="main_category_wrap" style={{"--bg" : data[active].bg_color}}>
      <div className="main_title">
        <div className="inner">
          <b>강좌 카테고리</b>
          <h3>
            일상을 빛낼 취향을 <br />
            발견하세요!
          </h3>
        </div>
      </div>
      <div className="main_category">
        <div className="custom_inner">
          <div className="select_category">
            <div className="select_box">
              <img src={`//localhost:8080/${data[active].img_path}`} alt="" />
              <select name="" value={active} onChange={changeHandler}>
                {
                  data.map((v, i) => (
                    <option value={i} key={v.cid}>{v.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <ul className="course_list">
            {
              list.map(v => (
                <li key={v.course_id}>
                  <div className="img_box">
                    <img src={`//localhost:8080/${v.course_img}`} alt="" />
                  </div>
                  <div className="txt_box">
                    <div className="tags">
                      <span className="point">{v.status}</span>
                      <span>{v.name}</span>
                    </div>
                    <h4>{v.course_name}</h4>
                    <div className="info">
                      <p className="teacher">{v.teacher_name}</p>
                      <p className="time">{v.course_week} {v.start_time} ~ {v.end_time}, 총 {v.num_of_course}회</p>
                    </div>
                    <div className="price">
                      <p>{v.price}</p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

function NewCourse() {
  return (
    <div className="new_course">
      <div className="inner">
        <div className="main_title">
          <b>신규강좌</b>
          <h3>
            새롭게 개설된 강좌를 <br />
            지금 확인해보세요
          </h3>
        </div>
      </div>
    </div>
  );
}

function NotiEvent() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(()=>{
    const url = "//localhost:8080/board/notievt/all";
    axios.get(url)
      .then(result => setList(result.data.slice(0, 4)))
  },[])

  const tagRemover = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html.replaceAll("&nbsp;", "");

    return div.textContent;
  }

  const clickHandler = (id) => {
    navigate(`/board/notievent/${id}`);
  }

  return(
    <div className="main_notiEvent">
      <div className="inner">
        <ul>
          {
            list.map(v => (
              <li key={v.bid} onClick={()=>{clickHandler(v.bid)}}>
                <h3>[{v.type}] {v.title}</h3>
                <p>{tagRemover(v.content)}</p>
                <span>{v.date}</span>
              </li>
            ))
          }
        </ul>
        <Link className="notice_btn" to="/board/notievent">롯데문화센터의 다양한 소식을 확인해보세요!</Link>
      </div>
    </div>
  );
}