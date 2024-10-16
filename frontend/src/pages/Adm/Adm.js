import React from "react";
import { Box, Button } from "@mui/material";
import { Group, ManageAccounts, SupervisedUserCircle } from "@mui/icons-material";

const Adm = () => {
  return (
    <Box sx={{ maxWidth: '90vw', mx: "auto", p: 2 }}>
      <div>Gestão do Sistema</div>

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
          startIcon={<Group />}
          href="/adm/persons"
          sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
        >
          Pessoas
        </Button>

        <Button
          variant="outlined"
          startIcon={<SupervisedUserCircle />}
          href="/adm/users"
          sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
        >
          Usuários
        </Button>

        <Button
          variant="outlined"
          startIcon={<ManageAccounts />}
          href="/adm/permissions"
          sx={{ height: '60px', fontSize: '1rem', flexGrow: 1 }}
        >
          Permissões
        </Button>
      </Box>
    </Box >
  );
};

export default Adm;