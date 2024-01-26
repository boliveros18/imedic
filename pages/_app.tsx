import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { AuthProvider } from "../context/auth";
import { UIProvider } from "../context/ui";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ClinicProvider } from "../context/clinic";
import { DegreeProvider } from "../context/degree";
import { CertificationProvider } from "../context/certification";
import { CommentProvider } from "../context/comment";
import { LikeProvider } from "../context/like";
import { MedicProvider } from "../context/medic";
import { QualificationProvider } from "../context/qualification";
import { ProductProvider } from "../context/product";
import { FileProvider } from "../context/file";
import { ClientProvider } from "../context/client";
import { QuoteProvider } from "../context/quote";
import { ProcedureProvider } from "../context/procedure";
import { SnackbarProvider } from "notistack";
import { lightTheme } from "../themes";
import "../styles/globals.css";

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps }: Props) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SessionProvider>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <UIProvider>
              <ClinicProvider>
                <LikeProvider>
                  <CommentProvider>
                    <MedicProvider>
                      <ProductProvider>
                        <FileProvider>
                          <DegreeProvider>
                            <QuoteProvider>
                                <ProcedureProvider>
                                  <QualificationProvider>
                                    <CertificationProvider>
                                    <ClientProvider>
                                      <SnackbarProvider maxSnack={1}>
                                        <Component {...pageProps} />
                                      </SnackbarProvider>
                                    </ClientProvider>
                                    </CertificationProvider>
                                  </QualificationProvider>
                                </ProcedureProvider>
                            </QuoteProvider>
                          </DegreeProvider>
                        </FileProvider>
                      </ProductProvider>
                    </MedicProvider>
                  </CommentProvider>
                </LikeProvider>
              </ClinicProvider>
            </UIProvider>
          </AuthProvider>
        </SWRConfig>
      </SessionProvider>
    </ThemeProvider>
  );
}
