import React, { useEffect } from 'react'
import { NextPage } from "next";
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { useRouter } from 'next/router';

const LoginPage :NextPage=()=>{
    const {initialized,keycloak}=useKeycloak<KeycloakInstance>()
    const {replace, query} = useRouter();
    const from = query.from;
    const { authenticated, login = () => {} } = keycloak || {};

    useEffect(()=>{
        if(!initialized){
            return
        }
        if(!authenticated){
            login();
           
        }

    },[initialized, authenticated, login])
    
    useEffect(() => {
        if (!initialized) {
          return;
        }
        if (authenticated) {
          replace((from as string) ?? "/");
        }
      }, [authenticated, initialized, from, replace]);

    return null

}

export default LoginPage;