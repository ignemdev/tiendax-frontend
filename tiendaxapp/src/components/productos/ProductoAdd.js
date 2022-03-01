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

import env from "react-dotenv";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};

const inputStyle = { my: 1 }

export default function ProductoAdd({ isModalOpen, handleCloseModal }) {

    const [marcas, setMarcas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [alertConfig, setAlertConfig] = useState({
        isOpen: false,
        type: "success",
        message: ""
    });

    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        marcaId: 0,
        marcaIdLabel: ""
    });

    const fetchData = () => {
        fetch(`${env.BASE_ADDRESS}/marca`)
            .then(res => res.json())
            .then(json => {
                const marcasSelect = json.data.map((m) => {
                    return { id: m.id, label: m.nombre };
                });
                setMarcas(marcasSelect);
            });
    };


    function postProducto(producto) {
        resetAlert();
        setAlertConfig({ ...alertConfig, isOpen: false });

        fetch(`${env.BASE_ADDRESS}/producto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        })
            .then(response => response.json())
            .then(result => {
                if (result.hasError) {
                    setAlertStates('error', result.errorMessage)
                    return;
                }
                setAlertStates()
                resetForm();
            })
            .catch(error => {
                setAlertStates('error', error)
            });
    }

    function setAlertStates(type = 'success', message = 'El producto ha sido guardado.') {
        setAlertConfig({ type, message, isOpen: true })
    };

    useEffect(() => {
        handleClickOpen();
    }, []);

    useEffect(() => {
        fetchData();
    }, [isModalOpen]);

    useEffect(() => {
        if (marcas.length !== 0) {
            setIsLoading(false);
        }
    }, [marcas]);

    const handleClickOpen = () => {
        // console.log("se abre");
        //setTimeout(() => setOpen(false), 16000);
    };

    const handleClose = () => {
        resetForm();
        resetAlert();
        handleCloseModal(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { marcaIdLabel, ...producto } = values;
        postProducto(producto);
    };

    function resetForm() {
        setValues({ ...values, descripcion: "", nombre: "" });
    };

    function resetAlert() {
        setAlertConfig({ ...alertConfig, isOpen: false });
    };

    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        const newValues = { ...values, [name]: value, };
        setValues(newValues);
    };

    function handleSelectChange(e, value) {
        const name = e.target.id.split("-")[0];

        if (!name)
            return;

        const newValues = { ...values, [name]: value.id, [`${name}Label`]: value.label };
        setValues(newValues);
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Nuevo Producto
                    </Typography>
                    <TextField
                        name="nombre"
                        id="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        sx={inputStyle} />

                    <TextField
                        name="descripcion"
                        id="descripcion"
                        value={values.descripcion}
                        onChange={handleChange}
                        label="Descripcion"
                        multiline rows={6}
                        fullWidth
                        sx={inputStyle} />

                    {isLoading ?
                        (<p>Loading ...</p>) :
                        (<Autocomplete
                            name="marcaId"
                            id="marcaId"
                            value={values.marcaIdLabel}
                            onChange={handleSelectChange}
                            disablePortal
                            options={marcas}
                            sx={{ width: '100%', ...inputStyle }}
                            renderInput={(params) => <TextField {...params} label="Marca" />} />
                        )
                    }
                    <Button sx={inputStyle} variant="contained" onClick={handleSubmit}>Guardar <SaveIcon sx={{ ml: 1 }} /></Button>
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
                </Box>
            </Modal>
        </div>
    );
}