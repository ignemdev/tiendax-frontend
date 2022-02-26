import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, ButtonGroup, Switch } from '@mui/material';

export default function ProductoDetail({ producto }) {

    const [activoChecked, setActivoChecked] = useState(true);

    useEffect(() => {
        setActivoChecked(producto.activo);
    }, [producto])

    const { nombre, descripcion } = producto;

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
                    <Button>Variantes</Button>
                </ButtonGroup>
            </CardActions>
            <CardActions>
                <Switch
                    checked={activoChecked}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </CardActions>
        </Card>
    );
}