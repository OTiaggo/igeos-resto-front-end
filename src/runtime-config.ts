export interface RuntimeConfig {
  apiBaseUrl: string;
  oidcAuthority: string;
  oidcClientId: string;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol)
      && !url.username && !url.password && !url.search && !url.hash;
  } catch {
    return false;
  }
}

export function parseRuntimeConfig(value: unknown): RuntimeConfig {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Configuração pública inválida.');
  }
  const config = value as Record<string, unknown>;
  const { apiBaseUrl, oidcAuthority, oidcClientId } = config;
  if (typeof apiBaseUrl !== 'string' || typeof oidcAuthority !== 'string'
    || typeof oidcClientId !== 'string') {
    throw new Error('Configuração pública incompleta.');
  }
  const isLocalPath = /^\/(?!\/)[^\\?#\s]*$/.test(apiBaseUrl);
  if (!isLocalPath && !isHttpUrl(apiBaseUrl)) {
    throw new Error('Endereço da API inválido.');
  }
  if (Boolean(oidcAuthority) !== Boolean(oidcClientId)
    || (oidcAuthority !== '' && !isHttpUrl(oidcAuthority))) {
    throw new Error('Configuração de identidade inválida.');
  }
  return { apiBaseUrl, oidcAuthority, oidcClientId };
}
