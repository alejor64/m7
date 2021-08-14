import React, { Component } from 'react'
import { Row, Col, Card, Avatar, Button } from 'antd';
import { Icon } from 'components/util-components/Icon';
import { 
	GlobalOutlined,
	MailOutlined,
	HomeOutlined,
	PhoneOutlined
} from '@ant-design/icons';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'

const ProfileInfo = props => (
	<Card>
		<Row justify="center"> 
			<Col sm={24} md={23}>
				<div className="d-md-flex">
					<div className="rounded p-2 bg-white shadow-sm mx-auto" style={{'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 16}px`}}>
						<Avatar shape="square" size={props.avatarSize} src="/img/logo_milla_7.png" />
					</div>
					<div className="ml-md-4 w-100">
						<Flex alignItems="center" mobileFlex={false} className="mb-3 text-md-left text-center">
							<h2 className="mb-0">Nombre Empresa</h2>
						</Flex>
						<Row gutter="16"> 
							<Col sm={24} md={8}>
								<p className="mt-0 mr-3 text-muted text-md-left text-center">
									Descripción
								</p>
							</Col>
							<Col xs={24} sm={24} md={8}>
								<Row className="mb-2"> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={MailOutlined} className="text-success font-size-md"/>
										<span className="text-muted ml-2">Correo:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">correo@millasiete.com</span>
									</Col>
								</Row>
								<Row> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={PhoneOutlined} className="text-success font-size-md"/>
										<span className="text-muted ml-2">Teléfono:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">+57-3122343212</span>
									</Col>
								</Row>
							</Col>
							<Col xs={24} sm={24} md={8}>
								<Row className="mb-2 mt-2 mt-md-0 "> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={HomeOutlined} className="text-success font-size-md"/>
										<span className="text-muted ml-2">Dirrección:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">Medellín, Colombia.</span>
									</Col>
								</Row>
								<Row className="mb-2"> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={GlobalOutlined} className="text-success font-size-md"/>
										<span className="text-muted ml-2">Sitio web:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">google.com</span>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
				</div>
			</Col>
		</Row>
	</Card>
)

export class Profile extends Component {
	render() {
		const avatarSize = 150;
		return (
			<>
				<PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
					<div className="container text-center">
						<div className="py-5 my-md-5">
						</div>
					</div>
				</PageHeaderAlt>
				<div className="container my-4">
					<ProfileInfo avatarSize={avatarSize} />
				</div>
				<div className="container my-4">
					<Button style={{background: '#009CA7', color: '#fff', float: 'right'}}>Crear Cliente</Button>
				</div>
			</>
		)
	}
}

export default Profile
