import Button from '@mui/material/Button';
import AddButtonIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'

import ProductoDetail from './ProductoDetail';

let paginationContainerStyles = {
    py: 3, display: 'flex', justifyContent: 'center'
}

export default function Productos() {
    return (
        <div >
            <Button variant="contained">
                <AddButtonIcon />
            </Button>

            <div>
                <Grid container spacing={2} marginTop={1} marginBottom={1}>
                    <Grid item lg={3} md={4} sm={6}>
                        <ProductoDetail />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                        <ProductoDetail />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                        <ProductoDetail />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                        <ProductoDetail />
                    </Grid>
                </Grid>
            </div>

            <Container sx={{ ...paginationContainerStyles }}>
                <Pagination count={10} color="primary" />
            </Container>
        </div>
    )
}