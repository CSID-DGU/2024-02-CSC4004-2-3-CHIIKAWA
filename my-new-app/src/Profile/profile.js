import React from 'react'; // 只保留一次 React 导入
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // 引入 MDB 样式
import '../styles/MyPage.css'; // 引入 MyPage 的样式
import avatar from '../assets/537.png'; // 引入图片资源

// Basic 组件
export function Basic() {
  return (
    <div className="vh-100" style={{ backgroundColor: '#ff8c42' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src="https://hips.hearstapps.com/hmg-prod/images/clipdown-app-311837104-198612055885861-3392014340244231152-n-6728878f38e41.jpg?crop=1xw:1xh;center,top&resize=980:*"
                      alt="Profile picture"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Danny McLoan</MDBCardTitle>
                    <MDBCardText>Senior Journalist</MDBCardText>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                      <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

// MyPage 组件
export function MyPage() {
  return (
    <div className="mypage" style={{ backgroundColor: '#ff8c42', minHeight: '100vh' }}>
      <h1 className="mypage-title">마이페이지</h1>
      <div className="profile-section">
        <img
          src={avatar}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">이지우</h2>
        <p className="profile-username">@jiwoo02</p>
      </div>
      <ul className="mypage-options">
        <li><span>선호음식</span></li>
        <li><span>닉네임 수정</span></li>
        <li><span>선호 음식 수정</span></li>
      </ul>
    </div>
  );
}

