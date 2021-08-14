import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Input, DatePicker, Modal, Image } from 'antd';
import moment from 'moment';

const { Option } = Select
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const tableColumns = [
	{
		title: 'N° de orden',
		dataIndex: 'shippingId',
		key: 'shippingId'
	},
	{
		title: () => <div className="text-center">Usuario</div>,
		dataIndex: 'customerName',
		key: 'customerName',
		render: (text, record) => (
			<div className="text-center">
			   {text}
			</div>
		)
	},
	{
		title: () => <div className="text-center">Vehículo</div>,
		dataIndex: 'vehiclePlate',
		key: 'vehiclePlate',
		render: (text, record) => (
			<div className="text-center">
			   {text}
			</div>
		)
	},
	{
		title: () => <div className="text-center">Fecha y hora de entrega</div>,
		dataIndex: 'arrivalDate',
		key: 'arrivalDate',
		render: (text, record) => (
			<div className="text-center">
			   {text}
			</div>
		)
	},
	{
		title: () => <div className="text-center">Estado</div>,
		dataIndex:'status',
		key: 'status',
		render: (text, record) => (
			<div className="text-center">
				<Tag className="mr-0" color={text === 'Entregado' || text === 'He llegado' ? 'cyan' : text === 'En ruta' ? 'blue' : text === 'No entregado' ? 'volcano' : 'gold'}>{text}</Tag>
			</div>
		)
	},
	{
		title: () => <div className="text-center">Imágenes</div>,
		dataIndex: 'imgs',
		render: (text, record) => (
			<div className="text-center">
				{ text }
			</div>
		)
	},
	{
		title: () => <div className="text-center">Comentarios</div>,
		dataIndex: 'comments',
		key: 'comments',
		render: (text, record) => (
			<div className="text-center">
				{ text }
			</div>
		)
	},
	{
		title: () => <div className="text-center">direccion</div>,
		dataIndex: 'address',
		key: 'address',
		render: (text, record) => (
			<div className="text-center">
				{ text }
			</div>
		)
	}
]

