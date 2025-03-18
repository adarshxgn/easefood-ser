import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { verifyPinAPI } from '../Service/AllAPI';
import Spinner from 'react-bootstrap/Spinner';
import { reservationtableId } from '../Context API/ContextShare';


function TableTrackPage() {
  const naviagte = useNavigate('')
  const [getTables,setGetTables] = useState([])
  const [tableNo,setableNo] = useState('')
  const [tableStatus,setTableStatus] = useState(false)
  const [loading,setLoading] = useState(false)
  const {tableId,setTableId} = useContext(reservationtableId)
  const pin = sessionStorage.getItem("verifiedPin")
  
  useEffect(() => {
    getTableDatas()
  },[])

  const getTableDatas = async() => {
    setLoading(true)
    try {
      const result = await verifyPinAPI(pin)
      setGetTables(result.data.tables)
      console.log('Table result',result.data.tables);  
    } catch (error) {
      toast.error("Failed to load tables")
    }finally{
      setLoading(false)
    }
  }
 const seller_category = getTables[0]?.seller_category
 
  const choosetable = (tableData) => {
    setableNo(tableData.table_number) 
    const tableId = sessionStorage.setItem("tableId",tableData.id)

    setTableStatus(true)
    setTableId(tableData.table_number)
    console.log('settable',tableData);
    
  }
  const reserveTable = () => {
    console.log('inside reserve table',tableNo);
    if(!tableNo){
      toast.warning("Please choose a table!!!"); 
    }else{
      sessionStorage.setItem("tableNumber",tableId)
      naviagte('/home-page')
    }
  }
  const cancelButton = (table) =>{
    setableNo('')
    setTableStatus(false)
  }

  return (
    <div className="mb-5">
          <h3 className="text-center Logo mt-3"> {seller_category=="Hotel"? <h3>Reserve Your Table</h3>:<h3>Select Your Room</h3>}</h3>
      {
        loading?(
          <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" variant="secondary" />
          </div>
        ):(
          <Container>
          <Row className="mt-5 g-3 align-items-center justify-content-center">
          {
            getTables?.length > 0 ? getTables.map((table,index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
              {
                seller_category=="Hotel"?
                <div className="table-container">
                {/* Top Chair */}
                {tableNo==table.table_number?
                
                <div className="chair top-chair"></div>   
                :
                <div style={{backgroundColor:"rgb(187, 187, 187)",borderColor:"rgb(187, 187, 187)"}} className="chair top-chair"></div>
                
                }
                
                
    
                {/* Table */}
                <Button className="table-btn" variant="primary" 
                onClick={()=>choosetable(table)}
                disabled={tableNo && tableNo !== table.table_number}>
                {table.table_number}
                </Button>
        
                {/* Bottom Chair */}
                {tableNo==table.table_number?
                
                <div className="chair bottom-chair"></div>   
                :
                <div style={{backgroundColor:"rgb(187, 187, 187)",borderColor:"rgb(187, 187, 187)"}} className="chair bottom-chair"></div>
                
                }
        
                {/* Left Chair */}
                {tableNo==table.table_number?
                
                <div className="chair left-chair"></div>   
                :
                <div style={{backgroundColor:"rgb(187, 187, 187)",borderColor:"rgb(187, 187, 187)"}} className="chair left-chair"></div>
                
                }
        
                {/* Right Chair */}
                {tableNo==table.table_number?
                
                <div className="chair right-chair"></div>   
                :
                <div style={{backgroundColor:"rgb(187, 187, 187)",borderColor:"rgb(187, 187, 187)"}} className="chair right-chair"></div>
                
                }
              </div>
              :
              <Button className="table-btn" variant="primary" 
                onClick={()=>choosetable(table)}
                disabled={tableNo && tableNo !== table.table_number}>
                {table.table_number}
                </Button>
                }
            </Col>
            )):<p>No table found</p>
          }
       
      
        </Row>
          
    <div className="d-flex justify-content-center" style={{marginTop:'140px'}}>
    <Button onClick={()=>cancelButton()} className="empty-cart-Btn fw-bold"
     >
        Cancel
      </Button>
      <Button className="submit-table fw-bold ms-3"
      onClick={reserveTable}>
        Reserve Now
      </Button>
      
    </div>
    </Container>
        )
      }
   

    <ToastContainer
                autoClose={1500}
                hideProgressBar={true}
                position="top-center"
            />
  </div>
  
  );
}

export default TableTrackPage;