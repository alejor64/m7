// import React from 'react'
// import LoginForm from '../../components/LoginForm'
// import { Card, Row, Col } from "antd";
// import { useSelector } from 'react-redux';

// const backgroundStyle = {
// 	background: 'linear-gradient(180deg, #004F58, #009CA7)'
// 	// clipPath: 'ellipse(82% 54% at 49% 23%)'
// }

// const LoginOne = props => {
// 	const theme = useSelector(state => state.theme.currentTheme)
// 	return (
// 		<div className="h-100" style={backgroundStyle}>
// 			<div className="container d-flex flex-column justify-content-center h-100">
// 				<Row justify="center">
// 					<Col xs={20} sm={20} md={20} lg={7}>
// 						<Card>
// 							<div className="my-4">
// 								<div className="text-center">
// 									<img className="img-fluid" src={`/img/logo_milla_7.png`} alt="logo milla 7" style={{width:55+'%'}}/>
// 									{/* <p>Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p> */}
// 								</div>
// 								<Row justify="center">
// 									<Col xs={24} sm={24} md={20} lg={20}>
// 										<LoginForm {...props} />
// 									</Col>
// 								</Row>
// 							</div>
// 						</Card>
// 					</Col>
// 				</Row>
// 			</div>
// 		</div>
// 	)
// }

// export default LoginOne



import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Row, Col } from "antd";
import { useSelector } from 'react-redux';

const backgroundURL = '/img/others/img-17.jpg'

// const backgroundStyle = {
// 	// clipPath: 'ellipse(82% 54% at 49% 23%)'
// }


const backgroundStyle = {
	background: 'linear-gradient(180deg, #004F58, #009CA7)',
	// backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
			<Row justify="center" className="align-items-stretch h-100">
				<Col xs={20} sm={20} md={24} lg={16}>
					<div className="container d-flex flex-column justify-content-center h-100">
						<Row justify="center">
							<Col xs={24} sm={24} md={20} lg={12} xl={8}>
								<h1>Inicia sesión</h1>
								<div className="mt-4">
									<LoginForm {...props}/>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs={0} sm={0} md={0} lg={8}>
					<div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
						<div className="text-right">
							{/* <img src="/img/logo_milla_7.png" alt="logo"/> */}
						</div>
						<Row justify="center">
							<Col xs={0} sm={0} md={0} lg={20}>
								<img className="img-fluid mb-5" src="/img/logo_milla_7.png" alt=""/>
							</Col>
						</Row>
						<div className="d-flex justify-content-end pb-4">
							
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default LoginTwo
