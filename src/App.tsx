import { App as AntApp, Button, ConfigProvider, Layout, Result, Space, Switch, Typography, theme } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client-ts';
import { create } from 'zustand';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import type { PropsWithChildren } from 'react';
import type { RuntimeConfig } from './runtime-config';
import './styles.css';

dayjs.locale('pt-br');
const queryClient = new QueryClient();
const usePreferences = create<{ dark: boolean; setDark: (dark: boolean) => void }>((set) => ({
  dark: false,
  setDark: (dark) => set({ dark }),
}));

function IdentityProvider({ config, children }: PropsWithChildren<{ config: RuntimeConfig }>) {
  if (!config.oidcAuthority) return children;
  return (
    <AuthProvider
      authority={config.oidcAuthority}
      client_id={config.oidcClientId}
      redirect_uri={`${window.location.origin}/auth/callback`}
      response_type="code"
      scope="openid profile"
      userStore={new WebStorageStateStore({ store: new InMemoryWebStorage() })}
      onSigninCallback={() => { window.history.replaceState({}, document.title, '/'); }}
    >
      {children}
    </AuthProvider>
  );
}

export default function App({ config }: { config: RuntimeConfig }) {
  const { dark, setDark } = usePreferences();
  return (
    <ConfigProvider locale={ptBR} theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: { colorPrimary: '#176b52' } }}>
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <IdentityProvider config={config}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Layout className="app-shell">
                <Layout.Header className="app-header">
                  <Link className="brand" to="/">IGEOS Resto</Link>
                  <Space><span>Tema escuro</span><Switch aria-label="Tema escuro" checked={dark} onChange={setDark} /></Space>
                </Layout.Header>
                <Layout.Content className="app-content">
                  <Routes>
                    <Route path="/" element={<Result status="info" title="Bem-vindo ao IGEOS Resto"
                      subTitle="A base da aplicação está preparada. As funcionalidades serão disponibilizadas nas próximas entregas." />} />
                    <Route path="/auth/callback" element={<Result title="Concluindo o acesso" subTitle="Aguarde o retorno do provedor de identidade." />} />
                    <Route path="*" element={<Result status="404" title="Página não encontrada"
                      extra={<Link to="/"><Button type="primary">Voltar ao início</Button></Link>} />} />
                  </Routes>
                </Layout.Content>
                <Layout.Footer className="app-footer"><Typography.Text type="secondary">IGEOS Resto · {dayjs().format('YYYY')}</Typography.Text></Layout.Footer>
              </Layout>
            </BrowserRouter>
          </IdentityProvider>
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  );
}
