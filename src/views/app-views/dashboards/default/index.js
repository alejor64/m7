import React, { useEffect, useState } from "react";
import { Row, Col, Button, Select, Carousel, Table, DatePicker, Modal, Input, Badge, Tag, Card} from 'antd';
import Flex from 'components/shared-components/Flex'
import ChartWidget from 'components/shared-components/ChartWidget';
import DonutChartWidget from "components/shared-components/DonutChartWidget";
import { 
  VisitorChartData,
} from './DefaultDashboardData';
import { LoadingOutlined } from '@ant-design/icons';
import utils from 'utils';
import {withRouter} from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const jointSessionData = (sessionData, sessionColor, sessionLabels) => {
  let arr = []
  for (let i = 0; i < sessionData.length; i++) {
    const data = sessionData[i];
    const label = sessionLabels[i];
    const color = sessionColor[i]
    arr = [...arr, {
      data: data,
      label: label,
      color: color
    }]
  }
  return arr
}

const tableColumns = [
  {
    title: 'N° de orden',
    dataIndex: 'shippingId',
    key: 'shippingId'
  },
  {
    title: () => <div className="text-center">Agendado</div>,
    dataIndex: 'scheduleDate',
    key: 'scheduleDate',
    render: (text, record) => (
      <div className="text-center">
         {text}
      </div>
    )
  },
  {
    title: () => <div className="text-center">Fecha de entrega</div>,
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
        <Tag className="mr-0" color={text === 'Entregado' ? 'cyan' : text === 'En ruta' ? 'blue' : text === 'No entregado' ? 'volcano' : 'gold'}>{text}</Tag>
      </div>
    )
  },
  {
    title: () => <div className="text-center">Imágenes</div>,
    dataIndex: 'photoUri',
    key: 'photoUri',
    render: (text, record) => (
      <div className="text-center">
        {text}
      </div>
    )
  },
  {
    title: () => <div className="text-center">Comentarios</div>,
    dataIndex: 'comments',
    key: 'comments',
    render: (text, record) => (
      <div className="text-center">
        { text}
      </div>
    )
  },
  {
    title: () => <div className="text-center">Dirección</div>,
    dataIndex: 'address',
    key: 'address',
    render: (text, record) => (
      <div className="text-center">
        {text}
      </div>
    )
  }
]

