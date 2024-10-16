import React from "react";
import { Box, Button } from "@mui/material";
import { Store, Inventory, Work, TextSnippet } from "@mui/icons-material";

const Registers = () => {
    return (
        <Box sx={{ maxWidth: '90vw', mx: "auto", p: 2 }}>
            <div>Gestão de Registros</div>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Ajusta as colunas conforme o tamanho da tela
                gap: 2, // Espaço entre os botões
                p: 3,
                maxWidth: '1080px', // Limita a largura máxima do grid para 720px
                mx: 'auto', // Centraliza o grid horizontalmente
            }}>

                <Button
                    variant="outlined"
                    startIcon={<Store />}
                    href="/gti/registers/suppliers"
                    sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
                >
                    Fornecedores
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<Inventory />}
                    href="/gti/registers/products "
                    sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
                >
                    Produtos
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<Work />}
                    href="/gti/registers/services"
                    sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
                >
                    Serviços
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<TextSnippet />}
                    href="/gti/registers/documents"
                    sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
                >
                    Documentos
                </Button>
            </Box>
        </Box >
    );
};

export default Registers;
