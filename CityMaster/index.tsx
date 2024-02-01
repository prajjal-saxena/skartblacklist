import React, { useState, useRef, useEffect } from "react";
import Table from "../../base-components/Table";
import { ChevronsRight, ChevronsLeft, Pencil, ArrowUpRight, XCircle } from "lucide-react";
import {
  FormInput,
} from "../../base-components/Form";
import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import TomSelect from "../../base-components/TomSelect";
import axios from "axios";


const Index: React.FC = () => {

  // Your data here


  //Modal start CREATE TAX SLAB
  
  const [headerFooterModalPreview, setHeaderFooterModalPreview] =
    useState(false);



  const sendButtonRef = useRef(null);
//Modal end

  const [perPage, setPerPage] = useState<number>(10);
  const [size, setSize] = useState<number>(perPage);
  const [current, setCurrent] = useState<number>(1);

  const PerPageChange = (value: number) => {
    setSize(value);
    const newPerPage = Math.ceil(datatableUsers.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current: number, pageSize: number) => {
    return datatableUsers.slice((current - 1) * pageSize, current * pageSize);
  };

  const PaginationChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (
    current: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <ChevronsLeft />;
    }
    if (type === "next") {
      return <ChevronsRight />;
    }
    return originalElement;
  };
   
  const [TaxAll, setTaxAll] = useState<any[]>([]);

  const API = "http://localhost:8001/api/v1/master/tax"
  const taxSlabAll = async() => {
    debugger
    // await  fetch('http://localhost:8001/api/v1/tax').then((res)=> res.json()).then((result)=> console.log(result.data))
  
     const res = await axios.get(API);
     const taxslab = await res.data;
    setTaxAll(taxslab.data)
  }

  useEffect(()=>{
    taxSlabAll()
  },[])


 console.log("hap",TaxAll)
  // Form tom
  const [select, setSelect] = useState("");


  //form state for post data
  const [formData, setFormdata] = useState({
     name : '',
     cgst : '',
     sgst : '',
     igst : ''
  })
  const handleInputChange = (e) => {
     const {name, value} = e.target;
     setFormdata({
       ...formData,
       [name] : value
     })
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      try{
         const response = await axios.post('http://localhost:8001/api/v1/master/tax', formData,{
            headers: {
               'Content-Type' : 'application/json',
            }
         })
      }
      catch(error){
        console.log(error)
      }
  }
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-8 md:p-10 lg:p-12 bg-white rounded-lg shadow-lg">
      
      <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-center">
                City Master
            </h1>
          </div>
          <div>
          <Button as="a" href="#" variant="primary" onClick={(event: React.MouseEvent)=> {
        event.preventDefault();
        setHeaderFooterModalPreview(true);
        }}
        >Create City</Button>


              {/* BEGIN: Modal Content */}
<Dialog open={headerFooterModalPreview} onClose={()=> {
    setHeaderFooterModalPreview(false);
    }}
    initialFocus={sendButtonRef}
    >
    <Dialog.Panel className="md:w-6/12 md:top-10">
        <Dialog.Title className="flex flex-row justify-between">
            
               <div>
                 <h2 className="mr-auto text-base font-medium underline"><strong>CREATE CITY</strong></h2>
               </div>
               <div>
                 <XCircle className="cursor-pointer" onClick={()=> {
                   setHeaderFooterModalPreview(false);
                }}/>
               </div>
        
           
        </Dialog.Title>
        <form onSubmit={handleSubmit}>

        <Dialog.Description>
            <div className="mt-3">
              {/* <FormLabel htmlFor="input-state-3">Name</FormLabel> */}
              <FormInput name="name" value={formData.name} onChange={handleInputChange} id="input-state-3" type="text" placeholder="ISO" />
          
            </div>
            <div className="mt-6">
               <div className="grid grid-cols-12 gap-2">
                   <div className="col-span-4">
                     {/* <FormLabel htmlFor="input-state-3">CGST</FormLabel> */}
                     <FormInput name="cgst" value={formData.cgst} onChange={handleInputChange} type="text" placeholder="City Name" aria-label="default input inline 1" />
                   </div>
                   <div className="col-span-4">
                      {/* <FormLabel htmlFor="input-state-3">SGST</FormLabel> */}
                      <FormInput name="sgst" value={formData.sgst} onChange={handleInputChange} type="text" placeholder="State Name" aria-label="default input inline 2" />                
                   </div>
                   <div className="col-span-4">
                     {/* <FormLabel htmlFor="input-state-3">IGST</FormLabel> */}
                     <FormInput name="igst" value={formData.igst} onChange={handleInputChange} type="text" placeholder="Country" aria-label="default input inline 3" />
                   </div>
              </div>
            </div>
          
        </Dialog.Description>
        <Dialog.Footer>
            <Button type="submit" className="w-20">
                Save
            </Button>
        </Dialog.Footer>
        </form>
    </Dialog.Panel>
</Dialog>
{/* END: Modal Content */}
          </div>
      </div>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-filter-info">
                  {/* <Pagination
                    className="pagination-data"
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                    onChange={PaginationChange}
                    total={datatableUsers.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  /> */}
                </div>
                <div className="overflow-x-auto">
                  <Table className="table table-text-small mb-0 border">
                    <Table.Thead
                      variant="dark"
                      className="thead-primary table-sorting bg-cyan-900"
                    >
                      <Table.Tr className="text-center ">
                        <Table.Th className="whitespace-nowrap border">
                          #
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          CITY NAME
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          ISO
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          STATE NAME
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          COUNTRY
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                           
                        </Table.Th>
                       
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {
                        TaxAll.map((elem)=>(
                           <Table.Tr>
                              <Table.Td className="border text-center">{elem.id}</Table.Td>
                              <Table.Td className="border text-center">{elem.name}</Table.Td>
                              <Table.Td className="border text-right">{elem.cgst}</Table.Td>
                              <Table.Td className="border text-right">{elem.sgst}</Table.Td>
                              <Table.Td className="border text-right">{elem.igst}</Table.Td>
                              <Table.Td className="border">
                                <Pencil />
                              </Table.Td>
                          
                           </Table.Tr>
                        ))
                      }
                      {/* {getData(current, size).map((data, index) => (
                        <Table.Tr
                          key={data.id}
                          className={`text-center ${
                            index % 2 === 1 ? "bg-slate-100" : ""
                          } hover:bg-slate-300`}
                        >
                          <Table.Td className="border">{data.id}</Table.Td>
                          <Table.Td className="border">
                            {data.id}
                          </Table.Td>
                          <Table.Td className="border">
                            {data.name}
                          </Table.Td>
                          <Table.Td className="border">
                            {data.cgst}
                          </Table.Td>
                          <Table.Td className="border">
                             {data.igst}
                          </Table.Td>
                          <Table.Td className="border">
                             <Pencil />
                          </Table.Td>
                          <Table.Td className="border">
                             <ArrowUpRight />
                          </Table.Td>
                        </Table.Tr>
                      ))} */}
                    </Table.Tbody>
                  </Table>
                  
                </div>
                <div className="table-filter-info">
                  {/* <Pagination
                    className="pagination-data"
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                    onChange={PaginationChange}
                    total={datatableUsers.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  /> */}
                </div>
                {/* BEGIN: Pagination */}
                {/* <div className="flex flex-wrap items-center mt-6 intro-y sm:flex-row sm:flex-nowrap">
                  <Pagination className="w-full sm:w-auto sm:mr-auto">
                    <Pagination.Link>
                      <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                    </Pagination.Link>
                    <Pagination.Link>
                      <Lucide icon="ChevronLeft" className="w-4 h-4" />
                    </Pagination.Link>
                    <Pagination.Link>...</Pagination.Link>
                    <Pagination.Link>1</Pagination.Link>
                    <Pagination.Link active>2</Pagination.Link>
                    <Pagination.Link>3</Pagination.Link>
                    <Pagination.Link>...</Pagination.Link>
                    <Pagination.Link>
                      <Lucide icon="ChevronRight" className="w-4 h-4" />
                    </Pagination.Link>
                    <Pagination.Link>
                      <Lucide icon="ChevronsRight" className="w-4 h-4" />
                    </Pagination.Link>
                  </Pagination>
                  <FormSelect className="w-20 mt-3 !box sm:mt-0">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </FormSelect>
                </div> */}
                {/* END: Pagination */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;