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
import { QuoteProvider } from "../context/quote";
import { CalendarProvider } from "../context/calendar";
import { ProcedureProvider } from "../context/procedure";
import { SnackbarProvider } from "notistack";
import { lightTheme } from "../themes";
import "../styles/globals.css";

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps }: Props) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <ClinicProvider>
                <CertificationProvider>
                  <CommentProvider>
                    <LikeProvider>
                      <MedicProvider>
                        <QualificationProvider>
                          <ProductProvider>
                            <FileProvider>
                              <DegreeProvider>
                                <QuoteProvider>
                                  <CalendarProvider>
                                    <ProcedureProvider>
                                      <CssBaseline />
                                      <SnackbarProvider maxSnack={1}>
                                        <Component {...pageProps} />
                                      </SnackbarProvider>
                                    </ProcedureProvider>
                                  </CalendarProvider>
                                </QuoteProvider>
                              </DegreeProvider>
                            </FileProvider>
                          </ProductProvider>
                        </QualificationProvider>
                      </MedicProvider>
                    </LikeProvider>
                  </CommentProvider>
                </CertificationProvider>
              </ClinicProvider>
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
