import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Person, Phone, Email, Home } from "@mui/icons-material";
import InputMask from "react-input-mask";

// Função para validar o CPF
const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const Persons = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [dataset, setDataset] = useState([]);
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingPhoneIndex, setEditingPhoneIndex] = useState(null);
  const [editingEmailIndex, setEditingEmailIndex] = useState(null);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  // Função para cadastrar ou atualizar uma pessoa
  const onSubmitPerson = (data) => {
    if (editingIndex !== null) {
      const updatedDataset = [...dataset];
      updatedDataset[editingIndex] = data;
      setDataset(updatedDataset);
      setEditingIndex(null);
    } else {
      setDataset([...dataset, data]);
    }
    reset();
    setSelectedPersonId(data.user_id);
    setActiveTab(1); // Move para a aba de telefone após salvar
  };

  // Função para cadastrar ou atualizar telefone
  const onSubmitPhone = (data) => {
    if (editingPhoneIndex !== null) {
      const updatedPhones = [...phones];
      updatedPhones[editingPhoneIndex] = {
        ...data,
        person_id: selectedPersonId,
      };
      setPhones(updatedPhones);
      setEditingPhoneIndex(null);
    } else {
      setPhones([...phones, { ...data, person_id: selectedPersonId }]);
    }
    reset();
  };

  // Função para cadastrar ou atualizar email
  const onSubmitEmail = (data) => {
    if (editingEmailIndex !== null) {
      const updatedEmails = [...emails];
      updatedEmails[editingEmailIndex] = {
        ...data,
        person_id: selectedPersonId,
      };
      setEmails(updatedEmails);
      setEditingEmailIndex(null);
    } else {
      setEmails([...emails, { ...data, person_id: selectedPersonId }]);
    }
    reset();
  };

  // Função para cadastrar ou atualizar endereço
  const onSubmitAddress = (data) => {
    if (editingAddressIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingAddressIndex] = {
        ...data,
        person_id: selectedPersonId,
      };
      setAddresses(updatedAddresses);
      setEditingAddressIndex(null);
    } else {
      setAddresses([...addresses, { ...data, person_id: selectedPersonId }]);
    }
    reset();
  };

  // Função para carregar os dados do telefone ao editar
  const handleEditPhone = (index) => {
    const phone = phones[index];
    setValue("phone", phone.phone);
    setEditingPhoneIndex(index);
  };

  // Função para carregar os dados do email ao editar
  const handleEditEmail = (index) => {
    const email = emails[index];
    setValue("email", email.email);
    setEditingEmailIndex(index);
  };

  // Função para carregar os dados do endereço ao editar
  const handleEditAddress = (index) => {
    const address = addresses[index];
    setValue("address", address.address);
    setValue("number", address.number);
    setValue("sector", address.sector);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("country", address.country);
    setEditingAddressIndex(index);
  };

  // Função para mudar a aba ativa
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box sx={{ maxWidth: "90vw", mx: "auto", p: 2 }}>
        <div>Gestão de Pessoas</div>
      </Box>
      <Box sx={{ maxWidth: "720px", mx: "auto", p: 3 }}>
        {/* Componente de Abas */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          sx={{ marginBottom: 3 }}
        >
          <Tab icon={<Person />} aria-label="Pessoa" />
          <Tab
            icon={<Phone />}
            aria-label="Telefone"
            disabled={!selectedPersonId}
          />
          <Tab
            icon={<Email />}
            aria-label="Email"
            disabled={!selectedPersonId}
          />
          <Tab
            icon={<Home />}
            aria-label="Endereço"
            disabled={!selectedPersonId}
          />
        </Tabs>

        {/* Conteúdo das Abas */}
        {activeTab === 0 && (
          <form onSubmit={handleSubmit(onSubmitPerson)}>
            <Grid container spacing={2}>
              {/* Campo Nome */}
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "O nome é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Campo CPF */}
              <Grid item xs={12}>
                <Controller
                  name="cpf"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "O CPF é obrigatório",
                    validate: (value) => validateCPF(value) || "CPF inválido",
                  }}
                  render={({ field }) => (
                    <InputMask {...field} mask="999.999.999-99" maskChar="">
                      {() => (
                        <TextField
                          label="CPF"
                          variant="outlined"
                          fullWidth
                          error={!!errors.cpf}
                          helperText={errors.cpf ? errors.cpf.message : ""}
                        />
                      )}
                    </InputMask>
                  )}
                />
              </Grid>

              {/* Campo Data de Nascimento */}
              <Grid item xs={12}>
                <Controller
                  name="birthday"
                  control={control}
                  defaultValue=""
                  rules={{ required: "A data de nascimento é obrigatória" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Data de Nascimento"
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.birthday}
                      helperText={
                        errors.birthday ? errors.birthday.message : ""
                      }
                      inputProps={{
                        max: "9999-12-31", // Limita o ano a 4 dígitos
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Campo Nome da Mãe */}
              <Grid item xs={12}>
                <Controller
                  name="mother"
                  control={control}
                  defaultValue=""
                  rules={{ required: "O nome da mãe é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome da Mãe"
                      variant="outlined"
                      fullWidth
                      error={!!errors.mother}
                      helperText={errors.mother ? errors.mother.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Campo User ID */}
              <Grid item xs={12}>
                <Controller
                  name="user_id"
                  control={control}
                  defaultValue=""
                  rules={{ required: "O ID do usuário é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="ID do Usuário"
                      variant="outlined"
                      fullWidth
                      error={!!errors.user_id}
                      helperText={errors.user_id ? errors.user_id.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Botões de Enviar e Limpar */}
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {editingIndex !== null ? "Atualizar" : "Enviar"}
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    reset();
                    setEditingIndex(null);
                    setSelectedPersonId(null);
                  }}
                >
                  Limpar
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        {/* Formulário e Dataset de Telefone */}
        {activeTab === 1 && (
          <Box>
            <form onSubmit={handleSubmit(onSubmitPhone)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O telefone é obrigatório" }}
                    render={({ field }) => (
                      <InputMask {...field} mask="(99) 99999-9999" maskChar="">
                        {() => (
                          <TextField
                            label="Telefone"
                            variant="outlined"
                            fullWidth
                            error={!!errors.phone}
                            helperText={
                              errors.phone ? errors.phone.message : ""
                            }
                          />
                        )}
                      </InputMask>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {editingPhoneIndex !== null
                      ? "Atualizar Telefone"
                      : "Adicionar Telefone"}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {phones
                    .filter((phone) => phone.person_id === selectedPersonId)
                    .map((phone, index) => (
                      <TableRow key={index}>
                        <TableCell>{phone.phone}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEditPhone(index)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setPhones(phones.filter((_, i) => i !== index))
                            }
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Formulário e Dataset de Email */}
        {activeTab === 2 && (
          <Box>
            <form onSubmit={handleSubmit(onSubmitEmail)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O email é obrigatório" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {editingEmailIndex !== null
                      ? "Atualizar Email"
                      : "Adicionar Email"}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emails
                    .filter((email) => email.person_id === selectedPersonId)
                    .map((email, index) => (
                      <TableRow key={index}>
                        <TableCell>{email.email}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEditEmail(index)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setEmails(emails.filter((_, i) => i !== index))
                            }
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Formulário e Dataset de Endereço */}
        {activeTab === 3 && (
          <Box>
            <form onSubmit={handleSubmit(onSubmitAddress)}>
              <Grid container spacing={2}>
                {/* Campos do Endereço */}
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O endereço é obrigatório" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Endereço"
                        variant="outlined"
                        fullWidth
                        error={!!errors.address}
                        helperText={
                          errors.address ? errors.address.message : ""
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="number"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O número é obrigatório" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Número"
                        variant="outlined"
                        fullWidth
                        error={!!errors.number}
                        helperText={errors.number ? errors.number.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="sector"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O setor é obrigatório" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Setor"
                        variant="outlined"
                        fullWidth
                        error={!!errors.sector}
                        helperText={errors.sector ? errors.sector.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{ required: "A cidade é obrigatória" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Cidade"
                        variant="outlined"
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city ? errors.city.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O estado é obrigatório" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Estado"
                        variant="outlined"
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state ? errors.state.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    rules={{ required: "O país é obrigatório" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="País"
                        variant="outlined"
                        fullWidth
                        error={!!errors.country}
                        helperText={
                          errors.country ? errors.country.message : ""
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {editingAddressIndex !== null
                      ? "Atualizar Endereço"
                      : "Adicionar Endereço"}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Número</TableCell>
                    <TableCell>Setor</TableCell>
                    <TableCell>Cidade</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>País</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses
                    .filter((address) => address.person_id === selectedPersonId)
                    .map((address, index) => (
                      <TableRow key={index}>
                        <TableCell>{address.address}</TableCell>
                        <TableCell>{address.number}</TableCell>
                        <TableCell>{address.sector}</TableCell>
                        <TableCell>{address.city}</TableCell>
                        <TableCell>{address.state}</TableCell>
                        <TableCell>{address.country}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEditAddress(index)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setAddresses(
                                addresses.filter((_, i) => i !== index)
                              )
                            }
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Persons;