const RecentOrder = () => {
	const dataApi = JSON.parse(localStorage.getItem('dataApi'))
	const dateFrom = localStorage.getItem('dateFrom')
	const dateTo = localStorage.getItem('dateTo')

	dataApi.shippingSummaryCollection.reverse()
	
	let [dataInTable, setDataInTable] = useState([])
	let [paginationToRender, setPagination] = useState({current: 1, pageSize: 10})
	let [valueEstadoSelect, setValueEstadoSelect] = useState('')
	let [dateRangePickker, setDateRangePickker] = useState([])
	let [initialData, setInitialData] = useState({
		dataInTable: [],
		paginationToRender: {
			current: 1,
			pageSize: 10,
			total: 0
		}
	})
	const [isModalVisible, setIsModalVisible] = useState({
		show: false,
		text: '',
		title: ''
	})
	let [howManyDays, setHowManyDays] = useState(30)

	useEffect(() => {
		const dataApiInArray = dataApi.shippingSummaryCollection.map(order => {
			const date = new Date(order.arrivalDate)
			const dateToArray = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`
				
			return {
				shippingId: order.shippingId,
				customerName: order.customerName,
				vehiclePlate: order.vehiclePlate,
				arrivalDate: dateToArray,
				status: order.status,
				comments: order.comments,
				address: order.address,
				reason: order.reason
			}
		})
		
		setPagination(paginationToRender = {...paginationToRender, total: dataApiInArray.length})
		setInitialData(initialData = {
			...initialData,
			dataInTable: dataApiInArray,
			paginationToRender: {
				current: 1,
				pageSize: 10,
				total: dataApiInArray.length
			}
		})
		setDataInTable(dataInTable = dataApiInArray)
		setDateRangePickker(dateRangePickker = [dateFrom, dateTo])
	}, [])


	const handleTableChange = (pagination, filters) => {
		setPagination(paginationToRender = {current: pagination.current, pageSize: pagination.pageSize})
	}
	
	const shippingReports = async (
		username,
		dateFrom,
		dateTo,
		vehiclePlate = "",
		statusId = "",
		orden = ''
		) =>{
			
		setDateRangePickker(dateRangePickker = [dateFrom, dateTo])
		
		const body = {
			username: username,
			dateFrom: dateFrom,
			dateTo: dateTo,
			clientId: "59972",
			vehiclePlate: vehiclePlate,
			statusId: statusId
		}
		
		const url = `https://routeintegrationapi.satrack.com/api/v1/routes/historical-shippings-report`
		const myHeaders = new Headers();
		const token = localStorage.getItem("API_TOKEN");

		myHeaders.append("Authorization", `bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");
		
		const requestOptions = {
			method: 'POST',
			mode: 'cors',
			headers: myHeaders,
			body: JSON.stringify(body),
			redirect: 'follow'
		}
	
		const response = await fetch(url, requestOptions)
		const data = await response.json()
		const shippingsUsers = await data
		const shippingSummaryCollection = shippingsUsers.shippingSummaryCollection

		shippingSummaryCollection.reverse()

		if(orden){
			let dataToPushFiltered = shippingSummaryCollection.filter(order => order.shippingId == orden)
			if(dataToPushFiltered.length > 0){
				let dataToPushFilteredInCorrectFormat = dataToPushFiltered.map(order =>{
					const date = new Date(order.arrivalDate)
					const dateToArray = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`
						
					return {
						shippingId: order.shippingId,
						customerName: order.customerName,
						vehiclePlate: order.vehiclePlate,
						arrivalDate: dateToArray,
						status: order.status,
						comments: order.comments,
						address: order.address,
						reason: order.reason
					}
				})
				
				setDataInTable(dataInTable = dataToPushFilteredInCorrectFormat)
				setPagination(paginationToRender = {...paginationToRender, total: parseInt(dataToPushFilteredInCorrectFormat.length)})
			}else{
				setIsModalVisible({
					...isModalVisible,
					show: true,
					title: 'Informe de órdenes',
					text: `Lo sentimos, con la infromación suministrada no encontramos datos relacionados.`
				})
			}
		}else{
			let dataToPushFiltered = shippingSummaryCollection.map(order =>{
				const date = new Date(order.arrivalDate)
				const dateToArray = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`
					
				return {
					shippingId: order.shippingId,
					customerName: order.customerName,
					vehiclePlate: order.vehiclePlate,
					arrivalDate: dateToArray,
					status: order.status,
					comments: order.comments,
					address: order.address,
					reason: order.reason
				}
			})
			setDataInTable(dataInTable = dataToPushFiltered)
			setPagination(paginationToRender = {...paginationToRender, total: parseInt(dataToPushFiltered.length)})
		}
	}

	let outside = ''

	const imageRef = useRef()
	const downloadImage = async () => {
		
		const url = `https://routeintegrationapi.satrack.com/api/v1/routes/downloadimage/cd8de0a4-b67e-43a2-8b51-e1f77d067270.jpg`
		const myHeaders = new Headers();
		const token = localStorage.getItem("API_TOKEN");

		myHeaders.append("Authorization", `bearer ${token}`);
		
		const requestOptions = {
			method: 'GET',
			mode: 'cors',
			headers: myHeaders,
			redirect: 'follow'
		}

		// fetch(url, requestOptions)
		// .then(response => response.blob())
		// .then(images => {
		// 	// Then create a local URL for that image and print it 
		// 	outside = URL.createObjectURL(images)
		// })

		fetch(url, requestOptions)
		.then(res => res.blob()) // Gets the response and returns it as a blob
		.then(blob => {
			let objectURL = URL.createObjectURL(blob);
			console.log(objectURL);
			// imageRef.current.src = objectURL;
		});

		// console.log(outside)

		return outside
		
		
		// const data = await response.blob()
		// const image = await URL.createObjectURL(data)
		// console.log(image)
		// const shippingsUsers = await data
	}

	downloadImage()

	const handleSelectChange = (value) =>{
		setValueEstadoSelect(valueEstadoSelect = value)
	}

	const onChange = (value, dateString) => {
		setDateRangePickker(dateRangePickker = [dateString[0].replaceAll("/", "-"), dateString[1].replaceAll("/", "-")])
		setHowManyDays(howManyDays = datediff(parseDate(dateString[0]), parseDate(dateString[1])) + 1)
	}

	const parseDate = (str) => {
		const mdy = str.split('/');
		return new Date(mdy[0], mdy[1]-1, mdy[2]);
	}

	const datediff = (first, second) => {
		return Math.round((second-first)/(1000*60*60*24));
	}

	const handleCancelRango = () =>{
		setIsModalVisible({
			...isModalVisible,
			show: false
		})
	}

	const handleFilterClick = () => {
		const orden = document.getElementById('orden').value
		const estado = valueEstadoSelect
		const vehiculo = document.getElementById('vehiculo').value
		if(dateTo < dateRangePickker[1]){
			setIsModalVisible({
				...isModalVisible,
				show: true,
				title: 'Error en las fechas seleccionadas',
				text: `La fecha que seleccionaste, es mayor al día de hoy.`
			})
		}else if(howManyDays > 45){
			setIsModalVisible({
				...isModalVisible,
				show: true,
				title: 'Error en las fechas seleccionadas',
				text: `El rango máximo de días debe ser menor a 45 y seleccionaste un rango de ${howManyDays} días.
				Por favor cambia el rango de fechas seleccionado.`
			})
		}else{
			if(!/[^A-Za-z\d]/.test(vehiculo)){
				shippingReports(
					"millasiete",
					dateRangePickker[0],
					dateRangePickker[1],
					vehiculo,
					estado,
					orden
				)
			}else{
				setIsModalVisible({
					...isModalVisible,
					show: true,
					title: 'Informe de órdenes',
					text: `Lo sentimos, con la infromación suministrada no encontramos datos relacionados.`
				})
			}
		}
	  }
	
	  const handleClearFilters = () => {
		const orden = document.getElementById('orden')
		const vehiculo = document.getElementById('vehiculo')
		orden.value = ''
		vehiculo.value = ''

		setDataInTable(dataInTable = initialData.dataInTable)
		setPagination(paginationToRender = initialData.paginationToRender)
	  }

	return (
		<>
			<Modal title={isModalVisible.title} visible={isModalVisible.show} onOk={handleCancelRango} onCancel={handleCancelRango}>
				<p>{isModalVisible.text}</p>
			</Modal>
			<Row gutter={16} style={{marginBottom: '10px'}}>
				<Col xs={12} sm={8} md={4} lg={4}>
					<Input placeholder="N° de orden" id="orden" />
				</Col>
				<Col xs={12} sm={8} md={4} lg={4}>
					<Input placeholder="Vehiculo" id="vehiculo"/>
				</Col>
				<Col xs={12} sm={8} md={4} lg={4}>
					<Select placeholder="Estado" style={{ width: '100%' }} onChange={handleSelectChange}>
						<Option value="1">Por despachar</Option>
						<Option value="2">En ruta</Option>
						<Option value="3">He llegado</Option>
						<Option value="4">Entregado</Option>
						<Option value="5">No entregado</Option>
						<Option value="6">Entrega parcial</Option>
					</Select>
				</Col>
				<Col xs={12} sm={16} md={6} lg={6}>
					<RangePicker
						id="datePicker"
						style={{width: '100%'}}
						onChange={onChange}
						defaultValue={[moment(`${dateFrom}`, dateFormat), moment(`${dateTo}`, dateFormat)]}
						format={dateFormat}
					/>
				</Col>
				<Col xs={12} sm={6} md={3} lg={3}>
					<Button
						style={{width: '100%'}}
						onClick={handleFilterClick}
					>
						Búsqueda
					</Button>
				</Col>
				<Col xs={12} sm={6} md={3} lg={3}>
					<Button
						style={{width: '100%'}}
						onClick={handleClearFilters}
					>
						Borrar búsqueda
					</Button>
				</Col>
			</Row>
			<Card title="Información de los pedidos">
				{
					dataInTable.length > 0 ? (
						<>
							<Table
								rowKey='shippingId'
								columns={tableColumns} 
								dataSource={dataInTable}
								onChange={handleTableChange}
								pagination={paginationToRender}
							/>
							<Image
								width={200}
								src={imageRef}
								id="myImg"
							/>
						</>
					) : ''
				}
			</Card>
		</>
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