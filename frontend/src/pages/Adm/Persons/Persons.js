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
  InputAdornment,
  Modal,
  TablePagination,
} from "@mui/material";
import {
  Edit,
  Delete,
  Phone,
  Email,
  Home,
  Search,
  Contacts,
} from "@mui/icons-material";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const [personFormModalOpen, setPersonFormModalOpen] = useState(false);

  // Função para abrir o modal de criação de pessoa
  const handleCreatePerson = () => {
    reset();
    setEditingIndex(null);
    setPersonFormModalOpen(true);
  };

  // Função para fechar o modal de pessoa
  const handleClosePersonForm = () => {
    setPersonFormModalOpen(false);
    setSelectedPersonId(null);
  };

  // Função para cadastrar ou atualizar uma pessoa
  const onSubmitPerson = (data) => {
    if (editingIndex !== null) {
      const updatedDataset = [...dataset];
      updatedDataset[editingIndex] = data;
      setDataset(updatedDataset);
      setEditingIndex(null);
    } else {
      setDataset([data, ...dataset]);
    }
    setPersonFormModalOpen(false);
    setSelectedPersonId(data.user_id);
  };

  // Função para editar uma pessoa
  const handleEditPerson = (index) => {
    const person = dataset[index];
    setValue("name", person.name);
    setValue("cpf", person.cpf);
    setValue("birthday", person.birthday);
    setValue("mother", person.mother);
    setValue("user_id", person.user_id);
    setEditingIndex(index);
    setPersonFormModalOpen(true);
  };

  // Função para excluir uma pessoa
  const handleDeletePerson = (index) => {
    const updatedDataset = dataset.filter((_, i) => i !== index);
    setDataset(updatedDataset);
    setSelectedPersonId(null);
  };

  // Função para habilitar as abas de contato
  const handleSelectPersonForContact = (index) => {
    const person = dataset[index];
    setSelectedPersonId(person.user_id); // Define o ID da pessoa selecionada
    loadRelatedData(person.user_id); // Carrega dados relacionados (telefones, emails, endereços)
    setActiveTab(0); // Abre a primeira aba (Telefone) por padrão
    setIsTabsEnabled(true); // Habilita as abas
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
  };

  // Função para editar um telefone
  const handleEditPhone = (index) => {
    const phone = phones[index];
    setValue("phone", phone.phone);
    setEditingPhoneIndex(index);
  };

  // Função para excluir um telefone
  const handleDeletePhone = (index) => {
    const updatedPhones = phones.filter((_, i) => i !== index);
    setPhones(updatedPhones);
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
  };

  // Função para editar um email
  const handleEditEmail = (index) => {
    const email = emails[index];
    setValue("email", email.email);
    setEditingEmailIndex(index);
  };

  // Função para excluir um email
  const handleDeleteEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
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
  };

  // Função para editar um endereço
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

  // Função para excluir um endereço
  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  // Função para buscar pessoas pelo nome
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Função para mudar a página do dataset
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
      <Box sx={{ maxWidth: "70vw", mx: "auto", padding: 3 }}>
        {/* Campo de pesquisa */}
        <TextField
          label="Pesquisar"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />

        {/* Dataset de Pessoas */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataset
                .filter((person) =>
                  person.name.toLowerCase().includes(searchQuery)
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((person, index) => (
                  <TableRow
                    key={index}
                    selected={selectedPersonId === person.user_id}
                  >
                    <TableCell>{person.user_id}</TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.cpf}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleSelectPersonForContact(index)}
                        color="info"
                      >
                        <Contacts />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEditPerson(index)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeletePerson(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={dataset.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[7]}
          />
        </TableContainer>

        {/* Botões para criar nova pessoa e limpar pesquisa */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePerson}
          >
            Nova Pessoa
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setSearchQuery("")}
          >
            Limpar
          </Button>
        </Box>

        {/* Modal de cadastro de pessoa */}
        <Modal open={personFormModalOpen} onClose={handleClosePersonForm}>
          <Box
            sx={{
              maxWidth: 500,
              margin: "auto",
              marginTop: 5,
              padding: 3,
              backgroundColor: "white",
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleSubmit(onSubmitPerson)}>
              {/* Formulário de Pessoa */}
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
                      <InputMask
                        {...field}
                        mask="999.999.999-99"
                        maskChar=""
                        onBlur={(e) => field.onBlur(e)}
                        onChange={(e) => field.onChange(e)}
                      >
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
                        helperText={
                          errors.user_id ? errors.user_id.message : ""
                        }
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
          </Box>
        </Modal>

        {/* Abas de Telefone, Email e Endereço */}
        {selectedPersonId && (
          <Box sx={{ marginTop: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<Phone />} aria-label="Telefone" />
              <Tab icon={<Email />} aria-label="Email" />
              <Tab icon={<Home />} aria-label="Endereço" />
            </Tabs>

            {/* Conteúdo das Abas */}
            {activeTab === 0 && (
              <Box>
                {/* Formulário de Telefone */}
                <form onSubmit={handleSubmit(onSubmitPhone)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{ required: "O telefone é obrigatório" }}
                        render={({ field }) => (
                          <InputMask
                            {...field}
                            mask="(99) 99999-9999"
                            maskChar=""
                          >
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

                {/* Dataset de Telefone */}
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {phones.map((phone, index) => (
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
                              onClick={() => handleDeletePhone(index)}
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

            {activeTab === 1 && (
              <Box>
                {/* Formulário de Email */}
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
                            helperText={
                              errors.email ? errors.email.message : ""
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
                        {editingEmailIndex !== null
                          ? "Atualizar Email"
                          : "Adicionar Email"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                {/* Dataset de Email */}
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {emails.map((email, index) => (
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
                              onClick={() => handleDeleteEmail(index)}
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

            {activeTab === 2 && (
              <Box>
                {/* Formulário de Endereço */}
                <form onSubmit={handleSubmit(onSubmitAddress)}>
                  <Grid container spacing={2}>
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
                            helperText={
                              errors.number ? errors.number.message : ""
                            }
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
                            helperText={
                              errors.sector ? errors.sector.message : ""
                            }
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
                            helperText={
                              errors.state ? errors.state.message : ""
                            }
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

                {/* Dataset de Endereço */}
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                      {addresses.map((address, index) => (
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
                              onClick={() => handleDeleteAddress(index)}
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
        )}
      </Box>
    </>
  );
};

export default Persons;
