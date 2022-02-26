import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, ButtonGroup, Switch } from '@mui/material';

import Variantes from '../variantes/Variantes'

export default function ProductoDetail({ producto }) {

    const [activoChecked, setActivoChecked] = useState(true);
    const [isVariantesOpen, setVariantesOpen] = useState(false);

    const { nombre, descripcion, id } = producto;

    useEffect(() => {
        setActivoChecked(producto.activo);
    }, [producto])

    useEffect(() => {
        console.log('refrescar despues de abrir y guardar variantes')
    }, [isVariantesOpen])

    const handleVariantesOpen = () => {
        setVariantesOpen(!isVariantesOpen);
    };

    const handleSwitchChange = (event) => {
        setActivoChecked(event.target.checked);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                {/* <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {descripcion}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ButtonGroup size="small" variant="contained" aria-label="text button group" fullWidth>
                    <Button>Detalles</Button>
                    <Button>Editar</Button>
                    <Button onClick={() => handleVariantesOpen()}>Variantes</Button>
                </ButtonGroup>
            </CardActions>
            <CardActions>
                <Switch
                    checked={activoChecked}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </CardActions>
            <Variantes
                productoId={id}
                isModalOpen={isVariantesOpen}
                handleCloseModal={() => setVariantesOpen(false)}
            />
        </Card>
    );
}