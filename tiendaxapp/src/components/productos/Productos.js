import { Fragment, useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import AddButtonIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

import ProductoDetail from './ProductoDetail';
import ProductoAdd from './ProductoAdd';

import env from "react-dotenv";

let paginationContainerStyles = {
    py: 3, display: 'flex', justifyContent: 'center'
};

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [isProductoAddOpen, setProductoAddOpen] = useState(false);

    const fetchData = () => {
        fetch(`${env.BASE_ADDRESS}/producto?PageNumber=${currentPage}&PageSize=8`)
            .then(res => res.json())
            .then(json => {
                setProductos(json.data);
                setTotalPages(json.totalPages);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        fetchData();
        // console.log('refrescar despues de guardado')
    }, [isProductoAddOpen]);

    const handlePageChange = (e, currentPage) => {
        setCurrentPage(currentPage);
        fetchData();
    };

    const handleProductoAddOpen = () => {
        setProductoAddOpen(!isProductoAddOpen);
    };

    return (
        <div >
            <Button variant="contained" onClick={() => handleProductoAddOpen()}>
                <AddButtonIcon />
            </Button>

            <div>
                <Grid container spacing={2} marginTop={1} marginBottom={1}>
                    {isLoading ?
                        (<LinearProgress />) :
                        (<Fragment>{productos?.map(p => (
                            <Grid key={p.id} item lg={3} md={4} sm={6}>
                                <ProductoDetail productoItem={p} productoId={p.id} key={p.id} />
                            </Grid>
                        ))}</Fragment>)
                    }
                </Grid>
            </div>

            <Container sx={{ ...paginationContainerStyles }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Container>
            <ProductoAdd
                isModalOpen={isProductoAddOpen}
                handleCloseModal={() => setProductoAddOpen(false)}
            />
        </div>
    )
}