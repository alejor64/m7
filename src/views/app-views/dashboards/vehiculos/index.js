import React, { useState } from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge, Modal, Carousel} from 'antd';
import Flex from 'components/shared-components/Flex'
import ChartWidget from 'components/shared-components/ChartWidget';
import { COLORS } from 'constants/ChartConstant';
import { 
	weeklyRevenueData,
	customerChartData,
	recentOrderData
} from './vehiculosDashboardData'
import { useSelector } from 'react-redux'

const { Option } = Select;

const getShippingStatus = status => {
	if(status === 'Ready') {
		return 'blue'
	}
	if(status === 'Shipped') {
		return 'cyan'
	}
	return ''
}

const contentStyle = {
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

const RecentOrder = () => {

	const [isModalVisibleToImg, setIsModalVisibleToImg] = useState(false);
	const [isModalVisibleToComment, setIsModalVisibleToComment] = useState(false);
	const [isModalVisibleToNovedad, setIsModalVisibleToNovedad] = useState(false);
	
	const showModal = () => {setIsModalVisibleToImg(true);};
	const handleOk = () => {setIsModalVisibleToImg(false);};
	const handleCancel = () => {setIsModalVisibleToImg(false);};
	
	const showModalToComment = () => {setIsModalVisibleToComment(true);};
	const handleOkToComment = () => {setIsModalVisibleToComment(false);};
	const handleCancelToComment = () => {setIsModalVisibleToComment(false);};
	
	const showModalToNovedad = () => {setIsModalVisibleToNovedad(true);};
	const handleOkToNovedad = () => {setIsModalVisibleToNovedad(false);};
	const handleCancelToNovedad = () => {setIsModalVisibleToNovedad(false);};

	const tableColumns = [
		{
			title: 'N° de orden',
			dataIndex: 'id'
		},
		{
			title: () => <div className="text-center">Asignado el</div>,
			dataIndex: 'asignado',
			render: (text, record) => (
				<div className="text-center">
				   {text}
				</div>
			)
		},
		{
			title: () => <div className="text-center">Inicio ruta</div>,
			dataIndex: 'ruta',
			render: (text, record) => (
				<div className="text-center">
				   {text}
				</div>
			)
		},
		{
			title: () => <div className="text-center">Fecha de entrega</div>,
			dataIndex: 'fechaFinal',
			render: (text, record) => (
				<div className="text-center">
				   {text}
				</div>
			)
		},
		{
			title: () => <div className="text-center">Hora de entrega</div>,
			dataIndex: 'hora',
			render: (text, record) => (
				<div className="text-center">
				   {text}
				</div>
			)
		},
		{
			title: () => <div className="text-center">Estado</div>,
			dataIndex:'estado',
			render: (text, record) => (
				<div className="text-center">
				  <Tag className="mr-0" color={text === 'Entregado' ? 'cyan' : text === 'En ruta' ? 'blue' : text === 'No entregado' ? 'volcano' : 'gold'}>{text}</Tag>
				</div>
			)
		},
		{
			title: () => <div className="text-center">Imágenes</div>,
			dataIndex: 'imgs',
			render: (text, record) => (
				<div className="text-center">
					{
						text.length > 0 ? (
							<>
								<Button type="link" onClick={showModal}>
										Abrir imágenes
								</Button>
								<Modal title="Imágenes de entrega" visible={isModalVisibleToImg} onOk={handleOk} onCancel={handleCancel}>
									<Carousel dotPosition="top" autoplay>
										{
											text.map(imgToCarusel => {
												return (
													<div key={imgToCarusel}>
														<img style={{width:'100%'}} src={imgToCarusel} />
													</div>
												)
											})
										}
									</Carousel>
								</Modal>
							</>
						) : '-'
					}
				</div>
			)
		},
		{
			title: () => <div className="text-center">Comentarios</div>,
			dataIndex: 'cometario',
			render: (text, record) => (
				<div className="text-center">
					{
						text.length > 0 ? (
							<>
								<Button type="link" onClick={showModalToComment}>
										Abrir comentarios
								</Button>
								<Modal title="Comentarios" visible={isModalVisibleToComment} onOk={handleOkToComment} onCancel={handleCancelToComment}>
									<div>
										{
											text.map(comments => {
												return (
													<li key={comments}>
														{comments}
													</li>
												)
											})
										}
									</div>
								</Modal>
							</>
						) : '-'
					}
				</div>
			)
		},
		{
			title: () => <div className="text-center">Novedad</div>,
			dataIndex: 'novedad',
			render: (text, record) => (
				<div className="text-center">
					{
						text.length > 0 ? (
							<>
								<Button type="link" onClick={showModalToNovedad}>
										Abrir Novedades
								</Button>
								<Modal title="Novedades" visible={isModalVisibleToNovedad} onOk={handleOkToNovedad} onCancel={handleCancelToNovedad}>
									<div>
										{
											text.map(comments => {
												return (
													<li key={comments}>
														{comments}
													</li>
												)
											})
										}
									</div>
								</Modal>
							</>
						) : '-'
					}
				</div>
			)
		}
	]

	return (
		<Card title="Vehículos">
			<Table
				pagination={false}
				columns={tableColumns} 
				dataSource={recentOrderData} 
				rowKey='id'
			/>
		</Card>
	)
}

const SalesDashboard = () => {

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<RecentOrder />
				</Col>
			</Row>
		</>
	)
}

export default SalesDashboard
