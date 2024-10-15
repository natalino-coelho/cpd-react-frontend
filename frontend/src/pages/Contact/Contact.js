import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para envio do formulário (por exemplo, enviar dados para um backend)
    console.log("Formulário enviado");
  };

  const handleReset = (event) => {
    event.preventDefault();
    // Lógica de reset, ou simplesmente usa o método reset do formulário
    const form = event.currentTarget.closest("form");
    if (form) form.reset();
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Formulário para Contato
      </Typography>

      <Typography variant="body1" paragraph>
        Se você tiver alguma dúvida, entre em contato conosco preenchendo o
        formulário abaixo ou use algum dos contatos abaixo.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField required fullWidth label="Nome" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="E-mail"
              type="email"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Mensagem"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleReset} // Lógica de reset do formulário
            >
              Limpar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ paddingBottom: "10px", textAlign: "center" }}>Outros Contatos</Typography>

        <Typography variant="body1" paragraph>
          <strong>Endereço:</strong> Rua São Francisco, nº 570, Centro, Goiatuba-GO, CEP 75.600-000
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Telefone:</strong> (64) 3495-0014
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Email:</strong> cpd@goiatuba.go.gov.br
        </Typography>
      </Box>
    </Box>
  );
};

export default Contact;