export const DefaultDashboard = () => {
  const [loadedData, setLoadedData] = useState(false)
  let [chartData, setChartData] = useState({})
  let [tableDataFilteres, setTableDataFilteres] = useState([])
  const { direction } = useSelector(state => state.theme)
  const [showTableFiltered, setShowTableFiltered] = useState(false)
  const [isModalVisibleRango, setIsModalVisibleRango] = useState(false);
  const [modalApiDontHaveData, setModalApiDontHaveData] = useState(false)
  const [isModalVisibleFechaMax, setIsModalVisibleFechaMax] = useState(false);
  let [dateRangePickker, setDateRangePickker] = useState([])
  const [initialRangePicker, setInitialRangePicker] = useState([])
  let [valueEstadoSelect, setValueEstadoSelect] = useState('')
  let [paginationToRender, setPagination] = useState({current: 1, pageSize: 5})
	const [loading, setLoading] = useState(false)
  let [howManyDays, setHowManyDays] = useState(30)

  const today = new Date()
  let dayToday = today.getDate()
  let monthToday = today.getMonth() + 1
  let yearToday = today.getFullYear()

  const lastMonth = new Date(today.setDate(today.getDate() - 30))
  let dayLastMonth = lastMonth.getDate()
  let monthLastMonth = lastMonth.getMonth() + 1
  let yearLastMonth = lastMonth.getFullYear()

  if(dayToday < 10) dayToday = `0${dayToday}`
  if(monthToday < 10) monthToday = `0${monthToday}`
  
  if(dayLastMonth < 10) dayLastMonth = `0${dayLastMonth}`
  if(monthLastMonth < 10) monthLastMonth = `0${monthLastMonth}`
  
  const getToken = async () => {
		const url = `https://routeintegrationapi.satrack.com/auth/realms/satrack-base/protocol/openid-connect/token`
    localStorage.removeItem("API_TOKEN")
	
		const myHeaders = new Headers();
	  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const dataSend = new FormData()
    const urlSearch = new URLSearchParams()
    urlSearch.append("grant_type", "client_credentials")
    urlSearch.append("client_id", "deliverymgmt-millasiete")
    urlSearch.append("client_secret", "6484c236-69db-4bac-92fd-675724c70397")
		
		const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlSearch,
      redirect: 'follow'
		};
	
		const response = await fetch(url, requestOptions)
		const dataResp = await response.json()
		const token = await dataResp
    localStorage.setItem("API_TOKEN", token.access_token);
		return token.access_token
	}

  const groupByDay = (array, key) => {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
  }

  const parseDate = (str) => {
    const mdy = str.split('/');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
  }

  const datediff = (first, second) => {
    return Math.round((second-first)/(1000*60*60*24));
  }

  const shippingReports = async (
    username= "millasiete",
    dateFrom = `${yearLastMonth}-${monthLastMonth}-${dayLastMonth}`,
    dateTo = `${yearToday}-${monthToday}-${dayToday}`,
    vehiclePlate = "",
    statusId = "",
    orden = '',
    firstTime = true
    ) =>{

    setInitialRangePicker(dateRangePickker = [`${yearLastMonth}-${monthLastMonth}-${dayLastMonth}`, `${yearToday}-${monthToday}-${dayToday}`])
      
    if(`${yearToday}-${monthToday}-${dayToday}` >= dateTo){
      setDateRangePickker(dateRangePickker = [dateFrom, dateTo])
      const body = {
        username: username,
        dateFrom: dateFrom,
        dateTo: dateTo,
        clientId: "59972",
        vehiclePlate: vehiclePlate,
        statusId: statusId
      }

      const token = await getToken()
      const url = `https://routeintegrationapi.satrack.com/api/v1/routes/historical-shippings-report`
      const myHeaders = new Headers();
    
      myHeaders.append("Authorization", `bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      
      const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
      };
    
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      const shippingsUsers = await data
      
      
        
      if(shippingsUsers.shippingSummaryCollection.length > 0){
        if(firstTime){
          localStorage.setItem('dateFrom', dateRangePickker[0])
          localStorage.setItem('dateTo', dateRangePickker[1])
          localStorage.setItem('dataApi', JSON.stringify(shippingsUsers))
        }

        const groupedShippingsUsers = groupByDay(shippingsUsers.shippingSummaryCollection, "scheduleDate")
        let dataInArray = []
        
        for(const property in groupedShippingsUsers){
          dataInArray.push({
            categorie: property,
            dataToSerie: groupedShippingsUsers[property]
          })
        }
        
        let entregados = []
        let noEntregados = []
        let enRuta = []
        let porDespachar = []
        const categories = dataInArray.map(categorie => categorie.categorie)
        dataInArray.map(siereEntregado =>{
          entregados.push(siereEntregado.dataToSerie.filter(entregado => entregado.status === "Entregado").length)
        })
        dataInArray.map(siereEntregado =>{
          noEntregados.push(siereEntregado.dataToSerie.filter(entregado => entregado.status === "No entregado").length)
        })
        dataInArray.map(siereEntregado =>{
          enRuta.push(siereEntregado.dataToSerie.filter(entregado => entregado.status === "En ruta").length)
        })
        dataInArray.map(siereEntregado =>{
          porDespachar.push(siereEntregado.dataToSerie.filter(entregado => entregado.status === "Por despachar").length)
        })
    
        const totalEntregados = entregados.reduce((accumulator, currentValue) => accumulator + currentValue)
        const totalNoEntregados = noEntregados.reduce((accumulator, currentValue) => accumulator + currentValue)
        const totalEnRuta = enRuta.reduce((accumulator, currentValue) => accumulator + currentValue)
        const totalPorDespachar = porDespachar.reduce((accumulator, currentValue) => accumulator + currentValue)

        const totalResult = totalEntregados + totalNoEntregados + totalEnRuta + totalPorDespachar

        const entregadosPorcentaje = Math.round((totalEntregados/totalResult)*100)
        const enRutaPorcentaje = Math.round((totalEnRuta/totalResult)*100)
        const porDespacharPorcentaje = Math.round((totalPorDespachar/totalResult)*100)
        const noEntregadosPorcentaje = Math.round((totalNoEntregados/totalResult)*100)
    
        setChartData(chartData= {
          categories: categories,
          series: [
            {
              name: "En ruta",
              data: enRuta
            },
            {
              name: "Entregados",
              data: entregados
            },
            {
              name: "No entregados",
              data: noEntregados
            },
            {
              name: "Por despachar",
              data: porDespachar
            }
          ],
          sessionData: [entregadosPorcentaje, enRutaPorcentaje, porDespacharPorcentaje, noEntregadosPorcentaje],
          sessionColor: ['#04d182', '#3e82f7', '#ffc107', '#ff6b72'],
          sessionLabels: ["Entregados", "En ruta", "Por despachar", "No entregados"],
          notesForDonut: jointSessionData(
            [`${entregadosPorcentaje}%`, `${enRutaPorcentaje}%`, `${porDespacharPorcentaje}%`, `${noEntregadosPorcentaje}%`],
            ['#04d182', '#3e82f7', '#ffc107', '#ff6b72'],
            ["Entregados", "En ruta", "Por despachar", "No entregados"]
          )
        })

        let dataToPush = []

        shippingsUsers.shippingSummaryCollection.reverse()

        shippingsUsers.shippingSummaryCollection.map(order => {
          const date = new Date(order.arrivalDate)
          const dateToArray = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0'+date.getMinutes()}`
          
          dataToPush.push({
            id: order.trackingId,
            trackingId: order.trackingId,
            scheduleDate: order.scheduleDate.replaceAll("-", "/"),
            arrivalDate: dateToArray,
            status: order.status,
            photoUri: order.photoUri,
            comments: order.comments,
            address: order.address,
            shippingId: order.shippingId
          })
        })
  
        if(!orden){
          setTableDataFilteres(tableDataFilteres = dataToPush)
          setPagination(paginationToRender = {...paginationToRender, total: parseInt(dataToPush.length)})
          setLoading(false)
        }else{
          let dataToPushFiltered = dataToPush.filter(order => order.shippingId == orden)
          if(dataToPushFiltered.length > 0){
            setTableDataFilteres(tableDataFilteres = dataToPushFiltered)
            setShowTableFiltered(true)
            setPagination(paginationToRender = {...paginationToRender, total: parseInt(dataToPushFiltered.length)})
            setLoading(false)
          }else{
            setShowTableFiltered(false)
            setModalApiDontHaveData(true)
          }
        }
        
      }else{
        setShowTableFiltered(false)
        setModalApiDontHaveData(true)
      }
      
      setLoadedData(true)
    }else{
      setShowTableFiltered(false)
      setIsModalVisibleFechaMax(true)
    }
  }

  useEffect(() => {
    shippingReports()
  }, [])

  const onChange = (value, dateString) => {
    setDateRangePickker(dateRangePickker = [dateString[0].replaceAll("/", "-"), dateString[1].replaceAll("/", "-")])
    setHowManyDays(howManyDays = datediff(parseDate(dateString[0]), parseDate(dateString[1])) + 1)
  }

  const handleCancelRango = () => {
    setIsModalVisibleRango(false);
  };
  
  const handleCancelRangoFechaMax = () => {
    setIsModalVisibleFechaMax(false);
  };

  const handleApiDontHaveData = () => {
    setModalApiDontHaveData(false)
  }

  const handleSelectChange = (value) =>{
    setValueEstadoSelect(valueEstadoSelect = value)
  }

  const handleFilterClick = () => {
    const orden = document.getElementById('orden').value
    const estado = valueEstadoSelect
    const vehiculo = document.getElementById('vehiculo').value

    if(howManyDays > 45){
      setIsModalVisibleRango(true)
    }else{
      if(`${yearToday}-${monthToday}-${dayToday}` < dateRangePickker[1]){
        setShowTableFiltered(false)
        setIsModalVisibleFechaMax(true)
      }else if(!/[^A-Za-z\d]/.test(vehiculo)){
        setIsModalVisibleFechaMax(false)
        setLoadedData(false)
        shippingReports(
          "millasiete",
          dateRangePickker[0],
          dateRangePickker[1],
          vehiculo,
          estado,
          orden,
          false
          )
          setShowTableFiltered(true)
      }else{
        setModalApiDontHaveData(true)
      }
    }
  }

  const habdleClearFilters = () => {
    setLoadedData(false)
    setShowTableFiltered(false)
    const orden = document.getElementById('orden')
    const vehiculo = document.getElementById('vehiculo')
    orden.value = ''
    vehiculo.value = ''
    
    shippingReports(
      "millasiete",
      initialRangePicker[0],
      initialRangePicker[1],
      '',
      '',
      '',
      false
    )
  }

  const handleTableChange = (pagination, filters) => {
		setPagination(paginationToRender = {current: pagination.current, pageSize: pagination.pageSize})
	}

  return (
    <>
      <Modal title="Error en fechas" visible={isModalVisibleRango} onOk={handleCancelRango} onCancel={handleCancelRango}>
        <p>El rango máximo de días debe ser menor a 45 y seleccionaste un rango de {howManyDays} días.
          Por favor cambia el rango de fechas seleccionado.
        </p>
      </Modal>
      <Modal title="Fecha máxima" visible={isModalVisibleFechaMax} onOk={handleCancelRangoFechaMax} onCancel={handleCancelRangoFechaMax}>
        <p>La fecha final seleccionada es superior al día de hoy.</p>
      </Modal>
      <Modal title="Informe de órdenes" visible={modalApiDontHaveData} onOk={handleApiDontHaveData} onCancel={handleApiDontHaveData}>
        <p>Lo sentimos, con la infromación suministrada no encontramos datos relacionados.</p>
      </Modal>
      <Row gutter={16} style={{marginBottom: '10px'}}>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Input placeholder="N° de orden" id="orden" pattern="[A-Za-z0-9]{1,15}" />
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
            defaultValue={[moment(`${yearLastMonth}-${monthLastMonth}-${dayLastMonth}`, dateFormat), moment(`${yearToday}-${monthToday}-${dayToday}`, dateFormat)]}
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
            onClick={habdleClearFilters}
          >
            Borrar búsqueda
          </Button>
        </Col>
      </Row>
      {
        loadedData ? (
          <>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={18}>
                <Row gutter={16}>
                  <Col span={24}>
                    <ChartWidget 
                      title="Estado de pedidos"
                      type="bar"
                      series={chartData.series} 
                      xAxis={chartData.categories} 
                      height={'400px'}
                      direction={direction}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6}>
                <DonutChartWidget 
                  series={chartData.sessionData} 
                  labels={chartData.sessionLabels} 
                  title="Cumplimiento"
                  customOptions={{colors: chartData.sessionColor}}
                  extra={
                    <Row  justify="center">
                      <Col xs={20} sm={20} md={20} lg={24}>
                        <div className="mt-4 mx-auto" style={{maxWidth: 200}}>
                          {chartData.notesForDonut.map(elm => (
                            <Flex alignItems="center" justifyContent="between" className="mb-3" key={elm.label}>
                              <div>
                                <Badge color={elm.color} />
                                <span className="text-gray-light">{elm.label}</span>
                              </div>
                              <span className="font-weight-bold text-dark">{elm.data}</span>
                            </Flex>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  }
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Card title="Información de órdenes">
                  <Table
                    rowKey={record => record.shippingId}
                    dataSource={tableDataFilteres}
                    columns={tableColumns}
                    pagination={paginationToRender}
                    loading={loading}
                    onChange={handleTableChange}
                  />
                </Card>
              </Col>
            </Row>
          </>
        ) : <LoadingOutlined />
      }
    </>
  )
}


export default withRouter(DefaultDashboard);
