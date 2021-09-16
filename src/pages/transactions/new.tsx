import { Button,Box, Grid, TextField, Typography, MenuItem } from "@material-ui/core";
import { parseISO, format } from "date-fns";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import makeHttp from "../../utils/http";
import { Head } from "../../components/Head";
import { Page } from "../../components/Page";
import { TransactionCategoryLabels, TransactionTypeLabels } from "../../utils/model";
import { useKeycloak } from "@react-keycloak/ssr";

const TransactionsNewPage: NextPage= () =>{
    const router = useRouter();
    const {register, handleSubmit}= useForm();

    const { initialized, keycloak } = useKeycloak();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post("transations", data);
      router.push("/transactions");
    } catch (e) {
      console.error(e);
    }
  }

  if (
    typeof window !== "undefined" &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window!.location.pathname}`);
    return null;
  }

  return keycloak?.authenticated ? (
    <Page>
        <Head title="Nova transação" />
        <Typography component='h1' variant='h4'>
            Nova transação
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField 
                {...register("payment_date")}
                type='date'
                required
                label="Data de pagamento"
                fullWidth
                InputLabelProps={{
                shrink: true,
            }}/>
            <TextField 
            {...register("name")}
            type='text'
            required
            label="Nome"
            fullWidth
            InputLabelProps={{
            shrink: true,
        }}/>
        <TextField
            {...register("description")}
            required
             type="text"
            label="Descrição"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
        />
            <TextField
             {...register("amount", { valueAsNumber: true })}
            required
            type="number"
            label="Valor"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}/>
            
            <TextField 
                {...register("category")}  
                select
                required
                label="Categoria"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
                  </TextField>
             <TextField 
              {...register("type")}
               select
               required
               label="Tipo de operação"
               fullWidth
               InputLabelProps={{
                shrink: true,
            }}
            >{TransactionTypeLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
              </TextField>
            <Box marginTop={1}> 
            <Button
               type="submit"
               variant="contained"
               color="primary"
               fullWidth
               onClick={() => /*router.push("/transactions/new")*/{}}
            >
                Salvar
            </Button>
            </Box>
            </Grid>
            </Grid>
            
        </form>
        </Page>) : null;
    
}

export default TransactionsNewPage;
