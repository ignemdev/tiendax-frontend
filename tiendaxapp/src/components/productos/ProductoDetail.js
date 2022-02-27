import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, Button, CardActions, ButtonGroup, Switch, Box } from '@mui/material';
import Circle from '@uiw/react-color-circle';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import env from 'react-dotenv';

import Variantes from '../variantes/Variantes'
import ProductoEdit from './ProductoEdit';

var formatter = new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
});

export default function ProductoDetail({ producto }) {

    const [activoChecked, setActivoChecked] = useState(true);

    const [color, setColor] = useState("#fff");
    const [precio, setPrecio] = useState(0);
    const [precios, setPrecios] = useState([]);
    const [colores, setColores] = useState([]);

    const [isLoadingVariantes, setLoadingVariantes] = useState(true);
    const [isVariantesOpen, setVariantesOpen] = useState(false);
    const [isProductoEditOpen, setProductoEditOpen] = useState(false);

    const { nombre, descripcion, id, creado, modificado } = producto;

    const fetchVariantesData = () => {
        fetch(`${env.BASE_ADDRESS}/producto/${id}/variantes`)
            .then(res => res.json())
            .then(json => {
                const variantes = json.data;

                setDefaultStatesColorPrecios();

                if (variantes.length != 0) {
                    const colores = variantes.map((x) => `#${x.color?.hex}`);
                    const precios = variantes.map((x) => { return { precio: x?.precio, hex: `#${x.color?.hex}` } })
                    setColor(colores[0])
                    setPrecio(precios[0]?.precio)
                    setColores(colores);
                    setPrecios(precios);
                }

                setLoadingVariantes(false);
            });
    };

    useEffect(() => {
        setActivoChecked(producto.activo);
        fetchVariantesData();
    }, [producto]);

    useEffect(() => {
        console.log('refrescar despues de abrir y guardar variantes')
        fetchVariantesData();
    }, [isVariantesOpen, isProductoEditOpen]);

    function setDefaultStatesColorPrecios() {
        setColor([]);
        setPrecio(0);
        setColores([]);
        setPrecios([]);
    }

    const handleVariantesOpen = () => {
        setVariantesOpen(!isVariantesOpen);
    };

    const handleProductoEditOpen = () => {
        setProductoEditOpen(!isVariantesOpen);
    };

    const toggleProducto = async (productoId) => {
        await axios.get(`${env.BASE_ADDRESS}/producto/${productoId}/toggle`);
    };

    const handleSwitchChange = (e) => {
        setActivoChecked(e.target.checked);
        toggleProducto(id);
    };

    const handleColorChange = ({ hex }) => {
        const precioColor = precios.find(p => p?.hex === hex.toUpperCase());
        console.log(precioColor);
        setPrecio(precioColor.precio);
        setColor(hex);
    };

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nombre}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {descripcion}
                </Typography>
                <Box sx={{ mr: 1 }}>
                    {isLoadingVariantes ?
                        (<Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>) :
                        (<>
                            <Typography variant="h6" color="text.secondary" sx={{ my: 2 }}>
                                {formatter.format(precio)}
                            </Typography>
                            <Circle
                                colors={colores}
                                color={color}
                                onChange={handleColorChange} />
                        </>)
                    }
                </Box>
            </CardContent>
            <CardActions>
                <ButtonGroup size="small" variant="contained" aria-label="text button group" fullWidth>
                    <Button onClick={() => handleProductoEditOpen()}>Editar</Button>
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
            <CardActions sx={{ pb: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'end' }}>
                <Chip label={creado} color="success" sx={{ mb: 1 }} />
                <Chip label={modificado} color="primary" />
            </CardActions>
            <Variantes
                productoId={id}
                isModalOpen={isVariantesOpen}
                handleCloseModal={() => setVariantesOpen(false)}
            />
            <ProductoEdit
                producto={producto}
                isModalOpen={isProductoEditOpen}
                handleCloseModal={() => setProductoEditOpen(false)}
            />
        </Card>
    );
}