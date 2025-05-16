import React from 'react'
import "./index.scss"
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
function YouknowWho() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  }
  return (
    <div className='youknowwho-bg'>
      <div className='youknowwho-card'>
        <div className='youknowwho-left'>
          <h2>Bạn Là Ai ????</h2>
          <div className='youknowwho-button-wrapper'>
            <button className='youknowwho-button'>Người tham gia workshop</button>
            <button className='youknowwho-button'>Người tổ chức workshop</button>
          </div>
          <div className="youknowwho-actions">
            <Button className="brown-btn" onClick={() => handleNavigate('/loginAndRegister', { replace: true })}>Về trước</Button>
            <Button className="brown-btn">Tiếp</Button>
          </div>
        </div>
        <div className='youknowwho-divider'></div>
        <div className='youknowwho-right'>
          <div className="img-wrapper">
            <img src="/img/youknowwho.png" alt="youknowwho" />
            <div className="img-overlay">
              <div className="overlay-title">HAND-MADE POTTERY EXPERIENCE</div>
              <div className="overlay-sub">Evenings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouknowWho