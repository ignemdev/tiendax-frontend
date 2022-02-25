import Button from '@mui/material/Button';
import AddButtonIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid'

import ProductoDetail from './ProductoDetail'

export default function Productos() {
    return (
        <div >
            <Button variant="contained">
                <AddButtonIcon />
            </Button>

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
    )
}