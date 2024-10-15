import React from "react";
import { Box, Button } from "@mui/material";
import { Add, List } from "@mui/icons-material";

const Calls = () => {
  return (
    <Box sx={{ maxWidth: '90vw', mx: "auto", p: 2 }}>
      <div>Chamados</div>

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
          startIcon={<Add />}
          sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
        >
          Novo Chamado
        </Button>

        <Button
          variant="outlined"
          startIcon={<List />}
          sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
        >
          Em Aberto
        </Button>
      </Box>
    </Box >
  );
};

export default Calls;
