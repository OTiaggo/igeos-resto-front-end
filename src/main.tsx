import React from 'react';
import ReactDOM from 'react-dom/client';
import { Result } from 'antd';
import App from './App';
import { parseRuntimeConfig } from './runtime-config';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Elemento raiz indisponível.');
const root = ReactDOM.createRoot(rootElement);

async function bootstrap() {
  try {
    const response = await fetch('/runtime-config.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Configuração indisponível.');
    const config = parseRuntimeConfig(await response.json());
    root.render(<React.StrictMode><App config={config} /></React.StrictMode>);
  } catch {
    root.render(<Result status="error" title="Não foi possível iniciar a aplicação"
      subTitle="A configuração do ambiente está indisponível ou inválida. Contate a equipe responsável." />);
  }
}

void bootstrap();
