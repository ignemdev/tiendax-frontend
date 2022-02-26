import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'
import { DataGrid } from '@mui/x-data-grid'

import env from "react-dotenv";

const variantesGridColumns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'sku', headerName: 'Sku', width: 100 },
    { field: 'stock', type: 'number', headerName: 'Stock', width: 100 },
    {
        field: 'color',
        headerName: 'Color',
        width: 100,
        valueFormatter: ({ value }) => value?.descripcion
    },
    {
        field: 'precio',
        type: 'number',
        headerName: 'Precio',
        width: 100,
        valueGetter: ({ value }) => `$${value}`
    },
    { field: 'creado', type: 'date', headerName: 'Creado', width: 130 },
    { field: 'modificado', type: 'date', headerName: 'Modificado', width: 130 },
];

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 4,
};

const colorChipDefaults = {
    label: 'Neutro',
    hex: 'fff'
};

const inputStyle = { m: 1 };

const boxInputStyle = { display: 'flex', flexWrap: 'wrap' };

export default function Variantes({ isModalOpen, handleCloseModal, productoId }) {

    const [colores, setColores] = useState([]);
    const [variantes, SetVariantes] = useState([]);
    const [isLoadingColores, setIsLoadingColores] = useState(true);
    const [isLoadingVariantes, setIsLoadingVariantes] = useState(true);

    const [alertConfig, setAlertConfig] = useState({
        isOpen: false,
        type: "success",
        message: ""
    });

    const [colorChip, setColorChip] = useState(colorChipDefaults);

    const [values, setValues] = useState({
        sku: "",
        precio: 0,
        stock: 0,
        colorId: 0,
        colorIdLabel: ""
    });

    const fetchColoresData = () => {
        fetch(`${env.BASE_ADDRESS}/color`)
            .then(res => res.json())
            .then(json => {
                const coloresSelect = json.data.map((m) => { return { id: m.id, label: m.descripcion, hex: m.hex } });
                setColores(coloresSelect);
                setIsLoadingColores(false);
            });
    };


    const fetchVariantesData = () => {
        fetch(`${env.BASE_ADDRESS}/producto/${productoId}/variantes`)
            .then(res => res.json())
            .then(json => {
                SetVariantes(json.data);
                setIsLoadingVariantes(false);
            });
    };

    function postVariante(variante) {
        resetAlert();
        setAlertConfig({ ...alertConfig, isOpen: false })

        fetch(`${env.BASE_ADDRESS}/variante`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(variante),
        })
            .then(response => response.json())
            .then(result => {
                if (result.hasError) {
                    setAlertStates('error', result.errorMessage)
                    return;
                }
                setAlertStates()
                resetForm();
                fetchVariantesData()
            })
            .catch(error => {
                setAlertStates('error', error)
            });
    }

    function setAlertStates(type = 'success', message = 'La variante ha sido guardada.') {
        setAlertConfig({ type, message, isOpen: true })
    }

    useEffect(() => {
        handleClickOpen();
    }, []);

    useEffect(() => {
        fetchColoresData();
        fetchVariantesData()
    }, [isModalOpen])

    const handleClickOpen = () => {
        console.log("se abre");
        //setTimeout(() => setOpen(false), 16000);
    };

    const handleClose = () => {
        resetForm();
        resetAlert();
        handleCloseModal(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { colorIdLabel, ...rest } = values;
        const variante = { ...rest, productoId };
        postVariante(variante);
    }

    function resetForm() {
        setValues({ ...values, sku: '', precio: 0, stock: 0 });
        setColorChip(colorChipDefaults)
    }

    function resetAlert() {
        setAlertConfig({ ...alertConfig, isOpen: false })
    }

    function handleChange(e) {
        const { target } = e;
        let { name, value } = target;

        const newValues = { ...values, [name]: value, };
        setValues(newValues);
        console.log(values)
    }

    function handleSelectChange(e, value) {
        const name = e.target.id.split("-")[0];

        if (!name)
            return;

        const newValues = { ...values, [name]: value.id, [`${name}Label`]: value.label };
        setValues(newValues);

        let { label, hex } = value;
        setColorChip({ label, hex })
        console.log(colorChip)
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                            Nueva Variante <Chip variant='outlined' label={colorChip.label} sx={{ border: 1.5 }} style={{ borderColor: `#${colorChip.hex}` }} />
                        </Typography>
                        <Box sx={boxInputStyle}>
                            <TextField
                                name="sku"
                                id="sku"
                                value={values.sku}
                                onChange={handleChange}
                                label="Sku"
                                variant="outlined"
                                sx={inputStyle} />
                            <TextField
                                name='stock'
                                id="stock"
                                value={values.stock}
                                onChange={handleChange}
                                label="Stock"
                                variant="outlined"
                                type={'number'}
                                sx={inputStyle} />
                            <TextField
                                name="precio"
                                id="precio"
                                value={values.precio}
                                onChange={handleChange}
                                label="Precio"
                                variant="outlined"
                                type={'number'}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={inputStyle} />
                        </Box>
                        <Box sx={boxInputStyle}>
                            {isLoadingColores ?
                                (<p>Loading ...</p>) :
                                (<Autocomplete
                                    name="colorId"
                                    id="colorId"
                                    required
                                    value={values.colorIdLabel}
                                    onChange={handleSelectChange}
                                    disablePortal
                                    options={colores}
                                    fullWidth
                                    sx={{ ...inputStyle }}
                                    renderInput={(params) => <TextField {...params} label="Color" />} />
                                )
                            }
                        </Box>
                        <Button sx={inputStyle} variant="contained" onClick={handleSubmit}>Guardar <SaveIcon sx={{ ml: 1 }} /></Button>
                    </Box>
                    <Collapse in={alertConfig.isOpen}>
                        <Alert
                            severity={alertConfig.type}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setAlertConfig({ ...alertConfig, isOpen: false })
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {alertConfig.message}
                        </Alert>
                    </Collapse>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                            Lista de Variantes
                        </Typography>
                        <Box fullWidth sx={{ height: 400 }}>
                            {isLoadingVariantes ?
                                (<p>Loading ...</p>) :
                                (<DataGrid
                                    rows={variantes}
                                    columns={variantesGridColumns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Modal >
        </div >
    );
}